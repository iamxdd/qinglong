App.controller('singlecommoditySurveyCtrl', ['$scope', '$state', '$q', '$stateParams', 'serverUrls', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', '$filter', 'PcService',
	function($scope, $state, $q, $stateParams, serverUrls, $rootScope, $http, ngDialog, PagerExtends, layerAlert, $filter, PcService) {
		$scope.list = [];
		$scope.newList = JSON.parse($stateParams.object);
		$scope.searchOption = {
			// 商品类型
			sellType: 0,
			// 优惠券类型
			couponType: 0,
			// 审核状态
			reviewState: 0,
			// 上架状态
			shelfState: 0,
			// 店铺ID
			shopId: $scope.newList.Id,
			startAt: $filter('date')("", "yyyy-MM-dd"),
			endAt: $filter('date')("", "yyyy-MM-dd"),
			// 关键字
			value: '',
			flag: true
		};

		$scope.PcService = PcService;
		console.log('$scope.title', $scope.newList)
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
		//状态
		$scope.shelfState = [{
			value: '全部',
			index: 0
		}, {
			value: '待上架',
			index: 1
		}, {
			value: '上架中',
			index: 2
		}, {
			value: '已下架',
			index: 3
		}, {
			value: '已失效',
			index: 4
		}];
		//券类型

		$scope.couponType = [{
			value: '全部',
			index: 0
		}, {
			value: '折扣券',
			index: 1
		}, {
			value: '抵用券',
			index: 2
		}, {
			value: '满减券',
			index: 3
		}, {
			value: '礼品券',
			index: 4
		}];
		$scope.CouponTypes = [{
			Name: '折扣券',
			Id: 1
		}, {
			Name: '抵用券',
			Id: 2
		}, {
			Name: '满减券',
			Id: 3
		}, {
			Name: '礼品券',
			Id: 4
		}];

		//查看详情
		$scope.seeDetail = function(x) {
			var newarr = {
				type: 'single',
				List: x
			};
			$scope.DetailsData = JSON.stringify(newarr);
			$state.go("app.shelvesManagementDetails", {
				object: $scope.DetailsData
			});
		};

		//已失效
		$scope.ShelfStates = [{
			Id: 1,
			Name: "待上架"
		}, {
			Id: 2,
			Name: "上架中"
		}, {
			Id: 3,
			Name: "已下架"
		}];
		//商品概览分页
		$scope.fetchData = function() {
			if(!!$scope.searchOption.endAt && !!$scope.searchOption.startAt &&
				new Date($scope.searchOption.endAt) < new Date($scope.searchOption.startAt)) {
				layerAlert.autoclose("结束时间必须大于开始时间！");
				return;
			}
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.couponlist,
				params: $scope.searchOption,
				success: function(response) {
					$scope.list = response;
					/*$scope.list.map(function(v) {
						if(v.ShelfState == 1) {
							v.ShelfState = '待上架';
						} else if(v.ShelfState == 2) {
							v.ShelfState = '上架中';
						} else if(v.ShelfState == 3) {
							v.ShelfState = '已下架';
						} else {
							v.ShelfState = '已失效';
						}
						if(v.CouponType == 1) {
							v.CouponType = '折扣券';

						} else if(v.CouponType == 2) {
							v.CouponType = '抵用券';

						} else if(v.CouponType == 3) {
							v.CouponType = '满减券';

						} else if(v.CouponType == 4) {
							v.CouponType = '礼品券';
						}

						if(v.ShopSellType == 1) {
							v.ShopSellType = "居家生活";
						} else if(v.ShopSellType == 2) {
							v.ShopSellType = "交通";
						} else if(v.ShopSellType == 3) {
							v.ShopSellType = "服装";

						} else if(v.ShopSellType == 4) {
							v.ShopSellType = "美食";

						}
					})*/
				},
				error: function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				}
			}, $rootScope.pHeader);

		};
		$scope.fetchData();
		$scope.tdClass = function(value) {
			var classStyle = ''
			switch(value) {
				case 1:
					classStyle = ' label-warning';
					break;
				case 2:
					classStyle = ' label-success';
					break;
				case 3:
					classStyle = ' label-danger';
					break;
				default:
					break;
			}
			return classStyle;
		}

	}
]);