App.controller('zizhijueseCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q) {
		$scope.list = [];
		$scope.TitleText = "新增";
		$scope.roleMembers = [];

		$scope.fetchData = function() {
			PcService.fetchList($scope, serverUrls.autoNomyrolelist);
		};

		$scope.fetchData();

		$scope.deleteItem = function(x) {
			PcService.deleteItem($scope, serverUrls.deleteRole, x);
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

		//新增操作
		$scope.creatOne = function() {
			var fetchData = $scope.fetchData;
			var fieldsList = $scope.fieldsList;
			PcService.initFormList(fieldsList);
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.TitleText = "修改自治角色";
					$scope.fetchData = fetchData;
					$scope.fieldsList = fieldsList;
					//新增提交
					$scope.formSubmit = function() {
						PcService.formSubmit($scope, true, $scope.fieldsList, serverUrls.inAutonomyrole);
					};

				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});
		};

		//获取角色下成员列表
		var getMembers = function($scope, x, defferd, scope) {
			$scope.listBusyPromise = $http({
				method: 'get',
				url: serverUrls.staffList + "?length=9999&currentPage=1&code=" + x.Code
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.roleMembers = response.Content.pagelist;
					if(scope) {
						scope.roleMembers = response.Content.pagelist;
					}
					if(defferd) {
						defferd.resolve();
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var getResidentStatus = function($scope, value) {
			if(!value) {
				return;
			}
			$scope.getResidentPromise = $http({
				method: 'get',
				url: serverUrls.negotiationList + "?value=" + value
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.ResidentStatus = response.Content;
					if($scope.ResidentStatus && $scope.ResidentStatus.length > 0) {
						$scope.ResidentStatus.forEach(function(item, index) {
							item.Id = item.ResidentStatus;
						});
						$scope.fieldsList[0].opts = $scope.ResidentStatus;
						$scope.fieldsList[0].value = $scope.ResidentStatus[0] ? $scope.ResidentStatus[0].Id : "";
					} else {
						layerAlert.autoclose("当前关键字没有相关居民，请重新搜索！");
					}

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取自治组织列表
		var getAutonomyOrganizations = function($scope, defferd) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.Associationall
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.autonomyOrganizations = response.Content;
					$scope.fieldsList.forEach(function(item, index) {
						if(item.name === "AutonomyOrganizationsId") {
							item.opts = $scope.autonomyOrganizations;
							item.originValue = $scope.autonomyOrganizations[0] ? $scope.autonomyOrganizations[0].Id : "";
						}
					});
					if(defferd) {
						defferd.resolve();
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		//提交新增成员
		var formSubmitAddMember = function(_scope, $scope, data, x) {
			$scope.ngDialogPromise = $scope.listBusyPromise = $http({
				method: "post",
				url: serverUrls.inStaff,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("新增成功!");
					if(_scope) {
						getMembers(_scope.$parent.$parent, x, null, _scope);
						//.getMemberList(_scope, x);
					}
					setTimeout(function() {
						$scope.closeThisDialog();
					}, 1600);

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//删除组织成员
		var deleteMember = function($scope, x, a) {
			$scope.getResidentPromise = $http({
				method: 'delete',
				url: serverUrls.deStaff + "?id=" + a.Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("删除成功！");
					getMembers($scope.$parent.$parent, x, null, $scope);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//角色下成员管理
		$scope.MembersManageItem = function(x) {
			var defferd = $q.defer();
			var promised = defferd.promise;
			getMembers($scope, x, defferd);
			var fetchData = $scope.fetchData;
			promised.then(function() {
				ngDialog.openConfirm({
					template: 'MemberManage',
					scope: $scope,
					controller: ['$scope', function($scope) {
						$scope.TitleText = "角色成员管理";
						$scope.fetchData = fetchData;
						$scope.roleMembers = $scope.$parent.$parent.roleMembers;

						$scope.AutonomyOrganizations = [{
							Id: 0,
							Name: "请选择"
						}];

						$scope.fieldsList = [{
							editor: "select",
							name: "ResidentStatus",
							nameDisplay: "选择居民",
							required: true,
							value: "",
							originValue: 0,
							opts: [{
								Id: 0,
								Name: "请选择"
							}]
						}, {
							editor: "select",
							name: "AutonomyOrganizationsId",
							nameDisplay: "选择组织",
							required: true,
							value: "",
							originValue: $scope.AutonomyOrganizations[0].Id,
							opts: $scope.Grids
						}];

						//删除组织成员
						$scope.deleteMember = function(a) {
							deleteMember($scope, x, a);
						};

						//增加角色成员
						$scope.addMember = function() {
							var _defferd = $q.defer();
							var _promised = _defferd.promise;
							getAutonomyOrganizations($scope, _defferd);
							_promised.then(function() {
								var _scope = $scope;
								var fieldsList = $scope.fieldsList;
								PcService.initFormList(fieldsList);
								var fetchData = $scope.fetchData;
								ngDialog.openConfirm({
									template: 'createMember',
									controller: ['$scope', function($scope) {
										$scope.TitleText = "新增";
										$scope.fieldsList = fieldsList;
										$scope.fetchData = fetchData;
										$scope.Resident = {
											value: ""
										};
										//搜索居民身份列表
										$scope.getResidentStatus = function() {
											getResidentStatus($scope, $scope.Resident.value);
										};

										//新增提交
										$scope.formSubmit = function() {
											var param = {
												Code: x.Code
											};

											if($scope.fieldsList[0].value === 0) {
												layerAlert.autoclose("居民身份不能为空!");
												return;
											}
											param = $.extend(true, param, PcService.getFormData($scope.fieldsList));
											formSubmitAddMember(_scope, $scope, param, x);
										};
									}],
									className: 'ngdialog-theme-default',
									//closeByEscape: true,
									closeByDocument: false,
									width: 600
								});
							});

						};

					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 600
				});
			});
		};

		//修改操作
		$scope.editItem = function(x) {
			var fetchData = $scope.fetchData;
			var fieldsList = $scope.fieldsList;
			PcService.bindFormData(x, fieldsList);
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.TitleText = "修改自治角色";
					$scope.fetchData = fetchData;
					$scope.fieldsList = fieldsList;

					//修改提交
					$scope.formSubmit = function() {
						PcService.formSubmit($scope, false, $scope.fieldsList, serverUrls.upAutonomyrole, x);
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