App.controller('templateManagementCtrl', ['$scope', '$q', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $q, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {
		$scope.list = [];
		$scope.TitleText = "新增";
		$scope.PcService = PcService;
		$scope.news = {
			ParentId: 0
		};
		$scope.searchOption = {
			value: ""
		};

		//获取所有用户列表
		$scope.fetchData = function() {
			PcService.fetchData($scope, serverUrls.templateManageListAll, $scope.searchOption, $rootScope.gHeader);
		};

		$scope.fetchData();

		//获取所有分类
		var getAllCategory = function($scope, deffered) {
			$scope.listBusyPromise = $http({
				method: 'get',
				url: serverUrls.templateManageLists
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.allCategory = response.Content;
					deffered.resolve();
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//初始化新增项
		var initNewsForms = function(obj) {
			if(typeof obj === "object") {
				obj.Name = "";
				obj.Sort = "";
				obj.Icons = "";
				obj.ParentId = 0;
				obj.State = 0;
				obj.Remarks = "";
				obj.LinkUrl = "";
			}
		};

		$scope.AllStates = [{
			Id: 0,
			Name: "H5"
		}, {
			Id: 1,
			Name: "APP"
		}];

		//判断提交表单是否为空
		var isNull = function(obj) {
			if(obj.Name === "" || obj.Sort === "" || obj.Icons === "" || obj.ParentId === "" || (obj.State === 0 && obj.LinkUrl === "")) {
				return true;
			}
			return false;
		};

		//新增
		$scope.creatOne = function() {
			var defer = $q.defer();
			var promised = defer.promise;
			getAllCategory($scope, defer);
			promised.then(function(value) {
				ngDialog.openConfirm({
					template: '_createOne',
					scope: $scope,
					controller: ["$scope", function($scope) {

						var initArray = [{
							Id: 0,
							Name: "顶级"
						}];
						$scope.configImageAfterUpload = function(url) {
							if(url) {
								$scope.news.Icons = url !== 'img/upload.png' ? url : "";
							} else {
								layerAlert.autoclose('上传图片失败，请稍后再试！');
							}
						}
						$scope.AllCatogrys = initArray.concat($scope.allCategory);
						initNewsForms($scope.news);
						$scope.formSubmit = function(isDraft) {
							if(isNull($scope.news)) {
								layerAlert.autoclose("表单不能为空!");
								return;
							}
							var param = {};
							param = $.extend(true, param, $scope.news);
							PcService.formSubmit($scope, true, [], serverUrls.inTemplateManage, null, param, $rootScope.pHeader);
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 900
				});
			}, function(value) {

			}, function(value) {

			});

		};

		//启用停用
		$scope.toggleStatus = function(x) {
			PcService.toggleItem($scope, x, serverUrls.toggleTemplateManage);
		};

		//删除
		$scope.deleteItem = function(x) {
			layerAlert.checkone("执行删除操作", function() {
				PcService.deleteItem($scope, serverUrls.deleteTemplateManage, x, $rootScope.pHeader);
			}, function() {}, "确定", "取消", true, true);
		};

		//修改
		$scope.editItem = function(x) {
			var defer = $q.defer();
			var promised = defer.promise;
			getAllCategory($scope, defer);
			promised.then(function(value) {
				ngDialog.openConfirm({
					template: '_createOne',
					scope: $scope,
					controller: ["$scope", function($scope) {

						var initArray = [{
							Id: 0,
							Name: "顶级"
						}];

						$scope.configImageAfterUpload = function(url) {
							if(url) {
								$scope.news.Icons = url !== 'img/upload.png' ? url : "";
							} else {
								layerAlert.autoclose('上传图片失败，请稍后再试！');
							}
						}
						$scope.AllCatogrys = initArray.concat($scope.allCategory);
						$scope.news = angular.copy(x);
						$scope.formSubmit = function(isDraft) {
							if(isNull($scope.news)) {
								layerAlert.autoclose("表单不能为空!");
								return;
							}
							var param = {};
							param = $.extend(true, param, $scope.news);
							PcService.formSubmit($scope, false, [], serverUrls.upTemplateManage, null, param, $rootScope.pHeader);
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 900
				});
			}, function(value) {

			}, function(value) {

			});
		}

	}
]);