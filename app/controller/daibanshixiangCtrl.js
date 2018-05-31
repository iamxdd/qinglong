App.controller('daibanshixiangCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q) {
		$scope.list = [];
		$scope.PcService = PcService;
		$scope.ItemContent = {};

		var evil = function(fn) {
			var Fn = Function; //一个变量指向Function，防止有些前端编译工具报错
			return new Fn('return ' + fn)();
		};

		var myCountInfo = evil("(" + localStorage.getItem("myCountInfo") + ")");
		var mid = myCountInfo.memberid;

		//选项卡
		$scope.navTabList = [{
				Id: 1,
				Name: "信息核实",
				Active: true
			}, {
				Id: 2,
				Name: "事项处理",
				Active: false
			}
			/*, {
						Id: 3,
						Name: "民主协商",
						Active: false
					}*/
		];

		//合适状态
		$scope.VerifyStates = [{
			Id: 0,
			Name: "未核实",
			Active: true
		}, {
			Id: 1,
			Name: "已核实",
			Active: false
		}, {
			Id: 2,
			Name: "已核实但不存在",
			Active: false
		}];

		$scope.selectTab = $scope.navTabList[0];

		//外部资源类型
		$scope.ExtraResourceTypes = [{
			Checked: false,
			Id: 1,
			Name: "无"
		}, {
			Checked: false,
			Id: 2,
			Name: "表单填写"
		}, {
			Checked: false,
			Id: 4,
			Name: "线上民主协商"
		}, {
			Checked: false,
			Id: 8,
			Name: "线下民主协商"
		}, {
			Checked: false,
			Id: 16,
			Name: "线上临时协商"
		}, {
			Checked: false,
			Id: 32,
			Name: "线下临时协商"
		}, {
			Checked: false,
			Id: 64,
			Name: "核实"
		}, {
			Checked: false,
			Id: 128,
			Name: "入库"
		}];

		//协商状态
		$scope.NegotiateStates = [{
			Id: 0,
			Name: "未开始"
		}, {
			Id: 1,
			Name: "协商中"
		}, {
			Id: 2,
			Name: "取消"
		}, {
			Id: 3,
			Name: "结果统计中"
		}, {
			Id: 4,
			Name: "公示中"
		}, {
			Id: 5,
			Name: "已完成"
		}];

		//选项卡选择操作
		$scope.checked = function(x) {
			$scope.navTabList.forEach(function(item, index) {
				if(item.Name === x.Name) {
					item.Active = true;
				} else {
					item.Active = false;
				}
			});
			if($scope.selectTab !== x) {
				$scope.selectTab = x;
				$scope.fetchData();
			}
		};

		//获取代办事项
		$scope.fetchData = function() {
			var param = {};

			var url = "";
			switch($scope.selectTab.Id) {
				case 1:
					param.history = false;
					param.verify = true;
					url = serverUrls.allWorkers;
					PcService.fetchData($scope, url, param, $rootScope.gHeader);
					break;
				case 2:
					param.history = false;
					param.verify = false;
					url = serverUrls.allWorkers;
					PcService.fetchData($scope, url, param, $rootScope.gHeader);
					break;
				case 3:
					param.mid = mid;
					url = serverUrls.demoCratictransactionbymid;
					PcService.fetchList($scope, url, param, $rootScope.gHeader);
					break;
			}

		};

		//表单上传查看
		var getFormDetail = function($scope, deffered) {
			var action = "",
				url;
			switch($scope.ItemContent.FormType) {
				case 1:
					action = "流动人口";
					$scope.fields_List = $scope.fieldsList[1];
					url = serverUrls.getFloating;
					break;
				case 2:
					action = "环境卫生";
					$scope.fields_List = $scope.fieldsList[2];
					url = serverUrls.getEnvironmental;
					break;
				case 3:
					action = "纠纷调解";
					$scope.fields_List = $scope.fieldsList[3];
					url = serverUrls.getDispute;
					break;
				case 4:
					action = "重点人群";
					$scope.fields_List = $scope.fieldsList[4];
					url = serverUrls.getKeypopulation;
					break;
				case 5:
					action = "基金申请";
					$scope.fields_List = $scope.fieldsList[8];
					url = serverUrls.getfinances;
					break;
				case 6:
					action = "安全隐患";
					$scope.fields_List = $scope.fieldsList[9];
					url = serverUrls.gethiddendanger;
					break;
				default:
					break;
			}
			$http({
				method: "get",
				url: url + "?id=" + $scope.ItemContent.FormId
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.ItemContent = response.Content;
					deffered.resolve("success");
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		$scope.fetchData();

		//获取相册下照片列表
		var getPhotoes = function($scope, deffered) {
			var param = {
				albumid: $scope.ItemContent.PhotoAlbumId
			};
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.photoitemList,
				params: param,
				success: function(response) {
					$scope.ItemContent.Photoes = response;
					$scope.templateName = "Photoes";
					deffered.resolve("success");
				},
				error: function(error) {
					layerAlert.autoclose(errorResult(error));
				}
			}, null);
		};

		//获取线下民主协商相册
		var getErdemoprojectoffline = function($scope, deffered) {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.erDemoprojectoffline + "?id=" + $scope.ItemContent.PhotoAlbumId
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.ItemContent = $.extend(true, $scope.ItemContent, response.Content);
					getPhotoes($scope, deffered);
					$scope.fields_List = $scope.fieldsList[7];
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取位置信息
		var getPositionInfo = function($scope, OccurLocationId, _deffered) {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.getDate + "?id=" + OccurLocationId
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.ItemContent.SeatAddress = response.Content.GradePathName;
					_deffered.resolve();
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取位置信息ID
		var getPositonId = function($scope, inspectorId, workflowerId, _deffered) {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.eventByworkflowerid + "?inspectorId=" + inspectorId + "&workflowerId=" + workflowerId
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var OccurLocationId = response.Content.OccurLocationId;
					getPositionInfo($scope, OccurLocationId, _deffered);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取线上民主协商详情
		var getDemocratictransaction = function($scope, deffered) {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.demoCratictransaction + "?id=" + $scope.ItemContent.DPId
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.ItemContent = response.Content;
					$scope.fields_List = $scope.fieldsList[6];
					deffered.resolve("success");
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		$scope.detailItem = function(x) {

			$scope.templateName = "createOne";
			$scope.fields_List = [];
			var TItle;
			var deffered = $q.defer();
			var promises = deffered.promise;
			var _deffered = $q.defer();
			var _promises = _deffered.promise;

			switch($scope.selectTab.Id) {
				case 1:
					$scope.fields_List = $scope.fieldsList[0];
					TItle = "信息核实";
					break;
				case 2:
					TItle = "事项处理";
					if(x.WorkNodeWorkerType === 1) {
						$scope.fields_List = $scope.fieldsList[5];
					} else if(x.WorkNodeWorkerType === 2) {
						//$scope.fields_List = $scope.fieldsList[1];
					}
					break;
				case 3:
					$scope.fields_List = $scope.fieldsList[7];
					TItle = "民主协商";
					break;
				default:
					break;
			}

			if(x.ResourceType !== 1) {
				$scope.listBusyPromise = $http({
					method: "get",
					url: serverUrls.erByworkerid + "?workerid=" + x.Id
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					if(Code === 0) {
						var Content = response.Content;
						$scope.ItemContent = Content;
						if(!$scope.ItemContent.SeatAddress) {
							getPositonId($scope, x.NoderWorkflowerInspectorId, x.NoderWorkflowerId, _deffered);
						} else {
							_deffered.resolve();
						}

						switch(x.ResourceType) {
							case 1:
								break;
							case 2:
								TItle = "表单上传";
								if($scope.ItemContent.FormId !== 0) {
									getFormDetail($scope, deffered);
								} else {
									layerAlert.autoclose("暂无表单！");
								}

								break;
							case 4:
								TItle = "线上民主协商";
								if($scope.ItemContent.DPId !== 0) {
									getDemocratictransaction($scope, deffered);
								} else {
									layerAlert.autoclose("暂无协商项目！");
								}
								//deffered.resolve();
								break;
							case 8:
								TItle = "线下民主协商";
								if($scope.ItemContent.PhotoAlbumId !== 0) {
									getErdemoprojectoffline($scope, deffered);
								} else {
									layerAlert.autoclose("暂未关联相册！");
								}
								//deffered.resolve();
								break;
							case 16:
								TItle = "线上临时民主协商";
								if($scope.ItemContent.DPId !== 0) {
									getDemocratictransaction($scope, deffered);
								} else {
									layerAlert.autoclose("暂无协商项目！");
								}
								break;
							case 32:
								TItle = "线下临时民主协商";
								if($scope.ItemContent.PhotoAlbumId !== 0) {
									getErdemoprojectoffline($scope, deffered);
								} else {
									layerAlert.autoclose("暂未关联相册！");
								}
								deffered.resolve();
								break;
							case 64:
								TItle = "核实";
								deffered.resolve();
								break;
							case 128:
								TItle = "入库";
								if($scope.ItemContent.FormId !== 0) {
									getFormDetail($scope, deffered);
								} else {
									layerAlert.autoclose("暂无表单！");
								}

								break;
							default:
								break;
						}

						$scope.ItemContent.ResourceType = PcService.numberToText(x.ResourceType, $scope.ExtraResourceTypes);
						var State = Content.State;
						if($scope.selectTab.Id === 1) {
							deffered.resolve("success");
						} else if($scope.selectTab.Id === 2) {} else if($scope.selectTab.Id === 3) {

						} else {}

					} else {
						layerAlert.autoclose(Message);
					}
				}).error(function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				});
			} else {
				$scope.ItemContent = x;
				$scope.fields_List = $scope.fieldsList[5];
				deffered.resolve();
				_deffered.resolve();
			}

			promises.then(function() {
				var templateName = $scope.templateName;
				var Content = $scope.ItemContent;
				_promises.then(function() {
					PcService.bindFormData($scope.ItemContent, $scope.fields_List);
					var fields_List = $scope.fields_List;
					fields_List.forEach(function(item, index) {
						item.editable = true;
						if(item.name === "AuditState") {
							item.value = PcService.numberToText(item.value, $scope.AuditStates);
						} else if(item.name === "VerifyState") {
							item.value = PcService.numberToText(item.value, $scope.VerifyStates);
						} else if(item.name === "NegotiateState") {
							item.value = PcService.numberToText(item.value, $scope.NegotiateStates);
						}

					});
					ngDialog.openConfirm({
						template: templateName,
						controller: ['$scope', function($scope) {
							$scope.ItemContent = Content;
							$scope.fieldsList = fields_List;
							$scope.TitleText = TItle;
							$scope.preTItie = "查看";
							$scope.formSubmit = function() {
								$scope.closeThisDialog();
							};

							$scope.closeDialog = function() {
								$scope.closeThisDialog();
							};
						}],
						className: 'ngdialog-theme-default',
						//closeByEscape: true,
						closeByDocument: false,
						width: 600
					});
				});

			}, function(value) {
				console.log(value);
			}, function(value) {
				console.log(value);
			});
		};

		//审核状态
		$scope.AuditStates = [{
			Id: 0,
			Name: "未审核"
		}, {
			Id: 1,
			Name: "审核通过"
		}, {
			Id: 2,
			Name: "审核驳回"
		}];
		$scope.fieldsList = [
			//0、核实查看表单
			[{
				name: "Name",
				nameDisplay: "名称",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "WorkerNoderName",
				nameDisplay: "节点名称",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "VerifyState",
				nameDisplay: "核实状态",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "CreatedAt",
				nameDisplay: "创建时间",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "Description",
				nameDisplay: "描述",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "SeatAddress",
				nameDisplay: "位置信息",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}],
			//1、表单上传：流动人口
			[{
				name: "Name",
				nameDisplay: "名称",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "DomicilePlace",
				nameDisplay: "住所",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "IDCardNo",
				nameDisplay: "身份证号码",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "CurrentAddress",
				nameDisplay: "当前地址",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "Phone",
				nameDisplay: "手机号码",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "SeatAddress",
				nameDisplay: "位置信息",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}],
			//2、表单上传：环境卫生
			[{
				name: "Remarks",
				nameDisplay: "备注",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "SeatAddress",
				nameDisplay: "位置",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "ImagesN",
				nameDisplay: "照片",
				editor: "photo",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "SeatAddress",
				nameDisplay: "位置信息",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}],
			//3、表单上传：纠纷调解
			[{
				name: "Remarks",
				nameDisplay: "备注",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "SeatAddress",
				nameDisplay: "位置",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "ImagesN",
				nameDisplay: "照片",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "SeatAddress",
				nameDisplay: "位置信息",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}],
			//4、表单上传：重点人群
			[{
				name: "Name",
				nameDisplay: "名称",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "DomicilePlace",
				nameDisplay: "住所",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "IDCardNo",
				nameDisplay: "身份证号码",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "CurrentAddress",
				nameDisplay: "当前地址",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "Phone",
				nameDisplay: "手机号码",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "SeatAddress",
				nameDisplay: "位置信息",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}],
			//5、审核查看
			[{
				name: "NoderName",
				nameDisplay: "节点名称",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "WorkName",
				nameDisplay: "工作者",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "AuditState",
				nameDisplay: "审核状态",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "CreatedAt",
				nameDisplay: "创建时间",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "SeatAddress",
				nameDisplay: "位置信息",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}],
			//6、线上民主协商
			[{
				name: "Name",
				nameDisplay: "协商项目",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "Description",
				nameDisplay: "描述",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "NegotiateState",
				nameDisplay: "协商状态",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "ValidStartTime",
				nameDisplay: "有效开始时间",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "ValidEndTime",
				nameDisplay: "有效结束时间",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "SeatAddress",
				nameDisplay: "位置信息",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}],
			//7、线下民主协商PhotoAlbumName=20170912协商结果-lq院落lq院落A座1单元3楼302-流动人口
			[{
				name: "PhotoAlbumName",
				nameDisplay: "相册名称",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "PhotoAlbumName",
				nameDisplay: "相册名称",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "PhotoAlbumName",
				nameDisplay: "相册名称",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "PhotoAlbumName",
				nameDisplay: "相册名称",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "SeatAddress",
				nameDisplay: "位置信息",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}],
			//基金申请查看
			[{
				name: "Name",
				nameDisplay: "名称",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "Amount",
				nameDisplay: "金额",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "ResidentStatus",
				nameDisplay: "身份证ID",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "FinancesType",
				nameDisplay: "基金类型",
				editor: "select",
				value: "",
				originValue: 1,
				column: 1,
				opts: [{
					Id: 1,
					Name: "困难救助"
				}, {
					Id: 2,
					Name: "院落修缮"
				}, {
					Id: 3,
					Name: "院落关怀"
				}, {
					Id: 4,
					Name: "其它"
				}]
			}, {
				name: "Remarks",
				nameDisplay: "备注",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "SeatAddress",
				nameDisplay: "位置信息",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}],
			//8、安全隐患
			[{
				name: "Remarks",
				nameDisplay: "备注",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "SeatAddress",
				nameDisplay: "位置",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "ImagesN",
				nameDisplay: "照片（前）",
				editor: "photo",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "ImagesT",
				nameDisplay: "照片（后）",
				editor: "photo",
				value: "",
				originValue: "",
				column: 1
			}, {
				name: "SeatAddress",
				nameDisplay: "位置信息",
				editor: "normal",
				value: "",
				originValue: "",
				column: 1
			}],

		];

		/*$scope.fieldsList = [
			[
				[{
					name: "AuditState",
					nameDisplay: "审核结果",
					editor: "select",
					required: false,
					value: "",
					column: 1,
					opts: [{
						Id: 1,
						Name: "审核通过"
					}, {
						Id: 2,
						Name: "审核驳回"
					}],
					originValue: 1,
					changeListen: function(scope, v) {
						var $scope = scope.$parent.$parent;
						if(v === 2) {
							$scope.fieldsList[1].ifHave = true;
						} else {
							$scope.fieldsList[1].ifHave = false;
						}
					}
				}, {
					name: "nextNoderId",
					nameDisplay: "下一节点",
					editor: "select",
					required: true,
					value: "",
					originValue: "",
					opts: $scope.NextNoders,
					column: 1
				}],
				[{
					name: "nextNoderId",
					nameDisplay: "下一节点",
					editor: "select",
					required: true,
					value: "",
					originValue: "",
					opts: $scope.nextNoderIds,
					column: 1
				}]
			],
			[]
		];*/

		//获取外部可用资源
		var getErresource = function($scope, Id, type, resId, deffered) {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.erResourcebyworkerid + "?workerid=" + Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var Content = response.Content;
					switch(type) {
						case 2:
							var FormId = Content.FormId;
							if(FormId === 0) {
								layerAlert.autoclose("暂时无法完成该项操作！");
								return;
							} else {
								finishersFillform(resId, FormId);
							}
							break;
						case 4:
							break;
						case 8:
							break;
						case 16:
							break;
						case 32:
							break;
						case 64:
							break;
						case 128:
							var _FormId = Content.FormId;
							if(_FormId === 0) {
								layerAlert.autoclose("暂时无法完成该项操作！");
								return;
							} else {
								finishersStorage(resId, FormId);
							}
							break;
						default:
							break;
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取外部资源
		var getResource = function($scope, Id, type, deffered, noderId, fieldsList, x) {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.erByworkerid + "?workerid=" + Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var Content = response.Content;
					var State = Content.State;
					var resId = Content.Id;
					if(x) {
						x.resId = resId;
					}
					if(State === 0) {
						switch(type) {
							case 2:
								getErresource($scope, Id, type, resId, deffered);
								break;
							case 4:
								break;
							case 8:
								break;
							case 16:
								break;
							case 32:
								break;
							case 64:
								getErresource($scope, Id, type, resId, deffered);
								break;
							case 128:
								getErresource($scope, Id, type, resId, deffered);
								break;
							default:
								break;
						}
					} else if(State === 1) {
						switch(type) {
							case 2:
								var FormId = Content.FormId;
								if(FormId === 0) {
									layerAlert.autoclose("暂时无法完成该项操作！");
									return;
								} else {
									finishersFillform(resId, FormId);
								}
								break;
							case 4:
								fieldsList = fieldsList[0];
								upDateOnlineDemoproject(Content, fieldsList);
								break;
							case 8:
								break;
							case 16:
								break;
							case 32:
								break;
							case 64:
								break;
							case 128:
								var _FormId = Content.FormId;
								if(_FormId === 0) {
									layerAlert.autoclose("暂时无法完成该项操作！");
									return;
								} else {
									finishersStorage(resId, _FormId);
								}
								break;
							default:
								break;
						}
						/*deffered.resolve("success");*/
					} else if(State === 2) {
						if(type === 4) {
							fieldsList = fieldsList[1];
						}
						getNextNoders($scope, noderId, fieldsList, deffered);
					} else {
						deffered.resolve("success");
					}

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//处理事项
		$scope.editItem = function(x) {
			var deffered = $q.defer();
			var promises = deffered.promise;
			var fieldsList, w = 600,
				preTItie, url, Param = null,
				create = true,
				templateName = "";
			var fetchData = $scope.fetchData;
			switch(x.WorkNodeWorkerType) {
				case 1:
					preTItie = "审核";
					create = false;
					url = serverUrls.workerAudit + "?nextNoderId=";
					switch(x.AuditState) {
						case 0:
							fieldsList = $scope.fieldsList[0][0];
							templateName = "_createOne";
							break;
						case 1:
							fieldsList = $scope.fieldsList[0][1];
							templateName = "createOne";
							break;
						case 2:
							break;
					}
					getNextNoders($scope, x.NoderId, fieldsList, deffered);
					break;
				case 2:
					create = false;
					fieldsList = $scope.fieldsList[1][0];
					var WorkExtraResource = x.WorkExtraResource;
					var itemArray = [];
					$scope.ExtraResourceTypes.forEach(function(item, index) {
						if((item.Id & WorkExtraResource) === item.Id) {
							itemArray.push(item);
						}
					});
					if(itemArray.length !== 1) {
						checkmyNextStep(x, itemArray, $scope, deffered, fieldsList, $scope.fieldsList, templateName);
					} else {
						switch(WorkExtraResource) {
							case 1:
								url = serverUrls.workerBlank + "?nextNoderId=";
								preTItie = "普通（无）";
								fieldsList = $scope.fieldsList[1][0];
								templateName = "createOne";
								getNextNoders($scope, x.NoderId, fieldsList, deffered);
								break;
							case 2:
								url = serverUrls.workerBlank + "?nextNoderId=";
								preTItie = "表单填写";
								fieldsList = $scope.fieldsList[1][0];
								templateName = "_createOne";
								getResource($scope, x.Id, x.ResourceType, deffered, x.NoderId, fieldsList);
								break;
							case 4:
								url = serverUrls.finisherDponline;
								preTItie = "线上民主协商";
								fieldsList = $scope.fieldsList[1];
								templateName = "createOne";
								getResource($scope, x.Id, x.ResourceType, deffered, x.NoderId, fieldsList, x);
								break;
							case 8:
								url = serverUrls.erResourcebyworkerid + "?workerid=" + x.Id;
								preTItie = "线下民主协商";
								fieldsList = $scope.fieldsList[1][3];
								templateName = "listOne";
								w = 850;
								deffered.resolve("success");
								break;
							case 16:
								url = serverUrls.erResourcebyworkerid + "?workerid=" + x.Id;
								preTItie = "线上临时民主协商";
								fieldsList = $scope.fieldsList[1][4];
								templateName = "createOne";
								getResource($scope, x.Id, x.ResourceType, deffered);
								break;
							case 32:
								url = serverUrls.erResourcebyworkerid + "?workerid=" + x.Id;
								preTItie = "线下临时民主协商无";
								fieldsList = $scope.fieldsList[1][5];
								templateName = "createOne";
								getResource($scope, x.Id, x.ResourceType, deffered);
								break;
							case 64:
								url = serverUrls.erResourcebyworkerid + "?workerid=" + x.Id;
								preTItie = "核实";
								fieldsList = $scope.fieldsList[1][6];
								templateName = "createOne";
								getResource($scope, x.Id, x.ResourceType, deffered);
								break;
							case 128:
								url = serverUrls.erResourcebyworkerid + "?workerid=" + x.Id;
								preTItie = "入库";
								fieldsList = $scope.fieldsList[1][7];
								templateName = "createOne";
								getResource($scope, x.Id, x.ResourceType, deffered);
								break;
							default:
								break;
						}
					}
					break;
			}

			promises.then(function(value) {
				PcService.initFormList(fieldsList);
				var DemocraticProjects = $scope.DemocraticProjects;
				//var Photoes = $scope.Photoes;
				ngDialog.openConfirm({
					template: templateName,
					controller: ["$scope", function($scope) {
						$scope.fetchData = fetchData;
						$scope.preTItie = preTItie;
						$scope.TitleText = "事项处理";
						$scope.fieldsList = fieldsList;
						$scope.Photoes = [];

						if(x.WorkNodeWorkerType === 2 && x.ResourceType === 4) {
							$scope.DemocraticProjects = DemocraticProjects;
						}

						if(x.WorkNodeWorkerType === 2 && x.ResourceType === 8) {
							$scope.TitleName = "相册";
							$scope.getPhotoes = function($scope, deffered) {
								getPhotoes($scope, deffered);
							};

							//照片管理
							$scope.AlbumManage = function(a) {
								ngDialog.openConfirm({
									template: 'listOne',
									controller: ['$scope', function($scope) {

										$scope.TitleText = "照片";
										$scope.preTItie = "管理";
										$scope.TitleName = "照片";
										getItPhotoes($scope, a);

										//新增照片
										$scope.createAlbum = function() {
											var _scope = $scope;
											ngDialog.openConfirm({
												template: 'createOne',
												controller: ['$scope', function($scope) {
													$scope.fieldsList = [{
														name: "PhotoUrl",
														nameDisplay: "选择照片",
														editor: "file-upload",
														required: true,
														value: ""

													}, {
														name: "Name",
														nameDisplay: "名称",
														editor: "normal",
														required: false,
														value: ""

													}, {
														name: "Description",
														nameDisplay: "描述",
														editor: "normal",
														required: false,
														value: ""

													}, {
														name: "Note",
														nameDisplay: "备注",
														editor: "normal",
														required: false,
														value: ""

													}];
													$scope.TitleText = "新增";
													$scope.preTItie = "照片";
													$scope.formSubmit = function() {
														addNewPhotoes(_scope, $scope, $scope.fieldsList, a);
													};
												}],
												className: 'ngdialog-theme-default',
												//closeByEscape: true,
												closeByDocument: false,
												width: 600
											});
										};
										//删除照片
										$scope.deleteAlbum = function(a) {
											deleteAlbum($scope, a, true);
										};

									}],
									className: 'ngdialog-theme-default',
									//closeByEscape: true,
									closeByDocument: false,
									width: 600
								});
							};

							//删除相册
							$scope.deleteAlbum = function(a) {
								deleteAlbum($scope, a);
							};
							$scope.getPhotoes($scope, deffered);
							//修改相册
							$scope.editAlbum = function(a) {
								var _scope = $scope;
								ngDialog.openConfirm({
									template: 'createOne',
									controller: ['$scope', function($scope) {
										$scope.fieldsList = [{
											name: "Name",
											nameDisplay: "名称",
											editor: "normal",
											required: true,
											value: "",
											column: 1

										}, {
											name: "Description",
											nameDisplay: "描述",
											editor: "normal",
											required: false,
											value: "",
											column: 1

										}, {
											name: "Note",
											nameDisplay: "备注",
											editor: "normal",
											required: false,
											value: "",
											column: 1

										}];
										PcService.bindFormData(a, $scope.fieldsList);
										$scope.TitleText = "修改";
										$scope.preTItie = "相册";
										$scope.formSubmit = function() {
											addNewAlbum(_scope, $scope, false, $scope.fieldsList, a);
										};
									}],
									className: 'ngdialog-theme-default',
									//closeByEscape: true,
									closeByDocument: false,
									width: 600
								});
							};
							//新增相册
							$scope.createAlbum = function() {
								var _scope = $scope;
								ngDialog.openConfirm({
									template: 'createOne',
									controller: ['$scope', function($scope) {
										$scope.fieldsList = [{
											name: "Name",
											nameDisplay: "名称",
											editor: "normal",
											required: true,
											value: "",
											column: 1

										}, {
											name: "Description",
											nameDisplay: "描述",
											editor: "normal",
											required: false,
											value: "",
											column: 1

										}, {
											name: "Note",
											nameDisplay: "备注",
											editor: "normal",
											required: false,
											value: "",
											column: 1

										}];
										$scope.TitleText = "新增";
										$scope.preTItie = "相册";
										$scope.formSubmit = function() {
											addNewAlbum(_scope, $scope, true, $scope.fieldsList);
										};
									}],
									className: 'ngdialog-theme-default',
									//closeByEscape: true,
									closeByDocument: false,
									width: 600
								});
							};
						}
						//关闭弹出粗航口操作
						$scope.closeDialog = function() {
							ngDialog.closeAll();
						};

						$scope.formSubmit = function() {
							var nextNoderId;
							switch(x.WorkNodeWorkerType) {
								case 1:
									Param = {
										Id: x.Id
									};
									if(!(PcService.getFormData($scope.fieldsList)).nextNoderId) {
										Param.nextNoderId = 0;
									} else {
										nextNoderId = (PcService.getFormData($scope.fieldsList)).nextNoderId;
									}
									url += nextNoderId;
									switch(x.AuditState) {
										case 0:
											break;
										case 1:
											Param.AuditState = x.AuditState;
											break;
										case 2:
											break;
									}
									break;
								case 2:
									Param = {
										Id: x.Id
									};
									switch(x.ResourceType) {
										case 1:
											nextNoderId = (PcService.getFormData($scope.fieldsList)).nextNoderId;
											if(!nextNoderId) {
												nextNoderId = 0;
											}
											url += nextNoderId;
											break;
										case 2:
											nextNoderId = (PcService.getFormData($scope.fieldsList)).nextNoderId;
											if(!nextNoderId) {
												nextNoderId = 0;
											}
											url += nextNoderId;
											break;
										case 4:
											var dpid = (PcService.getFormData($scope.fieldsList)).dpid;
											var dpname = "";
											if($scope.DemocraticProjects.length > 0) {
												$scope.DemocraticProjects.forEach(function(item, index) {
													if(item.Id === dpid) {
														dpname = item.Name;
													}
												});
											}
											var resId = x.resId ? x.resId : 0;
											finisherDponline($scope, resId, dpid, dpname);
											break;
										case 8:

											break;
										case 16:

											break;
										case 32:

											break;
										case 64:

											break;
										case 128:

											break;
										default:
											break;
									}
									break;
							}
							PcService.formSubmit($scope, create, $scope.fieldsList, url, null, Param, $rootScope.pHeader);
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: w
				});
			}, function(value) {

			}, function(value) {

			});
		};
	}
]);