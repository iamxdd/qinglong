App.controller('shixiangmubanCtrl', ['$scope', '$rootScope', 'ngDialog', 'layerAlert', '$http', 'serverUrls', 'PcService', '$q',
	function($scope, $rootScope, ngDialog, layerAlert, $http, serverUrls, PcService, $q) {
		$scope.list = [];
		$scope.TitleText = "新增";
		$scope.searchOption = {
			usageLv: -1
		};
		$scope.PcService = PcService;
		$scope.EventCategory = [];
		$scope.workFlows = [];
		$scope.Owners = [];

		$scope.autoProcess = [{
			Id: true,
			Name: "是"
		}, {
			Id: true,
			Name: "是"
		}];

		//获取事项拥有者列表
		var getOwners = function($scope, defferd) {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.eventownerList + "?length=9999&currentPage=1"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.Owners = response.Content.pagelist;
					$scope.fieldsList.forEach(function(item, index) {
						if(item.name === "OwnerId") {
							item.opts = $scope.Owners;
							item.originValue = $scope.Owners[0].Id;
							return;
						}
					});
					if(defferd) {
						defferd.resolve();
					}
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		//获取工作流模板
		var getworkFlowList = function() {
			$http({
				method: "get",
				url: serverUrls.workflowList + "?length=9999&currentPage=1"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.workFlows = response.Content.pagelist;
					$scope.fieldsList.forEach(function(item, index) {
						if(item.name === "WorkflowInspectorId") {
							item.opts = $scope.workFlows;
							item.originValue = $scope.workFlows[0].Id;
							return;
						}
					});
					/*if($scope.Owners.length === 0) {
						getOwners();
					} else {
						PcService.fetchData($scope, serverUrls.eventInspectorlist, $scope.searchOption);
					}*/

				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取事项分类列表
		var getEventCategorylist = function(scope) {
			/*$scope.listBusyPromise =*/
			$http({
				method: "get",
				url: serverUrls.eventCategorylist + "?length=9999&currentPage=1"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					if(scope) {
						scope.eventTypes = response.Content.pagelist;
						//return;
					}
					$scope.EventCategory = response.Content.pagelist;
					$scope.fieldsList.forEach(function(item, index) {
						if(item.name === "CategoryId") {
							item.opts = $scope.EventCategory;
							item.originValue = $scope.EventCategory[0].Id;
							return;
						}
					});
					if($scope.workFlows.length === 0) {
						getworkFlowList();
					} else {
						PcService.fetchData($scope, serverUrls.eventInspectorlist, $scope.searchOption);
					}
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var newEventType = function(_scope, $scope, url, fieldsList, headers) {
			var data = PcService.getFormData(fieldsList);
			$scope.ngDialogPromise = $http({
				headers: headers,
				method: "post",
				url: url,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("新增成功！");
					getEventCategorylist(_scope);
					$scope.closeThisDialog();
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var createEventType = function($scope) {
			var _scope = $scope;
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					//$scope.fieldsList = fieldsList;
					$scope.TitleText = "新增事项类型";
					$scope.fieldsList = [{
						name: "Name",
						nameDisplay: "事项名称",
						editor: "normal",
						required: true,
						value: "",
						originValue: "",
						column: 1
					}];

					$scope.formSubmit = function() {
						newEventType(_scope, $scope, serverUrls.eventCategory, $scope.fieldsList, $rootScope.pHeader);
					};

				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
		};

		var deleteItem = function($scope, url, x, headers) {
			$scope.ngDialogPromise = $http({
				headers: headers,
				method: "delete",
				url: url + "?id=" + x.Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("删除成功!");
					getEventCategorylist($scope);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//事项类型管理
		$scope.eventTypeManage = function() {
			var preScope = $scope;
			$scope.showAutoNode = false;
			ngDialog.openConfirm({
				template: 'eventTypeManage',
				controller: ['$scope', function($scope) {
					//$scope.fieldsList = fieldsList;
					$scope.TitleText = "事项类型管理";
					$scope.eventTypes = preScope.EventCategory;

					$scope.createEventType = function() {
						createEventType($scope);
					};

					$scope.deleteMember = function(x) {
						deleteItem($scope, serverUrls.eventCategory, x, $rootScope.pHeader);
					};

				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
		};

		//使用级别
		$scope.usageLvs = [{
			Id: 0,
			Name: "居民"
		}, {
			Id: 1,
			Name: "区域管理员"
		}];

		//处置级别列表
		$scope.HandleLevels = [{
			Id: 0,
			Name: "院落"
		}, {
			Id: 1,
			Name: "楼栋"
		}, {
			Id: 2,
			Name: "单元"
		}, {
			Id: 3,
			Name: "户"
		}];

		var getWorkflowInspectorName = function(fieldsList, String1, String2) {
			var param = {};
			fieldsList.forEach(function(item, index) {
				if(item.name === String1) {
					item.opts.forEach(function(_item, _index) {
						if(_item.Id === item.value) {
							param[String2] = _item.Name;
						}
					});
					return;
				}
			});
			return param;
		};

		//新增事项模板
		$scope.creatOne = function() {
			$scope.showAutoNode = true;
			var defferd = $q.defer();
			var pormise = defferd.promise;
			getOwners($scope, defferd);
			pormise.then(function() {
				var fetchData = $scope.fetchData;
				var fieldsList = $scope.fieldsList;
				PcService.initFormList(fieldsList);
				fieldsList.forEach(function(item, index) {
					item.editable = false;
					if(item.isHide) {
						item.isHide = true;
					}
				});
				ngDialog.openConfirm({
					template: 'createOne',
					scope: $scope,
					controller: ['$scope', function($scope) {
						$scope.fieldsList = fieldsList;
						$scope.TitleText = "新增";
						$scope.fetchData = fetchData;

						$scope.autoProcess = [{
							Id: true,
							Name: "是"
						}, {
							Id: false,
							Name: "否"
						}];
						$scope.AutoProcessWorkflows = [];
						$scope._param = {
							AutoProcess: false,
							AutoProcessWorkflowId: 0,
							AutoProcessWorkflowName: ""
						};

						//是否自动立项
						$scope.isAutoProcess = function(value) {
							if(value) {
								$scope.AutoProcessWorkflows = $scope.$parent.$parent.workFlows;
								$scope._param.AutoProcessWorkflowId = $scope.AutoProcessWorkflows[0].Id;
							}
						};

						$scope.formSubmit = function() {
							if($scope._param.AutoProcess) {
								$scope.AutoProcessWorkflows.forEach(function(item, index) {
									if(item.Id === $scope._param.AutoProcessWorkflowId) {
										$scope._param.AutoProcessWorkflowName = item.Name;
										return;
									}
								});
							}

							var param = getWorkflowInspectorName($scope.fieldsList, "WorkflowInspectorId", "WorkflowInspectorName");
							param = $.extend(true, param, $scope._param);
							param.UsageLevel = 0;
							PcService.formSubmit($scope, true, $scope.fieldsList, serverUrls.inEventinspector, null, param, $rootScope.pHeader);
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 850
				});
			});

		};

		var bindOtherData = function(x, $scope, fieldsList) {
			$scope._param.AutoProcess = x.AutoProcess;
			if(x.AutoProcess) {
				$scope._param.AutoProcessWorkflowId = x.AutoProcessWorkflowId;
			}
		};

		//修改事项模板
		$scope.editItem = function(x) {
			var defferd = $q.defer();
			var pormise = defferd.promise;
			getOwners($scope, defferd);
			pormise.then(function() {
				var fetchData = $scope.fetchData;
				var fieldsList = $scope.fieldsList;
				PcService.bindFormData(x, fieldsList);
				bindOtherData(x, fieldsList);
				fieldsList.forEach(function(item, index) {
					item.editable = false;
					if(item.isHide) {
						item.isHide = true;
					}
				});
				ngDialog.openConfirm({
					template: 'createOne',
					scope: $scope,
					controller: ['$scope', function($scope) {
						$scope.fieldsList = fieldsList;
						$scope.TitleText = "修改";
						$scope.fetchData = fetchData;

						$scope.autoProcess = [{
							Id: true,
							Name: "是"
						}, {
							Id: false,
							Name: "否"
						}];
						$scope.AutoProcessWorkflows = $scope.$parent.$parent.workFlows;

						$scope._param = {
							AutoProcess: false,
							AutoProcessWorkflowId: 0,
							AutoProcessWorkflowName: ""
						};

						//修改提交表单
						$scope.formSubmit = function() {
							var param = getWorkflowInspectorName($scope.fieldsList, "WorkflowInspectorId", "WorkflowInspectorName");
							PcService.formSubmit($scope, false, $scope.fieldsList, serverUrls.upEventinspector, x, param, $rootScope.pHeader);
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 850
				});
			});
		};

		//查看事项模板
		$scope.seeItem = function(x) {
			var defferd = $q.defer();
			var pormise = defferd.promise;
			getOwners($scope, defferd);
			pormise.then(function() {
				var fieldsList = $scope.fieldsList;
				PcService.bindFormData(x, fieldsList);
				fieldsList.forEach(function(item, index) {
					item.editable = true;
					if(item.isHide) {
						item.isHide = false;
					}
				});
				ngDialog.openConfirm({
					template: 'createOne',
					scope: $scope,
					controller: ['$scope', function($scope) {
						$scope.fieldsList = fieldsList;
						$scope.TitleText = "查看";
						$scope.seeing = true;
						$scope.autoProcess = [{
							Id: true,
							Name: "是"
						}, {
							Id: false,
							Name: "否"
						}];
						$scope.AutoProcessWorkflows = $scope.$parent.$parent.workFlows;

						$scope._param = {
							AutoProcess: false,
							AutoProcessWorkflowId: 0,
							AutoProcessWorkflowName: ""
						};
						bindOtherData(x, $scope, fieldsList);

						$scope.formSubmit = function() {
							$scope.closeThisDialog();
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 850
				});
			});
		};

		//获取事项模板列表
		$scope.fetchData = function() {
			PcService.fetchData($scope, serverUrls.eventInspectorlist, $scope.searchOption);
			if($scope.EventCategory.length === 0) {
				getEventCategorylist();
			} else if($scope.workFlows.length === 0) {
				getworkFlowList();
			}

		};

		$scope.fetchData();

		//事项模板启用/停用
		$scope.toggleItem = function(x) {
			PcService.toggleStatus($scope, x, serverUrls.eventInspector);
		};
		$scope.ScopeList = [{
			Id: 0,
			Name: "信息上报"
		}];

		$scope.OpenStates = [{
			Id: 1,
			Name: "启用"
		}, {
			Id: 2,
			Name: "停用"
		}];

		//新增事项模板表单菜单列表
		$scope.fieldsList = [{
				name: "Name",
				nameDisplay: "事项名称",
				editor: "normal",
				required: true,
				value: "",
				originValue: ""
			}, {
				name: "Scope",
				nameDisplay: "范围",
				editor: "select",
				required: true,
				opts: $scope.ScopeList,
				value: "",
				originValue: $scope.ScopeList[0].Id
			}, {
				name: "CategoryId",
				nameDisplay: "事项类型",
				editor: "select",
				required: true,
				opts: $scope.EventCategory,
				value: ""
			}, {
				name: "HandleLevel",
				nameDisplay: "事项处理级别",
				editor: "select",
				required: true,
				value: "",
				opts: $scope.HandleLevels,
				originValue: $scope.HandleLevels[0].Id
			},
			/*{
				name: "UsageLevel",
				nameDisplay: "使用级别",
				editor: "select",
				required: true,
				value: "",
				opts: $scope.usageLvs,
				originValue: $scope.usageLvs[0].Id
			},*/
			{
				name: "OpenState",
				nameDisplay: "启用状态",
				editor: "select",
				required: true,
				value: "",
				opts: $scope.OpenStates,
				originValue: $scope.OpenStates[0].Id
			},
			/*, {
						name: "Note",
						nameDisplay: "备注",
						editor: "normal",
						required: false,
						value: "",
						originValue: ""
					}*/
			{
				name: "WorkflowInspectorId",
				nameDisplay: "工作流模板",
				editor: "select",
				required: true,
				value: "",
				opts: $scope.workFlows
			}, {
				name: "OwnerId",
				nameDisplay: "拥有者",
				editor: "select",
				required: false,
				value: "",
				opts: $scope.Owners
			}, {
				name: "CreatorNickName",
				nameDisplay: "创建者",
				editor: "normal",
				required: false,
				value: "",
				originValue: "",
				isHide: true
			}, {
				name: "LastEditorNickName",
				nameDisplay: "最后修改者",
				editor: "normal",
				required: false,
				value: "",
				originValue: "",
				isHide: true
			}, {
				name: "CreatedAt",
				nameDisplay: "创建时间",
				editor: "normal",
				required: false,
				value: "",
				originValue: "",
				isHide: true
			}, {
				name: "UpdatedAt",
				nameDisplay: "更新时间",
				editor: "normal",
				required: false,
				value: "",
				originValue: "",
				isHide: true
			}
			/*, {
						name: "Description",
						nameDisplay: "描述",
						editor: "normal",
						required: false,
						value: "",
						originValue: ""
					}*/
		];
	}
]);