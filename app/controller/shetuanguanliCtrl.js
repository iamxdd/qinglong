App.controller("shetuanguanliCtrl", ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {
		$scope.list = [];
		$scope.TitleText = "新增";
		$scope.searchOption = {};
		$scope.PcService = PcService;

		//提交新增表单
		var formSubmit = function(create, fieldsList, id) {
			var data = PcService.getFormData(fieldsList);
			var ResentId = data.ResentId;
			var Superintendent = "";
			fieldsList[0].opts.map(function(v) {
				if(v.Id === ResentId) {
					Superintendent = v.Name;
					return;
				}
			});
			data.Superintendent = Superintendent;
			var url, method, actionText;
			if(!create) {
				data.Id = id;
				method = "put";
				url = serverUrls.upSociety;
				actionText = "修改";
			} else {
				method = "post";
				url = serverUrls.addSociety;
				actionText = "新增";

			}

			$scope.ngDialogPromise = $http({
				method: method,
				url: url,
				data: data
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
			}).error(function() {

			});
		};

		//新增社团管理
		$scope.creatOne = function() {
			var fieldsList = $scope.fieldsList;
			PcService.initFormList(fieldsList);
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ["$scope", function($scope) {
					$scope.TitleText = "新增";
					$scope.fieldsList = fieldsList;
					$scope.fieldsList[0].opts = [{
						Id: 0,
						Name: "请选择"
					}];
					$scope.fieldsList[0].value = 0;

					$scope.searchReident = function(value) {
						if(!value || $scope.fieldsList[0].opts.length > 1) {
							return;
						}
						$scope.ngDialogPromise = $http({
							method: 'get',
							url: serverUrls.searchList + "?value=" + value
						}).success(function(response) {
							var Code = response.State.Code;
							var Message = response.State.Message;
							if(Code === 0) {
								if(response.Content.length > 0) {
									var searchList = response.Content;
									$scope.fieldsList[0].opts = searchList;
									$scope.fieldsList[0].value = searchList[0].Id;
								} else {
									layerAlert.autoclose("当前条件下无匹配数据！");
								}

							} else {
								layerAlert.autoclose(Message);
							}
						}).error(function(error) {
							PcService.initFormList(fieldsList);
							layerAlert.autoclose(PcService.errorResult(error));
						});
					};

					//新增社团提交
					$scope.formSubmit = function() {

						formSubmit(true, $scope.fieldsList);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});
		};

		//编辑社团管理
		$scope.editItem = function(x) {
			var fieldsList = $scope.fieldsList;
			PcService.bindFormData(x, fieldsList);
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.fieldsList = fieldsList;
					$scope.fieldsList[0].opts = [{
						Id: 0,
						Name: "请选择"
					}];
					$scope.fieldsList[0].value = 0;
					$scope.TitleText = "修改";

					$scope.searchReident = function(value) {
						if(!value || $scope.fieldsList[0].opts.length > 1) {
							return;
						}
						$scope.ngDialogPromise = $http({
							method: 'get',
							url: serverUrls.searchList + "?value=" + value
						}).success(function(response) {
							var Code = response.State.Code;
							var Message = response.State.Message;
							if(Code === 0) {
								if(response.Content.length > 0) {
									var searchList = response.Content;
									$scope.fieldsList[0].opts = searchList;
									$scope.fieldsList[0].value = searchList[0].Id;
								} else {
									layerAlert.autoclose("当前条件下无匹配数据！");
								}

							} else {
								layerAlert.autoclose(Message);
							}
						}).error(function(error) {
							PcService.initFormList(fieldsList);
							layerAlert.autoclose(PcService.errorResult(error));
						});
					};

					$scope.formSubmit = function() {
						formSubmit(false, $scope.fieldsList, x.Id);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
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
			PcService.toggleItem($scope, x, serverUrls.societyState);
		};

		//获取社团管理数据列表
		$scope.fetchData = function() {
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.societyList,
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

		//性质列表
		$scope.nature = [{
			Id: 1,
			Name: "社会性质"
		}];

		//新增社团管理表单菜单列表
		$scope.fieldsList = [{
			name: "ResentId",
			nameDisplay: "选择负责人",
			editor: "select",
			required: true,
			value: '',
			opts: [{
				Id: 0,
				Name: "请选择"
			}],
			originValue: 0
		}, {
			name: "Name",
			nameDisplay: "社团名称",
			editor: "normal",
			required: true,
			value: "",
			originValue: ""
		}, {
			name: "Telephone",
			nameDisplay: "联系电话",
			editor: "normal",
			required: true,
			value: "",
			originValue: ""
		}, {
			name: "Nature",
			nameDisplay: "性质",
			editor: "select",
			required: true,
			value: "",
			opts: $scope.nature,
			originValue: $scope.nature[0].Id
		}, {
			name: "Describe",
			nameDisplay: "描述",
			editor: "textarea",
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
	}
]);