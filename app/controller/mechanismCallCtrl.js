App.controller('mechanismCallCtrl', ['$scope', 'PcService', '$rootScope', 'serverUrls', '$q', '$stateParams', '$location', '$http', 'ngDialog', 'PagerExtends', 'layerAlert',
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

		$scope.fetchData = function() {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.organizationPhoneList
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.list = response.Content;
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
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