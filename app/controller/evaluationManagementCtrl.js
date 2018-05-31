App.controller('evaluationManagementCtrl', ['$scope', '$q', '$state', '$stateParams', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $q, $state, $stateParams, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {
		$scope.list = [];
		//店铺列表
		$scope.shopNameList = [{
			Id: 0,
			Name: "全部"
		}];
		$scope.evaluateGradeSelect = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "1颗星"
		}, {
			Id: 2,
			Name: "2颗星"
		}, {
			Id: 3,
			Name: "3颗星"
		}, {
			Id: 4,
			Name: "4颗星"
		}, {
			Id: 5,
			Name: "5颗星"
		}];
		$scope.searchOption = {
			value: "",
			startTime: "",
			endTime: "",
			evaluateGrade: 0,
			shopId: 0
		};

		/*时间插件*/
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

		if (!$stateParams.Id) {
			$scope.isDetail = false;
		} else {
			$scope.isDetail = true;
		}

		//获取店铺名称
		var getShopName = function($scope, defered) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: 'get',
				url: serverUrls.ShopGetListByName
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					var arr = response.Content;
					if (arr.length > 0) {
						arr.map(function(v) {
							$scope.shopNameList.push({
								"Id": v.Id,
								"Name": v.Name
							});
						});

					}
					if (defered) {
						defered.resolve("success");
					}

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取列表
		$scope.fetchData = function() {
			var defered = $q.defer();
			var promises = defered.promise;

			if ($scope.shopNameList.length === 1) {
				getShopName($scope, defered);
			} else {
				defered.resolve();
			}
			promises.then(function() {
				PagerExtends.regListSpecifyPage($scope, {
					apiUrl: serverUrls.OrderEvaluationManageList,
					params: $scope.searchOption,
					success: function(response) {
						$scope.list = response;

					},
					error: function(error) {
						layerAlert.autoclose(errorResult(error));
					}
				}, $rootScope.pHeader);
			}, function(value) {
				console.log(value);
			}, function(value) {
				console.log(value);
			});

		};

		$scope.fetchData();
		//通过评价Id获取评价详情
		$scope.heading = 0;
		$scope.DetailData = {};
		$scope.seeItem = function(x, _index) {
			var hasHeading = false;
			var headingIndex = 0;
			var hasHeading = false;
			var headingIndex = 0;
			$scope.list.forEach(function(item, index) {
				if (item.heading) {
					$scope.list.splice(index, 1);
					hasHeading = true;
					headingIndex = index;

				}
			});
			if (_index === headingIndex - 1) {
				return;
			} else if (_index < headingIndex) {
				_index++;
			}
			if (!hasHeading) {
				_index++;
			}
			var id = x.Id;
			$scope.heading = 1;
			$scope.DetailData = angular.copy(x);
			var imgList = $scope.DetailData.EvaluateImages;
			if (imgList != null &&  imgList != "" && imgList != 'string') {
				imgList = imgList.split(",");
				$scope.DetailData.imgList = imgList.slice(0, 4);
			}
			var arr = [];
			arr.push($scope.DetailData);
			var itemObj = {
				heading: true,
				list: arr
			};
			$scope.list.splice(_index, 0, itemObj);

		};
		//评价审核 通过不通过

		$scope.bannerBtn = function(number, Id) {
			$scope.evaluationNew = {}
			ngDialog.openConfirm({
				template: 'createTwo',
				scope: $scope,
				controller: ["$scope", function($scope) {
					var param = '';
					var url = '';
					var message = '';

					$scope.formSubmit = function() {
						switch (number) {

							case 2:
								//不通过
								param = {
									"OrderEvaluationId": $scope.DetailData.Id,
									"ReviewState": 3,
									"Remarks": $scope.evaluationNew.Remarks
								}
								message = "不通过";
								break;
							case 3:
								//通过
								param = {
									"OrderEvaluationId": $scope.DetailData.Id,
									"ReviewState": 2,
									"Remarks": $scope.evaluationNew.Remarks
								};
								message = "通过";
								break;
							default:
								break;
						}
						url = serverUrls.OrderEvaluationReview;
						
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
					$scope.fetchData();

				} else {

					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
	}
	
]);