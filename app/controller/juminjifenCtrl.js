/*App.controller('juminjifenCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {
		$scope.list = [];
		$scope.TitleText = "新增初始积分";
		$scope.searchOption = {
			name: "",
			pointTypeCode: 1
		};

		//调整类表列表
		$scope.adjustTypes = [{
			Id: 1,
			Name: "增加"
		}, {
			Id: 2,
			Name: "减少"
		}];

		//居民积分表单菜单
		$scope.fieldsList = [
			[{
				name: "CreatedAt",
				nameDisplay: "创建时间",
				editor: "normal",
				required: true,
				value: "",
				editable: true
			}, {
				name: "Description",
				nameDisplay: "描述",
				editor: "normal",
				required: true,
				value: "",
				editable: true
			}, {
				editor: "normal",
				name: "PointsNum",
				nameDisplay: "积分数",
				required: true,
				value: "",
				editable: true
			}, {
				editor: "normal",
				name: "typeName",
				nameDisplay: "类型",
				required: true,
				value: "",
				editable: true
			}, {
				editor: "normal",
				name: "ValidityAt",
				nameDisplay: "有效时间",
				required: true,
				value: "",
				editable: true
			}],
			[{
				name: "type",
				nameDisplay: "调整类别",
				editor: "radio",
				required: true,
				value: $scope.adjustTypes[0].Id,
				opts: $scope.adjustTypes
			}, {
				name: "num",
				nameDisplay: "调整分值",
				editor: "normal",
				required: false,
				value: ""
			}, {
				name: "description",
				nameDisplay: "调整原因",
				editor: "textarea",
				required: false,
				value: ""
			}]
		];

		//居民积分筛选
		$scope.scores = {
			Type: 0,
			Keys: ""
		};

		var bindFormData = function(x, fieldsList) {
			fieldsList.forEach(function(item, idnex) {
				item.value = x[item.name];
			});
		};
		var openDialog = function(xDetail) {
			ngDialog.openConfirm({
				template: 'detailOne',
				controller: ['$scope', function($scope) {
					$scope.fieldsList = xDetail;
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
		};

		var getDetail = function($scope, x) {
			var params = {
				length: 8,
				currentPage: 1,
				memberid: x.Account.IdentityCode
			};
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.getPointrecordbymemberid,
				params: params,
				success: function(response) {
					$scope.fieldsList = response;
				},
				error: function(error) {
					layerAlert.autoclose(error);
				}
			});

		};

		//积分明细
		$scope.detailItem = function(x) {
			var fieldsList = $scope.fieldsList;
			ngDialog.openConfirm({
				template: 'detailOne',
				controller: ['$scope', function($scope) {
					$scope.fieldsList = [];
					getDetail($scope, x);
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
		};

		//查询数据
		$scope.fetchData = function() {
			PcService.fetchData($scope, serverUrls.getUserpointList, $scope.searchOption);
		};

		$scope.fetchData();

		//方法：获取表单提交数据
		var getSubmitData = function(_array) {
			var data = {};
			if(_array && _array.length > 0) {
				_array.forEach(function(item, index) {
					data[item.name] = item.value;
				});
			}
			return data;
		};

		//调整积分提交
		var adustFormSubmit = function(x, fieldsList) {
			var data = getSubmitData(fieldsList[1]);
			data.memberid = x.Account.IdentityCode;
			data.userType = 1;
			data.pointTypeCode = 1;
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: "put",
				url: serverUrls.changePoint,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.fetchData();
					layerAlert.autoclose("积分调整成功!");
					setTimeout(function() {
						ngDialog.closeAll();
					}, 1600);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(err) {
				layerAlert.autoclose(err.Message || err + "", null, 10000);
			});
		};

		//调整积分
		$scope.editItem = function(x) {
			var fieldsList = $scope.fieldsList;
			$scope.fieldsList[1][1].value='';
			ngDialog.openConfirm({
				template: 'adjustment',
				controller: ["$scope", function($scope) {
					$scope.fieldsList = fieldsList;
					//调整积分提交
					$scope.adustFormSubmit = function() {
						adustFormSubmit(x, fieldsList);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false
			});
		};
	}
]);*/
App.controller('juminjifenCtrl', ['$scope', '$rootScope','$state', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $rootScope,$state, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {
		$scope.list = [];
		$scope.TitleText = "新增初始积分";
		$scope.searchOption = {
			name: "",
			openState: 1
		};

		//调整类表列表
		$scope.adjustTypes = [{
			Id: 1,
			Name: "增加"
		}, {
			Id: 2,
			Name: "减少"
		}];

		//居民积分表单菜单
		$scope.fieldsList = [
			[{
				name: "CreatedAt",
				nameDisplay: "创建时间",
				editor: "normal",
				required: true,
				value: "",
				editable: true
			}, {
				name: "Description",
				nameDisplay: "描述",
				editor: "normal",
				required: true,
				value: "",
				editable: true
			}, {
				editor: "normal",
				name: "PointsNum",
				nameDisplay: "积分数",
				required: true,
				value: "",
				editable: true
			}, {
				editor: "normal",
				name: "typeName",
				nameDisplay: "类型",
				required: true,
				value: "",
				editable: true
			}, {
				editor: "normal",
				name: "ValidityAt",
				nameDisplay: "有效时间",
				required: true,
				value: "",
				editable: true
			}],
			[{
				name: "Type",
				nameDisplay: "调整类别",
				editor: "radio",
				required: true,
				value: $scope.adjustTypes[0].Id,
				opts: $scope.adjustTypes
			}, {
				name: "Number",
				nameDisplay: "调整分值",
				editor: "normal",
				required: false,
				value: ""
			}, {
				name: "Reason",
				nameDisplay: "调整原因",
				editor: "textarea",
				required: false,
				value: ""
			}]
		];

		//居民积分筛选
		$scope.scores = {
			Type: 0,
			Keys: ""
		};

		var bindFormData = function(x, fieldsList) {
			fieldsList.forEach(function(item, idnex) {
				item.value = x[item.name];
			});
		};
		var openDialog = function(xDetail) {
			ngDialog.openConfirm({
				template: 'detailOne',
				controller: ['$scope', function($scope) {
					$scope.fieldsList = xDetail;
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
		};

		var getDetail = function($scope, x) {
			var params = {
				length: 8,
				currentPage: 1,
				mid: x.User.IdentityCode
			};
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.pointreocrdhistoryList,
				params: params,
				success: function(response) {
					$scope.fieldsList = response;
					$scope.fieldsList.forEach(function(item, index) {
						item.Number = item.Number > 0 ? "+" + item.Number : item.Number;
					});
				},
				error: function(error) {
					layerAlert.autoclose(error);
				}
			});

		};

		//积分明细
		$scope.detailItem = function(x) {
			var fieldsList = $scope.fieldsList;
			ngDialog.openConfirm({
				template: 'detailOne',
				controller: ['$scope', function($scope) {
					$scope.fieldsList = [];
					getDetail($scope, x);
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 850
			});
		};

		//查询数据
		$scope.fetchData = function() {
			PcService.fetchData($scope, serverUrls.pointsummaryList, $scope.searchOption);
		};

		$scope.fetchData();
		
		// 配置积分分类
		$scope.configPointClassify = function() {
			$state.go("app.pointClassify");
		}

		//方法：获取表单提交数据
		var getSubmitData = function(_array) {
			var data = {};
			if(_array && _array.length > 0) {
				_array.forEach(function(item, index) {
					data[item.name] = item.value;
				});
			}
			return data;
		};

		//调整积分提交
		var adustFormSubmit = function(x, fieldsList) {
			var _data = getSubmitData(fieldsList[1]);
			if(_data.Type === "2") {
				_data.Number = 0 - _data.Number;
			}
			var data = {
				User: {
					IdentityCode: x.User.IdentityCode,
				},
				Number: _data.Number,
				Reason: _data.Reason,
				Operator: {
					IdentityCode: x.User.IdentityCode,
				}
			};
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: "post",
				url: serverUrls.addPointadjustment,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.fetchData();
					layerAlert.autoclose("积分调整成功!");
					setTimeout(function() {
						ngDialog.closeAll();
					}, 1600);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(err) {
				layerAlert.autoclose(err.Message || err + "", null, 10000);
			});
		};

		//调整积分
		$scope.editItem = function(x) {
			var fieldsList = $scope.fieldsList;
			$scope.fieldsList[1][1].value = '';
			ngDialog.openConfirm({
				template: 'adjustment',
				controller: ["$scope", function($scope) {
					$scope.fieldsList = fieldsList;
					//调整积分提交
					$scope.adustFormSubmit = function() {
						adustFormSubmit(x, fieldsList);
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