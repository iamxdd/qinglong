App.controller('bannerNewsDetailsCtrl', ['$scope', '$stateParams', '$rootScope', '$state', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q', '$filter',
	function($scope, $stateParams, $rootScope, $state, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q, $filter) {

		var ParamsId = JSON.parse($stateParams.object).Id;
		$scope.positionSelect = [];
		$scope.fetchData = function() {
			$http({
				headers: $rootScope.pHeader,
				method: "get",
				url: serverUrls.bannerGetByid + "?id=" + ParamsId
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					$scope.DetailsData = response.Content;
				} else {
					layerAlert.autoclose(Message);
				}

			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		}
		$scope.fetchData();
		$scope.tdClass = function(value) {
			var classStyle = '';
			switch (value) {
				//1--待审核、2--已通过、3--未通过、4--待提交
				case 1:
					classStyle = 'todoAudit';
					break;
				case 2:
					classStyle = 'passAudit';
					break;
				case 3:
					classStyle = 'noAudit';
					break;
				case 4:
					classStyle = 'nosubmit';
					break;
				default:
					break;
			}
			return classStyle;
		};
		$scope.bannerNew = {};
		$scope.news = {};
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

		$scope.bannerBtn = function(number) {
			$scope.bannerNew = {};
			ngDialog.openConfirm({
				template: 'createTwo',
				scope: $scope,
				controller: ["$scope", function($scope) {
					var param = '';
					var url = '';
					var message = '';

					$scope.formSubmit = function() {
						switch (number) {
							case 1:
								//提交
								param = {
									"Id": $scope.DetailsData.Id,
									"Remarks": $scope.bannerNew.Remarks
								};
								url = serverUrls.bannerSubmit;
								message = "提交";
								break
							case 2:
								//不通过
								param = {
									"Id": $scope.DetailsData.Id,
									"ReviewState": 3,
									"Remarks": $scope.bannerNew.Remarks
								};
								url = serverUrls.bannerReview;
								message = "不通过";
								break;
							case 3:
								//通过
								param = {
									"Id": $scope.DetailsData.Id,
									"ReviewState": 2,
									"Remarks": $scope.bannerNew.Remarks
								};
								url = serverUrls.bannerReview;
								message = "通过";
								break;
							default:
								break;
						}

						bannerF($scope, param, url, message);
					}
					$scope.closeDialog = function() {
						ngDialog.closeAll();
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});

		};
		var bannerF = function($scope, param, url, message) {
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: "post",
				url: url,
				data: param
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					layerAlert.autoclose(message + "操作成功！");
					ngDialog.closeAll();
					if (message != "提交") {
						$scope.fetchData();
					} else {
						$state.go("app.bannerNews", {
							reload: true
						});
					}

				} else {

					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//删除广告
		$scope.deleteItem = function() {
			layerAlert.checkone("执行删除操作", function() {
				$scope.listBusyPromise = $http({
					headers: $rootScope.pHeader,
					method: 'delete',
					url: serverUrls.bannerDeleteById + "?id=" + $scope.DetailsData.Id
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					if (Code === 0) {
						layerAlert.autoclose('删除操作成功');
						$state.go("app.bannerNews", {
							reload: true
						});
					} else {
						layerAlert.autoclose(Message);
					}
				}).error(function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				});

			}, function() {}, "删除", "取消", true, true);

		};
		//修改
		var editorBanner = function(param, $scope) {
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: "put",
				url: serverUrls.updateadbanner,
				param: param
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					layerAlert.autoclose("提交操作成功！");

				} else {

					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//修改
		$scope.editorItem = function() {
			var defered = $q.defer();
			var promised = defered.promise;

			if ($scope.positionSelect.length === 0) {
				getCategorys($scope, defered, 1);
			} else {
				defered.resolve();
			}
			$scope.news = angular.copy($scope.DetailsData);
			$scope.defaultImageSrc = $scope.DetailsData.MainPic;
			ngDialog.openConfirm({
				template: "createEditor",
				scope: $scope,
				controller: ['$scope', function($scope) {
					$scope.TitleText = "修改banner广告";

					$scope.formSubmit = function(isDraft) {

						var Message = "";
						var param = {
							"Id": $scope.DetailsData.Id,
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
						editorBanner(param, $scope);
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