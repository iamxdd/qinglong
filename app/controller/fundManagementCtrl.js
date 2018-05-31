App.controller('fundManagementCtrl', ['$scope', '$stateParams', '$state', '$q', 'serverUrls', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', '$filter', 'PcService',
	function($scope, $stateParams, $state, $q, serverUrls, $rootScope, $http, ngDialog, PagerExtends, layerAlert, $filter, PcService) {
		$scope.list = [];
		$scope.listUse = [];
		$scope.PcService = PcService;
		
		$scope.Tab = $stateParams.selected;
		$scope.Tab = parseInt($scope.Tab);
		
		$scope.tabIndex=$stateParams.tabId;
		$scope.tabIndex=parseInt($scope.tabIndex);
		
		if($scope.tabIndex){
			$scope.Tab=$scope.tabIndex;
		}
		//选项卡
		$scope.navTabList = [{
			Id: 1,
			Name: "基金录入",
			Active: true
		}, {
			Id: 2,
			Name: "基金使用",
			Active: false
		}, {
			Id: 3,
			Name: "基金余存",
			Active: false
		}];
		if ($scope.Tab) {
			$scope.selectTab = $scope.navTabList[$scope.Tab - 1];
			$scope.navTabList.map(function(v, n) {
				v.Active = false;
				if (n === $scope.Tab - 1) {
					v.Active = true;
				}
			});
		} else {
			$scope.selectTab = $scope.navTabList[0];
		}


		//状态
		$scope.statusSlect = [{
			value: '全部',
			index: 0
		}, {
			value: '待审核',
			index: 1
		}, {
			value: '已通过',
			index: 2
		}, {
			value: '未通过',
			index: 3
		}, {
			value: '未提交',
			index: 4
		}];

		$scope.searchOption = {
			name: '',
			state: 0,
			date: $filter('date')('', "yyyy-MM-dd"),
		};

		//基金使用添加弹框类型基金
		$scope.fundType = [{
			Id: 1,
			Name: "困难救助"
		}, {
			Id: 2,
			Name: "院落关怀"
		}, {
			Id: 3,
			Name: "院落修缮"
		}, {
			Id: 4,
			Name: "其他"
		}];
		//基金使用弹框关联事项
		$scope.residentType = [{
			Id: 0,
			Name: "请选择",
			Amount: ""

		}];
		//基金名义方式
		$scope.NominalWay = [{
				Id: 1,
				Name: "个人"
			}, {
				Id: 2,
				Name: "企业"
			}, {
				Id: 3,
				Name: "其他"
			}]
			// 付款方式
		$scope.payMent = [{
			nameDisplay: "现金",
			value: 1,
			Checked: false
		}, {
			nameDisplay: "转账",
			value: 2,
			Checked: false
		}, {
			nameDisplay: "支票",
			value: 3,
			Checked: false
		}];
		// 支付方式
		$scope.payMentId = [{
			Name: "现金",
			Id: 1
		}, {
			Name: "转账",
			Id: 2
		}, {
			Name: "支票",
			Id: 3
		}];
		//  状态
		$scope.fundState = [{
			nameDisplay: "公开",
			value: 1,
			Checked: false
		}, {
			nameDisplay: "保密",
			value: 2,
			Checked: false
		}];
		// 状态方式
		$scope.fundStateId = [{
			Name: "公开",
			Id: 1
		}, {
			Name: "保密",
			Id: 2
		}];
		// 基金录入和基金使用新增按钮文字设置
		$scope.addText = function(id) {
			var text = '';
			if (id == 1) {
				text = '录入';
			} else if (id == 2) {
				text = '使用';
			}
			return text
		};

		$scope.callFunds = 0;
		// 新增基金录入和基金使用弹框字段设置
		$scope.fieldsList = [
			[{
				name: "enterName",
				nameDisplay: "名称",
				editor: "normal",
				required: true,
				value: ""
			}, {
				name: "enterfundState",
				nameDisplay: "状态",
				editor: "radio",
				required: true,
				value: $scope.fundStateId[0].Id,
				opts: $scope.fundStateId

			}, {
				name: "enterPay",
				nameDisplay: "付款方",
				editor: "normal",
				required: true,
				value: ""
			}, {
				name: "enterCash",
				nameDisplay: "金额",
				editor: "normal",
				required: true,
				value: "",
				unit: 'money'
			}, {
				name: "enterContacts",
				nameDisplay: "付款联系人",
				editor: "normal",
				required: true,
				value: ""
			}, {
				name: "enterPhone",
				nameDisplay: "联系电话",
				editor: "normal",
				required: true,
				value: ""
			}, {
				name: "enterpayMent",
				nameDisplay: "付款方式",
				editor: "radio",
				required: true,
				value: $scope.payMentId[0].Id,
				opts: $scope.payMentId

			}, {
				name: "NominalWay",
				nameDisplay: "名义方式",
				editor: "select",
				required: true,
				value: $scope.NominalWay[0].Id,
				opts: $scope.NominalWay,
				originValue: $scope.NominalWay[0].Id,
			}, {
				editor: "textarea",
				name: "enterRemark",
				nameDisplay: "备注信息",
				required: false,
				value: "",
				originValue: "",
				column: 1
			}],
			[{
				name: "useName",
				nameDisplay: "名称",
				editor: "normal",
				required: true,
				value: ""
			}, {
				name: "FundId",
				nameDisplay: "类型",
				editor: "select",
				required: true,
				value: $scope.fundType[0].Id,
				opts: $scope.fundType,
				originValue: $scope.fundType[0].Id,
			}, {
				name: "Fundconnet",
				nameDisplay: "关联项目",
				editor: "select",
				required: true,
				value: $scope.residentType[0].Id,
				opts: $scope.residentType,
				originValue: $scope.residentType[0].Id,
			}, {
				name: "arrangeCash",
				nameDisplay: "金额",
				editor: "normal",
				editable: false,
				required: true,
				value: "",
				unit: 'Desmoney'

			}, {
				name: "usePay",
				nameDisplay: "收款方",
				editor: "normal",
				required: true,
				value: ""
			}, {
				name: "NominalWay",
				nameDisplay: "名义方式",
				editor: "select",
				required: true,
				value: $scope.NominalWay[0].Id,
				opts: $scope.NominalWay,
				originValue: $scope.NominalWay[0].Id,
			}, {
				name: "useContacts",
				nameDisplay: "收款联系人",
				editor: "normal",
				required: true,
				value: ""
			}, {
				name: "usePhone",
				nameDisplay: "联系电话",
				editor: "normal",
				required: true,
				value: ""
			}, {
				name: "arrangeType",
				nameDisplay: "付款方式",
				editor: "radio",
				required: true,
				value: $scope.payMentId[0].Id,
				opts: $scope.payMentId


			}, {
				name: "usefundState",
				nameDisplay: "状态",
				editor: "radio",
				required: true,
				value: $scope.fundStateId[0].Id,
				opts: $scope.fundStateId

			}, {
				editor: "textarea",
				name: "useRemark",
				nameDisplay: "备注信息",
				required: false,
				value: "",
				originValue: "",
				column: 1

			}]
		];


		$scope.modeyInfo = {
			name: '',
			money: '',
		};

		//1--待审核，2--已通过，3--未通过，4--待提交

		//提交和撤回
		$scope.submit = function(x) {
			var data = {
				"Id": x.Id,
				"Remarks": ""
			}
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "post",
				url: serverUrls.fundsubmit,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					layerAlert.autoclose("提交操作成功!");
					$scope.fetchData();
				} else {
					layerAlert.autoclose(Message);
				}

			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});

		};


		// 选择类型
		$scope.selectType = function(x, name) {

			$scope.selectTypeId = x;
			if (name === "Fundconnet") {
				$scope.residentType.map(function(v) {
					if (v.Id == x) {
						$scope.fieldsList[1][3].value = v.Amount;

					}
				})

			}
		}
		$scope.callFundsTwo = 0;
		$scope.selectTypeSeach = function(x) {

			$scope.fundationName.forEach(function(item, index) {
				if (item.Id === x) {
					$scope.callFunds = item.BalanceQuantity;
					$scope.callFundsTwo = item.BalanceQuantity;
				}
			});

		};
		//对手机号码验证
		var phoneCheck = function(val) {
				var flag = true;
				var patternTwo = /^0\d{2,3}-?\d{7,8}$/;
				var pattern = /^1[3|4|5|8][0-9]\d{4,8}$/;

				if (pattern.test(val) || patternTwo.test(val)) {
					flag = true;
				} else {
					flag = false;
				}
				return flag;
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
			//检验金额
		var moneyCheck = function(val) {
			var flag = true;
			/* /^[1-9]d*.d*|0.d*[1-9]d*$/*/
			var patternName = /^([1-9][\d]{0,20}|0)(\.[\d]{1,2})?$/;
			if (patternName.test(val)) {
				flag = true;
			} else {
				flag = false;
			}
			return flag;
		};

		//默认选中第一个tab
		/*if($scope.Tab!=undefined ||$scope.Tab!=''){
			$scope.selectTab = $scope.Tab;
		}else{
			$scope.selectTab = $scope.navTabList[0];
		}*/

		//选项卡选择操作
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
				$scope.fetchData();

			}
		};
		//时间插件  	
		$("#datetime").datetimepicker({
			language: 'zh-CN',
			weekStart: 1,
			minView: "month",
			todayBtn: 1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			forceParse: 0,
			format: "yyyy-mm-dd",
			showMeridian: 1
		}).on("click", function(ev) {
			$("#datetime").datetimepicker();
		});


		//分页查询基金列表
		$scope.fetchData = function() {

			switch ($scope.selectTab.Id) {
				case 1:
					//基金录入
					PagerExtends.regListSpecifyPage($scope, {
						apiUrl: serverUrls.GetListByPage,
						params: $scope.searchOption,
						success: function(response) {
							$scope.list = response.result;
							$scope.totalMoney = response.Total;
						},
						error: function(error) {
							layerAlert.autoclose(PcService.errorResult(error));
						}
					}, $rootScope.pHeader);
					break;
				case 2:
					//分页查询基金使用列表
					PagerExtends.regListSpecifyPage($scope, {
						apiUrl: serverUrls.GetListByPageUse,
						params: $scope.searchOption,
						success: function(response) {
							$scope.list = response.result;
							$scope.totalMoney = response.Total;
						},
						error: function(error) {
							layerAlert.autoclose(PcService.errorResult(error));
						}
					}, $rootScope.pHeader);
					break;
				case 3:

					PagerExtends.regListSpecifyPage($scope, {
						apiUrl: serverUrls.GetListByPageAblance,
						params: $scope.searchOption,
						success: function(response) {
							$scope.list = response.result;
							$scope.totalMoney = response.Total;
						},
						error: function(error) {
							layerAlert.autoclose(PcService.errorResult(error));
						}
					}, $rootScope.pHeader);
					break;
				default:
					break;
			}
		};
		$scope.fetchData();


		//删除基金录入和使用
		$scope.deletelItem = function(x) {
			var url = '';
			var method = "delete";
			var id = x.Id;
			switch ($scope.selectTab.Id) {
				case 1:
					url = serverUrls.DeleteFundById;
					break;
				case 2:
					url = serverUrls.DeleteFundUseById
					break;
				default:
					break;
			}
			layerAlert.checkone("选择操作", function() {
				deletelItemData($scope, method, id, url);
			}, function() {
				return;
			}, "确定", "取消", true, true, "确定要删除吗?");

		};

		var deletelItemData = function($scope, method, id, url) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: method,
				url: url + "?id=" + id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					setTimeout(function() {
						layerAlert.autoclose("删除成功");
					}, 1000);
					$scope.fetchData();
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};


		var getFormData = function(fieldsList) {
			var data = {};
			fieldsList.forEach(function(item, index) {
				if (item.editor === "multiselect") {
					var types = "";
					item.opts.forEach(function(_item, _index) {
						if (_item.Checked) {
							types += _item.Id + ",";
						}
					});
					types = types.substring(0, types.length - 1);
					data[item.name] = types;
				} else {
					data[item.name] = item.value;
				}
			});
			return data;
		};
		var GetListForFundUse = function(deffered, x) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: serverUrls.GetListForFundUse + "?currentFinanceProjectId=" + 0
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					var arr = response.Content;

					if (x) {
						if (x.FinanceProjectId != 0) {
							arr.push({
								Id: x.FinanceProjectId,
								Name: x.FinanceProjectName,
								Amount: x.UseQuantity
							});
						}

						/*arr.unshift({
							Id: 0,
							Name: "请选择",
							Amount: ""
						});*/
					}


					if (arr.length == 0) {
						$scope.residentType = [{
							Id: 0,
							Name: "请选择",
							Amount: ""

						}];
						$scope.fieldsList[1][2].opts = $scope.residentType;
						$scope.fieldsList[1][2].value = $scope.residentType[0].Id;
					} else {
						$scope.residentType = arr;
						$scope.fieldsList[1][2].opts = $scope.residentType;
						$scope.fieldsList[1][2].value = $scope.residentType[0].Id;
						$scope.fieldsList[1][3].value = $scope.residentType[0].Amount;
					}


					if (deffered) {
						deffered.resolve("success");
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		}

		$scope.fundationName = [];

		$scope.creatOne = function(id) {

			var defer = $q.defer();
			var promised = defer.promise;
			var fieldsList = (id === 1 ? $scope.fieldsList[0] : (id === 2 ? $scope.fieldsList[1] : ''));
			//新增成功后清除之前的数据
			fieldsList.forEach(function(item, index) {
				if (item.editor === "normal" || item.editor === "textarea") {
					item.value = '';
				}

			});


			switch (id) {
				case 1:
					defer.resolve();
					break;
				case 2:
					$scope.fieldsList[1][3].editable = true;
					$scope.residentType = [];

					if (!$scope.residentType || $scope.residentType.length === 0) {
						GetListForFundUse(defer);
					} else {
						defer.resolve();
					};
					break;
				default:
					break;
			}

			promised.then(function(value) {
				ngDialog.openConfirm({
					template: 'createOne',
					scope: $scope,
					controller: ["$scope", function($scope) {

						switch (id) {
							case 1:
								addeditId = 0;
								$scope.TitleText = '新增基金录入';
								$scope.fieldsList = fieldsList;

								//新增基金录入表单提交
								$scope.formSubmit = function() {
										var _param = getFormData(fieldsList);
										var param = {
											"Name": _param.enterName,
											"Payer": _param.enterPay,
											"Quantity": Number(parseFloat(_param.enterCash).toFixed(2)),
											"NominalWay": _param.NominalWay,
											"Contacts": _param.enterContacts,
											"Phone": _param.enterPhone,
											"PayWay": _param.enterpayMent,
											"State": _param.enterfundState,
											"Remarks": _param.enterRemark

										};
										console.log(param);
										if (fieldsList[0].value != undefined) {
											var DevNameFlag = DevNameCheck(fieldsList[0].value.replace(/\s/g, ""));
											if (!DevNameFlag) {
												layerAlert.autoclose('名称输入不合法,支持文字，数字，英文和下划线,请重新输入');

												return;
											}
										}
										if (fieldsList[2].value != '') {
											var DevNameFlagPayer = DevNameCheck(fieldsList[2].value.replace(/\s/g, ""));
											if (!DevNameFlagPayer) {
												layerAlert.autoclose('付款方输入不合法,支持文字，数字，英文和下划线,请重新输入');

												return;
											}
										}
										if (fieldsList[4].value != '') {
											var DevNameFlagContacts = DevNameCheck(fieldsList[4].value.replace(/\s/g, ""));
											if (!DevNameFlagContacts) {
												layerAlert.autoclose('付款联系人输入不合法,支持文字，数字，英文和下划线,请重新输入');

												return;
											}
										}
										if (fieldsList[3].value != '') {
											var moneyFlag = moneyCheck(fieldsList[3].value);
											if (!moneyFlag) {
												layerAlert.autoclose('金额输入不合法,金额为整数或保留两位小数');

												return;
											}
										}
										if (fieldsList[5].value != '') {
											var phoneFlag = phoneCheck(fieldsList[5].value);
											if (!phoneFlag) {
												layerAlert.autoclose('联系电话输入不合法');

												return;
											}
										}
										if (_param.enterName != '' && _param.enterpayMent != '' && _param.enterfundState != '' && _param.enterPay != '' && _param.enterCash != '' && _param.enterContacts != '' && _param.enterPhone != '') {
											//新增提交表单
											PcService.formSubmit($scope, true, $scope.fieldsList, serverUrls.AddFund, null, param, $rootScope.pHeader);

										}

									}
									//取消按钮
								$scope.closeDialog = function() {
									$scope.closeThisDialog();
								};
								break;
							case 2:
								$scope.fieldsList = fieldsList;
								$scope.TitleText = '新增基金使用';
								//新增基金使用
								$scope.formSubmit = function() {

									//新增基金使用 后台需要的字段
									var param = {
										"Name": fieldsList[0].value,
										"FundUserType": fieldsList[1].value,
										"FinanceProjectId": fieldsList[2].value,
										"UseQuantity": Number(fieldsList[3].value).toFixed(2),
										"Receiver": fieldsList[4].value,
										"NominalWay": parseInt(fieldsList[5].value),
										"Contacts": fieldsList[6].value,
										"Phone": fieldsList[7].value,
										"PayWay": fieldsList[8].value,
										"State": fieldsList[9].value,
										"Remarks": fieldsList[10].value


									}
									console.log(param);
									if (fieldsList[2].value == 0) {
										if (fieldsList[3].value == '' && fieldsList[3].value == undefined && fieldsList[3].value == 0) {
											layerAlert.autoclose('没选择关联事项条件下，金额必须输入');
											return;
										}
									}
									if (fieldsList[0].value != '') {
										var DevNameFlag = DevNameCheck(fieldsList[0].value.replace(/\s/g, ""));
										if (!DevNameFlag) {
											layerAlert.autoclose('名称输入不合法,支持文字，数字，英文和下划线,请重新输入');

											return;
										}
									}
									if (fieldsList[6].value != '') {
										var DevNameFlagReceiver = DevNameCheck(fieldsList[6].value.replace(/\s/g, ""));
										if (!DevNameFlagReceiver) {
											layerAlert.autoclose('收款联系人输入不合法,支持文字，数字，英文和下划线,请重新输入');

											return;
										}
									}
									if (fieldsList[4].value != '') {
										var DevNameFlagContacts = DevNameCheck(fieldsList[4].value.replace(/\s/g, ""));
										if (!DevNameFlagContacts) {
											layerAlert.autoclose('收款方输入不合法,支持文字，数字，英文和下划线,请重新输入');

											return;
										}
									}
									if (fieldsList[3].value != '') {
										var moneyFlag = moneyCheck(fieldsList[3].value)
										if (!moneyFlag) {
											layerAlert.autoclose('金额输入不合法');

											return;
										}
									}
									if (fieldsList[7].value != '') {
										var phoneFlag = phoneCheck(fieldsList[7].value);
										if (!phoneFlag) {
											layerAlert.autoclose('联系电话输入不合法');

											return;
										}
									}
									if (fieldsList[5].value != '' && fieldsList[6].value != '' && fieldsList[7].value != '') {
										//新增提交表单
										PcService.formSubmit($scope, true, $scope.fieldsList, serverUrls.AddFundUse, null, param, $rootScope.pHeader);

									}
								};

								//取消按钮
								$scope.closeDialog = function() {
									$scope.closeThisDialog();
								};

							default:
								break;
						}


					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 1000,
				});
			}, function(value) {

			}, function(value) {

			});

		};
		var addeditId = 0;
		$scope.statusClass = function(value) {
			var statusClass = ''
			switch (value) {
				case '待提交':
					statusClass = 'todoColor';
					break;
				case '已通过':
					statusClass = 'passColor';
					break;
				case '未通过':
					statusClass = 'noPassColor';
					break;

				default:
					break;
			}
			return statusClass;
		};
		//查询基金录入
		var fundInput = function(data, $scope) {
			$scope.fieldsList[0][0].value = data.Name;
			$scope.fieldsList[0][1].value = data.OpenState;
			$scope.fieldsList[0][2].value = data.Payer;
			$scope.fieldsList[0][3].value = data.Quantity;
			$scope.fieldsList[0][4].value = data.Contacts;
			$scope.fieldsList[0][5].value = data.Phone;
			$scope.fieldsList[0][6].value = data.PayWay;

			$scope.fieldsList[0][7].value = data.NominalWay;
			$scope.fieldsList[0][8].value = data.Remarks;

		};
		var fundInputUse = function(data, $scope) {
			$scope.fieldsList[1][0].value = data.Name;
			$scope.fieldsList[1][1].value = data.FundUserType;
			$scope.fieldsList[1][2].value = data.FinanceProjectId;
			$scope.fieldsList[1][3].value = data.UseQuantity;
			$scope.fieldsList[1][4].value = data.Receiver;
			$scope.fieldsList[1][5].value = data.NominalWay;
			$scope.fieldsList[1][6].value = data.Contacts;

			$scope.fieldsList[1][7].value = data.Phone;
			$scope.fieldsList[1][8].value = data.PayWay;
			$scope.fieldsList[1][9].value = data.OpenState;
			$scope.fieldsList[1][10].value = data.Remarks;
		};
		// 修改基金录入和基金使用弹框弹出

		$scope.creatTwo = function(id, x, _index) {
			var TitleModify = (id === 1 ? '录入' : (id === 2 ? '使用' : ''));
			var fieldsList = (id === 1 ? $scope.fieldsList[0] : (id === 2 ? $scope.fieldsList[1] : ''));
			addeditId = 1;
			var deffered = $q.defer();
			var promises = deffered.promise;
			$scope.editorData = angular.copy(x);
			switch (id) {
				case 1:
					deffered.resolve();
					break;
				case 2:
					$scope.fieldsList[1][3].editable = true;
					GetListForFundUse(deffered, x);
					break;
				default:
					break;
			}
			promises.then(function(value) {
				ngDialog.openConfirm({
					template: 'createOne',
					scope: $scope,
					controller: ["$scope", function($scope) {

						switch (id) {
							case 1:
								$scope.TitleText = "基金录入修改";
								fundInput($scope.editorData, $scope);

								//获取基金录入修改的时候 修改的字段值
								$scope.fieldsList = fieldsList;
								$scope.formSubmit = function() {
									var param = {
										"Id": x.Id,
										"Name": fieldsList[0].value,
										"State": fieldsList[1].value,
										"Payer": fieldsList[2].value,
										"Quantity": Number(parseFloat(fieldsList[3].value).toFixed(2)),
										"Contacts": fieldsList[4].value,
										"Phone": fieldsList[5].value,
										"PayWay": parseInt(fieldsList[6].value),
										"NominalWay": fieldsList[7].value,
										"Remarks": fieldsList[8].value

									};

									console.log(param);
									if (fieldsList[0].value != '') {
										var DevNameFlag = DevNameCheck(fieldsList[0].value.replace(/\s/g, ""));
										if (!DevNameFlag) {
											layerAlert.autoclose('名称输入不合法,支持文字，数字，英文和下划线,请重新输入');

											return;
										}
									}
									if (fieldsList[2].value != '') {
										var DevNameFlagPayer = DevNameCheck(fieldsList[2].value.replace(/\s/g, ""));
										if (!DevNameFlagPayer) {
											layerAlert.autoclose('付款方输入不合法,支持文字，数字，英文和下划线,请重新输入');

											return;
										}
									}
									if (fieldsList[4].value != '') {
										var DevNameFlagContacts = DevNameCheck(fieldsList[4].value.replace(/\s/g, ""));
										if (!DevNameFlagContacts) {
											layerAlert.autoclose('付款联系人输入不合法,支持文字，数字，英文和下划线,请重新输入');

											return;
										}
									}
									if (fieldsList[5].value != '') {
										var phoneFlag = phoneCheck(fieldsList[5].value);
										if (!phoneFlag) {
											layerAlert.autoclose('联系电话输入不合法');

											return;
										}
									}
									var method = "post";
									var url = serverUrls.UpdateFund;
									formSubmitFun($scope, method, url, param);
								}


								break;
							case 2:
								$scope.TitleText = "基金使用修改";
								fundInputUse($scope.editorData, $scope);
								$scope.fieldsList = fieldsList;
								$scope.formSubmit = function() {
									var param = {
										"Id": x.Id,
										"Name": fieldsList[0].value,
										"Quantity": 0,
										"FundUserType": fieldsList[1].value,
										"FinanceProjectId": fieldsList[2].value,
										"UseQuantity": Number(fieldsList[3].value).toFixed(2),
										"Receiver": fieldsList[4].value,
										"NominalWay": parseInt(fieldsList[5].value),
										"Contacts": fieldsList[6].value,
										"Phone": fieldsList[7].value,
										"PayWay": parseInt(fieldsList[8].value),
										"State": parseInt(fieldsList[9].value),
										"Remarks": fieldsList[10].value

									};
									console.log(param);
									if (fieldsList[0].value != '') {
										var DevNameFlag = DevNameCheck(fieldsList[0].value.replace(/\s/g, ""));
										if (!DevNameFlag) {
											layerAlert.autoclose('名称输入不合法,支持文字，数字，英文和下划线,请重新输入');

											return;
										}
									}
									if (fieldsList[4].value != '') {
										var DevNameFlagPayer = DevNameCheck(fieldsList[4].value.replace(/\s/g, ""));
										if (!DevNameFlagPayer) {
											layerAlert.autoclose('收款方输入不合法,支持文字，数字，英文和下划线,请重新输入');

											return;
										}
									}
									if (fieldsList[6].value != '') {
										var DevNameFlagContacts = DevNameCheck(fieldsList[6].value.replace(/\s/g, ""));
										if (!DevNameFlagContacts) {
											layerAlert.autoclose('收款联系人输入不合法,支持文字，数字，英文和下划线,请重新输入');

											return;
										}
									}
									if (fieldsList[7].value != '') {
										var phoneFlag = phoneCheck(fieldsList[7].value);
										if (!phoneFlag) {
											layerAlert.autoclose('联系电话输入不合法');

											return;
										}
									}
									var method = "post";
									var url = serverUrls.UpdateFundUse;
									if (fieldsList[7].value == '' || fieldsList[0].value == '' || fieldsList[4].value == '' || fieldsList[6].value == '') {
										layerAlert.autoclose('提交表单不能为空');
										return;
									};
									formSubmitFun($scope, method, url, param);
								}

								break;
							default:
								break;
						}
						$scope.closeDialog = function() {
							$scope.closeThisDialog();
						};
					}],
					className: 'ngdialog-theme-default',
					closeByDocument: false,
					width: 1000
				});
			}, function(value) {

			}, function(value) {

			});
		}
		var formSubmitFun = function($scope, method, url, data) {
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: method,
				url: url,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				var Content = response.Content;
				if (Code === 0) {
					layerAlert.autoclose("修改成功");
					$scope.fetchData();
					ngDialog.closeAll();

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		}

		//查看详情
		$scope.seeItem = function(selectedId, x) {
			var id = x.Id;
			var selectedId = selectedId
			if (selectedId == 3) {
				$state.go("app.fundationDetails", {
					"Id": id,
					"selectedId": x.DataType,
					"tabId":selectedId
				});
			} else {
				$state.go("app.fundationDetails", {
					"Id": id,
					"selectedId": selectedId,
					"tabId":selectedId
				});
			}

		};


	}
]);