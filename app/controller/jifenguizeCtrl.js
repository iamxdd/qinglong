App.controller('jifenguizeCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {
		$scope.list = [];
		$scope.searchOption = {
			value: ""
		};
		$scope.TitleText = "新增";

		//积分时间提交
		$scope.formSubmit = function() {
			layerAlert.autoclose("您点击了积分事件提交！");
		};

		//获取积分规则列表
		$scope.fetchData = function() {
			PcService.fetchData($scope, serverUrls.pointruleList, $scope.searchOption, $rootScope.gHeader);
		};
		$scope.fetchData();

		//新增积分规则表单菜单列表
		$scope.fieldsList = [{
			name: "Name",
			nameDisplay: "名称",
			editor: "normal",
			required: true,
			value: "",
			originValue: ""
		}, {
			name: "EqaulsState",
			nameDisplay: "触发节点状态",
			editor: "select",
			required: true,
			value: "",
			originValue: 0,
			opts: [{
				Id: 0,
				Name: "等待中未开始"
			}, {
				Id: 1,
				Name: "开始运行"
			}, {
				Id: 2,
				Name: "完成"
			}, {
				Id: 3,
				Name: "被中止,节点不会进入下一节点"
			}, {
				Id: 4,
				Name: "无法处理,交由下一节点"
			}]
		}, {
			name: "MemberType",
			nameDisplay: "人员类型",
			editor: "select",
			required: true,
			value: "",
			originValue: 0,
			opts: [{
				Id: 0,
				Name: "工作流创建者"
			}, {
				Id: 1,
				Name: "工作流关联人员"
			}, {
				Id: 2,
				Name: "工作者处理人员"
			}]
		}, {
			name: "OpenState",
			nameDisplay: "启用状态",
			editor: "select",
			required: true,
			value: "",
			opts: [{
				Id: 1,
				Name: "启用"
			}, {
				Id: 2,
				Name: "停用"
			}],
			originValue: 1
		}, {
			name: "PointAmount",
			nameDisplay: "积分数量",
			editor: "normal",
			required: true,
			value: "",
			originValue: ""
		}, {
			name: "ValidStartTime",
			nameDisplay: "有效开始时间",
			editor: "normal",
			required: false,
			value: "",
			originValue: ""
		}, {
			name: "ValidEndTime",
			nameDisplay: "有效结束时间",
			editor: "normal",
			required: false,
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
		}, {
			name: "WorkerPropertyName",
			nameDisplay: "可绑定属性名称",
			editor: "normal",
			required: false,
			value: "",
			originValue: ""
		}, {
			name: "WorkerPropertyValue ",
			nameDisplay: "可绑定属性值",
			editor: "normal",
			required: false,
			value: "",
			originValue: ""
		}];

		var getInspectorList = function($scope) {
			$scope.ngDialogPromise = $http({
				method: "get",
				url: serverUrls.eventInspectorlist + "?length=9999&currentPage=1&usageLv=-1"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var InspectorList = response.Content.pagelist;
					var newInspectorList = [];
					InspectorList.forEach(function(_item, _index) {
						if(_item.Scope === 1) {
							newInspectorList.push(_item);
						}
					});
					$scope.fieldsList.forEach(function(item, index) {
						if(item.name === "InspectorId") {
							item.opts = newInspectorList;
							item.originValue = newInspectorList[0] ? newInspectorList[0].Id : "";
							return;
						}
					});
					PcService.initFormList($scope.fieldsList);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//新增管理
		$scope.creatOne = function() {
			var fieldsList = $scope.fieldsList;
			PcService.initFormList(fieldsList);
			var fetchData = $scope.fetchData;
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ["$scope", function($scope) {
					$scope.fetchData = fetchData;
					$scope.TitleText = "新增";
					$scope.fieldsList = fieldsList;

					$scope.formSubmit = function() {
						PcService.formSubmit($scope, true, $scope.fieldsList, serverUrls.pointRule, null, null, $rootScope.pHeader);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
		};

		//
		$scope.editItem = function(x) {
			var fieldsList = $scope.fieldsList;
			var fetchData = $scope.fetchData;
			PcService.bindFormData(x, fieldsList);
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ["$scope", function($scope) {
					$scope.fetchData = fetchData;
					$scope.TitleText = "修改";
					$scope.fieldsList = fieldsList;

					$scope.formSubmit = function() {
						PcService.formSubmit($scope, false, $scope.fieldsList, serverUrls.pointRule, x, null, $rootScope.pHeader);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
		};

	}
]);