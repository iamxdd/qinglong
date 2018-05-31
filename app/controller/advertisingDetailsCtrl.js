App.controller('advertisingDetailsCtrl', ['$scope', '$q', '$stateParams', '$location', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', function($scope, $q, $stateParams, $location, $http, ngDialog, PagerExtends, layerAlert) {
	$scope.list = [];


	//点击待审核 弹出框
	$scope.creatOne = function() {
		ngDialog.openConfirm({
			template: "seeOne",
			controller: ['$scope', function($scope) {
				
				$scope.TitleText = "审核";
				
				$scope.formSubmit = function() {
					$scope.closeThisDialog();
				};

				$scope.closeDialog = function() {
					$scope.closeThisDialog();
				};
			}],
			className: 'ngdialog-theme-default',
			closeByDocument: false,
			width: 600
		});
	};
}]);