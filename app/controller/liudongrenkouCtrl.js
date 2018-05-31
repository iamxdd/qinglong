App.controller('liudongrenkouCtrl', ['$scope', '$q', '$rootScope', '$http', '$filter', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $q, $rootScope, $http, $filter, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {
		$scope.list = [];
		$scope.TitleText = "新增";
		$scope.PcService = PcService;

		$scope.searchOption = {
			population: 2
		};

		//院落：CourtyardList 楼栋：BuildingList 单元：UnitList 楼层：FloorList 房屋：HouseList
		$scope.CourtyardList = $scope.BuildingList = $scope.UnitList = $scope.FloorList = $scope.HouseList = [{
			Id: 0,
			Name: "请选择"
		}];

		var bindFieldsListData = function(fieldsList) {
			fieldsList.forEach(function(item, index) {
				if(item.editor === "four-select") {
					//楼栋：BuildingList 单元：UnitList 楼层：FloorList 房屋：HouseList
					item.value1 = $scope.CourtyardList[0].Id;
					item.opts1 = $scope.CourtyardList;
					item.value2 = $scope.BuildingList[0].Id;
					item.opts2 = $scope.BuildingList;
				}

			});
		};

		//获取院落树形结构
		var getCourtyardList = function(deffered) {
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
					if(deffered) {
						deffered.resolve("success");
					}

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var initFormList = function(fieldsList) {
			fieldsList.forEach(function(item, index) {
				if(item.editor === "four-select") {
					item.value2 = item.value3 = item.value4 = item.originValue;
					item.opts2 = $scope.BuildingList;
					item.opts3 = item.opts4 = [{
						Id: 0,
						Name: "请选择"
					}];
				} else {
					item.value = item.originValue;
				}
			});
		};

		//新增时删除下拉中全部选项
		var deleteInvalidOpts = function(fieldsList) {
			fieldsList.forEach(function(item, index) {
				if(item.editor === "select") {
					if(item.opts[0].Id === 0) {
						var newOpts = [];
						item.opts.forEach(function(_item, _index) {
							if(_item.Id > 0) {
								newOpts.push(_item);
							}
						});
						item.opts = newOpts;
						item.originValue = newOpts[0].Id;
					}
				}
			});
		};

		//新增管理
		$scope.creatOne = function() {
			$scope.fieldsList.forEach(function(item, index) {
				item.editable = false;
			});

			var deffered = $q.defer();
			var promises = deffered.promise;
			if($scope.CourtyardList && $scope.CourtyardList.length > 1) {
				deffered.resolve();
			} else {
				getCourtyardList(deffered);

			}
			promises.then(function() {
				var fieldsList = $scope.fieldsList;
				var fetchData = $scope.fetchData;
				bindFieldsListData(fieldsList);
				deleteInvalidOpts(fieldsList);
				initFormList(fieldsList);
				ngDialog.openConfirm({
					template: 'createOne',
					controller: ["$scope", function(scope) {
						scope.fieldsList = fieldsList;
						scope.TitleText = "新增";
						scope.fetchData = fetchData;

						//新增流动人口提交
						scope.formSubmit = function() {
							var param = {
								Population: 2
							};
							var _param = PcService.getFormData(scope.fieldsList);
							if(!_param.HouseId) {
								layerAlert.autoclose("请选择房屋信息！");
								return;
							}
							var Sex = _param.Sex;							
							if(Sex === 1) {
								param.Images = serverUrls.picMen;
							} else if(Sex === 2) {
								param.Images = serverUrls.picWomen;
							}
							PcService.formSubmit(scope, true, scope.fieldsList, serverUrls.addResident, null, param, $rootScope.pHeader);
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 850
				});
			});

		};

		//打开查看弹出窗口
		var openNgDialog = function(fieldsList) {
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					fieldsList.forEach(function(item, index) {
						if(item.editor === "select" || item.editor === "search-select") {
							item.opts.map(function(v, n) {
								if(v.Id === 0) {
									v.Name = "";
								}
							});
						}
					});
					$scope.fieldsList = fieldsList;
					$scope.TitleText = "查看";

					//查看流动人口提交
					$scope.formSubmit = function() {
						ngDialog.closeAll();
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
		};

		//根据房屋Id获取院落Id，楼栋Id，单元Id
		var getSuperior = function(id, item, fieldsList) {
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
					openNgDialog(fieldsList);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//编辑时绑定表单数据
		var bindFormData = function(x, fieldsList) {
			fieldsList.forEach(function(item, index) {
				if(item.editor === "four-select") {
					item.opts1 = $scope.CourtyardList;
					item.value4 = x[item.name];
					var HouseId = item.value4;
					getSuperior(HouseId, item, fieldsList);
				} else {
					item.value = x[item.name];
				}
			});
		};

		//查看流动人口项
		$scope.editItem = function(x) {
			$scope.fieldsList.forEach(function(item, index) {
				item.editable = true;
			});
			var fieldsList = $scope.fieldsList;
			var deffered = $q.defer();
			var promises = deffered.promise;
			if($scope.CourtyardList && $scope.CourtyardList.length > 1) {
				deffered.resolve();
			} else {
				getCourtyardList(deffered);

			}
			promises.then(function() {
				bindFormData(x, fieldsList);
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

		//婚姻状态列表
		$scope.MaritalStatus = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "未婚"
		}, {
			Id: 2,
			Name: "已婚"
		}, {
			Id: 3,
			Name: "离异"
		}, {
			Id: 4,
			Name: "丧偶"
		}];

		//社保状态列表
		$scope.SocialSecurityStatus = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "有"
		}, {
			Id: 2,
			Name: "无"
		}];
		$scope._SocialSecurityStatus = [{
			Id: 1,
			Name: "有"
		}, {
			Id: 2,
			Name: "无"
		}];

		//居住证列表
		$scope.ResidencePermit = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "有"
		}, {
			Id: 2,
			Name: "无"
		}];

		//
		$scope.numberToText = function(id, _array) {
			if(!id) {
				return "无";
			}
			var _text = "";
			_array.forEach(function(item, index) {
				if(typeof id === "boolean") {
					id = id.toString();
				}
				if(item.Id === id) {
					_text = item.Name;
				}
			});
			return _text;
		};

		//筛选表单项
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
		}, {
			nameDisplay: "婚姻状态",
			name: "marital",
			value: $scope.MaritalStatus[0].Id,
			editor: "select",
			opts: $scope.MaritalStatus
		}, {
			nameDisplay: "社保状态",
			name: "socialSecurity",
			value: $scope.SocialSecurityStatus[0].Id,
			editor: "select",
			opts: $scope.SocialSecurityStatus
		}, {
			nameDisplay: "居住证",
			name: "residencepermit",
			value: $scope.ResidencePermit[0].Id,
			editor: "select",
			opts: $scope.ResidencePermit
		}, {
			nameDisplay: "年齡",
			name1: "min",
			name2: "max",
			editor: "double-input",
			value1: "",
			value2: ""
		}];

		//新增流动人口
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
			originValue: 0
		}, {
			name: "Name",
			nameDisplay: "姓名",
			editor: "normal",
			required: true,
			value: "",
			originValue: ""
		}, {
			name: "Sex",
			nameDisplay: "性别",
			editor: "select",
			required: true,
			value: "",
			opts: $scope.Sexes,
			originValue: $scope.Sexes[0].Id
		}, {
			name: "IDCardNo",
			nameDisplay: "身份证",
			editor: "normal",
			required: true,
			value: "",
			originValue: ""
		}, {
			name: "Nationality",
			nameDisplay: "民族",
			editor: "select",
			required: false,
			value: "",
			opts: $scope.Nations,
			originValue: $scope.Nations[0].Id
		}, {
			name: "DomicilePlace",
			nameDisplay: "户籍所在地",
			editor: "normal",
			required: false,
			value: "",
			originValue: ""
		}, {
			name: "Phone",
			nameDisplay: "联系电话",
			editor: "normal",
			required: false,
			value: "",
			originValue: ""
		}, {
			name: "CurrentAddress",
			nameDisplay: "现居住地",
			editor: "normal",
			required: false,
			value: "",
			originValue: ""
		}, {
			name: "ResidencePermit",
			nameDisplay: "居住证",
			editor: "select",
			required: false,
			value: "",
			opts: $scope.ResidencePermit,
			originValue: $scope.ResidencePermit[0].Id
		}, {
			name: "SocialSecurity",
			nameDisplay: "社保状态",
			editor: "select",
			required: false,
			value: "",
			opts: $scope.SocialSecurityStatus,
			originValue: $scope.SocialSecurityStatus[0].Id
		}, {
			name: "MaritalStatus",
			nameDisplay: "婚姻状态",
			editor: "select",
			required: false,
			value: "",
			opts: $scope.MaritalStatus,
			originValue: $scope.MaritalStatus[0].Id
		}];
		//获取筛选字段
		$scope.getFetchData = function() {
			var dada = {};
			$scope.screenfields.forEach(function(item, index) {
				if(item.editor === "double-input") {
					dada[item.name1] = item.value1;
					dada[item.name2] = item.value2;
				} else {
					dada[item.name] = item.value;
				}
			});
			return dada;
		};

		//查询数据
		$scope.fetchData = function() {
			/*if ($scope.CourtyardList.length === 0 || ($scope.CourtyardList.length === 1 && $scope.CourtyardList[0].Id === 0)) {
				getCourtyardList();
			}*/
			var params = $.extend(true, $scope.searchOption, $scope.getFetchData());
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.populationlist,
				params: params,
				success: function(response) {
					$scope.list = response;
					var nowTime = new Date();
					$scope.list.forEach(function(item, index) {
						item.Age = (nowTime - new Date(item.BirthDate)) / (365 * 24 * 3600000);
						if(item.Age < 1) {
							item.Age = Math.ceil(item.Age * 12) + "月";
						} else {
							item.Age = Math.floor(item.Age) + "岁";
						}
						if(item.BirthDate == null) {
							item.Age = '无';
						}
					});
				},
				error: function(error) {
					layerAlert.autoclose(error);
				}
			});
		};

		$scope.fetchData();

		//新增流动人口表单提交
		$scope.formSubmit = function() {
			layerAlert.autoclose("您点击了提交表单!");
		};

	}
]);