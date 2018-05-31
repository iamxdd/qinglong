App.controller("wanggeguanliCtrl", ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q) {
		$scope.list = [];
		$scope.TitleText = "新增";
		$scope.Roles = [];
		$scope.searchOption = {
			name: ""
		};
		Array.prototype.contains = function(needle) {
			for(var i in this) {
				if(this[i].Id === needle.Id) {
					return true;
				}
			}
			return false;
		};

		var initArray = [{
			Id: 0,
			Name: "请选择"
		}];

		//部门列表
		$scope.department = [{
			Id: 0,
			Name: "请选择"
		}];

		//性别列表
		$scope.gender = [{
			Id: 1,
			Name: "男"
		}, {
			Id: 2,
			Name: "女"
		}];

		$scope.employeeTypes = [{
			Id: 1,
			Name: "区域管理员"
		}, {
			Id: 2,
			Name: "普通员工"
		}];

		var bindFormOptions = function(name, fieldsList, opts) {
			fieldsList.forEach(function(item, index) {
				if(item.name === name) {
					item.opts = opts;
					item.originValue = opts[0].Id;
				}
			});
		};

		//获取部门列表
		var getDepartment = function(state, fieldsList) {
			$http({
				method: "get",
				url: serverUrls.organizationAll + "?state=" + state
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var department = response.Content;
					bindFormOptions("OrganizationsId", fieldsList, department);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取所有区域管理员
		var getPersonnels = function($scope) {
			$scope.ngDialogPromise = $http({
				method: "get",
				url: serverUrls.griderAll
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.Personnels = response.Content;
					$scope.gridAction.PersonnelId = $scope.Personnels[0] ? $scope.Personnels[0].Id : "";
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取所有院落列表
		var getCourtyardAll = function($scope) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.courtyardAll + "?openstate=0"
			}).success(function(response) {
				var addList = response.Content;
				$scope.unitField.opts1 = initArray.concat(addList);

			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//根据院落id获取楼栋列表
		var getBuildList = function($scope, id) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.buildingAll + "?id=" + id + "&type=1"
			}).success(function(response) {
				var addList = response.Content;
				$scope.unitField.opts2 = initArray.concat(addList);
				$scope.gridAction.BuildId = 0;
				$scope.gridAction.UnitIds = 0;
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//根据楼栋Id获取单元列表
		var getUnitList = function($scope, id) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.buildingAll + "?id=" + id + "&type=2"
			}).success(function(response) {
				var addList = response.Content;
				$scope.unitField.opts3 = initArray.concat(addList);
				$scope.gridAction.UnitIds = 0;
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var choseRooms = function($scope, id) {
			var checkedBuildName = "";
			$scope.unitField.opts4.forEach(function(item, index) {
				if(item.Id === id) {
					checkedBuildName = item.Name;
					return;
				}
			});
			var checkedUnitItem = {
				Id: id,
				Name: checkedBuildName
			};
			if(!$scope.checkedRoomList.contains(checkedUnitItem)) {
				$scope.checkedRoomList.push(checkedUnitItem);
				$scope.gridAction.RoomId.push(checkedUnitItem);
			} else {
				layerAlert.autoclose("已经添加过该户,无需重复添加!");
				return;
			}
			$scope.showCheckSelect = false;
		};

		var _choseUnits = function($scope, id) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.unitHouseList + "?id=" + id
			}).success(function(response) {
				var addList = response.Content;
				addList.forEach(function(item, index) {
					item.Name = item.RoomNumber;
				});
				$scope.unitField.opts4 = initArray.concat(addList);
				$scope.gridAction.RoomIds = 0;
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var choseUnits = function($scope, BuildId, UnitId) {
			var checkedBuildName = "";
			$scope.unitField.opts2.forEach(function(item, index) {
				if(item.Id === BuildId) {
					checkedBuildName = item.Name;
					return;
				}
			});
			$scope.unitField.opts3.forEach(function(_item, _index) {
				if(_item.Id === UnitId) {
					var checkedUnitItem = {
						Id: _item.Id,
						Name: checkedBuildName + "" + _item.Name
					};
					if(!$scope.checkedUnitList.contains(checkedUnitItem)) {
						$scope.checkedUnitList.push(checkedUnitItem);
						$scope.gridAction.UnitId.push(checkedUnitItem);
					} else {
						layerAlert.autoclose("已经添加过此单元了,无需重复添加!");
						return;
					}
					return;
				}
			});
			$scope.showCheckSelect = false;
		};

		var getUnitId = function(UnitIds) {
			var Ids = "";
			UnitIds.forEach(function(item, index) {
				Ids += item.Id + ",";
			});
			Ids = Ids.substring(0, Ids.length - 1);
			return Ids;
		};

		//提交表单数据
		var formSubmit = function($scope, create, url, data, headers, x) {
			if(create) {
				if(data.UnitId && data.UnitId.length !== 0) {
					data.UnitId = getUnitId(data.UnitId);
				} else {
					layerAlert.autoclose("请至少选择一个单元!");
					return;
				}
			}

			var method, doAction;

			switch(create) {
				case true:
					method = "post";
					doAction = "新增";
					break;
				case false:
					method = "put";
					doAction = "修改";
					data.Id = x.Id;
					break;
			}
			$scope.ngDialogPromise = $http({
				headers: headers ? headers : null,
				method: method,
				url: url,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose(doAction + "操作成功！");
					setTimeout(function() {
						ngDialog.close(0);
					}, 1600);
					$scope.fetchData();
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		///获取区域信息
		var getAreas = function($scope, id) {
			PcService.fetchData($scope, serverUrls.gridGangelist, {
				id: id,
				length: 6,
				currentPage: 1
			});
		};

		//增加区域(单元)
		var submitAddcell = function($scope, url, param, id, _$scope) {
			$scope.ngDialogPromise = $http({
				method: 'post',
				url: url,
				data: param
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("新增成功!");
					getAreas(_$scope, id);
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

		//删除单元
		var deleteCell = function($scope, id, _id) {
			$scope.ngDialogPromise = $http({
				method: 'delete',
				url: serverUrls.deGridgange + "?id=" + id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("删除成功!");
					getAreas($scope, _id);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//删除自治单元
		$scope.deleteItem = function(x) {
			PcService.deleteItem($scope, serverUrls.deGrid, x, $rootScope.pHeader);
		};

		//区域配置
		$scope.configItem = function(x) {
			var fetchData = $scope.fetchData;
			ngDialog.openConfirm({
				template: 'configOne',
				controller: ["$scope", function($scope) {
					$scope.create = true;
					$scope.TitleText = "自治单元配置";
					$scope.fetchData = fetchData;
					$scope.Gangelist = [];
					getAreas($scope, x.Id);

					//删除区域范围
					$scope.deleteCell = function(cell) {
						deleteCell($scope, cell.Id, x.Id);
					};

					//增加区域范围
					$scope.createCell = function() {
						var fetchData = $scope.fetchData;
						var _$scope = $scope;
						ngDialog.openConfirm({
							template: 'addCell',
							controller: ["$scope", function($scope) {
								$scope.TitleText = "新增单元";
								$scope.fetchData = fetchData;
								$scope.showCheckSelect = false;
								$scope.checkedUnitList = [];
								$scope.gridAction = {
									PersonnelId: 0,
									CourtyardId: 0,
									BuildId: 0,
									UnitIds: 0,
									UnitId: []
								};

								$scope.unitField = {
									editable: false,
									opts1: [{
										Id: 0,
										Name: "请选择"
									}],
									opts2: [{
										Id: 0,
										Name: "请选择"
									}],
									opts3: [{
										Id: 0,
										Name: "请选择"
									}],
									value1: 0,
									value2: 0,
									value3: 0,
									required: true
								};

								$scope.showCheckSelectAction = function() {
									$scope.showCheckSelect = !$scope.showCheckSelect;
									
									if($scope.showCheckSelect) {
										if(($scope.unitField.opts1.length === 1 && $scope.unitField.opts1[0].Id === 0) || $scope.unitField.opts1.length === 0) {
											getCourtyardAll($scope);
										}
									}
								};

								//选择院落操作
								$scope.choseCourtyard = function(CourtyardId) {
									getBuildList($scope, CourtyardId);
								};
								//选择楼栋操作
								$scope.choseBuilds = function(BuildId) {
									getUnitList($scope, BuildId);
								};

								//选择单元操作
								$scope.choseUnits = function(BuildId, UnitId) {
									if(UnitId !== 0) {
										choseUnits($scope, BuildId, UnitId);
									}

								};

								//关闭院落、楼栋、单元选择层
								$scope.closeUnit = function() {
									$scope.showCheckSelect = false;
								};

								//关闭NgDialog
								$scope.closeDialog = function() {
									$scope.closeThisDialog();
								};

								//提交新增
								$scope.submitAddcell = function() {
									var ids = "";
									if($scope.gridAction.UnitId && $scope.gridAction.UnitId.length > 0) {
										$scope.gridAction.UnitId.forEach(function(item, index) {
											ids += item.Id + ",";
										});
									}
									ids = ids.substring(0, ids.length - 1);
									if(!ids) {
										layerAlert.autoclose("您未选择任何单元！");
										return;
									}
									var param = {
										GridId: x.Id,
										UnitId: ids
									};
									submitAddcell($scope, serverUrls.inGridrange, param, x.Id, _$scope);
								};
							}],
							className: 'ngdialog-theme-default',
							//closeByEscape: true,
							closeByDocument: false,
							width: 850
						});
					};

					//增加户
					$scope.createRoom = function() {
						var fetchData = $scope.fetchData;
						var _$scope = $scope;
						ngDialog.openConfirm({
							template: 'addCell',
							controller: ["$scope", function($scope) {
								$scope.TitleText = "新增户";
								$scope.fetchData = fetchData;
								$scope.showCheckSelect = false;
								$scope.checkedUnitList = [];
								$scope.checkedRoomList = [];
								$scope.gridAction = {
									PersonnelId: 0,
									CourtyardId: 0,
									BuildId: 0,
									UnitIds: 0,
									UnitId: [],
									RoomIds: 0,
									RoomId: []
								};

								$scope.unitField = {
									editable: false,
									opts1: [{
										Id: 0,
										Name: "请选择"
									}],
									opts2: [{
										Id: 0,
										Name: "请选择"
									}],
									opts3: [{
										Id: 0,
										Name: "请选择"
									}],
									opts4: [{
										Id: 0,
										Name: "请选择"
									}],
									value1: 0,
									value2: 0,
									value3: 0,
									value4: 0,
									required: true
								};

								$scope.showCheckSelectAction = function() {
									$scope.showCheckSelect = !$scope.showCheckSelect;
									if($scope.showCheckSelect) {
										if(($scope.unitField.opts1.length === 1 && $scope.unitField.opts1[0].Id === 0) || $scope.unitField.opts1.length === 0) {
											getCourtyardAll($scope);
										}
									}
								};

								//选择院落操作
								$scope.choseCourtyard = function(CourtyardId) {
									getBuildList($scope, CourtyardId);
								};
								//选择楼栋操作
								$scope.choseBuilds = function(BuildId) {
									getUnitList($scope, BuildId);
								};

								//选择单元操作
								$scope.choseUnits = function(BuildId, UnitId) {
									_choseUnits($scope, UnitId);
								};
								//选择户操作
								$scope.choseRooms = function(RoomId) {
									choseRooms($scope, RoomId);
								};

								//关闭院落、楼栋、单元选择层
								$scope.closeUnit = function() {
									$scope.showCheckSelect = false;
								};

								//关闭NgDialog
								$scope.closeDialog = function() {
									$scope.closeThisDialog();
								};

								//提交新增
								$scope.submitAddcell = function() {
									var ids = "";
									if($scope.gridAction.RoomId && $scope.gridAction.RoomId.length > 0) {
										$scope.gridAction.RoomId.forEach(function(item, index) {
											ids += item.Id + ",";
										});
									}
									ids = ids.substring(0, ids.length - 1);
									if(!ids) {
										layerAlert.autoclose("您未选择任何户！");
										return;
									}
									var param = {
										GridId: x.Id,
										LocationId: ids
									};
									submitAddcell($scope, serverUrls.addGridrange, param, x.Id, _$scope);
								};
							}],
							className: 'ngdialog-theme-default',
							//closeByEscape: true,
							closeByDocument: false,
							width: 850
						});
					};

				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
		};
		var getRolesList = function(deffered) {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.autoNomyrolelist
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.Roles = response.Content;
					deffered.resolve("success");
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//新增网格管理（区域管理）
		$scope.creatOne = function() {
			var deffered = $q.defer();
			var promises = deffered.promise;
			if($scope.Roles.length === 0) {
				getRolesList(deffered);
			} else {
				deffered.resolve("success");
			}
			promises.then(function(value) {
				var Roles = $scope.Roles;
				var Personnels = $scope.Personnels;
				var fetchData = $scope.fetchData;
				ngDialog.openConfirm({
					template: 'createOne',
					controller: ["$scope", function($scope) {
						$scope.create = true;
						$scope.TitleText = "新增自治单元";
						$scope.fetchData = fetchData;
						$scope.Roles = Roles;
						$scope.gridAction = {
							PersonnelId: 0,
							CourtyardId: 0,
							BuildId: 0,
							UnitIds: 0,
							UnitId: [],
							GridType: 1,
							Code: $scope.Roles[0].Code
						};
						$scope.typeList = [{
							Id: 1,
							Name: "自治"
						}, {
							Id: 2,
							Name: "网格"
						}];

						$scope.checkedUnitList = [];
						$scope.unitField = {
							editable: false,
							opts1: [{
								Id: 0,
								Name: "请选择"
							}],
							opts2: [{
								Id: 0,
								Name: "请选择"
							}],
							opts3: [{
								Id: 0,
								Name: "请选择"
							}],
							value1: 0,
							value2: 0,
							value3: 0,
							required: true
						};
						$scope.showCheckSelect = false;

						//选择单元弹出操作
						$scope.showCheckSelectAction = function() {
							$scope.showCheckSelect = !$scope.showCheckSelect;
							if($scope.showCheckSelect) {
								if(($scope.unitField.opts1.length === 1 && $scope.unitField.opts1[0].Id === 0) || $scope.unitField.opts1.length === 0) {
									getCourtyardAll($scope);
								}
							}
						};

						//选择院落操作
						$scope.choseCourtyard = function(CourtyardId) {
							getBuildList($scope, CourtyardId);
						};
						//选择楼栋操作
						$scope.choseBuilds = function(BuildId) {
							getUnitList($scope, BuildId);
						};

						//选择单元操作
						$scope.choseUnits = function(BuildId, UnitId) {
							if(UnitId !== 0) {
								choseUnits($scope, BuildId, UnitId);
							}

						};

						//关闭院落、楼栋、单元选择层
						$scope.closeUnit = function() {
							$scope.showCheckSelect = false;
						};

						$scope.Personnels = Personnels;
						if($scope.Personnels.length === 0 || $scope.Personnels.length === 1 && $scope.Personnels[0].Id === 0) {
							getPersonnels($scope);
						}

						//提交新增
						$scope.formSubmit = function() {
							formSubmit($scope, true, serverUrls.inGrid, $scope.gridAction, $rootScope.pHeader);
							//formSubmit(true, $scope.fieldsList);
						};

						$scope.closeDialog = function() {
							ngDialog.closeAll();
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 850
				});
			}, function(value) {
				console.log(value);
			}, function(value) {
				console.log(value);
			});

		};

		var bindFormList = function(x, $scope) {
			$scope.gridAction.Id = x.Id;
			$scope.gridAction.Name = x.Name;
			$scope.gridAction.GridType = x.GridType;
			$scope.gridAction.Code = x.AutonomyRoleCode;
		};

		//编辑区域管理
		$scope.editItem = function(x) {
			var deffered = $q.defer();
			var promises = deffered.promise;
			if($scope.Roles.length === 0) {
				getRolesList(deffered);
			} else {
				deffered.resolve("success");
			}
			promises.then(function(value) {
				var Roles = $scope.Roles;
				var Personnels = $scope.Personnels;
				var fetchData = $scope.fetchData;
				ngDialog.openConfirm({
					template: 'createOne',
					controller: ['$scope', function($scope) {
						$scope.create = false;
						$scope.TitleText = "修改基本信息";
						$scope.fetchData = fetchData;
						$scope.Roles = Roles;
						$scope.gridAction = {
							PersonnelId: 0,
							CourtyardId: 0,
							BuildId: 0,
							UnitIds: 0,
							GridType: 1,
							Code: $scope.Roles[0].Code
						};
						$scope.typeList = [{
							Id: 1,
							Name: "自治"
						}, {
							Id: 2,
							Name: "网格"
						}];
						bindFormList(x, $scope);

						$scope.checkedUnitList = [];
						$scope.unitField = {
							editable: false,
							opts1: [{
								Id: 0,
								Name: "请选择"
							}],
							opts2: [{
								Id: 0,
								Name: "请选择"
							}],
							opts3: [{
								Id: 0,
								Name: "请选择"
							}],
							value1: 0,
							value2: 0,
							value3: 0,
							required: true
						};
						$scope.showCheckSelect = false;

						//选择单元弹出操作
						$scope.showCheckSelectAction = function() {
							$scope.showCheckSelect = !$scope.showCheckSelect;
							if($scope.showCheckSelect) {
								if(($scope.unitField.opts1.length === 1 && $scope.unitField.opts1[0].Id === 0) || $scope.unitField.opts1.length === 0) {
									getCourtyardAll($scope);
								}
							}
						};

						//选择院落操作
						$scope.choseCourtyard = function(CourtyardId) {
							getBuildList($scope, CourtyardId);
						};
						//选择楼栋操作
						$scope.choseBuilds = function(BuildId) {
							getUnitList($scope, BuildId);
						};

						//选择单元操作
						$scope.choseUnits = function(BuildId, UnitId) {
							if(UnitId !== 0) {
								choseUnits($scope, BuildId, UnitId);
							}

						};

						//
						$scope.choseUnit = function() {
							$scope.showCheckSelect = false;
						};

						$scope.Personnels = Personnels;
						if($scope.Personnels.length === 0 || $scope.Personnels.length === 1 && $scope.Personnels[0].Id === 0) {
							getPersonnels($scope);
						}

						//提交修改
						$scope.formSubmit = function() {
							formSubmit($scope, false, serverUrls.upGrid, $scope.gridAction, $rootScope.pHeader, x);
							//formSubmit(true, $scope.fieldsList);
						};

						$scope.closeDialog = function() {
							ngDialog.closeAll();
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 850
				});
			}, function(value) {
				console.log(value);
			}, function(value) {
				console.log(value);
			});

		};

		//启用、停用
		$scope.toggleText = function(x) {
			var text;
			switch(x.OpenState) {
				case 2:
					text = "启用";
					break;
				case 1:
					text = "停用";
					break;
				default:
					text = "无";
					break;
			}
			return text;
		};

		//启用、停用className
		$scope.toggleClass = function(x) {
			var _class = {
				'btn-success': x.OpenState === 2,
				'btn-danger': x.OpenState === 1
			};
			return _class;
		};

		//事项模板启用/停用
		$scope.toggleItem = function(x) {
			PcService.toggleItem($scope, x, serverUrls.personnelState);
		};

		//获取区域管理数据列表
		$scope.fetchData = function() {
			//gridList
			PcService.fetchData($scope, serverUrls.gridList, $scope.searchOption);
		};

		$scope.fetchData();

		$scope.numberTOText = function(id, _array) {
			var _text;
			_array.forEach(function(item, index) {
				if(item.Id === id) {
					_text = item.Name;
				}
			});
			return _text;
		};

		$scope.UnitList = [{
			Id: 0,
			Name: "请选择"
		}, {
			Id: 1,
			Name: "请选择"
		}, {
			Id: 2,
			Name: "请选择"
		}, {
			Id: 3,
			Name: "请选择"
		}];

		$scope.Personnels = [{
			Id: 0,
			Name: "请选择"
		}];

		//新增人员管理表单菜单列表
		$scope.fieldsList = [{
			name: "Name",
			nameDisplay: "区域名称",
			editor: "normal",
			required: true,
			value: "",
			originValue: ""
		}, {
			name: "PersonnelId",
			nameDisplay: "区域管理员",
			editor: "select",
			required: true,
			value: "",
			opts: $scope.Personnels,
			originValue: 0
		}, {
			name: "UnitId",
			nameDisplay: "单元",
			editor: "multi-select",
			required: true,
			value: '',
			originValue: 0,
			opts: $scope.UnitList
		}];
	}
]);