App.controller('draftsCtrl', ['$scope', '$state', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope, $state, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q) {
		$scope.list = [];

		$scope.categoryCodes = [];
		$scope.publicationScope = [];
		$scope.newsTypes = [];
		$scope.news = {};
		$scope.PcService = PcService;

		$scope.searchOption = {
			title: "",
			categoryCode: "",
			state: 1
		};
		$scope.newnavTabList = [{
			Id: 1,
			Name: "资讯草稿箱",
			Active: true
		}/*, {
			Id: 2,
			Name: "广告草稿箱",
			Active: false
		}*/];
		$scope.selectTab = $scope.newnavTabList[0];;
		//选项卡选择操作
		$scope.newchecked = function(x) {
			$scope.selectTab = x;
			$scope.categoryCodes = [];
			$scope.searchOption = {
				title: "",
				categoryCode: "",
				state: 1
			};
			$scope.newnavTabList.forEach(function(item, index) {
				if(item.Name === x.Name) {
					item.Active = true;
				} else {
					item.Active = false;
				}
			});
			$scope.devInit($scope.selectTab.Id);
		};
		//页面初始化 查询
		$scope.devInit = function(id) {
			var data = {},
				url = '',
				method = '',
				url1 = '';
			data = $scope.searchOption;
			url = serverUrls.informationList;
			url1 = serverUrls.informationTypeList;

			$scope.fetchData(url, url1);
		};
		//开启关闭文本显示
		$scope.toggleText = function(x) {
			var _text = "";
			switch(x.OpenState) {
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
		var deleteInfor = function(url, x, method) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: method,
				url: url
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
			
				if(Code === 0) {
					layerAlert.autoclose("删除操作成功！");
					$scope.devInit($scope.selectTab.Id);
					setTimeout(function() {
						ngDialog.close(0);
					}, 1600);
				} else {
					layerAlert.autoclose(PcService.errorResult(Message));
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		}
		//删除新闻
		$scope.deleteItem = function(x) {
			layerAlert.checkone("执行删除操作", function() {
				switch($scope.selectTab.Id) {
					case 1:
						deleteInfor(serverUrls.informationDetail + "?id=" + x.Id, x, "delete")
						break;
					case 2:
						deleteInfor(serverUrls.adIsdelete + "?id=" + x.Id + "&state=" + 0, x, "get")
						break;
					default:
						break;
				}

			}, function() {}, "确定", "取消", true, true);

		};

		//重新发布
		$scope.submitItem = function(x) {
			layerAlert.checkone("重新发布操作", function() {
				var ChannelType = "";
				var data = {};
				var url = '';
				x.ChannelList.forEach(function(item, index) {
					ChannelType += item.ChannelTypeId + ",";
				});
				ChannelType = ChannelType.substring(0, ChannelType.length - 1);
				if($scope.selectTab.Id == 1) {
					data = {
						Title: x.Title,
						CategoryId: x.CategoryId,
						Content: x.Content,
						MainPic: x.MainPic,
						ChannelType: ChannelType,
						Draft: false,
						Id: x.Id,
						IsTopRange: ""
					};

					url = serverUrls.upInformation;
				} else {
					data = {
						"Id": x.Id,
						"Title": x.Title,
						"CategoryId": x.CategoryId,
						"Content": x.Content,
						"MainPic": x.MainPic,
						"ChannelType": ChannelType,
						"Draft": false,
						"PushStartAt": x.PushStartAt,
						"PushEndAt": x.PushEndAt,
						"Frequency": x.Frequency,
						"PushCount": x.PushCount,
						"CreatedAt": x.CreatedAt
					};
					url = serverUrls.upadcontent;
				}

				$scope.listBusyPromise = $http({
					headers: $rootScope.pHeader,
					method: 'put',
					url: url,
					data: data
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					if(Code === 0) {
						layerAlert.autoclose("发布成功!");
						setTimeout(function() {
							$scope.devInit($scope.selectTab.Id);
						}, 1000);
					} else {
						layerAlert.autoclose(Message);
					}
				}).error(function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				});
			}, function() {}, "发布", "取消", true, true);
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

		//置顶
		$scope.toplItem = function(x) {
			var IsTop = "",
				actionText = "";
			if(x.IsTop === 0) {
				IsTop = 1;
				actionText = "置顶";
			} else if(x.IsTop === 1) {
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
				if(Code === 0) {
					layerAlert.autoclose(actionText + "操作成功！");
					$scope.devInit($scope.selectTab.Id);
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
				if(Code === 0) {
					$scope.categoryCodes = response.Content;
					
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
		$scope.fetchData = function(url, url1) {
			var defered = $q.defer();
			var promises = defered.promise;
			// if($scope.selectTab.Id===1){
			// 	getCategorys($scope, defered, url1);
			// }
			if($scope.categoryCodes.length === 0) {
				getCategorys($scope, defered, url1);
			} else {
				defered.resolve();
			}

			promises.then(function() {
				PagerExtends.regListSpecifyPage($scope, {
					apiUrl: url,
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
						layerAlert.autoclose(PcService.errorResult(error));
					}
				}, $rootScope.pHeader);
			}, function(value) {
				console.log(value);
			}, function(value) {
				console.log(value);
			});

		};

		// $scope.fetchData();

		$scope.devInit($scope.selectTab.Id)
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
			var id = ($scope.selectTab.Id == 1 ? 1 : 2);
			$state.go("app.newsDetail", {
				Id: x.Id,
				Type: id
			});
		};

		//恢复新闻
		$scope.recyleData = function(x) {

			layerAlert.checkone("执行恢复操作", function() {
				$scope.listBusyPromise = $http({
					headers: $rootScope.pHeader,
					method: 'get',
					url: serverUrls.isdelete + "?id=" + x.Id + "&state=1"
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					if(Code === 0) {
						layerAlert.autoclose("恢复成功!");
						setTimeout(function() {
							$scope.devInit($scope.selectTab.Id);
						}, 1000);
					} else {
						layerAlert.autoclose(Message);
					}
				}).error(function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				});
			}, function() {}, "确定", "取消", true, true);

		};

		//获取发布渠道
		//获取发布范围
		var getPublicationScope = function($scope, deffered, ChannelList) {
			var url = ($scope.selectTab.Id === 1 ? serverUrls.channeltypeAll + "?openstate=1" : serverUrls.advertisementChanneltypeall + "?openstate=1");
			$scope.listBusyPromise = $http({
				method: 'get',
				url: url
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

		$scope.configImageAfterUpload = function(url) {
			if(url) {
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
				if(!$scope.news[v]) {
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
		$scope.informationByIdData = {};
		var informationById = function(id) {
			var url = ($scope.selectTab.Id === 1 ? serverUrls.informationById + "?id=" + id : serverUrls.adContentDetail + "?id=" + id)
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: 'get',
				url: url
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.informationByIdData = response.Content;
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		}
		//修改
		$scope.deditorItem = function(x) {
			var defer = $q.defer();
			var promised = defer.promise;
			informationById(x.Id);
			var ChannelList = [];
			$scope.publicationScope = [];
			ChannelList = x.ChannelList;
			getPublicationScope($scope, defer, ChannelList);
			if(!$scope.publicationScope || $scope.publicationScope.length === 0) {
				getPublicationScope($scope, defer, ChannelList);
			} else {
				defer.resolve();
			};
			if($scope.categoryCodes.length === 0) {
				getCategorys($scope, defer, serverUrls.informationTypeList);

			} else {
				defer.resolve();
			}

			$scope.informationByIdData.CategoryId = x.CategoryId;
			$scope.news.MainPic=x.MainPic;
			$scope.defaultImageSrcnew = x.MainPic;
			promised.then(function(value) {
				ngDialog.openConfirm({
					template: '_createTwo',
					scope: $scope,
					controller: ["$scope", function($scope) {
						
						$scope.textTitle = "修改资讯草稿箱";
						$scope.formSubmit = function() {
							var channelType = '';
							$scope.publicationScope.map(function(v) {
								if(v.Checked) {
									channelType += v.Id + ",";
								}
							});
							channelType = channelType.substring(0, channelType.length - 1);
							$scope.news.ChannelType = channelType;
							var param = {},
								Message = "";
							param = $.extend(true, param, $scope.informationByIdData);
							/*paramTwo = $.extend(true, param, $scope.informationByIdData);*/
							var param = {
								"Title": param.Title,
								"CategoryId": param.CategoryId,
								"Content": param.Content,
								"MainPic": $scope.news.MainPic,
								"ChannelType": channelType,
								"Draft": true,
								"Id": x.Id
							}
							/*var paramTwo = {
								"Id": x.Id,
								"Title": paramTwo.Title,
								"CategoryId": paramTwo.CategoryId,
								"Content": paramTwo.Content,
								"MainPic": paramTwo.MainPic,
								"ChannelType": channelType,
								"Draft": paramTwo.Draft,
								"PushStartAt": x.PushStartAt,
								"PushEndAt": x.PushEndAt,
								"Frequency": x.Frequency,
								"PushCount": x.PushCount,
								"CreatedAt": paramTwo.CreatedAt
							}*/
							if($scope.news.MainPic==undefined || $scope.news.MainPic==''){
								layerAlert.autoclose("表单不能为空!");
								return;
							}
							
							//草稿箱
							formSubmit($scope, serverUrls.upinformationNews, 'put', param);
							

						};
						$scope.closeDialog = function() {
							ngDialog.closeAll();
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
		var formSubmit = function(scope, url, method, data) {
			scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: method,
				url: url,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("操作成功！");
					if(scope) {
						scope.devInit($scope.selectTab.Id);
					}
					setTimeout(function() {
						scope.closeThisDialog();
					}, 1600);
				} else {
					layerAlert.autoclose(PcService.errorResult(Message));
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
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