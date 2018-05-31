App.controller('xinxishangbaoCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q) {
		$scope.searchOption = {
			value: "",
			usageLevel: 0,
			isNeedBind: 2
		};
		$scope.PcService = PcService;
		$scope.WokerFlowList = [];

		$scope.booleanToIcon = function(bool) {
			if(bool) {
				return "√";
			} else {
				return "×";
			}
		};

		$scope.booleanClass = function(bool) {
			return {
				"color-success": bool,
				"color-danger": !bool
			};
		};

		$scope.VerifyStates = [{
			Id: 0,
			Name: "未核实"
		}, {
			Id: 1,
			Name: "已核实"
		}, {
			Id: 2,
			Name: "核实不属实"
		}];

		//判断是否可以点击
		$scope.isDisabled = function(x) {
			var isDisabled = false;
			if(x.IsHandled) {
				isDisabled = true;
			} else {
				isDisabled = false;
			}
			return isDisabled;
		};

		//选项卡
		$scope.navTabList = [{
			Id: 1,
			Name: "未核实",
			Active: true
		}, {
			Id: 2,
			Name: "已核实",
			Active: false
		}, {
			Id: 3,
			Name: "已处理",
			Active: false
		}, {
			Id: 4,
			Name: "已立项",
			Active: false
		}];

		$scope.selectTab = $scope.navTabList[0];
		$scope.checkedItem = {};

		//
		var getEventinspectors = function($scope, fieldsList) {
			$scope.ngDialogPromise = $http({
				method: "get",
				url: serverUrls.eventInspectorlist + "?currentPage=1&length=99999&usageLv=1"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.eventinspectors = response.Content.pagelist;
					fieldsList.forEach(function(item, index) {
						if(item.name === "InspectorId") {
							item.opts = $scope.eventinspectors;
							item.value = $scope.eventinspectors[0] ? $scope.eventinspectors[0].Id : "";
						}
					});
				}
			}).error(function(err) {
				layerAlert.autoclose(err + "");
			});
		};
		$scope.fieldsList = [
			[{
				name: "Name",
				nameDisplay: "事件名称",
				editor: "normal",
				required: true,
				value: "",
				originValue: ""
			}, {
				name: "EventScope",
				nameDisplay: "事件范围",
				editor: "select",
				required: true,
				value: "",
				originValue: 0,
				opts: [{
					Id: 0,
					Name: "信息上报"
				}]
			}, {
				name: "WorkflowId",
				nameDisplay: "工作流模板",
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
				name: "GradePathName",
				nameDisplay: "位置信息",
				editor: "normal",
				required: true,
				value: "",
				editable: true
			}]
		];

		var addInspectorName = function(param, eventinspectors, InspectorId) {
			eventinspectors.forEach(function(item, index) {
				if(item.Id === InspectorId) {
					param.InspectorName = item.Name;
					return;
				}
			});
		};

		//获取工作流列表
		var getWokerFlowList = function(fieldsList, deffered) {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.workflowList + "?currentPage=1&length=9999"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var WokerFlowList = response.Content.pagelist;
					var _WokerFlowList = [];
					WokerFlowList.forEach(function(_item, _index) {
						if(_item.OpenState === 1) {
							_WokerFlowList.push(_item);
						}
					});
					$scope.WokerFlowList = _WokerFlowList;
					if($scope.WokerFlowList.length !== 0) {

						fieldsList.forEach(function(item, index) {
							if(item.name === "WorkflowId") {
								item.opts = $scope.WokerFlowList;
								item.originValue = $scope.WokerFlowList[0].Id;
							}
						});
						deffered.resolve("success");
					} else {
						layerAlert.autoclose("工作流列表暂无！");
						return;
					}

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//
		$scope.handleItem = function(x) {
			var Name = x.Name;
			var deffered = $q.defer();
			var promises = deffered.promise;
			var fieldsList = $scope.fieldsList[0];

			if($scope.WokerFlowList.length === 0) {
				getWokerFlowList(fieldsList, deffered);
			} else {
				deffered.resolve("success");
			}
			promises.then(function() {
				var WokerFlowList = $scope.WokerFlowList;
				var fetchData = $scope.fetchData;
				PcService.initFormList(fieldsList);
				fieldsList.forEach(function(item, index) {
					if(item.name === "Name") {
						item.value = "对" + Name + "的立项处理";
						return;
					}
				});
				ngDialog.openConfirm({
					template: 'handleItem',
					controller: ["$scope", function($scope) {
						$scope.fetchData = fetchData;
						$scope.TitleText = "立项处理";
						$scope.fieldsList = fieldsList;
						$scope.WokerFlowList = WokerFlowList;
						$scope.formSubmit = function() {
							var param = {
								EventId: x.Id
							};
							var WorkflowId = PcService.getFormData($scope.fieldsList).WorkflowId;
							$scope.WokerFlowList.forEach(function(item, index) {
								if(item.Id === WorkflowId) {
									param.WorkflowName = item.Name;
									return;
								}
							});
							PcService.formSubmit($scope, true, $scope.fieldsList, serverUrls.ewSelector, null, param, $rootScope.pHeader);
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 600
				});
			}, function(value) {
				console.log(value);
			}, function(value) {
				console.log(value);
			});

		};

		var getOccurLocationInfo = function($scope, x) {
			$scope.ngDialogPromise = $http({
				method: "get",
				url: serverUrls.getDate + "?id=" + x.OccurLocationId
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					/*var info = response.Content;
					$scope.detailInfo = $.extend(true, x, info);
					$scope.detailInfo.HouseInfo = $scope.detailInfo.CourtyardName + $scope.detailInfo.BuildingName + $scope.detailInfo.UnitName + $scope.detailInfo.RoomNumber;*/
					PcService.bindFormData(response.Content, $scope.fieldsList);
				} else {
					layerAlert.autoclose(Message);
					setTimeout(function() {
						ngDialog.closeAll();
					}, 1000);
					return;
				}
			}).error(function(err) {
				layerAlert.autoclose(err + "");
			});
		};

		$scope.seeItem = function(x) {
			var fieldsList = $scope.fieldsList[1];
			ngDialog.openConfirm({
				template: '_handleItem',
				controller: ["$scope", function($scope) {
					$scope.fieldsList = fieldsList;
					$scope.detailInfo = {};
					$scope.TitleText = "地理位置信息";
					getOccurLocationInfo($scope, x);
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});
		};

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

		//查询代办事项
		$scope.fetchData = function() {
			var param = {},
				url = serverUrls.eventfeedbackList;
			switch($scope.selectTab.Id) {
				case 1:
					param.verifyState = 0;
					break;
				case 2:
					param.verifyState = 1;
					break;
				case 3:
					param.isHandled = 1;
					break;
				case 4:
					url = serverUrls.ewSelectorlist;
					break;
			}
			param = $.extend(true, param, $scope.searchOption);
			PcService.fetchData($scope, url, param);
		};

		$scope.fetchData($scope.selectTab.Id);
	}
]);