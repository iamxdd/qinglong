App.controller('contentDetailsCtrl', ['$scope', '$stateParams', '$state', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope, $stateParams, $state, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q) {
		$scope.list = [];
		var Id = $stateParams.Id;
		$scope.PcService = PcService;
		$scope.newsstates = [{
			Id: 1,
			Name: "未提交"
		}, {
			Id: 2,
			Name: "待审核"
		}, {
			Id: 3,
			Name: "已通过"
		}, {
			Id: 4,
			Name: "未通过"
		}];

		$scope.fetchData = function() {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: serverUrls.getWorkCotent + "?id=" + Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.News = response.Content;
				}
			}).error(function(error) {
				layerAlert.autoclose(errorResult(error));
			});
		};
		$scope.fetchData();

		//提交操作
		$scope.clickItem = function(x) {
			if(x.State === 1) {
				layerAlert.checkone("执行提交操作", function() {
					$scope.listBusyPromise = $http({
						headers: $rootScope.pHeader,
						method: "get",
						url: serverUrls.issubmitContent + "?id=" + x.Id + "&state=1"
					}).success(function(response) {
						var Code = response.State.Code;
						var Message = response.State.Message;
						if(Code === 0) {
							layerAlert.autoclose("提交操作成功！");
							setTimeout(function() {
								$scope.fetchData();
							}, 1000);
						}
					}).error(function(error) {
						layerAlert.autoclose(errorResult(error));
					});
				}, function() {}, "确定", "取消", true, true, "确定要提交吗？");
			} else if(x.State === 2) {
				layerAlert.checkone("执行审核操作", function() {

					$scope.listBusyPromise = $http({
						headers: $rootScope.pHeader,
						method: "get",
						url: serverUrls.contentReview + "?id=" + x.Id + "&state=3"
					}).success(function(response) {
						var Code = response.State.Code;
						var Message = response.State.Message;
						if(Code === 0) {
							layerAlert.autoclose("审核操作成功！");
							setTimeout(function() {
								history.back(-1);
							}, 1000);
						}
					}).error(function(error) {
						layerAlert.autoclose(errorResult(error));
					});
				}, function() {
					$scope.listBusyPromise = $http({
						headers: $rootScope.pHeader,
						method: "get",
						url: serverUrls.contentReview + "?id=" + x.Id + "&state=4"
					}).success(function(response) {
						var Code = response.State.Code;
						var Message = response.State.Message;
						if(Code === 0) {
							layerAlert.autoclose("审核操作成功！");
							setTimeout(function() {
								history.back(-1);
							}, 1000);
						}
					}).error(function(error) {
						layerAlert.autoclose(errorResult(error));
					});
				}, "通过", "不通过", true, true, "请选择审核操作？");
			}

		}
	}
]);