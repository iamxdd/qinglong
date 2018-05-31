App.controller('reportOfmationCtrl',  ['$scope','$state', '$rootScope','$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService','$q','$filter',
	function($scope,$state,$rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService,$q,$filter) {
	$scope.PcService = PcService;
	$scope.list = [];
	$scope.searchOption = {
		// 分类code
      categoryCode: "",
      title:'',
      state:0
	};
	$scope.state = [{
		Id:0,
		Name:'全部'
	},{
		Id:2,
		Name:'待审核'
	},{
		Id:3,
		Name:'已通过'
	},{
		Id:4,
		Name:'未通过'
	}];
	$scope.categoryCode = [];
   //获取店铺名称
	var getShopName = function($scope, defered) {
		$scope.listBusyPromise = $http({
			headers: $rootScope.pHeader,
			method: 'get',
			url: serverUrls.informationTypeList
		}).success(function(response) {
			var Code = response.State.Code;
			var Message = response.State.Message;
			if (Code === 0) {
				$scope.categoryCode = response.Content;
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
			if ($scope.categoryCode.length ===0) {
				getShopName($scope, defered);
			} else {
				defered.resolve();
			}
			promises.then(function() {
				PagerExtends.regListSpecifyPage($scope, {
					apiUrl: serverUrls.informationList,
					params: $scope.searchOption,
					success: function(response) {
						$scope.list = response;
						console.log('res',response)
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
	$scope.fetchData()
	//新增管理
	$scope.seeItem = function(x) {	
		$scope.DetailsData = JSON.stringify(x);
			$state.go("app.actionDetails", {
				object: $scope.DetailsData
			});
	};
}]);