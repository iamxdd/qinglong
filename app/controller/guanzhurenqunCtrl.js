App.controller('guanzhurenqunCtrl', ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', function($scope, $http, ngDialog, PagerExtends, layerAlert) {
	$scope.list = [];

	//新增管理
	$scope.creatOne = function() {
		ngDialog.openConfirm({
			template: 'createOne',
			controller: 'guanzhurenqunCtrl',
			className: 'ngdialog-theme-default',
			//closeByEscape: true,
			closeByDocument: false
		});
	};

	//新增关注人群表单菜单
	$scope.fieldsList = [{
		name: "Phone",
		nameDisplay: "栋座",
		editor: "select",
		required: true,
		value: ""
	}, {
		name: "Describe",
		nameDisplay: "单元",
		editor: "select",
		required: true,
		value: ""
	}, {
		editor: "normal",
		name: "Describe",
		nameDisplay: "楼层",
		required: true,
		value: ""
	}, {
		editor: "normal",
		name: "Describe",
		nameDisplay: "房号",
		required: true,
		value: ""
	}];
}]);