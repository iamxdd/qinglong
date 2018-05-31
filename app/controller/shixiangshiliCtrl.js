App.controller('shixiangshiliCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {
		$scope.list = [];
		$scope.TitleText = "新增";
		$scope.searchOption = {
			value: ""
		};

		$scope.checkedGroup = [{
			Id: 1,
			Name: "信息上报事件",
			Active: true
		}, {
			Id: 2,
			Name: "积分改变事件",
			Active: false
		}];
		$scope.checkedItem = {
			Id: 1,
			Name: "信息上报事件",
			Active: true
		};

		//获取事项模板列表
		$scope.fetchData = function(id) {
			switch(id) {
				case 1:
					PcService.fetchData($scope, serverUrls.eventfeedbackList, $scope.searchOption);
					break;
				case 2:
					PcService.fetchData($scope, serverUrls.eventpointmodifyList, $scope.searchOption, $rootScope.gHeader);
					break;
			}
		};

		$scope.checked = function(x) {
			$scope.checkedGroup.forEach(function(item) {
				item.Active = false;
			});
			x.Active = true;
			$scope.checkedItem = x;
			$scope.fetchData(x.Id);
		};

		$scope.fetchData(1);

		//新增事项模板表单菜单列表
		$scope.fieldsList = [{
			name: "Name",
			nameDisplay: "实例名称",
			editor: "normal",
			required: true,
			value: ""
		}, {
			name: "InspectorName",
			nameDisplay: "事项模板",
			editor: "normal",
			required: true,
			value: ""

		}, {
			name: "UploadMemberNickName",
			nameDisplay: "上报人",
			editor: "normal",
			required: true,
			value: ""
		}, {
			name: "OccurTime",
			nameDisplay: "上报时间",
			editor: "normal",
			required: false,
			value: ""
		}, {
			name: "Detail",
			nameDisplay: "事项详情",
			editor: "normal",
			required: false,
			value: ""
		}, {
			name: "Description",
			nameDisplay: "描述",
			editor: "normal",
			required: true,
			value: ""
		}, {
			name: "CreatorNickName",
			nameDisplay: "创建人",
			editor: "normal",
			required: false,
			value: ""
		}, {
			name: "CreatedAt",
			nameDisplay: "创建时间",
			editor: "normal",
			required: false,
			value: ""
		}, {
			name: "LastEditorNickName",
			nameDisplay: "最后编辑人",
			editor: "normal",
			required: false,
			value: ""
		}, {
			name: "UpdatedAt",
			nameDisplay: "更新时间",
			editor: "normal",
			required: false,
			value: ""
		}];
		//
		$scope.seeItem = function(x) {
			var fieldsList = $scope.fieldsList;
			PcService.bindFormData(x, fieldsList);
			fieldsList.forEach(function(item, index) {
				item.editable = true;
			});
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.fieldsList = fieldsList;
					$scope.TitleText = "查看";

					$scope.formSubmit = function() {
						$scope.closeThisDialog();
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
		};
	}
]);