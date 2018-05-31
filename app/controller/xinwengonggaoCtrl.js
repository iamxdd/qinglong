App.controller('xinwengonggaoCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'datepickerConfig', 'serverUrls', 'PcService', '$filter', '$q',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, datepickerConfig, serverUrls, PcService, $filter, $q) {
		$scope.list = [];
		$scope.PcService = PcService;
		$scope.TitleText = "新增";
		//发布范围
		$scope.publicationScope = [];
		$scope.newsTypes = [];
		$scope.searchOption = {};
		$scope.categoryOption = {
			value: ""
		};
		$scope.channelOption = {
			name: ""
		};

		//新增新闻
		$scope.news = {};

		$scope.navTabList = [{
			Id: 1,
			Name: "新闻公告列表",
			Active: true
		}, {
			Id: 2,
			Name: "新闻类型管理",
			Active: false
		}, {
			Id: 3,
			Name: "发布范围管理",
			Active: false
		}];

		$scope.selectItem = $scope.navTabList[0];

		//选项卡操作
		$scope.checked = function(x) {
			$scope.selectItem = x;
			$scope.navTabList.forEach(function(item, index) {
				if(item.Id === x.Id) {
					item.Active = true;
				} else {
					item.Active = false;
				}
			});
			$scope.fetchData();
		};

		//启用停用发布范围
		$scope.toggleCategory = function(x) {
			PcService.toggleItem($scope, x, serverUrls.channelTypestate);
		};

		$scope.ChannelTypes = function(ChannelList) {
			var types = "";
			if(!ChannelList || ChannelList.length === 0) {
				types = "无";
			} else {
				ChannelList.forEach(function(item, index) {
					types += item.ChannelTypeName + ",";
				});
				types = types.substring(0, types.length - 1);
			}
			return types;
		};

		//获取新闻分类列表（下拉选择菜单用）
		var getNewsTypes = function($scope, deffered, name) {
			$scope.listBusyPromise = $http({
				method: 'get',
				url: serverUrls.informationTypeList
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.newsTypes = response.Content;
					if(name) {
						var initArray = [{
							Id: 0,
							Name: "无父级分类"
						}];
						$scope.fieldsList[0][2].opts = initArray.concat($scope.newsTypes);
						$scope.fieldsList[0][2].originValue = $scope.newsTypes[0].Id;
					}
					deffered.resolve();
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});

		};

		//获取发布范围
		var getPublicationScope = function($scope, deffered) {
			$scope.listBusyPromise = $http({
				method: 'get',
				url: serverUrls.channelTypelist + "?length=9999&currentPage=1&openstate=1"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.publicationScope = response.Content.pagelist;
					getNewsTypes($scope, deffered);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//新闻类型
		$scope.newsTypes = [{
			Id: 0,
			Name: "请选择"
		}];

		$scope.disabledItem = function(x) {
			var disabled = true;
			if(x.State === 2) {
				disabled = false;
			}
			return disabled;
		};

		$scope.classItem = function(x) {
			return {
				'btn-info': x.InformationState === 2,
				'btn-default': x.InformationState !== 2
			};
		};

		/*$scope.checkText = function(x) {
			var _text = "无法审核";
			switch(x.InformationState) {
				case 0:
					break;
				case 1:
					_text = "草稿";
					break;
				case 2:
					_text = "审核";
					break;
				case 4:
					_text = "审核失败";
					break;
				case 5:
					_text = "已发布";
					break;
				default:
					_text = "审核";
					break;
			}
			return _text;
		};*/

		var getFormData = function(screenfields) {
			var data = {};
			screenfields.forEach(function(item, index) {
				if(item.editor === 'double-datePick') {
					data[item.name1] = item.value1;
					data[item.name2] = item.value2;
				} else {
					data[item.name] = item.value;
				}
			});
			return data;
		};

		var bindOptons = function(name, opts, fieldsList) {
			fieldsList.forEach(function(item, index) {
				if(item.name === name) {
					item.opts = opts;
					item.originValue = opts[0] ? opts[0].Id : "";
				}
			});
		};

		var initFormlist = function(_obj) {
			_obj.CategoryId = $scope.newsTypes[0].Id;
			_obj.Title = "";
			_obj.Author = "";
			_obj.Content = "";
			_obj.Abstract = "";
			_obj.ChannelType = $scope.publicationScope[0].Id;
		};

		//提交新闻新增修改保存
		var formSubmit = function($scope, draft, obj, create, id, _scope) {
			if(!obj.ChannelType) {
				layerAlert.autoclose("发布范围不能为空！");
				return;
			}
			var url, method, isCreate, data = {
				Title: obj.Title,
				CategoryId: obj.CategoryId,
				Content: obj.Content,
				Abstract: obj.Abstract,
				Author: obj.Author,
				ChannelType: obj.ChannelType,
				Draft: draft
			};

			switch(create) {
				case true:
					url = serverUrls.addInformation;
					method = "post";
					isCreate = "新增";
					break;
				case false:
					url = serverUrls.upInformation;
					method = "put";
					isCreate = "修改";
					data.Id = id;
					break;
			}

			var doAction = "";
			switch(draft) {
				case true:
					doAction = "草稿";
					break;
				case false:
					doAction = "新闻";
					break;
			}
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: method,
				url: url,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose(isCreate + doAction + "操作成功！");
					setTimeout(function() {
						ngDialog.closeAll();
					}, 1600);
					_scope.screenfields[2].value1 = $filter('date')(new Date() - 30 * 24 * 3600000, "yyyy-MM-dd HH:mm");
					_scope.screenfields[2].value2 = $filter('date')(new Date(), "yyyy-MM-dd HH:mm");
					$scope.fetchData();
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var newsTypesFormSubmit = function(_scope, $scope, url, fieldsList, isFresh) {
			$scope.ngDialogPromise = $http({
				method: 'post',
				url: url,
				data: PcService.getFormData(fieldsList)
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("新增成功！");
					getNewsTypes(_scope);
					setTimeout(function() {
						$scope.closeThisDialog();
					});
					if(isFresh) {
						getPublicationScope();
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var creatNewsTypes = function($scope) {
			var _scope = $scope;
			ngDialog.openConfirm({
				template: 'creatNewsTypes',
				controller: ["$scope", function($scope) {
					$scope.TitleText = "新增新闻类型";
					$scope.fieldsList = [{
						name: "Name",
						nameDisplay: "名称",
						editor: "normal",
						required: true,
						value: "",
						originValue: ""
					}];

					$scope.formSubmit = function() {
						newsTypesFormSubmit(_scope, $scope, serverUrls.inCategory, $scope.fieldsList);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});
		};
		var initIds = function(obj) {
			var ChannelType = obj.ChannelType;
			var ids = "";
			for(var i = 0; i < ChannelType.length; i++) {
				ids += ChannelType[i].Id + ",";
			}
			ids = ids.substring(0, ids.length - 1);
			obj.ChannelType = ids;
		};

		//新增新闻发布范围
		$scope.addScope = function() {
			var deffered = $q.defer();
			var promises = deffered.promise;
			getPublicationScope($scope, deffered);
			promises.then(function() {
				var fetchData = $scope.fetchData;
				ngDialog.openConfirm({
					template: 'creatNewsTypes',
					controller: ["$scope", function($scope) {
						$scope.TitleText = "新增发布范围";
						$scope.fetchData = fetchData;
						$scope.fieldsList = [{
							name: "Name",
							nameDisplay: "名称",
							editor: "normal",
							required: true,
							value: "",
							originValue: ""
						}];

						//新增提交
						$scope.formSubmit = function() {
							newsTypesFormSubmit(null, $scope, serverUrls.inChanneltype, $scope.fieldsList, true);
						};

					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 600
				});
			});

		};

		//新增管理
		$scope.creatOne = function() {
			var deffered = $q.defer();
			var promises = deffered.promise;
			getPublicationScope($scope, deffered);
			promises.then(function() {
				var newsTypes = $scope.newsTypes;
				var publicationScope = $scope.publicationScope;
				var news = $scope.news;
				var fetchData = $scope.fetchData;
				var _scope = $scope;
				initFormlist(news);
				ngDialog.openConfirm({
					template: 'createOne',
					controller: ["$scope", function($scope) {
						$scope.TitleText = "新增新闻发布";
						$scope.fetchData = fetchData;
						$scope.newsTypes = newsTypes;
						$scope.publicationScope = publicationScope;
						$scope.news = news;
						$scope.disabled = false;
						$scope.create = true;
						$scope.news.CategoryId = $scope.newsTypes[0].Id;

						//关闭弹出窗口
						$scope.closeDialog = function() {
							ngDialog.closeAll();
						};

						//新增提交
						$scope.formSubmit = function() {
							initIds($scope.news);
							formSubmit($scope, false, $scope.news, true, null, _scope);
						};

						//保存草稿
						$scope.saveDraft = function() {
							initIds($scope.news);
							formSubmit($scope, true, $scope.news, true, null, _scope);
						};

						$scope.creatNewsTypes = function() {
							creatNewsTypes($scope);
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 850
				});
			});

		};

		//修改新闻公告
		$scope.editItem = function(x) {
			var deffered = $q.defer();
			var promises = deffered.promise;
			if($scope.publicationScope.length === 0) {
				getPublicationScope($scope, deffered);
			} else if($scope.newsTypes.length === 1) {
				getNewsTypes($scope, deffered);
			} else {
				deffered.resolve();
			}
			promises.then(function() {
				var newsTypes = $scope.newsTypes;
				var publicationScope = $scope.publicationScope;
				var fetchData = $scope.fetchData;
				var _scope = $scope;
				ngDialog.openConfirm({
					template: 'createOne',
					controller: ["$scope", function($scope) {
						$scope.news = x;
						if(x.State === 2) {
							$scope.draft = false;
						} else if(x.State === 1) {
							$scope.draft = true;
						}
						$scope.TitleText = "修改";
						$scope.fetchData = fetchData;
						$scope.newsTypes = newsTypes;
						$scope.publicationScope = publicationScope;
						var _array = [];
						$scope.news.ChannelList.forEach(function(item, index) {
							$scope.publicationScope.forEach(function(_item, _index) {
								if(_item.Id === item.ChannelTypeId) {
									_array.push(_item);
								}
							});
						});

						$scope.news.ChannelType = _array;

						//$scope.disabled = true;
						$scope.create = false;

						//关闭弹出窗口
						$scope.closeDialog = function() {
							ngDialog.closeAll();
						};

						//保存修改
						$scope.formSubmit = function() {
							initIds($scope.news);
							formSubmit($scope, false, $scope.news, false, x.Id, _scope);
						};

						//保存草稿
						$scope.saveDraft = function() {
							initIds($scope.news);
							formSubmit($scope, true, $scope.news, false, x.Id, _scope);
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 850
				});
			});

		};

		//发布状态
		$scope.publicationStatus = [{
				Id: 0,
				Name: "全部"
			}, {
				Id: 1,
				Name: "草稿"
			}, {
				Id: 2,
				Name: "待审核"
			},
			/*{
			Id: 3,
			Name: "审核成功"
		},*/
			{
				Id: 4,
				Name: "审核失败"
			}, {
				Id: 5,
				Name: "已发布"
			}
		];

		//作者列表
		$scope.Authors = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "张三"
		}, {
			Id: 2,
			Name: "李四"
		}, {
			Id: 3,
			Name: "王五"
		}];

		//新闻发布范围
		$scope.newRangs = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "社区"
		}, {
			Id: 2,
			Name: "街道"
		}, {
			Id: 3,
			Name: "小区"
		}, {
			Id: 4,
			Name: "楼栋"
		}];

		//发布新闻公告
		$scope.toggleItem = function() {
			layerAlert.autoclose("发布成功!", "成功啦");
		};

		var toExamine = function(sucess, x) {
			var state = 0,
				doAction = "";
			switch(sucess) {
				case true:
					state = 3;
					doAction = "通过";
					break;
				case false:
					state = 4;
					doAction = "不通过";
					break;
			}
			$scope.listBusyPromise = $http({
				headers: $rootScope.gHeader,
				method: 'get',
				url: serverUrls.reviewstateInformation + "?id=" + x.Id + "&state=" + state
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("审核" + doAction);
					$scope.fetchData();
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//审核
		$scope.checkItem = function(x) {
			layerAlert.checkone("审核操作", function() {
				toExamine(true, x);
			}, function() {
				toExamine(false, x);
			}, "同意", "拒绝", false, false, "请选择是否通过审核?");
		};

		//列表筛选表单字段
		$scope.screenfields = [{
				nameDisplay: "关键字",
				name: "title",
				value: "",
				editor: "normal"
			},
			{
				nameDisplay: "发布状态",
				name: "state",
				value: $scope.publicationStatus[0].Id,
				editor: "select",
				opts: $scope.publicationStatus
			}, {
				nameDisplay: "发表时间",
				name: "startTimeAndendTime",
				name1: "startTime",
				name2: "endTime",
				value1: $filter('date')(new Date() - 30 * 24 * 3600000, "yyyy-MM-dd HH:mm"),
				value2: $filter('date')(new Date(), "yyyy-MM-dd HH:mm"),
				editor: "double-datePick"
			}
		];

		//查询数据列表提交数据
		$scope.fetchData = function() {
			switch($scope.selectItem.Id) {
				case 1:
					$scope.searchOption = $.extend(true, $scope.searchOption, getFormData($scope.screenfields));
					$scope.searchOption.endTime = new Date($scope.searchOption.endTime);
					$scope.searchOption.startTime = new Date($scope.searchOption.startTime);
					PcService.fetchData($scope, serverUrls.informationList, $scope.searchOption);
					break;
				case 2:
					PcService.fetchData($scope, serverUrls.informationCategory, $scope.categoryOption);
					break;
				case 3:
					PcService.fetchData($scope, serverUrls.channelTypelist, $scope.channelOption);
					break;
				default:
					break;
			}

		};

		$scope.fetchData();

		$scope.isDisabled = function(x) {
			if(x.State === 1 || x.State === 4) {
				return false;
			} else {
				return true;
			}
		};

		//新增新闻公告表单菜单
		$scope.fieldsList = [
			[{
				name: "Name",
				nameDisplay: "名称",
				editor: "normal",
				required: true,
				value: ""
			}, {
				name: "Code",
				nameDisplay: "识别码",
				editor: "normal",
				required: true,
				value: ""
			}, {
				name: "ParentId",
				nameDisplay: "父级分类",
				editor: "select",
				required: true,
				opts: $scope.newsTypes,
				value: ""
			}],

			[{
				name: "Name",
				nameDisplay: "栋座",
				editor: "select",
				required: true,
				value: ""
			}],
			[{
				name: "Name",
				nameDisplay: "名称",
				editor: "normal",
				required: true,
				value: ""
			}]
		];

		$scope.deleteCategory = function(x) {
			$scope.listBusyPromise = $http({
				method: 'delete',
				url: serverUrls.addCategory + "?id=" + x.Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("删除成功！");
					$scope.fetchData();
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//新增、修改新闻分类
		$scope.editCategory = function(x) {
			var doAction, method, url, lastTitle,
				fieldsList = '',
				fetchData = $scope.fetchData;
			var defered = $q.defer();
			var promised = defered.promise;
			getNewsTypes($scope, defered, true);
			promised.then(function() {
				var selectItemId = $scope.selectItem.Id;
				if($scope.selectItem.Id === 2) {
					fieldsList = $scope.fieldsList[0];
					url = serverUrls.addCategory;
					lastTitle = "新闻分类";
				} else if($scope.selectItem.Id === 3) {
					fieldsList = $scope.fieldsList[2];
					lastTitle = "发布范围";
					if(x) {
						url = serverUrls.upChanneltype;
					} else {
						url = serverUrls.inChanneltype;
					}
				}
				if(x) {
					doAction = "修改";
					method = "put";
					PcService.bindFormData(x, fieldsList);
				} else {
					doAction = "新增";
					method = "popt";
					PcService.initFormList(fieldsList);
				}
				ngDialog.openConfirm({
					template: '_createOne',
					controller: ['$scope', function($scope) {

						$scope.TitleText = doAction + lastTitle;
						$scope.fieldsList = fieldsList;
						$scope.fetchData = fetchData;

						//提交修改、新增
						$scope.formSubmit = function() {
							var param = {};
							if(selectItemId === 2) {
								var ParentId = (PcService.getFormData($scope.fieldsList)).ParentId;
								$scope.fieldsList.forEach(function(item, index) {
									if(item.Id === ParentId) {
										param.ParentName = item.Name;
									}
								});
							}
							if(x) {
								PcService.formSubmit($scope, false, $scope.fieldsList, url, x, param);
							} else {
								PcService.formSubmit($scope, true, $scope.fieldsList, url, null, param);
							}
						};

					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 600
				});
			});

		};

		//	$scope.opened = [false, false];
		//	//datepickerConfig.minMode = "minute";
		//	$scope.open = function($event, index) {
		//		$event.preventDefault();
		//		$event.stopPropagation();
		//		$scope.opened[index] = true;
		//	};
		//
		//	$scope.dateOptions = {
		//		formatYear: 'yyyy',
		//		startingDay: 1,
		//		minView: 'hour'
		//	};
		//
		//	$scope.initDate = new Date();
		//	$scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate'];
		//	$scope.format = $scope.formats[1];

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

	}
]);