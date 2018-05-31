App.controller('scoresSurveyCtrl',  ['$scope', '$state','$q', 'serverUrls', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', '$filter', 'PcService', 
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

		//店铺列表
		$scope.Shops = [{
			Id: 0,
			Name: "全部"
		}];

		//星级列表
		$scope.Stars = [{
			Id: 0,
			Name: "全部"
		}];

		//券类型列表
		$scope.CardTypes = [{
			Id: 0,
			Name: "全部"
		}];
		//获取评价列表
		$scope.fetchData = function() {
			/*PcService.fetchData($scope);*/
		};

		$scope.fetchData();

		//评价明细
		$scope.seeDetail = function(x) {
			$state.go("app.scoresDetail", {
				Id: x.Id
			});
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
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.shopcouponorderlist,
				params: $scope.searchOption,
				success: function(response) {
					$scope.list = response;

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
	}
]);