App.controller('recycleBinCtrl', ['$scope', '$state', '$filter', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope, $state, $filter, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q) {
		$scope.list = [];

		$scope.categoryCodes = [];
		$scope.publicationScope = [];
		$scope.newsTypes = [];
		$scope.news = {};
		$scope.PcService = PcService;

		$scope.searchOption = {
			title: "",
			categoryCode: "",
			isdelete: 0
		};
		//选项卡
		$scope.navTabList = [{
			Id: 1,
			Name: "资讯回收站",
			Active: true
		}, {
			Id: 2,
			Name: "广告回收站",
			Active: false
		}];
		//默认选中第一个tab
		$scope.selectTab = $scope.navTabList[0];
		//选项卡选择操作
		$scope.checked = function(x) {
			$scope.categoryCodes = [];
			$scope.navTabList.forEach(function(item, index) {
				if (item.Name === x.Name) {
					item.Active = true;
				} else {
					item.Active = false;
				}
			});
			if ($scope.selectTab !== x) {
				$scope.selectTab = x;
				$scope.fetchData();

			}
		};
		//开启关闭文本显示
		$scope.toggleText = function(x) {
			var _text = "";
			switch (x.OpenState) {
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
				'btn-success': x.OpenState === 2 || x.OpenState === 0 || !x.OpenState,
				'btn-danger': x.OpenState === 1
			};
		};

		//开启关闭
		$scope.toggleItem = function(x) {
			PcService.toggleItem($scope, x, serverUrls.inOpenstate);
		};

		//置顶文本显示
		$scope.topText = function(x) {
			var actionText = "";
			if (x.IsTop === 0) {
				actionText = "设为置顶";
			} else if (x.IsTop === 1) {
				actionText = "取消置顶";
			}
			return actionText;
		};

		//置顶class
		$scope.isTopToggle = function(x) {
			return {
				'btn-default': x.IsTop === 2 || x.OpenState === 0 || !x.IsTop,
				'btn-primary': x.IsTop === 1
			};
		};

		//置顶
		$scope.toplItem = function(x) {
			var IsTop = "",
				actionText = "";
			if (x.IsTop === 0) {
				IsTop = 1;
				actionText = "置顶";
			} else if (x.IsTop === 1) {
				IsTop = 0;
				actionText = "取消置顶";
			}
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: serverUrls.upIstop + "?id=" + x.Id + "&istop=" + IsTop
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					layerAlert.autoclose(actionText + "操作成功！");
					$scope.fetchData();
				}
			}).error(function(error) {
				layerAlert.autoclose(errorResult(error));
			});
		};

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

		//获取新闻分类
		var getCategorys = function($scope, deffered, url) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: 'get',
				url: url
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					$scope.categoryCodes = response.Content;
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

		//新闻资讯
		$scope.fetchData = function() {
			var defered = $q.defer();
			var promises = defered.promise;
			var url = '';
			var dataUrl = '';
			switch ($scope.selectTab.Id) {
				case 2:
					//获取广告分类
					url = serverUrls.categoryAll;
					dataUrl = serverUrls.adverList;
					break;
				case 1:
					//获取新闻分类
					url = serverUrls.informationTypeList;
					dataUrl = serverUrls.informationList;
					break;
				default:
					break;
			}
			if ($scope.categoryCodes.length === 0) {
				getCategorys($scope, defered, url);
			} else {
				defered.resolve();
			}

			promises.then(function() {
				PagerExtends.regListSpecifyPage($scope, {
					apiUrl: dataUrl,
					params: $scope.searchOption,
					success: function(response) {
						$scope.list = response;
						$scope.list.map(function(item, index) {
							item.ChannelNames = "";
							item.ChannelList.forEach(function(vItem) {
								item.ChannelNames += vItem.ChannelTypeName + ",";
							});
							item.ChannelNames = item.ChannelNames.substring(0, item.ChannelNames.length - 1);
						});
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

		//file-upload
		$scope.fieldsList = [{
			name: "Name",
			nameDisplay: "上传文件",
			editor: "file-upload",
			required: true,
			value: "",
			originValue: ""
		}];

		//新闻详情
		$scope.detailItem = function(x) {
			$state.go("app.newsDetail", {
				Id: x.Id,
				Type:$scope.selectTab.Id
			});
		};

		//恢复新闻
		$scope.recyleData = function(x) {
			var url = '';
			layerAlert.checkone("执行恢复操作", function() {
				switch ($scope.selectTab.Id) {
					case 2:
						//删除广告
						url = serverUrls.adIsdelete;
						break;
					case 1:
						//删除新闻
						url = serverUrls.isdelete;
						break;
					default:
						break;
				}
				deleteData(x, $scope,url);
			}, function() {}, "恢复", "取消", true, true);

		};
		var deleteData = function(x, $scope,url) {
				$scope.listBusyPromise = $http({
					headers: $rootScope.pHeader,
					method: 'get',
					url: url + "?id=" + x.Id + "&state=1"
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					if (Code === 0) {
						layerAlert.autoclose("恢复成功!");
						setTimeout(function() {
							$scope.fetchData();
						}, 1000);
					} else {
						layerAlert.autoclose(Message);
					}
				}).error(function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				});
			}
			//获取发布渠道
			//获取发布范围
		var getPublicationScope = function($scope, deffered) {
			$scope.listBusyPromise = $http({
				method: 'get',
				url: serverUrls.channeltypeAll + "?openstate=1"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					$scope.publicationScope = response.Content;
					deffered.resolve();
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		$scope.configImageAfterUpload = function(url) {
			if (url) {
				$scope.news.MainPic = url !== 'img/upload.png' ? url : "";
			} else {
				layerAlert.autoclose('上传图片失败，请稍后再试！');
			}
		}

		//判断提交表单是否为空
		var isNull = function($scope) {
			var a = false,
				channelType = "";
			$scope.publicationScope.map(function(v) {
				if (v.Checked) {
					channelType += v.Id + ",";
				}
			});
			channelType = channelType.substring(0, channelType.length - 1);
			$scope.news.ChannelType = channelType;
			$scope.news.MainPic = $scope.news.MainPic ? $scope.news.MainPic : "";
			$scope.news.Title = $scope.news.Title ? $scope.news.Title : "";
			$scope.news.Content = $scope.news.Content ? $scope.news.Content : "";
			for (var v in $scope.news) {
				if (!$scope.news[v]) {
					a = true;
					return a;
				}
			}
			return a;
		};

		//初始化新增项
		var initNewsForms = function(obj) {
			if (typeof obj === "object") {
				obj.Title = "";
				obj.Content = "";
				obj.MainPic = "";
				//object.ChannelType = "";
				obj.CategoryId = $scope.categoryCodes[0].Id;
				$scope.publicationScope.map(function(v) {
					v.Checked = false;
				});
			}
		};

		//新增管理
		$scope.creatOne = function() {
			var defer = $q.defer();
			var promised = defer.promise;
			if (!$scope.publicationScope || $scope.publicationScope.length === 0) {
				getPublicationScope($scope, defer);
			} else {
				defer.resolve();
			};
			promised.then(function(value) {
				ngDialog.openConfirm({
					template: '_createOne',
					scope: $scope,
					controller: ["$scope", function($scope) {
						initNewsForms($scope.news);
						$scope.formSubmit = function(isDraft) {
							if (isNull($scope)) {
								layerAlert.autoclose("表单不能为空!");
								return;
							}
							var param = {
									Draft: isDraft
								},
								Message = "";

							param = $.extend(true, param, $scope.news);
							if (!isDraft) {
								Message = "新增资讯";
							} else {
								Message = "新增草稿";
							}
							PcService.formSubmit($scope, true, [], serverUrls.addInformation, null, param, $rootScope.pHeader, Message);
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 900
				});
			}, function(value) {

			}, function(value) {

			});

		};
	}
]);