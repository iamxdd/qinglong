App.controller('seeDetailsCtrl', ['$scope', 'PcService', '$rootScope', 'serverUrls', '$q', '$stateParams', '$location', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', function($scope, PcService, $rootScope, serverUrls, $q, $stateParams, $location, $http, ngDialog, PagerExtends, layerAlert) {
	$scope.Activitylist = [];
	$scope.Dynamiclist = [];

	$scope.Neighborhood = JSON.parse($stateParams.object)
	$scope.Presentation = $scope.Neighborhood.Presentation;
	//处理tags
	if ($scope.Neighborhood.Tags) {
		$scope.tagsList = ($scope.Neighborhood.Tags).split(",");
	}
	if ($scope.Neighborhood.IconUrl === null || $scope.Neighborhood.IconUrl === '') {
		$scope.Neighborhood.IconUrl = "app/img/nerber.png";
	}
	//选项卡
	$scope.navTabList = [{
		Id: 0,
		Name: "圈子信息",
		Active: true
	}, {
		Id: 1,
		Name: "圈子动态",
		Active: false
	}, {
		Id: 2,
		Name: "圈子活动",
		Active: false
	}, {
		Id: 3,
		Name: "相册",
		Active: false
	}, {
		Id: 4,
		Name: "议事厅",
		Active: false
	}, {
		Id: 5,
		Name: "发展史",
		Active: false
	}];

	//议事厅选项卡
	$scope.navTabListResult = [{
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

	//圈子动态评论和留言
	$scope.messageList = [{
		Id: 1,
		Name: "评论",
		Active: true
	}, {
		Id: 2,
		Name: "留言",
		Active: false
	}]

	// 圈子动态评论和留言操作
	$scope.checkedMessage = function(x) {
		$scope.messageList.forEach(function(item, index) {
			if (item.Name === x.Name) {
				item.Active = true;
			} else {
				item.Active = false;
			}
		});
		if ($scope.messageSelectTab !== x) {
			$scope.messageSelectTab = x;
			$scope.tabMessagefetchData($scope.quanziId);

		}
	};
	//议事厅选项卡操作
	$scope.discussChecked = function(x) {
		$scope.navTabListResult.forEach(function(item, index) {
			if (item.Name === x.Name) {
				item.Active = true;
			} else {
				item.Active = false;
			}
		});
		if ($scope.discussSelectTab !== x) {
			$scope.discussSelectTab = x;
			var Id = $scope.showAffairData.Id
			GetAffairVotingList(Id);

		}
	};
	$scope.tabTop = true;
	//详情页选项卡选择操作
	$scope.checked = function(x) {
		$scope.navTabList.forEach(function(item, index) {
			if (item.Name === x.Name) {
				item.Active = true;

			} else {
				item.Active = false;
			}
		});
		if ($scope.selectTab !== x) {
			$scope.selectTab = x;
			if (x.Id === 1) {
				$scope.tabTop = true;
				$scope.showOne = 1;
			} else {
				$scope.tabTop = false;

			}
			if (x.Id === 2) {
				$scope.showActivityStatus = 1;
				$scope.tabTopTwo = true;
			} else {
				$scope.tabTopTwo = false;
			}
			if (x.Id === 4) {
				$scope.showAffairStatus = 1;
				$scope.tabTopThree = true;
			} else {
				$scope.tabTopThree = false;
			}
			$scope.fetchData();

		}

	};
	//默认选中详情首页tab
	$scope.selectTab = $scope.navTabList[0];
	//默认选中议事选项卡
	$scope.discussSelectTab = $scope.navTabListResult[0];
	//默认选中评论tab
	$scope.messageSelectTab = $scope.messageList[0];

	$scope.backBtn = function(x) {
		switch (x) {
			case "one":
				$scope.showOne = 1;
				
				$scope.messageSelectTab = $scope.messageList[0];
				$scope.checkedMessage($scope.messageSelectTab);
				break;
			case "two":
				$scope.showActivityStatus = 1;
				break;
			case "four":
				$scope.showAffairStatus = 1;
				$scope.discussSelectTab = $scope.navTabListResult[0];
			default:
				break;
		}


	};
	//圈子动态详情显示
	$scope.quanziId;
	$scope.showOne = 1;
	$scope.isShow = function(x) {
		$scope.showOne = 2;

		$scope.showDetailData = x;
		$scope.showDetailData.IsDisplay == true ? $scope.showDetailData.IsDisplay = "未屏蔽" : $scope.showDetailData.IsDisplay = "已屏蔽";
		//圈子动态id
		$scope.quanziId = x.Id;
		$scope.tabMessagefetchData(x);
	};
	//圈子活动详情显示
	$scope.showActivityStatus = 1;
	$scope.showActivity = function(x) {
		$scope.showActivityData = x;
		$scope.showActivityStatus = 2;
		//通过活动id获取报名参加人员
		var Id = x.Id;
		GetActivityMemberList(Id);
	};
	//议事厅详情显示
	$scope.showAffairStatus = 1;
	$scope.showAffair = function(x) {
			$scope.showAffairData = x;

			if (x.State === '已结束') {
				$scope.showColor = 2;
			} else {
				$scope.showColor = 1;
			}
			$scope.showAffairStatus = 2;
			//通过议事Id获取投票结果
			var Id = x.Id;
			GetAffairVotingList(Id);
		}
		//通过议事id分页获取投票结果
	var GetAffairVotingList = function(id) {
			var param = {};
			var url = "";
			param.length = 10;
			param.currentPage = 1;
			param.affairId = id;
			param.votingType = 0;
			url = serverUrls.GetAffairVotingList;

			//分页获取圈子活动列表
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: url,
				params: param,
				success: function(response) {
					//这是所有投票结果
					$scope.GetAffairList = response;
					$scope.agreeList = [];
					$scope.ObjectTo = [];
					$scope.waiver = [];
					$scope.GetAffairList.forEach(function(item, index) {

						if (item.CreateByimgUrl === null || item.CreateByimgUrl === '') {
							item.CreateByimgUrl = "app/img/person.png";
						}
						switch (item.VotingType) {

							case 1:
								//同意
								item.VotingType = "同意";
								$scope.agreeList.push(item);
								break;
							case 2:
								//反对
								item.VotingType = "反对";
								$scope.ObjectTo.push(item);
								break;
							case 3:
								//弃权
								item.VotingType = "弃权";
								$scope.waiver.push(item);
								break;
							default:
								break;
						}

					});



				},
				error: function(error) {
					layerAlert.autoclose(errorResult(error));
				}
			}, $rootScope.pHeader);
		}
		//查询负责人
	$scope.NeighborhoodMenber = function() {

		var coterieId = $scope.Neighborhood.Id;
		var roleCode = "CoterieOwner"; //负责人的编码
		$scope.listBusyPromise = $http({
			headers: $rootScope.pHeader,
			method: 'get',
			url: serverUrls.getmember + "?coterieId=" + coterieId + "&roleCode=" + roleCode + "&memberState=" + 1
		}).success(function(response) {
			var Code = response.State.Code;
			var Message = response.State.Message;
			if (Code === 0) {
				var Content = response.Content;
				if (Content.length > 0 && Content[0].MemberAccount) {
					$scope.OwnerMemberAccount = Content[0].MemberAccount;
					var MemberAccount = Content[0].MemberAccount;
					$scope.memberResidentName = MemberAccount.ResidentName;
					$scope.memberName = MemberAccount.Name;
					if (MemberAccount.imgUrl === null || MemberAccount.imgUrl === '') {
						MemberAccount.imgUrl = "app/img/person.png";
					}
					$scope.memberimgUrl = MemberAccount.imgUrl;
				}

			} else {
				layerAlert.autoclose(Message);
			}
		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});
	};

	$scope.NeighborhoodMenber();

	//获取管理员成员
	$scope.CoterieManager = function() {
		var coterieId = $scope.Neighborhood.Id;
		var roleCode = "CoterieManager";
		$scope.listBusyPromise = $http({
			headers: $rootScope.pHeader,
			method: 'get',
			url: serverUrls.getmember + "?coterieId=" + coterieId + "&roleCode=" + roleCode + "&memberState=" + 1
		}).success(function(response) {
			var Code = response.State.Code;
			var Message = response.State.Message;
			if (Code === 0) {
				var Content = response.Content;
				$scope.ManagerMemberAccount = [];
				if (Content.length > 0) {
					Content.map(function(item, index) {
						//将自增的管理员Id赋值给管理员用于后面的删除
						item.MemberAccount.Id = item.Id;
						$scope.ManagerMemberAccount.push(item.MemberAccount);
					});
					$scope.ManagerMemberAccount.forEach(function(item, index) {
						if (item.imgUrl === null || item.imgUrl === '' || item.imgUrl === "string") {
							item.imgUrl = "app/img/person.png";
						}
					})
				}
			} else {
				layerAlert.autoclose(Message);
			}
		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});
	};

	$scope.CoterieManager();
	var quanziId = $scope.Neighborhood.Id;
	$scope.OpenStatebtn;
	$scope.getbyid = function(quanziId) {
		$scope.listBusyPromise = $http({
			headers: $rootScope.pHeader,
			method: "get",
			url: serverUrls.getbyid + "?id=" + quanziId
		}).success(function(response) {
			var Code = response.State.Code;
			var Message = response.State.Message;
			if (Code === 0) {
				$scope.OpenStatebtn = response.Content.OpenState;

			} else {
				layerAlert.autoclose(Message);
			}

		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});
	};
	$scope.getbyid(quanziId);
	//圈子详情是否开启按钮
	$scope.toggleOpen = function() {
		var state = 0;
		var stateText = "";
		var OpenStatebtn = $scope.OpenStatebtn;
		switch (OpenStatebtn) {
			case 1:
				state = 2;
				stateText = "关闭";
				break;
			case 2:
				var state = 1;
				var stateText = "开启";
				break;
			default:
				break;
		}
		$scope.listBusyPromise = $http({
			headers: $rootScope.pHeader,
			method: "get",
			url: serverUrls.changecoteriestate + "?id=" + quanziId + "&state=" + state
		}).success(function(response) {
			var Code = response.State.Code;
			var Message = response.State.Message;
			if (Code === 0) {
				layerAlert.autoclose(stateText + "操作成功!");
				$scope.getbyid(quanziId);
			} else {
				layerAlert.autoclose(Message);
			}

		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});

	};
	//删除管理员
	$scope.deleteManager = function(x) {

			var memberAccountId = x.Id;
			layerAlert.checkone("选择操作", function() {
				$scope.listBusyPromise = $http({
					headers: $rootScope.pHeader,
					method: 'delete',
					url: serverUrls.DeleteMemberById + "?id=" + memberAccountId
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					if (Code === 0) {
						setTimeout(function() {
							layerAlert.autoclose("删除成功");
						}, 1000);

						$scope.CoterieManager();

					} else {
						layerAlert.autoclose(Message);
					}
				}).error(function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				});

			}, function() {
				return;
			}, "确定", "取消", true, true, "确定要删除吗?");

		}
		//获取成员组成员
	$scope.CoterieGeneral = function() {
		var coterieId = $scope.Neighborhood.Id;
		var roleCode = "CoterieGeneral";
		$scope.listBusyPromise = $http({
			headers: $rootScope.pHeader,
			method: 'get',
			url: serverUrls.getmember + "?coterieId=" + coterieId + "&roleCode=" + roleCode + "&memberState=" + 1
		}).success(function(response) {
			var Code = response.State.Code;
			var Message = response.State.Message;
			if (Code === 0) {
				var Content = response.Content;
				if (Content.length > 0 && Content[0].MemberAccount) {
					$scope.GeneralMemberAccount = [];
					Content.map(function(item, index) {
						$scope.GeneralMemberAccount.push(item.MemberAccount);
					});
					$scope.GeneralMemberAccount.forEach(function(item, index) {
						if (item.imgUrl === null || item.imgUrl === '') {
							item.imgUrl = "app/img/person.png";
						}
					})

				}
			} else {
				layerAlert.autoclose(Message);
			}
		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});
	};

	$scope.CoterieGeneral();
	//切换选项卡 数据加载
	$scope.fetchData = function() {
		var param = {};
		var url = "";
		//详情页tab切换 加载对应数据
		switch ($scope.selectTab.Id) {
			case 1:
				param.length = 10;
				param.currentPage = 1;
				param.coterieId = $scope.Neighborhood.Id;
				url = serverUrls.GetCoterieDynamicList;

				//分页获取圈子动态列表
				PagerExtends.regListSpecifyPage($scope, {
					apiUrl: url,
					params: param,
					success: function(response) {
						$scope.Dynamiclist = response;
					},
					error: function(error) {
						layerAlert.autoclose(errorResult(error));
					}
				}, $rootScope.pHeader);
				break;
			case 2:
				param.length = 10;
				param.currentPage = 1;
				param.coterieId = $scope.Neighborhood.Id;
				url = serverUrls.GetCoterieActivityListByCoterieId;

				//分页获取圈子活动列表
				PagerExtends.regListSpecifyPage($scope, {
					apiUrl: url,
					params: param,
					success: function(response) {
						$scope.Activitylist = response;

					},
					error: function(error) {
						layerAlert.autoclose(errorResult(error));
					}
				}, $rootScope.pHeader);
				break;
			case 3:
				param.length = 8;
				param.currentPage = 1;
				param.coterieId = $scope.Neighborhood.Id;
				url = serverUrls.GetCoterieAlbumListByCoterieId;

				//分页获取相册列表
				//PcService.fetchData($scope, url, param, $rootScope.gHeader);
				PagerExtends.regListSpecifyPage($scope, {
					apiUrl: url,
					params: param,
					success: function(response) {
						$scope.AlbumList = response;
						$scope.AlbumList.forEach(function(item, index) {
							if (item.imgUrl === null || item.imgUrl === '' || item.imgUrl === "string") {
								item.imgUrl = "app/img/bg7.jpg";
							}
						})
					},
					error: function(error) {
						layerAlert.autoclose(errorResult(error));
					}
				}, $rootScope.pHeader);
				break;
			case 4:
				param.length = 10;
				param.currentPage = 1;
				param.coterieId = $scope.Neighborhood.Id;
				url = serverUrls.GetCoterieAffairList;

				///分页获取议事列表
				PagerExtends.regListSpecifyPage($scope, {
					apiUrl: url,
					params: param,
					success: function(response) {
						$scope.AffairList = response;
						$scope.AffairList.forEach(function(item, index) {

							switch (item.State) {
								case 1:
									item.State = "未开始";
									break;
								case 2:
									item.State = "投票中";
									break;
								case 3:
									item.State = "已结束";
									break;
								default:
									break;
							}
						})

					},
					error: function(error) {
						layerAlert.autoclose(errorResult(error));
					}
				}, $rootScope.pHeader);
				break;
			case 5:
				param.length = 10;
				param.currentPage = 1;
				param.coterieId = $scope.Neighborhood.Id;
				url = serverUrls.coteriehistory;
				//分页获取发展史
				PcService.fetchData($scope, url, param, $rootScope.gHeader);
				break;
		}
	}

	$scope.fetchData();

	//圈子动态评论和留言选项卡加载数据
	$scope.tabMessagefetchData = function(x) {
			var param = {};
			var url = "";
			//评论留言 加载对应数据
			switch ($scope.messageSelectTab.Id) {
				case 1:
					param.length = 10;
					param.currentPage = 1;
					if (x.Id) {
						param.CoterieDynamicId = x.Id;
					} else {
						param.CoterieDynamicId = x;
					}

					url = serverUrls.GetDynamicCommentListByDynamicId;
					//分页获取评论
					PagerExtends.regListSpecifyPage($scope, {
						headers: $rootScope.pHeader,
						apiUrl: url,
						params: param,
						success: function(response) {
							$scope.DynamicCommentList = response;
							$scope.DynamicCommentList.forEach(function(item, index) {
								if (item.imgUrl === null || item.imgUrl === '') {
									item.imgUrl = "app/img/person.png";
								}
								if (item.IsDisplay) {
									item.IsDisplay = "未屏蔽";
								} else {
									item.IsDisplay = "已屏蔽"
								}
							})
						},
						error: function(error) {
							layerAlert.autoclose(errorResult(error));
						}
					}, $rootScope.pHeader);
					break;
				case 2:
					param.length = 10;
					param.currentPage = 1;
					if (x.Id) {
						param.dynamicId = x.Id;
					} else {
						param.dynamicId = x;
					}

					url = serverUrls.GetDynamicMessageListByDynamicId;
					//分页获取留言
					PagerExtends.regListSpecifyPage($scope, {
						headers: $rootScope.pHeader,
						apiUrl: url,
						params: param,
						success: function(response) {
							$scope.DynamicMessageList = response;
							$scope.DynamicMessageList.forEach(function(item, index) {
								if (item.MessageByImgUrl === null || item.MessageByImgUrl === '') {
									item.MessageByImgUrl = "app/img/person.png";
								}
								if (item.IsDisplay) {
									item.IsDisplay = "未屏蔽";
								} else {
									item.IsDisplay = "已屏蔽"
								}
							})
						},
						error: function(error) {
							layerAlert.autoclose(errorResult(error));
						}
					}, $rootScope.pHeader);
					break;

			}
		}
		//通过活动id 分页获取活动参与人员
	var GetActivityMemberList = function(ActivityId) {
		var param = {};
		var url = "";
		param.length = 9;
		param.currentPage = 1;
		param.activityId = ActivityId;
		url = serverUrls.GetActivityMemberListByActivityId;

		PagerExtends.regListSpecifyPage($scope, {
			apiUrl: url,
			params: param,
			success: function(response) {
				$scope.Joinlist = response;
				$scope.Joinlist.map(function(item, index) {

					if (item.MemberAccountimgUrl === null || item.MemberAccountimgUrl === '') {
						item.MemberAccountimgUrl = "app/img/person.png";
					}
				})

			},
			error: function(error) {
				layerAlert.autoclose(errorResult(error));
			}
		}, $rootScope.pHeader);
	}
	$scope.imgList = [];
	//通过相册Id获取相册图片
	var GetAlbumImageList = function($scope, deffered, x,currentPage) {

		var Id = x.Id;
		$scope.ngDialogPromise = $http({
			headers: $rootScope.pHeader,
			method: "get",
			url: serverUrls.GetAlbumImageListByAlbumId + "?currentPage=" + currentPage + "&length=" + 5+ "&albumId=" + Id
		}).success(function(response) {
			var Code = response.State.Code;
			var Message = response.State.Message;
			$scope.imgList = [];
			if (Code === 0) {
				var Content = response.Content;
				$scope.imgList = Content.pagelist.imageList;
				
			}
			if (deffered) {
				deffered.resolve("success");
			}
		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});


	};


	//查看相册
	$scope.seePhoto = function(x) {
		//
		var defered = $q.defer();
		var promises = defered.promise;
		var currentPage=1;
		GetAlbumImageList($scope, defered, x,currentPage);
		if (!$scope.imgList || $scope.imgList.length === 0 || $scope.imgList.length>0) {
			GetAlbumImageList($scope, defered, x,currentPage);
		} else {
			defered.resolve();
		};

		promises.then(function() {
			ngDialog.openConfirm({
				template: 'createOne',
				scope: $scope,
				controller: ["$scope", function(scope) {
					scope.TitleText = "中秋活动相册";
					// $('.preview .swiper-wrapper').children('div')
					// 	                             .removeClass('active-nav')
					// 	                             .parent(".swiper-wrapper")
					// 	                             .children('div')
					// 	                             .eq(0).addClass('active-nav')
					// 	                             ;
					// var viewSwiper = new Swiper('.view .swiper-container', {
					// 			onSlideChangeStart: function() {
					// 				updateNavPosition();

					// 			}
					// 		});
					// var previewSwiper = new Swiper('.preview .swiper-container', {
					// 		visibilityFullFit: true,
					// 		slidesPerView: 'auto',
					// 		onlyExternal: true,
					// 		onSlideClick: function() {
					// 			viewSwiper.swipeTo(previewSwiper.clickedSlideIndex);
					// 		}
					// 	});
					// console.log('.arrow-left',$(".arrow-left").length)
					// $('.view .arrow-left,.preview .arrow-left').on('click', function(e) {
					// 				e.preventDefault();
					// 				if (viewSwiper.activeIndex == 0) {
					// 					viewSwiper.swipeTo(viewSwiper.slides.length - 1, 500);
					// 					return;
					// 				}
					// 				viewSwiper.swipePrev();
					// 			});

					// 	function updateNavPosition() {
					// 		$('.preview .active-nav').removeClass('active-nav');
					// 		var activeNav = $('.preview .swiper-slide').eq(viewSwiper.activeIndex).addClass('active-nav');
					// 		if (!activeNav.hasClass('swiper-slide-visible')) {
					// 			if (activeNav.index() > previewSwiper.activeIndex) {
					// 				var thumbsPerNav = Math.floor(previewSwiper.width / activeNav.width()) - 1;
					// 				previewSwiper.swipeTo(activeNav.index() - thumbsPerNav);
					// 			} else {
					// 				previewSwiper.swipeTo(activeNav.index());
					// 			}
					// 		}
					// 	}


					/*点击相册事件开始*/
					setTimeout(function() {
						$('.preview .swiper-wrapper').children('div')
						                             .removeClass('active-nav')
						                             .parent(".swiper-wrapper")
						                             .children('div')
						                             .eq(0).addClass('active-nav')
						                             ;
							var viewSwiper = new Swiper('.view .swiper-container', {
								onSlideChangeStart: function() {
									updateNavPosition();

								}
							});

							setTimeout(function() {
								$('.view .arrow-left,.preview .arrow-left').on('click', function(e) {
									e.preventDefault();
									if (viewSwiper.activeIndex == 0) {
										viewSwiper.swipeTo(viewSwiper.slides.length - 1, 500);
										return;
									}
									viewSwiper.swipePrev();
								});

								$('.view .arrow-right,.preview .arrow-right').on('click', function(e) {
									e.preventDefault();
									if (viewSwiper.activeIndex == viewSwiper.slides.length - 1) {
										currentPage++;
										
										GetAlbumImageList($scope, defered, x,currentPage);
										viewSwiper.swipeTo(0, 500);
										setTimeout(function(){
											$('.preview .swiper-wrapper').children('div')
						                             .removeClass('active-nav')
						                             .parent(".swiper-wrapper")
						                             .children('div')
						                             .eq(0).addClass('active-nav')
						                             ;
										var viewSwiper = new Swiper('.view .swiper-container', {
											onSlideChangeStart: function() {
												updateNavPosition();

											}
										});
									},800);
										setTimeout(function(){
											var previewSwiper = new Swiper('.preview .swiper-container', {
											visibilityFullFit: true,
											slidesPerView: 'auto',
											onlyExternal: true,
											onSlideClick: function() {
												viewSwiper.swipeTo(previewSwiper.clickedSlideIndex);
											}
										});
										},800)
										

										return
									}
									viewSwiper.swipeNext();
								})
							}, 800);
							var previewSwiper = new Swiper('.preview .swiper-container', {
								visibilityFullFit: true,
								slidesPerView: 'auto',
								onlyExternal: true,
								onSlideClick: function() {
									viewSwiper.swipeTo(previewSwiper.clickedSlideIndex);
								}
							});

							function updateNavPosition() {
								$('.preview .active-nav').removeClass('active-nav');
								var activeNav = $('.preview .swiper-slide').eq(viewSwiper.activeIndex).addClass('active-nav');
								if (!activeNav.hasClass('swiper-slide-visible')) {
									if (activeNav.index() > previewSwiper.activeIndex) {
										var thumbsPerNav = Math.floor(previewSwiper.width / activeNav.width()) - 1;
										previewSwiper.swipeTo(activeNav.index() - thumbsPerNav);
									} else {
										previewSwiper.swipeTo(activeNav.index());
									}
								}
							}

						}, 500)
					// 	/*点击相册事件结束*/
					scope.formSubmit = function() {
						closeThisDialog(0);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 750
			})
		}, function(value) {
			console.log(value);
		}, function(value) {
			console.log(value);
		});


	}













}]);