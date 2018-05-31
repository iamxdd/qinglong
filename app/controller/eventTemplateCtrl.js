App.controller('eventTemplateCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {
		$scope.list = [];
		$scope.TitleText = "新增";
		$scope.searchOption = {
			openState: -1,
			usageLv: -1
		};
		$scope.PcService = PcService;

		//获取所有用户列表
		$scope.fetchData = function() { //eventFeedbackinspectorList
			PcService.fetchData($scope, serverUrls.eventFeedbackinspectorList, $scope.searchOption);
		};
		$scope.fetchData();

		$scope.toggeItem = function(x) {
			PcService.toggleStatus($scope, x, serverUrls.eventFeedbackinspector);
		};

		var getInspectorList = function($scope, create) {
			$scope.ngDialogPromise = $http({
				method: "get",
				url: serverUrls.eventInspectorlist + "?length=9999&currentPage=1"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var InspectorList = response.Content.pagelist;
					var newInspectorList = [];
					InspectorList.forEach(function(_item, _index) {
						if(_item.Scope === 0) {
							newInspectorList.push(_item);
						}
					});
					$scope.InspectorList = newInspectorList;
					$scope.fieldsList.forEach(function(item, index) {
						if(item.name === "InspectorId") {
							item.opts = $scope.InspectorList;
							if(create) {
								item.value = $scope.InspectorList[0] ? $scope.InspectorList[0].Id : "";
							}

						}
					});
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//新增
		$scope.creatOne = function() {
			var fieldsList = $scope.fieldsList;
			var fetchData = $scope.fetchData;
			PcService.initFormList(fieldsList);
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.TitleText = "新增";
					$scope.fieldsList = fieldsList;
					$scope.InspectorList = [];

					if($scope.InspectorList.length === 0) {
						getInspectorList($scope, true);
					}
					$scope.fetchData = fetchData;

					$scope.formSubmit = function() {
						PcService.formSubmit($scope, true, $scope.fieldsList, serverUrls.eventFeedbackinspector, null, null, $rootScope.pHeader);
					};

				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});
		};

		//修改
		$scope.editItem = function(x) {
			var fieldsList = $scope.fieldsList;
			var fetchData = $scope.fetchData;
			PcService.bindFormData(x, fieldsList);
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.TitleText = "修改";
					$scope.fieldsList = fieldsList;
					$scope.InspectorList = [];

					if($scope.InspectorList.length === 0) {
						getInspectorList($scope, false);
					}
					$scope.fetchData = fetchData;

					$scope.formSubmit = function() {
						PcService.formSubmit($scope, false, $scope.fieldsList, serverUrls.eventFeedbackinspector, x, null, $rootScope.pHeader);
					};

				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});
		};
		$scope.FeedbackTypes = [{
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

		$scope.OpenStates = [{
			Id: 1,
			Name: "启用"
		}, {
			Id: 2,
			Name: "停用"
		}];

		$scope.fieldsList = [{
			name: "InspectorId",
			nameDisplay: "事件模板",
			editor: "select",
			required: true,
			value: "",
			originValue: ""

		}, {
			name: "Name",
			nameDisplay: "模板名称",
			editor: "normal",
			required: true,
			value: "",
			originValue: ""
		}, {
			name: "FormType",
			nameDisplay: "表单类型",
			editor: "select",
			required: true,
			value: "",
			originValue: $scope.FeedbackTypes[0].Id,
			opts: $scope.FeedbackTypes
		}, {
			name: "OpenState",
			nameDisplay: "启用状态",
			editor: "select",
			required: true,
			value: "",
			opts: $scope.OpenStates,
			originValue: $scope.OpenStates[0].Id
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
		}];
	}
]);