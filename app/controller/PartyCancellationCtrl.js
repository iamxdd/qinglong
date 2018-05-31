App.controller('PartyCancellationCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$filter',
	function($scope, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $filter) {
		$scope.list = [];
		$scope.PcService = PcService;
		$scope.searchOption = {
			name: "",
			sex: 0,
			nationality: 0,
			socialSecurity: 0,
			marital: 0,
			population: 0,
			min: "",
			max: "",
			state: 0
		};
		$scope.togglePanel = false;

		//民族类型列表
		$scope.nations = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "汉族"
		}, {
			Id: 2,
			Name: "藏族"
		}, {
			Id: 3,
			Name: "彝族"
		}, {
			Id: 4,
			Name: "其他少数民族"
		}];

		//性别列表
		$scope.sexs = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "男"
		}, {
			Id: 2,
			Name: "女"
		}];

		//社保状态列表
		$scope.socialSecuritys = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "有社保"
		}, {
			Id: 2,
			Name: "无社保"
		}];

		//婚姻状态列表
		$scope.maritals = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "未婚"
		}, {
			Id: 2,
			Name: "已婚"
		}, {
			Id: 3,
			Name: "离异"
		}, {
			Id: 4,
			Name: "丧偶"
		}];

		//人群类型列表
		$scope.populations = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "常住人口"
		}, {
			Id: 2,
			Name: "流动人口"
		}];

		//学历列表
		$scope.degrees = [{
			Id: 1,
			Name: "其他"
		}, {
			Id: 2,
			Name: "大专"
		}, {
			Id: 3,
			Name: "本科"
		}, {
			Id: 4,
			Name: "研究生"
		}, {
			Id: 5,
			Name: "博士及以上"
		}];

		//政治面貌 
		$scope.politicalStatus = [{
			Id: 1,
			Name: "中共党员"
		}, {
			Id: 2,
			Name: "中共预备党员"
		}, {
			Id: 3,
			Name: "共青团员"
		}, {
			Id: 4,
			Name: "群众"
		}, {
			Id: 5,
			Name: "民革党员"
		}, {
			Id: 6,
			Name: "民盟盟员"
		}, {
			Id: 7,
			Name: "民建会员"
		}, {
			Id: 8,
			Name: "民进会员"
		}, {
			Id: 9,
			Name: "农工党党员"
		}, {
			Id: 10,
			Name: "致公党党员"
		}, {
			Id: 11,
			Name: "九三学社社员"
		}, {
			Id: 12,
			Name: "台盟盟员"
		}, {
			Id: 13,
			Name: "无党派民主人士"
		}, {
			Id: 14,
			Name: "入党积极分子"
		}];

		//党性列表
		$scope.PartState = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "正常"
		}, {
			Id: 2,
			Name: "转出"
		}, {
			Id: 3,
			Name: "死亡"
		}, {
			Id: 4,
			Name: "自退"
		}, {
			Id: 5,
			Name: "已除名"
		}];

		$scope.fetchData = function() {
			PcService.fetchData($scope, serverUrls.communistList, $scope.searchOption);
		};

		$scope.fetchData();

		//展开，收起状态
		$scope.toggleClass = function(value) {
			return {
				'fa fa-angle-double-up': value,
				'fa fa-angle-double-down': !value,
			};
		};

		//获取年龄
		$scope.getItsAge = function(BirthDate) {
			var Age = "";
			if(BirthDate == null) {
				Age = '无';
			} else {
				var nowTime = new Date();
				Age = (nowTime - new Date(BirthDate)) / (365 * 24 * 3600000);
				if(Age < 1) {
					Age = Math.ceil(Age * 12) + "月";
				} else {
					Age = Math.floor(Age) + "岁";
				}
			}
			return Age;
		};

		$scope.fieldsList = [{
			name: "Name",
			nameDisplay: "姓名",
			editor: "normal",
			required: true,
			value: "",
			editable: true,
			originValue: ""
		}, {
			name: "State",
			nameDisplay: "党性",
			editor: "select",
			required: true,
			value: "",
			originValue: 1,
			opts: $filter("NoNullPartState")($scope.PartState)
		}, {
			name: "Remarks",
			nameDisplay: "备注",
			editor: "textarea",
			required: false,
			value: "",
			originValue: ""
		}];

		//党员注销
		$scope.editItem = function(x) {
			ngDialog.openConfirm({
				template: 'createOne',
				scope: $scope,
				controller: ["$scope", function($scope) {
					$scope.TitleText = "编辑党员";
					PcService.bindFormData(x, $scope.fieldsList);
					//编辑提交
					$scope.formSubmit = function() {
						/*var State = (PcService.getFormData($scope.fieldsList)).State;*/
						var State = $scope.fieldsList[1].value;
						var Message = "";
						if(State === 1) {
							Message = "恢复";
						} else {
							Message = "注销";
						}
						PcService.formSubmit($scope, false, $scope.fieldsList, serverUrls.upCommunist, x, {}, $rootScope.pHeader, Message);
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

App.filter("NoNullPartState", function() {
	return function(list) {
		var _array = [];
		list.map(function(v) {
			if(v.Id !== 0) {
				_array.push(v);
			}
		});
		return _array;
	};
});