App.controller("zuzhijiagouCtrl", ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q', '$rootScope',
	function($scope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q, $rootScope) {
		$scope.list = [];
		$scope.TitleText = "新增";
		$scope.searchOption = {
			name: ""
		};
		$scope.create = false;
		$scope.PcService = PcService;
		$scope.serverUrls = serverUrls;

		//上级组织列表
		$scope.PreOrganization = [];

		var bindOptons = function(name, opts, fieldsList) {
			fieldsList.forEach(function(item, index) {
				if(item.name === name) {
					item.opts = opts;
					item.originValue = opts[0] ? opts[0].Id : "";
				}
			});
		};

		var initArray = [{
			Id: 0,
			Name: "无上级"
		}];

		//获取上级组织列表
		var getPreOrganization = function($scope, deffered) {
			$http({
				method: 'get',
				url: serverUrls.organizationAll + "?state=0"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					if(response.Content.length !== 0) {
						$scope.PreOrganization = initArray.concat(response.Content);
					}
					bindOptons("ParentId", $scope.PreOrganization, $scope.fieldsList);
					if(!!deffered) {
						deffered.resolve("success");
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//点击弹出新增组织架构窗口
		$scope.creatOne = function() {
			var deffered = $q.defer();
			var promises = deffered.promise;
			getPreOrganization($scope, deffered);
			promises.then(function() {
				var fieldsList = $scope.fieldsList;
				var fetchData = $scope.fetchData;
				PcService.initFormList(fieldsList);
				$scope.create = true;
				ngDialog.openConfirm({
					template: 'createOne',
					controller: ['$scope', function($scope) {
						$scope.fetchData = fetchData;
						$scope.fieldsList = fieldsList;
						$scope.TitleText = "新增";

						$scope.formSubmit = function() {
							/*formSubmit(true, $scope.fieldsList);*/
							PcService.formSubmit($scope, true, $scope.fieldsList, serverUrls.addOrganization);

						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 600
				});
			});

		};

		var bindFormData = function(x, fieldsList) {
			fieldsList.forEach(function(item, index) {
				item.value = x[item.name] ? x[item.name] : "";
			});
		};

		//编辑管理
		$scope.editItem = function(x) {
			var deffered = $q.defer();
			var promises = deffered.promise;
			getPreOrganization($scope, deffered);
			promises.then(function(value) {
				var fetchData = $scope.fetchData;
				var fieldsList = $scope.fieldsList;
				PcService.bindFormData(x, fieldsList);
				$scope.create = false;
				ngDialog.openConfirm({
					template: 'createOne',
					controller: ['$scope', function($scope) {
						$scope.fieldsList = fieldsList;
						$scope.fetchData = fetchData;
						$scope.TitleText = "修改";

						$scope.formSubmit = function() {
						PcService.formSubmit($scope, false, $scope.fieldsList, serverUrls.editupOrganization, x, {}, $rootScope.pHeader);

						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 600
				});
			});

		};

		//获取数据列表
		$scope.fetchData = function() {
			PcService.fetchData($scope, serverUrls.organizationList, $scope.searchOption);
		};

		$scope.fetchData();

		//新增组织架构表单菜单列表
		$scope.fieldsList = [{
			name: "Name",
			nameDisplay: "组织名称",
			editor: "normal",
			required: true,
			value: "",
			originValue: ""
		}, {
			name: "ParentId",
			nameDisplay: "上级组织",
			editor: "select",
			required: true,
			value: "",
			opts: $scope.PreOrganization,
			originValue: 0
		}, {
			name: "Telephone",
			nameDisplay: "联系电话",
			editor: "normal",
			required: false,
			value: "",
			originValue: ""
		}, {
			editor: "textarea",
			name: "Describe",
			nameDisplay: "描述",
			required: false,
			value: "",
			originValue: ""
		}, {
			name: "Sort",
			nameDisplay: "排序号",
			editor: "normal",
			required: false,
			value: "",
			originValue: ""
		}];

	}
]);