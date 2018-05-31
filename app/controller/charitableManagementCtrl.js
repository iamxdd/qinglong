App.controller('charitableManagementCtrl', ['$scope', '$rootScope', 'serverUrls', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', '$filter', 'PcService', function($scope, $rootScope, serverUrls, $http, ngDialog, PagerExtends, layerAlert, $filter, PcService) {
	$scope.list = [];

	//选项卡
	$scope.navTabList = [{
		Id: 1,
		Name: "慈善资金登记",
		Active: true
	}, {
		Id: 2,
		Name: "慈善使用",
		Active: false
	}, {
		Id: 3,
		Name: "慈善余存",
		Active: false
	}];
	var selectEdit = [];
	var selectedName = [];
	var selectAdd=[];
	var _selectedName = [];
	var allSelectName=[];
	var NameSelect = '';
	var Indexid = -1;
	var editorMoney = 0;
	var ListText='';
	//页面上的类型
	$scope.classSelect = [{
		value: '全部',
		index: 0
	}, {
		value: '政府拨款',
		index: 1
	}, {
		value: '政府补贴',
		index: 2
	}, {
		value: '政府补息',
		index: 3
	}];
	$scope.PcService = PcService;
	//状态
	$scope.statusSlect = [{
		value: '所有',
		index: 0
	}, {
		value: '公开',
		index: 1
	}, {
		value: '保密',
		index: 2
	}];

	$scope.searchOption = {
		name: '',
		state: 0,
		time: $filter('date')('', "yyyy-MM-dd"),
	};
	$scope.selectModeyInit = '请选择';
	$scope.fundType = $scope.usefundType = [{
		Id: 0,
		Name: "请选择"
	}];
	// 付款方式
	$scope.payMent = [{
		nameDisplay: "现金",
		value: 1,
		Checked: false
	}, {
		nameDisplay: "支票",
		value: 2,
		Checked: false
	}, {
		nameDisplay: "转账",
		value: 3,
		Checked: false
	}];
	// 
	$scope.payMentId = [{
		Name: "转账",
		Id: 2
	}, {
		Name: "支票",
		Id: 3
	}, {
		Name: "现金",
		Id: 1
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
	//名义
	$scope.enterModeId = [{
		Name: "个人",
		Id: 1
	}, {
		Name: "企业",
		Id: 2
	}, {
		Name: "匿名",
		Id: 3
	}]
	// 基金录入和基金使用新增按钮文字设置
	$scope.addText = function(id) {
		var text = '';
		if(id == 1) {
			text = '资金';
		} else if(id == 2) {
			text = '使用';
		}
		return text
	}
	$scope.callFunds = 0;
	$scope.charName = [{
		Name: '请选择',
		Id: 0
	}]
	// 慈善资金录入和慈善使用新增弹框字段设置
	$scope.fieldsList = [
		[{
			name: "enterName",
			nameDisplay: "名称",
			editor: "normal",
			required: true,
			value: ""
		}, {
			name: "enterPay",
			nameDisplay: "付款方",
			editor: "normal",
			required: true,
			value: ""
		}, {
			name: "enterContacts",
			nameDisplay: "付款联系人",
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
			name: "enterPhone",
			nameDisplay: "联系电话",
			editor: "normal",
			required: true,
			value: ""
		}, {
			name: "usefundType",
			nameDisplay: "类型",
			editor: "select",
			required: true,
			value: $scope.usefundType[0].Id,
			opts: $scope.usefundType,
			originValue: 0
		}, {
			name: "enterpayMent",
			nameDisplay: "付款方式",
			editor: "radio",
			required: true,
			value: $scope.payMentId[0].Id,
			opts: $scope.payMentId,
			column: 1
		}, {
			name: "enterMode",
			nameDisplay: "名义方式",
			editor: "radio",
			required: true,
			value: $scope.enterModeId[0].Id,
			opts: $scope.enterModeId,
			column: 1
		}, {
			name: "enterfundState",
			nameDisplay: "状态",
			editor: "radio",
			required: true,
			value: $scope.fundStateId[0].Id,
			opts: $scope.fundStateId,
			column: 1
		}, {
			editor: "textarea",
			name: "enterRemark",
			nameDisplay: "备注信息",
			required: false,
			value: "",
			originValue: ""
		}]

	];

	$scope.fieldsListTwo = [
			[{
				name: "useName",
				nameDisplay: "名称",
				editor: "normal",
				required: true,
				value: "",
			}, {
				name: "usefundState",
				nameDisplay: "状态",
				editor: "radio",
				required: true,
				value: $scope.fundStateId[0].Id,
				opts: $scope.fundStateId

			}, {
				name: "usePay",
				nameDisplay: "收款方",
				editor: "normal",
				required: true,
				value: ""
			}, {
				name: "useCash",
				nameDisplay: "金额",
				editor: "normal",
				required: true,
				value: "",
				unit: 'money'
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
				name: 'useline',
				editor: 'line',
				value: '资金安排',
				column: 1
			}],
			[
				[{
					name: "useName1",
					nameDisplay: "名称",
					editor: "select",
					required: true,
					value: $scope.charName[0].Id,
					opts: $scope.charName,
				}, {
					name: "arrangeCash1",
					nameDisplay: "金额",
					add: "add",
					editor: "normal",
					required: true,
					value: "",
					unit: 'money',
					des: '可调用' + $scope.callFunds + '元',
					selectMoney: 0,
					Quantity: 0

				}]
			],
			[{
				name: "enterpayMent",
				nameDisplay: "付款方式",
				editor: "radio",
				required: true,
				value: $scope.payMentId[0].Id,
				opts: $scope.payMentId,
				column: 1

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
		}
	//慈善录入和基金使用修改弹框字段设置
	$scope.fieldsModifyList = [{
		name: "Name",
		nameDisplay: "名称",
		editor: "normal",
		required: true,
		value: ""
	}, {
		name: "Quantity",
		nameDisplay: "金额",
		editor: "normal",
		required: true,
		value: "",
		unit: 'money',
		editable:true
	}, {
		name: "Category",
		nameDisplay: "基金类型",
		editor: "select",
		required: true,
		value: $scope.fundType[0].Id,
		opts: $scope.fundType,
		originValue: $scope.fundType[0].Id
	}, {
		name: "PayWay",
		nameDisplay: "付款方式",
		editor: "radio",
		required: true,
		value: $scope.payMentId[0].Id,
		opts: $scope.payMentId
	}, {
		name: "State",
		nameDisplay: "状态",
		editor: "radio",
		value: $scope.fundStateId[0].Id,
		opts: $scope.fundStateId
	}, {
		name: "enterMode",
		nameDisplay: "名义方式",
		editor: "radio",
		required: true,
		value: $scope.enterModeId[0].Id,
		opts: $scope.enterModeId,
	}, {
		name: "Payer",
		nameDisplay: "付款方",
		editor: "normal",
		required: true,
		value: ""
	}, {
		name: "Contacts",
		nameDisplay: "付款联系人",
		editor: "normal",
		required: true,
		value: ""
	}, {
		name: "Phone",
		nameDisplay: "联系电话",
		editor: "normal",
		required: true,
		value: ""
	}, {
		editor: "textarea",
		name: "Remarks",
		nameDisplay: "备注信息",
		required: false,
		value: "",
		originValue: ""
	}];
	//慈善使用之明细添加和慈善使用之明细修改弹框字段设置
	$scope.fieldsListThree = [{
		name: "useNamett",
		nameDisplay: "名称",
		editor: "search-select",
		required: true,
		value: $scope.charName[0].Id,
		opts: $scope.charName,
	}, {
		name: "arrangeCashtt",
		nameDisplay: "金额",
		editor: "normal",
		required: true,
		value: "",
		add: "add",
		unit: 'money',
		des: '可调用' + $scope.callFunds + '元',
		selectMoney: 0,
		Quantity: 0,
		none: 'n'
	}];
	$scope.fieldsListAdd = [
			[{
				name: "useName",
				nameDisplay: "名称",
				editor: "normal",
				required: true,
				value: "",
				editable:true
			}, {
				name: "usefundState",
				nameDisplay: "状态",
				editor: "radio",
				required: true,
				value: $scope.fundStateId[0].Id,
				opts: $scope.fundStateId,
				editable:true

			}, {
				name: "usePay",
				nameDisplay: "收款方",
				editor: "normal",
				required: true,
				value: "",
				editable:true
			}, {
				name: "useCash",
				nameDisplay: "金额",
				editor: "normal",
				required: true,
				value: "",
				unit: 'money',
				editable:true
			}, {
				name: "useContacts",
				nameDisplay: "收款联系人",
				editor: "normal",
				required: true,
				value: "",
				editable:true
			}, {
				name: "usePhone",
				nameDisplay: "联系电话",
				editor: "normal",
				required: true,
				value: "",
				editable:true
			}, {
				name: 'useline',
				editor: 'line',
				value: '资金安排',
				column: 1
			}],
			[
			
				[{
					name: "Name",
					nameDisplay: "名称",
					editor: "search-select",
					opts: $scope.charName,
					required: false,
					value:$scope.charName[0].Id,
				}, {
					name: "arrangeCash1",
					nameDisplay: "金额",
					add: "add",
					editor: "normal",
					required: true,
					value: "",
					unit: 'money',
					des: '可调用' + $scope.callFunds + '元',
					selectMoney: 0,
					Quantity: 0

				}]
			],
			[{
				name: "enterpayMent",
				nameDisplay: "付款方式",
				editor: "radio",
				required: true,
				value: $scope.payMentId[0].Id,
				opts: $scope.payMentId,
				column: 1

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
	//默认选中第一个tab
	$scope.selectTab = $scope.navTabList[0];
	//选项卡选择操作
	$scope.checked = function(x) {
		$scope.searchOption = {
			name: '',
			state: 0,
			time: $filter('date')('', "yyyy-MM-dd"),
		};
		$scope.navTabList.forEach(function(item, index) {
			if(item.Name === x.Name) {
				item.Active = true;
			} else {
				item.Active = false;
			}
		});
		if($scope.selectTab !== x) {
			$scope.selectTab = x;

		}
		$scope.devInit($scope.selectTab.Id)
	};

	//时间插件
	setTimeout(function() {
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
	}, 100)

	//对手机号码验证
	var phoneCheck = function(val) {
		var flag = true;
		var pattern = /^1[3|4|5|8][0-9]\d{4,8}$/;
		var patternTwo = /^0\d{2,3}-?\d{7,8}$/;
		if(pattern.test(val) || patternTwo.test(val)) {
			flag = true;
		} else {
			flag = false;
		}
		return flag;
	}
	//检验名称
	var DevNameCheck = function(val) {
		var flag = true;
		var patternName = /^[\u4E00-\u9FA5a-zA-Z0-9_]{1,200}$/;
		if(patternName.test(val)) {
			flag = true;
		} else {
			flag = false;
		}
		return flag;
	}
	//检验金额
	var moneyCheck = function(val) {
		var flag = true;
		var patternName = /^([1-9][\d]{0,20}|0)(\.[\d]{1,2})?$/;
		if(patternName.test(val)) {
			flag = true;
		} else {
			flag = false;
		}
		return flag;
	}
	var addeditId = -1;
	$scope.creatOne = function() {
		addeditId=0;
		var fieldsList=$scope.fieldsList[0];
		ngDialog.openConfirm({
			template: 'createOne',
			scope:$scope,
			controller:  ["$scope", function($scope){	
			$scope.fieldsList = fieldsList;
			 $scope.fieldsList.map(function(v){
				 	if(v.editor=='normal' || v.editor=='textarea'){
				 		v.value='';
				 	}
				 })
				 $scope.TitleText='资金';
				 charTypeGet(1,$scope,2);
				 
				 
			
           //表单提交
			$scope.formSubmit = function() {
				  var method='post';
				  var url=serverUrls.AddCharity;
				    var data={
						  "Name": fieldsList[0].value,
						  "CategoryId": $scope.fieldsList[5].value,
						  "Payer": fieldsList[1].value,
						  "Quantity": Number(fieldsList[3].value).toFixed(2),
						  "Contacts": fieldsList[2].value,
						  "Phone": fieldsList[4].value,
						  "NominalWay": fieldsList[7].value,
						  "PayWay": fieldsList[6].value,
						  "State": fieldsList[8].value,
						  "Remarks": fieldsList[9].value
						};
						var DevNameFlag=DevNameCheck(fieldsList[0].value.replace(/\s/g, ""));
				    	if(!DevNameFlag){
				    		 layerAlert.autoclose('名称输入不合法,支持文字，数字，英文和下划线,请重新输入');
				    		
				    		return;
				    	 }
						var PayerFlag=DevNameCheck(fieldsList[1].value.replace(/\s/g, ""));
				    	if(!PayerFlag){
				    		 layerAlert.autoclose('付款方输入不合法,支持文字，数字，英文和下划线,请重新输入');
				    		
				    		return;
				    	 }
						var ContactsFlag=DevNameCheck(fieldsList[2].value.replace(/\s/g, ""));
				    	if(!ContactsFlag){
				    		 layerAlert.autoclose('付款联系人输入不合法,支持文字，数字，英文和下划线,请重新输入');
				    		 
				    		return;
				    	 }	
				    	var moneyFlag=moneyCheck(fieldsList[3].value)
				    	if(!moneyFlag){
				    		 layerAlert.autoclose('金额输入不合法');
				    		return;
				    	 }
				    	var phoneFlag=phoneCheck(fieldsList[4].value);
				    	// if(!phoneFlag){
				    	// 	 layerAlert.autoclose('联系电话输入不合法');
				    		
				    	// 	return;
				    	// }
						
					formSubmit($scope,method,url,data);
			};
              
			}],
			className: 'ngdialog-theme-default',
				//closeByEscape: true,
			closeByDocument: false,
			width: 1100,
		});
		
	};

	//新增慈善管理
	$scope.creatMylist = function() {
			// var fieldsList = $scope.fieldsListTwo;
			// console.log('fieldsList',fieldsList)
			Indexid=1;
			var Id=$scope.selectTab.Id;
			ngDialog.openConfirm({
				template: 'myeditList',
				scope:$scope,
				controller: ["$scope", function($scope) {
					$scope.options = [];
					$scope.fieldsLists = [
								[{
									name: "useName",
									nameDisplay: "名称",
									editor: "normal",
									required: true,
									value: "",
								}, {
									name: "usefundState",
									nameDisplay: "状态",
									editor: "radio",
									required: true,
									value: $scope.fundStateId[0].Id,
									opts: $scope.fundStateId

								}, {
									name: "usePay",
									nameDisplay: "收款方",
									editor: "normal",
									required: true,
									value: ""
								}, {
									name: "useCash",
									nameDisplay: "金额",
									editor: "normal",
									required: true,
									value: "",
									unit: 'money'
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
									name: 'useline',
									editor: 'line',
									value: '资金安排',
									column: 1
								}],
								[
									[{
										name: "Name",
										nameDisplay: "名称",
										editor: "search-select",
										required: true,
										value: $scope.charName[0].Id,
										opts: $scope.charName,
									}, {
										name: "arrangeCash1",
										nameDisplay: "金额",
										add: "add",
										editor: "normal",
										required: true,
										value: "",
										unit: 'money',
										des: '可调用' + $scope.callFunds + '元',
										selectMoney: 0,
										Quantity: 0

									}]
								],
								[{
									name: "enterpayMent",
									nameDisplay: "付款方式",
									editor: "radio",
									required: true,
									value: $scope.payMentId[0].Id,
									opts: $scope.payMentId,
									column: 1

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
							console.log('$scope.fieldsLists',$scope.fieldsLists)
					$scope.fieldsLists[0].forEach(function(v){
						if(v.editor=='normal'){
							v.value='';
						}
					});
					$scope.fieldsLists[2].forEach(function(v){
						if(v.editor=='textarea'){
							v.value='';
						}
					})
					$scope.valueArray = []; //已选中的值组成的数组
					var initArray = [{
						Id: 0,
						Name: "请选择"
					}];
					$scope.ngDialogPromise = $http({
						headers: $rootScope.pHeader,
						method: 'get',
						url: serverUrls.GetListByNamechar + '?name=' + name
					}).success(function(response) {
						var Code = response.State.Code;
						var Message = response.State.Message;
						if(Code === 0) {
							$scope.option = response.Content;
							$scope.compareArr=response.Content;
							_selectedName=response.Content;
							allSelectName=response.Content;
							$scope.options.push($scope.option);
							$scope.fieldsLists[1] = [
								[{
									name: "Name",
									nameDisplay: "名称",
									editor: "search-select",
									opts: $scope.options[0],
									required: false,
									value: $scope.options[0][0].Id,
								}, {
									name: "arrangeCash1",
									nameDisplay: "金额",
									add: "add",
									editor: "normal",
									required: true,
									value: "",
									unit: 'money',
									des: '可调用' + $scope.options[0][0].BalanceQuantity + '元',
									selectMoney: $scope.options[0][0].Id,
									Quantity: 0

								}]

							];
						} else {
							layerAlert.autoclose(Message);
						}
					}).error(function(error) {
						layerAlert.autoclose(PcService.errorResult(error));
					});

					//通过Id获取Name
					var getNameById = function(id) {
						var name = "请选择";
						$scope.option.forEach(function(item) {
							if(item.Id === id) {
								name = item.Name;
							}
						});
						return name;
					};

					//获取已选中value的数组
					var getCheckdArray = function(fieldsLists) {
						var newArray = [];
						fieldsLists.forEach(function(v) {
							v.map(function(item, index) {
								if(item.editor === "search-select") {
									newArray.push({
										Id: item.value,
										Name: getNameById(item.value),
										BalanceQuantity:item.BalanceQuantity
									});
								}

							});
						});
						$scope.valueArray = newArray;
						return newArray;
					};

					//
					var deffrentOptions = function($scope) {
						var hasCheckedValues = getCheckdArray($scope.fieldsLists[1]);
						$scope.options.forEach(function(_v, n) {
							if(n === 0) {
								v = angular.copy($scope.option);
							} else {

								v = initArray.concat(angular.copy($scope.option));
							}
							for(var index = v.length - 1; index >= 0; index--) {
								hasCheckedValues.forEach(function(_item, _index) {
									if(v[index] && v[index].Id === _item.Id && _item.Id !== 0 && n !== _index) {
										v.splice(index, 1);
									}
								});
							}
							$scope.options[n] = v;
							$scope.fieldsLists[1][n][0].opts = $scope.options[n];
						});
						//console.log($scope.fieldsLists[1]);
					};

					$scope.addItem = function(index) {
						if(index >= $scope.option.length) {
							return;
						}
						var checkdArray = getCheckdArray($scope.fieldsLists[1]);
						$scope.options[index] = initArray.concat(angular.copy($scope.option));;
						var _initArray = [{
							name: "Name",
							nameDisplay: "名称",
							editor: "search-select",
							opts: $scope.options[index],
							required: false,
							value: 0
						}, {
							name: "arrangeCash1",
							nameDisplay: "金额",
							add: "add",
							editor: "normal",
							required: true,
							value: "",
							unit: 'money',
							des: '可调用0元',
							selectMoney: -1,
							Quantity: 0

						}];
						$scope.fieldsLists[1][index] = _initArray;
						deffrentOptions($scope);
					};

					$scope.myChange = function(fields,opt,value) {
						deffrentOptions($scope);
						var count=0;
						var num=0;
						if(opt && opt.length>0){
							opt.forEach(function(v,i){
								if(v.Id==value){
				                  count=i
								}
							});	
						}
						$scope.options.forEach(function(v,i){
							v.forEach(function(item,index){
								if(item.Id==value){
									num=i
								}
							})
						})
						$scope.fieldsLists[1][num][1].des = '可调用' + Number(opt[count].BalanceQuantity).toFixed(2)+ '元';
						$scope.fieldsLists[1][num][1].selectMoney = opt[count].Id
					  
					};

					$scope.deleteItem = function(_index) {
					
						$scope.options.splice(_index, 1);
						$scope.fieldsLists[1].splice(_index, 1);
						deffrentOptions($scope);
					};
					//表单提交
					$scope.formSubmit = function() {
						$scope.TitleText='使用';
						var url=serverUrls.AddChatiryUse;
			        	var lists=[];
				    	$scope.fieldsLists[1].forEach(function(v,i){
				    		v.forEach(function(item){
				    			if(item.unit && item.des){
		                         lists.push({
		                         	CharityId:item.selectMoney,
		                         	Quantity:Number(item.value),
		                         	Remarks:$scope.fieldsLists[2][1].value,
		                         	PayWay:$scope.fieldsLists[2][0].value
		                         })
		                      }

				    		})
				    		
				    	});	
				   
                    selectedName=lists;

				    var data={
						  "Name": $scope.fieldsLists[0][0].value,
						  "Receiver":$scope.fieldsLists[0][2].value,
						  "Quantity": Number($scope.fieldsLists[0][3].value).toFixed(2),
						  "Contacts": $scope.fieldsLists[0][4].value,
						  "Phone": $scope.fieldsLists[0][5].value,
						  "State":$scope.fieldsLists[0][1].value,
					      "UseDetailList": lists
						};
						var DevNameFlag=DevNameCheck( $scope.fieldsLists[0][0].value.replace(/\s/g, ""));
				    	if(!DevNameFlag){
				    		 layerAlert.autoclose('名称输入不合法,支持文字，数字，英文和下划线,请重新输入');
				    		  $scope.fieldsLists[0][0].value.value='';
				    		return;
				    	 }
						var PayerFlag=DevNameCheck($scope.fieldsLists[0][2].value.replace(/\s/g, ""));
				    	if(!PayerFlag){
				    		 layerAlert.autoclose('收款方输入不合法,支持文字，数字，英文和下划线,请重新输入');
				    		$scope.fieldsLists[0][2].value='';
				    		return;
				    	 }
				    	 var moneyFlag=moneyCheck($scope.fieldsLists[0][3].value)
				    	if(!moneyFlag){
				    		 layerAlert.autoclose('金额输入不合法');
				    		$scope.fieldsLists[0][3].value='';
				    		return;
				    	 }
						var ContactsFlag=DevNameCheck($scope.fieldsLists[0][4].value.replace(/\s/g, ""));
				    	if(!ContactsFlag){
				    		 layerAlert.autoclose('收款联系人输入不合法,支持文字，数字，英文和下划线,请重新输入');
				    		$scope.fieldsLists[0][4].value=''
				    		return;
				    	 }	
				    	
				    	var phoneFlag=phoneCheck( $scope.fieldsLists[0][5].value);
				    	// if(!phoneFlag){
				    	// 	 layerAlert.autoclose('联系电话输入不合法');
				    	// 	  $scope.fieldsLists[0][5].value='';
				    	// 	return;
				    	// }

				    	 var compareMoney=false;
				    	 var flag=false;
				    	 var patternName = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
				    	 if($scope.compareArr.length>0){
				    		lists.forEach(function(v,i){
				    			$scope.compareArr.forEach(function(m,j){
				    				if(v.CharityId===m.Id){
				    					if(!(patternName.test((v.Quantity).toString()))){
				    						layerAlert.autoclose(m.Name+'金额输入不合法');
				    						flag=true;
				    					}
				    				}
				    			});
                               
				    		})
				    	}
		 
                         var allCount=0;
                         lists.forEach(function(v,i){
                         	allCount+=Number(v.Quantity);
                         });
                         if(allCount > Number($scope.fieldsLists[0][3].value)){
                         	layerAlert.autoclose('资金安排金额输入大于总金额');
                         	return;
                         }
				    	 method='post';
				    	if($scope.compareArr.length>0){
				    		lists.forEach(function(v,i){
				    			$scope.compareArr.forEach(function(m,j){
				    				if(v.CharityId===m.Id){
				    					if((Number(v.Quantity)-Number(m.BalanceQuantity))>0){
				    						layerAlert.autoclose(m.Name+'金额输入大于可调金额');
				    						compareMoney=true;
				    					}
				    				}
				    			});
                               
				    		})
				    	}
                      if(!compareMoney && !flag){
                      	 formSubmit($scope,method,url,data);
                      }
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 1100,
			});
		
		

	};

	// 修改基金录入和基金使用弹框弹出
	$scope.creatTwo = function(x) {
		addeditId = 1;
		var TitleModify = x.Name;
		var fieldsModifyList = $scope.fieldsModifyList;
		var id = $scope.selectTab;

		ngDialog.openConfirm({
			template: 'createTwo',
			scope: $scope,
			controller: ["$scope", function($scope) {
				$scope.fieldsModifyList = fieldsModifyList;
				$scope.TitleModify = TitleModify;
				GetByCharId(x.Id, $scope);
				setTimeout(function(){
				 	charTypeGet(1, $scope, 2);
				 },500);
				
				$scope.formSubmit = function() {
					var method = 'post';
					switch($scope.selectTab.Id) {
						case 1:
							var url = serverUrls.UpdateCharity;
							var data = {
								"Name": fieldsModifyList[0].value,
								"CategoryId": fieldsModifyList[2].value,
								"Payer": fieldsModifyList[6].value,
								"Quantity": Number(fieldsModifyList[1].value).toFixed(2),
								"Contacts": fieldsModifyList[7].value,
								"Phone": fieldsModifyList[8].value,
								"NominalWay": fieldsModifyList[5].value,
								"PayWay": fieldsModifyList[3].value,
								"State": fieldsModifyList[4].value,
								"Remarks": fieldsModifyList[9].value,
								"Id": x.Id
							};
							console.log('data', data)
							var DevNameFlag = DevNameCheck(fieldsModifyList[0].value.replace(/\s/g, ""));
							if(!DevNameFlag) {
								layerAlert.autoclose('名称输入不合法,支持文字，数字，英文和下划线,请重新输入');
								fieldsModifyList[0].value = '';
								return;
							}
							var moneyFlag = moneyCheck(fieldsModifyList[1].value)
							if(!moneyFlag) {
								layerAlert.autoclose('金额输入不合法');
								fieldsModifyList[1].value = '';
								return;
							}
							var PayerFlag = DevNameCheck(fieldsModifyList[6].value.replace(/\s/g, ""));
							if(!PayerFlag) {
								layerAlert.autoclose('付款方输入不合法,支持文字，数字，英文和下划线,请重新输入');
								fieldsModifyList[6].value = '';
								return;
							}
							var ContactsFlag = DevNameCheck(fieldsModifyList[7].value.replace(/\s/g, ""));
							if(!ContactsFlag) {
								layerAlert.autoclose('付款联系人输入不合法,支持文字，数字，英文和下划线,请重新输入');
								fieldsModifyList[7].value = '';
								return;
							}

							var phoneFlag = phoneCheck(fieldsModifyList[8].value);
							// if(!phoneFlag) {
							// 	layerAlert.autoclose('联系电话输入不合法');
							// 	fieldsModifyList[7].value = '';
							// 	return;
							// }

							formSubmit($scope, method, url, data);

							break;
						case 2:
							$scope.TitleText = '使用';

						default:
							break;
					}
				};
			}],
			className: 'ngdialog-theme-default',
			closeByDocument: false,
			width: 600
		});
	}
	//  慈善使用之明细添加
	$scope.creatAddDetail = function(x) {
		
		ngDialog.openConfirm({
			template: 'createAdd',
			scope: $scope,
			controller: ["$scope", function($scope) {
					$scope.fieldsListEdit =  [
								[{
									name: "useName",
									nameDisplay: "名称",
									editor: "normal",
									required: true,
									value: "",
									editable:true
								}, {
									name: "usefundState",
									nameDisplay: "状态",
									editor: "radio",
									required: true,
									value: $scope.fundStateId[0].Id,
									opts: $scope.fundStateId,
									editable:true

								}, {
									name: "usePay",
									nameDisplay: "收款方",
									editor: "normal",
									required: true,
									value: "",
									editable:true
								}, {
									name: "useCash",
									nameDisplay: "金额",
									editor: "normal",
									required: true,
									value: "",
									unit: 'money',
									editable:true
								}, {
									name: "useContacts",
									nameDisplay: "收款联系人",
									editor: "normal",
									required: true,
									value: "",
									editable:true
								}, {
									name: "usePhone",
									nameDisplay: "联系电话",
									editor: "normal",
									required: true,
									value: "",
									editable:true
								}, {
									name: 'useline',
									editor: 'line',
									value: '资金安排',
									column: 1
								}],
								[
								
									[{
										name: "Name",
										nameDisplay: "名称",
										editor: "search-select",
										opts: $scope.charName,
										required: false,
										value:$scope.charName[0].Id,
									}, {
										name: "arrangeCash1",
										nameDisplay: "金额",
										add: "add",
										editor: "normal",
										required: true,
										value: "",
										unit: 'money',
										des: '可调用' + $scope.callFunds + '元',
										selectMoney: 0,
										Quantity: 0

									}]
								],
								[{
									name: "enterpayMent",
									nameDisplay: "付款方式",
									editor: "radio",
									required: true,
									value: $scope.payMentId[0].Id,
									opts: $scope.payMentId,
									column: 1

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
						var state=-1;
						if(x.State=='保密'){
							state=2
						}else{
							state=1
						}
						$scope.fieldsListEdit[0][0].value=x.Name;
						$scope.fieldsListEdit[0][1].value=state;
						$scope.fieldsListEdit[0][2].value=x.Receiver;
						$scope.fieldsListEdit[0][3].value=x.Quantity;
						$scope.fieldsListEdit[0][4].value=x.Contacts;
						$scope.fieldsListEdit[0][5].value=x.Phone;
						// var fieldsListThree = $scope.fieldsListAdd;
						$scope.TitleText=x.Name;
						$scope.fieldsListEdit[2].map(function(v){
							if(v.editor=='textarea'){
								v.value='';
							}
						})
					Indexid = 2;
					$scope.options = [];
					$scope.valueArray = []; //已选中的值组成的数组
					var initArray = [{
						Id: 0,
						Name: "请选择"
					}];
					$scope.ngDialogPromise = $http({
						headers: $rootScope.pHeader,
						method: 'get',
						url: serverUrls.GetListByNamechar + '?name=' + name
					}).success(function(response) {
						var Code = response.State.Code;
						var Message = response.State.Message;
						if(Code === 0) {
							$scope.option = response.Content;
							$scope.compareArr=response.Content;
							selectAdd=response.Content;
							allSelectName=response.Content;
							$scope.options.push($scope.option);
							$scope.fieldsListEdit[1] = [
								[{
									name: "Name",
									nameDisplay: "名称",
									editor: "search-select",
									opts: $scope.options[0],
									required: false,
									value: $scope.options[0][0].Id,
								}, {
									name: "arrangeCash1",
									nameDisplay: "金额",
									add: "add",
									editor: "normal",
									required: true,
									value: "",
									unit: 'money',
									des: '可调用' + $scope.options[0][0].BalanceQuantity + '元',
									selectMoney: $scope.options[0][0].Id,
									Quantity: 0

								}]

							];
						} else {
							layerAlert.autoclose(Message);
						}
					}).error(function(error) {
						layerAlert.autoclose(PcService.errorResult(error));
					});

					//通过Id获取Name
					var getNameById = function(id) {
						var name = "请选择";
						$scope.option.forEach(function(item) {
							if(item.Id === id) {
								name = item.Name;
							}
						});
						return name;
					};

					//获取已选中value的数组
					var getCheckdArray = function(fieldsLists) {
						var newArray = [];
						fieldsLists.forEach(function(v) {
							v.map(function(item, index) {
								if(item.editor === "search-select") {
									newArray.push({
										Id: item.value,
										Name: getNameById(item.value),
										BalanceQuantity:item.BalanceQuantity
									});
								}

							});
						});
						$scope.valueArray = newArray;
						return newArray;
					};

					//
					var deffrentOptions = function($scope) {
						var hasCheckedValues = getCheckdArray($scope.fieldsListEdit[1]);
						$scope.options.forEach(function(_v, n) {
							if(n === 0) {
								v = angular.copy($scope.option);
							} else {

								v = initArray.concat(angular.copy($scope.option));
							}
							for(var index = v.length - 1; index >= 0; index--) {
								hasCheckedValues.forEach(function(_item, _index) {
									if(v[index] && v[index].Id === _item.Id && _item.Id !== 0 && n !== _index) {
										v.splice(index, 1);
									}
								});
							}
							$scope.options[n] = v;
							$scope.fieldsListEdit[1][n][0].opts = $scope.options[n];
						});
					
					};

					$scope.addItem = function(index) {
						if(index >= $scope.option.length) {
							return;
						}
						var checkdArray = getCheckdArray($scope.fieldsListEdit[1]);
						$scope.options[index] = initArray.concat(angular.copy($scope.option));;
						var _initArray = [{
							name: "Name",
							nameDisplay: "名称",
							editor: "search-select",
							opts: $scope.options[index],
							required: false,
							value: 0
						}, {
							name: "arrangeCash1",
							nameDisplay: "金额",
							add: "add",
							editor: "normal",
							required: true,
							value: "",
							unit: 'money',
							des: '可调用0元',
							selectMoney: -1,
							Quantity: 0

						}];
						$scope.fieldsListEdit[1][index] = _initArray;
						deffrentOptions($scope);
					};

					$scope.myChange = function(fields,opt,value) {
						deffrentOptions($scope);
						var count=0;
						var num=0;
						if(opt && opt.length>0){
							opt.forEach(function(v,i){
								if(v.Id==value){
				                  count=i
								}
							});	
						}
						$scope.options.forEach(function(v,i){
							v.forEach(function(item,index){
								if(item.Id==value){
									num=i
								}
							})
						})
						$scope.fieldsListEdit[1][num][1].des = '可调用' + Number(opt[count].BalanceQuantity).toFixed(2)+ '元';
						$scope.fieldsListEdit[1][num][1].selectMoney = opt[count].Id
					  
					};

					$scope.deleteItem = function(_index) {
						$scope.options.splice(_index, 1);
						$scope.fieldsListEdit[1].splice(_index, 1);
						deffrentOptions($scope);
					};

				
				var url = '',
					data = {},
					url1 = '';

				$scope.formSubmit = function() {
				
				    url = serverUrls.AddChatiryUseDetailBatch;
					var lists=[];
				    	$scope.fieldsListEdit[1].forEach(function(v,i){
				    		v.forEach(function(item){
				    			if(item.unit && item.des){
		                         lists.push({
		                         	CharityId:item.selectMoney,
		                         	Quantity:Number(item.value),
		                         	Remarks:$scope.fieldsListEdit[2][1].value,
		                         	PayWay:$scope.fieldsListEdit[2][0].value
		                         })
		                      }

				    		})
				    		
				    	});	
				   var countMoneyFlag=0;
				   lists.forEach(function(v){
				   	  countMoneyFlag+=v.Quantity;
				   });
				   if(Number(countMoneyFlag)> Number(x.Quantity)){
                         layerAlert.autoclose('资金安排金额输入大于'+ListText+'总金额');
                         return;
				   }
				    data = {
							list: lists,
							CharityUseId: x.Id
						};
                       console.log('data',data)
				    	 var compareMoney=false;
				    	 var flag=false;
				    	 var patternName = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
				    	 if($scope.compareArr.length>0){
				    		lists.forEach(function(v,i){
				    			$scope.compareArr.forEach(function(m,j){
				    				if(v.CharityId===m.Id){
				    					if(!(patternName.test((v.Quantity).toString()))){
				    						layerAlert.autoclose(m.Name+'金额输入不合法');
				    						flag=true;
				    					}
				    				}
				    			});
                               
				    		})
				    	}
				    	 method='post';
				    	if($scope.compareArr.length>0){
				    		lists.forEach(function(v,i){
				    			$scope.compareArr.forEach(function(m,j){
				    				if(v.CharityId===m.Id){
				    					if((Number(v.Quantity)-Number(m.BalanceQuantity))>0){
				    						layerAlert.autoclose(m.Name+'金额输入大于可调金额');
				    						compareMoney=true;
				    					}
				    				}
				    			});
                               
				    		})
				    	}
						
						if(!compareMoney && !flag) {
							sureAddEdit(url, data,$scope);
						}
					

				}

			}],
			className: 'ngdialog-theme-default',
			closeByDocument: false,
			width: 1100,
		});
	}
	// 慈善明细添加和修改确认
	var sureAddEdit = function(url, data,$scope) {
		$scope.ngDialogPromise = $http({
			headers: $rootScope.pHeader,
			method: 'post',
			url: url,
			data: data
		}).success(function(response) {
			var Code = response.State.Code;
			var Message = response.State.Message;
			var Content = response.Content;
			if(Code === 0) {
				$scope.devInit($scope.selectTab.Id);
				// var url1 = serverUrls.GetByCharityUseId + '?charityUseId=' + $scope.deletId
				// detailGetData(url1)
				ngDialog.closeAll();
				layerAlert.autoclose('操作成功');
				console.log('response', response)
			} else {
				layerAlert.autoclose(Message);
			}
		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});
	}
	$scope.seeItem = function(x,_index) {
		$scope.Chartime = $filter('date')(x.CreatedAt, "yyyy-MM-dd");
		$scope.tdShow=true;
		$scope.deletId = x.Id;
	    switch($scope.selectTab.Id) {
				case 2:
					var url = serverUrls.GetByCharityUseId + '?charityUseId=' + $scope.deletId
	   					detailGetData(url,_index);
					break;
				case 3:
					var url = serverUrls.GetListByBalanceFundId + '?id=' + x.Id
					detailGetData(url, _index,3)
				default:
					break;
			}
	}
	// 查看明细请求
	var detailGetData = function(url, _index,id) {
		var hasHeading = false;
		var headingIndex=0;
		$scope.list.forEach(function(item, index) {
			if(item.heading) {
				$scope.list.splice(index, 1);
				hasHeading = true;
				headingIndex=index;
				
			}
		});
		if(_index === headingIndex-1){
			return;
		} else if(_index < headingIndex) {
			_index++;
		}
		if(!hasHeading) {
			_index++;
		}
		$scope.listBusyPromise = $http({
			headers: $rootScope.pHeader,
			method: 'get',
			url: url,
		}).success(function(response) {
			var Code = response.State.Code;
			var Message = response.State.Message;
			if(id==3){
                var Content = response.Content.list;
			}else{
				var Content = response.Content;
			}
			if(Code === 0) {
				$scope.detail_list = Content;
				$scope.allCountMoney=0;
				var detail_list = Content;
				var itemObj = {
					heading: true,
					list: Content
				}
				$scope.list.splice(_index, 0, itemObj);
				if(Content.length>0){
					Content.forEach(function(v){
                      $scope.allCountMoney+=Number(v.Quantity);
                      v.Quantity=Number(v.Quantity).toFixed(2);
					})
				}
			} else {
				layerAlert.autoclose(Message);
			}
		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});
	}

	// 表单提交
	var formSubmit = function($scope, method, url, data) {
		$scope.ngDialogPromise = $http({
			headers: $rootScope.pHeader,
			method: method,
			url: url,
			data: data
		}).success(function(response) {
			var Code = response.State.Code;
			var Message = response.State.Message;
			var Content = response.Content;
			if(Code === 0) {
				$scope.devInit($scope.selectTab.Id);
				ngDialog.closeAll();
				layerAlert.autoclose('操作成功');
				console.log('response', response)
			} else {
				layerAlert.autoclose(Message);
			}
		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});
	}
	//新增慈善类型设置获取
	var charTypeGet = function(id, $scope, categoryType) {
		$scope.ngDialogPromise = $http({
			headers: $rootScope.pHeader,
			method: 'get',
			url: serverUrls.GetListByType + '?categoryType=' + categoryType
		}).success(function(response) {
			var Code = response.State.Code;
			var Message = response.State.Message;
			var Content = response.Content;
			var newcontent = [];
			if(Code === 0) {
				if(Content && Content.length > 0) {
					Content.map(function(v) {
						newcontent.push({
							"Id": v.Id,
							"Name": v.Name
						});
					});
					switch(id) {
						case 1:
							if(addeditId == 0) {
								$scope.fieldsList[5].opts = newcontent;
								$scope.fieldsList[5].value = newcontent[0].Id;
							} else if(addeditId == 1) {
								$scope.usefundType = newcontent;
								$scope.fieldsModifyList[2].opts = newcontent;
								newcontent.forEach(function(v){
									if(v.Id==$scope.newCatege){
										$scope.fieldsModifyList[2].value = v.Id
									}
								});
							}
						default:
							break;
					}

				}
			} else {
				layerAlert.autoclose(Message);
			}
		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});
	};

	$scope.options = [];
	$scope.valueArray = []; //已选中的值组成的数组
	// 新增慈善使用之名称获取
	var charGetName = function($scope, name) {
		$scope.ngDialogPromise = $http({
			headers: $rootScope.pHeader,
			method: 'get',
			url: serverUrls.GetListByNamechar + '?name=' + name
		}).success(function(response) {
			var Code = response.State.Code;
			var Message = response.State.Message;
			var Content = response.Content;
			if(Code === 0) {
				if(Content && Content.length > 0) {
					selectEdit=Content;
					allSelectName=Content;
					$scope.fieldsListThree[0].opts = Content;
					$scope.fieldsListThree[1].selectMoney=Content[0].Id;
					$scope.fieldsListEdit = $scope.fieldsListThree;
				}

			} else {
				layerAlert.autoclose(Message);
			}
		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});
	}

	$scope.usecharMoney = function(x,y) {
		console.log('y',x)
		var count=0;
		if(y && y.length>0){
			y.forEach(function(v,i){
				if(v.Id==x){
                  count=i
				}
			})
		}
	 $scope.moneyUse=x;
     $scope.fieldsListThree[1].des='(可调资金'+Number(y[count].BalanceQuantity).toFixed(2)+'元)';
     $scope.fieldsListThree[1].selectMoney=x;
     $scope.fieldsListThree[1].Quantity=y[count].BalanceQuantity
	}
	// 修改慈善之查询id
	var GetByCharId = function(id, $scope) {
		$scope.ngDialogPromise = $http({
			headers: $rootScope.pHeader,
			method: 'get',
			url: serverUrls.GetByCharId + '?id=' + id
		}).success(function(response) {
			var data = response.Content;
			$scope.fieldsModifyList[0].value = data.Name;
			$scope.fieldsModifyList[1].value = Number(data.Quantity).toFixed(2);
			$scope.fieldsModifyList[3].value = data.PayWay;
			$scope.fieldsModifyList[4].value = data.State;
			$scope.fieldsModifyList[5].value = data.NominalWay;
			$scope.fieldsModifyList[6].value = data.Payer;
			$scope.fieldsModifyList[7].value = data.Contacts;
			$scope.fieldsModifyList[8].value = data.Phone;
			$scope.fieldsModifyList[9].value = data.Remarks;
			$scope.NominalWayChar = data.NominalWay;
			$scope.newCatege = data.CategoryId;
		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});
	}
	$scope.charmoney = 0;
	//慈善初始化数据
	var dataListGet = function(url, params) {
		$scope.list = [];
		$scope.charmoney = 0;
		PagerExtends.regListSpecifyPage($scope, {
			apiUrl: url,
			params: params,
			success: function(response) {
				if(response.result && response.result.length > 0) {
					$scope.list = response.result;
					$scope.list.map(function(v) {
						v['Quantity'] = Number(v.Quantity).toFixed(2);
						v['UseQuantity'] = Number(v.UseQuantity).toFixed(2);
						v['BalanceQuantity'] = Number(v.BalanceQuantity).toFixed(2);
						
					})
				}
				$scope.charmoney = response.Total;
			},
			error: function(error) {
				$scope.list = [];
				$scope.charmoney = 0;
				layerAlert.autoclose(error);
			}
		}, $rootScope.pHeader);
	};
	//慈善之删除数据
	$scope.deletelItem = function(x) {
		layerAlert.checkone("执行删除操作", function() {
				var url = ($scope.selectTab.Id == 1 ? serverUrls.DeleteCharityById :
			($scope.selectTab.Id == 2 ? serverUrls.DeleteCharityUseDetailById : ''));
		$scope.ngDialogPromise = $http({
			headers: $rootScope.pHeader,
			method: 'DELETE',
			url: url + '?id=' + x.Id,
		}).success(function(response) {
			var Code = response.State.Code;
			var Message = response.State.Message;
			var Content = response.Content;

			if(Code === 0) {
				($scope.selectTab.Id === 1 ? $scope.devInit($scope.selectTab.Id) :
					($scope.selectTab.Id === 2 ? detailGetData(serverUrls.GetByCharityUseId + '?charityUseId=' + $scope.deletId) : ''));

				layerAlert.autoclose('操作成功');
			} else {
				layerAlert.autoclose(Message);
			}
		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});
			}, function() {}, "确定", "取消", true, true);
	}

	//页面初始化 查询
	$scope.devInit = function(id) {
		var params = $scope.searchOption,
			url = '',
			method = '';
		if(id === 1) {
			url = serverUrls.CharGetListByPage;
		} else if(id === 2) {
			url = serverUrls.GetListCharUseByPage;
		} else if(id === 3) {
			url = serverUrls.GetListByPageBalance;
		}
		dataListGet(url, params);
	};

	$scope.devInit($scope.selectTab.Id);
   
	//input失焦
	$scope.inputBlur = function(index,x) {
		var name = '';
		allSelectName.forEach(function(v){
			if(v.Id==x.selectMoney){
				name=v.Name;
			}
		});

		var moneyFlag = moneyCheck(x.value);
		if(x.value=='' || x.value==undefined){
			return;
		}
		if(!moneyFlag){
			layerAlert.autoclose(name+'金额输入不合法');
		}
		switch(Indexid) {
			case 1:
			  if(_selectedName.length>0){
    			_selectedName.forEach(function(m,j){
    				if(m.Id===x.selectMoney){
    					if((Number(x.value)-Math.abs(Number(m.BalanceQuantity)))>0){
    						layerAlert.autoclose(m.Name+'金额输入大于可调金额');
    					}
    				}
    			});	
		    }
				break;
			case 2:
				 if(selectAdd.length>0){
	    			selectAdd.forEach(function(m,j){
	    				if(m.Id===x.selectMoney){
	    					if((Number(x.value)-Math.abs(Number(m.BalanceQuantity)))>0){
	    						layerAlert.autoclose(m.Name+'金额输入大于可调金额');
	    					}
	    				}
	    			});	
		    }
				break;
			case 3:
				 if(selectEdit.length>0){
	    			selectEdit.forEach(function(m,j){
	    				if(m.Id===x.selectMoney){
	    					if((Number(x.value)-Math.abs(Number(m.BalanceQuantity)))>0){
	    						layerAlert.autoclose(m.Name+'金额输入大于可调金额');
	    					}
	    				}
	    			});	
		    }
				break;
			default:
				break;
		}
	};

}]);