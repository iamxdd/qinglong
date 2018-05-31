App.controller('acountsCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {
		$scope.list = [];
		$scope.TitleText = "新增";

		//获取所有用户列表
		$scope.fetchData = function() {
			PcService.fetchData($scope, serverUrls.userList, {}, $rootScope.gHeader);		
		};

		$scope.fetchData();

		var getMyOwnerRoles = function($scope, x, allRolesList) {
			$scope.ngDialogPromise = $http({
				headers: $rootScope.gHeader,
				method: "get",
				url: serverUrls.userrolelist + "?name=" + x.LoginName
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.allOwerList = response.Content;
					if(allRolesList) {
						$scope.allRolesList.forEach(function(item, index) {
							item.HasThisRoles = false;
							item.userRoleId = null;
							$scope.allOwerList.forEach(function(_item, _index) {
								if(item.Name === _item.RoleName) {
									item.HasThisRoles = true;
									item.userRoleId = _item.Id;
									return;
								}
							});
						});
					}
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取所有角色列表
		var getAllRoles = function($scope, x) {
			$scope.ngDialogPromise = $http({
				headers: $rootScope.gHeader,
				method: "get",
				url: serverUrls.getAllRole
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.allRolesList = response.Content;
					getMyOwnerRoles($scope, x, $scope.allRolesList);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var submitRolesItem = function($scope, item, userName, index, n) {
			var url, method, data;
			switch(item.HasThisRoles) {
				case true:
					url = serverUrls.inUserrole;
					method = "post";
					data = {
						UserName: userName,
						RoleCode: item.Code
					};
					break;
				case false:
					if(!item.userRoleId) {
						if($scope.count === n - 1) {
							layerAlert.autoclose("您未进行任务操作！");
							$scope.fetchData();
							setTimeout(function() {
								ngDialog.closeAll();
							}, 1600);
							return;
						}
						$scope.count++;
					}

					url = serverUrls.deUserrole + "?id=" + item.userRoleId;
					method = "delete";
					data = null;
					break;
			}
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: method,
				url: url,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					//layerAlert.autoclose(Message);
				} else {
					//layerAlert.autoclose(Message);
				}
				if(index === n - 1) {
					layerAlert.autoclose("角色配置成功！");
					$scope.fetchData();
					setTimeout(function() {
						ngDialog.closeAll();
					}, 1500);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var submitRoles = function($scope, myRoles, userName) {
			var n = myRoles.length;
			$scope.count = 0;
			myRoles.forEach(function(item, index) {
				submitRolesItem($scope, item, userName, index, n);
			});
		};

		//配置角色
		$scope.configureItem = function(x) {
			var fetchData = $scope.fetchData;
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.TitleText = "配置角色";
					$scope.myRoles = {};
					$scope.allOwerList = [];
					$scope.allRolesList = [];
					$scope.isSee = false;
					$scope.fetchData = fetchData;

					//获取所有角色
					getAllRoles($scope, x);

					//提交角色配置
					$scope.submitRoles = function() {
						submitRoles($scope, $scope.allRolesList, x.LoginName);
					};

				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
		};

		//查看角色
		$scope.seeItem = function(x) {
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.TitleText = "查看角色";
					$scope.allOwerList = [];
					$scope.isSee = true;
					if(!$scope.allOwerList || $scope.allOwerList.length === 0) {
						getMyOwnerRoles($scope, x);
					}

					$scope.submitRoles = function() {
						ngDialog.closeAll();
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