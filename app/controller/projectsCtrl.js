App.controller('projectsCtrl', ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q) {
		$scope.list = [];
		$scope.searchOption = {
			code: ""
		};
		$scope.PcService = PcService;

		//强制更新
		$scope.Forceupdates = [{
			Id: "true",
			Name: "是"
		}, {
			Id: "false",
			Name: "否"
		}];

		$scope.newTite = "版本号";

		//选项卡
		$scope.navTabList = [{
			Id: 1,
			Name: "版本号管理",
			Active: true
		}, {
			Id: 2,
			Name: "APP类型",
			Active: false
		}];

		$scope.selectTab = $scope.navTabList[0];

		//选项卡选择操作
		$scope.checked = function(x) {
			$scope.navTabList.forEach(function(item, index) {
				if(item.Name === x.Name) {
					item.Active = true;
				} else {
					item.Active = false;
				}
			});
			if($scope.selectTab !== x) {
				$scope.selectTab = x;
				if(x.Id === 1) {
					$scope.newTite = "版本号";
				} else {
					$scope.newTite = "版本类型";
				}
				$scope.fetchData();
			}
		};

		$scope.fieldsList = [
			[{
				name: "VersionNo",
				nameDisplay: "版本号",
				editor: "normal",
				required: true,
				value: "",
				originValue: ""
			}, {
				name: "DeviceTypeId",
				nameDisplay: "版本类型",
				editor: "select",
				required: true,
				value: "",
				originValue: ""
			}, {
				name: "DownloadUrl",
				nameDisplay: "下载地址",
				editor: "normal",
				required: true,
				value: "",
				originValue: ""
			}, {
				name: "Forceupdate",
				nameDisplay: "强制更新",
				editor: "select",
				required: true,
				value: "",
				originValue: "false",
				opts: $scope.Forceupdates
			}, {
				name: "Descript",
				nameDisplay: "描述",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}],
			[{
				name: "Name",
				nameDisplay: "类型名称",
				editor: "normal",
				required: true,
				value: "",
				originValue: ""
			}, {
				name: "Code",
				nameDisplay: "类型识别码",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}]
		];

		//获取列表数据
		$scope.fetchData = function() {
			switch($scope.selectTab.Id) {
				case 1:
					url = serverUrls.versionList;
					break;
				case 2:
					url = serverUrls.deviceTypelist;
			}
			PcService.fetchData($scope, url, $scope.searchOption);
		};

		$scope.fetchData();

		//获取版本类型
		var getversionTypes = function($scope, name, deffered) {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.deviceTypelist + "?length=999&currentPage=1"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var list = response.Content.pagelist;
					if(list.length === 0) {
						layerAlert.autoclose("版本类型为空，请先新建版本类型！");
						return;
					}
					$scope.fieldsList[0].forEach(function(item, index) {
						if(item.name === name) {
							item.opts = list;
							item.originValue = list[0].Id;
						}
					});
					if(!!deffered) {
						deffered.resolve();
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
			if($scope.selectTab.Id === 1) {
				var deffered = $q.defer();
				getversionTypes($scope, "DeviceTypeId", deffered);
				var promises = deffered.promise;
				promises.then(function() {
					ngDialog.openConfirm({
						template: 'createOne',
						scope: $scope,
						controller: ["$scope", function($scope) {
							$scope.TitleText = "新增版本号";
							$scope.fieldsList = $scope.$parent.$parent.fieldsList[0];
							PcService.initFormList($scope.fieldsList);

							$scope.formSubmit = function() {
								PcService.formSubmit($scope, true, $scope.fieldsList, serverUrls.addVersion);
							};
						}],
						className: 'ngdialog-theme-default',
						//closeByEscape: true,
						closeByDocument: false,
						width: 600
					});
				}, function(value) {
					console.log(value);
				}, function(value) {
					console.log(value);
				});

			} else {
				ngDialog.openConfirm({
					template: 'createOne',
					scope: $scope,
					controller: ["$scope", function($scope) {
						$scope.TitleText = "新增App类型";
						$scope.fieldsList = $scope.$parent.$parent.fieldsList[1];
						PcService.initFormList($scope.fieldsList);

						$scope.formSubmit = function() {
							PcService.formSubmit($scope, true, $scope.fieldsList, serverUrls.adddEvictype);
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 600
				});
			}

		};

		//修改管理
		$scope.editItem = function(x) {
			if($scope.selectTab.Id === 1) {
				var deffered = $q.defer();
				getversionTypes($scope, "DeviceTypeId", deffered);
				var promises = deffered.promise;
				promises.then(function() {
					ngDialog.openConfirm({
						template: 'createOne',
						scope: $scope,
						controller: ["$scope", function($scope) {
							$scope.TitleText = "修改版本号";
							$scope.fieldsList = $scope.$parent.$parent.fieldsList[0];
							PcService.bindFormData(x, $scope.fieldsList);

							$scope.formSubmit = function() {
								PcService.formSubmit($scope, false, $scope.fieldsList, serverUrls.updateVersion, x);
							};
						}],
						className: 'ngdialog-theme-default',
						//closeByEscape: true,
						closeByDocument: false,
						width: 600
					});
				}, function(value) {
					console.log(value);
				}, function(value) {
					console.log(value);
				});
			} else {
				ngDialog.openConfirm({
					template: 'createOne',
					scope: $scope,
					controller: ["$scope", function($scope) {
						$scope.TitleText = "修改App类型";
						$scope.fieldsList = $scope.$parent.$parent.fieldsList[1];
						PcService.bindFormData(x, $scope.fieldsList);

						$scope.formSubmit = function() {
							PcService.formSubmit($scope, false, $scope.fieldsList, serverUrls.updEvictype, x);
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 600
				});
			}
		};
	}
]);