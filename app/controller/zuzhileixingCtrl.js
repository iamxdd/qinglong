App.controller("zuzhileixingCtrl", ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', function($scope, $http, ngDialog, PagerExtends, layerAlert) {
	$scope.list = [{
		State: 0
	}, {
		State: 1
	}];
	$scope.TitleText = "新增";

	//点击弹出新增组织架构窗口
	$scope.creatOne = function() {
		ngDialog.openConfirm({
			template: 'createOne',
			controller: 'zuzhileixingCtrl',
			className: 'ngdialog-theme-default',
			//closeByEscape: true,
			closeByDocument: false
		});
	};

	//编辑管理
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
			closeByDocument: false
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

	//获取数据列表
	$scope.fetchData = function() {
		layerAlert.autoclose("您点击了获取组织类型列表操作！");
	};

	//分页
	$scope.pagination = {
		page: 5,
		pageSize: 10,
		total: 50
	};

	//上级组织列表
	$scope.PreOrganization = [{
		Id: "1",
		Name: "上级组织1"
	}, {
		Id: "2",
		Name: "上级组织2"
	}, {
		Id: "3",
		Name: "上级组织3"
	}, {
		Id: "4",
		Name: "上级组织4"
	}, {
		Id: "5",
		Name: "上级组织5"
	}];

	//提交新增表单
	$scope.formSubmit = function() {
		alert();
	};

	//新增组织架构表单菜单列表
	$scope.fieldsList = [{
		name: "Name",
		nameDisplay: "类型名称",
		editor: "normal",
		required: true,
		value: ""
	}, {
		name: "PreName",
		nameDisplay: "备注",
		editor: "textarea",
		required: true,
		value: ""
	}];

}]);