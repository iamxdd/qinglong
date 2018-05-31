App.controller('shixiangchuliCtrl', ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {

		$scope.list = [];
		$scope.searchOption = {
			value: "",
			usageLevel: -1
		};

		//选项卡
		$scope.navTabList = [{
			Id: 1,
			Name: "管理员事项处理",
			Active: true
		}, {
			Id: 2,
			Name: "居民事项处理",
			Active: false
		}];

		//工作流实例状态
		$scope.WorkflowerStates = [{
			Id: 0,
			Name: "等待"
		}, {
			Id: 1,
			Name: "执行"
		}, {
			Id: 2,
			Name: "中断"
		}, {
			Id: 3,
			Name: "成功"
		}, {
			Id: 4,
			Name: "废弃"
		}];

		$scope.selectTab = $scope.navTabList[0];
		$scope.checkedItem = {};

		$scope.fieldsList = [{
			name: "Number",
			nameDisplay: "标题",
			editor: "normal",
			required: true,
			value: ""
		}, {
			name: "Number",
			nameDisplay: "信息描述",
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
				$scope.fetchData($scope.selectTab.Id);
			}
		};

		//获取工作流实例状态
		var getEventStatus = function(list, ids, state) {
			$http({
				method: "get",
				url: serverUrls.workFlowersbyids + "?ids=" + ids
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var status = response.Content;
					var newArray = [];
					list.forEach(function(item, index) {
						if(status[index].State === state) {
							newArray.push(item);
						}
					});
					$scope.list = newArray;
				}

			}).error(function(err) {
				layerAlert.autoclose(err);
			});
		};

		var fetchData = function($scope, url, param, headers, state) {
			var completionUrl = "?";
			if(param) {
				var sdoparam = {
					length: 10,
					currentPage: 1
				};

				param = $.extend(true, param, sdoparam);
				for(var x in param) {
					completionUrl += x + "=" + param[x] + "&";
				}
				url += completionUrl.substring(0, completionUrl.length - 1);
			}
			$scope.listBusyPromise = $http({
				headers: headers ? headers : null,
				method: "get",
				url: url
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var list = response.Content.pagelist;
					if(list.length === 0 || !list) {
						$scope.list = [];
						return;
					}
					var ids = "";
					list.forEach(function(item, index) {
						ids += item.WorkflowId + ",";
					});
					ids = ids.substring(0, ids.length - 1);
					getEventStatus(list, ids, state);
				}

			}).error(function(err) {
				layerAlert.autoclose(err);
			});
		};

		//查询代办事项
		$scope.fetchData = function(id) {
			var url, param = {};
			if(id === 1) {
				url = serverUrls.ewSelectorlist;
				param = $scope.searchOption;
			} else {
				url = serverUrls.eventfeedbackList;
				param = {
					isNeedBind: 2,
					usageLevel: 0
				};
				param = $.extend(true, param, $scope.searchOption);
			}
			PcService.fetchData($scope, url, param);
		};
		$scope.fetchData($scope.selectTab.Id);

		var getItsNodes = function($scope, x) {
			$scope.ngDialogPromise = $http({
				method: "get",
				url: serverUrls.workflowNodersbystepid + "?stepid=" + x.Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					x.Nodes = response.Content;
					x.Nodes.forEach(function(item, index) {
						item.show = false;
					});
				}
			}).error(function(err) {
				layerAlert.autoclose(err || err + "");
			});
		};

		var formFieldsList = [{
			name: "Name",
			nameDisplay: "姓名",
			editor: "normal",
			required: true,
			value: "",
			disabled: true
		}, {
			name: "Sex",
			nameDisplay: "性别",
			editor: "normal",
			required: true,
			value: "",
			disabled: true
		}, {
			name: "Phone",
			nameDisplay: "手机",
			editor: "normal",
			required: true,
			value: "",
			disabled: true
		}, {
			name: "Nationality",
			nameDisplay: "名族",
			editor: "normal",
			required: true,
			value: "",
			disabled: true
		}, {
			name: "CurrentAddress",
			nameDisplay: "现居住地",
			editor: "normal",
			required: true,
			value: "",
			disabled: true
		}, {
			name: "DomicilePlace",
			nameDisplay: "户籍所在地",
			editor: "normal",
			required: true,
			value: "",
			disabled: true
		}, {
			name: "SocialSecurity",
			nameDisplay: "社保状态",
			editor: "normal",
			required: true,
			value: "",
			disabled: true
		}, {
			name: "ResidencePermit",
			nameDisplay: "居住证类型",
			editor: "normal",
			required: true,
			value: "",
			disabled: true
		}, {
			name: "MaritalStatus",
			nameDisplay: "婚姻状态",
			editor: "normal",
			required: true,
			value: "",
			disabled: true
		}];

		var getDetailInfo = function($scope, url, x) {
			$scope.ngDialogPromise = $http({
				method: "get",
				url: url + "?id=" + x.Worker.FormId
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					x.Worker.FormList = response.Content;
					if(x.Worker.FormList) {
						ngDialog.openConfirm({
							template: 'detailOne',
							controller: ["$scope", function($scope) {
								$scope.fieldsList = formFieldsList;
								PcService.bindFormData(x.Worker.FormList, $scope.fieldsList);
							}],
							className: 'ngdialog-theme-default',
							//closeByEscape: true,
							closeByDocument: false,
							width: 600
						});
					}

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(err) {
				layerAlert.autoclose(err || err + "");
			});
		};

		var getItsWorks = function($scope, x) {
			$scope.ngDialogPromise = $http({
				method: "get",
				url: serverUrls.getworkerBynoderid + "?noderid=" + x.Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					x.Worker = response.Content[0];
					if(x.Worker.WorkNodeWorkerType !== 2) {
						layerAlert.autoclose("该节点工作类型没有表单！");
					} else {
						var url = "";
						switch(x.Worker.FormType) {
							case 0:
								url = serverUrls.getFloating;
								break;
							case 1:
								url = serverUrls.getFloating;
								break;
							case 2:
								url = serverUrls.getFloating;
								break;
							case 3:
								url = serverUrls.getKeypopulation;
								break;
							default:
								break;
						}
						getDetailInfo($scope, url, x);
					}
				}
			}).error(function(err) {
				layerAlert.autoclose(err || err + "");
			});
		};

		//查看处理流程
		$scope.detailItem = function(x) {
			ngDialog.openConfirm({
				template: 'seeOne',
				controller: ["$scope", function($scope) {
					$scope.PcService = PcService;
					//节点工作状态
					$scope.WorkflowNoderStates = [{
						Id: 0,
						Name: "等待中，未开始"
					}, {
						Id: 1,
						Name: "开始运行"
					}, {
						Id: 2,
						Name: "完成"
					}, {
						Id: 3,
						Name: "被中止,节点不会进入下一节点"
					}];
					var workflowerId = x.WorkflowerId ? x.WorkflowerId : x.WorkflowId;
					/*$scope.Steps = [];*/
					$scope.ngDialogPromise = $http({
						method: "get",
						url: serverUrls.workFlowerprogress + "?workflowerId=" + workflowerId
					}).success(function(response) {
						var Code = response.State.Code;
						var Message = response.State.Message;
						if(Code === 0) {
							$scope.Steps = response.Content;

						} else {
							layerAlert.autoclose(Message);
						}
					}).error(function(err) {
						layerAlert.autoclose(err || err + "");
					});

					$scope.getItsNodes = function(y) {
						y.show = !y.show;
						if(y.show) {
							if(!y.Nodes) {
								getItsNodes($scope, y);
							} else {
								return;
							}
						} else {
							return;
						}
					};

					$scope.getItsWorks = function(y) {
						getItsWorks($scope, y);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});
		};

	}
]);