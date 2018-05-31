App.controller('scoresManagementCtrl', ['$scope', '$state', '$stateParams','$q', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$filter',
	function($scope, $state, $stateParams, $q,$rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $filter) {
		$scope.list = [];
		$scope.PcService = PcService;
		$scope.shopId=[];
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

		if(!$stateParams.Id) {
			$scope.isDetail = false;
		} else {
			$scope.isDetail = true;
		}
		$scope.numberText=function(id,array){
	   	var text='';
	   	 array.forEach(function(v){
	   	 	if(id===v.index){
	   	 		text = v.value
	   	 	}
	   	 });
	   	 return text;
	   }

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
		 if(!$stateParams.Id){
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
	                        v['ShelfState'] = $scope.numberText(v['State'],$scope.state);  
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
		 	$scope.searchOption.shopId = $stateParams.Id;
		 	console.log('$scope.searchOption.shopId',$scope.searchOption.shopId)
		 	PagerExtends.regListSpecifyPage($scope, {
					apiUrl: serverUrls.couponorderlist,
					params: $scope.searchOption,
					success: function(response) {
						console.log(response)
						$scope.list = response;
						$scope.list.map(function(v){	
	                        v['ShelfState'] = $scope.numberText(v['State'],$scope.state);                     
						});
						console.log('list',$scope.list)
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
			case 1:
			 classStyle = 'thColor1'
			break;
			case 2:
			 classStyle = 'thColor'
			break;
			case 3:
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