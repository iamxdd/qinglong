App.controller("cheliangguanliCtrl", ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {
		$scope.list = [];
		$scope.TitleText = "新增";
		$scope.searchOption = {
			plateNumber: "",
			openstate: 0
		};
		$scope.PcService = PcService;
		$scope.VehicleBrands = [];
		$scope.VehicleModels = [{
			Id: "两厢轿车",
			Name: "两厢轿车"
		}, {
			Id: "三厢轿车",
			Name: "三厢轿车"
		}, {
			Id: "跑车",
			Name: "跑车"
		}, {
			Id: "SUV",
			Name: "SUV"
		}, {
			Id: "MPV",
			Name: "MPV"
		}, {
			Id: "面包车",
			Name: "面包车"
		}, {
			Id: "皮卡车",
			Name: "皮卡车"
		}];

		$scope.PcService = PcService;
		//院落：CourtyardList 楼栋：BuildingList 单元：UnitList 楼层：FloorList 房屋：HouseList
		$scope.CourtyardList = $scope.BuildingList = $scope.UnitList = $scope.FloorList = $scope.HouseList = [{
			Id: 0,
			Name: "请选择"
		}];

		//提交表单时获取data
		var getFormData = function(fieldsLsit) {
			var data = {};
			fieldsLsit.forEach(function(item, index) {
				if(item.editor === "four-select") {
					data[item.name] = item.value4;
				} else {
					data[item.name] = item.value;
				}

			});
			return data;
		};

		//新增，编辑提交
		var formSubmit = function(create, fieldsLsit, id) {
			var data = getFormData(fieldsLsit);
			var PlateNumber = data.PlateNumber;
			if(!PcService.isPlateNumber(PlateNumber) && PlateNumber) {
				layerAlert.autoclose("车牌号输入不正确！");
				return;
			}
			var title, url, method;
			if(create) {
				title = "新增";
				method = "post";
				url = serverUrls.addVehicle;
			} else {
				title = "修改";
				method = "put";
				url = serverUrls.upVehicle;
				data.Id = id;
			}

			$scope.ngDialogPromise = $http({
				method: method,
				url: url,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose(title + "操作成功！");
					$scope.fetchData();
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

		var bindFieldsListData = function(fieldsList) {
			fieldsList.forEach(function(item, index) {
				if(item.editor === "four-select") {
					//楼栋：BuildingList 单元：UnitList 楼层：FloorList 房屋：HouseList
					item.value1 = $scope.CourtyardList[0].Id;
					item.value2 = $scope.BuildingList[0].Id;
					item.value3 = $scope.UnitList[0].Id;
					item.value4 = $scope.HouseList[0].Id;
					item.opts1 = $scope.CourtyardList;
					item.opts2 = $scope.BuildingList;
					item.opts3 = $scope.UnitList;
					item.opts4 = $scope.HouseList;
				}
			});
		};

		//初始化新增时表单项
		var initFormList = function(fieldsLsit) {
			fieldsLsit.forEach(function(item, index) {
				if(item.editor === "four-select") {
					item.value4 = item.originValue;
				} else {
					item.value = item.originValue;
				}
			});
		};

		//新增管理
		$scope.creatOne = function() {
			var fieldsLsit = $scope.fieldsList;
			bindFieldsListData(fieldsLsit);
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.TitleText = "新增";
					$scope.fieldsList = fieldsLsit;
					initFormList($scope.fieldsList);
					//新增，编辑提交
					$scope.formSubmit = function() {
						formSubmit(true, $scope.fieldsList);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
		};

		var getSuperior = function(id, item) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.getSuperior + "?id=" + id + "&type=4"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var Superior = response.Content;
					var CourtyardId = Superior.CourtyardId;
					var BuildingId = Superior.BuildingId;
					var UnitId = Superior.UnitId;
					var FloorId = Superior.FloorId;
					item.value1 = CourtyardId;
					item.opts1.forEach(function(item0, index0) {
						item0.Location.forEach(function(item1, index1) {
							if(item1.Id === BuildingId) {
								item.opts2 = item0.Location;
								item.value2 = BuildingId;
								item.opts2.forEach(function(item2, index2) {
									item2.Location.forEach(function(item3, index3) {
										if(item3.Id === UnitId) {
											item.opts3 = item2.Location;
											item.value3 = UnitId;
											item.opts3.forEach(function(item4, index4) {
												item4.Location.forEach(function(item5, index5) {
													if(item5.Id === id) {
														item.opts4 = item4.Location;
														item.value4 = id;
													}
												});
											});
										}
									});
								});
							}
						});

					});
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//延迟打开ngDialog
		var delayOpenDialog = function(x, fieldsLsit) {
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.TitleText = "修改";
					$scope.fieldsList = fieldsLsit;

					//新增，编辑提交
					$scope.formSubmit = function() {
						formSubmit(false, $scope.fieldsList, x.Id);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
		};

		//获取房屋下人员列表
		var getResidents = function(id, fieldsLsit, x) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.houseResident + "?id=" + id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.residentList = response.Content;
					fieldsLsit.forEach(function(item, index) {
						if(item.name === "ResidentId") {
							item.opts = $scope.residentList;
							//列表项绑定后再打开ngDialog
							delayOpenDialog(x, fieldsLsit);
						}
					});
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//编辑时绑定数据
		var bindFormList = function(x, fieldsLsit) {
			var HouseId;
			fieldsLsit.forEach(function(item, index) {
				if(item.name === "HouseId") {
					item.value4 = x[item.name] ? x[item.name] : "";
					HouseId = item.value4;
					getSuperior(HouseId, item);
				} else if(item.name === "ResidentId") {
					item.value = x[item.name] ? x[item.name] : "";
					getResidents(x.HouseId, fieldsLsit, x);
				} else {
					item.value = x[item.name] ? x[item.name] : "";
				}
			});
		};

		//编辑管理
		$scope.editItem = function(x) {
			var fieldsLsit = $scope.fieldsList;
			bindFieldsListData(fieldsLsit);
			bindFormList(x, fieldsLsit);
		};

		//车辆颜色列表
		$scope.colorList = [{
			Id: 1,
			Name: "白色"
		}, {
			Id: 2,
			Name: "灰色"
		}, {
			Id: 3,
			Name: "黄色"
		}, {
			Id: 4,
			Name: "粉色"
		}, {
			Id: 5,
			Name: "红色"
		}, {
			Id: 6,
			Name: "紫色"
		}, {
			Id: 7,
			Name: "绿色"
		}, {
			Id: 8,
			Name: "蓝色"
		}, {
			Id: 9,
			Name: "棕色"
		}, {
			Id: 10,
			Name: "黑色"
		}];

		//获取院落树形结构
		var getCourtyardList = function() {
			$scope.listBusyPromise = $http({
				method: 'get',
				url: serverUrls.courtyardAllList
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					//楼栋：BuildingList 单元：UnitList 楼层：FloorList 房屋：HouseList
					$scope.CourtyardList = response.Content;
					$scope.CourtyardList.forEach(function(item1, index1) {
						//楼栋
						item1.Location.forEach(function(item2, index2) {
							//单元
							item2.Location.forEach(function(item3, index3) {
								var item3Location = [];
								item3.Location.forEach(function(item4, index4) {
									item3Location = item3Location.concat(item4.Location);
								});
								item3.Location = item3Location;
							});
						});
					});

					$scope.BuildingList = $scope.BuildingList.concat($scope.CourtyardList[0].Location);
					$scope.UnitList = $scope.UnitList.concat($scope.BuildingList[1].Location);
					$scope.HouseList = $scope.HouseList.concat($scope.UnitList[0].Location);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		//新增车辆管理表单菜单列表
		$scope.fieldsList = [{
			name: "HouseId",
			nameDisplay: "房屋信息",
			editor: "four-select",
			required: true,
			opts1: $scope.CourtyardList,
			opts2: $scope.BuildingList,
			opts3: $scope.UnitList,
			opts4: $scope.HouseList,
			value1: "",
			value2: "",
			value3: "",
			value4: "",
			column: 1,
			originValue: 0,
			getResident: true
		}, {
			name: "ResidentId",
			nameDisplay: "车主姓名",
			editor: "search-select",
			required: true,
			value: "",
			originValue: 1,
			opts: ""
		}, {
			name: "VehicleType",
			nameDisplay: "车辆类型",
			editor: "select",
			required: false,
			value: "",
			originValue: "两厢轿车",
			opts: $scope.VehicleModels
		}, {
			name: "Color",
			nameDisplay: "颜色",
			editor: "select",
			required: false,
			value: "",
			originValue: 1,
			opts: $scope.colorList
		}, {
			name: "VehicleBrand",
			nameDisplay: "车辆品牌",
			editor: "select",
			required: false,
			value: "",
			originValue: "",
			opts: $scope.VehicleBrands
		}, {
			name: "VehicleModel",
			nameDisplay: "车辆型号",
			editor: "normal",
			required: false,
			value: "",
			originValue: "",
			opts: $scope.VehicleTypes
		}, {
			editor: "plate-number",
			name: "PlateNumber",
			nameDisplay: "车牌号",
			required: true,
			value: "",
			originValue: "",
			noteValue: "地区+6位大写字母/数字"
		}, {
			name: "ParkingSpaceNo",
			nameDisplay: "车位号",
			editor: "normal",
			required: false,
			value: "",
			originValue: ""
		}, {
			name: "SecondTelephon",
			nameDisplay: "备用电话",
			editor: "normal",
			required: false,
			value: "",
			originValue: ""
		}];

		//车辆状态列表
		$scope.Status = [{
			Id: 1,
			Name: "启用中"
		}, {
			Id: 2,
			Name: "停用中"
		}];

		//启用停用
		$scope.toggleItem = function(x) {
			PcService.toggleItem($scope, x, serverUrls.vehicleState);
		};

		var getXcars = function($scope, defferd) {
			$http({
				method: "get",
				url: 'server/xCar.json'
			}).success(function(response) {
				$scope.VehicleBrands = response;
				$scope.VehicleBrands.forEach(function(item, index) {
					item.Id = item.Name;
				});
				$scope.fieldsList.forEach(function(_item, _index) {
					if(_item.name === "VehicleBrand") {
						_item.opts = $scope.VehicleBrands;
						_item.originValue = $scope.VehicleBrands[0].Id;
						return;
					}
				});
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取数据列表操作
		$scope.fetchData = function() {
			PcService.fetchData($scope, serverUrls.vehiclelist, $scope.searchOption);
			getXcars($scope);
			getCourtyardList();
		};
		$scope.fetchData();

	}
]);