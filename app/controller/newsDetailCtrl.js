App.controller('newsDetailCtrl', ['$scope', '$stateParams', '$state', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope, $stateParams, $state, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q) {
		$scope.list = [];
		var Id = $stateParams.Id;
		var Type = $stateParams.Type;
		switch (Type){
			case 1:
				Type="1";
				break;
			case 2:
				Type="2";
				break;
			default:
				break;
		}

		$scope.PcService = PcService;
		$scope.newsstates = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "草稿"
		}, {
			Id: 2,
			Name: "待审核"
		}, {
			Id: 3,
			Name: "审核通过"
		}, {
			Id: 4,
			Name: "审核未通过"
		}];

		/*$scope.strToDom = function(str) {
			if(!!str) {
				var domArray = $(str);
				var newDom = "";
				domArray.map(function(v) {
					newDom += domArray[v].innerHTML + "，";
				});
				return newDom.substring(0, newDom.length - 1);
			} else {
				return str;
			}
		};*/

		//审核操作
		var toExamine = function(sucess, x) {
			var state = 0,
				doAction = "";
			switch(sucess) {
				case true:
					state = 3;
					doAction = "通过";
					break;
				case false:
					state = 4;
					doAction = "不通过";
					break;
			}
			var url = "",
				goUrl = "";
			switch(Type) {
				case "1":
					url = serverUrls.reviewstateInformation;
					goUrl = "app.communityNews";
					break;
				case "2":
					url = serverUrls.adReviewstate;
					goUrl = "app.advertisingInfo";
					break;
				default:
					break;
			}
			$scope.listBusyPromise = $http({
				headers: $rootScope.gHeader,
				method: 'get',
				url: url + "?id=" + x.Id + "&state=" + state
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("审核" + doAction);
					$state.go(goUrl);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//点击执行是否审核操作
		$scope.clickItem = function(x) {
			if(x.State !== 2) {
				return;
			} else {
				layerAlert.checkone("审核操作", function() {
					toExamine(true, x);
				}, function() {
					toExamine(false, x);
				}, "通过", "不通过", false, false, "请选择是否通过审核?");
			}
		};

		//获取新闻详情
		$scope.fetchData = function() {
			var url = "";
			switch(Type) {
				case "1":
					url = serverUrls.informationDetail + "?id=" + Id;
					break;
				case "2":
					url = serverUrls.adContentDetail + "?id=" + Id;
					break;
				default:
					break;
			}
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: 'get',
				url: url,
			}).success(function(response) {
				console.log('response',response)
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.News = response.Content;
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		$scope.fetchData();

	}
]);