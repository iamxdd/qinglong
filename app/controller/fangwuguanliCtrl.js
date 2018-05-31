App.controller("fangwuguanliCtrl", ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q) {
		$scope.lists = [
			[],
			[],
			[],
			[]
		];

		$scope.Homeowners = [{
			Id: 0,
			Name: "请选择"
		}];
		$scope.Holders = [{
			Id: 0,
			Name: "请选择"
		}];
		$scope.addNew = {
			HomeownerId: 0,
			HolderId: 0
		};
		$scope.homeOwer = "";
		$scope.homeOwer = "";

		var menuItems = localStorage.getItem("menuItems");

		var myRoleInfo = JSON.parse(localStorage.getItem("myRoleInfo"));
		if(myRoleInfo.RoleName === "superManager" || myRoleInfo.RoleCode === "administrators") {
			$scope.ifNew = true;
		}
		$scope.list = [];
		$scope.residentList = [];
		$scope.TitleText = "新增";
		$scope.create = true;
		$scope.selectedItem = {};
		$scope.searchLists = {
			list1: [{
				Id: 0,
				Nmae: "请选择"
			}],
			list2: [{
				Id: 0,
				Nmae: "请选择"
			}],
			list3: [{
				Id: 0,
				Nmae: "请选择"
			}],
			list4: [{
				Id: 0,
				Nmae: "请选择"
			}]
		};
		$scope.searchOption = {
			name: "",
			courtyardid: 0,
			buildingid: 0,
			unitid: 0
		};
		$scope.showOption = [true, false, false, false];

		//初始化新增表单默认值
		var initCreateForms = function(fieldsList) {
			fieldsList.forEach(function(item, index) {
				if(item.editor === "complex") {
					item.values = ["", "", ""];
				} else {
					item.value = item.originValue;
				}
			});
		};

		//更新列表绑定项目
		var updateBindOpions = function(fieldsList) {
			fieldsList.forEach(function(item, index) {
				if(item.name === "courtyardId") {
					item.opts = $scope.searchLists.list1;
					item.originValue = $scope.searchOption.courtyardid;
				} else if(item.name === "buildingId") {
					item.opts = $scope.searchLists.list2;
					item.originValue = $scope.searchOption.buildingid;
				} else if(item.name === "unitId") {
					item.opts = $scope.searchLists.list3;
					item.originValue = $scope.searchOption.unitid;
				} else if(item.name === "floorId") {
					item.opts = $scope.searchLists.list4;
					item.originValue = $scope.searchLists.list4[0].Id;
				}
			});
			initCreateForms($scope.fieldsList);
		};

		//绑定下拉列表数据
		var bindSelectOption = function(navList, selectList) {
			navList.forEach(function(item, index) {
				var navListItemOptions = item.options;
				navListItemOptions.forEach(function(_item, _index) {
					if(_item.Type === "select") {
						_item.opts = selectList[_index];
						if(selectList[_index][0] && !_item.value) {
							_item.value = selectList[_index][0].Id;
						}
					}
				});
			});
		};

		//院落，楼栋，单元下拉列表
		//获取院落(getSelectList1)，楼栋(getSelectList2)，单元(getSelectList3)下拉列表

		var getSelectList4 = function(id) {
			$http({
				method: 'get',
				url: serverUrls.buildingAll + "?id=" + id + "&type=3"
			}).success(function(response) {
				var addList = response.Content;
				$scope.searchLists.list4 = addList;
				updateBindOpions($scope.fieldsList);
				if(addList.length > 0) {} else {
					layerAlert.autoclose("楼层列表为空！");
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var getSelectList3 = function(id, isFetchData, isLastFetch) {

			$http({
				method: 'get',
				url: serverUrls.buildingAll + "?id=" + id + "&type=2"
			}).success(function(response) {
				var addList = response.Content;
				$scope.searchLists.list3 = addList;
				if(addList.length > 0) {
					$scope.searchOption.unitid = addList[0].Id;
					if(isFetchData || isLastFetch) {
						$scope.fetchData($scope.checkedItem.Id);
					}
				} else {
					$scope.searchLists.list4 = [];
					layerAlert.autoclose("房屋列表为空！");
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var getSelectList2 = function(id, isFetchData, isLastFetch) {

			$http({
				method: 'get',
				url: serverUrls.buildingAll + "?id=" + id + "&type=1"
			}).success(function(response) {
				var addList = response.Content;
				$scope.searchLists.list2 = addList;
				if(addList.length > 0) {
					$scope.searchOption.buildingid = addList[0].Id;
					var _id = addList[0].Id;
					if(isFetchData) {
						$scope.fetchData($scope.checkedItem.Id);
						return;
					}
					getSelectList3(_id, false, isLastFetch);
				} else {
					$scope.searchLists.list3 = $scope.searchLists.list4 = [];
					//layerAlert.autoclose("单元列表为空！");
					if($scope.checkedItem.Id >= 3) {
						$scope.list = [];
					}
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var getSelectList1 = function(isFetchData) {

			$http({
				method: 'get',
				url: serverUrls.courtyardAll + "?openstate=1"
			}).success(function(response) {
				var addList = response.Content;
				$scope.searchLists.list1 = addList;
				if(addList.length > 0) {
					$scope.searchOption.courtyardid = $scope.searchOption.courtyardid ? $scope.searchOption.courtyardid : addList[0].Id;
					var _id = addList[0].Id;
					if(isFetchData) {
						$scope.fetchData($scope.checkedItem.Id);
						return;
					}
					getSelectList2(_id);
				} else {
					layerAlert.autoclose("院落列表为空！");
					if($scope.checkedItem.Id >= 2) {
						$scope.list = [];
					}
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//新增院落，楼栋。单元菜单列表
		$scope.newOneFormList = [
			[{
				name: "Name",
				nameDisplay: "院落名称",
				editor: "normal",
				required: true,
				value: "",
				originValue: ""
			}, {
				name: "Address",
				nameDisplay: "院落街道地址",
				editor: "normal",
				required: true,
				value: "",
				originValue: ""
			}, {
				name: "TotalBuilding",
				nameDisplay: "总栋数",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}, {
				name: "households",
				nameDisplay: "总户数",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}, {
				name: "PropertyFee",
				nameDisplay: "物业费",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}, {
				name: "PropertyCompany",
				nameDisplay: "物业公司",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}, {
				name: "PropertyAddress",
				nameDisplay: "物管办公地点",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}, {
				name: "PropertyPhone",
				nameDisplay: "物管电话",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}, {
				name: "Longitude",
				nameDisplay: "经度",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}, {
				name: "Latitude",
				nameDisplay: "纬度",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}, {
				name: "Remark",
				nameDisplay: "备注",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}],
			[{
				name: "courtyardId",
				nameDisplay: "院落",
				editor: "select",
				required: true,
				value: "",
				originValue: "",
				editable: true
			}, {
				name: "building",
				nameDisplay: "栋座名称",
				editor: "normal",
				required: true,
				value: "",
				originValue: ""
			}, {
				editor: "normal",
				name: "unitNum",
				nameDisplay: "单元数",
				required: true,
				value: "",
				originValue: ""
			}, {
				name: "date",
				nameDisplay: "层户数",
				editor: "complex",
				required: true,
				values: ["", "", ""],
				originValues: ["", "", ""]
			}, {
				name: "type",
				nameDisplay: "房号规则",
				editor: "select",
				required: true,
				value: "",
				opts: [{
					Id: 1,
					Name: "平层递增"
				}, {
					Id: 2,
					Name: "整栋递增"
				}],
				originValue: 1
			}],
			[{
				name: "courtyardId",
				nameDisplay: "院落",
				editor: "select",
				required: true,
				value: "",
				originValue: "",
				editable: true
			}, {
				name: "buildingId",
				nameDisplay: "栋座",
				editor: "select",
				required: true,
				value: "",
				originValue: "",
				editable: true
			}, {
				editor: "normal",
				name: "name",
				nameDisplay: "单元",
				required: true,
				value: "",
				originValue: ""
			}, {
				name: "date",
				nameDisplay: "层数",
				editor: "_complex",
				required: true,
				values: ["", ""],
				originValues: ["", ""]
			}],
			[{
				name: "courtyardId",
				nameDisplay: "院落",
				editor: "select",
				required: true,
				value: "",
				originValue: "",
				editable: true
			}, {
				name: "buildingId",
				nameDisplay: "栋座",
				editor: "select",
				required: true,
				value: "",
				originValue: "",
				editable: true
			}, {
				name: "unitId",
				nameDisplay: "单元",
				editor: "select",
				required: true,
				value: "",
				originValue: "",
				editable: true
			}, {
				editor: "select",
				name: "floorId",
				nameDisplay: "楼层",
				required: true,
				value: "",
				originValue: ""
			}, {
				editor: "normal",
				name: "name",
				nameDisplay: "房号",
				required: true,
				value: "",
				originValue: ""
			}]
		];

		//默认新建院落
		$scope.fieldsList = $scope.newOneFormList[0];

		$scope.checkChange = function(id, index) {
			if($scope.checkedItem.Id === index) {
				$scope.fetchData($scope.checkedItem.Id);
				return false;
			} else {
				var isFetch;
				if($scope.checkedItem.Id > index) {
					//return;
					isFetch = true;
				} else {
					isFetch = false;
				}
				switch(index) {
					case 1:
						getSelectList1(id, false, isFetch);
						break;
					case 2:
						getSelectList2(id, false, isFetch);
						break;
					case 3:
						getSelectList3(id, false, isFetch);
						break;
				}
			}
		};

		//选项卡title列表
		$scope.navTabList = [{
			Id: 1,
			Name: "院落列表",
			Active: true,
			talbeTitle: ["序号", "院落名称", "院落街道地址", "总栋数", "总户数", "物管电话", "备注", "操作"]
		}, {
			Id: 2,
			Name: "楼栋列表",
			Active: false,
			talbeTitle: ["序号", "院落名称", "楼座", "楼座单元数", "总层数", "平层户数", "总户数"]
		}, {
			Id: 3,
			Name: "单元列表",
			Active: false,
			talbeTitle: ["序号", "院落名称", "楼栋", "单元"]
		}, {
			Id: 4,
			Name: "房屋列表",
			Active: false,
			talbeTitle: ["序号", "院落名称", "栋座", "单元", "房号", "操作"]
		}];
		$scope.checkedItem = $scope.navTabList[0];

		//选项卡选择操作
		$scope.checked = function(x) {
			console.log($scope.searchLists);
			$scope.checkedItem = x;
			$scope.fieldsList = $scope.newOneFormList[x.Id - 1];
			if(x.Id === 1) {
				$scope.fetchData(x.Id);
			}
			/*else if($scope.lists[x.Id - 2].length > 0) {
						$scope.list = $scope.lists[x.Id - 1];

					} else {
						$scope.list = $scope.lists[x.Id - 1] = [];
					}*/
			switch(x.Id) {
				case 1:
					$scope.showOption = [true, false, false, false];
					break;
				case 2:
					$scope.showOption = [false, true, false, false];
					if($scope.showOption[x.Id - 1]) {
						getSelectList1(true);
					}
					break;
				case 3:
					$scope.showOption = [false, true, true, false];
					if($scope.showOption[x.Id - 1]) {
						getSelectList2($scope.searchOption.courtyardid, true);
					}
					break;
				case 4:
					$scope.showOption = [false, true, true, true];
					if($scope.showOption[x.Id - 1] && $scope.searchLists.list2.length > 0) {
						getSelectList3($scope.searchOption.buildingid, true);
					}
					break;
			}
			$scope.navTabList.forEach(function(item, index) {
				if(item.Name === x.Name) {
					item.Active = true;
				} else {
					item.Active = false;
				}
			});
		};

		var getSearchOption = function(_array) {
			var data = {};
			_array.forEach(function(item, index) {
				if(item.Type === "select") {
					data[item.Model] = item.opts[0] ? item.opts[0].Id : 1;
				} else {
					data[item.Model] = item.Value;
				}
			});
			return data;
		};

		//点击查询数据
		$scope.fetchData = function(index) {
			var list0 = $scope.searchLists.list1;
			if((list0.length === 1 && list0[0].Id === 0) || list0.length === 0) {
				getSelectList1();
			}
			var apiUrl = "",
				params = {};
			switch(index) {
				case 1:
					apiUrl = serverUrls.courtyardList;
					/*params.openstate = 1;*/
					break;
				case 2:
					apiUrl = serverUrls.buildingList;
					break;
				case 3:
					apiUrl = serverUrls.unitList;
					break;
				case 4:
					apiUrl = serverUrls.houseList;
					break;
				default:
					break;
			}
			params = $.extend(true, params, $scope.searchOption);
			//var params = getSearchOption($scope.checkedItem.options);
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: apiUrl,
				params: params,
				success: function(response) {
					$scope.lists[index - 1] = response;
					$scope.list = $scope.lists[index - 1];
					if($scope.lists[1].length === 0) {
						$scope.lists[2] = [];
						$scope.lists[3] = [];
					}
				},
				error: function(error) {
					$scope.list = [];
					layerAlert.autoclose("当前状态下暂无数据！");
				}
			});
		};

		$scope.fetchData(1);

		//新增管理
		$scope.creatOne = function() {
			$scope.editing = false;
			var data = {};
			var w = 450;
			var column = 1;
			switch($scope.checkedItem.Id) {
				case 1:
					w = 850;
					column = 2;
					updateBindOpions($scope.fieldsList);
					break;
				case 2:
					updateBindOpions($scope.fieldsList);
					break;
				case 3:
					updateBindOpions($scope.fieldsList);
					break;
				case 4:
					getSelectList4($scope.searchOption.unitid);
					break;
				default:
					break;
			}

			ngDialog.openConfirm({
				template: 'createOne',
				scope: $scope,
				controller: ['$scope', function($scope) {
					$scope.fieldsList = $scope.newOneFormList[$scope.checkedItem.Id - 1];
					$scope.column = column;
					$scope.TitleText = "新增";
					$scope.create = true;

				}],
				className: 'ngdialog-theme-default',
				closeByEscape: true,
				closeByDocument: false,
				width: w

			});
		};

		//获取表单提交数据
		$scope.getSubmitData = function(create, fieldsList) {
			var data = {};

			if(!create) {
				data.Id = $scope.selectedItem.Id;
			}
			fieldsList.forEach(function(item, index) {
				if(item.editor === 'complex') {
					var value = item.values[0] + "_" + item.values[1] + "_" + item.values[2];
					data[item.name] = value;
				} else if(item.editor === '_complex') {
					var _value = item.values[0] + "_" + item.values[1];
					data[item.name] = _value;
				} else {
					data[item.name] = item.value;
				}
			});
			return data;
		};

		//新增表单提交数据
		$scope.formSubmit = function(create, index) {
			var data = $scope.getSubmitData(create, $scope.fieldsList);
			var method = "",
				url = "",
				doAction = "";
			if(create) {
				doAction = "新增";
				method = "post";
				switch(index) {
					case 1:
						url = serverUrls.inCourtyard;
						break;
					case 2:
						url = serverUrls.inItialization;
						break;
					case 3:
						url = serverUrls.inUnit;
						break;
					case 4:
						url = serverUrls.inHouse;
						break;
					default:
						layerAlert.autoclose("找不到提交url");
						return;
						//break;
				}

			} else {
				method = "put";
				doAction = "编辑";
				switch(index) {
					case 1:
						url = serverUrls.upcourtyard;
						break;
					case 2:
						url = serverUrls.upcourtyard;
						break;
					case 3:
						url = serverUrls.upcourtyard;
						break;
					case 4:
						url = serverUrls.upHouse;
						data = $.extend(true, $scope.selectedItem, $scope.addNew);
						break;
					default:
						layerAlert.autoclose("找不到提交url");
						return;
				}
			}

			$scope.ngDialogPromise = $http({
				method: method,
				url: url,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose(doAction + "操作成功！");
					$scope.fetchData($scope.checkedItem.Id);
					setTimeout(function() {
						ngDialog.closeAll();
					}, 1600);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//编辑时数据绑定
		$scope.bindData = function(_array, x) {
			if(_array && _array.length > 0) {
				_array.forEach(function(item, index) {
					/*for(var a in x) {
						if(item.name === a) {
							item.value = x[a];
						}
					}*/
					/*if(item.editor == "complex") {
						var values = item.value.split("_");
						item.value1 = values[0];
						item.value2 = values[1];
						item.value3 = values[2];
					} else*/
					if(x[item.name] !== undefined) {
						item.value = x[item.name];
					}

				});
			}
		};

		//编辑
		$scope.editItem = function(x) {
			$scope.bindData($scope.fieldsList, x);
			$scope.selectedItem = x;
			$scope.editing = true;
			var data = {};
			var w = 600;
			var column = 1;
			var _index = $scope.checkedItem.Id;
			switch($scope.checkedItem.Id) {
				case 1:
					w = 850;
					column = 2;
					break;
				case 2:
					break;
				case 3:
					break;
				case 4:
					$scope.addNew.HomeownerId = x.HomeownerId;
					$scope.addNew.HolderId = x.HolderId;
					break;
				default:
					break;
			}
			var fieldsList = $scope.newOneFormList[$scope.checkedItem.Id - 1];
			ngDialog.openConfirm({
				template: 'createOne',
				scope: $scope,
				controller: ['$scope', function($scope) {
					if(_index == 4) {
						$scope.Homeowners = [];
						$scope.Holders = [];
						/*$scope.Homeowners = [{
							Id: $scope.addNew.HomeownerId,
							Name: x.HomeownerName
						}];
						$scope.Holders = [{
							Id: $scope.addNew.HolderId,
							Name: x.HolderName
						}];*/
						//模糊查询居民
						$scope.getHomeowner = function(value) {
							if(!value) return;
							$scope.ngDialogPromise = $http({
								method: 'get',
								url: serverUrls.searchList + "?value=" + value
							}).success(function(response) {
								var Code = response.State.Code;
								var Message = response.State.Message;
								if(Code === 0) {
									if(response.Content.length !== 0) {
										$scope.Homeowners = response.Content;
										$scope.addNew.HomeownerId = $scope.Homeowners[0].Id;
									} else {
										layerAlert.autoclose("无匹配的结果！");
									}

								} else {
									layerAlert.autoclose(Message);
								}

							}).error(function(error) {
								layerAlert.autoclose(PcService.errorResult(error));
							});
						};

						$scope.editFormSubmit = function() {
							var param = $.extend(true, $scope.addNew, x);
							PcService.formSubmit($scope, false, [], serverUrls.upHouse, x, param, $rootScope.pHeader);
						};
						//模糊查询居民
						$scope.getHolders = function(value) {
							if(!value) return;
							$scope.ngDialogPromise = $http({
								method: 'get',
								url: serverUrls.searchList + "?value=" + value
							}).success(function(response) {
								var Code = response.State.Code;
								var Message = response.State.Message;
								if(Code === 0) {
									if(response.Content.length !== 0) {
										$scope.Holders = response.Content;
										$scope.addNew.HolderId = $scope.Holders[0].Id;
									} else {
										layerAlert.autoclose("无匹配的结果！");
									}

								} else {
									layerAlert.autoclose(Message);
								}

							}).error(function(error) {
								layerAlert.autoclose(PcService.errorResult(error));
							});
						};

					}

					$scope.fieldsList = fieldsList;
					$scope.column = column;
					$scope.TitleText = "修改";
					$scope.create = false;
				}],
				className: 'ngdialog-theme-default',
				closeByEscape: true,
				closeByDocument: false,
				width: w

			});
		};

		//获取房屋下的居民列表
		$scope.residentItem = function(x) {
			var defferd = $q.defer();
			var promises = defferd.promise;
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.houseResident + "?id=" + x.Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.residentList = response.Content;
					defferd.resolve();
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
			promises.then(function() {
				ngDialog.openConfirm({
					template: 'listOne',
					scope: $scope,
					controller: ['$scope', function($scope) {
						$scope.type = "resident";
						$scope.TitleText = "查看居民";
						$scope.residentList = $scope.$parent.$parent.residentList;
						$scope.PcService = PcService;
						//户主关系列表
						$scope.matterList = [{
							Id: 1,
							Name: "户主"
						}, {
							Id: 2,
							Name: "配偶"
						}, {
							Id: 3,
							Name: "子女"
						}, {
							Id: 4,
							Name: "父母"
						}, {
							Id: 5,
							Name: "岳父母/公婆"
						}, {
							Id: 6,
							Name: "祖父母"
						}, {
							Id: 7,
							Name: "媳婿"
						}, {
							Id: 8,
							Name: "孙子女"
						}, {
							Id: 9,
							Name: "兄弟姐妹"
						}, {
							Id: 10,
							Name: "其他"
						}];

						$scope.Sexs = [{
							Id: 1,
							Name: "男"
						}, {
							Id: 2,
							Name: "女"
						}];
					}],
					className: 'ngdialog-theme-default',
					closeByEscape: true,
					closeByDocument: false,
					width: 600

				});
			});
		};

		//获取房屋下的车辆信息
		$scope.vehicleItem = function(x) {
			var defferd = $q.defer();
			var promises = defferd.promise;
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.vehiclelist,
				params: {
					houseId: x.Id
				},
				success: function(response) {
					$scope.vehicleList = response;
					defferd.resolve();
				},
				error: function(error) {
					layerAlert.autoclose(errorResult(error));
				}
			});
			promises.then(function() {
				ngDialog.openConfirm({
					template: 'listOne',
					scope: $scope,
					controller: ['$scope', function($scope) {
						$scope.type = "vehicle";
						$scope.TitleText = "查看车辆";
						$scope.vehicleList = $scope.$parent.$parent.vehicleList;
					}],
					className: 'ngdialog-theme-default',
					closeByEscape: true,
					closeByDocument: false,
					width: 600

				});
			});
		};

		//删除操作
		var deleteItem = function(index, id) {
			var url, data = {
				id: id
			};
			switch(index) {
				case 2:
					url = serverUrls.deBuilding;
					break;
				case 3:
					url = serverUrls.deUnit;
					break;
				case 4:
					url = serverUrls.deHouse;
					break;
				default:
					break;
			}
			$scope.listBusyPromise = $http({
				method: "delete",
				url: url + "?id=" + id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("删除成功！");
					$scope.fetchData($scope.checkedItem.Id);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//删除
		$scope.deleteItem = function(index, x) {
			layerAlert.checkone("执行删除操作", function() {
				deleteItem(index, x.Id);
			}, function() {}, "确定", "取消", true, true);
		};

		//启用停用
		$scope.toggleItem = function(x) {
			var state = 0;
			var stateText = "";
			switch(x.OpenState) {
				case 1:
					state = 2;
					stateText = "停用";
					break;
				case 2:
					state = 1;
					stateText = "启用";
					break;
				default:
					break;
			}

			if(state !== 2 && state !== 1) {
				return;
			}
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.whetherState + "?id=" + x.Id + "&state=" + state
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose(stateText + "操作成功!");
					$scope.fetchData($scope.checkedItem.Id);
				} else {
					layerAlert.autoclose(Message);
				}

			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});

		};

		//启用停用Class
		$scope.isToggle = function(x) {
			return {
				'btn-success': x.OpenState === 2,
				'btn-danger': x.OpenState === 1
			};
		};

		//启用停用Text
		$scope.toggleText = function(x) {
			var tText;
			switch(x.OpenState) {
				case 2:
					tText = "启用";
					break;
				case 1:
					tText = "停用";
					break;
				default:
					tText = "无";
					break;
			}
			return tText;
		};

	}
]);