App.controller('zhongdianrenqunCtrl', ['$scope', '$rootScope', '$filter', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', '$timeout', 'serverUrls', 'PcService',
	function($scope, $rootScope, $filter, $http, ngDialog, PagerExtends, layerAlert, $timeout, serverUrls, PcService) {
		$scope.list = [];
		$scope.TitleText = "新增";
		$scope.PcService = PcService;
		//院落列表//楼栋列表//单元列表//房号列表
		$scope.courtyard = $scope.banlist = $scope.units = $scope.roomNumber = initArray = [{
			Id: 0,
			Name: "请选择"
		}];
		$scope.ResidentList = $scope.UnitList = $scope.BuildingList = $scope.HouseList = [];

		$scope.searchOption = {
			type: 1
		};

		var bindFieldsList = function(name, fieldsList, _array, houseId) {
			fieldsList.forEach(function(item, index) {
				if(item.name === name) {
					item.opts = _array;
					if(houseId) {
						item.value = houseId;
					} else {
						item.value = _array[0] ? _array[0].Id : "";
					}

				}
			});
		};

		//获取院落列表
		var getCourtyardList = function() {
			$scope.ngDialogPromise = $http({
				method: "get",
				url: serverUrls.courtyardAll
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var lists = initArray.concat(response.Content);
					$scope.courtyard = lists;
					bindFieldsList("CourtyardId", $scope.fieldsList[0], lists);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		//获取楼栋，单元，房号列表
		var getBuildList = function(id, type, fieldsList) {
			$scope.ngDialogPromise = $http({
				method: "get",
				url: serverUrls.buildingAll + "?id=" + id + "&type=" + type
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var lists = initArray.concat(response.Content);
					var isLengthZero = (lists.length === 0 || (lists.length === 1 && lists[0].Id === 0));
					switch(type) {
						case 1:
							if(isLengthZero) {
								bindFieldsList("BuildingId", fieldsList, initArray);
							} else {
								bindFieldsList("BuildingId", fieldsList, lists);
							}
							$scope.BuildingList = lists;
							fieldsList.forEach(function(item, index) {
								if(item.name === "BuildingId") {
									item.opts = $scope.BuildingList;
									return;
								}
							});
							bindFieldsList("UnitId", fieldsList, initArray);
							bindFieldsList("HouseId", fieldsList, initArray);
							bindFieldsList("ResidentId", fieldsList, initArray);
							break;
						case 2:
							if(isLengthZero) {
								bindFieldsList("UnitId", fieldsList, initArray);
							} else {
								bindFieldsList("UnitId", fieldsList, lists);
							}
							$scope.UnitList = lists;
							bindFieldsList("HouseId", fieldsList, initArray);
							bindFieldsList("ResidentId", fieldsList, initArray);
							break;
						case 3:
							break;
						case 4:
							break;
						default:
							break;
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取房屋下居民列表
		var getPersonList = function(name, id, fieldsList) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.houseResident + "?id=" + id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					if(response.Content.length === 0) {
						layerAlert.autoclose("该房号下暂无可选人员,请选择其他房号.");
						return;
					}
					var list = initArray.concat(response.Content);
					bindFieldsList(name, fieldsList, list);

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var getHouseList = function(unitId, fieldsList) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.unitHouseList + "?id=" + unitId
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.HouseList = response.Content;
					$scope.HouseList.forEach(function(item, index) {
						item.Name = item.RoomNumber;
					});
					var list = initArray.concat(response.Content);
					bindFieldsList("HouseId", fieldsList, list);

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//下拉选择时间
		var fieldChange = function(field) {
			switch(field.name) {
				case "CourtyardId":
					getBuildList(field.value, 1, $scope.fieldsList[0]);
					break;
				case "BuildingId":
					getBuildList(field.value, 2, $scope.fieldsList[0]);
					break;
				case "UnitId":
					getHouseList(field.value, $scope.fieldsList[0]);
					break;
				case "HouseId":
					getPersonList("ResidentId", field.value, $scope.fieldsList[0]);
					break;
				default:
					break;
			}
		};

		var getFormData = function(fieldsList) {
			var data = {};
			fieldsList.forEach(function(item, index) {
				if(item.editor === "multiselect") {
					var types = "";
					item.opts.forEach(function(_item, _index) {
						if(_item.Checked) {
							types += _item.Id + ",";
						}
					});
					types = types.substring(0, types.length - 1);
					data[item.name] = types;
				} else {
					data[item.name] = item.value;
				}
			});
			return data;
		};

		//提交表单
		var formSubmit = function(create, fieldsList, id) {
			var _data = getFormData(fieldsList);
			if(!_data.BuildingId || !_data.CourtyardId || !_data.UnitId || !_data.HouseId) {
				layerAlert.autoclose("请选择居住信息！");
				return;
			}
			if(!_data.ResidentId) {
				layerAlert.autoclose("请选择人员姓名！");
				return;
			}
			if(!_data.PopulationType) {
				layerAlert.autoclose("请至少选择一个人群类型！");
				return;
			}
			//console.log(_data);
			var data = {};
			data.PopulationType = _data.PopulationType;

			data.ResidentId = _data.ResidentId;
			var method, url, doAction;
			switch(create) {
				case true:
					method = "put";
					url = serverUrls.addKeypopulation;
					doAction = "新增";
					break;
				case false:
					method = "put";
					url = serverUrls.addKeypopulation;
					doAction = "修改";
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
					layerAlert.autoclose(doAction + "操作成功!");
					setTimeout(function() {
						ngDialog.closeAll();
					}, 1600);
					$scope.fetchData();
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//新增管理
		$scope.creatOne = function() {
			$scope.fieldsList.forEach(function(item, index) {
				item.editable = false;
			});
			var fieldsList = $scope.fieldsList[0];
			PcService.initFormList(fieldsList);
			ngDialog.openConfirm({
				template: 'createOne',
				scope: $scope,
				controller: ["$scope", function($scope) {
					$scope.fieldsList = fieldsList;
					$scope.TitleText = "新增";
					$scope.creating = true;

					//表单提交
					$scope.formSubmit = function() {
						formSubmit(true, $scope.fieldsList);
					};

					$scope.closeDialog = function(index) {
						ngDialog.close(index);
					};

					$scope.fieldChange = fieldChange;
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
		};

		//民族列表
		$scope.Nations = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "汉族"
		}, {
			Id: 2,
			Name: "藏族"
		}, {
			Id: 3,
			Name: "彝族"
		}, {
			Id: 4,
			Name: "其他少数民族"
		}];

		$scope._Nations = [{
			Id: 1,
			Name: "汉族"
		}, {
			Id: 2,
			Name: "藏族"
		}, {
			Id: 3,
			Name: "彝族"
		}, {
			Id: 4,
			Name: "其他少数民族"
		}];

		//性别列表
		$scope.Sexes = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "男"
		}, {
			Id: 2,
			Name: "女"
		}];

		//适合人群列表
		$scope.Crowd = [{
			nameDisplay: "孤寡老人",
			value: 1,
			Checked: false
		}, {
			nameDisplay: "残疾人",
			value: 2,
			Checked: false
		}, {
			nameDisplay: "高龄老人",
			value: 3,
			Checked: false
		}, {
			nameDisplay: "低保户",
			value: 4,
			Checked: false
		}, {
			nameDisplay: "失独老人",
			value: 5,
			Checked: false
		}, {
			nameDisplay: "吸毒人群",
			value: 6,
			Checked: false
		}, {
			nameDisplay: "劳改刑满释放人员",
			value: 7,
			Checked: false
		}, {
			nameDisplay: "社区矫正人员",
			value: 8,
			Checked: false
		}, {
			nameDisplay: "其他人员",
			value: 9,
			Checked: false
		}];

		//重点人群筛选项
		$scope.screenfields = [{
			nameDisplay: "关键字",
			name: "name",
			value: "",
			editor: "normal"
		}, {
			nameDisplay: "性别",
			name: "sex",
			value: $scope.Sexes[0].Id,
			editor: "select",
			opts: $scope.Sexes
		}, {
			nameDisplay: "民族",
			name: "nationality",
			value: $scope.Nations[0].Id,
			editor: "select",
			opts: $scope.Nations
		}];

		//人员姓名
		$scope.Names = [{
			Id: 0,
			Name: "请选择"
		}];

		//人员类型
		$scope.PeopleType = [{
			Name: "孤寡老人",
			Id: 1
		}, {
			Name: "残疾人",
			Id: 2
		}, {
			Name: "高龄老人",
			Id: 3
		}, {
			Name: "低保户",
			Id: 4
		}, {
			Name: "失独老人",
			Id: 5
		}, {
			Name: "吸毒人群",
			Id: 6
		}, {
			Name: "劳改刑满释放人员",
			Id: 7
		}, {
			Name: "社区矫正人员",
			Id: 8
		}, {
			Name: "其他人员",
			Id: 9
		}];

		//新增重点人群表单菜单
		$scope.fieldsList = [
			[{
				name: "CourtyardId",
				nameDisplay: "院落",
				editor: "select",
				required: true,
				value: "",
				opts: $scope.courtyard,
				originValue: $scope.courtyard[0].Id
			}, {
				name: "BuildingId",
				nameDisplay: "楼栋",
				editor: "select",
				required: true,
				value: "",
				opts: $scope.banlist,
				originValue: $scope.banlist[0].Id
			}, {
				name: "UnitId",
				nameDisplay: "单元",
				editor: "select",
				required: true,
				value: '',
				opts: $scope.units,
				originValue: $scope.units[0].Id
			}, {
				name: "HouseId",
				nameDisplay: "房号",
				editor: "select",
				required: true,
				value: "",
				opts: $scope.roomNumber,
				originValue: $scope.roomNumber[0].Id
			}, {
				name: "ResidentId",
				nameDisplay: "人员姓名",
				editor: "select",
				required: true,
				value: "",
				opts: $scope.Names,
				originValue: $scope.Names[0].Id
			}, {
				name: "PopulationType",
				nameDisplay: "人员类型",
				editor: "multiselect",
				required: true,
				value: "",
				opts: $scope.PeopleType,
				originValue: $scope.PeopleType[0].Id,
				column: 1
			}],
			[{
				name: "ResidentName",
				nameDisplay: "姓名",
				editor: "normal",
				required: true,
				value: ""
			}, {
				name: "ResidentSex",
				nameDisplay: "性别",
				editor: "normal",
				required: true,
				value: ""
			}, {
				name: "ResidentBirthDate",
				nameDisplay: "生日",
				editor: "normal",
				required: true,
				value: ""
			}, {
				name: "ResidentNationality",
				nameDisplay: "民族",
				editor: "normal",
				required: true,
				value: ""
			}, {
				name: "ResidentPhone",
				nameDisplay: "电话号码",
				editor: "normal",
				required: true,
				value: ""
			}, {
				name: "PopulationType",
				nameDisplay: "人员类型",
				editor: "normal",
				required: true,
				value: "",
				column: 1
			}]
		];

		//获取筛选字段
		$scope.getFetchData = function() {
			var dada = {};
			$scope.screenfields.forEach(function(item, index) {
				dada[item.name] = item.value;
			});
			return dada;
		};

		//查询数据列表提交数据
		$scope.fetchData = function() {
			var type = "";
			$scope.Crowd.forEach(function(item, index) {
				if(item.Checked) {
					type += item.value + ",";
				}
			});
			type = type.substring(0, type.length - 1);
			$scope.searchOption.type = type;
			var data = $.extend(true, $scope.searchOption, $scope.getFetchData());
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.keypopulationList,
				params: data,
				success: function(response) {
					$scope.list = response;
					var nowYear = new Date();
					if($scope.list.length > 0) {
						$scope.list.forEach(function(item, index) {
							item.Age = (nowYear - new Date(item.ResidentBirthDate)) / (365 * 24 * 3600000);
							if(item.Age > 150) {
								item.Age = "无";
							} else if(item.Age < 1) {
								item.Age = Math.ceil(item.Age * 12) + "月";
							} else if(item.Age >= 1) {
								item.Age = Math.floor(item.Age) + "岁";
							}
						});
					}
					getCourtyardList();
				},
				error: function(error) {
					layerAlert.autoclose(error);
				}
			});
		};

		$scope.fetchData();

		//根据房屋Id获取房屋下的居民列表
		var getPersernList = function(id, fieldsList) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.houseResident + "?id=" + id + "&type=4"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.ResidentList = response.Content;
					bindFieldsList("ResidentId", fieldsList, $scope.ResidentList);
				} else {
					layerAlert.autoclose(Message);
				}
			});
		};

		var openWindow = function(fieldsList) {
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ["$scope", function($scope) {
					fieldsList.forEach(function(item, index) {
						if(item.name === "ResidentName") {
							item.value = PcService.subStrDescribe(item.value, 15);
						} else if(item.name === "ResidentBirthDate") {
							item.value = $filter("date")(item.value, 'yyyy-MM-dd');
						}
					});
					$scope.fieldsList = fieldsList;
					$scope.TitleText = "查看";
					$scope.creating = false;

					//表单提交
					$scope.formSubmit = function() {
						ngDialog.closeAll();
					};

					//关闭dialog
					$scope.closeDialog = function() {
						ngDialog.closeAll();
					};

					$scope.fieldChange = fieldChange;
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
		};

		var numberToText = function(id, fieldsList) {
			var _text;
			fieldsList.forEach(function(item, idnex) {
				if(item.value === id) {
					_text = item.nameDisplay;
				}
			});
			return _text;
		};

		var bindFormData = function(x, fieldsList) {
			fieldsList.forEach(function(item, index) {
				if(x[item.name] !== undefined) {
					if(item.name === "PopulationType") {
						item.value = numberToText(x[item.name], $scope.Crowd);
					} else if(item.name === "ResidentSex") {
						item.value = PcService.numberToText(x[item.name], $scope.Sexes);
					} else if(item.name === "ResidentNationality") {
						item.value = PcService.numberToText(x[item.name], $scope.Nations);
					} else {
						item.value = x[item.name];
					}

				}
			});
		};

		var bindFormOptions = function(fieldsList, x) {
			var ResidentHouseId = x.ResidentHouseId;
			fieldsList.forEach(function(item, index) {
				item.editable = true;
				//item.editor = "normal";
			});
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.getSuperior + "?id=" + ResidentHouseId + "&type=4"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var Superior = response.Content;
					var CourtyardId = Superior.CourtyardName;
					var BuildingId = Superior.BuildingName;
					var UnitId = Superior.UnitName;
					x.CourtyardId = CourtyardId;
					x.BuildingId = BuildingId;
					x.UnitId = UnitId;
					x.HouseId = Superior.RoomNumber;
					x.ResidentId = x.ResidentName;
					x.PopulationType = PcService.numberToText(x.PopulationType, $scope.PeopleType);
					/*bindFormData(x, fieldsList);
					openWindow(fieldsList);*/
				} else {
					layerAlert.autoclose(Message);
				}
			});
		};

		//查看重点人群
		$scope.editItem = function(x) {
			var fieldsList = $scope.fieldsList[1];

			/*bindFormOptions(fieldsList, x);*/
			bindFormData(x, fieldsList);
			openWindow(fieldsList);
		};
	}
]);