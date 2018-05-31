App.controller('workGroupsCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q) {
		$scope.list = [];
		$scope.TitleText = "新增";
		$scope.searchOption = {
			value: ""
		};

		$scope.fieldsList = [{
			name: "Name",
			nameDisplay: "名称",
			editor: "normal",
			required: true,
			value: "",
			originValue: ""
		}, {
			name: "Description",
			nameDisplay: "描述",
			editor: "normal",
			required: false,
			value: "",
			originValue: ""
		}, {
			name: "Note",
			nameDisplay: "备注",
			editor: "normal",
			required: false,
			value: "",
			originValue: ""
		}];

		//获取所有用户列表
		$scope.fetchData = function() {
			PcService.fetchData($scope, serverUrls.workFlowgroups, $scope.searchOption);
		};

		$scope.fetchData();

		//新增工作组
		$scope.creatOne = function() {
			var fieldsList = $scope.fieldsList;
			var fetchData = $scope.fetchData;
			PcService.initFormList(fieldsList);
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.fetchData = fetchData;
					$scope.fieldsList = fieldsList;
					$scope.TitleText = "新增工作组";

					//提交修改
					$scope.formSubmit = function() {
						PcService.formSubmit($scope, true, $scope.fieldsList, serverUrls.upWorkflowgroup, null, null, $rootScope.pHeader);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});
		};

		//编辑工作组
		$scope.editItem = function(x) {
			var fieldsList = $scope.fieldsList;
			var fetchData = $scope.fetchData;
			PcService.bindFormData(x, fieldsList);
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.fetchData = fetchData;
					$scope.fieldsList = fieldsList;
					$scope.TitleText = "编辑工作组";

					//提交修改
					$scope.formSubmit = function() {
						PcService.formSubmit($scope, false, $scope.fieldsList, serverUrls.upWorkflowgroup, x, null, $rootScope.pHeader);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});
		};

		//删除工作组
		$scope.deleteItem = function(x) {
			layerAlert.checkone("删除操作", function() {
				PcService.deleteItem($scope, serverUrls.deleteWorkflowgroup, x, $rootScope.pHeader);
			}, function() {}, "确定", "取消", true, true, "确定要删除吗？");

		};

		var getWorkGroupMembers = function($scope, id) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.workflowGroupmembersbygid + "?gid=" + id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.Members = response.Content;
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var newMemberFormSubmit = function($scope, url, fun1, param, headers) {
			var data = PcService.getFormData($scope.fieldsList);
			/*$scope.ResidentStatus.forEach(function(item, index) {
				if(item)
			});*/
			data = $.extend(true, data, param);
			$scope.ngDialogPromise = $http({
				headers: headers,
				method: 'post',
				url: url,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					fun1();
					$scope.closeThisDialog();
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var getResidentStatus = function($scope, value) {
			if(!value) {
				return;
			}
			$scope.getResidentPromise = $http({
				method: 'get',
				url: serverUrls.negotiationList + "?value=" + value
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.ResidentStatus = response.Content;
					if($scope.ResidentStatus && $scope.ResidentStatus.length > 0) {
						$scope.ResidentStatus.forEach(function(item, index) {
							item.Id = item.IdentityCode;
						});
						$scope.fieldsList[0].opts = $scope.ResidentStatus;
						$scope.fieldsList[0].value = $scope.ResidentStatus[0] ? $scope.ResidentStatus[0].Id : "";
					} else {
						layerAlert.autoclose("当前关键字没有相关居民，请重新搜索！");
					}

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});

		};

		//新增组成员
		var createMember = function($scope, id) {
			var getWorkGroupMembers = function() {
				$scope.getWorkGroupMembers($scope, id);
			};

			var newMemberfieldsList = [{
				name: "MemberId",
				nameDisplay: "选择成员",
				editor: "select",
				required: true,
				value: 0,
				originValue: "",
				opts: [{
					Id: 0,
					Name: "请选择"
				}]
			}];
			ngDialog.openConfirm({
				template: 'createOne',
				controller: ['$scope', function($scope) {
					$scope.fieldsList = newMemberfieldsList;
					$scope.TitleText = "新增组成员";
					$scope.Resident = {};

					$scope.formSubmit = function() {
						var param = {
							GroupId: id
						};
						newMemberFormSubmit($scope, serverUrls.inWorkflowgroupmember, getWorkGroupMembers, param, $rootScope.pHeader);
					};

					$scope.getResidentStatus = function() {
						getResidentStatus($scope, $scope.Resident.value);
					};

				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});
			/*}, function(error) {
				console.log("Fail: " + error);
			});*/

		};

		var deleteMember = function($scope, x, id) {
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: 'delete',
				url: serverUrls.deleteWorkflowgroupmember + "?id=" + x.Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("删除操作成功！");
					$scope.getWorkGroupMembers($scope, id);

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//成员管理
		$scope.memberItem = function(x) {
			var fieldsList = $scope.fieldsList;
			var fetchData = $scope.fetchData;
			PcService.bindFormData(x, fieldsList);
			ngDialog.openConfirm({
				template: 'memberManage',
				controller: ['$scope', function($scope) {
					$scope.fetchData = fetchData;
					$scope.fieldsList = fieldsList;
					$scope.TitleText = "成员管理";
					$scope.Members = [];
					$scope.memberList = [];

					$scope.getWorkGroupMembers = function($scope, id) {
						getWorkGroupMembers($scope, id);
					};
					if($scope.Members.length === 0) {
						$scope.getWorkGroupMembers($scope, x.Id);
					}

					$scope.createMember = function() {
						createMember($scope, x.Id);
					};

					$scope.deleteMember = function(y) {
						deleteMember($scope, y, x.Id);
					};

				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});
		};
	}
]);