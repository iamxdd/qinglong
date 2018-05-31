App.controller('daibanshixiangCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q) {

		$scope.list = [];
		$scope.NextNoders = [];
		$scope.DemocraticProjects = [];
		$scope.Photoes = [];
		$scope.PcService = PcService;
		//选项卡
		$scope.navTabList = [{
			Id: 1,
			Name: "待处理",
			Active: true
		}, {
			Id: 2,
			Name: "历史记录",
			Active: false
		}];

		//显示隐藏控制
		$scope.ifNodeWorkerType = function(list, NodeWorkerType) {
			var ifTrue = true;
			list.forEach(function(item, index) {
				if(item.WorkNodeWorkerType === NodeWorkerType) {
					ifTrue = false;
					return;
				}
			});
			return ifTrue;
		};

		$scope.selectTab = $scope.navTabList[0];
		$scope.seeFieldsList = [{
			name: "WorkName",
			nameDisplay: "工作名称",
			editor: "normal",
			required: true,
			value: ""
		}, {
			name: "CreatedAt",
			nameDisplay: "创建时间",
			editor: "textarea",
			required: false,
			value: ""
		}, {
			name: "FormType",
			nameDisplay: "表单类型",
			editor: "textarea",
			required: false,
			value: ""
		}, {
			name: "UpdatedAt",
			nameDisplay: "更新时间",
			editor: "textarea",
			required: false,
			value: ""
		}, {
			name: "FormUploaderId",
			nameDisplay: "表单上传者",
			editor: "textarea",
			required: false,
			value: ""
		}, {
			name: "UnHandle",
			nameDisplay: "无法处理",
			editor: "textarea",
			required: false,
			value: ""
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
			var param = {
				currentPage: 1,
				length: 9999,
				verify: false
			};

			var url = "";
			switch($scope.selectTab.Id) {
				case 1:
					param.history = false;
					url = serverUrls.myWorkers;
					break;
				case 2:
					param.history = true;
					url = serverUrls.myWorkers;
			}

			PcService.fetchData($scope, url, param, $rootScope.gHeader);

		};

		$scope.fetchData();

		//表单类型
		$scope.ExpectForms = [{
			Id: 0,
			Name: "流动人口"
		}, {
			Id: 1,
			Name: "环境卫生"
		}, {
			Id: 2,
			Name: "纠纷调解"
		}, {
			Id: 3,
			Name: "重点人群"
		}];

		//性别列表
		$scope.Sexes = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "男"
		}, {
			Id: 2,
			Name: "女"
		}];

		//民族列表
		$scope.Nations = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "汉族"
		}, {
			Id: 2,
			Name: "藏族"
		}, {
			Id: 3,
			Name: "彝族"
		}, {
			Id: 3,
			Name: "其他少数民族"
		}];

		//居住证列表
		$scope.ResidencePermit = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "有"
		}, {
			Id: 2,
			Name: "无"
		}];

		//社保状态列表
		$scope.SocialSecurityStatus = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "有"
		}, {
			Id: 2,
			Name: "无"
		}];

		//婚姻状态列表
		$scope.MaritalStatus = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "未婚"
		}, {
			Id: 2,
			Name: "已婚"
		}, {
			Id: 3,
			Name: "离异"
		}, {
			Id: 4,
			Name: "丧偶"
		}];

		//人员类型
		$scope.PeopleType = [{
			Name: "孤寡老人",
			Id: 1
		}, {
			Name: "残疾人",
			Id: 2
		}, {
			Name: "高龄老人",
			Id: 3
		}, {
			Name: "低保户",
			Id: 4
		}, {
			Name: "失独老人",
			Id: 5
		}, {
			Name: "吸毒人群",
			Id: 6
		}, {
			Name: "劳改刑满释放人员",
			Id: 7
		}, {
			Name: "社区矫正人员",
			Id: 8
		}, {
			Name: "其他人员",
			Id: 9
		}];

		//新增时删除下拉中全部选项
		var deleteInvalidOpts = function(fieldsList) {
			fieldsList.forEach(function(item, index) {
				if(item.editor === "select") {
					if(item.opts[0].Id === 0) {
						var newOpts = [];
						item.opts.forEach(function(_item, _index) {
							if(_item.Id > 0) {
								newOpts.push(_item);
							}
						});
						item.opts = newOpts;
						item.originValue = newOpts[0].Id;
					}
				}
			});
		};

		//获取当前节点可选下一节点列表
		var getNextNoders = function($scope, noderId, fieldsList, deffered) {
			$scope.ngDialogPromise = $http({
				method: "get",
				url: serverUrls.nextNoders + "?noderid=" + noderId
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var NextNoders = response.Content;
					fieldsList = $scope.fieldsList[0][1];
					if(NextNoders.length !== 0) {
						fieldsList.forEach(function(item, index) {
							if(item.name === "nextNoderId") {
								item.opts = NextNoders;
								item.originValue = NextNoders[0].Id;
							}
						});
					} else {
						/*layerAlert.autoclose("该节点无下一节点！");
						return;*/
						fieldsList.forEach(function(item, index) {
							if(item.name === "nextNoderId") {
								item.opts = [{
									Id: 0,
									Name: "无下一节点"
								}];
								item.originValue = 0;
							}
						});
					}

					$scope.NextNoders = response.Content;
					if(deffered) {
						deffered.resolve("success");
					} else {
						
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		$scope.fieldsList = [
			//审核
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
			[
				[{
					name: "nextNoderId",
					nameDisplay: "下一节点",
					editor: "select",
					required: true,
					value: "",
					originValue: "",
					opts: $scope.nextNoderIds,
					column: 1
				}],
				[{
					name: "dpid",
					nameDisplay: "协商项目",
					editor: "select",
					required: true,
					value: "",
					originValue: "",
					opts: $scope.nextNoderIds,
					column: 1
				}],

				//新增民主协商议题
				[{
					name: "Name",
					nameDisplay: "协商议题",
					editor: "text",
					required: true,
					value: ""
				}],
				[{
					name: "Summary",
					nameDisplay: "上报总结",
					editor: "textarea",
					required: true,
					value: ""
				}, {
					name: "ImagesT",
					nameDisplay: "图片",
					editor: "normal",
					required: true,
					value: ""
				}],
				[{
					name: "Summary",
					nameDisplay: "上报总结",
					editor: "textarea",
					required: true,
					value: ""
				}],
				[{
					name: "Name",
					nameDisplay: "姓名",
					editor: "normal",
					required: true,
					value: "",
					originValue: ""
				}, {
					name: "PopulationType",
					nameDisplay: "人员类型",
					editor: "select",
					required: true,
					value: "",
					opts: $scope.PeopleType,
					originValue: $scope.PeopleType[0].Id
				}, {
					name: "Sex",
					nameDisplay: "性别",
					editor: "select",
					required: true,
					value: "",
					opts: $scope.Sexes,
					originValue: $scope.Sexes[0].Id
				}, {
					name: "IDCardNo",
					nameDisplay: "身份证",
					editor: "normal",
					required: true,
					value: "",
					originValue: ""
				}, {
					name: "Nationality",
					nameDisplay: "民族",
					editor: "select",
					required: false,
					value: "",
					opts: $scope.Nations,
					originValue: $scope.Nations[0].Id
				}, {
					name: "DomicilePlace",
					nameDisplay: "户籍所在地",
					editor: "normal",
					required: false,
					value: "",
					originValue: ""
				}, {
					name: "Phone",
					nameDisplay: "联系电话",
					editor: "normal",
					required: false,
					value: "",
					originValue: ""
				}, {
					name: "CurrentAddress",
					nameDisplay: "现居住地",
					editor: "normal",
					required: false,
					value: "",
					originValue: ""
				}, {
					name: "ResidencePermit",
					nameDisplay: "居住证",
					editor: "select",
					required: false,
					value: "",
					opts: $scope.ResidencePermit,
					originValue: $scope.ResidencePermit[0].Id
				}, {
					name: "SocialSecurity",
					nameDisplay: "社保状态",
					editor: "select",
					required: false,
					value: "",
					opts: $scope.SocialSecurityStatus,
					originValue: $scope.SocialSecurityStatus[0].Id
				}, {
					name: "MaritalStatus",
					nameDisplay: "婚姻状态",
					editor: "select",
					required: false,
					value: "",
					opts: $scope.MaritalStatus,
					originValue: $scope.MaritalStatus[0].Id
				}]
			],
			[{
				name: "DemocraticProjectId",
				nameDisplay: "协商项目",
				editor: "select",
				required: false,
				value: "",
				column: 1
			}], //核实
			[{
				name: "VerifyState",
				nameDisplay: "核实结果",
				editor: "select",
				required: false,
				value: "",
				column: 1,
				opts: [{
					Id: 1,
					Name: "已核实事件属实"
				}, {
					Id: 2,
					Name: "已核实单事件不属实"
				}],
				originValue: 1
			}], //入库
			[]
		];

		//完成线上民主协商
		var finisherDponline = function(scope, erid, dpid, dpname) {
			$scope.ngDialogPromise = $http({
				headers: $rootScope.gHeader,
				method: "get",
				url: serverUrls.finisherDponline + "?erid=" + erid + "&dpid=" + dpid + "&dpname=" + dpname
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("线上民主协商完成!");
					scope.fetchData();
					return;
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//查看待办事项
		$scope.seeItem = function(x) {
			var fieldsList = $scope.seeFieldsList;
			PcService.bindFormData(x, fieldsList);
			ngDialog.openConfirm({
				template: 'seeOne',
				controller: ["$scope", function($scope) {
					$scope.fieldsList = fieldsList;

					$scope.closeDialog = function() {
						ngDialog.closeAll();
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false
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

		/*$scope.NodeWorkerTypes = [{
			Id: 1,
			Name: "上传表单附件"
		}, {
			Id: 2,
			Name: "审核"
		}, {
			Id: 3,
			Name: "民主协商议题结果监听"
		}, {
			Id: 4,
			Name: "核实"
		}, {
			Id: 5,
			Name: "入库"
		}];*/

		$scope.NodeWorkerTypes = [{
			Id: 1,
			Name: "审核"
		}, {
			Id: 2,
			Name: "普通"
		}];
		$scope.NodeWorkerType = 1;

		//根据工作流定义iD和工作流实例id获取事件
		var getUpLoaderInfo = function(x) {
			$scope.ngDialogPromise = $http({
				method: "get",
				url: serverUrls.eventByworkflowerid + "?inspectorId=" + x.WorkNodeBelongStepWorkflowId + "&workflowerId=" + x.NoderStepWorkflowId
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var Info = response.Content;
					x.UploadMemberInfo = {
						ResidentStatus: Info.UploadMemberId,
						Seat: Info.OccurLocationId,
						Remarks: Info.Note
					};
					if(Info.IsProved) {
						x.UploadMemberInfo.State = 2;
					} else {
						x.UploadMemberInfo.State = 1;
					}
					if(Info.FormId) {
						x.FormId = Info.FormId;
					}
					//console.log(x);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//根据工作流节点实例Id获取工作流实例
		var getResident = function(x, NoderId, isGoon) {
			$scope.ngDialogPromise = $http({
				method: "get",
				url: serverUrls.workflowerBynode + "?noderid=" + NoderId
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var InspectorId = response.Content.InspectorId;
					var workflowerId = response.Content.Id;
					if(!isGoon) {
						getUpLoaderInfo(x, InspectorId, workflowerId);
					}

				}
			}).error(function(err) {
				layerAlert.autoclose(err.Message ? err.Message : err + "");
			});
		};

		//获取民主协商项目组
		var getDemocraticProjectIds = function($scope, fieldsList, deffered) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.transacationList + "?length=9999&currentPage=1"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.DemocraticProjects = response.Content.pagelist;
					fieldsList.forEach(function(item, index) {
						if(item.name === "dpid") {
							item.opts = $scope.DemocraticProjects;
							item.originValue = $scope.DemocraticProjects[0] ? $scope.DemocraticProjects[0].Id : "";
						}
					});
					deffered.resolve("success");
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//民主写上项目根据Id获取Name
		var getDemocraticProjectName = function($scope, Param, id) {
			$scope.DemocraticProjects.forEach(function(item, index) {
				if(item.Id === id) {
					Param.DemocraticProjectName = item.Name;
					return;
				}
			});
		};
		//判断是否拥有表单
		var isHasThisForm = function(x) {
			$scope.ngDialogPromise = $http({
				method: "get",
				url: serverUrls.eventByworkflowerid + "?inspectorId=" + x.WorkNodeBelongStepWorkflowId + "&workflowerId=" + x.NoderStepWorkflowId
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var Info = response.Content;
					if(Info.FormId) {
						x.FormId = Info.FormId;
					}
					//console.log(x);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//完成入库操作
		var finishersStorage = function(erid, formid) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: serverUrls.finisherStorage + "?erid=" + erid + "&formid=" + formid
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("表单填写事项处理完成！");
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//完成表单填写工作
		var finishersFillform = function(erid, formid) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: serverUrls.finishersFillform + "?erid=" + erid + "&formid=" + formid
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("表单填写事项处理完成！");
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

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
					//deffered.resolve("success");
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//更新线上民主协商
		var upDateOnlineDemoproject = function(Content) {
			var _deffered = $q.defer();
			var _promises = _deffered.promise;
			var fieldsList = [{
				name: "dpid",
				nameDisplay: "协商项目",
				editor: "select",
				required: true,
				value: "",
				originValue: "",
				opts: $scope.DemocraticProjects,
				column: 1
			}];
			if($scope.DemocraticProjects.length === 0) {
				getDemocraticProjectIds($scope, fieldsList, _deffered);
			} else {
				_deffered.resolve();
			}
			_promises.then(function(value) {
				ngDialog.openConfirm({
					template: 'createOne',
					controller: ['$scope', function($scope) {
						PcService.initFormList(fieldsList);
						$scope.fieldsList = fieldsList;
						$scope.TitleText = "事项处理";
						$scope.preTItie = "线上民主协商";
						$scope.formSubmit = function() {
							var DPId = (PcService.getFormData($scope.fieldsList)).dpid;
							var dpName = "";
							$scope.DemocraticProjects.forEach(function(item, index) {
								if(item.Id === DPId) {
									DPName = item.Name;
								}
							});
							var data = {
								DPName: DPName,
								DPId: DPId
							};
							data = $.extend(true, Content, data);
							$scope.ngDialogPromise = $http({
								headers: $rootScope.pHeader,
								method: 'put',
								url: serverUrls.erDemoprojectonline,
								data: data
							}).success(function(response) {
								var Code = response.State.Code;
								var Message = response.State.Message;
								if(Code === 0) {
									layerAlert.autoclose("更新操作成功！");
									$scope.closeThisDialog();
								} else {
									layerAlert.autoclose(Message);
								}
							}).error(function(error) {
								layerAlert.autoclose(errorResult(error));
							});
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 850
				});
			}, function(value) {

			}, function(value) {

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
								getDemocraticProjectIds($scope, fieldsList[1], deffered);
								break;
							case 8:
								getErresource($scope, Id, type, resId, deffered);
								break;
							case 16:
								getErresource($scope, Id, type, resId, deffered);
								break;
							case 32:
								getErresource($scope, Id, type, resId, deffered);
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
						getNextNoders($scope, noderId, fieldsList);
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

		//获取线下民主协商相册
		var getPhotoes = function($scope, deffered) {
			var params = {};
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.photoAlbum,
				params: params,
				success: function(response) {
					$scope.Photoes = response;
					if(deffered) {
						deffered.resolve("success");
					}
				},
				error: function(error) {
					layerAlert.autoclose(errorResult(error));
				}
			});

		};

		var deleteAlbum = function($scope, a, child) {
			if(child) {
				url = serverUrls.photoItem;
			} else {
				url = serverUrls.dophotoalbum;
			}
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: 'delete',
				url: url + "?id=" + a.Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("删除操作成功！");
					$scope.getPhotoes($scope);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(errorResult(error));
			});
		};

		//获取相册照片列表
		var getItPhotoes = function($scope, a) {
			var params = {
				albumid: a.Id
			};
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.photoitemList,
				params: params,
				success: function(response) {
					$scope.Photoes = response;
				},
				error: function(error) {
					layerAlert.autoclose(errorResult(error));
				}
			});
		};

		//新增照片
		var addNewPhotoes = function(_scope, $scope, fieldsList, a) {
			var data = PcService.getFormData(fieldsList);
			data.AlbumId = a.Id;
		};

		//新增修改相册
		var addNewAlbum = function(scope, $scope, create, fieldsList, x) {
			var method, doAction;
			var data = PcService.getFormData(fieldsList);
			switch(create) {
				case true:
					method = "post";
					doAction = "新增";
					break;
				case false:
					method = "put";
					doAction = "修改";
					if(x) {
						data.Id = x.Id;
					}
					break;
			}
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: method,
				url: serverUrls.dophotoalbum,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose(doAction + "操作成功！");
					if(scope) {
						scope.getPhotoes(scope);
					}
					setTimeout(function() {
						$scope.closeThisDialog();
					}, 1600);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(errorResult(error));
			});
		};

		//选择下一步操作
		var checkmyNextStep = function(x, itemArray, _scope, deffered, fieldsList, _fieldsList, templateName) {
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.fieldsList = [{
						name: "WorkExtraResource",
						nameDisplay: "外部资源类型",
						editor: "select",
						required: true,
						opts: itemArray,
						value: itemArray[0].Id,
						column: 1
					}];
					$scope.TitleText = "选择";
					$scope.preTItie = "操作";
					$scope.formSubmit = function() {
						var data = PcService.getFormData($scope.fieldsList);
						_scope.WorkExtraResource = data.WorkExtraResource;
						$scope.closeThisDialog();
						switch(_scope.WorkExtraResource) {
							case 1:
								url = serverUrls.workerBlank + "?nextNoderId=";
								preTItie = "普通（无）";
								fieldsList = _fieldsList[1][0];
								templateName = "createOne";
								getNextNoders($scope, x.NoderId, fieldsList, deffered);
								break;
								/*case 2:
									url = serverUrls.workerBlank + "?nextNoderId=";
									preTItie = "表单填写";
									fieldsList = _fieldsList[0][0];
									templateName = "_createOne";
									getResource($scope, x.Id, x.ResourceType, deffered, x.NoderId, fieldsList);
									break;
								case 4:
									url = serverUrls.finisherDponline;
									preTItie = "线上民主协商";
									fieldsList = _fieldsList[1][1];
									templateName = "createOne";
									getResource($scope, x.Id, x.ResourceType, deffered, x.NoderId, fieldsList, x);
									break;
								case 8:
									url = serverUrls.erResourcebyworkerid + "?workerid=" + x.Id;
									preTItie = "线下民主协商";
									fieldsList = _fieldsList[1][3];
									templateName = "listOne";
									w = 850;
									deffered.resolve("success");
									break;*/
							case 16:
								url = serverUrls.erResourcebyworkerid + "?workerid=" + x.Id;
								preTItie = "线上临时民主协商";
								fieldsList = _fieldsList[1][4];
								newCreateOnline(fieldsList);
								/*templateName = "createOne";
								getResource($scope, x.Id, x.ResourceType, deffered);*/
								break;
							case 32:
								url = serverUrls.erResourcebyworkerid + "?workerid=" + x.Id;
								preTItie = "线下临时民主协商无";
								fieldsList = _fieldsList[1][5];
								newCreateOutline(fieldsList);
								/*
								templateName = "createOne";
								getResource($scope, x.Id, x.ResourceType, deffered);*/
								break;
								/*case 64:
									url = serverUrls.erResourcebyworkerid + "?workerid=" + x.Id;
									preTItie = "核实";
									fieldsList = _fieldsList[1][6];
									templateName = "createOne";
									getResource($scope, x.Id, x.ResourceType, deffered);
									break;
								case 128:
									url = serverUrls.erResourcebyworkerid + "?workerid=" + x.Id;
									preTItie = "入库";
									fieldsList = _fieldsList[1][7];
									templateName = "createOne";
									getResource($scope, x.Id, x.ResourceType, deffered);
									break;
								default:
									break;*/
						}
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
		};

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
												width: 850
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
									width: 850
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
									width: 850
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
									width: 850
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