App.controller("gangweiguanliCtrl", ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {
		$scope.list = [];
		$scope.TitleText = "新增";
		$scope.create = false;
		$scope.PcService = PcService;
		$scope.searchOption = {
			name: ""
		};

		var getFormData = function(fieldsList) {
			var data = {};
			fieldsList.forEach(function(item, index) {
				data[item.name] = item.value;
			});
			return data;
		};

		//提交新增表单
		var formSubmit = function(create, fieldsList, id) {
			var doAction = "",
				url = "",
				method,
				data = getFormData(fieldsList);
			switch(create) {
				case true:
					doAction = "新增";
					method = "post";
					url = serverUrls.addPosition;
					break;
				case false:
					doAction = "编辑";
					method = "put";
					url = serverUrls.upPosition;
					data.Id = id;
					break;
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

		//新增岗位管理
		$scope.creatOne = function() {
			var fieldsList = $scope.fieldsList;
			initFormList(fieldsList);
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ["$scope", function($scope) {
					$scope.fieldsList = fieldsList;
					$scope.TitleText = "新增";
					$scope.create = true;

					$scope.formSubmit = function() {
						formSubmit(true, $scope.fieldsList);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false
			});
		};

		var bindFormData = function(x, fieldsList) {
			fieldsList.forEach(function(item, index) {
				item.value = x[item.name] ? x[item.name] : "";
			});
		};

		//编辑岗位管理
		$scope.editItem = function(x) {
			var fieldsList = $scope.fieldsList;
			bindFormData(x, fieldsList);
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.fieldsList = fieldsList;
					$scope.TitleText = "修改";
					$scope.create = false;

					$scope.formSubmit = function() {
						formSubmit(false, $scope.fieldsList, x.Id);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false
			});
		};

		//启用、停用
		$scope.toggleText = function(x) {
			var text;
			switch(x.OpenState) {
				case 1:
					text = "停用";
					break;
				case 2:
					text = "启用";
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
			var actionText;
			var state;
			if(x.OpenState === 1) {
				actionText = "停用";
				state = 2;
			} else {
				actionText = "启用";
				state = 1;
			}

			if(state !== 2 && state !== 1) {
				return;
			}

			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.positionState + "?id=" + x.Id + "&state=" + state
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose(actionText + "操作成功！");
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

		//获取岗位管理列表数据
		$scope.fetchData = function() {
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.positionList,
				params: $scope.searchOption,
				success: function(response) {
					$scope.list = response;
				},
				error: function(error) {
					layerAlert.autoclose(error);
				}
			});
		};

		$scope.fetchData();

		//学历列表
		$scope.education = [{
			Id: 1,
			Name: "其他"
		}, {
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

		//数字转文字
		$scope.numberToText = function(id, _array) {
			var _text = "";
			_array.forEach(function(item, index) {
				if(item.Id === id) {
					_text = item.Name;
				}
			});
			return _text;
		};

		//新增岗位管理表单菜单列表
		$scope.fieldsList = [{
			name: "Name",
			nameDisplay: "岗位名称",
			editor: "normal",
			required: true,
			value: "",
			originValue: ""

		}, {
			name: "Population",
			nameDisplay: "定编人数",
			editor: "normal",
			required: true,
			value: "",
			originValue: ""
		}, {
			name: "Degree",
			nameDisplay: "学历要求",
			editor: "select",
			required: true,
			value: "",
			opts: $scope.education,
			originValue: $scope.education[0].Id
		}, {
			name: "Remark",
			nameDisplay: "备注",
			editor: "normal",
			required: true,
			value: "",
			originValue: ""
		}, {
			name: "Sort",
			nameDisplay: "排序号",
			editor: "normal",
			required: true,
			value: "",
			originValue: 0
		}];

	}
]);