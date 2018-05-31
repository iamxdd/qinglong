App.controller('bannerNewsCtrl', ['$scope', '$rootScope', '$state', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q', '$filter',
	function($scope, $rootScope, $state, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q, $filter) {

		$scope.list = [];
		$scope.PcService = PcService;
		//筛选字段赋初值
		$scope.searchOption = {
			value: "",
			state: 0,
			position: 0,
		};
		$scope.statusSlect = [{
			Name: '全部',
			Id: 0
		}, {
			Name: '待审核',
			Id: 1
		}, {
			Name: '已通过',
			Id: 2
		}, {
			Name: '未通过',
			Id: 3
		}, {
			Name: '未提交',
			Id: 4
		}];
		//0--所有、1--待审核、2--已通过、3--未通过、4--待提交
		//检验名称
		var DevNameCheck = function(val) {
				var flag = true;
				var patternName = /^[\u4E00-\u9FA5a-zA-Z0-9_]{1,32}$/;
				if (patternName.test(val)) {
					flag = true;
				} else {
					flag = false;
				}
				return flag;
			}
			//检查数字
		var numberCheck = function(val) {
			var flag = true;
			var patternName = /(^[1-9]\d*$)/;
			if (patternName.test(val)) {
				flag = true;
			} else {
				flag = false;
			}
			return flag;
		};

		$scope.positionSelect = [];
		//删除广告
		$scope.deleteItem = function(x) {
			layerAlert.checkone("执行删除操作", function() {
				$scope.listBusyPromise = $http({
					headers: $rootScope.pHeader,
					method: 'delete',
					url: serverUrls.bannerDeleteById + "?id=" + x.Id
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					if (Code === 0) {
						layerAlert.autoclose("删除成功!");
						setTimeout(function() {
							$scope.fetchData();
						}, 1000);
					} else {
						layerAlert.autoclose(Message);
					}
				}).error(function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				});

			}, function() {}, "删除", "取消", true, true);

		};

		//开启关闭文本显示
		$scope.toggleText = function(x) {
			var _text = "";
			switch (x.OpenState) {
				case 2:
					_text = "开启";
					break;
				case 1:
					_text = "关闭";
					break;
				default:
					break;
			}
			return _text;
		};

		//开启关闭className
		$scope.isToggle = function(x) {
			return {
				'btn-success': x.OpenState === 2 || x.OpenState === 0 || !x.OpenState,
				'btn-danger': x.OpenState === 1
			};
		};

		//开启关闭
		$scope.toggleItem = function(x) {
			var OpenState = 0;
			var stateText = "";

			switch (x.OpenState) {
				case 1:
					OpenState = 2;
					stateText = "关闭";
					break;
				case 2:
					OpenState = 1;
					stateText = "开启";
				default:
					break;
			}

			if (OpenState !== 2 && OpenState !== 1) {
				return;
			}
			var data = {
				"Id": x.Id,
				"OpenState": OpenState
			}
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "put",
				url: serverUrls.bannerOpenclose,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					layerAlert.autoclose(stateText + "操作成功!");
					$scope.fetchData();
				} else {
					layerAlert.autoclose(Message);
				}

			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});

		};

		//广告详情
		$scope.detailItem = function(x) {
			$scope.DetailsData = JSON.stringify(x);
			$state.go("app.bannerNewsDetails", {
				object: $scope.DetailsData
			});
		};

		//获取位置
		var getCategorys = function($scope, deffered, num) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: 'get',
				url: serverUrls.bannerGetlistbyname
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					var arr = response.Content;
					if (arr.length > 0) {
						$scope.positionSelect = arr;
						if (num) {
							$scope.news.PositionId = $scope.positionSelect[0].Id;
						}
					}

					if (deffered) {
						deffered.resolve("success");
					}

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取banner列表
		$scope.fetchData = function() {
			var defered = $q.defer();
			var promised = defered.promise;
			getCategorys($scope, defered);
			if ($scope.positionSelect.length === 0) {
				getCategorys($scope, defered);
			} else {
				defered.resolve();
			}
			promised.then(function() {

				PcService.fetchData($scope, serverUrls.bannerGetlistbypage, $scope.searchOption, $rootScope.pHeader);

			}, function() {

			}, function() {

			});

		};
		$scope.fetchData();
		$scope.configImageAfterUpload = function(url) {
			if (url) {
				$scope.news.MainPic = url !== 'img/upload.png' ? url : "";
			} else {
				layerAlert.autoclose('上传图片失败，请稍后再试！');
			}
		}
		$scope.news = {};
		//判断提交表单是否为空
		var isNull = function($scope) {
			var a = false;
			$scope.news.MainPic = $scope.news.MainPic ? $scope.news.MainPic : "";
			$scope.news.Title = $scope.news.Title ? $scope.news.Title : "";
			$scope.news.Content = $scope.news.Content ? $scope.news.Content : "";
			$scope.news.OuterURL = $scope.news.OuterURL ? $scope.news.OuterURL : "";
			if ($scope.news.MainPic == '' || $scope.news.Title == '' || $scope.news.Content == '') {
				a = true;
			}
			return a;
		};
		//初始化新增项
		var initNewsForms = function(obj) {
			if (typeof obj === "object") {
				obj.Title = "";
				obj.Content = "";
				obj.MainPic = "";
				$scope.news.PositionId = 0;
				$scope.news.OrderNumber = "";
				$scope.news.OuterURL = "";

			}
		};
		//新增
		$scope.creatOne = function() {
			var defered = $q.defer();
			var promised = defered.promise;
			getCategorys($scope, defered, 1);
			if ($scope.positionSelect.length === 0) {
				getCategorys($scope, defered, 1);
			} else {
				defered.resolve();
			}

			ngDialog.openConfirm({
				template: "createOne",
				scope: $scope,
				controller: ['$scope', function($scope) {
					initNewsForms($scope.news);
					$scope.TitleText = "添加banner广告";

					$scope.formSubmit = function(isDraft) {
						if (isNull($scope)) {
							layerAlert.autoclose("表单不能为空!");
							return;
						}
						var Message = "";
						var param = {
							"Title": $scope.news.Title,
							"MainPic": $scope.news.MainPic,
							"PositionId": $scope.news.PositionId,
							"OrderNumber": parseInt($scope.news.OrderNumber),
							"OuterURL": $scope.news.OuterURL,
							"Content": $scope.news.Content,
						}
						if ($scope.news.OrderNumber == '') {
							param.OrderNumber = 0;
						}
						if ($scope.news.Title != '' || $scope.news.Title != undefined) {
							var DevNameFlag = DevNameCheck($scope.news.Title.replace(/\s/g, ""));
							if (!DevNameFlag) {
								layerAlert.autoclose('名称输入不合法,支持文字，数字，英文和下划线,请重新输入');

								return;
							}
						}
						if ($scope.news.OrderNumber != '') {
							var numberFlag = numberCheck(parseInt($scope.news.OrderNumber));
							if (isNaN(Number($scope.news.OrderNumber)) && !numberFlag) {
								layerAlert.autoclose('排序为数字且只能为正整数,请重新输入');
								return;
							}
						}
						console.log(param);
						if (isDraft) {
							Message = "新增";
							PcService.formSubmit($scope, true, [], serverUrls.addadbanner, null, param, $rootScope.pHeader, Message);

						} else {
							Message = "修改";
						}
					};
					$scope.closeDialog = function() {
						$scope.closeThisDialog();
					};
				}],
				className: 'ngdialog-theme-default',
				closeByDocument: false,
				width: 900,

			});

		};
		//修改
		$scope.editorItem = function(x) {
			var defered = $q.defer();
			var promised = defered.promise;

			if ($scope.positionSelect.length === 0) {
				getCategorys($scope, defered, 1);
			} else {
				defered.resolve();
			}
			$scope.news = angular.copy(x);
			$scope.defaultImageSrc = x.MainPic;
			ngDialog.openConfirm({
				template: "createTwo",
				scope: $scope,
				controller: ['$scope', function($scope) {
					$scope.TitleText = "修改banner广告";

					$scope.formSubmit = function(isDraft) {

						var Message = "";
						var param = {
							"Id": x.Id,
							"Title": $scope.news.Title,
							"MainPic": $scope.news.MainPic,
							"PositionId": $scope.news.PositionId,
							"OrderNumber": parseInt($scope.news.OrderNumber),
							"OuterURL": $scope.news.OuterURL,
							"Content": $scope.news.Content,
						}
						if ($scope.news.OrderNumber == '') {
							param.OrderNumber = 0;
						}
						if ($scope.news.Title != '' || $scope.news.Title != undefined) {
							var DevNameFlag = DevNameCheck($scope.news.Title.replace(/\s/g, ""));
							if (!DevNameFlag) {
								layerAlert.autoclose('名称输入不合法,支持文字，数字，英文和下划线,请重新输入');

								return;
							}
						}
						if ($scope.news.OrderNumber != '') {
							var numberFlag = numberCheck(parseInt($scope.news.OrderNumber));
							if (isNaN(Number($scope.news.OrderNumber)) && !numberFlag) {
								layerAlert.autoclose('排序为数字且只能为正整数,请重新输入');
								return;
							}
						}
						console.log(param);
						PcService.formSubmit($scope, false, [], serverUrls.updateadbanner, x, param, $rootScope.pHeader, Message);
					};
					$scope.closeDialog = function() {
						$scope.closeThisDialog();
					};
				}],
				className: 'ngdialog-theme-default',
				closeByDocument: false,
				width: 900,

			});
		}

	}
]);