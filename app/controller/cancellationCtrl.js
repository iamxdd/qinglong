App.controller('cancellationCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q', '$filter',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q, $filter) {
		$scope.list = [];
		$scope.PcService = PcService;
		$scope.searchOption = {
			value: "",
			position: '',
			sellType: 0,
			startTime: $filter('date')('', "yyyy-MM-dd 00:00"),
			endTime: $filter('date')('', "yyyy-MM-dd 00:00")
		};
		$scope.sellType = [{
			Id: 0,
			Name: '全部'
		}, {
			Id: 1,
			Name: '居家生活'
		}, {
			Id: 2,
			Name: '交通'
		}, {
			Id: 3,
			Name: '服装'
		}, {
			Id: 4,
			Name: '美食'
		}];
		$scope.State = [{
			Id: 0,
			Name: '请选择'
		}];

		/*时间插件*/
		$("#datetimeStart").datetimepicker({
			language: 'zh-CN',
			weekStart: 1,
			todayBtn: 1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			forceParse: 0,
			format: "yyyy-mm-dd hh:ii",
			showMeridian: 1
		}).on("click", function(ev) {
			$("#datetimeStart").datetimepicker();
		});
		$("#datetimeEnd").datetimepicker({
			language: 'zh-CN',
			weekStart: 1,
			todayBtn: 1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			forceParse: 0,
			format: "yyyy-mm-dd hh:ii",
			showMeridian: 1
		}).on("click", function(ev) {
			$("#datetimeEnd").datetimepicker();
		});
		$scope.location = [];
		//获取位置
		var getCategorys = function($scope, deffered) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: 'get',
				url: serverUrls.courtyardAll
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.location = response.Content;
					if(deffered) {
						deffered.resolve("success");
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		/*注销*/
		$scope.CancellationItem = function(x) {
			console.log(x)
			var state = 3;
			layerAlert.checkone("执行注销操作", function() {
				$scope.listBusyPromise = $http({
					headers: $rootScope.pHeader,
					method: 'get',
					url: serverUrls.ChangeStateById + '?id=' + x.Id + '&state=' + state
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					var Content = response.Content;
					if(Code === 0) {
						layerAlert.autoclose('注销操作成功');
						$scope.fetchData();
					} else {
						layerAlert.autoclose(Message);
					}
				}).error(function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				});
			}, function() {}, "确定", "取消", true, true);
		}

		/*初始化*/
		//商品概览分页
		$scope.fetchData = function() {
			var defered = $q.defer();
			var promises = defered.promise;
			if($scope.location.length == 0) {
				getCategorys($scope, defered);
			} else {
				defered.resolve();
			}
			promises.then(function() {
				PagerExtends.regListSpecifyPage($scope, {
					apiUrl: serverUrls.GetLogoutListByPage,
					params: $scope.searchOption,
					success: function(response) {
						$scope.list = response;
						console.log('list', $scope.list)
					},
					error: function(error) {
						layerAlert.autoclose(PcService.errorResult(error));
					}
				}, $rootScope.pHeader);
			}, function(value) {
				console.log(value);
			}, function(value) {
				console.log(value);
			});

		};
		$scope.fetchData()
	}
]);