App.controller('auditManagementCtrl', ['$scope', '$state', '$q', 'serverUrls', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', '$filter', 'PcService',
	function($scope, $state, $q, serverUrls, $rootScope, $http, ngDialog, PagerExtends, layerAlert, $filter, PcService) {
		$scope.list = [];
		$scope.PcService = PcService;
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
		$scope.sellType = [{
			index: 0,
			value: '全部'
		}, {
			index: 1,
			value: '居家生活'
		}, {
			index: 2,
			value: '交通'
		}, {
			index: 3,
			value: '服装'
		}, {
			index: 4,
			value: '美食'
		}];
		//状态
		$scope.reviewState = [{
			value: '全部',
			index: 0
		}, {
			value: '待审核',
			index: 1
		}, {
			value: '已通过',
			index: 2
		}, {
			value: '未通过',
			index: 3
		}];
		//状态
		$scope.shelfState = [{
			value: '全部',
			index: 0
		}, {
			value: '待上架',
			index: 1
		}, {
			value: '已上架',
			index: 2
		}, {
			value: '已下架',
			index: 3
		}];
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
			shopId: 0,
			startAt: $filter('date')("", "yyyy-MM-dd"),
			endAt: $filter('date')("", "yyyy-MM-dd"),
			// 关键字
			value: '',
			flag: true
		};
		$scope.shopId = [];
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
			var newarr = {
				type: 'audit',
				List: x
			};
			$scope.DetailsData = JSON.stringify(newarr);
			$state.go("app.shelvesManagementDetails", {
				object: $scope.DetailsData
			});
		};
		//获取店铺名称
		var getCategorys = function($scope, deffered) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: 'get',
				url: serverUrls.ShopGetListByName + "?name=" + ''
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var newarr = response.Content.unshift({
						Id: 0,
						Name: '全部'
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
					apiUrl: serverUrls.couponlist,
					params: $scope.searchOption,
					success: function(response) {
						console.log(response)
						$scope.list = response;
						$scope.list.map(function(v) {
							if(v.ReviewState == 1) {
								v.ShelfState = '待审核';
							} else if(v.ReviewState == 2) {
								v.ShelfState = '已通过';
							} else if(v.ReviewState == 3) {
								v.ShelfState = '未通过';
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
						})
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
		$scope.tdClass = function(value) {
			var classStyle = ''
			switch(value) {
				case '待审核':
					classStyle = 'thColor1'
					break;
				case '已通过':
					classStyle = 'thColor'
					break;
				case '未通过':
					classStyle = 'thColor2'
					break;

				default:
					break;
			}
			return classStyle;
		}

	}
]);