App.controller('fundationDetailsCtrl', ['$scope', '$state', 'PcService', '$rootScope', 'serverUrls', '$q', '$stateParams', '$location', '$http', 'ngDialog', 'PagerExtends', 'layerAlert',
	function($scope, $state, PcService, $rootScope, serverUrls, $q, $stateParams, $location, $http, ngDialog, PagerExtends, layerAlert) {

		var Id = $stateParams.Id;
		$scope.slectedId = $stateParams.selectedId;
		$scope.slectedId = parseInt($scope.slectedId);
		
		$scope.tabId=$stateParams.tabId;
		$scope.tabId=parseInt($scope.tabId);
		
		$scope.DetailData = {};
		$scope.fetchData = function() {
			var url = '';
			switch ($scope.slectedId) {
				case 1:
					url = serverUrls.ApiFundById;
					break;
				case 2:
					url = serverUrls.ApiFundUseById;
					break;
				default:
					break;
			}
			getData(url, Id, $scope);
		};
		$scope.clickBack=function(){
			$state.go("app.fundManagement", {
					"selected": $scope.slectedId,
					"tabId":$scope.tabId
				});
		}
		var getData = function(url, id, $scope) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: url + "?id=" + Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					$scope.DetailData = response.Content;

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		$scope.fetchData();
		$scope.tdClass = function(value) {
			var classStyle = '';
			switch (value) {
				//1--待审核、2--已通过、3--未通过、4--待提交
				case 1:
					classStyle = 'todoAudit';
					break;
				case 2:
					classStyle = 'passAudit';
					break;
				case 3:
					classStyle = 'noAudit';
					break;
				case 4:
					classStyle = 'nosubmit';
					break;
				default:
					break;
			}
			return classStyle;
		};
		//删除
		$scope.deleteItem = function() {
			var url = '';
			switch ($scope.slectedId) {
				case 1:
					url = serverUrls.DeleteFundById;
					break;
				case 2:
					url = serverUrls.DeleteFundUseById;
					break;
				default:
					break;
			}
			deleteData(url, $scope);
		};
		var deleteData = function(url, $scope) {
			layerAlert.checkone("执行删除操作", function() {
				$scope.listBusyPromise = $http({
					headers: $rootScope.pHeader,
					method: 'delete',
					url: url + "?id=" + $scope.DetailData.Id
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					if (Code === 0) {
						layerAlert.autoclose('删除操作成功');
						$state.go("app.fundManagement", {
							reload: true,
							"selected": $scope.slectedId
						});
					} else {
						layerAlert.autoclose(Message);
					}
				}).error(function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				});

			}, function() {}, "删除", "取消", true, true);
		};
		//基金录入审核和提交
		$scope.bannerBtn = function(number) {
			$scope.bannerNew = {};
			ngDialog.openConfirm({
				template: 'createTwo',
				scope: $scope,
				controller: ["$scope", function($scope) {
					var param = '';
					var url = '';
					var message = '';

					$scope.formSubmit = function() {

						switch (number) {
							case 1:
								//提交
								param = {
									"Id": $scope.DetailData.Id,
									"Remarks": $scope.bannerNew.Remarks
								};
								switch ($scope.slectedId) {
									case 1:
										url = serverUrls.fundsubmit;
										break;
									case 2:
										url = serverUrls.ApiFundUsesubmit;
										break;
									default:
										break;
								}
								message = "提交";
								break
							case 2:
								//不通过
								param = {
									"Id": $scope.DetailData.Id,
									"ReviewState": 3,
									"Remarks": $scope.bannerNew.Remarks
								};
								switch ($scope.slectedId) {
									case 1:
										url = serverUrls.fundreview;
										break;
									case 2:
										url = serverUrls.fundusereview;
										break;
									default:
										break;
								}

								message = "不通过";
								break;
							case 3:
								//通过
								param = {
									"Id": $scope.DetailData.Id,
									"ReviewState": 2,
									"Remarks": $scope.bannerNew.Remarks
								};
								switch ($scope.slectedId) {
									case 1:
										url = serverUrls.fundreview;
										break;
									case 2:
										url = serverUrls.fundusereview;
										break;
								}
								message = "通过";
								break;
							default:
								break;
						}

						bannerF($scope, param, url, message);
					}
					$scope.closeDialog = function() {
						ngDialog.closeAll();
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});

		};
		var bannerF = function($scope, param, url, message) {
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: "post",
				url: url,
				data: param
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					layerAlert.autoclose(message + "操作成功！");
					ngDialog.closeAll();
					$scope.fetchData();

				} else {

					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		/*弹框*/
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

					$scope.residentType = arr;
					$scope.fieldsList[1][2].opts = $scope.residentType;
					$scope.fieldsList[1][2].value = $scope.residentType[0].Id;
					$scope.fieldsList[1][3].value =$scope.residentType[0].Amount;


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
		//基金的录入
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

		$scope.editorItem = function() {
			var TitleModify = ($scope.slectedId === 1 ? '录入' : ($scope.slectedId === 2 ? '使用' : ''));
			var fieldsList = ($scope.slectedId === 1 ? $scope.fieldsList[0] : ($scope.slectedId === 2 ? $scope.fieldsList[1] : ''));
			addeditId = 1;
			var deffered = $q.defer();
			var promises = deffered.promise;
			$scope.editorData = angular.copy($scope.DetailData);
			switch ($scope.slectedId) {
				case 1:
					deffered.resolve();
					break;
				case 2:
					$scope.fieldsList[1][3].editable = true;
					GetListForFundUse(deffered, $scope.DetailData);
					break;
				default:
					break;
			}
			promises.then(function(value) {
				ngDialog.openConfirm({
					template: 'createOne',
					scope: $scope,
					controller: ["$scope", function($scope) {

						switch ($scope.slectedId) {
							case 1:
								$scope.TitleText = "基金录入修改";
								fundInput($scope.editorData, $scope);

								//获取基金录入修改的时候 修改的字段值
								$scope.fieldsList = fieldsList;
								$scope.formSubmit = function() {
									var param = {
										"Id": $scope.DetailData.Id,
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
										"Id": $scope.DetailData.Id,
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
									if (fieldsList[7].value == '' || fieldsList[3].value=='' ||fieldsList[3].value==undefined|| fieldsList[0].value == '' || fieldsList[4].value == '' || fieldsList[6].value == '') {
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
			/*结束*/
	}
]);