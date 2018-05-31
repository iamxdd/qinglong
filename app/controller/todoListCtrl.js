App.controller('todoListCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q) {
		$scope.themeList = [];
		$scope.photoAlbumList = [];
		//eval方法
		var evil = function(fn) {
			var Fn = Function; //一个变量指向Function，防止有些前端编译工具报错
			return new Fn('return ' + fn)();
		};

		var myCountInfo = evil("(" + localStorage.getItem("myCountInfo") + ")");
		var mid = myCountInfo.memberid;
		$scope.PcService = PcService;
		//选项卡菜单
		$scope.navTabList = [{
			Id: 1,
			Name: "信息核实",
			Active: false
		}, {
			Id: 2,
			Name: "事项处理",
			Active: true
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

		//民族列表
		$scope.Nations = [{
			Id: 0,
			Name: "无"
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
			Id: 4,
			Name: "其他少数民族"
		}];

		//默认选中第一个
		$scope.selectTab = $scope.navTabList[1];

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

		//婚姻状态
		$scope.maritalStatus = [{
			Id: 0,
			Name: "无"
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

		$scope.fieldsList = [
			[{
				name: "verifyState",
				nameDisplay: "核实操作",
				editor: "select",
				required: true,
				value: "",
				originValue: 1,
				opts: [{
					Id: 1,
					Name: "核实有效"
				}, {
					Id: 2,
					Name: "核实无效"
				}]
			}, {
				name: "nextNoderId",
				nameDisplay: "下一节点",
				editor: "select",
				required: false,
				value: "",
				originValue: "",
				opts: []
			}, {
				name: "note",
				nameDisplay: "备注",
				editor: "textarea",
				required: false,
				value: "",
				originValue: ""
			}],
			[{
				name: "AuditState",
				nameDisplay: "审核操作",
				editor: "select",
				required: true,
				value: "",
				originValue: 1,
				opts: [{
					Id: 1,
					Name: "审核通过"
				}, {
					Id: 2,
					Name: "审核驳回"
				}]
			}, {
				name: "nextNoderId",
				nameDisplay: "下一节点",
				editor: "select",
				required: false,
				value: "",
				originValue: ""
			}],
			[{
				name: "nextNoderId",
				nameDisplay: "下一节点",
				editor: "select",
				required: false,
				value: "",
				originValue: ""
			}],
			[{
				name: "DPId",
				nameDisplay: "协商议题",
				editor: "select",
				required: false,
				value: "",
				originValue: ""
			}],
			[{
				name: "photoAlbumId",
				nameDisplay: "选择相册",
				editor: "select",
				required: false,
				value: "",
				originValue: ""
			}],
			[{
				name: "Name",
				nameDisplay: "名称",
				editor: "normal",
				required: true,
				value: "",
				originValue: ""
			}, {
				name: "Description",
				nameDisplay: "描述",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}, {
				name: "Note",
				nameDisplay: "备注",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}],
			[{
				name: "DPId",
				nameDisplay: "选择协商议题",
				editor: "select",
				required: true,
				value: "",
				originValue: ""
			}, {
				name: "Name",
				nameDisplay: "名称",
				editor: "normal",
				required: true,
				value: "",
				editable: true,
				originValue: ""
			}, {
				name: "Description",
				nameDisplay: "描述",
				editor: "normal",
				required: false,
				value: "",
				editable: true,
				originValue: ""
			}, {
				name: "Note",
				nameDisplay: "备注",
				editor: "normal",
				required: false,
				value: "",
				editable: true,
				originValue: ""
			}],
			[{
				name: "photoAlbumId",
				nameDisplay: "选择相册",
				editor: "select",
				required: true,
				value: "",
				originValue: ""
			}, {
				name: "Description",
				nameDisplay: "描述",
				editor: "normal",
				required: false,
				value: "",
				editable: true,
				originValue: ""
			}, {
				name: "Note",
				nameDisplay: "备注",
				editor: "normal",
				required: false,
				value: "",
				editable: true,
				originValue: ""
			}],
			[{
				name: "Name",
				nameDisplay: "事项名称",
				editor: "normal",
				required: true,
				value: "",
				originValue: ""
			}, {
				name: "FormType",
				nameDisplay: "事项类型",
				editor: "normal",
				required: true,
				value: "",
				originValue: ""
			}, {
				name: "PositonInfo",
				nameDisplay: "目标位置",
				editor: "normal",
				required: false,
				value: "",
				editable: true,
				originValue: ""
			}, {
				name: "ResourceTypeName",
				nameDisplay: "处理方法",
				editor: "normal",
				required: false,
				value: "",
				editable: true,
				originValue: ""
			}, {
				name: "formId",
				nameDisplay: "关联表单",
				editor: "select",
				required: false,
				value: "",
				editable: true,
				originValue: ""
			}],
			//重点人群表单详情
			[{
					name: "Name",
					nameDisplay: "姓名",
					editor: "normal",
					required: false,
					value: "",
					editable: true,
					originValue: ""
				}, {
					name: "Nationality",
					nameDisplay: "民族",
					editor: "select",
					required: false,
					value: "",
					editable: true,
					originValue: "",
					opts: $scope.Nations
				}, {
					name: "IDCardNo",
					nameDisplay: "身份证号码",
					editor: "normal",
					required: false,
					value: "",
					editable: true,
					originValue: ""
				}, {
					name: "DomicilePlace",
					nameDisplay: "户籍所在地",
					editor: "normal",
					required: false,
					value: "",
					editable: true,
					originValue: ""
				}, {
					name: "CurrentAddress",
					nameDisplay: "现居住地",
					editor: "normal",
					required: false,
					value: "",
					editable: true,
					originValue: ""
				}, {
					name: "Phone",
					nameDisplay: "联系电话",
					editor: "normal",
					required: false,
					value: "",
					editable: true,
					originValue: ""
				}, {
					name: "PopulationType",
					nameDisplay: "人群类型",
					editor: "multiselect",
					required: false,
					value: "",
					editable: true,
					opts: $scope.PeopleType,
					originValue: "",
					column: 1
				}, {
					name: "ResidencePermit",
					nameDisplay: "居住证",
					editor: "select",
					required: false,
					value: "",
					editable: true,
					originValue: "",
					opts: [{
						Id: 1,
						Name: "有"
					}, {
						Id: 2,
						Name: "无"
					}]
				}, {
					name: "SocialSecurity",
					nameDisplay: "是否购买社保",
					editor: "select",
					required: false,
					value: "",
					editable: true,
					originValue: "",
					opts: [{
						Id: 1,
						Name: "是"
					}, {
						Id: 2,
						Name: "否"
					}]
				},
				{
					name: "MaritalStatus",
					nameDisplay: "婚姻状态",
					editor: "select",
					required: false,
					value: "",
					editable: true,
					originValue: "",
					opts: $scope.maritalStatus
				}
			], //重点人群表单详情
			[{
					name: "Name",
					nameDisplay: "姓名",
					editor: "normal",
					required: false,
					value: "",
					editable: true,
					originValue: ""
				}, {
					name: "Nationality",
					nameDisplay: "民族",
					editor: "select",
					required: false,
					value: "",
					editable: true,
					originValue: "",
					opts: $scope.Nations
				}, {
					name: "IDCardNo",
					nameDisplay: "身份证号码",
					editor: "normal",
					required: false,
					value: "",
					editable: true,
					originValue: ""
				}, {
					name: "DomicilePlace",
					nameDisplay: "户籍所在地",
					editor: "normal",
					required: false,
					value: "",
					editable: true,
					originValue: ""
				}, {
					name: "CurrentAddress",
					nameDisplay: "现居住地",
					editor: "normal",
					required: false,
					value: "",
					editable: true,
					originValue: ""
				}, {
					name: "Phone",
					nameDisplay: "联系电话",
					editor: "normal",
					required: false,
					value: "",
					editable: true,
					originValue: ""
				}, {
					name: "ResidencePermit",
					nameDisplay: "居住证",
					editor: "select",
					required: false,
					value: "",
					editable: true,
					originValue: "",
					opts: [{
						Id: 1,
						Name: "有"
					}, {
						Id: 2,
						Name: "无"
					}]
				}, {
					name: "SocialSecurity",
					nameDisplay: "是否购买社保",
					editor: "select",
					required: false,
					value: "",
					editable: true,
					originValue: "",
					opts: [{
						Id: 1,
						Name: "是"
					}, {
						Id: 2,
						Name: "否"
					}]
				},
				{
					name: "MaritalStatus",
					nameDisplay: "婚姻状态",
					editor: "select",
					required: false,
					value: "",
					editable: true,
					originValue: "",
					opts: $scope.maritalStatus
				}
			]
		];

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

		//根据位置信息id获取位置信息
		var getDate = function($scope, Id, item) {
			$scope.ngDialogPromise = $http({
				method: "get",
				url: serverUrls.getDate + "?id=" + Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					item.PositonInfo = response.Content.GradePathName;
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//根据工作流定义iD和工作流实例id获取事件
		var getUpLoaderInfo = function($scope, item, isGoon) {
			$scope.ngDialogPromise = $http({
				method: "get",
				url: serverUrls.eventByworkflowerid + "?inspectorId=" + item.NoderWorkflowerId + "&workflowerId=" + item.NoderWorkflowerId
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					if(isGoon) {
						var OccurLocationId = response.Content.OccurLocationId;
						getDate($scope, OccurLocationId, item);
					} else {
						var UploaderName = response.Content.CreatorNickName;
						item.UploaderName = UploaderName;
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
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
					//PcService.fetchData($scope, url, param, $rootScope.gHeader);
					PagerExtends.regListSpecifyPage($scope, {
						apiUrl: url,
						params: param,
						success: function(response) {
							$scope.list = response;
							$scope.list.forEach(function(item, index) {
								getUpLoaderInfo($scope, item, false);
							});
						},
						error: function(error) {
							layerAlert.autoclose(errorResult(error));
						}
					}, $rootScope.gHeader);
					break;
				case 2:
					param.history = false;
					param.verify = false;
					url = serverUrls.allWorkers;
					//PcService.fetchData($scope, url, param, $rootScope.gHeader);

					PagerExtends.regListSpecifyPage($scope, {
						apiUrl: url,
						params: param,
						success: function(response) {
							$scope.list = response;
							$scope.list.forEach(function(item, index) {
								getUpLoaderInfo($scope, item, true);
							});
						},
						error: function(error) {
							layerAlert.autoclose(errorResult(error));
						}
					}, $rootScope.gHeader);

					break;
				case 3:
					param.mid = mid;
					url = serverUrls.demoCratictransactionbymid;
					PcService.fetchList($scope, url, param, $rootScope.gHeader);
					break;
			}
		};

		$scope.fetchData();

		/*$scope.formSubmit = function() {
			PcService.formSubmit($scope, true, $scope.fieldsList, url);
		};*/

		//
		$scope.todoText = function(selectTab) {
			var _text;
			switch(selectTab.Id) {
				case 1:
					_text = "立即核实";
					break;
				case 2:
					_text = "立即处理";
					break;
				default:
					break;
			}
			return _text;
		};
		//提交核实操作
		var verifySubmit = function($scope, id) {
			var url = serverUrls.finisherVerification;
			var param = PcService.getFormData($scope.fieldsList);
			if(param.nextNoderId === 0) {
				delete param.nextNoderId;
			}
			param.workerid = id;
			var completionUrl = "?";
			if(param) {
				for(var x in param) {
					completionUrl += x + "=" + param[x] + "&";
				}
				url += completionUrl.substring(0, completionUrl.length - 1);
			}
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: url
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("核实操作成功！");
					$scope.$parent.$parent.fetchData();
					setTimeout(function() {
						$scope.closeThisDialog();
					}, 1600);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取线下民主协商相册列表
		var getOutDemocratictransaction = function($scope, deffered) {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.photoAlbum + "?length=999&currentPage=1"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var list = response.Content.pagelist;
					$scope.photoAlbumList = response.Content.pagelist;
					if(list.length === 0) {
						list = [{
							Id: 0,
							Name: "无"
						}];
					}
					$scope.fieldsList[4][0].opts = list;
					$scope.fieldsList[4][0].value = list[0].Id;

					$scope.fieldsList[7].forEach(function(item, index) {
						if(item.name === "photoAlbumId") {
							item.opts = $scope.photoAlbumList;
							item.originValue = $scope.photoAlbumList[0] ? $scope.photoAlbumList[0].Id : "";
						}
					});
					if(deffered) {
						deffered.resolve("success");
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取民主协商议题列表
		var getDemocratictransaction = function($scope, deffered) {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.transacationList + "?length=999&currentPage=1"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var list = response.Content.pagelist;
					$scope.themeList = response.Content.pagelist;
					if(list.length === 0) {
						list = [{
							Id: 0,
							Name: "无"
						}];
					}

					$scope.fieldsList[3][0].opts = list;
					$scope.fieldsList[3][0].value = list[0].Id;
					$scope.fieldsList[6].forEach(function(item, index) {
						if(item.name === "DPId") {
							item.opts = $scope.themeList;
							item.originValue = $scope.themeList[0] ? $scope.themeList[0].Id : "";
						}
					});
					if(deffered) {
						deffered.resolve("success");
					}

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取当前节点的可选下一节点
		var getNextNoder = function($scope, x, deffered, n) {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.nextNoders + "?noderid=" + x.Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var list = response.Content;
					if(list.length === 0) {
						list = [{
							Id: 0,
							Name: "无"
						}];
					}
					if(n || n === 0) {
						$scope.fieldsList[n].forEach(function(item, index) {
							if(item.name === "nextNoderId") {
								item.opts = list;
								item.value = item.originValue = list[0].Id;

							}
						});
					}
					if(!!deffered) {
						deffered.resolve();
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//处理核实事项
		var todoverifyAction = function($scope, x) {
			var deffered = $q.defer();
			getNextNoder($scope, x, deffered, 0);
			var promises = deffered.promise;
			promises.then(function() {
				ngDialog.openConfirm({
					template: 'createOne',
					scope: $scope,
					controller: ['$scope', function($scope) {
						$scope.TitleText = "信息核实操作";
						$scope.fieldsList = $scope.$parent.$parent.fieldsList[0];
						PcService.initFormList($scope.fieldsList);

						//提交核实操作
						$scope.formSubmit = function() {
							verifySubmit($scope, x.Id);
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 600
				});
			}, function(value) {
				console.log(value);
			}, function() {
				console.log(value);
			});
		};

		//完成审核工作提交
		var auditSubmit = function($scope, id) {
			var url = serverUrls.workerAudit;
			var param = PcService.getFormData($scope.fieldsList);
			if(param.AuditState === 2) {
				param.nextNoderId = 0;
			}
			param.Id = id;
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: "put",
				url: url + "?nextNoderId=" + param.nextNoderId,
				data: param
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("审核操作成功！");
					$scope.$parent.$parent.fetchData();
					setTimeout(function() {
						$scope.closeThisDialog();
					}, 1600);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//完成审核工作
		var finishAuditWorker = function($scope, x) {
			var deffered = $q.defer();
			getNextNoder($scope, x, deffered, 1);
			var promises = deffered.promise;
			promises.then(function() {
				ngDialog.openConfirm({
					template: 'createOne',
					scope: $scope,
					controller: ['$scope', function($scope) {
						$scope.TitleText = "处理事项前请先审核";
						$scope.fieldsList = $scope.$parent.$parent.fieldsList[1];
						PcService.initFormList($scope.fieldsList);

						//提交核实操作
						$scope.formSubmit = function() {
							auditSubmit($scope, x.Id);
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 600
				});
			}, function(value) {
				console.log(value);
			}, function() {
				console.log(value);
			});
		};

		//完成Blank普通工作
		var finishBlankWork = function($scope, x) {
			var fieldList = $scope.fieldsList[2];
			var nextNoderId = (PcService.getFormData(fieldList)).nextNoderId;
			var url = serverUrls.workerBlank + "?nextNoderId=" + nextNoderId;
			var param = {
				Id: x.Id
			};
			PcService.formSubmit($scope, false, [], url, x, param, $rootScope.pHeader);
		};

		//处理普通工作
		var doActionBlankworker = function($scope, x) {
			var deffered = $q.defer();
			getNextNoder($scope, x, deffered, 2);
			var promises = deffered.promise;
			promises.then(function() {
				ngDialog.openConfirm({
					template: 'createOne',
					scope: $scope,
					controller: ['$scope', function($scope) {
						$scope.TitleText = "普通事项处理";
						$scope.fieldsList = $scope.$parent.$parent.fieldsList[2];

						//提交
						$scope.formSubmit = function() {
							var nextNoderId = (PcService.getFormData($scope.fieldsList)).nextNoderId;
							var url = serverUrls.workerBlank + "?nextNoderId=" + nextNoderId;
							var param = {
								Id: x.Id
							};
							PcService.formSubmit($scope, false, [], url, {}, param, $rootScope.pHeader, "普通工作");
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 600
				});
			});
		};

		//更新完成线下民主协商项目
		var finishOffLine = function(resId, PhotoAlbumId) {
			$scope.listBusyPromise = $http({
				method: "get",
				headers: $rootScope.pHeader,
				url: serverUrls.finisherDpoffline + "?erid=" + resId + "&albumid=" + PhotoAlbumId
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("线下民主协商事项处理完成！");
					setTimeout(function() {
						//刷新数据
						$scope.fetchData();
					}, 1600);
				} else {
					layerAlert.autoclose(Mesage);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});

		};

		//更新完成线上民主协商项目
		var finishUpdateOnlineDemoproject = function($scope, resId, DPId, DPName) {

			$scope.listBusyPromise = $http({
				method: "get",
				headers: $rootScope.pHeader,
				url: serverUrls.finisherDponline + "?erid=" + resId + "&dpid=" + DPId + "&dpname=" + DPName
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("线上民主协商事项处理完成！");
					setTimeout(function() {
						//刷新数据
						$scope.fetchData();
					}, 1600);
				} else {
					layerAlert.autoclose("该民主协商议题尚未结束，无法完成该项操作！");
				}
			}).error(function(error) {
				layerAlert.autoclose(pcservice.errorResult(error));
			});
		};

		//完成入库操作
		var finishInStorage = function($scope, resId, FormId) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: serverUrls.finisherStorage + "?erid=" + resId + "&formid=" + FormId
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("入库事项处理完成！");
					setTimeout(function() {
						//刷新数据
						$scope.fetchData();
					}, 1600);
				} else {
					layerAlert.autoclose("入库失败:" + Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//完成非blank工作   state 1->2
		var finishnotBlankWork = function($scope, x, resId, Content) {
			//判断外部资源类型
			switch(x.ResourceType) {
				case 2:
					//完成表单填写
					$scope.listBusyPromise = $http({
						headers: $rootScope.pHeader,
						method: "get",
						url: serverUrls.finishersFillform + "?erid=" + resId + "&formid=" + Content.FormId
					}).success(function(response) {
						var Code = response.State.Code;
						var Message = response.State.Message;
						if(Code === 0) {
							layerAlert.autoclose("表单填写事项处理完成！");
							setTimeout(function() {
								//刷新数据
								$scope.fetchData();
							}, 1600);
						} else {
							layerAlert.autoclose(Message);
						}
					}).error(function(error) {
						layerAlert.autoclose(PcService.errorResult(error));
					});
					break;
				case 4:

					// 完成更新线上民主协商 state为1->2  
					var DPId = Content.DPId;
					var DPName = Content.DPName;
					finishUpdateOnlineDemoproject($scope, resId, DPId, DPName);

					break;
				case 8:

					//完成更新线下民主协商
					var PhotoAlbumId = Content.PhotoAlbumId;
					finishOffLine(resId, PhotoAlbumId);
					break;

				case 128:

					//完成入库  state为1 ->2  表示资源已经更新
					var FormId = Content.FormId;
					if(FormId === 0) {
						layerAlert.autoclose("暂时无法完成该项操作！");
						return;
					} else {
						finishInStorage($scope, resId, FormId);
					}
					break;
				default:
					break;
			}

		};

		//更新线上民主协商  state 0->1
		var updateDConsultation = function($scope, x, resId) {
			var deffered = $q.defer();
			var promises = deffered.promise;
			if($scope.themeList.length === 0) {
				getDemocratictransaction($scope, deffered);
			} else {
				deffered.resolve();
			}
			promises.then(function(value) {
				ngDialog.openConfirm({
					template: 'createOne',
					scope: $scope,
					controller: ['$scope', function($scope) {
						$scope.TitleText = "事项处理-线上民主协商";
						$scope.fieldsList = $scope.$parent.$parent.fieldsList[6];
						//将后台传回来的数据，绑定到表单上
						$scope.fieldsList[0].opts = $scope.themeList;
						$scope.fieldsList[0].value = $scope.themeList[0].Id;
						PcService.bindFormData(x, $scope.fieldsList);

						//提交
						$scope.formSubmit = function() {
							var DPId = (PcService.getFormData($scope.fieldsList)).DPId;
							var DPName;
							$scope.themeList.forEach(function(item, index) {
								if(item.Id === DPId) {
									DPName = item.Name;
								}
							});

							var _param = PcService.getFormData($scope.fieldsList);
							_param.DPName = DPName;
							_param.Id = resId;
							PcService.formSubmit($scope, false, [], serverUrls.erDemoprojectonline, $scope.themeList, _param, $rootScope.pHeader);
						};

					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 600
				});
			}, function(value) {

			}, function(value) {

			});

		};

		//更新线下民主协商
		var updateOffLine = function($scope, x, resId) {
			var deffered = $q.defer();
			var promises = deffered.promise;
			if($scope.photoAlbumList.length === 0) {
				getOutDemocratictransaction($scope, deffered);
			} else {
				deffered.resolve();
			}
			promises.then(function(value) {
				ngDialog.openConfirm({
					template: 'createOne',
					scope: $scope,
					controller: ['$scope', function($scope) {

						$scope.TitleText = "事项处理-线下民主协商";
						$scope.fieldsList = $scope.$parent.$parent.fieldsList[7];

						//将后台传回来的数据绑定到表单上
						//PcService.bindFormData($scope.photoAlbumList, $scope.fieldsList);
						$scope.fieldsList[0].opts = $scope.photoAlbumList;
						$scope.fieldsList[0].value = $scope.photoAlbumList[0].Id;
						PcService.bindFormData(x, $scope.fieldsList);

						//提交表单
						$scope.formSubmit = function() {
							var param = PcService.getFormData($scope.fieldsList);
							param.Id = resId;
							PcService.formSubmit($scope, false, [], serverUrls.erDemoprojectoffline, $scope.photoAlbumList, param, $rootScope.pHeader);

						};
					}],
					className: 'ngdialog-theme-default',

					closeByDocument: false,
					width: 600
				});
			});

		};

		//表单类型
		$scope.ExpectForms = [{
			Id: 1,
			Name: "流动人口"
		}, {
			Id: 2,
			Name: "环境卫生"
		}, {
			Id: 3,
			Name: "纠纷调解"
		}, {
			Id: 4,
			Name: "重点人群"
		}, {
			Id: 5,
			Name: "基金申请"
		}, {
			Id: 6,
			Name: "安全隐患"
		}];

		//获取表单详情
		var getFormInfoDetail = function($scope, id, type, deferd) {
			var url = "";
			switch(type) {
				case 1:
					url = serverUrls.getFloating;
					break;
				case 2:
					url = serverUrls.getEnvironmental;
					break;
				case 3:
					url = serverUrls.getDispute;
					break;
				case 4:
					url = serverUrls.getKeypopulation;
					break;
				default:
					break;
			}
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: url + "?id=" + id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.thisFormDetail = response.Content;
					deferd.resolve();
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//更新表单 更新state 0->1
		var finishForm = function($scope, x, Content, resId) {
			FormType = Content.FormType;
			ngDialog.openConfirm({
				template: 'formList',
				scope: $scope,
				controller: ['$scope', function($scope) {
					$scope.TitleText = "待办事项-表单填写";
					$scope.fieldsList = $scope.$parent.$parent.fieldsList[8];

					//将后台传回来的数据，绑定到表单上
					$scope.formInfo = x;
					$scope.formInfo.ResourceTypeName = PcService.numberToText(x.ResourceType, $scope.ExtraResourceTypes);
					$scope.formInfo.FormType = PcService.numberToText(FormType, $scope.ExpectForms);
					$scope.formList = [{
						Id: 0,
						Name: "请选择表单"
					}];
					$scope.formList.push(Content);
					PcService.bindFormData($scope.formInfo, $scope.fieldsList);
					$scope.fieldsList[4].opts = $scope.formList;
					$scope.fieldsList[4].value = 0;

					//提交表单
					$scope.formSubmit = function() {
						if($scope.fieldsList[4].value === 0) {
							layerAlert.autoclose("请先关联表单后提交数据！");
							return;
						} else {
							var _param = {};
							_param.Name = Content.Name;
							_param.Description = x.Description;
							_param.Note = x.Note;
							_param.FormType = Content.FormType;
							_param.FormId = Content.FormId;
							_param.Id = resId;
							PcService.formSubmit($scope, false, [], serverUrls.erFillform, Content, _param, $rootScope.pHeader);
						}

					};

					$scope.seeFormDetail = function(id) {
						id = id ? id : Content.FormId;
						var deferd = $q.defer();
						var promised = deferd.promise;
						getFormInfoDetail($scope, id, Content.FormType, deferd);
						promised.then(function() {
							ngDialog.openConfirm({
								template: 'seeFormDetail',
								scope: $scope,
								controller: ['$scope', function($scope) {
									$scope.TitleText = "待办事项-表单查看";
									if(Content.FormType === 4) {
										$scope.fieldsList = $scope.$parent.$parent.$parent.$parent.fieldsList[9];
									} else if(Content.FormType === 1) {
										$scope.fieldsList = $scope.$parent.$parent.$parent.$parent.fieldsList[10];
									} else {
										$scope.fieldsList = $scope.$parent.$parent.$parent.$parent.fieldsList[9];
									}
									PcService.bindFormData($scope.thisFormDetail, $scope.fieldsList);
									$scope.formSubmit = $scope.closeThisDialog;
								}],
								className: 'ngdialog-theme-default',
								//closeByEscape: true,
								closeByDocument: false,
								width: 850
							});
						});
					};

				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});

		};

		//更新入库 state 0->1
		var updateStorage = function($scope, x, Content, resId) {
			var FormType = Content.FormType;
			ngDialog.openConfirm({
				template: 'formList',
				scope: $scope,
				controller: ['$scope', function($scope) {
					$scope.TitleText = "待办事项-入库";
					$scope.fieldsList = $scope.$parent.$parent.fieldsList[8];

					//将后台传回来的数据，绑定到表单上
					$scope.formInfo = x;
					$scope.formInfo.ResourceTypeName = PcService.numberToText(x.ResourceType, $scope.ExtraResourceTypes);
					$scope.formInfo.FormType = PcService.numberToText(FormType, $scope.ExpectForms);
					$scope.formList = [{
						Id: 0,
						Name: "请选择表单"
					}];
					$scope.formList.push(Content);
					PcService.bindFormData($scope.formInfo, $scope.fieldsList);
					$scope.fieldsList[4].opts = $scope.formList;
					$scope.fieldsList[4].value = 0;

					//提交表单
					$scope.formSubmit = function() {
						if($scope.fieldsList[4].value === 0) {
							layerAlert.autoclose("请先关联表单后提交数据！");
							return;
						} else {
							var _param = {};
							_param.Name = Content.Name;
							_param.Description = x.Description;
							_param.Note = x.Note;
							_param.FormType = Content.FormType;
							_param.FormId = Content.FormId;
							_param.Id = resId;
							PcService.formSubmit($scope, false, [], serverUrls.erstorage, Content, _param, $rootScope.pHeader);
						}

					};

					$scope.seeFormDetail = function(id) {
						id = id ? id : Content.FormId;
						var deferd = $q.defer();
						var promised = deferd.promise;
						getFormInfoDetail($scope, id, Content.FormType, deferd);
						promised.then(function() {
							ngDialog.openConfirm({
								template: 'seeFormDetail',
								scope: $scope,
								controller: ['$scope', function($scope) {
									$scope.TitleText = "待办事项-表单查看";
									if(Content.FormType === 4) {
										$scope.fieldsList = $scope.$parent.$parent.$parent.$parent.fieldsList[9];
									} else if(Content.FormType === 1) {
										$scope.fieldsList = $scope.$parent.$parent.$parent.$parent.fieldsList[10];
									} else {
										$scope.fieldsList = $scope.$parent.$parent.$parent.$parent.fieldsList[9];
									}
									PcService.bindFormData($scope.thisFormDetail, $scope.fieldsList);
									$scope.formSubmit = $scope.closeThisDialog;
								}],
								className: 'ngdialog-theme-default',
								//closeByEscape: true,
								closeByDocument: false,
								width: 850
							});
						});
					};

				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});

		};
		//获取可用外部资源
		var getErresource = function($scope, x, resId) {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.erResourcebyworkerid + "?workerid=" + x.Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var Content = response.Content;
					switch(x.ResourceType) {
						case 2:
							var FormId = Content.FormId;
							if(FormId === 0) {
								layerAlert.autoclose("暂时无法完成该项操作！");
								return;
							} else {
								var workerid = x.Id;
								//更新表单state状态
								finishForm($scope, x, Content, resId);
							}
							break;
						case 4:
							//更新线上民主协商 Content为空 自己创建
							updateDConsultation($scope, x, resId);
							break;
						case 8:
							// 更新线下民主协商
							updateOffLine($scope, x, resId);
							break;
						case 128:
							//更新入库 
							updateStorage($scope, x, Content, resId);
							break;
						default:
							break;
					}

				}

			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取外部资源
		var getResource = function($scope, x) {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.erByworkerid + "?workerid=" + x.Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var Content = response.Content;
					var State = Content.State;
					var resId = Content.Id;
					switch(State) {
						case 0:
							// 表示资源尚未处理  根据 外部资源resId 获取可用外部资源
							getErresource($scope, x, resId);
							break;
						case 1:
							//表示资源已经更新 下一步完成对应工作
							//var FormId = Content.FormId;
							//完成非blank工作
							finishnotBlankWork($scope, x, resId, Content);
							break;
						case 2:
							doActionBlankworker($scope, x);
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

		//处理非审核事项
		var finishOtherWorker = function($scope, x) {
			var itemArray = [];
			//循环外部资源类型
			$scope.ExtraResourceTypes.forEach(function(item, index) {
				if((item.Id & x.WorkExtraResource) === item.Id) {
					itemArray.push(item);
				}
			});
			if(itemArray.length === 1) {
				if(x.ResourceType === 1) {
					doActionBlankworker($scope, x);
				} else {
					getResource($scope, x);
				}
			} else {
				var deffered = $q.defer();
				var promised = deffered.promise;
				$scope.listBusyPromise = $http({
					method: "get",
					url: serverUrls.erByworkerid + "?workerid=" + x.Id
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					if(Code === 0) {
						var Content = response.Content;
						if(Content) {
							switch(x.ResourceType) {
								case 1:
									finishBlankWork($scope, x);
									break;
								case 4:
									getResource($scope, x);
									break;
								case 16:
									updateDConsultation($scope, x, Content.Id);
									//PcService.formSubmit($scope, false, [], serverUrls.erDemoprojectonline, Content, Content, $rootScope.pHeader)
									break;
								case 32:
									updateOffLine($scope, x, Content.Id);
									//PcService.formSubmit($scope, false, [], serverUrls.erDemoprojectoffline, Content, Content, $rootScope.pHeader)
									break;
								default:
									break;
							}
						} else {
							deffered.reject();
						}
					} else {
						deffered.reject();
						//layerAlert.autoclose(Message);
					}
				}).error(function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				});

				promised.then(function() {

				}, function() {
					ngDialog.openConfirm({
						template: 'createOne_multi',
						scope: $scope,
						controller: ['$scope', function($scope) {
							$scope.TitleText = "请选择下一步操作";
							$scope.baseInfos = x;
							$scope._fieldsList = [{
								name: "verifyState",
								nameDisplay: "请选择操作",
								editor: "select",
								required: true,
								value: itemArray[0].Id,
								originValue: itemArray[0].Id,
								opts: itemArray
							}];
							$scope.NextNodes = [{
								Id: 0,
								Name: "无"
							}];

							//选择操作
							$scope.choseNextNode = function(value) {
								switch(value) {
									case 1:
										getNextNoder($scope, x, null, 2);
										break;
									case 16:
										getDemocratictransaction($scope);
										break;
									case 32:
										getOutDemocratictransaction($scope);
										break;
									default:
										break;
								}
							};

							$scope.choseNextNode(itemArray[0].Id);

							//提交核实操作
							$scope.formSubmit = function() {
								var nextType = $scope._fieldsList[0].value;
								switch(nextType) {
									case 1:
										finishBlankWork($scope, x);
										break;
									case 16:
										var param = PcService.getFormData($scope.fieldsList[3]);
										var DPId = param.DPId;
										$scope.fieldsList[3][0].opts.forEach(function(item) {
											if(item.Id === DPId) {
												param.DPName = item.Name;
											}
										});
										param.Name = x.Name;
										param.Note = x.Note;
										param.WorkerId = x.Id;
										param.Description = x.Description;
										PcService.formSubmit($scope, true, [], serverUrls.erDemoprojectonline, x, param, $rootScope.pHeader);
										break;
									case 32:
										var param = PcService.getFormData($scope.fieldsList[4]);
										var photoAlbumId = param.photoAlbumId;
										$scope.fieldsList[4][0].opts.forEach(function(item) {
											if(item.Id === photoAlbumId) {
												param.PhotoAlbumName = item.Name;
											}
										});
										param.Name = x.Name;
										param.Note = x.Note;
										param.WorkerId = x.Id;
										param.Description = x.Description;
										PcService.formSubmit($scope, true, [], serverUrls.erDemoprojectoffline, x, param, $rootScope.pHeader);
										break;
									default:
										break;
								}
							};
						}],
						className: 'ngdialog-theme-default',
						//closeByEscape: true,
						closeByDocument: false,
						width: 600
					});
				});

			}

		};

		//其他事项处理
		var todoMainAction = function($scope, x) {
			switch(x.WorkNodeWorkerType) {
				case 1:
					finishAuditWorker($scope, x);
					break;
				case 2:
					finishOtherWorker($scope, x);
					break;
				default:
					break;
			}
		};

		//处理事项
		$scope.editItem = function(x) {
			switch($scope.selectTab.Id) {
				case 1:
					//处理核实事项
					todoverifyAction($scope, x);
					break;
				case 2:
					//处理待办事项
					todoMainAction($scope, x);
					break;
				case 3:
					//处理核实事项
					todoverifyAction($scope, x);
					break;
				default:
					break;
			}
		};

	}
]);