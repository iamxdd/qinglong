App.controller('ordersManagementCtrl', ['$scope', '$state', '$stateParams','$q', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$filter',
	function($scope, $state, $stateParams, $q,$rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $filter) {
		$scope.list = [];
		$scope.PcService = PcService;
		// var lists = JSON.parse($stateParams);
		$scope.searchOption = {
            // 商品类型
			sellType: 0,
			// 优惠券类型
			couponType:0,
			// 订单状态
			state:0,
			// 审核状态
			// reviewState:0,
			// 上架状态
			// shelfState:0,
			// 店铺ID
			shopId:0,
			startAt: $filter('date')("", "yyyy-MM-dd"),
			endAt: $filter('date')("", "yyyy-MM-dd"),
			// 关键字
			value: ''
		};
		$scope.sellType=[{
			index:0,
			value:'全部'
		},{
			index:1,
			value:'居家生活'
		},{
			index:2,
			value:'交通'
		},{
			index:3,
			value:'服装'
		},{
			index:4,
			value:'美食'
		}];
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
		$scope.state=[{
			value: '全部',
			index: 0
		}, {
			value: '待验证',
			index: 1
		}, {
			value: '已验证',
			index: 2
		}, {
			value: '已退还',
			index: 3
		}, {
			value: '已失效',
			index: 4
		}];

		if(!$stateParams.object) {
			$scope.isDetail = false;
		} else {
			$scope.isDetail = true;
			$scope.Titlelists = JSON.parse($stateParams.object);
		}
		console.log('$scope.isDetail',$scope.isDetail, $stateParams)
       $scope.shopId=[];
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
		/*初始化*/
		$scope.fetchData = function() {
		 if(!$stateParams.object){
		 	var defered = $q.defer();
			var promises = defered.promise;
			if($scope.shopId.length == 0) {
				getCategorys($scope, defered);
			} else {
				defered.resolve();
			}

			promises.then(function() {
				PagerExtends.regListSpecifyPage($scope, {
					apiUrl: serverUrls.couponorderlist,
					params: $scope.searchOption,
					success: function(response) {
						// console.log(response)
						$scope.list = response;
						$scope.list.map(function(v){
	                        if(v.State==1){
	                          v.State = '待验证';
	                        }else if(v.State==2){
	                        	 v.State = '已验证';
	                        }else if(v.State==3){
	                        	 v.State = '已退还';
	                        }else{
	                        	  v.State = '已失效';
	                        }

	                        if(v.CouponCouponType==1){
	                        	v.CouponCouponType='折扣券';

	                        }else if(v.CouponCouponType==2){
	                        	v.CouponCouponType='抵用券';

	                        }else if(v.CouponCouponType==3){
	                        	v.CouponCouponType='满减券';
	                        	
	                        }else if(v.CouponCouponType==4){
	                        	v.CouponCouponType='礼品券';  	
	                        }


	             			if(v.CouponShopSellType==1){
	                            v.CouponShopSellType="居家生活";
	                        }else if(v.CouponShopSellType==2){
	                            v.CouponShopSellType="交通";
	                        }else if(v.CouponShopSellType==3){
	                        	v.CouponShopSellType="服装";
	                        	
	                        }else if(v.CouponShopSellType==4){
	                        	v.CouponShopSellType="美食";
	                        	
	                        }
	                        v['ShelfState'] = v['State'];
						})
						console.log('list',$scope.list)
					},
					error: function(error) {
						layerAlert.autoclose(PcService.errorResult(error));
					}
				}, $rootScope.pHeader);
			}, function(value) {
				// console.log(value);
			}, function(value) {
				// console.log(value);
			});
		 }else{
		 	$scope.searchOption.shopId = $scope.Titlelists.Id;
		 	PagerExtends.regListSpecifyPage($scope, {
					apiUrl: serverUrls.couponorderlist,
					params: $scope.searchOption,
					success: function(response) {
						console.log(response)
						$scope.list = response;
						$scope.list.map(function(v){
							if(v.State==1){
	                          v.State = '待验证';
	                        }else if(v.State==2){
	                        	 v.State = '已验证';
	                        }else if(v.State==3){
	                        	 v.State = '已退还';
	                        }else{
	                        	  v.State = '已失效';
	                        }
	                        if(v.CouponCouponType==1){
	                        	v.CouponCouponType='折扣券';

	                        }else if(v.CouponCouponType==2){
	                        	v.CouponCouponType='抵用券';

	                        }else if(v.CouponCouponType==3){
	                        	v.CouponCouponType='满减券';
	                        	
	                        }else if(v.CouponCouponType==4){
	                        	v.CouponCouponType='礼品券';  	
	                        }	
	                        v['ShelfState'] = v['State'];                     
						});
						// console.log('list',$scope.list)
					},
					error: function(error) {
						layerAlert.autoclose(PcService.errorResult(error));
					}
				}, $rootScope.pHeader);
		 }
			
	    }; 
	   $scope.fetchData();



		$scope.tdClass=function(value){
		var classStyle=''
		switch(value){
			case '待验证':
			 classStyle = 'thColor1'
			break;
			case '已验证':
			 classStyle = 'thColor'
			break;
			case '已退还':
			 classStyle = 'thColor2'
			break;
			
			default:
				break;
		}
		return classStyle;
	}

	//查看详情
		$scope.seeDetail = function(x) {
			var newarr = {
				type:'audit',
				List:x
			};
			$scope.DetailsData = JSON.stringify(newarr);
			$state.go("app.shelvesManagementDetails", {
				object: $scope.DetailsData
			});
		};
	
}]);