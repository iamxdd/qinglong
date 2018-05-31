App.controller("renyuanguanliCtrl", ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', function($scope, $http, ngDialog, PagerExtends, layerAlert) {
	$scope.list = [{
		State: 0
	}, {
		State: 1
	}];
	$scope.TitleText = "新增";

	//新增人员管理
	$scope.creatOne = function() {
		ngDialog.openConfirm({
			template: 'createOne',
			controller: 'renyuanguanliCtrl',
			className: 'ngdialog-theme-default',
			//closeByEscape: true,
			closeByDocument: false,
			width: 850
		});
	};

	//编辑人员管理
	$scope.editItem = function() {
		var fieldsList = $scope.fieldsList;
		ngDialog.openConfirm({
			template: 'createOne',
			controller: ['$scope', function($scope) {
				$scope.fieldsList = fieldsList;
				$scope.TitleText = "修改";
			}],
			className: 'ngdialog-theme-default',
			//closeByEscape: true,
			closeByDocument: false,
			width: 850
		});
	};

	//启用、停用
	$scope.toggleText = function(x) {
		var text;
		switch(x.State) {
			case 0:
				text = "启用";
				break;
			case 1:
				text = "停用";
				break;
			default:
				text = "无";
				break;
		}
		return text;
	};

	//启用、停用className
	$scope.toggleClass = function(x) {
		var _class = {
			'btn-success': x.State === 0,
			'btn-danger': x.State === 1
		};

		return _class;
	};

	//事项模板启用/停用
	$scope.toggleItem = function(x) {
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

	//获取人员管理数据列表
	$scope.fetchData = function() {
		layerAlert.autoclose("您点击了获取人员管理列表操作！");
	};

	//分页
	$scope.pagination = {
		page: 5,
		pageSize: 10,
		total: 50
	};

	//部门列表
	$scope.department = [{
		Id: "1",
		Name: "部门1"
	}, {
		Id: "2",
		Name: "部门2"
	}, {
		Id: "3",
		Name: "部门3"
	}, {
		Id: "4",
		Name: "部门4"
	}];

	//岗位列表
	$scope.department = [{
		Id: "1",
		Name: "岗位1"
	}, {
		Id: "2",
		Name: "岗位2"
	}, {
		Id: "3",
		Name: "岗位3"
	}, {
		Id: "4",
		Name: "岗位4"
	}];

	//性别列表
	$scope.gender = [{
		Id: 0,
		Name: "全部"
	}, {
		Id: 1,
		Name: "男"
	}, {
		Id: 1,
		Name: "女"
	}];

	//提交新增表单
	$scope.formSubmit = function() {
		alert();
	};

	//新增人员管理表单菜单列表
	$scope.fieldsList = [{
		name: "Name",
		nameDisplay: "编号",
		editor: "normal",
		required: true,
		value: ""
	}, {
		name: "PreName",
		nameDisplay: "姓名",
		editor: "normal",
		required: true,
		value: ''
	}, {
		name: "PreName",
		nameDisplay: "岗位",
		editor: "select",
		required: true,
		value: $scope.department[0].Id,
		opts: $scope.department
	}, {
		name: "Count",
		nameDisplay: "性别",
		editor: "select",
		required: true,
		value: $scope.gender[0].Id,
		opts: $scope.gender
	}, {
		name: "Describe",
		nameDisplay: "所属部门",
		editor: "select",
		required: true,
		value: $scope.department[0].Id,
		opts: $scope.department
	}, {
		name: "Describe",
		nameDisplay: "联系电话",
		editor: "normal",
		required: true,
		value: ""
	}, {
		name: "Number",
		nameDisplay: "排序号",
		editor: "normal",
		required: false,
		value: ""
	}, {
		name: "Number",
		nameDisplay: "备注",
		editor: "normal",
		required: false,
		value: ""
	}, {
		name: "Number",
		nameDisplay: "邮件",
		editor: "normal",
		required: false,
		value: ""
	}];
}]);