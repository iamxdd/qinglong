App.controller("yuangongguanliCtrl", ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', '$filter', 'PcService',
	function($scope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, $filter, PcService) {
		$scope.list = [];
		$scope.TitleText = "新增";
		$scope.searchOption = {
			name: ""
		};

		//部门列表
		$scope.department = [{
			Id: 0,
			Name: "请选择"
		}];

		var bindFormOptions = function(name, fieldsList, opts) {
			fieldsList.forEach(function(item, index) {
				if(item.name === name) {
					item.opts = opts;
					item.originValue = opts[0].Id;
				}
			});
		};

		//分配账号
		$scope.configItem = function(x) {
			var fetchData = $scope.fetchData;
			ngDialog.openConfirm({
				template: 'configOne',
				controller: ['$scope', function($scope) {
					$scope.fetchData = fetchData;
					$scope.fieldsList = [{
						name: "phone",
						nameDisplay: "电话号码",
						editor: "normal",
						required: true,
						value: ""
					}];

					$scope.formSubmit = function() {
						$scope.ngDialogPromise = $http({
							method: 'get',
							url: serverUrls.allOcationf + "?personnelid=" + x.Id + "&phone=" + $scope.fieldsList[0].value
						}).success(function(response) {
							var Code = response.State.Code;
							var Message = response.State.Message;
							if(Code === 0) {
								layerAlert.autoclose("分配成功!");
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
				}],
				className: 'ngdialog-theme-default',
				closeByEscape: true,
				closeByDocument: false,
				width: 600
			});

		};
		var weeks = new Array("日", "一", "二", "三", "四", "五", "六");
		var weekDay = function(day) {
			var date = new Date(day);
			return '星期' + weeks[date.getDay()];
		};
		//员工工作轨迹传递数据
		var workingListGet = function($scope, params) {
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.workinggtrajectoryList,
				params: params,
				success: function(response) {
					$scope.new_list = response;
					if($scope.new_list.length !== 0) {
						$scope.new_list.map(function(v) {
							v.weekDay = weekDay(new Date(v.UploadAt));
						});
					}
				},
				error: function(error) {
					layerAlert.autoclose(error);
				}
			});
		};

		//员工工作轨迹查看详情
		$scope.workingList = function(x) {

			ngDialog.openConfirm({
				template: 'workList',
				//scope: $scope,
				controller: ['$scope', function($scope) {
					//员工轨迹列表筛选表单字段
					$scope.workfields = [{
						keyId: ''
					}, {
						nameDisplay: "发表时间",
						name: "startTimeAndendTime",
						name1: "startTime",
						name2: "endTime",
						value1: $filter('date')(new Date(), "yyyy-MM-dd 00:00"),
						value2: $filter('date')(new Date(), "yyyy-MM-dd 23:59"),
						editor: "double-datePick"
					}];
					$scope.TitleText = x.Name;

					var params = {
						startTime: $scope.workfields[1].value1,
						endTime: $scope.workfields[1].value2,
						empon: x.Empno
					};
					$scope.workfields[0].keyId = x.Empno;
					workingListGet($scope, params);
					//员工工作轨迹查询
					$scope.workListSure = function() {
						var params = {
							startTime: $scope.workfields[1].value1,
							endTime: $scope.workfields[1].value2,
							empon: $scope.workfields[0].keyId
						};
						//判断开始时间是否大于结束时间
						// var SurestartTime=(new Date(params.startTime)).getTime()/1000;
						// var SureendTime=(new Date(params.endTime)).getTime()/1000;
						// if(SurestartTime>SureendTime)
						//               return;
						workingListGet($scope, params);
					};
				}],

				className: 'ngdialog-theme-default',
				closeByEscape: true,
				closeByDocument: false,
				width: 700
			});

			//时间插件
			setTimeout(function() {
				$("#datetimeStart").datetimepicker({
					language: 'zh-CN',
					weekStart: 1,
					todayBtn: 1,
					autoclose: 1,
					todayHighlight: 1,
					startView: 2,
					forceParse: 0,
					format: "yyyy-mm-dd hh:ii",
					showMeridian: 1
				}).on("click", function(ev) {
					$("#datetimeStart").datetimepicker();
				});
				$("#datetimeEnd").datetimepicker({
					language: 'zh-CN',
					weekStart: 1,
					todayBtn: 1,
					autoclose: 1,
					todayHighlight: 1,
					startView: 2,
					forceParse: 0,
					format: "yyyy-mm-dd hh:ii",
					showMeridian: 1
				}).on("click", function(ev) {
					$("#datetimeEnd").datetimepicker();
				});
			}, 20);
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

		//岗位列表
		$scope.stations = [{
			Id: 0,
			Name: "请选择"
		}];

		//获取岗位列表
		var getStations = function(state, fieldsList) {
			$http({
				method: "get",
				url: serverUrls.positionAll + "?state=" + state
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var stations = response.Content;
					bindFormOptions("PositionId", fieldsList, stations);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

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

		//提交新增表单
		var formSubmit = function(create, fieldsList, id) {
			var data = getFormData(fieldsList);
			var title, url, method;
			if(create) {
				title = "新增";
				method = "post";
				url = serverUrls.addPersonnel;
			} else {
				title = "修改";
				method = "put";
				url = serverUrls.upPersonnel;
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

		var initFormList = function(fieldsList) {

			fieldsList.forEach(function(item, index) {
				item.value = item.originValue;
			});

		};

		var getMoreInfo = function($scope, fieldsList, value) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.getIdcardno + "?idcardno=" + value+"&personType="+2
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var param = response.Content;
					if(!param) {
						layerAlert.autoclose("该身份证号下无相关居民!");
						PcService.initFormList(fieldsList);
						return;
					}
					//param.IDCardNo = $scope.IDCardNo;
					if(param.Id) {
						delete param.Id;
					}
					PcService.bindFormData(param, fieldsList);

				} else {
					PcService.initFormList(fieldsList);
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				PcService.initFormList(fieldsList);
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//新增人员管理
		$scope.creatOne = function() {
			fieldsList = $scope.fieldsList;
			initFormList(fieldsList);
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ["$scope", function($scope) {
					$scope.fieldsList = fieldsList;
					$scope.TitleText = "新增";
					$scope.IDCardNo = "";
					$scope.create = true;
					var param = {};

					//提交新增
					$scope.formSubmit = function() {
						formSubmit(true, $scope.fieldsList);
					};

					$scope.getMoreInfo = function(value) {
						if(!!value) {
							getMoreInfo($scope, $scope.fieldsList, value);
						}
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
		};

		var bindFormList = function(x, fieldsList) {
			fieldsList.forEach(function(item, index) {
				item.value = x[item.name] ? x[item.name] : "";
			});
		};

		//编辑人员管理
		$scope.editItem = function(x) {
			var fieldsList = $scope.fieldsList;
			bindFormList(x, fieldsList);
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.fieldsList = fieldsList;
					$scope.TitleText = "修改";
					$scope.create = false;

					//提交编辑
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

		//获取人员管理数据列表
		$scope.fetchData = function() {
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.personnelList,
				params: $scope.searchOption,
				success: function(response) {
					if($scope.stations.length === 0 || ($scope.stations.length === 1 && $scope.stations[0].Id === 0)) {
						//0获取全部，1获取启用状态下
						getStations(0, $scope.fieldsList);
					}

					if($scope.department.length === 0 || ($scope.department.length === 1 && $scope.stations[0].Id === 0)) {
						getDepartment(0, $scope.fieldsList);
					}
					$scope.list = response;
				},
				error: function(error) {
					layerAlert.autoclose(error);
				}
			});
		};

		$scope.fetchData();

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

		$scope.numberTOText = function(id, _array) {
			var _text;
			_array.forEach(function(item, index) {
				if(item.Id === id) {
					_text = item.Name;
				}
			});
			return _text;
		};
		// $scope.fieldsList1=[
		//   {
		// 		name: "dataPicker1",
		// 		nameDisplay: "日期1",
		// 		editor: "time-picker",
		// 		required: false,
		// 		value: "2017-09-09",
		// 		// isModal:true,
		// 		editable: false,
		// 		originValue: ""
		// 	}
		// ]
		//新增人员管理表单菜单列表
		$scope.fieldsList = [{
				name: "Empno",
				nameDisplay: "编号",
				editor: "normal",
				required: true,
				value: "",
				originValue: ""
			},
			{
				name: "IDCardNo",
				nameDisplay: "身份证号码",
				editor: "normal",
				required: true,
				value: '',
				originValue: "",
				editable: true
			}, {
				name: "Name",
				nameDisplay: "姓名",
				editor: "normal",
				required: true,
				value: '',
				originValue: "",
				editable: true
			}, {
				name: "PositionId",
				nameDisplay: "岗位",
				editor: "select",
				required: false,
				value: "",
				opts: $scope.stations,
				originValue: $scope.stations[0].Id
			}, {
				name: "Sex",
				nameDisplay: "性别",
				editor: "select",
				required: false,
				value: "",
				opts: $scope.gender,
				originValue: $scope.gender[0].Id,
				editable: true
			}, {
				name: "OrganizationsId",
				nameDisplay: "所属部门",
				editor: "select",
				required: false,
				value: "",
				opts: $scope.department,
				originValue: $scope.department[0].Id
			}, {
				name: "Telephone",
				nameDisplay: "联系电话",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}, {
				name: "Sort",
				nameDisplay: "排序号",
				editor: "normal",
				required: false,
				value: "",
				originValue: 0
			}, {
				name: "Remark",
				nameDisplay: "备注",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}, {
				name: "Email",
				nameDisplay: "邮箱",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}
			// ,{
			// 	name: "dataPicker1",
			// 	nameDisplay: "日期1",
			// 	editor: "time-picker",
			// 	required: false,
			// 	value: "2017-09-09",
			// 	isModal:true,
			// 	editable: false,
			// 	originValue: ""
			// },{
			// 	name: "dataPicker2",
			// 	nameDisplay: "日期2",
			// 	editor: "time-picker",
			// 	required: false,
			// 	value: "2017-09-09",
			// 	isModal:true,
			// 	editable: false,
			// 	originValue: ""
			// }
		];
	}
]);