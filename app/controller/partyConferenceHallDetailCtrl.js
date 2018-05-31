App.controller('partyConferenceHallDetailCtrl', ['$scope', '$stateParams', '$state', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope, $stateParams, $state, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q) {

		$scope.ConferenceHallDetail = JSON.parse($stateParams.object);
		$scope.allList = [];
		$scope.AgreeList = [];
		$scope.Objection = [];
		$scope.Waiver = [];
		$scope.AgreeCount = 0;
		$scope.ObjectionCount = 0;
		$scope.WaiverCount = 0;
		$scope.SumCount = 0;
		//议事厅Id
		var id = $scope.ConferenceHallDetail.Id;
		//议事厅选项卡
		$scope.navTabList = [{
			Id: 1,
			Name: "投票结果",
			Active: true
		}, {
			Id: 2,
			Name: "同意",
			Active: false
		}, {
			Id: 3,
			Name: "反对",
			Active: false
		}, {
			Id: 4,
			Name: "弃权",
			Active: false
		}];
		$scope.selectTab = $scope.navTabList[0];
		//选项卡选择操作
		$scope.checked = function(x) {
			$scope.navTabList.forEach(function(item, index) {
				if(item.Name === x.Name) {
					item.Active = true;
				} else {
					item.Active = false;
				}
			});
			if($scope.selectTab !== x) {
				$scope.selectTab = x;
				$scope.fetchData();
			}
		};
		//获取投票结果
		$scope.fetchData = function() {

			var param = {};
			var url = "";
			param.length = 10;
			param.currentPage = 1;
			param.id = id;
			url = serverUrls.votelist;
			switch($scope.selectTab.Id) {
				case 1:
					//全部投票结果
					param.state = 0;
					$scope.listBusyPromise = $http({
						headers: $rootScope.pHeader,
						method: 'get',
						url: url + "?length=" + 10 + "&currentPage=" + 1 + "&id=" + id + "&state=" + 0
					}).success(function(response) {
						var Code = response.State.Code;
						var Message = response.State.Message;
						if(Code === 0) {
							var Content = response.Content;
							$scope.allList = Content.Communist;
							$scope.allList.forEach(function(item, index) {
								if(item.CommunistImages === '' || item.CommunistImages === null) {
									item.CommunistImages = "app/img/person.png";
								}
							});
							$scope.AgreeCount = Content.Agree;
							$scope.ObjectionCount = Content.Objection;
							$scope.WaiverCount = Content.Waiver;
							$scope.SumCount = Content.Sum;
							$scope.navTabList.forEach(function(item, index) {
								switch(item.Id) {
									case 1:
										item.Name = "投票结果(" + $scope.SumCount + ")";
										break;
									case 2:
										item.Name = "同意(" + $scope.AgreeCount + ")";
										break;
									case 3:
										item.Name = "反对(" + $scope.ObjectionCount + ")";
										break;
									case 4:
										item.Name = "弃权(" + $scope.WaiverCount + ")";
										break;
									default:
										break;
								}
							});
						} else {
							layerAlert.autoclose(Message);
						}
					}).error(function(error) {
						layerAlert.autoclose(PcService.errorResult(error));
					});
					break;
				case 2:
					//同意
					param.state = 1;
					PagerExtends.regListSpecifyPage($scope, {
						apiUrl: url,
						params: param,
						success: function(response) {
							$scope.AgreeList = response;
							$scope.AgreeList.forEach(function(item, index) {
								if(item.CommunistImages === '' || item.CommunistImages === null) {
									item.CommunistImages = "app/img/person.png";
								}
							})
						},
						error: function(error) {
							layerAlert.autoclose(errorResult(error));
						}
					}, $rootScope.pHeader);
					break;
				case 3:
					//反对
					param.state = 2;
					PagerExtends.regListSpecifyPage($scope, {
						apiUrl: url,
						params: param,
						success: function(response) {
							$scope.Objection = response;
							$scope.Objection.forEach(function(item, index) {
								if(item.CommunistImages === '' || item.CommunistImages === null) {
									item.CommunistImages = "app/img/person.png";
								}
							})
						},
						error: function(error) {
							layerAlert.autoclose(errorResult(error));
						}
					}, $rootScope.pHeader);
					break;
				case 4:
					//弃权
					param.state = 3;
					PagerExtends.regListSpecifyPage($scope, {
						apiUrl: url,
						params: param,
						success: function(response) {
							$scope.Waiver = response;
							$scope.Waiver.forEach(function(item, index) {
								if(item.CommunistImages === '' || item.CommunistImages === null) {
									item.CommunistImages = "app/img/person.png";
								}
							})
						},
						error: function(error) {
							layerAlert.autoclose(errorResult(error));
						}
					}, $rootScope.pHeader);
					break;
				default:
					break;
			}

		};
		$scope.fetchData();
	}
]);