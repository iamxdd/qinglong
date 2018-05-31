App.controller('OwersCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {
		$scope.list = [];
		$scope.OwnerTypes = [];
		$scope.searchOption = {
			value: ""
		};

		$scope.fieldsList = [{
			name: "Name",
			nameDisplay: "名称",
			editor: "normal",
			required: true,
			value: "",
			originValue: ""
		}, {
			name: "OwnerTypeId",
			nameDisplay: "拥有者类型",
			editor: "select",
			required: true,
			value: "",
			originValue: "",
			opts: $scope.OwnerTypes
		}, {
			name: "OwnerCode",
			nameDisplay: "拥有者Code",
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
		}];

		//新增拥有者
		$scope.creatOne = function() {
			var fieldsList = $scope.fieldsList;
			var fetchData = $scope.fetchData;
			PcService.initFormList(fieldsList);
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.fetchData = fetchData;
					$scope.fieldsList = fieldsList;
					$scope.TitleText = "新增拥有者";

					//提交修改
					$scope.formSubmit = function() {
						PcService.formSubmit($scope, true, $scope.fieldsList, serverUrls.inEventowner, null, null, $rootScope.pHeader);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});
		};

		//编辑拥有者
		$scope.editItem = function(x) {
			var fieldsList = $scope.fieldsList;
			var fetchData = $scope.fetchData;
			PcService.bindFormData(x, fieldsList);
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.fetchData = fetchData;
					$scope.fieldsList = fieldsList;
					$scope.TitleText = "编辑拥有者";

					//提交修改
					$scope.formSubmit = function() {
						PcService.formSubmit($scope, false, $scope.fieldsList, serverUrls.inEventowner, x, null, $rootScope.pHeader);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});
		};

		//删除拥有者
		$scope.deleteItem = function(x) {
			layerAlert.checkone("删除操作", function() {
				PcService.deleteItem($scope, serverUrls.inEventowner, x, $rootScope.pHeader);
			}, function() {}, "确定", "取消", true, true, "确定要删除吗？");

		};

		var getOwnerTypes = function(_scope, scope) {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.eventownertypeList + "?length=9999&currentPage=1"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					if(_scope && scope) {
						_scope.OwnerTypes = response.Content.pagelist;
						scope.Members = response.Content.pagelist;
					} else {
						$scope.OwnerTypes = response.Content.pagelist;
						$scope.fieldsList.forEach(function(item, index) {
							if(item.name === "OwnerTypeId") {
								item.opts = $scope.OwnerTypes;
								item.originValue = $scope.OwnerTypes[0].Id;
							}
						});

						PcService.fetchData($scope, serverUrls.eventownerList);
					}

				}
			}).error(function(err) {
				layerAlert.autoclose(err.Message ? err.Message : err + "");
			});
		};

		$scope.fetchData = function() {
			if($scope.OwnerTypes.length === 0) {
				getOwnerTypes();
			} else {
				PcService.fetchData($scope, serverUrls.eventownerList, $scope.searchOption);
			}

		};

		$scope.fetchData();

		var deleteMember = function(_scope, scope, y) {
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: 'delete',
				url: serverUrls.eventownerType + "?id=" + y.Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("删除操作成功！");
					getOwnerTypes(_scope, scope);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//新增拥有者类型提交
		var newMemberFormSubmit = function($scope, url, data, headers, _scope, reScope) {
			$scope.ngDialogPromise = $http({
				headers: headers,
				method: 'post',
				url: url,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("新增成功！");
					getOwnerTypes(_scope, reScope);
					$scope.closeThisDialog();
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//新增拥有者类型
		var createMember = function(_scope, scope, y) {
			var reScope = scope;
			var newMemberfieldsList = [{
				name: "Name",
				nameDisplay: "名称",
				editor: "normal",
				required: true,
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
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.fieldsList = newMemberfieldsList;
					$scope.TitleText = "新增拥有者类型";

					$scope.formSubmit = function() {
						var param = PcService.getFormData($scope.fieldsList);
						newMemberFormSubmit($scope, serverUrls.eventownerType, param, $rootScope.pHeader, _scope, reScope);
					};

					$scope.getResidentStatus = function() {
						getResidentStatus($scope, $scope.Resident.value);
					};

				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});
		};

		//拥有者类型管理
		$scope.owerTypes = function() {
			var _scope = $scope;
			ngDialog.openConfirm({
				template: 'owerTypesManage',
				controller: ['$scope', function($scope) {
					$scope.TitleText = "拥有者类型管理";

					$scope.Members = _scope.OwnerTypes;

					$scope.deleteMember = function(y) {
						deleteMember(_scope, $scope, y);
					};

					$scope.createMember = function(y) {
						createMember(_scope, $scope, y);
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