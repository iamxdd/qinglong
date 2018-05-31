App.controller('evaluationSurveyCtrl', ['$scope', '$q', '$state', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $q, $state, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {
		$scope.list = [];
		//店铺列表
		$scope.shopNameList = [{
			Id: 0,
			Name: "全部"
		}];

		$scope.searchOption = {
			value: "",
			startTime: "",
			endTime: "",
			shopId:0
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
					apiUrl: serverUrls.GetOrderEvaluationGeneralViewList,
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
		//评价明细
		$scope.detailItem = function(x) {
			$state.go("app.evaluationSurveyDetail", {
				Id: x.ShopId
			});
		};

	}
]);