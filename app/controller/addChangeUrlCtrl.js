App.controller('addChangeUrlCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {

		$scope.myEditor = "神马都是浮云";
		$scope.getValue = function() {
			alert($scope.myEditor);
		};
		$scope.fieldsList = [{
			name: "NewUrl",
			nameDisplay: "原地址",
			editor: "normal",
			required: true,
			value: ""
		}, {
			name: "OldUrl",
			nameDisplay: "中转地址",
			editor: "normal",
			required: true,
			value: ""
		}, {
			name: "Name",
			nameDisplay: "名称",
			editor: "normal",
			required: false,
			value: ""
		}, {
			name: "Descript",
			nameDisplay: "描述",
			editor: "normal",
			required: false,
			value: ""
		}];
		var url = "http://192.168.1.101:8026/api/addchangeurl";
		$scope.formSubmit = function() {
			PcService.formSubmit($scope, true, $scope.fieldsList, url);
		};

		$scope.addUsing = function() {
			ngDialog.openConfirm({
				template: 'editList',
				controller: ["$scope", function($scope) {
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
							$scope.options.push($scope.option);
							$scope.fieldsLists = [
								[{
									name: "Name",
									nameDisplay: "基金使用",
									editor: "select",
									opts: $scope.options[0],
									required: false,
									value: $scope.options[0][0].Id
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
								newArray.push({
									Id: item.value,
									Name: getNameById(item.value)
								});
							});
						});
						$scope.valueArray = newArray;
						return newArray;
					};

					//
					var deffrentOptions = function($scope) {
						var hasCheckedValues = getCheckdArray($scope.fieldsLists);
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
							$scope.fieldsLists[n][0].opts = $scope.options[n];
						});
					};

					$scope.addItem = function(index) {
						if(index >= $scope.option.length) {
							return;
						}
						var checkdArray = getCheckdArray($scope.fieldsLists);
						$scope.options[index] = initArray.concat(angular.copy($scope.option));;
						var _initArray = [{
							name: "Name",
							nameDisplay: "基金使用",
							editor: "select",
							opts: $scope.options[index],
							required: false,
							value: 0
						}];
						$scope.fieldsLists[index] = _initArray;
						deffrentOptions($scope);
					};

					$scope.myChange = function() {
						deffrentOptions($scope);
					};

					$scope.isShow = function(fields) {
						//console.log(fields);
						return fields.$index !== 0;
					};

					$scope.deleteItem = function(fields) {
						var _index = 0;
						$scope.fieldsLists.forEach(function(item, index) {
							if(item === fields) {
								_index = index;
							}
						});
						$scope.options.splice(_index, 1);
						$scope.fieldsLists.splice(_index, 1);
						deffrentOptions($scope);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 1100,
			});
		};

		$scope.kindEditor = function() {
			ngDialog.openConfirm({
				template: 'kindEditor',
				scope: $scope,
				controller: ["$scope", function($scope) {
					$scope.fieldsList = [{
						name: "Name",
						nameDisplay: "名称",
						editor: "normal"
					}];
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 1100,
			});
		};

	}
]);