App.controller('partyInformationDetailsCtrl',  ['$scope','$stateParams' ,'$state', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope,$stateParams, $state, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q) {
	$scope.partyInformationDetails = JSON.parse($stateParams.object);
       $scope.tdClass=function(value){
		var classStyle='';
		switch(value){
			
			case 1:
				classStyle='todoAudit';
					break;
			case 2:
				classStyle='passAudit';
					break;
			case 3:
				classStyle='noAudit';
					break;
			break;
			default:
					break;
		}
		return classStyle;
	   }
  	$scope.changeUpperUrl = function(id){
		  	var data={
		  		Id:$scope.partyInformationDetails.Id,
		  		State:id,
		  		Remarks:$scope.evaluationNew.Remarks

		  	};
	   	  	$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: 'post',
				url: serverUrls.partyisreview,
			    data:data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					if(id==2){
                       $scope.partyInformationDetails.ReviewState = 2;
					}else{
						$scope.partyInformationDetails.ReviewState = 3;
					}
				    setTimeout(function() {
					ngDialog.closeAll();
				    }, 200);
				} else {
					layerAlert.autoclose(PcService.errorResult(Message));
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
	   }
     $scope.evaluationNew={};
	     $scope.creatOne = function(id) {
			ngDialog.openConfirm({
				template: "createOne",
				scope: $scope,
				controller: ['$scope', function($scope) {
					$scope.evaluationNew.Remarks = ''
					$scope.formSubmit = function() {
						$scope.changeUpperUrl(id)

					$scope.closeDialog = function() {
						ngDialog.closeAll();
					};
				 }
				}],
				className: 'ngdialog-theme-default',
				closeByDocument: false,
				width: 600,

			});
			
		}

        
		 
	
}]);
