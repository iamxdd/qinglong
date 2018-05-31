App.controller('rolesCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {
		$scope.list = [];
		$scope.TitleText = "新增";

		//获取账号下角色列表
		$scope.fetchData = function() {
			$scope.listBusyPromise = $http({
				headers: $rootScope.gHeader,
				method: "get",
				url: serverUrls.getAllRole
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.list = response.Content;
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
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
						PcService.formSubmit($scope, true, $scope.fieldsList, serverUrls.addRole);
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
						PcService.formSubmit($scope, false, $scope.fieldsList, serverUrls.upRole, x, null, $rootScope.pHeader);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false
			});
		};

		var getRoleMenus = function($scope, code, AllMenus) {
			$scope.ngDialogPromise = $http({
				headers: $rootScope.gHeader,
				method: "get",
				url: serverUrls.menuRolelist + "?roleCode=" + code
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.RoleMenus = response.Content;
					AllMenus.forEach(function(item, index) {
						item.Checked = false;
						item.roleMenuId = null;
						$scope.RoleMenus.forEach(function(_item, _index) {
							if(_item.StreetMenuId === item.Id) {
								item.Checked = true;
								item.roleMenuId = _item.Id;
								return;
							}
						});
					});
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取菜单下的权限详细
		var getMyDoPermission = function($scope, roleCode, menuCode, AllDoPermission) {
			$http({
				headers: $rootScope.gHeader,
				method: "get",
				url: serverUrls.menuRolelist + "?roleCode=" + roleCode + "&menuCode=" + menuCode
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					if(!response.Content || response.Content.length === 0) {
						return;
					}
					var MyDoPermission = response.Content[0].Operation;
					MyDoPermission = MyDoPermission.split(",");
					AllDoPermission.forEach(function(item, index) {
						item.Checked = false;
						MyDoPermission.forEach(function(_item) {
							if(item.Name === _item) {
								item.Checked = true;
								return;
							}
						});

					});
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取所有权限
		var getAllDoPermission = function($scope, AllMenus, x) {
			$scope.ngDialogPromise = $http({
				headers: $rootScope.gHeader,
				method: "get",
				url: serverUrls.operationList
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var AllDoPermission = response.Content;
					//getMyDoPermission($scope, code, menuCode, AllMenus, AllDoPermission);

					AllMenus.forEach(function(item, index) {
						var simpleArray = AllDoPermission.split(",");
						var itemAllDoPermission = [];
						simpleArray.forEach(function(item, index) {
							var ItemObj = {};
							ItemObj.Name = item;
							ItemObj.Checked = false;
							itemAllDoPermission.push(ItemObj);
						});
						item.Checked = false;
						item.AllDoPermission = itemAllDoPermission;
						getMyDoPermission($scope, x.Code, item.Code, item.AllDoPermission);
					});

				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var getAllMenus = function($scope, x) {
			$scope.ngDialogPromise = $http({
				headers: $rootScope.gHeader,
				method: "get",
				url: serverUrls.menuList
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.AllMenus = response.Content;
					getRoleMenus($scope, x.Code, $scope.AllMenus);
					getAllDoPermission($scope, $scope.AllMenus, x);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var _getAllMenus = function($scope, x) {
			$scope.ngDialogPromise = $http({
				headers: $rootScope.gHeader,
				method: "get",
				url: serverUrls.newMenurolelist + "?roleCode=" + x.Code
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.AllMenus = response.Content.DTOMenu;
					$scope.AllMenus.forEach(function(item, index) {
						var AllDoPermission = [{
							Name: "list",
							Check: false
						}, {
							Name: "add",
							Check: false
						}, {
							Name: "update",
							Check: false
						}, {
							Name: "detele",
							Check: false
						}, {
							Name: "openstate",
							Check: false
						}, {
							Name: "reviewstate",
							Check: false
						}];
						if(item.Operation && item.Operation.length > 0) {
							var itemPermission = item.Operation.split(",");
							AllDoPermission.forEach(function(_item, _index) {
								itemPermission.forEach(function(_ite, _ind) {
									if(_item.Name === _ite) {
										_item.Checked = true;
										return;
									}
								});
							});
							item.AllDoPermission = AllDoPermission;
						} else {
							item.AllDoPermission = AllDoPermission;
						}

					});
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//保存菜单权限配置项
		var saveMenuPermession = function($scope, x, role) {
			var url, method, headers, data;
			if(x.Flag) {
				var Operation = "";
				x.AllDoPermission.forEach(function(item) {
					if(item.Checked) {
						Operation += item.Name + ",";
					}
				});
				Operation = Operation.substring(0, Operation.length - 1);

				if(!x.Id) {
					method = "post";
					url = serverUrls.inStreetmenurole;
					data = {
						RoleCode: role.Code,
						SrreetMenuCode: x.StreetMenuCode,
						Operation: Operation
					};
				} else {
					method = "put";
					url = serverUrls.upStreetmenurole;
					data = {
						Id: x.Id,
						RoleCode: role.Code,
						SrreetMenuCode: x.StreetMenuCode,
						Operation: Operation
					};

				}
			} else {
				method = "delete";
				url = serverUrls.deStreetmenurole + "?id=" + x.Id;
				data = null;
			}

			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: method,
				url: url,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				//x.Id = response.Content;
				if(Code === 0) {
					layerAlert.autoclose("权限配置操作成功！");
					_getAllMenus($scope, role);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//配置角色菜单
		$scope.configItem = function(x) {

			var fetchData = $scope.fetchData;
			ngDialog.openConfirm({
				template: 'configOne',
				controller: ['$scope', function($scope) {
					$scope.fetchData = fetchData;
					$scope.roleName = x.Name;
					$scope.AllMenus = [];
					$scope.RoleMenus = [];
					$scope.AllDoPermission = [];
					_getAllMenus($scope, x);

					$scope.showChildPermission = function(x) {
						//x.Checked = !x.Checked;
					};

					$scope.saveMenuPermession = function(_x) {
						saveMenuPermession($scope, _x, x);
					};

					$scope.saveAll = function(AllMenus) {
						AllMenus.forEach(function(item) {
							$scope.saveMenuPermession(item);
						});
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 960
			});
			/*var fetchData = $scope.fetchData;
			ngDialog.openConfirm({
				template: 'configOne',
				controller: ['$scope', function($scope) {
					$scope.fetchData = fetchData;
					$scope.roleName = x.Name;
					$scope.AllMenus = [];
					$scope.RoleMenus = [];
					$scope.AllDoPermission = [];
					getAllMenus($scope, x);

					$scope.showChildPermission = function(x) {
						//x.Checked = !x.Checked;
					};

					$scope.saveMenuPermession = function(_x) {
						saveMenuPermession($scope, _x, x);
					};

					$scope.saveAll = function(AllMenus) {
						AllMenus.forEach(function(item) {
							$scope.saveMenuPermession(item);
						});
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});*/
		};

		$scope.fieldsList = [{
			name: "Name",
			nameDisplay: "角色名称",
			editor: "normal",
			required: true,
			value: "",
			originValue: ""
		}, {
			name: "Code",
			nameDisplay: "角色Code",
			editor: "normal",
			required: true,
			value: "",
			originValue: ""
		}, {
			name: "Description",
			nameDisplay: "角色描述",
			editor: "normal",
			required: false,
			value: "",
			originValue: ""
		}];
	}
]);