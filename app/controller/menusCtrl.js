App.controller('menusCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {
		$scope.list = [];
		$scope.TitleText = "新增";

		//获取账号下角色列表
		$scope.fetchData = function() {
			PcService.fetchData($scope, serverUrls.getMenulist);
		};

		$scope.fetchData();

		//新增角色
		$scope.creatOne = function() {
			var fetchData = $scope.fetchData;
			var fieldsList = $scope.fieldsList;
			PcService.initFormList(fieldsList);
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.TitleText = "新增";
					$scope.fieldsList = fieldsList;
					$scope.fetchData = fetchData;

					//新增提交
					$scope.formSubmit = function() {
						PcService.formSubmit($scope, true, $scope.fieldsList, serverUrls.inStreetmenu);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false
			});
		};

		//修改角色
		$scope.editItem = function(x) {
			var fetchData = $scope.fetchData;
			var fieldsList = $scope.fieldsList;
			PcService.bindFormData(x, fieldsList);
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.TitleText = "修改";
					$scope.fieldsList = fieldsList;
					$scope.fetchData = fetchData;

					//修改提交
					$scope.formSubmit = function() {
						PcService.formSubmit($scope, false, $scope.fieldsList, serverUrls.upStreetmenu, x, null, $rootScope.pHeader);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false
			});
		};

		$scope.fieldsList = [{
			name: "Name",
			nameDisplay: "菜单名称",
			editor: "normal",
			required: true,
			value: "",
			originValue: ""
		}, {
			name: "Code",
			nameDisplay: "菜单Code",
			editor: "normal",
			required: true,
			value: "",
			originValue: ""
		}, {
			name: "MenuType",
			nameDisplay: "菜单类型",
			editor: "normal",
			required: false,
			value: "",
			originValue: ""
		}, {
			name: "Description",
			nameDisplay: "菜单描述",
			editor: "normal",
			required: false,
			value: "",
			originValue: ""
		}];
	}
]);