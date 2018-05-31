App.controller('auditManagementDetailsCtrl', ['$scope', 'PcService', '$rootScope', 'serverUrls', '$q', '$stateParams', '$location', '$http', 'ngDialog', 'PagerExtends', 'layerAlert',
	function($scope, PcService, $rootScope, serverUrls, $q, $stateParams, $location, $http, ngDialog, PagerExtends, layerAlert) {

		//$scope.Neighborhood = JSON.parse($stateParams.object)
		$scope.isPass = function(x) {
			ngDialog.openConfirm({
				template: "createOne",
				scope: $scope,
				controller: ['$scope', function($scope) {
					$scope.quanzine = x;

					$scope.TitleText = "修改邻里圈";
					$scope.formSubmit = function() {

						

					};

					$scope.closeDialog = function() {
						$scope.closeThisDialog();
					};
				}],
				className: 'ngdialog-theme-default',
				closeByDocument: false,
				width: 600,

			});
		};

	}
]);