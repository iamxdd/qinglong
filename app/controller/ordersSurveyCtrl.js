App.controller('ordersSurveyCtrl', ['$scope', '$state','$q', 'serverUrls', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', '$filter', 'PcService', 
function($scope,$state, $q, serverUrls, $rootScope, $http, ngDialog, PagerExtends, layerAlert, $filter, PcService) {
	$scope.list = [];
	$scope.shopId=[];
	$scope.PcService = PcService;
	$scope.searchOption = {
		 // 商品类型
		// state: 0,
		// 店铺ID
		shopId:0,
		// 优惠券类型
		// couponType:0,
		startAt: $filter('date')("", "yyyy-MM-dd"),
		endAt: $filter('date')("", "yyyy-MM-dd"),
		// 关键字
		value: '',
	};
	//时间插件  开始时间	
	$("#startAttime").datetimepicker({
		language: 'zh-CN',
		weekStart: 1,
		minView: "month",
		todayBtn: 1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		forceParse: 0,
		format: "yyyy-mm-dd",
		showMeridian: 1
	}).on("click", function(ev) {
		$("#startAttime").datetimepicker();
	});
	
	//时间插件  结束时间	
	$("#endAtAttime").datetimepicker({
		language: 'zh-CN',
		weekStart: 1,
		minView: "month",
		todayBtn: 1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		forceParse: 0,
		format: "yyyy-mm-dd",
		showMeridian: 1
	}).on("click", function(ev) {
		$("#endAtAttime").datetimepicker();
	});

	//查看详情
	$scope.seeDetail = function(x) {
		$scope.DetailsData = JSON.stringify(x);
		$state.go("app.ordersManagementDetail", {
			object: $scope.DetailsData
		});
	};
     //获取店铺名称
	var getCategorys = function($scope, deffered) {	
		$scope.listBusyPromise = $http({
			headers: $rootScope.pHeader,
			method: 'get',
			url: serverUrls.ShopGetListByName+"?name="+ ''
		}).success(function(response) {
			var Code = response.State.Code;
			var Message = response.State.Message;
			if(Code === 0) {
				var newarr = response.Content.unshift({
										Id:0,
										Name:'全部'
									});
				$scope.shopId = response.Content;
				if(deffered) {
					deffered.resolve("success");
				}
			} else {
				layerAlert.autoclose(Message);
			}
		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});
	};

   //商品概览分页
	$scope.fetchData = function() {
		var defered = $q.defer();
		var promises = defered.promise;
		if($scope.shopId.length == 0) {
			getCategorys($scope, defered);
		} else {
			defered.resolve();
		}
		promises.then(function() {
			console.log('$scope.searchOption',$scope.searchOption);
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.shopcouponorderlist,
				params: $scope.searchOption,
				success: function(response) {
					$scope.list = response;
					console.log('$scope.searchOption',$scope.searchOption,response);

				},
				error: function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				}
			}, $rootScope.pHeader);
		}, function(value) {
			console.log(value);
		}, function(value) {
			console.log(value);
		});

   };
   $scope.fetchData();
}]);