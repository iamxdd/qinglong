App.controller('AdvertClassificationCtrl', ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', function($scope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {
	$scope.list = [];
	$scope.newsName = '广告推送分类';
	$scope.xinwenName = '社区资讯';

	// zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
	var setting = {
		view: {
			addHoverDom: addHoverDom,
			removeHoverDom: removeHoverDom,
			selectedMulti: false,
			dblClickExpand: false,
			showIcon: false,
			showLine: true
		},
		treeId: '',
		edit: {
			enable: true,
			editNameSelectAll: true,
			removeTitle: "删除",
			renameTitle: "修改",
			showRemoveBtn: showRemoveBtn,
			showRenameBtn: showRenameBtn,
		},
		callback: {
			beforeEditName: beforeEditName,
			beforeRemove: beforeRemove,
			onClick: onClick
		},
		data: {
			simpleData: {
				enable: true,
				idKey: "id", // 结点的id,对应到Json中的id  
				pIdKey: "parentId", // 结点的pId,对应到Json中的parentId  
				rootPId: 0 // 根节点设置为0  
			}
		},
	};
	filter();
	var addId = 0;
	var indexId = -1;
	var PId = 0;
	var editName = '';
	var editCode = 0;
	var urlId = -1;

	// 初始化数据
	function filter() {
		$scope.listBusyPromise = $http({
			method: "get",
			url: serverUrls.categoryChildrenAdvertisement
		}).success(function(childNodes) {
			var Code = childNodes.State.Code;
			var Message = childNodes.State.Message;
			var newdata = childNodes.Content;
			$scope.newdata = newdata;
			$scope.firstArr = [];
			if(!childNodes) return null;
			if(Code === 0) {
				$scope.firstArr = newdata;
				$scope.childContent = newdata;
				$scope.childContent.map(function(v) {
					v['open'] = true;
				});
				$.fn.zTree.init($("#treeDemo"), setting, $scope.childContent);
			} else {
				layerAlert.autoclose(Message);
			}
		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});
	}

	function onClick(e, treeId, treeNode) {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		zTree.expandNode(treeNode);
	}

	function beforeRemove(treeId, treeNode) {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		var url = '';
		url = serverUrls.DeleteAdvertisement + '?id=' + treeNode.id
		zTree.selectNode(treeNode);
		var isDeled = false;
		layerAlert.checkone("提示", function() {
			$scope.listBusyPromise = $http({
				method: "DELETE",
				url: url
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					isDeled = true;
					zTree.removeNode(treeNode, false);
					filter();
				} else {
					isDeled = false;
					layerAlert.autoclose(Message);
				}
				return isDeled;
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		}, function() {
			return;
		}, "确定", "取消", true, true, "你确定要删除" + treeNode.name + "分类吗？");
		return false
	}

	// 增加按钮
	function addHoverDom(treeId, treeNode) {
		if(treeNode.level == 0) {
			var mathData = Math.round(Math.random() * 100);
			var sObj = $("#" + treeNode.tId + "_span");
			if(treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
			var addStr = "<span class='button add' id='addBtn_" + treeNode.tId +
				"' title='添加' onfocus='this.blur();'></span>";
			sObj.after(addStr);
			var btn = $("#addBtn_" + treeNode.tId);
			if(btn) btn.bind("click", function() {
				addId = treeNode.id;
				indexId = 0;
				urlId = 1;
				creatOne();
				return false;
			});
		}

	};

	function removeHoverDom(treeId, treeNode) {
		$("#addBtn_" + treeNode.tId).unbind().remove();
	};
	// 在进行重命名之前，进行一下确认  
	function beforeEditName(treeId, treeNode) {
		indexId = 1;
		urlId = 1;
		addId = treeNode.id;
		PId = treeNode.ParentId;
		editName = treeNode.name;
		editCode = treeNode.Code;
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		zTree.selectNode(treeNode);
		creatNewsTypes('修改广告' + editName, serverUrls.DeleteAdvertisement);
		return false;
	}

	function creatNewsTypes(TitleText, url) {
		var _scope = $scope;
		var data = {},
			data1 = {};
		ngDialog.openConfirm({
			template: 'creatNewsTypes',
			scope: $scope,
			controller: ["$scope", function($scope) {
				$scope.TitleText = TitleText;
				if(indexId == 0) {
					$scope.fieldsList = [{
						name: "Name",
						nameDisplay: "名称",
						editor: "normal",
						required: true,
						value: "",
						originValue: ""
					}, {
						name: "NameCode",
						nameDisplay: "识别码",
						editor: "normal",
						required: true,
						value: "",
						originValue: ""
					}];
				} else if(indexId == 1) {
					$scope.fieldsList = [{
						name: "Names",
						nameDisplay: "名称",
						editor: "normal",
						required: true,
						value: editName,
						originValue: ""
					}, {
						name: "NameCodes",
						nameDisplay: "识别码",
						editor: "normal",
						required: true,
						value: editCode,
						originValue: ""
					}];
				}
				$scope.formSubmit = function() {
					if(indexId == 0) {
						data = {
								"Name": $scope.fieldsList[0].value,
								"ParentId": addId,
								"Code": $scope.fieldsList[1].value
							},
							method = "post";
					} else if(indexId == 1) {
						data = {
							"Name": $scope.fieldsList[0].value,
							"ParentId": PId,
							"Id": addId,
							"Code": $scope.fieldsList[1].value
						};
						data1 = {
							"Name": $scope.fieldsList[0].value,
							"ParentId": 1,
							"Id": addId,
							"Code": $scope.fieldsList[1].value
						};
						method = "put";
					}

					addDom($scope, method, url, data);

				};
			}],
			className: 'ngdialog-theme-default',
			//closeByEscape: true,
			closeByDocument: false,
			width: 600
		});
	};

	function addDom($scope, method, url, data) {
		$scope.ngDialogPromise = $http({
			method: method,
			url: url,
			data: data
		}).success(function(response) {
			var Code = response.State.Code;
			var Message = response.State.Message;
			if(Code === 0) {
				filter(serverUrls.categoryChildrenAdvertisement);
				layerAlert.autoclose('操作成功');
				ngDialog.closeAll();
			} else {
				layerAlert.autoclose(Message);
			}
		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});
	}
	//是否显示编辑按钮
	function showRenameBtn(treeId, treeNode) {
		//获取节点所配置的noEditBtn属性值
		if(treeNode.ParentName == null || treeNode.ParentId == 1) {
			return false;
		} else {
			return true;
		}
		// return true;
	}
	//是否显示删除按钮
	function showRemoveBtn(treeId, treeNode) {
		// return true;
		if(treeNode.ParentName == null) {
			return false;
		} else {
			return true;
		}
	}

	//新增管理
	var creatOne = function() {
		ngDialog.openConfirm({
			template: 'createOne',
			scope: $scope,
			controller: ['$scope', function($scope) {
				var newArr = [];
				$scope.TitleText = '添加广告分类';
				$scope.listBusyPromise = $http({
					method: "get",
					url: serverUrls.categorychildren
				}).success(function(childNodes) {
					var Code = childNodes.State.Code;
					var Message = childNodes.State.Message;
					if(Code === 0) {
						$scope.newsArr = childNodes.Content;
						if($scope.newsArr[0].children.length > 0) {
							$scope.newsArr[0].children.map(function(v, i) {
								newArr.push({
									Name: v.name,
									Id: v.id,
									code: v.Code,
									Checked: false,
									editable: false
								});
							})
						}
						newArr.map(function(v) {
							if($scope.firstArr[0].children && $scope.firstArr[0].children.length > 0) {
								$scope.firstArr[0].children.map(function(item) {
									if(v.Name == item.name || v.Name === "社区公告") {
										v.Checked = true;
										v.editable = true;
									}
								})
							}

						});
						$scope.Adnews = [{
							name: "PopulationType2",
							nameDisplay: "推送位置",
							editor: "multiselect",
							required: true,
							value: "",
							opts: newArr,
							editable: false,
							originValue: newArr.Id,
						}];
					} else {
						layerAlert.autoclose(Message);
					}
				}).error(function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				});
				$scope.formSubmit = function() {
					var method = 'post',
						url = serverUrls.DeleteAdvertisement;
					var newtypedata = [];
					$scope.Adnews.map(function(item) {
						if(!item.editable) {
							item.opts.map(function(_item) {
								if(_item.Checked) {
									newtypedata.push({
										"Name": _item.Name,
										"ParentId": addId,
										"Code": _item.code
									});
								}
							})
						}
					});
					var data = {
						"entity": newtypedata
					}
					addDom($scope, method, url, data)
				};
				$scope.closeDialog = function() {
					ngDialog.closeAll();
				};
			}],
			className: 'ngdialog-theme-default',
			closeByDocument: false,
			width: 600
		});
	};

}]);