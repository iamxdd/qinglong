App.controller('PartyMechanismCtrl', ['$scope', '$state', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q', 'PcService',
	function($scope, $state, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q, PcService) {
		$scope.list = [];
		$scope.searchOption = {
			value: ""
		};
		$scope.PcService = PcService;
		//开启关闭文本显示
		$scope.toggleText = function(x) {
			var _text = "";
			switch (x.PartyState) {
				case 2:
					_text = "开启";
					break;
				case 1:
					_text = "关闭";
					break;
				default:
					break;
			}
			return _text;
		};

		//开启关闭className
		$scope.isToggle = function(x) {
			return {
				'btn-success': x.PartyState === 2 || x.PartyState === 0 || !x.PartyState,
				'btn-danger': x.PartyState === 1
			};
		};
		//添加 修改数据绑定
		$scope.news = {
			Title: '',
			CategoryId: '请选择',
			remark: ''
		};
		//下拉框数据
		$scope.categoryCodes = [{
			Id: 0,
			Name: '请选择'
		}];
		//开启关闭解散
		$scope.toggleItem = function(x, id) {
			console.log('x', x)
			var state = 0;
			var stateText = "";
			if (id == 1) {
				switch (x.PartyState) {
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
			} else if (id == 2) {
				state = 3;
				stateText = "解散";
			}

			// if (state !== 2 && state !== 1) {
			// 	return;
			// }
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: serverUrls.ispartystate + "?id=" + x.Id + "&state=" + state
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
		//分页获取党组织机构
		$scope.fetchData = function() {
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.partyorganizationlist,
				params: $scope.searchOption,
				success: function(response) {
					$scope.list = response;
				},
				error: function(error) {
					layerAlert.autoclose(errorResult(error));
				}
			}, $rootScope.gHeader);

		};

		$scope.fetchData();
		//查看详情
		$scope.detailItem = function(x) {
			$scope.DetailsData = JSON.stringify(x);
			console.log(x)
			$state.go("app.partyMechanismDetail", {
				object: $scope.DetailsData
			});
		};

		// 获取负责人
		var getSelect = function(x) {
				$scope.ngDialogPromise = $http({
					headers: $rootScope.pHeader,
					method: "get",
					url: serverUrls.communistall
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					var contents = response.Content;
					var newContent = [];
					if (Code === 0) {
						if (contents.length > 0) {
							contents.map(function(v) {
								newContent.push({
									Id: v.Id,
									Name: v.Name,
								})
							})
							$scope.categoryCodes = newContent;
							if (x) {
								$scope.news.CategoryId = x.PrincipalId;
							} else {
								$scope.news.CategoryId = newContent[0].Id;
							}

						}
					} else {
						layerAlert.autoclose(Message);
					}

				}).error(function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				});
			}
			//新增管理
		$scope.creatOne = function(x) {
			var url = '',
				method = '',
				data = {};
			if (x) {
				getSelect(x);
			} else {
				getSelect();
			}
			ngDialog.openConfirm({
				template: '_createOne',
				scope: $scope,
				controller: ["$scope", function($scope) {
					if (x) {
						$scope.Texttitle = '修改党组织机构';
						$scope.news.Title = x.Name;
						$scope.news.remark = x.Describe;
					} else {
						$scope.Texttitle = '添加党组织机构';
						$scope.news.Title = '';
						$scope.news.remark = '';
					}

					$scope.formSubmit = function() {
						if (x) {
							url = serverUrls.uppartyorganization,
								method = 'put';
							data = {
								"Id": x.Id,
								"Name": $scope.news.Title,
								"Describe": $scope.news.remark,
								"PrincipalId": $scope.news.CategoryId
							}
						} else {
							url = serverUrls.addpartyorganization,
								method = 'post';
							data = {
								"Name": $scope.news.Title,
								"Describe": $scope.news.remark,
								"PrincipalId": $scope.news.CategoryId
							}
						}
						var DevNameFlag = DevNameCheck($scope.news.Title.replace(/\s/g, ""));
						if (!DevNameFlag) {
							layerAlert.autoclose('名称不合法,支持文字，数字，英文和下划线,请重新输入');
							$scope.news.Title = '';
							return;
						}
						if ($scope.news.remark.replace(/\s/g, "") == '') {
							layerAlert.autoclose('描述不能为空,请输入');
							return;
						}
						formSubmit(url, method, data)
					};
				}],
				className: 'ngdialog-theme-default',
				width: 900
			});

		};
		// 添加  修改提交表单
		var formSubmit = function(url, method, data) {
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: method,
				url: url,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					layerAlert.autoclose('操作成功');
					ngDialog.closeAll();
					$scope.fetchData();
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		}

		//检验名称
		var DevNameCheck = function(val) {
			var flag = true;
			var patternName = /^[\u4E00-\u9FA5a-zA-Z0-9_]{1,32}$/;
			if (patternName.test(val)) {
				flag = true;
			} else {
				flag = false;
			}
			return flag;
		}
	}
]);