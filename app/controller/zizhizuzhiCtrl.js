App.controller('zizhizuzhiCtrl', ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q) {
		$scope.list = [];
		$scope.searchOption = {
			name: ""
		};
		$scope.PcService = PcService;
		$scope.serverUrls = serverUrls;
		$scope.TitleText = "";
		$scope.courtyardAll = [];
		$scope.Grids = [{
			Id: 0,
			Name: "请选择"
		}];
		$scope.Roles = [{
			Id: 0,
			Name: "请选择"
		}];

		//上级组织列表
		$scope.PreOrganization = [{
			Id: 0,
			Name: "无"
		}];

		var bindOptons = function(name, opts, fieldsList) {
			fieldsList.forEach(function(item, index) {
				if(item.name === name) {
					item.opts = opts;
					item.originValue = opts[0] ? opts[0].Id : "";
				}
			});
		};

		//获取所网格
		var getGrids = function($scope, deffered) {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.gridList + "?length=9999&currentPage=1"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.Grids = response.Content.pagelist;
					bindOptons("GridId", $scope.Grids, $scope.fieldsList);
					deffered.resolve("success");
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取自治组织列表
		var getPreOrganization = function($scope, deffered) {
			$scope.listBusyPromise = $http({
				method: 'get',
				url: serverUrls.Associationall + "?state=0"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var initArray = [{
						Id: 0,
						Name: "无"
					}];
					$scope.PreOrganization = initArray.concat(response.Content);
					bindOptons("ParentId", $scope.PreOrganization, $scope.fieldsList);
					if(deffered) {
						getGrids($scope, deffered);

					}

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});

		};

		var getCourtyardAll = function() {
			$scope.listBusyPromise = $http({
				method: 'get',
				url: serverUrls.courtyardAll + "?openstate=1"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.courtyardAll = response.Content;
					bindOptons("CourtyardId", $scope.courtyardAll, $scope.fieldsList);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取自治组织列表
		$scope.fetchData = function() {
			PcService.fetchData($scope, serverUrls.associationList, $scope.searchOption);
			if($scope.courtyardAll.length === 0) {
				getCourtyardAll();
			}
		};

		$scope.fetchData();

		//新增自治组织
		$scope.creatOne = function() {
			var deffered = $q.defer();
			var promises = deffered.promise;
			getPreOrganization($scope, deffered);
			promises.then(function() {
				var fieldsList = $scope.fieldsList;
				var fetchData = $scope.fetchData;
				PcService.initFormList(fieldsList);
				ngDialog.openConfirm({
					template: 'createOne',
					controller: ['$scope', function($scope) {
						$scope.TitleText = "新增";
						$scope.fieldsList = fieldsList;
						$scope.fetchData = fetchData;

						$scope.formSubmit = function() {
							PcService.formSubmit($scope, true, $scope.fieldsList, serverUrls.inAssociation);
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false
				});
			});
		};

		//编辑自治组织
		$scope.editItem = function(x) {
			var deffered = $q.defer();
			var promises = deffered.promise;
			getPreOrganization($scope, deffered);
			promises.then(function() {
				var fieldsList = $scope.fieldsList;
				var fetchData = $scope.fetchData;
				PcService.bindFormData(x, fieldsList);
				ngDialog.openConfirm({
					template: 'createOne',
					controller: ['$scope', function($scope) {
						$scope.TitleText = "编 辑";
						$scope.fieldsList = fieldsList;
						$scope.fetchData = fetchData;

						$scope.formSubmit = function() {
							PcService.formSubmit($scope, false, $scope.fieldsList, serverUrls.upAssociation, x);
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 600
				});
			});

		};

		//提交新增表单
		$scope.formSubmit = function() {
			alert();
		};

		//新增组织架构表单菜单列表
		$scope.fieldsList = [{
			name: "CourtyardId",
			nameDisplay: "院落",
			editor: "select",
			required: true,
			value: "",
			originValue: ""
		}, {
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
			originValue: $scope.PreOrganization[0].Id
			//$scope.Grids
		}, {
			name: "GridId",
			nameDisplay: "自治单元",
			editor: "select",
			required: true,
			value: "",
			opts: $scope.Grids,
			originValue: $scope.Grids[0].Id
			//$scope.Grids
		}, {
			name: "Telephone",
			nameDisplay: "联系电话",
			editor: "normal",
			required: true,
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

		var getMemberList = function($scope, x) {
			var params = {
				autonomyOrganizationsId: x.Id
			};
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.staffList,
				params: params,
				success: function(response) {
					$scope.MemberList = response;
				},
				error: function(error) {
					layerAlert.autoclose(error);
				}
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

		//删除组织成员
		var deleteMember = function($scope, x) {
			$scope.getResidentPromise = $http({
				method: 'delete',
				url: serverUrls.deStaff + "?id=" + x.Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("删除成功！");
					$scope.MemberList.forEach(function(item, index) {
						if(item.Id === x.Id) {
							$scope.MemberList.splice(index, 1);
						}
					});
					$scope.fetchData();
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var memberBindFormData = function(x, fieldsList) {
			fieldsList.forEach(function(item, index) {
				if(item.name === "ResidentStatus") {
					var _item = [{
						Id: x[item.name],
						Name: x.Name
					}];
					var isHasTheElement = false;
					item.opts.forEach(function(ite, ind) {
						if(ite.Id === _item[0].Id) {
							isHasTheElement = true;
							return;
						}
					});
					if(!isHasTheElement) {
						item.opts = item.opts.concat(_item);
					}
				}
				if(x[item.name] !== undefined) {
					item.value = x[item.name];
				}
			});
			//$scope.fieldsList[0].opts = $scope.fieldsList[0].opts.concat();

		};

		var getRoles = function($scope, deffered) {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.autoNomyrolelist
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.Roles = response.Content;
					if($scope.Grids.length === 0) {
						getGrids(deffered);
					} else {
						deffered.resolve("success");
					}

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

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
						_scope.getMemberList(_scope, x);
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

		//成员管理
		$scope.MembersManageItem = function(x) {
			var deffered = $q.defer();
			var promises = deffered.promise;
			/*if($scope.Roles.length === 0) {
				getRoles(deffered);
			} else {
				deffered.resolve("success");
			}*/
			/*promises.then(function(value) {*/
			var Roles = $scope.Roles;
			var Grids = $scope.Grids;
			var fetchData = $scope.fetchData;
			var PcService = $scope.PcService;
			ngDialog.openConfirm({
				template: 'MemberManage',
				controller: ['$scope', function($scope) {
					$scope.TitleText = "编 辑";
					$scope.Roles = Roles;
					$scope.Roles.forEach(function(item, index) {
						item.Id = item.Code;
					});
					$scope.Grids = Grids;
					$scope.fetchData = fetchData;
					$scope.PcService = PcService;
					getMemberList($scope, x);
					$scope.getMemberList = getMemberList;
					$scope.staffStatus = [{
						Id: 1,
						Name: "自治"
					}, {
						Id: 2,
						Name: "网格"
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
						name: "Code",
						nameDisplay: "角色",
						required: true,
						value: "",
						originValue: $scope.Roles[0].Id,
						opts: $scope.Roles
					}, {
						editor: "select",
						name: "GridId",
						nameDisplay: "区域",
						required: true,
						value: "",
						originValue: $scope.Grids[0].Id,
						opts: $scope.Grids
					}];
					/*PcService.initFormList($scope.fieldsList);*/

					//新增组织成员
					$scope.addMember = function() {
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
										AutonomyOrganizationsId: x.Id
									};

									if($scope.fieldsList[0].value === 0) {
										layerAlert.autoclose("居民身份不能为空!");
										return;
									}
									param = $.extend(true, param, PcService.getFormData($scope.fieldsList));
									formSubmitAddMember(_scope, $scope, param, x);
									//PcService.formSubmit($scope, true, $scope.fieldsList, serverUrls.inStaff, null, param);
								};
							}],
							className: 'ngdialog-theme-default',
							//closeByEscape: true,
							closeByDocument: false,
							width: 600
						});
					};

					//修改组织成员
					$scope.modifyMember = function(y) {
						var fieldsList = $scope.fieldsList;

						var fetchData = $scope.fetchData;
						ngDialog.openConfirm({
							template: 'createMember',
							controller: ['$scope', function($scope) {
								$scope.TitleText = "修改";
								$scope.fieldsList = fieldsList;
								memberBindFormData(y, $scope.fieldsList);
								$scope.fetchData = fetchData;

								$scope.Resident = {
									value: ""
								};
								//搜索居民身份列表
								$scope.getResidentStatus = function() {
									getResidentStatus($scope.Resident.value);
								};

								//编辑提交
								$scope.formSubmit = function() {
									var param = {
										AutonomyOrganizationsId: x.Id
									};

									if($scope.fieldsList[0].value === 0) {
										layerAlert.autoclose("居民身份不能为空!");
										return;
									}
									PcService.formSubmit($scope, false, $scope.fieldsList, serverUrls.upStaff, y, param);
								};
							}],
							className: 'ngdialog-theme-default',
							//closeByEscape: true,
							closeByDocument: false,
							width: 600
						});
					};

					//删除组织成员
					$scope.deleteMember = function(x) {
						deleteMember($scope, x);
					};

				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});
			/*}, function(value) {
				console.log(value);
			}, function(value) {
				console.log(value);
			});*/

		};

		$scope.toggleItem = function(x) {
			PcService.toggleItem($scope, x, serverUrls.associationState);
		};
	}
]);