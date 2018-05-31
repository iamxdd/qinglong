App.controller('gongzuoliuCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', '$timeout', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, $timeout, layerAlert, serverUrls, PcService, $q) {
		$scope.list = [];
		$scope.searchOption = {
			value: ""
		};
		$scope.PcService = PcService;
		$scope.serverUrls = serverUrls;
		$scope.NodesList = [];
		$scope.workFlowId = 0;
		$scope.WorkerType = 0;
		$scope.StepId = 0;
		$scope.NodeId = 0;
		$scope.workId = 0;
		$scope.workFlowGroup = [];
		$scope.DemocraticProjects = [];
		$scope.moreAndMoreList = [];
		$scope.ScoreTypes = [{
			Id: 0,
			Name: "请选择"
		}];
		$scope.Roles = [{
			Id: 0,
			Name: "请选择"
		}];
		$scope.moreAndMoreListChild = [{
			IntegerValue: -1,
			DisplayName: "请选择"
		}];
		$scope.NodeWorkerType = 0;

		$scope.choseWorkerPropertyName = function(value) {
			$scope.moreAndMoreList.forEach(function(item, index) {
				if(item.PropertyName === value) {
					$scope.moreAndMoreListChild = item.EnumDefined;
				}
			});
		};

		$scope.NodeWorkerTypes = [{
			Id: 1,
			Name: "审核"
		}, {
			Id: 2,
			Name: "普通"
		}];

		//表单类型
		$scope.ExpectForms = [{
			Id: 1,
			Name: "流动人口"
		}, {
			Id: 2,
			Name: "环境卫生"
		}, {
			Id: 3,
			Name: "纠纷调解"
		}, {
			Id: 4,
			Name: "重点人群"
		}, {
			Id: 5,
			Name: "基金申请"
		}, {
			Id: 6,
			Name: "安全隐患"
		}];

		//审核状态
		$scope.AuditStates = [{
			Id: 0,
			Name: "未审核"
		}, {
			Id: 1,
			Name: "审核通过"
		}, {
			Id: 2,
			Name: "审核驳回"
		}];

		//工作流通知类型
		$scope.WorkflowNodeNotifyType = [{
			Id: 0,
			Name: "无"
		}, {
			Id: 1,
			Name: "需要指定并推送工作组成员"
		}, {
			Id: 2,
			Name: "指定工作组，由工作组成员自行决定是否执行"
		}];

		//工作流模板启用停用
		$scope.toggleItem = function(x) {
			PcService.toggleStatus($scope, x, serverUrls.upWorkflow);
		};

		$scope.toggleText = function(index) {
			var tabTitleText = "";
			switch(index) {
				case 1:
					tabTitleText = "工作流模板";
					break;
				case 2:
					tabTitleText = "工作流节点模板";
					break;
				case 3:
					tabTitleText = "工作流工作模板";
					break;
				case 4:
					tabTitleText = "积分规则";
					break;
			}
			return tabTitleText;
		};

		//外部资源类型
		$scope.ExtraResourceTypes = [{
			Checked: false,
			Id: 1,
			Name: "无"
		}, {
			Checked: false,
			Id: 2,
			Name: "表单填写"
		}, {
			Checked: false,
			Id: 4,
			Name: "线上民主协商"
		}, {
			Checked: false,
			Id: 8,
			Name: "线下民主协商"
		}, {
			Checked: false,
			Id: 16,
			Name: "线上临时协商"
		}, {
			Checked: false,
			Id: 32,
			Name: "线下临时协商"
		}, {
			Checked: false,
			Id: 64,
			Name: "核实"
		}, {
			Checked: false,
			Id: 128,
			Name: "入库"
		}];

		$scope.AuditRejectHandleOptions = [{
			Id: 0,
			Name: "退回上一节点"
		}, {
			Id: 1,
			Name: "不处理，仅仅记录审核状态"
		}, {
			Id: 2,
			Name: "退回第一节点"
		}, {
			Id: 3,
			Name: "废弃"
		}];

		$scope.checkedGroup = [{
			Id: 1,
			Name: "工作流模板",
			Active: true,
			Disabled: false
		}, {
			Id: 2,
			Name: "工作流节点模板",
			Active: false,
			Disabled: true
		}, {
			Id: 3,
			Name: "工作流工作模板",
			Active: false,
			Disabled: true
		}, {
			Id: 4,
			Name: "积分规则",
			Active: false,
			Disabled: true
		}];

		$scope.checkedItem = {
			Id: 1,
			Name: "工作流模板",
			Active: true,
			disabled: true
		};

		$scope.checked = function(x, workflowItem) {
			if(x.Disabled) {
				return;
			}
			$scope.checkedGroup.forEach(function(item, index) {
				if(index < x.Id) {
					item.Active = false;
					item.Disabled = false;
				} else {
					item.Active = false;
					item.Disabled = true;
				}
			});
			x.Active = true;
			x.disabled = false;
			$scope.checkedItem = x;
			$scope.fetchData();
		};

		$scope.OpenStates = [{
			Id: 1,
			Name: "启用"
		}, {
			Id: 2,
			Name: "停用"
		}];

		$scope.NodeRelationships = [{
			Id: 0,
			Name: "互斥"
		}, {
			Id: 1,
			Name: "互斥(按顺序)"
		}, {
			Id: 2,
			Name: "全部须完成"
		}];

		//新增工作流表单菜单列表
		$scope.fieldsList = [
			//新增、修改工作流模板
			[{
				name: "Name",
				nameDisplay: "工作流名称",
				editor: "normal",
				required: true,
				value: "",
				originValue: ""
			}, {
				name: "Description",
				nameDisplay: "描述",
				editor: "textarea",
				required: false,
				value: "",
				originValue: ""
			}, {
				name: "Note",
				nameDisplay: "备注",
				editor: "textarea",
				required: false,
				value: "",
				originValue: ""
			}],
			//工作流节点模板新建，编辑
			[{
				name: "Name",
				nameDisplay: "节点名称",
				editor: "normal",
				required: true,
				value: "",
				originValue: ""
			}, {
				name: "PreviousNodeId",
				nameDisplay: "上级节点",
				editor: "select",
				required: true,
				value: "",
				opts: $scope.NodesList,
				originValue: 0
			}, {
				name: "Note",
				nameDisplay: "备注",
				editor: "textarea",
				required: false,
				value: "",
				originValue: ""
			}, {
				name: "Description",
				nameDisplay: "描述",
				editor: "textarea",
				required: false,
				value: "",
				originValue: ""
			}, {
				name: "NotifyBeforeVaildEndTime",
				nameDisplay: "还剩",
				editor: "normal-select",
				required: false,
				value: "",
				lastName: "自动催办",
				originValue: "",
				opts: [{
					Id: 1,
					Name: "天"
				}, {
					Id: 2,
					Name: "时"
				}, {
					Id: 3,
					Name: "分"
				}],
				value1: 1
			}, {
				name: "TipForEndUser",
				nameDisplay: "用戶提示",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}, {
				name: "GroupId",
				nameDisplay: "工作组",
				editor: "select",
				required: false,
				value: "",
				originValue: ""
			}, {
				name: "RoleMembers",
				nameDisplay: "选择角色",
				editor: "multiselect",
				required: false,
				value: "",
				originValue: [],
				opts: $scope.Roles
			}, {
				name: "NotifyType",
				nameDisplay: "通知类型",
				editor: "select",
				required: false,
				value: "",
				opts: $scope.WorkflowNodeNotifyType,
				originValue: 0
			}],
			//工作流工作模板新建，编辑
			[
				//NodeWorkerType=1:审核
				[{
					name: "Name",
					nameDisplay: "工作名称",
					editor: "normal",
					required: true,
					value: "",
					originValue: ""
				}, {
					name: "AuditState",
					nameDisplay: "审核状态",
					editor: "select",
					required: true,
					value: "",
					opts: $scope.AuditStates,
					originValue: $scope.AuditStates[0].Id
				}, {
					name: "RejectOption",
					nameDisplay: "审核处理选项",
					editor: "select",
					required: true,
					value: "",
					opts: $scope.AuditRejectHandleOptions,
					originValue: $scope.AuditRejectHandleOptions[0].Id
				}, {
					name: "Description",
					nameDisplay: "描述",
					editor: "textarea",
					required: false,
					value: "",
					originValue: ""
				}, {
					name: "Note",
					nameDisplay: "备注",
					editor: "textarea",
					required: false,
					value: "",
					originValue: ""
				}],
				//NodeWorkerType=2:空白
				[{
					name: "Name",
					nameDisplay: "工作名称",
					editor: "normal",
					required: true,
					value: "",
					originValue: ""
				}, {
					name: "Description",
					nameDisplay: "描述",
					editor: "textarea",
					required: false,
					value: "",
					originValue: ""
				}, {
					name: "Note",
					nameDisplay: "备注",
					editor: "textarea",
					required: false,
					value: "",
					originValue: ""
				}]
			],
			//积分规则
			[{
				name: "Name",
				nameDisplay: "名称",
				editor: "normal",
				required: true,
				value: "",
				originValue: ""
			}, {
				name: "EqaulsState",
				nameDisplay: "触发节点状态",
				editor: "select",
				required: true,
				value: "",
				originValue: 1,
				opts: [
					/*{
										Id: 0,
										Name: "等待中未开始"
									},*/
					{
						Id: 1,
						Name: "开始运行"
					}, {
						Id: 2,
						Name: "完成"
					}
					/*, {
										Id: 3,
										Name: "被中止,节点不会进入下一节点"
									}*/
				]
			}, {
				name: "MemberType",
				nameDisplay: "人员类型",
				editor: "select",
				required: true,
				value: "",
				originValue: 0,
				opts: [{
					Id: 0,
					Name: "工作流创建者"
				}, {
					Id: 1,
					Name: "工作流关联人员"
				}, {
					Id: 2,
					Name: "工作者处理人员"
				}]
			}, {
				name: "OpenState",
				nameDisplay: "启用状态",
				editor: "select",
				required: true,
				value: "",
				opts: [{
					Id: 1,
					Name: "启用"
				}, {
					Id: 2,
					Name: "停用"
				}],
				originValue: 1
			}, {
				name: "PointAmount",
				nameDisplay: "积分数量",
				editor: "normal",
				required: true,
				value: "",
				originValue: ""
			}, {
				name: "RemotePointTypeCode",
				nameDisplay: "积分类型",
				editor: "select",
				required: true,
				value: "",
				originValue: $scope.ScoreTypes[0].Id,
				opts: $scope.ScoreTypes
			}, {
				name: "Description",
				nameDisplay: "描述",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}, {
				name: "Note",
				nameDisplay: "备注",
				editor: "normal",
				required: false,
				value: "",
				originValue: ""
			}]
		];

		//获取积分类型列表
		var getScoreTypes = function($scope, deffered) {
			$scope.listBusyPromise = $http({
				method: 'get',
				url: serverUrls.getPointtypelist + "?state=1"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.ScoreTypes = response.Content;
					$scope.ScoreTypes.forEach(function(item, index) {
						item.Id = item.Code;
					});
					$scope.fieldsList[3].forEach(function(_item, _index) {
						if(_item.name === "RemotePointTypeCode") {
							_item.opts = $scope.ScoreTypes;
							_item.originValue = $scope.ScoreTypes[0].Id;
						}
					});
					deffered.resolve("sucess");
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var getWorkerPropertyValue = function($scope, workid, deffered, moreAndMoreList, moreAndMoreListChild) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.workBindableproperties + "?workId=" + workid
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.moreAndMoreInfo.moreAndMoreList = $scope.moreAndMoreList = response.Content.concat([{
						PropertyName: " ",
						EnumCnName: "无"
					}]);
					$scope.moreAndMoreInfo.moreAndMoreListChild = $scope.moreAndMoreListChild = $scope.moreAndMoreList[0].EnumDefined ? $scope.moreAndMoreList[0].EnumDefined : [];
					getScoreTypes($scope, deffered);
					//deffered.resolve("sucess");
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取节点角色信息
		var getNodeRoleMembers = function($scope, fieldsList, deffered, x) {
			$http({
				method: 'get',
				url: serverUrls.extraRolemembersbynodeid + "?nodeid=" + x.Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					x.RoleMembers = response.Content;
					if($scope.NodesList.length !== 0) {
						deffered.resolve("success");
					} else {
						deffered.reject("error");
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取角色列表
		var getRoles = function($scope, fieldsList, deffered, x) {
			$scope.listBusyPromise = $http({
				method: 'get',
				url: serverUrls.autoNomyrolelist
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.Roles = response.Content;
					fieldsList.forEach(function(item, index) {
						if(item.name === "RoleMembers") {
							item.opts = $scope.Roles;
							item.originValue = [];
						}
					});
					if(!!x) {
						if(x.RoleMembers) {
							deffered.resolve("sucess");
						} else {
							getNodeRoleMembers($scope, fieldsList, deffered, x);
						}
					} else {
						deffered.resolve("sucess");
					}

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var getAllNodes = function($scope, fieldsList, deffered, x) {
			$scope.listBusyPromise = $http({
				method: 'get',
				url: serverUrls.workflowNode + "?length=9999&currentPage=1&workflowid=" + $scope.workFlowId
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var NodesList = response.Content.pagelist;
					var InitList = [{
						Id: 0,
						Name: "无上级节点"
					}];
					$scope.NodesList = InitList.concat(NodesList);
					fieldsList.forEach(function(item, index) {
						if(item.name === "PreviousNodeId") {
							item.opts = $scope.NodesList;
							item.originValue = 0;
						}
					}); /*$scope.Roles.length === 1 && $scope.Roles[0].Id === 0*/
					if(deffered) {
						getRoles($scope, fieldsList, deffered, x);
					} else {
						deffered.resolve("sucess");
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		//获取工作流工作组
		var getWorkFlowGroup = function($scope, fieldsList, deffered, x) {
			$scope.listBusyPromise = $http({
				method: 'get',
				url: serverUrls.workFlowgrouplist + "?length=9999&currentPage=1"
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.workFlowGroup = response.Content.pagelist;
					fieldsList.forEach(function(item, index) {
						if(item.name === "GroupId") {
							item.opts = $scope.workFlowGroup;
							item.originValue = $scope.workFlowGroup[0] ? $scope.workFlowGroup[0].Id : "";
						}
					});
					if(deffered) {
						//deffered.resolve("sucess");
						getAllNodes($scope, fieldsList, deffered, x);
					}

				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//新增工作流模板
		$scope.creatOne = function(id) {
			var deffered = $q.defer();
			var promises = deffered.promise;
			var fieldsList;
			var tabTitleText = "";
			var fetchData = $scope.fetchData;
			var url = "",
				param;
			switch(id) {
				case 1:
					fieldsList = $scope.fieldsList[0];
					tabTitleText = "工作流模板";
					url = serverUrls.inWorkflow;
					param = null;
					deffered.resolve("sucess");
					break;
				case 2:
					fieldsList = $scope.fieldsList[1];
					tabTitleText = "工作流节点模板";
					url = serverUrls.workFlownode;
					param = { //BelongStepId
						WorkflowId: $scope.workFlowId
					};
					getWorkFlowGroup($scope, fieldsList, deffered);
					break;

				case 3:
					var _fieldsList = $scope.fieldsList[2];
					var _scope = $scope;
					var NodeWorkerTypes = $scope.NodeWorkerTypes;
					var DemocraticProjects = $scope.DemocraticProjects;
					var ExtraResourceTypes = $scope.ExtraResourceTypes;
					//Disabled
					ExtraResourceTypes.forEach(function(item, index) {
						item.Disabled = false;
					});
					tabTitleText = "工作流工作模板";
					param = {
						NodeId: $scope.NodeId
					};
					deffered.resolve("sucess");
					break;
				case 4:
					fieldsList = $scope.fieldsList[3];
					tabTitleText = "积分规则";
					url = serverUrls.pointRule;
					param = {
						WorkId: $scope.workId
					};
					$scope.moreAndMoreInfo = {};
					getWorkerPropertyValue($scope, $scope.workId, deffered);
					break;
			}
			promises.then(function(value) {
				if(id === 4) {
					var moreAndMoreInfo = $scope.moreAndMoreInfo;
					var ScoreTypes = $scope.ScoreTypes;
				}
				ngDialog.openConfirm({
					template: 'createOne',
					controller: ['$scope', function($scope) {
						$scope.TitleText = "新增";
						$scope.fetchData = fetchData;
						$scope.tabTitleText = tabTitleText;
						$scope.create = true;
						$scope.newNodeWorkerType = 1;
						$scope.index = id;
						$scope.param = param;

						$scope.disabledX = function(x, ExtraResourceTypes) {
							if(x.Checked) {
								if(x.Id === 1 || x.Id === 16 || x.Id === 32) {
									ExtraResourceTypes.forEach(function(item, index) {
										item.Disabled = false;
										if(item.Id !== 1 && item.Id !== 16 && item.Id !== 32) {
											item.Disabled = true;
										}
									});
								} else {
									ExtraResourceTypes.forEach(function(item, index) {
										item.Disabled = false;
										if(item.Id !== x.Id) {
											item.Disabled = true;
										}
									});
								}
							} else {
								if(x.Id === 1 || x.Id === 16 || x.Id === 32) {
									var hasNotChecked = false;
									ExtraResourceTypes.forEach(function(item, index) {
										if(item.Id === 1 || item.Id === 16 || item.Id === 32) {
											if(item.Checked) {
												hasNotChecked = ture;
											}
										}
									});
									if(hasNotChecked) {
										return;
									} else {
										ExtraResourceTypes.forEach(function(item, index) {
											item.Disabled = false;
										});
									}
								} else {
									ExtraResourceTypes.forEach(function(item, index) {
										item.Disabled = false;
									});
								}
							}
						};
						if(id === 3) {
							$scope.NodeWorkerTypes = NodeWorkerTypes;
							$scope.ExtraResourceTypes = ExtraResourceTypes;
							$scope.ExtraResource = $scope.ExtraResourceTypes[0].Id;
							$scope.ExtraResourceTypes.forEach(function(item, index) {
								item.Checked = false;
							});
						} else if(id === 4) {
							$scope.ScoreTypes = ScoreTypes;
							$scope.moreAndMoreList = moreAndMoreInfo.moreAndMoreList;
							$scope.moreAndMoreListChild = moreAndMoreInfo.moreAndMoreListChild;
							$scope.param.WorkerPropertyName = $scope.moreAndMoreList[0] ? $scope.moreAndMoreList[0].PropertyName : "";
							$scope.param.WorkerPropertyValue = $scope.moreAndMoreListChild[0] ? $scope.moreAndMoreListChild[0].IntegerValue : "";
							/*$scope.param.WorkerPropertyName = $scope.WorkerPropertyName;
							$scope.param.WorkerPropertyValue = $scope.WorkerPropertyValue;*/
						}

						//选择节点工作类型
						$scope.choseNodeWorkerType = function(type) {
							switch(type) {
								case 1:
									url = serverUrls.workAudit;
									fieldsList = _fieldsList[0];
									_scope.WorkerType = 1;
									break;
								case 2:
									url = serverUrls.workBlank;
									fieldsList = _fieldsList[1];
									_scope.WorkerType = 2;
									break;
							}
							PcService.initFormList(fieldsList);
							$scope.url = url;
							$scope.fieldsList = fieldsList;
							$scope.newNodeWorkerType = type;
						};

						if(id === 3) {
							$scope.DemocraticProjects = DemocraticProjects;
							url.ExtraResourceType = $scope.ExtraResourceType;
							switch($scope.newNodeWorkerType) {
								case 1:
									url = serverUrls.workAudit;
									fieldsList = _fieldsList[0];
									_scope.WorkerType = 1;
									break;
								case 2:
									url = serverUrls.workBlank;
									fieldsList = _fieldsList[1];
									_scope.WorkerType = 2;
									break;
							}
						}

						PcService.initFormList(fieldsList);
						$scope.fieldsList = fieldsList;
						$scope.url = url;

						//新增工作流模板提交
						$scope.formSubmit = function() {
							if(3 === id) {
								var ExtraResource = 0;
								$scope.ExtraResourceTypes.forEach(function(item, index) {
									if(item.Checked) {
										ExtraResource = ExtraResource ^ item.Id;
									}
								});
								$scope.param.ExtraResource = ExtraResource;
							}
							if(id === 4) {
								if($scope.WorkerPropertyName === 0) {
									delete $scope.param.WorkerPropertyName;
									delete $scope.param.WorkerPropertyValue;
								}

								var RemotePointTypeCode = (PcService.getFormData($scope.fieldsList)).RemotePointTypeCode;
								var RemotePointTypeName = "";
								$scope.ScoreTypes.forEach(function(item, index) {
									if(item.Id === RemotePointTypeCode) {
										RemotePointTypeName = item.Name;
									}
								});
								$scope.param.RemotePointTypeName = RemotePointTypeName;
							}
							PcService.formSubmit($scope, true, $scope.fieldsList, $scope.url, null, $scope.param, $rootScope.pHeader);
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 600
				});
			}, function() {

			}, function() {

			});

		};

		//查询工作流数列表数据据
		$scope.fetchData = function() {
			var url, param;
			switch($scope.checkedItem.Id) {
				case 1:
					url = serverUrls.workflowList;
					PcService.fetchData($scope, url, $scope.searchOption);
					break;
				case 2:
					param = {
						workflowid: $scope.workFlowId
					};
					url = serverUrls.workflowNode;
					PcService.fetchData($scope, url, param);
					break;
				case 3:
					param = {
						nodeid: $scope.NodeId
					};
					url = serverUrls.getWorkbynodeid;
					PcService.fetchList($scope, url, param, null, 3);
					break;

				case 4:
					param = {
						workId: $scope.workId
					};
					url = serverUrls.pointruleList;
					PcService.fetchData($scope, url, param);
					break;
			}
		};

		$scope.fetchData();

		//启用、停用工作流
		$scope.toggeItem = function(x) {
			var actionText;
			if(x.State === 1) {
				actionText = "停用";
				x.State = 0;
			} else {
				actionText = "启用";
				x.State = 1;
			}
			layerAlert.autoclose(actionText + "操作成功！");
		};

		//修改工作流模板
		$scope.editItem = function(x, index) {
			//x为工作流模板，index为tab index
			var fieldsList;
			var tabTitleText = "";
			var fetchData = $scope.fetchData;
			var url, param;
			var deffered = $q.defer();
			var promises = deffered.promise;
			switch(index) {
				case 1:
					fieldsList = $scope.fieldsList[0];
					tabTitleText = "工作流模板";
					url = serverUrls.upWorkflow;
					param = null;
					deffered.resolve("sucess");
					break;
				case 2:
					fieldsList = $scope.fieldsList[1];
					tabTitleText = "工作流节点模板";
					url = serverUrls.workFlownode;
					param = {
						WorkflowId: x.WorkflowId
					};
					getWorkFlowGroup($scope, fieldsList, deffered, x);
					//getNodeRoleMembers($scope, fieldsList, deffered, x);
					break;
				case 3:
					param = {
						NodeId: x.NodeId
					};
					tabTitleText = "工作流工作模板";
					var _fieldsList = $scope.fieldsList[2];
					//var DemocraticProjects = $scope.DemocraticProjects;
					switch($scope.WorkerType) {
						case 1:
							url = serverUrls.workAudit;
							fieldsList = _fieldsList[0];
							break;
						case 2:
							url = serverUrls.workBlank;
							fieldsList = _fieldsList[1];
							break;
					}
					var WorkerType = $scope.WorkerType;
					var ExtraResourceTypes = $scope.ExtraResourceTypes;
					deffered.resolve("sucess");
					break;
				case 4:
					url = serverUrls.pointRule;
					tabTitleText = "积分规则";
					fieldsList = $scope.fieldsList[3];
					getScoreTypes($scope, deffered);
					//deffered.resolve("sucess");
					param = {
						WorkId: x.WorkId
					};
					break;
			}
			promises.then(function(value) {
				if(index === 4) {
					var ScoreTypes = $scope.ScoreTypes;
				}
				PcService.bindFormData(x, fieldsList);
				ngDialog.openConfirm({
					template: 'createOne',
					controller: ['$scope', function($scope) {
						$scope.param = param;
						$scope.TitleText = "修改";
						$scope.tabTitleText = tabTitleText;
						$scope.fetchData = fetchData;
						$scope.create = false;
						$scope.index = index;
						if(index === 4) {
							$scope.ScoreTypes = ScoreTypes;
						}
						$scope.fieldsList = fieldsList;
						if(index === 3) {
							$scope.WorkerType = WorkerType;
							$scope.ExtraResourceTypes = ExtraResourceTypes;
							var ExtraResource = x.ExtraResource;
							$scope.ExtraResourceTypes.forEach(function(item, index) {
								if((ExtraResource & item.Id) === item.Id) {
									item.Checked = true;
								} else {
									item.Checked = false;
								}
							});
							var isOneSixTeen = false;
							$scope.ExtraResourceTypes.forEach(function(item, index) {
								if((item.Id === 1 || item.Id === 16 || item.Id === 32) && item.Checked) {
									isOneSixTeen = true;
									return;
								}
							});
							if(isOneSixTeen) {
								$scope.ExtraResourceTypes.forEach(function(item, index) {
									if(item.Id !== 1 && item.Id !== 16 && item.Id !== 32) {
										item.Disabled = true;
									} else {
										item.Disabled = false;
									}
								});
							} else {
								$scope.ExtraResourceTypes.forEach(function(item, index) {
									item.Disabled = true;
									if(item.Checked) {
										item.Disabled = false;
									}
								});
							}
						}

						$scope.disabledX = function(x, ExtraResourceTypes) {
							if(x.Checked) {
								if(x.Id === 1 || x.Id === 16 || x.Id === 32) {
									ExtraResourceTypes.forEach(function(item, index) {
										item.Disabled = false;
										if(item.Id !== 1 && item.Id !== 16 && item.Id !== 32) {
											item.Disabled = true;
										}
									});
								} else {
									ExtraResourceTypes.forEach(function(item, index) {
										item.Disabled = false;
										if(item.Id !== x.Id) {
											item.Disabled = true;
										}
									});
								}
							} else {
								if(x.Id === 1 || x.Id === 16 || x.Id === 32) {
									var hasNotChecked = false;
									ExtraResourceTypes.forEach(function(item, index) {
										if(item.Id === 1 || item.Id === 16 || item.Id === 32) {
											if(item.Checked) {
												hasNotChecked = ture;
											}
										}
									});
									if(hasNotChecked) {
										return;
									} else {
										ExtraResourceTypes.forEach(function(item, index) {
											item.Disabled = false;
										});
									}
								} else {
									ExtraResourceTypes.forEach(function(item, index) {
										item.Disabled = false;
									});
								}

							}
						};
						//修改工作流模板提交
						$scope.formSubmit = function() {
							if(3 === index) {
								//$scope.param.ExtraResourceType = 
								var ExtraResourceType = 0;
								$scope.ExtraResourceTypes.forEach(function(item, index) {
									if(item.Checked) {
										ExtraResourceType = ExtraResourceType ^ item.Id;
									}
								});
								$scope.param.ExtraResource = ExtraResourceType;
							} else if(4 === index) {
								var RemotePointTypeCode = (PcService.getFormData($scope.fieldsList)).RemotePointTypeCode;
								var RemotePointTypeName = "";
								$scope.ScoreTypes.forEach(function(item, index) {
									if(item.Id === RemotePointTypeCode) {
										RemotePointTypeName = item.Name;
									}
								});
								$scope.param.RemotePointTypeName = RemotePointTypeName;
							}

							PcService.formSubmit($scope, false, $scope.fieldsList, url, x, $scope.param, $rootScope.pHeader);
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 600
				});
			}, function(value) {
				console.log(value);
			}, function(value) {
				console.log(value);
			});

		};
		//配置积分规则
		/*$scope.configScore = function(x) {
			/*$scope.workId = x.Id;
			$scope.checkedGroup[4].Disabled = false;
			$scope.checked($scope.checkedGroup[4]);
		};*/

		//配置积分规则
		$scope.configScore = function(x) {
			$scope.workId = x.Id;
			$scope.checkedGroup[3].Disabled = false;
			$scope.checked($scope.checkedGroup[3]);
			/*$scope.NodeId = x.Id;
			$scope.checkedGroup[3].Disabled = false;
			$scope.checked($scope.checkedGroup[3]);*/
		};

		//配置工作
		$scope.configNode = function(x) {
			$scope.WorkerType = x.WorkerType;
			$scope.NodeId = x.Id;
			$scope.checkedGroup[2].Disabled = false;
			$scope.checked($scope.checkedGroup[2]);
			/*$scope.StepId = x.Id;
			$scope.checkedGroup[2].Disabled = false;
			$scope.checked($scope.checkedGroup[2]);*/
		};

		//配置节点
		$scope.configItem = function(x) {
			$scope.workFlowId = x.Id;
			$scope.checkedGroup[1].Disabled = false;
			$scope.checked($scope.checkedGroup[1]);
		};

	}
]);