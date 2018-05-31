App.controller('advertisingInfoCtrl', ['$scope', '$rootScope', '$state', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q', '$filter',
	function($scope, $rootScope, $state, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q, $filter) {

		$scope.list = [];
		$scope.adcontentData = {};
		$scope.editoradvertisement = {};
		//筛选字段赋初值
		$scope.searchOption = {
			title: "",
			state: 5,
			categoryCode: "",
		};
		$scope.PcService = PcService;

		//发布渠道
		$scope.publicationScope = [];

		$scope.news = {};
		$scope.positionSelect = [];
		//筛选状态0:全部,1:草稿,2:待审核,3:审核通过,4:审核未通过,5:非草稿,
		$scope.statusSlect = [{
			Name: '全部',
			Id: 5
		}, {
			Name: '待审核',
			Id: 2
		}, {
			Name: '已通过',
			Id: 3
		}, {
			Name: '未通过',
			Id: 4
		}];

		$scope._statusSlect = [{
			Name: '草稿',
			Id: 1
		}, {
			Name: '待审核',
			Id: 2
		}, {
			Name: '已通过',
			Id: 3
		}, {
			Name: '未通过',
			Id: 4
		}];

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

		//删除广告
		$scope.deieteItem = function(x) {
			layerAlert.checkone("执行删除操作", function() {
				$scope.listBusyPromise = $http({
					headers: $rootScope.pHeader,
					method: 'get',
					url: serverUrls.adIsdelete + "?id=" + x.Id + "&state=0"
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
			PcService.toggleItem($scope, x, serverUrls.adInopenstate);
		};

		//广告详情
		$scope.detailItem = function(x) {
			$state.go("app.newsDetail", {
				Id: x.Id,
				Type: 2
			});
		};

		//获取所有广告分类
		var getCategorys = function($scope, deffered) {
			$scope.listBusyPromise = $http({
				method: 'get',
				url: serverUrls.categoryAll
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.positionSelect = response.Content;
					$scope.positionSelect = $filter("hasParents")($scope.positionSelect);
					//$scope.searchOption.categoryCode = $scope.positionSelect[0].Code;
					//$scope.news.CategoryId = $scope.positionSelect[0].Id;
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

		//获取广告列表
		$scope.fetchData = function() {
			var defered = $q.defer();
			var promised = defered.promise;
			if($scope.positionSelect.length === 0) {
				getCategorys($scope, defered);
			} else {
				defered.resolve();
			}
			promised.then(function() {
				PcService.fetchData($scope, serverUrls.adverList, $scope.searchOption);
			}, function() {

			}, function() {

			});

		};

		$scope.configImageAfterUpload = function(url) {
			if(url) {
				$scope.news.MainPic = url !== 'img/upload.png' ? url : "";
			} else {
				layerAlert.autoclose('上传图片失败，请稍后再试！');
			}
		}

		$scope.fetchData();

		//点击查看详情按钮跳转页面
		$scope.seeAdvertisDetails = function(x) {
			$state.go("app.advertisingDetails", {
				Id: x.Id
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
			$scope.news.PushStartAt = $scope.news.PushStartAt ? $scope.news.PushStartAt : "";
			$scope.news.PushEndAt = $scope.news.PushEndAt ? $scope.news.PushEndAt : "";
			$scope.news.Frequency = $scope.news.Frequency ? $scope.news.Frequency : "";
			$scope.news.PushCount = $scope.news.PushCount ? $scope.news.PushCount : "";
			for(var v in $scope.news) {
				if(!$scope.news[v]) {
					a = true;
					return a;
				}
			}
			return a;
		};

		var isNullEditor = function($scope) {
			var a = false,
				channelType = "";
			$scope.publicationScope.map(function(v) {
				if(v.Checked) {
					channelType += v.Id + ",";
				}
			});
			channelType = channelType.substring(0, channelType.length - 1);
			$scope.editoradvertisement.ChannelType = channelType;
			$scope.editoradvertisement.MainPic = $scope.editoradvertisement.MainPic ? $scope.editoradvertisement.MainPic : "";
			$scope.editoradvertisement.Title = $scope.editoradvertisement.Title ? $scope.editoradvertisement.Title : "";
			$scope.editoradvertisement.Content = $scope.editoradvertisement.Content ? $scope.editoradvertisement.Content : "";
			$scope.editoradvertisement.PushStartAt = $scope.editoradvertisement.PushStartAt ? $scope.editoradvertisement.PushStartAt : "";
			$scope.editoradvertisement.PushEndAt = $scope.editoradvertisement.PushEndAt ? $scope.editoradvertisement.PushEndAt : "";
			$scope.editoradvertisement.Frequency = $scope.editoradvertisement.Frequency ? $scope.editoradvertisement.Frequency : "";
			$scope.editoradvertisement.PushCount = $scope.editoradvertisement.PushCount ? $scope.editoradvertisement.PushCount : "";
			for(var v in $scope.editoradvertisement) {
				if(v != "BrowseCount" && v !== "MainPic") {
					if(!$scope.editoradvertisement[v]) {
						a = true;
						return a;
					}
				}
			}
			return a;
		};
		//初始化新增项
		var initNewsForms = function(obj) {

			if(typeof obj === "object") {
				if($scope.positionSelect.length === 0 || !$scope.positionSelect) {
					layerAlert.autoclose("分类为空！无法添加!");
					return;
				} else {
					obj.Title = "";
					obj.Content = "";
					obj.MainPic = "";
					obj.PushStartAt = "";
					obj.PushEndAt = "";
					obj.Frequency = "";
					obj.PushCount = "";
					obj.CategoryId = $scope.positionSelect[0].Id;
					$scope.publicationScope.map(function(v) {
						v.Checked = false;
					});
				}

			}
		};
		var adcontentByid = function(id, $scope) {
			$scope.listBusyPromise = $http({
				method: 'get',
				url: serverUrls.adcontentByid + "?id=" + id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.adcontentData = response.Content;
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
			adcontentByid(x.Id, $scope);
			var ChannelList = x.ChannelList;
			getPublicationScope($scope, defer, ChannelList);
			if(!$scope.publicationScope || $scope.publicationScope.length === 0) {
				getPublicationScope($scope, defer, ChannelList);
			} else {
				defer.resolve();
			};
			$scope.editoradvertisement.CategoryId = x.CategoryId;

			$scope.defaultImageSrcnew = x.MainPic;
			if(x.PushStartAt && x.PushEndAt) {
				var PushStartAt = x.PushStartAt;
				var PushEndAt = x.PushEndAt;
				x.PushStartAt = $filter("date")(PushStartAt, "yyyy-MM-dd HH:mm");
				x.PushEndAt = $filter("date")(PushEndAt, "yyyy-MM-dd HH:mm");
			}
			var newX = {};
			newX = angular.copy(x);
			$scope.editoradvertisement.Title = newX.Title;
			$scope.editoradvertisement.Content = newX.Content;
			$scope.editoradvertisement.MainPic = newX.MainPic;
			$scope.editoradvertisement.ChannelType = newX.ChannelType;
			$scope.editoradvertisement.PushStartAt = newX.PushStartAt;
			$scope.editoradvertisement.PushEndAt = newX.PushEndAt;
			$scope.editoradvertisement.Frequency = newX.Frequency;
			$scope.editoradvertisement.PushCount = newX.PushCount;

			ngDialog.openConfirm({
				template: "createTwo",
				scope: $scope,
				controller: ['$scope', function($scope) {

					$scope.TitleText = "修改";
					$scope.defaultImageSrc = x.MainPic;
					$scope.formSubmit = function(isDraft) {
						var channelType = '';

						$scope.publicationScope.map(function(v) {
							if(v.Checked) {
								channelType += v.Id + ",";
							}
						});
						channelType = channelType.substring(0, channelType.length - 1);
						if(isNullEditor($scope)) {
							layerAlert.autoclose("表单不能为空!");
							return;
						}

						var param = $.extend(true, param, $scope.editoradvertisement);
						var _param = {
							"Id": x.Id,
							"Title": param.Title,
							"CategoryId": param.CategoryId,
							"Content": param.Content,
							"MainPic": $scope.news.MainPic,
							"ChannelType": channelType,
							"PushStartAt": param.PushStartAt,
							"PushEndAt": param.PushEndAt,
							"Frequency": param.Frequency,
							"PushCount": param.PushCount,
							"Draft": isDraft
						}

						var Message = "";
						if(!isDraft) {
							Message = "修改广告";
						} else {
							Message = "新增草稿";
						}
						PcService.formSubmit($scope, false, [], serverUrls.upadcontent, x, _param, $rootScope.pHeader, Message);

					};
					$scope.closeDialog = function() {
						$scope.closeThisDialog();
					};
				}],
				className: 'ngdialog-theme-default',
				closeByDocument: false,
				width: 900,

			});
			setTimeout(function() {
				//时间插件
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
			}, 20);
		}
		//获取发布渠道
		var getPublicationScope = function($scope, deffered, ChannelList) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.adChanneltypeall + "?openstate=1"
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

		//点击添加按钮 添加广告资讯
		$scope.creatOne = function() {
			if($scope.positionSelect.length === 0 || !$scope.positionSelect) {
				layerAlert.autoclose("分类为空！无法添加!");
				return;
			}
			var defer = $q.defer();
			var promised = defer.promise;
			if(!$scope.publicationScope || $scope.publicationScope.length === 0) {
				getPublicationScope($scope, defer);
			} else {
				defer.resolve();
			};
			ngDialog.openConfirm({
				template: "createOne",
				scope: $scope,
				controller: ['$scope', function($scope) {
					initNewsForms($scope.news);
					$scope.TitleText = "添加";

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
							Message = "新增广告";
						} else {
							Message = "新增草稿";
						}
						PcService.formSubmit($scope, true, [], serverUrls.addAdinformation, null, param, $rootScope.pHeader, Message);
					};
					$scope.closeDialog = function() {
						$scope.closeThisDialog();
					};
				}],
				className: 'ngdialog-theme-default',
				closeByDocument: false,
				width: 900,

			});
			setTimeout(function() {
				//时间插件
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
			}, 20);
		};

	}
]);