App.controller('partyActivityDetailCtrl', ['$scope','$stateParams', '$state', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope, $stateParams,$state, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q) {
		
		$scope.partyActivityDetail = JSON.parse($stateParams.object);
		var id=$scope.partyActivityDetail.Id;
		$scope.activityregistration=function(id){
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: 'get',
				url: serverUrls.activityregistration + "?id=" + id + "&state=" + 0
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					
					$scope.activityList = response.Content;
					var count=$scope.activityList.length;
					if(count>0){
						$scope.count=count;
					}
					$scope.activityList.forEach(function(item,index){
						if (item.CommunistImages === null || item.CommunistImages === '') {
							item.CommunistImages = "app/img/person.png";
						}
					})
				

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		$scope.activityregistration(id);
	
	
	
}]);
