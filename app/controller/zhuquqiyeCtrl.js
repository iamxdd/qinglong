App.controller('zhuquqiyeCtrl', ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService','$filter',
	function($scope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService,$filter) {
		$scope.list = [];
		$scope.TitleText = "新增";
		$scope.PcService = PcService;
		$scope.searchOption = {
			name: ""
		};

		//行业列表
		$scope.industry = [{
			Id: 1,
			Name: "食品"
		}];

		//企业类型
		$scope.Enterprise = [{
			Id: 1,
			Name: "民营"
		}];

		//新增驻区企业表单菜单
		$scope.fieldsList = [{
			name: "Name",
			nameDisplay: "企业名称",
			editor: "normal",
			required: true,
			value: "",
			originValue: ""
		}, {
			name: "Industry",
			nameDisplay: "行业",
			editor: "select",
			required: true,
			value: "",
			opts: $scope.industry,
			originValue: $scope.industry[0].Id
		}, {
			editor: "normal",
			name: "TelePhone",
			nameDisplay: "电话",
			required: true,
			value: "",
			originValue: ""
		}, {
			editor: "normal",
			name: "Email",
			nameDisplay: "邮箱",
			required: false,
			value: "",
			originValue: ""
		}, {
			editor: "normal",
			name: "Website",
			nameDisplay: "网址",
			required: false,
			value: "",
			originValue: ""
		}, {
			editor: "normal",
			name: "Address",
			nameDisplay: "地址",
			required: true,
			value: "",
			originValue: ""
		}, {
			editor: "normal",
			name: "LegalRepresentative",
			nameDisplay: "法人代表",
			required: true,
			value: "",
			originValue: ""
		}, {
			editor: "normal",
			name: "RegisteredCapital",
			nameDisplay: "注册资本",
			required: false,
			value: "",
			originValue: ""
		}, {
			name: "RegisteredTime",
			nameDisplay: "注册时间",
			editor: "time-picker",
			required: false,
			value: "",
			editable:false,
			originValue: ""
		},{
			editor: "normal",
			name: "BusinessRegistrationNo",
			nameDisplay: "工商注册号",
			required: true,
			value: "",
			originValue: ""
		}/*, {
			editor: "normal",
			name: "OrganizationCode",
			nameDisplay: "组织机构代码",
			required: true,
			value: "",
			originValue: ""
		}*/, {
			editor: "normal",
			name: "UniformTrustCode",
			nameDisplay: "统一信用代码",
			required: true,
			value: "",
			originValue: ""
		}, {
			editor: "select",
			name: "Types",
			nameDisplay: "企业类型",
			required: false,
			value: "",
			opts: $scope.Enterprise,
			originValue: $scope.Enterprise[0].Id
		}/*, {
			editor: "normal",
			name: "TaxpayerID",
			nameDisplay: "纳税人识别号",
			required: true,
			value: "",
			originValue: ""
		}*/, {
			editor: "normal",
			name: "OperationTerm",
			nameDisplay: "营业期限",
			required: false,
			value: "",
			originValue: ""
		}, {
			name: "ApprovalDate",
			nameDisplay: "核准日期",
			editor: "time-picker",
			required: false,
			value: "",
			editable:false,
			originValue: ""
		}, {
			editor: "normal",
			name: "RegistrationAuthority",
			nameDisplay: "登记机关",
			required: false,
			value: "",
			originValue: ""
		}, {
			editor: "normal",
			name: "RegisteredAddress",
			nameDisplay: "注册地址",
			required: false,
			value: "",
			originValue: ""
		}, {
			editor: "normal",
			name: "OperationScope",
			nameDisplay: "经营范围",
			required: false,
			value: "",
			originValue: ""
		}];

		//新增驻区企业
		$scope.creatOne = function() {
			var fieldsList = $scope.fieldsList;
			var fetchData = $scope.fetchData;
			fieldsList.forEach(function(item, index) {
				item.editable = false;
			});

			PcService.initFormList(fieldsList);
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ["$scope", function($scope) {
					$scope.TitleText = "新增";
					$scope.fieldsList = fieldsList;
					$scope.fetchData = fetchData;

					//提交新增驻区企业
					$scope.formSubmit = function() {
						/*fieldsList.map((v)=>{
							if(v.editor==="time-picker"){
								v.value=v.value ? $filter('date')(v.value, 'yyyy-MM-dd'): "";
							}
						});*/
						fieldsList.map(function(v){
							if(v.editor==="time-picker"){
								v.value=v.value ? $filter('date')(v.value, 'yyyy-MM-dd'): "";
							}
						});
						PcService.formSubmit($scope, true, $scope.fieldsList, serverUrls.addEnterprise);
						// console.log('$scope.fieldsList->',$scope.fieldsList)
					};

				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
		};

		//查看驻区企业
		$scope.editItem = function(x) {
			$scope.fieldsList.forEach(function(item, index) {
				item.editable = true;
			});
			var fieldsList = $scope.fieldsList;
			PcService.bindFormData(x, fieldsList);
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.fieldsList = fieldsList;
					$scope.TitleText = "查看";

				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
		};

		//查询列表数据
		$scope.fetchData = function() {
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.enterpriseList,
				params: $scope.searchOption,
				success: function(response) {
					$scope.list = response;
				},
				error: function(error) {
					layerAlert.autoclose(error);
				}
			});
		};
		$scope.fetchData();

	}
]);