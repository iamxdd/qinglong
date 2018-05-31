App.controller("juminguanliCtrl", ['$scope', '$state', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', '$filter', 'serverUrls', 'PcService', '$q',
	function($scope, $state, $rootScope, $http, ngDialog, PagerExtends, layerAlert, $filter, serverUrls, PcService, $q) {
		$scope.list = [];
		$scope.TitleText = "新增";
		$scope.PcService = PcService;
		$scope.searchOption = {
			name: "",
			personType: 1
		};

		$scope.topNavTabList = [{
			Id: 1,
			Name: "社区居民",
			Checked: true
		}, {
			Id: 2,
			Name: "社区员工",
			Checked: false
		}, {
			Id: 3,
			Name: "商家人员",
			Checked: false
		}];

		//判断字符粗韩是否可以转化为JSON
		function isJSON(str) {
			if(typeof str == 'string') {
				try {
					var obj = JSON.parse(str);
					if(obj.length) {
						return true;
					} else {
						return false;
					}

				} catch(e) {
					return false;
				}
			}
			return false;
		}

		$scope.selectTab = $scope.topNavTabList[0];

		/*$scope.searchOption.persontype = $scope.topNavTabList[0].Id;*/

		$scope.topChecked = function(x) {
			$scope.topNavTabList.forEach(function(item, index) {
				item.Checked = false;
			});
			x.Checked = true;
			$scope.selectTab = x;
			$scope.searchOption.personType = $scope.selectTab.Id;
			$scope.fetchData();
		};

		//院落：CourtyardList 楼栋：BuildingList 单元：UnitList 楼层：FloorList 房屋：HouseList
		var initList = [{
			Id: 0,
			Name: "请选择"
		}];
		$scope.CourtyardList = $scope.BuildingList = $scope.UnitList = $scope.FloorList = $scope.HouseList = [{
			Id: 0,
			Name: "请选择"
		}];

		//是否显示分配账号
		$scope.isShow = function(CheckCode) {
			var _show = false;
			if(!CheckCode || CheckCode.length === 0) {
				_show = true;
			} else {
				_show = false;
			}
			return _show;
		};

		$scope.CheckStatus = function(x) {
			if(x.CheckCode.length === 0) {
				return " label-danger";
			} else {
				if(x.CheckCode[0].State == 2) {
					return " label-warning";
				} else {
					return " label-success";
				}

			}

		};

		$scope.isActivation = function(CheckCode) {
			var _show = false;
			if(CheckCode && CheckCode.length !== 0) {
				if(CheckCode[0].State === 2) {
					_show = true;
				}
			} else {
				_show = false;
			}
			return _show;
		};

		//选择院落
		$scope.choseCourtyard = function(field) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.getAll + "?id=" + field.value1
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var initList = [{
						Id: 0,
						Name: "请选择"
					}];
					var list = initList.concat(response.Content);
					if($scope.fieldsList) {
						$scope.fieldsList[1].forEach(function(item, index) {
							if(item.name === "HouseId") {
								item.opts2 = list;
								item.value2 = list[0] ? list[0].Id : 0;
								item.opts3 = initList;
								item.value3 = 0;
								item.opts4 = initList;
								item.value4 = 0;
							}
						});
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(error);
			});

		};

		//选择楼栋
		$scope.choseBuild = function(field) {
			if(field.value2 === 0) {
				$scope.fieldsList[1].forEach(function(item, index) {
					if(item.name === "HouseId") {
						item.opts3 = initList;
						item.value3 = 0;
						item.opts4 = initList;
						item.value4 = 0;

					}
				});
				return;
			}
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.getAll + "?id=" + field.value2
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var initList = [{
						Id: 0,
						Name: "请选择"
					}];
					var list = initList.concat(response.Content);
					if($scope.fieldsList[1]) {
						$scope.fieldsList[1].forEach(function(item, index) {
							if(item.name === "HouseId") {
								item.opts3 = list;
								item.value3 = list[0] ? list[0].Id : 0;
								item.opts4 = initList;
								item.value4 = 0;
							}
						});
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(error);
			});
		};

		//选择单元
		$scope.choseUnit = function(field) {
			if(field.value3 === 0) {
				$scope.fieldsList[1].forEach(function(item, index) {
					if(item.name === "HouseId") {
						item.opts4 = initList;
						item.value4 = 0;
					}
				});
				return;
			}
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.unitHouseList + "?id=" + field.value3
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var initList = [{
						Id: 0,
						RoomNumber: "请选择"
					}];
					var list = initList.concat(response.Content);
					list.forEach(function(_item, _index) {
						_item.Name = _item.RoomNumber;
					});
					if($scope.fieldsList[1]) {
						$scope.fieldsList[1].forEach(function(item, index) {
							if(item.name === "HouseId") {
								item.opts4 = list;
								item.value4 = list[0] ? list[0].Id : 0;
							}
						});
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(error);
			});
		};

		$scope.reActivation = function(x) {
			var fetchData = $scope.fetchData;
			ngDialog.openConfirm({
				template: 'configOne',
				controller: ['$scope', function($scope) {
					$scope.fetchData = fetchData;
					$scope.TitleText = "重新发送激活码";
					$scope.fieldsList = [{
						name: "phone",
						nameDisplay: "电话号码",
						editor: "normal",
						required: true,
						value: ""
					}];

					$scope.formSubmit = function() {
						var data = PcService.getFormData($scope.fieldsList);
						data.Content = "{name:" + x.Name + ",userid:" + x.CheckCode[0].ResidentStatus + ",code:" + x.CheckCode[0].Code + "}";
						data.type = 2;
						$scope.ngDialogPromise = $http({
							method: "post",
							url: serverUrls.sendSms,
							data: data
						}).success(function(response) {
							var Code = response.State.Code;
							var Message = response.State.Message;
							if(Code === 0) {
								layerAlert.autoclose("发送成功,注意查收！");
								$scope.closeThisDialog();
							} else {
								layerAlert.autoclose(Message);
							}
						}).error(function(error) {
							layerAlert.autoclose(PcService.errorResult(error));
						});
					};
				}],
				className: 'ngdialog-theme-default',
				closeByEscape: true,
				closeByDocument: false,
				width: 600
			});
		};

		//居住类型列表
		$scope.stayType = [{
			Id: 1,
			Name: "租赁房屋"
		}, {
			Id: 2,
			Name: "单位内部"
		}, {
			Id: 3,
			Name: "亲友家中"
		}, {
			Id: 4,
			Name: "自住"
		}];

		//最高学历
		$scope.Education = [{
			Id: 2,
			Name: "大专"
		}, {
			Id: 3,
			Name: "本科"
		}, {
			Id: 4,
			Name: "研究生"
		}, {
			Id: 5,
			Name: "博士及以上"
		}];

		//婚姻状态
		$scope.maritalStatus = [{
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

		//性别列表
		$scope.sexes = [{
			Id: 1,
			Name: "男"
		}, {
			Id: 2,
			Name: "女"
		}];

		//社保状态列表
		$scope.socialsecurity = [{
			Id: 1,
			Name: "有社保"
		}, {
			Id: 2,
			Name: "无社保"
		}];

		//绑定表单下拉数据
		var bindFieldsListData = function(fieldsList) {
			fieldsList.forEach(function(_item, _index) {
				_item.forEach(function(item, index) {
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
					} else {
						item.value = item.originValue;
					}
				});

			});
		};
		//获取初始院落下的楼栋列表
		var getInitBuildList = function(id) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.getAll + "?id=" + id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.BuildingList = $scope.BuildingList.concat(response.Content);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(error);
			});
		};

		//获取院落列表
		var getCourtyardList = function($scope, x, DegreeInfomation, fieldsList) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.courtyardAllList
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					//楼栋：BuildingList 单元：UnitList 楼层：FloorList 房屋：HouseList
					$scope.CourtyardList = response.Content;
					/*$scope.CourtyardList.forEach(function(item1, index1) {
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
					});*/

					$scope.BuildingList = $scope.BuildingList.concat($scope.CourtyardList[0].Location);
					$scope.fieldsList[1][0].opts1 = $scope.CourtyardList;
					$scope.fieldsList[1][0].value1 = $scope.CourtyardList[0].Id;
					$scope.fieldsList[1][0].opts2 = $scope.BuildingList;
					$scope.fieldsList[1][0].value2 = $scope.BuildingList[0].Id;
					$scope.UnitList = $scope.UnitList.concat($scope.BuildingList[1].Location);
					$scope.HouseList = $scope.HouseList.concat($scope.UnitList[0].Location);
					$scope.fieldsList[1][0].opts3 = $scope.UnitList;
					$scope.fieldsList[1][0].value3 = $scope.UnitList[0].Id;
					$scope.fieldsList[1][0].opts4 = $scope.HouseList;
					$scope.fieldsList[1][0].value4 = $scope.HouseList[0].Id;
					if(x && DegreeInfomation && fieldsList) {
						bindFormData($scope, x, DegreeInfomation, fieldsList);
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		$scope.PersonType = [{
			Id: 1,
			Name: "社区居民"
		}, {
			Id: 2,
			Name: "社区员工"
		}, {
			Id: 3,
			Name: "商家人员"
		}];

		//组织
		$scope.organization = [{
			Id: 1,
			Name: "组织一"
		}, {
			Id: 2,
			Name: "组织二"
		}, {
			Id: 3,
			Name: "组织三"
		}];

		//民族列表
		$scope.Nations = [{
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

		//政治面貌列表
		$scope.PoliticalStatuses = [{
			Id: 1,
			Name: "中共党员"
		}, {
			Id: 2,
			Name: "中共预备党员"
		}, {
			Id: 3,
			Name: "共青团员"
		}, {
			Id: 4,
			Name: "群众"
		}, {
			Id: 5,
			Name: "民革党员"
		}, {
			Id: 6,
			Name: "民盟盟员"
		}, {
			Id: 7,
			Name: "民建会员"
		}, {
			Id: 8,
			Name: "民进会员"
		}, {
			Id: 9,
			Name: "农工党党员"
		}, {
			Id: 10,
			Name: "致公党党员"
		}, {
			Id: 11,
			Name: "九三学社社员"
		}, {
			Id: 12,
			Name: "台盟盟员"
		}, {
			Id: 13,
			Name: "无党派民主人士"
		}, {
			Id: 14,
			Name: "入党积极分子"
		}];

		//人群类型
		$scope.Populations = [{
			Id: 1,
			Name: "常住人口"
		}, {
			Id: 2,
			Name: "流动人口"
		}];

		$scope.Keypopulation = [{
			Id: 1,
			Name: "是"
		}, {
			Id: 2,
			Name: "否"
		}];

		//根据居民Id获取学历工作信息并绑定数据
		var getMyDegreeInfomation = function(x, fieldsList, initfieldsList, IDCardNo) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.experienceDetails + "?id=" + x.Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var DegreeInfomation = response.Content;
					var allInfo = $.extend(true, DegreeInfomation, x);
					bindFormData($scope, allInfo, {}, fieldsList);
				} else {
					initFormList(initfieldsList, IDCardNo);
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				initFormList(initfieldsList, IDCardNo);
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//根据身份证Id获取居民基本信息并绑定数据
		var getresident = function(idNo, fieldsList, IDCardNo) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.getresidentdatelis + "?idcardno=" + idNo
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var ResidentStaus = response.Content;
					bindFormData($scope, ResidentStaus, {}, fieldsList);
					//getMyDegreeInfomation(ResidentStaus, fieldsList, initfieldsList, IDCardNo);
				} else {
					var initArray = [
						[{
							name: "HighSchool",
							nameDisplay: "公司名称",
							editor: "normal",
							required: false,
							value: "",
							originValue: ""
						}, {
							name: "HighSchool",
							nameDisplay: "工作时间",
							editor: "normal",
							required: false,
							value: "",
							originValue: ""
						}, {
							name: "HighSchool",
							nameDisplay: "工作描述",
							editor: "textarea",
							required: false,
							value: "",
							originValue: "",
							column: 1
						}]
					];
					fieldsList[3] = initArray;
					initFormList(fieldsList, IDCardNo);
					return;
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				var initArray = [
					[{
						name: "HighSchool",
						nameDisplay: "公司名称",
						editor: "normal",
						required: false,
						value: "",
						originValue: ""
					}, {
						name: "HighSchool",
						nameDisplay: "工作时间",
						editor: "normal",
						required: false,
						value: "",
						originValue: ""
					}, {
						name: "HighSchool",
						nameDisplay: "工作描述",
						editor: "textarea",
						required: false,
						value: "",
						originValue: "",
						column: 1
					}]
				];
				fieldsList[3] = initArray;
				initFormList(fieldsList, IDCardNo);
				return;
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

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

		//新增居民管理表单菜单列表
		$scope.fieldsList = [
			[{
				name: "IDCardNo",
				nameDisplay: "身份证号码",
				editor: "normal",
				required: true,
				value: "",
				originValue: "",
				onChanged: function(value, create, fieldsList) {
					if(create) {
						//此处为新增情况下
						if(!value) {
							var initArray = [
								[{
									name: "HighSchool",
									nameDisplay: "公司名称",
									editor: "normal",
									required: false,
									value: "",
									originValue: ""
								}, {
									name: "HighSchool",
									nameDisplay: "工作时间",
									editor: "normal",
									required: false,
									value: "",
									originValue: ""
								}, {
									name: "HighSchool",
									nameDisplay: "工作描述",
									editor: "textarea",
									required: false,
									value: "",
									originValue: "",
									column: 1
								}]
							];
							fieldsList[3] = initArray;
							initFormList(fieldsList);
							return;
						} else {
							if(PcService.isIDNumber(value)) {
								getresident(value, fieldsList, "IDCardNo");
							} else {
								this.value = "";
								layerAlert.autoclose("身份证号码格式不正确,请重新输入!");
								return;
							}
						}

					} else {
						//此处为编辑情况下
						if(PcService.isIDNumber(value)) {
							return;
						} else {
							this.value = "";
							layerAlert.autoclose("身份证号码格式不正确,请重新输入!");
							return;
						}
					}

				}
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
				value: $scope.sexes[0].Id,
				opts: $scope.sexes,
				originValue: 1
			}, {
				name: "Nationality",
				nameDisplay: "民族",
				editor: "search-select",
				required: false,
				value: "",
				originValue: 1,
				opts: $scope.Nations
			}, {
				name: "PoliticalStatus",
				nameDisplay: "政治面貌",
				editor: "select",
				required: false,
				opts: $scope.PoliticalStatuses,
				value: "",
				originValue: $scope.PoliticalStatuses[0].Id
			}, {
				name: "BirthDate",
				nameDisplay: "出生日期",
				editor: "time-picker",
				required: false,
				value: $filter('date')('', "yyyy-MM-dd"),
				editable: false,
				originValue: ""
			}, {
				name: "MaritalStatus",
				nameDisplay: "婚姻状态",
				editor: "select",
				required: false,
				value: $scope.maritalStatus[0].Id,
				opts: $scope.maritalStatus,
				originValue: 1
			}, {
				name: "SocialSecurity",
				nameDisplay: "社保状态",
				editor: "select",
				required: false,
				value: $scope.socialsecurity[0].Id,
				opts: $scope.socialsecurity,
				originValue: 1
			}, {
				name: "Phone",
				nameDisplay: "联系电话",
				editor: "normal",
				required: false,
				value: "",
				originValue: "",
				onChanged: function(value) {
					if(value) {						
						if(PcService.isPhoneNumber(value)) {
							return;
						} else {
							this.value = "";
							layerAlert.autoclose("联系电话输入不正确,请重新输入!");
							return;
						}
					}

				}

			}, {
				name: "Population",
				nameDisplay: "人群类型",
				editor: "select",
				required: false,
				value: "",
				originValue: "",
				opts: $scope.Populations,
				originValue: 1
			}, {
				name: "PopulationType",
				nameDisplay: "重点人群类型",
				editor: "multiselect-string",
				required: true,
				value: "",
				opts: $scope.PeopleType,
				originValue: $scope.PeopleType[0].Id,
				column: 1
			}],
			[{
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
				name: "OccupancyCategory",
				nameDisplay: "居住类型",
				editor: "select",
				required: false,
				value: $scope.stayType[0].Id,
				opts: $scope.stayType,
				originValue: 1
			}, {
				name: "HouseholderRelation",
				nameDisplay: "与户主关系",
				editor: "select",
				required: false,
				value: $scope.matterList[0].Id,
				opts: $scope.matterList,
				originValue: 1
			}, {
				name: "DomicilePlace",
				nameDisplay: "户籍所在地",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}, {
				name: "HouseholdNature",
				nameDisplay: "户口性质",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}, {
				name: "WorkUnit",
				nameDisplay: "工作单位",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}],
			[{
				name: "Degree",
				nameDisplay: "最高学历",
				editor: "select",
				required: false,
				value: $scope.Education[0].Id,
				opts: $scope.Education,
				originValue: ""
			}, {
				name: "SchoolName",
				nameDisplay: "学校名称",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}, {
				name: "AcademicDuration",
				nameDisplay: "就读时间",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}],
			[
				[{
					name: "HighSchool",
					nameDisplay: "公司名称",
					editor: "normal",
					required: false,
					value: "",
					originValue: ""
				}, {
					name: "HighSchool",
					nameDisplay: "工作时间",
					editor: "normal",
					required: false,
					value: "",
					originValue: ""
				}, {
					name: "HighSchool",
					nameDisplay: "工作描述",
					editor: "textarea",
					required: false,
					value: "",
					originValue: "",
					column: 1
				}]
			]

		];

		//初始化居民信息表单
		var initFormList = function(fieldsList, exceptString) {
			fieldsList.forEach(function(_item, _index) {
				if(_index !== 3) {
					if(_item.length) {
						initFormList(_item, exceptString);
					} else {
						if(_item.editor === "multiselect-string") {
							_item.opts.forEach(function(item, index) {
								item.Checked = false;
							});
						} else {
							if(exceptString && _item.name === exceptString) {
								return;
							} else {
								_item.value = _item.originValue;
							}

						}

					}
				} else if(_item instanceof Object) {
					if(_item.editor === "multiselect-string") {
						_item.opts.forEach(function(item, index) {
							item.Checked = false;
						});
					} else {
						if(exceptString && _item.name === exceptString) {
							return;
						} else {
							_item.value = _item.originValue;
						}
					}
				}
			});
		};
		//时间插件

		//获取表单提交数据
		var getFormData = function(fieldsList) {
			var data = {};
			if(!!fieldsList && fieldsList.length > 0) {
				fieldsList.forEach(function(item, index) {
					item.forEach(function(_item, _index) {
						if(_item.editor === "four-select") {
							if(_item.value4 !== undefined) {
								data[_item.name] = _item.value4;
							} else {
								layerAlert.autoclose("房屋ID不能为空!");
							}
						} else if(_item.name === "BirthDate") {
							// data[_item.name] = _item.value ? new Date(_item.value).toDateString() : "";
							data[_item.name] = _item.value ? $filter('date')(_item.value, 'yyyy-MM-dd') : "";
							//console.log(data[_item.name])
						} else {
							data[_item.name] = _item.value;
						}
					});
				});
			}
			return data;
		};

		var submitWorkExperience = function(create, data, doAction, headers) {

			var method, url;
			switch(create) {
				case true:
					method = "post";
					url = serverUrls.inExperience;
					//doAction = "编辑";
					break;
				case false:
					method = "put";
					url = serverUrls.upExperience;
					doAction = "编辑";
					break;
			}
			$http({
				headers: headers,
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
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//判断Object属性是否全部为空
		var isAllUndefined = function(obj) {
			var isNUll = true;
			var WorkExperience = JSON.parse(obj.WorkExperience);
			WorkExperience.forEach(function(item, index) {
				for(var _item in item) {
					if(!!item[_item]) {
						isNUll = false;
						return isNUll;
					}
				}
			});
			for(var item in obj) {
				if(!!obj[item] && item !== "WorkExperience") {
					isNUll = false;
					return isNUll;
				}
			}
			return isNUll;
		};

		var formSubmit = function($scope, create, fieldsList, x, param, headers, tabIndex) {
			var method, data, url, doAction;
			var data = {};
			fieldsList.forEach(function(item, index) {
				if(index === 1 && (tabIndex === 2 || tabIndex === 3)) {
					return;
				}
				if(index !== 3) {
					data = $.extend(true, data, PcService.getFormData(item));
				} else {
					var newArray = [];
					item.forEach(function(_item, _index) {
						newArray.push({
							Name: _item[0].value,
							Time: _item[1].value,
							Description: _item[2].value
						});
					});
					data.WorkExperience = newArray;
				}

			});
			if(param) {
				data = $.extend(true, data, param);
			}

			var workExperienceData = {
				Degree: data.Degree,
				SchoolName: data.SchoolName,
				AcademicDuration: data.AcademicDuration,
				WorkExperience: JSON.stringify(data.WorkExperience) //,ResidentId: x.Id	
			};

			var isAllNull = isAllUndefined(workExperienceData);

			switch(create) {
				case true:
					method = "post";
					url = serverUrls.addResident;
					doAction = "新增";
					var Sex = data.Sex;
					//console.log('新增', data)
					if(Sex === 1) {
						data.Images = serverUrls.picMen;
					} else if(Sex === 2) {
						data.Images = serverUrls.picWomen;
					}
					data.PersonType = $scope.selectTab.Id;
					break;
				case false:
					method = "put";
					url = serverUrls.upResident;
					doAction = "编辑";
					data.Id = x.Id;
					data.PersonType = tabIndex; // x.PersonType;
					data.Population = x.Population;
					break;
			}
			$scope.ngDialogPromise = $http({
				headers: headers,
				method: method,
				url: url,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					if(isAllNull) {
						setTimeout(function() {
							ngDialog.closeAll();
						}, 1600);
						$scope.fetchData();
						return;
					}
					var _doAction = "";
					switch(create) {
						case true:
							_doAction = "新增";
							workExperienceData.ResidentId = response.Content;
							if(!isAllNull) {
								submitWorkExperience(true, workExperienceData, _doAction, headers);
							}
							break;
						case false:
							_doAction = "修 改";
							workExperienceData.ResidentId = response.Content;
							if(x.ExperienceId) {
								workExperienceData.Id = x.ExperienceId;
								submitWorkExperience(false, workExperienceData, _doAction, headers);
							} else {
								if(!isAllNull) {
									submitWorkExperience(true, workExperienceData, _doAction, headers);
								}

							}
							break;
					}

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});

		};

		//新增管理
		$scope.creatOne = function() {
			//var fieldsList = angular.copy($scope.fieldsList);
			var tabIndex = $scope.selectTab.Id;
			ngDialog.openConfirm({
				template: 'createOne',
				scope: $scope,
				controller: ['$scope', function($scope) {
					//$scope.fieldsList = fieldsList[0];
					$scope.column = 2;
					$scope.create = true;
					$scope.TitleText = "新增" + $scope.selectTab.Name;
					var initArray = [
						[{
							name: "HighSchool",
							nameDisplay: "公司名称",
							editor: "normal",
							required: false,
							value: "",
							originValue: ""
						}, {
							name: "HighSchool",
							nameDisplay: "工作时间",
							editor: "normal",
							required: false,
							value: "",
							originValue: ""
						}, {
							name: "HighSchool",
							nameDisplay: "工作描述",
							editor: "textarea",
							required: false,
							value: "",
							originValue: "",
							column: 1
						}]
					];
					$scope.fieldsList[3] = initArray;
					initFormList($scope.fieldsList);
					if($scope.selectTab.Id === 1) {
						getCourtyardList($scope);
					}
					//新增居民信息分组管理
					$scope.navTabList = [{
						Id: 1,
						Name: "基本信息",
						Active: true
					}, {
						Id: 2,
						Name: "居住信息",
						Active: false
					}, {
						Id: 3,
						Name: "教育经历",
						Active: false
					}, {
						Id: 4,
						Name: "工作经历",
						Active: false
					}];
					$scope.selectedItem = $scope.navTabList[0];
					var count = 0;
					if($scope.selectedItem == $scope.navTabList[0]) {
						setTimeout(function() {
							$("#datetime").datetimepicker({
								language: 'zh-CN',
								weekStart: 1,
								minView: "month",
								todayBtn: 1,
								autoclose: 1,
								todayHighlight: 1,
								startView: 2,
								forceParse: 0,
								format: "yyyy-mm-dd",
								showMeridian: 1
							}).on("click", function(ev) {
								$("#datetime").datetimepicker();
							});
						}, 200);

					}

					//增加工作经历
					$scope.addWorkExperience = function() {
						var n = $scope.fieldsList[3].length;
						if(n < 5) {
							var initArray = [{
								name: "HighSchool",
								nameDisplay: "公司名称",
								editor: "normal",
								required: false,
								value: "",
								originValue: ""
							}, {
								name: "HighSchool",
								nameDisplay: "工作时间",
								editor: "normal",
								required: false,
								value: "",
								originValue: ""
							}, {
								name: "HighSchool",
								nameDisplay: "工作描述",
								editor: "textarea",
								required: false,
								value: "",
								originValue: "",
								column: 1
							}];
							$scope.fieldsList[3].push(initArray);
						} else {
							layerAlert.autoclose("最多添加5项工作经历！");
							return;
						}

					};

					$scope.minusWorkExperience = function(index) {
						$scope.fieldsList[3].splice(index, 1);
					};

					//提交新增
					$scope.formSubmit = function() {
						var data = PcService.getFormData($scope.fieldsList[1]);
						// console.log('formSubmitdata',data)
						if(!data.HouseId && $scope.selectTab.Id === 1) {
							layerAlert.autoclose("请填写居住信息！");
							return;
						}
						formSubmit($scope, true, $scope.fieldsList, null, {}, $rootScope.pHeader, tabIndex);
					};

					//选项卡操作
					$scope.checked = function(x) {
						$scope.navTabList.forEach(function(item, index) {
							item.Active = false;
						});
						x.Active = true;
						$scope.selectedItem = x;

						if(x.Id == 1) {
							setTimeout(function() {
								$("#datetime").datetimepicker({
									language: 'zh-CN',
									weekStart: 1,
									minView: "month",
									todayBtn: 1,
									autoclose: 1,
									todayHighlight: 1,
									startView: 2,
									forceParse: 0,
									format: "yyyy-mm-dd",
									showMeridian: 1
								}).on("click", function(ev) {
									$("#datetime").datetimepicker();
								});
							}, 200);
							var value = $scope.fieldsList[0][5].value;
							if(value !== '') {
								$scope.fieldsList[0][5].value = $filter('date')(value, "yyyy-MM-dd")
							}

						}

					};
				}],
				className: 'ngdialog-theme-default',
				closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
			/*var deffered = $q.defer();
			var promises = deffered.promise;
			var param = {},
				moreTitle;

			var PersonType = $scope.PersonType;
			ngDialog.openConfirm({
				template: 'configOne',
				controller: ['$scope', function($scope) {
					$scope.TitleText = "选择新增人员类型";
					$scope.PersonType = PersonType;
					$scope.fieldsList = [{
						name: "PersonType",
						nameDisplay: "人员类型",
						editor: "select",
						required: false,
						value: $scope.PersonType[0].Id,
						opts: $scope.PersonType,
						originValue: 1
					}];

					$scope.formSubmit = function() {
						var PersonType = (PcService.getFormData($scope.fieldsList)).PersonType;
						param.PersonType = PersonType;
						ngDialog.close(0);
						$scope.PersonType.forEach(function(item, index) {
							if(item.Id === PersonType) {
								moreTitle = item.Name;
							}
						});
						deffered.resolve();
					};

				}],
				className: 'ngdialog-theme-default',
				closeByEscape: true,
				closeByDocument: false,
				width: 600
			});

			promises.then(function() {
				var fieldsList = $scope.fieldsList;
				bindFieldsListData($scope.fieldsList);
				var w = 850;
				$scope.create = true;
				
			});*/
		};

		//获取数据列表操作
		$scope.fetchData = function() {
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.residentList,
				params: $scope.searchOption,
				success: function(response) {
					$scope.list = response;
					var nowYear = new Date();
					if($scope.list.length > 0) {
						$scope.list.forEach(function(item, index) {

							item.Age = (nowYear - new Date(item.BirthDate)) / (365 * 24 * 3600000);
							if(item.Age < 1) {
								item.Age = Math.ceil(item.Age * 12) + "月";
							} else {
								item.Age = Math.floor(item.Age) + "岁";
							}
							if(item.BirthDate == null) {
								item.Age = "无";
							}
						});
					}
				},
				error: function(error) {
					layerAlert.autoclose(error);
				}
			});
		};

		$scope.fetchData();

		var getSuperior = function($scope, id, item) {
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
													if(item5.Id === FloorId) {
														item.opts4 = item5.Location;
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

		//居民信息添加
		var bindExperienceId = function(id, ExperienceId, lists) {
			lists.forEach(function(item, index) {
				if(item.Id === id) {
					item.ExperienceId = ExperienceId;
				}
			});
		};

		bindMultiData = function($scope, x, fieldsList) {
			fieldsList.forEach(function(item, index) {
				if(item.length) {
					bindMultiData($scope, x, item);
				} else {
					if(item.editor === "four-select") {
						item.value4 = x[item.name];
						var HouseId = item.value4;
						if(!!HouseId) {
							getSuperior($scope, HouseId, item);
						}
					} else if(item.name === "BirthDate") {
						item.value = $filter('date')(x[item.name], 'yyyy-MM-dd');
					} else if(item.editor === "multiselect-string") {
						//重点人群类型绑定数据
						var values = x.KeyPopulation;
						if(!values || values.length === 0) {
							item.opts.forEach(function(_item, _index) {
								_item.Checked = false;

							});
						} else {
							item.opts.forEach(function(_item, _index) {
								_item.Checked = false;
								values.forEach(function(v) {
									if(_item.Id === v.PopulationType) {
										_item.Checked = true;
										return;
									}
								});
							});
							//console.log(item.opts);
						}

					} else {
						item.value = x[item.name];
					}
				}
			});
		};
		/*|| !(JSON.parse(x.WorkExperience) instanceof Array)*/
		var bindArray = function(x, fieldsList) {
			if(!x.WorkExperience || !isJSON(x.WorkExperience)) {
				return;
			}
			var WorkExperience = JSON.parse(x.WorkExperience);
			if(WorkExperience.length < fieldsList.length) {
				for(var i = fieldsList.length; i > WorkExperience.length; i--) {
					fieldsList.splice(i - 1, 1);
				}
			}
			for(var i = 0; i < WorkExperience.length; i++) {
				fieldsList[i] = [{
					name: "HighSchool",
					nameDisplay: "公司名称",
					editor: "normal",
					required: false,
					value: WorkExperience[i].Name,
					originValue: ""
				}, {
					name: "HighSchool",
					nameDisplay: "工作时间",
					editor: "normal",
					required: false,
					value: WorkExperience[i].Time,
					originValue: ""
				}, {
					name: "HighSchool",
					nameDisplay: "工作描述",
					editor: "textarea",
					required: false,
					value: WorkExperience[i].Description,
					originValue: "",
					column: 1
				}];
			}
		};

		var bindFormData = function($scope, x1, x2, fieldsList) {
			bindExperienceId(x1.Id, x2.Id, $scope.list);
			delete x2.Id;
			var x = $.extend(true, x1, x2);
			fieldsList.forEach(function(item, index) {
				if(index !== 3) {
					bindMultiData($scope, x, item);
				} else {
					bindArray(x, item);
				}
			});
		};

		var openEditNgDialog = function(x, DegreeInfomation, fieldsList, w, tabIndex) {
			ngDialog.openConfirm({
				template: 'createOne',
				scope: $scope,
				controller: ['$scope', function($scope) {
					//$scope.fieldsList = fieldsList[0];
					$scope.column = 2;
					$scope.TitleText = "修改居民信息";
					$scope.create = false;

					//bindFieldsListData(fieldsList);
					if($scope.selectTab.Id === 1) {
						getCourtyardList($scope, x, DegreeInfomation, fieldsList);
					} else {
						var _x = $.extend(true, DegreeInfomation, x);
						fieldsList.forEach(function(item, index) {
							if(index === 1) {
								return;
							}
							if(index !== 3) {
								bindMultiData($scope, _x, item);
							} else {
								if(!_x.WorkExperience || !isJSON(_x.WorkExperience)) {
									item.forEach(function(ite, ind) {
										if(ind === 0) {
											PcService.initFormList(ite);
										} else {
											item.splice(1, 1);
										}
									});

									return;
								} else {
									bindArray(_x, item);
								}

							}
						});
					}

					//新增居民信息分组管理
					$scope.navTabList = [{
						Id: 1,
						Name: "基本信息",
						Active: true
					}, {
						Id: 2,
						Name: "居住信息",
						Active: false
					}, {
						Id: 3,
						Name: "教育经历",
						Active: false
					}, {
						Id: 4,
						Name: "工作经历",
						Active: false
					}];
					$scope.selectedItem = $scope.navTabList[0];

					if($scope.selectedItem == $scope.navTabList[0]) {
						setTimeout(function() {
							$("#datetime").datetimepicker({
								language: 'zh-CN',
								weekStart: 1,
								minView: "month",
								todayBtn: 1,
								autoclose: 1,
								todayHighlight: 1,
								startView: 2,
								forceParse: 0,
								format: "yyyy-mm-dd",
								showMeridian: 1
							}).on("click", function(ev) {
								$("#datetime").datetimepicker();
							});
						}, 200);

					}

					//增加工作经历
					$scope.addWorkExperience = function() {
						var n = $scope.fieldsList[3].length;
						if(n < 5) {
							var initArray = [{
								name: "HighSchool",
								nameDisplay: "公司名称",
								editor: "normal",
								required: false,
								value: "",
								originValue: ""
							}, {
								name: "HighSchool",
								nameDisplay: "工作时间",
								editor: "normal",
								required: false,
								value: "",
								originValue: ""
							}, {
								name: "HighSchool",
								nameDisplay: "工作描述",
								editor: "textarea",
								required: false,
								value: "",
								originValue: "",
								column: 1
							}];
							$scope.fieldsList[3].push(initArray);
						} else {
							layerAlert.autoclose("最多添加5项工作经历！");
							return;
						}

					};
					//删除
					$scope.minusWorkExperience = function(index) {
						$scope.fieldsList[3].splice(index, 1);
					};
					//提交编辑
					$scope.formSubmit = function() {
						formSubmit($scope, false, fieldsList, x, null, $rootScope.pHeader, tabIndex);
					};

					//选项卡操作
					$scope.checked = function(x) {
						$scope.navTabList.forEach(function(item, index) {
							item.Active = false;
						});
						x.Active = true;
						$scope.selectedItem = x;
						if($scope.selectedItem.Id === 1) {
							setTimeout(function() {
								$("#datetime").datetimepicker({
									language: 'zh-CN',
									weekStart: 1,
									minView: "month",
									todayBtn: 1,
									autoclose: 1,
									todayHighlight: 1,
									startView: 2,
									forceParse: 0,
									format: "yyyy-mm-dd",
									showMeridian: 1
								}).on("click", function(ev) {
									$("#datetime").datetimepicker();
								});
							}, 200);
						}
						//$scope.fieldsList = fieldsList[x.Id - 1];
					};
				}],
				className: 'ngdialog-theme-default',
				closeByEscape: true,
				closeByDocument: false,
				width: w
			});
		};

		//获取学历,工作经历信息
		var getDegreeInfomation = function(x, fieldsList, w, tabIndex) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.experienceDetails + "?id=" + x.Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var DegreeInfomation = response.Content;
					openEditNgDialog(x, DegreeInfomation, fieldsList, w, tabIndex);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//编辑管理
		$scope.editItem = function(x) {
			var fieldsList = $scope.fieldsList;
			$scope.create = false;
			var w = 850;
			var tabIndex = $scope.selectTab.Id;
			getDegreeInfomation(x, fieldsList, w, tabIndex);

		};

		//分配账号
		$scope.configItem = function(x) {
			var fetchData = $scope.fetchData;
			ngDialog.openConfirm({
				template: 'configOne',
				controller: ['$scope', function($scope) {
					$scope.fetchData = fetchData;
					$scope.TitleText = "分配账号";
					$scope.fieldsList = [{
						name: "phone",
						nameDisplay: "电话号码",
						editor: "normal",
						required: true,
						value: ""
					}];

					//更新居民头像
					var upDateImages = function($scope, x) {
						var images = x.Sex === 1 ? serverUrls.picMen : serverUrls.picWomen;
						$scope.ngDialogPromise = $http({
							headers: $rootScope.pHeader,
							method: 'get',
							url: serverUrls.apiImages + "?residentid=" + x.Id + "&images=" + images
						}).success(function(response) {
							var Code = response.State.Code;
							var Message = response.State.Message;
							if(Code === 0) {
								layerAlert.autoclose("分配成功!");
								$scope.closeThisDialog();
								setTimeout(function() {
									$scope.fetchData();
								}, 1600);
							} else {
								layerAlert.autoclose(Message);
							}
						}).error(function(error) {
							layerAlert.autoclose(PcService.errorResult(error));
						});
					};

					$scope.formSubmit = function() {
						$scope.ngDialogPromise = $http({
							method: 'get',
							url: serverUrls.allOcation + "?residentid=" + x.Id + "&phone=" + $scope.fieldsList[0].value
						}).success(function(response) {
							var Code = response.State.Code;
							var Message = response.State.Message;
							if(Code === 0) {
								if(!x.Images) {
									upDateImages($scope, x);
								} else {
									layerAlert.autoclose("分配成功!");
									$scope.closeThisDialog();
									setTimeout(function() {
										$scope.fetchData();
									}, 1600);
								}

							} else {
								layerAlert.autoclose(Message);
							}
						}).error(function(error) {
							layerAlert.autoclose(PcService.errorResult(error));
						});
					};
				}],
				className: 'ngdialog-theme-default',
				closeByEscape: true,
				closeByDocument: false,
				width: 600
			});

		};

		//启用停用
		$scope.toggleItem = function(x) {
			layerAlert.success("归档成功!");
		};

		//启用停用Class
		$scope.isToggle = function(x) {
			return {
				'btn-success': x.State === 0,
				'btn-warning': x.State === 1
			};
		};

		//启用停用Text
		$scope.toggleText = function(x) {
			var tText;
			switch(x.State) {
				case 0:
					tText = "启用";
					break;
				case 1:
					tText = "停用";
					break;
				default:
					tText = "归档";
					break;
			}
			return tText;
		};

		//居民信息详细（简历）
		$scope.detailItem = function(x) {
			$state.go("app.resume", {
				x: JSON.stringify(x)
			});
		};
	}
]);