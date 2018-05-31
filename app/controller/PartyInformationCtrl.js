App.controller('PartyInformationCtrl', ['$scope', '$state', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope, $state, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q) {
		$scope.list = [];
		$scope.partyorganizationlist = [];
		$scope.PcService = PcService;
		$scope.selectPublicationScope = [];
		//新增党组资讯
		$scope.organization = {};
		$scope.organizationTop = {};
		$scope.searchOption = {
			value: "",
			partyOrganizationId: 0,
			reviewState:0

		};
		$scope.reviewState = [{
			Name: '全部',
			Id: 0
		}, {
			Name: '待审核',
			Id: 1
		}, {
			Name: '已通过',
			Id: 2
		}, {
			Name: '未通过',
			Id: 3
		}, {
			Name: '未提交',
			Id: 4
		}];
		$scope.numText=function(id,arr){
			var text=''
			arr.forEach(function(v){
				if(id==v.Id){
                  text=v.Name
				}
			});
			return text;
		}

		//获取发布范围
		$scope.publicationScope = [{
			Id: 1,
			Name: "pad"
		}, {
			Id: 2,
			Name: '移动端'

		}, {
			Id: 3,
			Name: '大屏广告'

		}];
		//置顶范围
		$scope.publicationScopeTop = [{
			Id: 1,
			Name: "pad",
			editor: true
		}, {
			Id: 2,
			Name: '移动端',
			editor: true

		}, {
			Id: 3,
			Name: '大屏广告',
			editor: true

		}];

		//开启关闭文本显示
		$scope.toggleText = function(x) {
			var _text = "";
			switch (x.OpenState) {
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
			var state = 0;
			var stateText = "";
			switch (x.OpenState) {
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

			if (state !== 2 && state !== 1) {
				return;
			}
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.isopenstate + "?id=" + x.Id + "&state=" + state
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
		//置顶文本显示
		$scope.topText = function(x) {
			var Channel = x.Channel;
			var actionText = "";
			if (Channel.length > 0) {
				Channel.sort(function sortNumber(a, b) {
					return b.IsTop - a.IsTop
				});
				if (Channel[0].IsTop === 1) {
					actionText = "取消置顶";
				}
				if (Channel[0].IsTop === 0) {
					actionText = "设为置顶";
				}
			} else {
				actionText = "设为置顶";
			}
			return actionText;
		};

		//置顶class
		$scope.isTopToggle = function(x) {
			var Channel = x.Channel;
			var actionclass = 0;
			if (Channel.length > 0) {
				Channel.sort(function sortNumber(a, b) {
					return b.IsTop - a.IsTop
				});
				if (Channel[0].IsTop === 1) {
					actionclass = 1;
				}
				if (Channel[0].IsTop === 0) {
					actionclass = 0;
				}
			} else {
				actionclass = 0;
			}
			return {
				'btn-default': actionclass === 0 || !actionclass,
				'btn-primary': actionclass === 1
			};
		};
		//确认置顶
		var sureTop = function(x, $scope) {
				var Channel = x.Channel;
				var actionText = "置顶设置";
				var channelType = "";
				$scope.selectPublicationScope.map(function(v) {
					if (v.Checked) {
						channelType += v.Id + ",";
					}
				});
				channelType = channelType.substring(0, channelType.length - 1);
				
				$scope.ngDialogPromise = $http({
					headers: $rootScope.pHeader,
					method: "get",
					url: serverUrls.istop + "?id=" + x.Id + "&IsTopRange=" + channelType
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					if (Code === 0) {
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
			var selectPublication = x.Channel;
			var selectPublicationNew = [];
			for (var i = 0; i < selectPublication.length; i++) {
				$scope.publicationScope.forEach(function(item, index) {
					if (item.Id === selectPublication[i].ChannelType) {
						if (selectPublication[i].IsTop === 1) {
							item.Checked = true;
						} else {
							item.Checked = false;
						}
						selectPublicationNew.push(item);
					}
				});
			}
			$scope.selectPublicationScope = selectPublicationNew;
			ngDialog.openConfirm({
				template: 'createTop',
				scope: $scope,
				controller: ["$scope", function($scope) {
					//initForms($scope.organization);
					$scope.formSubmit = function() {
						sureTop(x, $scope);
					};
					$scope.closeDialog = function() {
						$scope.closeThisDialog();
					};
				}],
				className: 'ngdialog-theme-default',
				width: 684
			});

		};
		//删除党组资讯
		$scope.deieteItem = function(x) {
			layerAlert.checkone("选择操作", function() {
				$scope.listBusyPromise = $http({
					headers: $rootScope.pHeader,
					method: 'delete',
					url: serverUrls.partyIsdelete + "?id=" + x.Id
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					if (Code === 0) {
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
			}, function() {
				return;
			}, "确定", "取消", true, true, "确定要删除吗?");

		};
		//查看详情
		$scope.detailItem = function(x) {
			$scope.DetailsData = JSON.stringify(x);
			$state.go("app.partyInformationDetails", {
				object: $scope.DetailsData
			});
		};
		//获取党组织
		var getPartyorganizationlist = function($scope, deffered) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: 'get',
				url: serverUrls.partyorganizationall + "?state=" + 1
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					var Content = response.Content
					$scope.partyorganizationlist = Content;
					$scope.organization.PartyOrganizationId = $scope.partyorganizationlist[0].Id;
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
		//分页获取党组资讯
		$scope.fetchData = function() {
			var defered = $q.defer();
			var promises = defered.promise;

			if ($scope.partyorganizationlist.length === 0) {
				getPartyorganizationlist($scope, defered);
			} else {
				defered.resolve();
			}

			promises.then(function() {
				PagerExtends.regListSpecifyPage($scope, {
					apiUrl: serverUrls.partyInformationlist,
					params: $scope.searchOption,
					success: function(response) {
						$scope.list = response;
						$scope.list.forEach(function(item, index) {
							var rangeArr = [],
								tangeArr = [];
							var rangeOne = '',
								rangeTwo = '',
								rangeThree = '';

							item.Channel.forEach(function(_item, _index) {
								if (_item.IsTop === 1) {
									tangeArr.push(_item.ChannelType);
								}
								switch (_item.ChannelType) {
									case 1:
										rangeOne = "pad";
										rangeArr.push(rangeOne);
										break;
									case 2:
										rangeTwo = "移动端";
										rangeArr.push(rangeTwo);
										break;
									case 3:
										rangeThree = "大屏广告";
										rangeArr.push(rangeThree);
										break;

									default:
										break;
								}

							});
							var newTangeArr = [];
							tangeArr.forEach(function(ite, inde) {
								newTangeArr.push(PcService.numberToText(ite, $scope.publicationScope));
							});
							item.topRanges = rangeArr.join();
							item.deRanges = newTangeArr.join();
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

		//初始化新增项
		var initForms = function(obj) {
			if (typeof obj === "object") {
				obj.Title = "";
				obj.Content = "";
				obj.MainPic = "";
				//object.ChannelType = "";
				obj.PartyOrganizationId = $scope.partyorganizationlist[0].Id;
				/*$scope.publicationScope.map(function(v) {
					v.Checked = false;
				});
				$scope.publicationScopeTop.map(function(v) {
					v.Checked = false;
				});*/
			}
		};

		$scope.fieldsList = [{
			name: "Name",
			nameDisplay: "上传文件",
			editor: "file-upload",
			required: true,
			value: "",
			originValue: ""
		}];
		$scope.configImageAfterUpload = function(url) {
			if (url) {
				$scope.organization.MainPic = url !== 'img/upload.png' ? url : "";
			} else {
				layerAlert.autoclose('上传图片失败，请稍后再试！');
			}
		};
		//判断提交表单是否为空
		var isNull = function($scope) {
			var a = false,
				channelType = "";
			/*$scope.publicationScope.map(function(v) {
				if (v.Checked) {
					channelType += v.Id + ",";
				}
			});
			channelType = channelType.substring(0, channelType.length - 1);
			
			var channelTypeTop = "";
			$scope.publicationScopeTop.map(function(v) {
				if (v.Checked) {
					channelTypeTop += v.Id + ",";
				}
			});
			channelTypeTop = channelTypeTop.substring(0, channelTypeTop.length - 1);
			$scope.organization.ChannelType = channelType;
			$scope.organizationTop.ChannelTypeTop = channelTypeTop;*/
			$scope.organization.MainPic = $scope.organization.MainPic ? $scope.organization.MainPic : "";
			$scope.organization.Title = $scope.organization.Title ? $scope.organization.Title : "";
			$scope.organization.Content = $scope.organization.Content ? $scope.organization.Content : "";
			for (var v in $scope.organization) {
				if (!$scope.organization[v]) {
					a = true;
					return a;
				}
			}
			return a;
		};
		$scope.radioChange = function() {
				$scope.publicationScopeTop.forEach(function(v, i) {
					if ($scope.publicationScope[i].Checked) {
						v.editor = false;
						v.Checked = false;
					} else {
						v.editor = true;
						v.Checked = false
					}
				});
			}
			//新增管理
		$scope.creatOne = function() {
			ngDialog.openConfirm({
				template: '_createOne',
				scope: $scope,
				controller: ["$scope", function($scope) {
					initForms($scope.organization);

					$scope.formSubmit = function() {
						if (isNull($scope)) {
							layerAlert.autoclose("表单不能为空!");
							return;
						}
						var param = $.extend(true, param, $scope.organization);
						var paramTop = $.extend(true, param, $scope.organizationTop);
						var data = {
							"Title": param.Title,
							"PartyOrganizationId": param.PartyOrganizationId,
							"Content": param.Content,
							"MainPic": param.MainPic,
							"Range": "2",
							"IsTopRange": '2'
						}
						console.log(data);
						//提交表单
						PcService.formSubmit($scope, true, [], serverUrls.partyAddinformation, null, data, $rootScope.pHeader);
					};
					$scope.closeDialog = function() {
						$scope.closeThisDialog();
					};
				}],
				className: 'ngdialog-theme-default',
				width: 900
			});
		};
	}
]);