App.controller("qiyeguanliCtrl", ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', function($scope, $http, ngDialog, PagerExtends, layerAlert) {
	$scope.list = [{
		State: 0
	}, {
		State: 1
	}];
	$scope.TitleText = "新增";

	//新增管理
	$scope.creatOne = function() {
		var fieldsList = $scope.fieldsList;
		ngDialog.openConfirm({
			template: 'createOne',
			controller: ['$scope', function($scope) {
				$scope.TitleText = "新增";
				$scope.fieldsList = fieldsList;
			}],
			className: 'ngdialog-theme-default',
			//closeByEscape: true,
			closeByDocument: false
		});
	};

	//编辑管理
	$scope.editItem = function(x) {
		var fieldsList = $scope.fieldsList;
		ngDialog.openConfirm({
			template: 'createOne',
			controller: ['$scope', function($scope) {
				$scope.TitleText = "修改";
				$scope.fieldsList = fieldsList;
			}],
			className: 'ngdialog-theme-default',
			//closeByEscape: true,
			closeByDocument: false
		});
	};

	//新增企业管理表单菜单列表
	$scope.fieldsList = [{
		name: "Name",
		nameDisplay: "院落",
		editor: "select",
		required: true,
		value: ""
	}, {
		name: "Phone",
		nameDisplay: "栋座名称",
		editor: "normal",
		required: true,
		value: ""
	}, {
		editor: "normal",
		name: "Describe",
		nameDisplay: "单元数",
		required: true,
		value: ""
	}, {
		name: "Number",
		nameDisplay: "层户数",
		editor: "normal",
		required: false,
		value: ""

	}, {
		name: "Number",
		nameDisplay: "房号规则",
		editor: "select",
		required: true,
		value: ""
	}];

	//启用停用
	$scope.toggleItem = function(x) {
		layerAlert.success("您点击了启用停用操作!");
	};

	//启用停用Class
	$scope.isToggle = function(x) {
		return {
			'btn-success': x.State === 0,
			'btn-warning': x.State === 1
		};
	};

	//启用停用Text
	$scope.toggleText = function(x) {
		var tText;
		switch(x.State) {
			case 0:
				tText = "启用";
				break;
			case 1:
				tText = "停用";
				break;
			default:
				tText = "无";
				break;
		}
		return tText;
	};
}]);