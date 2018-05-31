App.controller("changzhurenkouCtrl", ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', function($scope, $http, ngDialog, PagerExtends, layerAlert) {
	$scope.list = [{}, {}, {}];

	//新增常住人口
	$scope.creatOne = function() {
		ngDialog.openConfirm({
			template: 'createOne',
			controller: 'changzhurenkouCtrl',
			className: 'ngdialog-theme-default',
			//closeByEscape: true,
			closeByDocument: false
		});
	};

	//新增常住人口表单菜单
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
		name: "Describe",
		nameDisplay: "楼层",
		editor: "select",
		required: true,
		value: ""
	}, {
		name: "Describe",
		nameDisplay: "房号",
		editor: "select",
		required: true,
		value: ""
	}];

}]);