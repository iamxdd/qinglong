App.controller('PartyActivityCtrl', ['$scope', '$state', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope, $state, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q) {
		$scope.list = [];
		$scope.partyorganizationlist=[];
		$scope.searchOption = {
			value: "",
			partyOrganizationId: 0,

		};
		//开启关闭文本显示
		$scope.toggleText = function(x) {
			var _text = "";
			switch (x.OpenState) {
				case 2:
					_text = "关闭中";
					break;
				case 1:
					_text = "开启中";
					break;
				default:
					break;
			}
			return _text;
		};

		//开启关闭className
		$scope.isToggle = function(x) {
			return {
				'btn-danger': x.OpenState === 2 || x.OpenState === 0 || !x.OpenState,
				'btn-success': x.OpenState === 1
			};
		};

		//开启关闭
		$scope.toggleItem = function(x) {
			var state = 0;
			var stateText = "";
			switch (x.OpenState) {
				case 1:
					state = 2;
					stateText = "关闭";
					break;
				case 2:
					state = 1;
					stateText = "开启";
				default:
					break;
			}

			if (state !== 2 && state !== 1) {
				return;
			}
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: serverUrls.activityopenstate + "?id=" + x.Id + "&state=" + state
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					layerAlert.autoclose(stateText + "操作成功!");
					$scope.fetchData();
				} else {
					layerAlert.autoclose(Message);
				}

			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});

		};
		//获取党组织
		var getPartyorganizationlist = function($scope, deffered) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: 'get',
				url: serverUrls.partyorganizationall + "?state=" + 1
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					var Content = response.Content
					$scope.partyorganizationlist = Content;
					if (deffered) {
						deffered.resolve("success");
					}

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		//分页获取党组活动
		$scope.fetchData = function() {
			var defered = $q.defer();
			var promises = defered.promise;

			if ($scope.partyorganizationlist.length === 0) {
				getPartyorganizationlist($scope, defered);
			} else {
				defered.resolve();
			}

			promises.then(function() {
				PagerExtends.regListSpecifyPage($scope, {
					apiUrl: serverUrls.activitylist,
					params: $scope.searchOption,
					success: function(response) {
						$scope.list = response;
						
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

		$scope.fetchData();
		//查看详情
		$scope.detailItem = function(x) {
			$scope.DetailsData = JSON.stringify(x);
			$state.go("app.partyActivityDetail", {
				object: $scope.DetailsData
			});
		};
	
}]);
