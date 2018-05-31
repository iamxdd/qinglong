App.controller('appointmentCtrl', ['$scope', 'PcService', '$rootScope', 'serverUrls', '$q', '$stateParams', '$location', '$http', 'ngDialog', 'PagerExtends', 'layerAlert',
	function($scope, PcService, $rootScope, serverUrls, $q, $stateParams, $location, $http, ngDialog, PagerExtends, layerAlert) {

		$scope.fieldsList = [{
			name: "Name",
			nameDisplay: "名称",
			editor: "normal",
			value: ""
		}, {
			name: "Telephone",
			nameDisplay: "电话",
			editor: "normal",
			value: ""
		}, {
			name: "Describe",
			nameDisplay: "描述",
			editor: "textarea",
			required: true,
			value: ""
		}];

		$scope.PcService = PcService;

		//预约类型
		$scope.ReservationTypes = [{
			Id: 1,
			Name: "就医预约"
		}, {
			Id: 2,
			Name: "暂住证办理"
		}, {
			Id: 3,
			Name: "户口办理"
		}];

		$scope.fetchData = function() {
			PcService.fetchData($scope, serverUrls.reservationList);
		};

		$scope.fetchData();

		$scope.editItem = function(x) {
			PcService.bindFormData(x, $scope.fieldsList);
			ngDialog.openConfirm({
				scope: $scope,
				template: "createOne",
				controller: ['$scope', function($scope) {

					//提交修改
					$scope.formSubmit = function() {
						PcService.formSubmit($scope, false, $scope.fieldsList, serverUrls.upOrganization, x, {}, $rootScope.pHeader);
					};

				}],
				className: 'ngdialog-theme-default',
				closeByDocument: false,
				width: 850
			});
		};

	}
]);