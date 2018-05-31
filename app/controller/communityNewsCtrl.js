App.controller('communityNewsCtrl', ['$scope', '$filter', '$state', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope, $filter, $state, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q) {
		$scope.list = [];
		$scope.selectPublicationScope = [];
		$scope.categoryCodes = [];
		$scope.publicationScope = [];
		$scope.newsTypes = [];
		$scope.news = {};
		$scope.editornews = {};
		$scope.PcService = PcService;
		/*var ue = UE.getEditor('content');*/
		$scope.searchOption = {
			title: "",
			categoryCode: "",
			state: 5
		};

		//是否可操作
		$scope.isDisabled = function(x) {
			if(x.State !== 3) {
				return true;
			} else {
				return false;
			}
		};

		$scope.isDeleteDisabled = function(x) {
			if(x.State !== 4) {
				return true;
			} else {
				return false;
			}
		};

		//开启关闭文本显示
		$scope.toggleText = function(x) {
			var _text = "";
			switch(x.OpenState) {
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
			PcService.toggleItem($scope, x, serverUrls.inOpenstate);
		};

		//删除新闻
		$scope.deieteItem = function(x) {
			layerAlert.checkone("执行删除操作", function() {
				$scope.listBusyPromise = $http({
					headers: $rootScope.pHeader,
					method: 'get',
					url: serverUrls.isdelete + "?id=" + x.Id + "&state=0"
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					if(Code === 0) {
						layerAlert.autoclose("删除成功!");
						setTimeout(function() {
							$scope.fetchData();
						}, 1000);
					} else {
						layerAlert.autoclose(Message);
					}
				}).error(function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				});
				/*PcService.deleteItem($scope, serverUrls.informationDetail, x, $rootScope.pHeader);*/
			}, function() {}, "删除", "取消", true, true);

		};

		//置顶文本显示
		$scope.topText = function(x) {
			var actionText = "";
			if(x.IsTop === 0) {
				actionText = "设为置顶";
			} else if(x.IsTop === 1) {
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
		//确认置顶
		var sureTop = function(x, $scope) {
			var Channel = x.ChannelList;
			var actionText = "置顶设置";
			var channelType = "";
			$scope.selectPublicationScope.map(function(v) {
				if(v.Checked) {
					channelType += v.Id + ",";
				}
			});
			channelType = channelType.substring(0, channelType.length - 1);

			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: serverUrls.upIstop + "?id=" + x.Id + "&istop=" + channelType
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose(actionText + "操作成功！");
					$scope.fetchData();
					$scope.closeThisDialog();
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		}
		//置顶
		$scope.toplItem = function(x) {
			var defer = $q.defer();
			var promised = defer.promise;
			/*getPublicationScope($scope, defer);*/
			if(!$scope.publicationScope || $scope.publicationScope.length === 0) {
				getPublicationScope($scope, defer);
			} else {
				defer.resolve();
			};

			promised.then(function(value) {
				ngDialog.openConfirm({
					template: 'createTop',
					scope: $scope,
					controller: ["$scope", function($scope) {
						console.log("$scope.publicationScope", $scope.publicationScope);
						var selectPublication = x.ChannelList;
						var selectPublicationNew = [];
						for(var i = 0; i < selectPublication.length; i++) {
							$scope.publicationScope.forEach(function(item, index) {
								if(item.Id === selectPublication[i].ChannelTypeId) {
									if(selectPublication[i].IsTop === 1) {
										item.Checked = true;
									} else {
										item.Checked = false;
									}
									selectPublicationNew.push(item);
								}
							});
						}
						$scope.selectPublicationScope = selectPublicationNew;
						$scope.formSubmit = function() {
							sureTop(x, $scope);
						};
						$scope.closeDialog = function() {
							$scope.closeThisDialog();
						};
					}],
					className: 'ngdialog-theme-default',
					width: 800
				});
			}, function(value) {

			}, function(value) {

			});

		};

		$scope.newsstates = [{
				Id: 5,
				Name: "全部"
			}
			/*, {
						Id: 1,
						Name: "草稿"
					}*/
			, {
				Id: 2,
				Name: "待审核"
			}, {
				Id: 3,
				Name: "已通过"
			}, {
				Id: 4,
				Name: "未通过"
			}
		];

		//获取新闻分类
		var getCategorys = function($scope, deffered) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: 'get',
				url: serverUrls.informationTypeList
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.categoryCodes = response.Content;
					$scope.categoryCodes = $filter('hasParents')($scope.categoryCodes);
					//console.log($scope.categoryCodes);
					//$scope.searchOption.categoryCode = response.Content[0].Code;
					$scope.news.CategoryId = $scope.categoryCodes[0].Id;

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

		//新闻资讯
		$scope.fetchData = function() {
			var defered = $q.defer();
			var promises = defered.promise;

			if($scope.categoryCodes.length === 0) {
				getCategorys($scope, defered);
			} else {
				defered.resolve();
			}

			promises.then(function() {
				PagerExtends.regListSpecifyPage($scope, {
					apiUrl: serverUrls.informationList,
					params: $scope.searchOption,
					success: function(response) {
						$scope.list = response;

						$scope.list.forEach(function(item, index) {
							var rangeArr = [],
								tangeArr = [];
							var rangeOne = '',
								rangeTwo = '',
								rangeThree = '';

							item.ChannelList.forEach(function(_item, _index) {
								if(_item.IsTop === 1) {
									tangeArr.push(_item.ChannelTypeName);
								}
							});
							item.deRanges = tangeArr.join();
						});
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
				Type: 1
			});
		};

		//获取发布渠道
		//获取发布范围
		var getPublicationScope = function($scope, deffered, ChannelList) {
			$scope.listBusyPromise = $http({
				method: 'get',
				url: serverUrls.channeltypeAll + "?openstate=1"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.publicationScope = response.Content;
					if(ChannelList) {
						$scope.publicationScope.map(function(v) {
							ChannelList.map(function(item) {
								if(v.Id === item.ChannelTypeId) {
									v.Checked = true;
								}
							})

						});
					}

					deffered.resolve();
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//判断提交表单是否为空
		var isNull = function($scope) {
			var a = false,
				channelType = "";
			$scope.publicationScope.map(function(v) {
				if(v.Checked) {
					channelType += v.Id + ",";
				}
			});
			channelType = channelType.substring(0, channelType.length - 1);
			$scope.news.ChannelType = channelType;
			$scope.news.MainPic = $scope.news.MainPic ? $scope.news.MainPic : "";
			$scope.news.Title = $scope.news.Title ? $scope.news.Title : "";
			$scope.news.Content = $scope.news.Content ? $scope.news.Content : "";
			for(var v in $scope.news) {
				if(!$scope.news[v] && v !== "MainPic") {
					a = true;
					return a;
				}
			}
			return a;
		};

		//初始化新增项
		var initNewsForms = function(obj) {
			if(typeof obj === "object") {
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

		//编辑
		$scope.deditorItem = function(x) {
			var defer = $q.defer();
			var promised = defer.promise;
			var ChannelList = [];
			ChannelList = x.ChannelList;
			getPublicationScope($scope, defer, ChannelList);
			if(!$scope.publicationScope || $scope.publicationScope.length === 0) {
				getPublicationScope($scope, defer, ChannelList);
			} else {
				defer.resolve();
			};
			if($scope.categoryCodes.length === 0) {
				getCategorys($scope, defer);
			} else {
				defer.resolve();
			}
			$scope.editornews.CategoryId = x.CategoryId;
			$scope.editornews = angular.copy(x);
			$scope.defaultImageSrcnew = x.MainPic;
			promised.then(function(value) {
				ngDialog.openConfirm({
					template: '_createTwo',
					scope: $scope,
					controller: ["$scope", function($scope) {

						$scope.configImageAfterUpload = function(url) {
							if(url) {
								$scope.editornews.MainPic = url !== 'img/upload.png' ? url : "";
							} else {
								layerAlert.autoclose('上传图片失败，请稍后再试！');
							}
						}

						$scope.formSubmit = function(isDraft) {
							var channelType = '';
							$scope.publicationScope.map(function(v) {
								if(v.Checked) {
									channelType += v.Id + ",";
								}
							});
							channelType = channelType.substring(0, channelType.length - 1);
							$scope.news.ChannelType = channelType;
							var param = {
									Draft: isDraft
								},
								Message = "";
							param = $.extend(true, param, $scope.editornews);
							var param = {
								"Title": param.Title,
								"CategoryId": param.CategoryId,
								"Content": param.Content,
								"MainPic": param.MainPic,
								"ChannelType": channelType,
								"Draft": param.Draft,
								"Id": x.Id,
								"IsTopRange": ""
							}
							if(!isDraft) {
								Message = "修改资讯";
							} else {
								Message = "新增草稿";
							}
							PcService.formSubmit($scope, false, [], serverUrls.upinformationNews, x, param, $rootScope.pHeader, Message);

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
		}
		//新增管理
		$scope.creatOne = function() {
			var defer = $q.defer();
			var promised = defer.promise;
			if(!$scope.publicationScope || $scope.publicationScope.length === 0) {
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

						$scope.configImageAfterUpload = function(url) {
							if(url) {
								$scope.news.MainPic = url !== 'img/upload.png' ? url : "";
							} else {
								layerAlert.autoclose('上传图片失败，请稍后再试！');
							}
						}
						$scope.formSubmit = function(isDraft) {
							if(isNull($scope)) {
								layerAlert.autoclose("表单不能为空!");
								return;
							}
							var param = {
									Draft: isDraft
								},
								Message = "";

							param = $.extend(true, param, $scope.news);
							if(!isDraft) {
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