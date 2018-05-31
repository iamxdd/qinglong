App.controller('contentManagementCtrl', ['$scope', '$q', '$state', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $q, $state, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {
		$scope.list = [];
		$scope.TitleText = "新增";
		$scope.PcService = PcService;
		$scope.news = {
			ParentId: 0
		};
		$scope.searchOption = {
			value: "",
			type: 0,
			state: 0
		};

		$scope.OpenStates = [];

		$scope.types = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "未提交"
		}, {
			Id: 2,
			Name: "待审核"
		}, {
			Id: 3,
			Name: "已通过"
		}, {
			Id: 4,
			Name: "未通过"
		}];

		//是否显示置顶
		$scope.isToTop = function(x) {
			if(x.IsTop) {
				return true;
			}
			return false;
		};

		//是否显示编辑按钮
		$scope.isEdit = function(x) {
			if(x.State === 1) {
				return true;
			}
			return false;
		}

		//是否显示撤销按钮
		$scope.isCancel = function(x) {
			if(x.State === 2) {
				return true;
			}
			return false;
		}

		//是否显示删除按钮
		$scope.isDelete = function(x) {
			if(x.State === 1) {
				return true;
			}
			return false;
		}

		//获取所有用户列表
		$scope.fetchData = function() {
			PcService.fetchData($scope, serverUrls.toDoContentList, $scope.searchOption, $rootScope.pHeader);
		};

		//详情
		$scope.detailItem = function(x) {
			$state.go("app.contentDetails", {
				Id: x.Id
			});
		};

		//置顶文本显示
		$scope.topText = function(x) {
			var actionText = "";
			if(x.IsTop === 2) {
				actionText = "设为置顶";
			} else if(x.IsTop === 1) {
				actionText = "取消置顶";
			}
			return actionText;
		};

		//置顶class
		$scope.isTopToggle = function(x) {
			return {
				'btn-default': x.IsTop === 2 || x.OpenState === 0 || !x.IsTop,
				'btn-primary': x.IsTop === 1
			};
		};

		//置顶
		$scope.toplItem = function(x) {
			var IsTop = "",
				actionText = "";
			if(x.IsTop === 2) {
				IsTop = 1;
				actionText = "置顶";
			} else if(x.IsTop === 1) {
				IsTop = 2;
				actionText = "取消置顶";
			}
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: serverUrls.istopContent + "?id=" + x.Id + "&istop=" + IsTop
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose(actionText + "操作成功！");
					setTimeout(function() {
						$scope.fetchData();
					}, 1000);
				}
			}).error(function(error) {
				layerAlert.autoclose(errorResult(error));
			});
		};

		//获取所有分类
		var getAllCategory = function($scope, callback, defer) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: 'get',
				url: serverUrls.templateManageListChildAll
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.allCategory = response.Content;
					if($scope.allCategory.length === 0 && defer) {
						layerAlert.autoclose("暂无可用类型！");
						return;
					}
					if(callback) {
						callback();
					}
					if(defer) {
						defer.resolve();
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		getAllCategory($scope, $scope.fetchData);

		//初始化新增项
		var initNewsForms = function(obj, AllCatogrys) {
			if(typeof obj === "object") {
				obj.Title = "";
				obj.Images = "";
				obj.WorkTypeId = AllCatogrys ? AllCatogrys[0].Id : 0;
				obj.Content = "";
			}
		};

		//判断提交表单是否为空
		var isNull = function(obj) {
			if(obj.Title === "" || obj.WorkTypeId === "" || obj.Content === "") {
				return true
			}
			return false;
		};

		//撤销提交
		$scope.cancelItem = function(x) {
			layerAlert.checkone("取消提交操作", function() {
				$scope.listBusyPromise = $http({
					headers: $rootScope.pHeader,
					method: "get",
					url: serverUrls.issubmitContent + "?id=" + x.Id + "&state=2"
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					if(Code === 0) {
						layerAlert.autoclose("撤销操作成功！");
						setTimeout(function() {
							$scope.fetchData();
						}, 1000);
					}
				}).error(function(error) {
					layerAlert.autoclose(errorResult(error));
				});
			}, function() {}, "确定", "取消", true, true, "确定要取消吗？");
		};

		//新增
		$scope.creatOne = function() {
			var defer = $q.defer();
			var promised = defer.promise;
			getAllCategory($scope, null, defer);
			promised.then(function(value) {
				ngDialog.openConfirm({
					template: '_createOne',
					scope: $scope,
					controller: ["$scope", function($scope) {
						$scope.TitleText = "新增办事内容";
						var initArray = [];
						$scope.AllCatogrys = initArray.concat($scope.allCategory);
						initNewsForms($scope.news, $scope.AllCatogrys);

						$scope.configImageAfterUpload = function(url) {
							if(url) {
								$scope.news.Images = url !== 'img/upload.png' ? url : "";
							} else {
								layerAlert.autoclose('上传图片失败，请稍后再试！');
							}
						}
						$scope.formSubmit = function(isDraft) {
							if(isNull($scope.news)) {
								layerAlert.autoclose("表单不能为空!");
								return;
							}
							var param = {};
							param = $.extend(true, param, $scope.news);
							PcService.formSubmit($scope, true, [], serverUrls.inworkContent, null, param, $rootScope.pHeader);
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
			PcService.toggleStatus($scope, x, serverUrls.contentOpen);
		};

		//删除
		$scope.deleteItem = function(x) {

			layerAlert.checkone("执行删除操作", function() {
				PcService.deleteItem($scope, serverUrls.deContent, x, $rootScope.pHeader);
			}, function() {}, "确定", "取消", true, true);

		};

		//修改
		$scope.editItem = function(x) {
			var defer = $q.defer();
			var promised = defer.promise;
			getAllCategory($scope, null, defer);
			promised.then(function(value) {
				ngDialog.openConfirm({
					template: '_createOne',
					scope: $scope,
					controller: ["$scope", function($scope) {
						$scope.TitleText = "修改办事内容";
						var initArray = [];

						$scope.configImageAfterUpload = function(url) {
							if(url) {
								$scope.news.Images = url !== 'img/upload.png' ? url : "";
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
							PcService.formSubmit($scope, false, [], serverUrls.upworkContent, null, param, $rootScope.pHeader);
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