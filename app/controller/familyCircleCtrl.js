App.controller('familyCircleCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'PcService', 'serverUrls',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, PcService, serverUrls) {
		$scope.list = [];
		$scope.familyStatus = [];

		$scope._list = [];
		$scope.Selectstate = [{
			value: '全部',
			index: 0
		}, {
			value: '开启',
			index: 1
		}, {
			value: '关闭',
			index: 2
		}];
		$scope.searchOption = {
			value: "",
			dataState: 0
		};
		$scope.familyMembrsImage = [];
		$scope.houseId = 0;
		$scope.PcService = PcService;

		//文字显示
		$scope.toggleText = function(x) {
			var _text;
			switch(x.OpenState) {
				case 1:
					_text = "开启";
					break;
				case 2:
					_text = "关闭";
					break;
				default:
					_text = "开启";
					break;
			}
			return _text;
		};
		$scope.Initurl = serverUrls.GetFamilyCoterie;
		//初始化家庭圈子
		$scope.familyInit = function(url, params, x, scope) {

			if(!scope) {
				scope = $scope;
			}
			PagerExtends.regListSpecifyPage(scope, {
				apiUrl: url,
				params: params,
				success: function(response) {
					
					if(url == serverUrls.GetFamilyCoterie) {
						scope.list = response;
						if(!!x) {
							scope.list.map(function(item) {
								if(item.Id === x.Id) {
									x.OpenState = item.OpenState;
								}
							});
						}
					} else if(url == serverUrls.GetFamilyCotereHistoryByPage) {
						scope.familyStatus = response;

					}

				},
				error: function(error) {
					layerAlert.autoclose(error);
				}
			}, $rootScope.pHeader);
		};

		$scope.familyInit($scope.Initurl, $scope.searchOption, $scope);

		// $scope.choseItem = function(x) {
		// 	$scope.leftTabs.forEach(function(item, index) {
		// 		if(item.Name === x.Name) {
		// 			item.Active = true;
		// 		} else {
		// 			item.Active = false;
		// 		}
		// 	});
		// };

		// $scope.familyMembrs = [{
		// 	Id: 0,
		// 	Name: "张三"
		// }, {
		// 	Id: 1,
		// 	Name: "张三风"
		// }, {
		// 	Id: 2,
		// 	Name: "张三疯"
		// }, {
		// 	Id: 3,
		// 	Name: "张三封"
		// }, {
		// 	Id: 4,
		// 	Name: "张三哄"
		// }, {
		// 	Id: 5,
		// 	Name: "张三轰"
		// }];

		$scope._fetchData = function() {
			switch($scope.selectTab.Id) {
				case 1:
					break;
				case 2:
					break;
				default:
					break;
			}
		};

		$scope.leftTabs = [{
			Id: 1,
			Name: "视力检测",
			Active: true
		}, {
			Id: 1,
			Name: "听力检测",
			Active: false
		}, {
			Id: 1,
			Name: "血压测试",
			Active: false
		}, {
			Id: 1,
			Name: "心率测量",
			Active: false
		}, {
			Id: 1,
			Name: "肺活量测量",
			Active: false
		}, {
			Id: 1,
			Name: "呼吸频率测量",
			Active: false
		}, {
			Id: 1,
			Name: "血样测量",
			Active: false
		}, {
			Id: 1,
			Name: "心理检测",
			Active: false
		}];

		//新增管理
		$scope.creatOne = function() {
			ngDialog.openConfirm({
				template: 'createOne',
				scope: $scope,
				controller: ["$scope", function($scope) {}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false
			});
		};

		//圈子详情detailItem
		$scope.detailItem = function(x) {
			//console.log(x)
			var Id = x.Id;
			var familyInit = $scope.familyInit;
			var detailInit = $scope.detailInit;
			var recyleData = $scope.recyleData;

			ngDialog.openConfirm({
				template: 'detailOne',
				//scope: $scope,
				controller: ["$scope", function($scope) {
					$scope.PcService = PcService;
					$scope.navTabList = [{
						Id: 1,
						Name: "家庭动态",
						Active: true
					}, {
						Id: 2,
						Name: "家人健康",
						Active: false
					}];
					//选项卡选择操作
					$scope.checked = function(x) {
						$scope.navTabList.map(function(item, index) {
							if(item.Name === x.Name) {
								item.Active = true;
							} else {
								item.Active = false;
							}
						});
						if($scope.selectTab !== x) {
							$scope.selectTab = x;
							// $scope._fetchData();
							switch($scope.selectTab.Id) {
								case 1:
								    familyInit(serverUrls.GetFamilyCotereHistoryByPage, param,x, $scope);
									break;
								case 2:
								    detailInit($scope, Id);
								    $scope.leftTabs = [{
										Id: 1,
										Name: "视力检测",
										Active: true
									}, {
										Id: 1,
										Name: "听力检测",
										Active: false
									}, {
										Id: 1,
										Name: "血压测试",
										Active: false
									}, {
										Id: 1,
										Name: "心率测量",
										Active: false
									}, {
										Id: 1,
										Name: "肺活量测量",
										Active: false
									}, {
										Id: 1,
										Name: "呼吸频率测量",
										Active: false
									}, {
										Id: 1,
										Name: "血样测量",
										Active: false
									}, {
										Id: 1,
										Name: "心理检测",
										Active: false
									}];
									break;
								default:
									break;
							}
						}
					};
                	$scope.choseItem = function(x) {
						$scope.leftTabs.forEach(function(item, index) {
							if(item.Name === x.Name) {
								item.Active = true;
							} else {
								item.Active = false;
							}
						});
					};
					$scope.imgSrc = ''
					$scope.familyImgTiJian = function(Title) {
						var imgSrc = '';
						if(Title == '幸福一家') {
							imgSrc = 'app/img/jiance.png';

						} else if(Title == '和谐一家') {
							imgSrc = 'app/img/harmonious.png';

						} else if(Title == '党员一家') {
							imgSrc = 'app/img/party.png';
						}
						return imgSrc;
					}
					$scope.selectTab = $scope.navTabList[0];
					
					$scope.recyleData = recyleData;
					$scope.detaList = x;
					$scope.ID = x.Code;
					$scope.Address = x.Address;
					$scope.Title = x.Name;
					$scope.State = x.OpenState;
					$scope.TitleText = "圈子详情";
					$scope.selectItem = x;
					detailInit($scope, x.Id);
					var param = {
						id: x.Id
					};
					familyInit(serverUrls.GetFamilyCotereHistoryByPage, param,x, $scope);
				}],

				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 800
			});
		};

		$scope.detailInit = function($scope, HouseId) {
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: 'get',
				url: serverUrls.GetFamilyCoterieById + "?coterieId=" + HouseId
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code == 0) {
					$scope.familyMembrsImage = response.Content.ResidentList;
					$scope.selectedMember = $scope.familyMembrsImage ? $scope.familyMembrsImage[0].Id : "";
					$scope.familyMembrsImage.map(function(v) {
						if(v.Images == null) {
							v.Images = "app/img/luck.png";
						}
					})
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		}
		//改变状态
		$scope.recyleData = function(x, isFresh) {
			var doAction = "",
				OpenState = 1;
			if(x.OpenState == 1) {
				OpenState = 2;
				doAction = "关闭";
			} else {
				OpenState = 1;
				doAction = "开启";
			}
			setTimeout(function() {
				$scope.ngDialogPromise = $http({
					headers: $rootScope.pHeader,
					method: 'get',
					url: serverUrls.ChangeFamilyCotereiState + "?id=" + x.Id + "&dataState=" + OpenState
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					if(Code == 0) {
						layerAlert.autoclose(doAction + "操作成功!");
						if(isFresh) {
							$scope.familyInit($scope.Initurl, $scope.searchOption, x, $scope);
						} else {
							$scope.familyInit($scope.Initurl, $scope.searchOption, x, $scope);
						}
					} else {
						layerAlert.autoclose(Message);
					}
				}).error(function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				});
			}, 10)

		}
	}
]);