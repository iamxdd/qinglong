App.controller('minzhuxieshangCtrl', ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', '$interval', 'serverUrls', 'PcService',
	function($scope, $http, ngDialog, PagerExtends, layerAlert, $interval, serverUrls, PcService) {
		$scope.list = [];
		$scope.TitleText = "创建项目协商";
		$scope.createOne = false;
		$scope.searchOption = {};

		var initTimePicker = function() {
			var t = setInterval(function() {
				var startAt = $("#startAt");
				var endAt = $("#endAt");
				if(startAt && endAt) {
					startAt.datetimepicker({
						language: 'zh-CN',
						weekStart: 1,
						todayBtn: 1,
						autoclose: 1,
						todayHighlight: 1,
						startView: 2,
						forceParse: 0,
						format: "yyyy-mm-dd hh:ii",
						showMeridian: 1
					}).on("click", function() {
						startAt.datetimepicker();
					});

					endAt.datetimepicker({
						language: 'zh-CN',
						weekStart: 1,
						todayBtn: 1,
						autoclose: 1,
						todayHighlight: 1,
						startView: 2,
						forceParse: 0,
						format: "yyyy-mm-dd hh:ii",
						showMeridian: 1
					}).on("click", function() {
						endAt.datetimepicker();
					});
					clearInterval(t);
				}
			}, 500);

		};
		//创建协商项目
		$scope.creatOne = function() {

			ngDialog.openConfirm({
				template: 'createOne',
				controller: ["$scope", function($scope) {
					$scope.TitleText = "创建项目协商";

					$scope.negObject = {
						Title: "",
						isPublic: false,
						BallotBox: 1,
						ScoringTable: 1,
						Member: 1,
						StartAt: "2017-07-17 17:50",
						EndAt: "2017-07-17 19:50"
					};

					initTimePicker();
					//投票箱
					$scope.BallotBoxList = [{
						Id: 1,
						Name: "投票箱一"
					}, {
						Id: 2,
						Name: "投票箱二"
					}, {
						Id: 3,
						Name: "投票箱三"
					}];

					//评分表
					$scope.ScoringTableList = [{
						Id: 1,
						Name: "评分表一"
					}, {
						Id: 2,
						Name: "评分表二"
					}, {
						Id: 3,
						Name: "评分表三"
					}];
					//评分表
					$scope.MemberList = [{
						Id: 1,
						Name: "人员一"
					}, {
						Id: 2,
						Name: "人员二"
					}, {
						Id: 3,
						Name: "人员三"
					}];

					//
					$scope.createFromSubmit = function() {
						layerAlert.autoclose("保存成功!");
					};

				}],
				className: "ngdialog-theme-default",
				//closeByEscape: true,
				closeByDocument: false,
				width: 800
			});

		};

		$scope.formSubmit = function() {
			alert("新增成功！");
			ngDialog.close();
		};

		//民主协商状态
		$scope.statusList = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "状态一"
		}, {
			Id: 2,
			Name: "状态二"
		}];

		//是否公示
		$scope.publicityList = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "是"
		}, {
			Id: 2,
			Name: "否"
		}];

		//民主协商
		$scope.Consultation = {
			Status: 0,
			Publicity: 0,
			CreateAt: "2017-07-17 17:50"
		};

		$scope.screenfields = [{
			nameDisplay: "关键字",
			name: "value",
			value: "",
			editor: "normal"
		}, {
			nameDisplay: "状态",
			name: "state",
			value: $scope.statusList[0].Id,
			editor: "select",
			opts: $scope.statusList
		}, {
			nameDisplay: "是否公示",
			name: "isPublicityString",
			value: $scope.publicityList[0].Id,
			editor: "select",
			opts: $scope.publicityList
		}, {
			nameDisplay: "创建时间",
			name: "timeFrom1970Ticks",
			value1: "2017-06-20 00:00",
			value2: "2017-07-20 00:00",
			editor: "double-datePick"
		}];

		//查询数据
		$scope.fetchData = function() {
			PcService.fetchData($scope, serverUrls.transacationList, $scope.searchOption);
		};

		$scope.fetchData();

		//民主协商范围
		$scope.ConsultationRange = [{
			Id: 1,
			Name: "范围一"
		}, {
			Id: 2,
			Name: "范围二"
		}];

		//民主协商表单菜单
		$scope.fieldsList = [{
			name: "Name",
			nameDisplay: "议题",
			editor: "normal",
			required: true
		}, {
			name: "Describe",
			nameDisplay: "议事时间",
			editor: "normal",
			required: true,
			value: ""
		}, {
			name: "Describe",
			nameDisplay: "议事地点",
			editor: "select",
			required: true,
			value: $scope.ConsultationRange[0].Id,
			opts: $scope.ConsultationRange
		}, {
			name: "Describe",
			nameDisplay: "描述",
			editor: "textarea",
			required: true,
			value: ""
		}, {
			name: "Describe",
			nameDisplay: "投票箱",
			editor: "normal",
			required: true,
			value: ""
		}, {
			name: "Describe",
			nameDisplay: "评分表",
			editor: "normal",
			required: true,
			value: ""
		}];

		//项目概要
		$scope.seeItem = function(x) {

			ngDialog.openConfirm({
				template: 'createOne',
				controller: ["$scope", function($scope) {
					$scope.TitleText = "项目概要";
					initTimePicker();

					$scope.negObject = {
						isPublic: false,
						BallotBox: 1,
						ScoringTable: 1,
						Member: 1,
						StartAt: "2017-07-17 17:50",
						EndAt: "2017-07-17 19:50"
					};

					$scope.editable = false;

					//投票箱
					$scope.BallotBoxList = [{
						Id: 1,
						Name: "投票箱一"
					}, {
						Id: 2,
						Name: "投票箱二"
					}, {
						Id: 3,
						Name: "投票箱三"
					}];

					//评分表
					$scope.ScoringTableList = [{
						Id: 1,
						Name: "评分表一"
					}, {
						Id: 2,
						Name: "评分表二"
					}, {
						Id: 3,
						Name: "评分表三"
					}];
					//评分表
					$scope.MemberList = [{
						Id: 1,
						Name: "人员一"
					}, {
						Id: 2,
						Name: "人员二"
					}, {
						Id: 3,
						Name: "人员三"
					}];

					//
					$scope.createFromSubmit = function() {
						layerAlert.autoclose("保存成功!");
					};
					$scope.formSubmit = function() {
						ngDialog.close();
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 800
			});

		};

		//议事过程
		$scope.detailItem = function(x) {
			ngDialog.openConfirm({
				template: 'detailOne',
				controller: ["$scope", function($scope) {
					$scope.TitleText = "议事过程";
					$scope.wordsList = [{}, {}, {}, {}, {}];

					//删除
					$scope.delete_Item = function(x) {
						layerAlert.autoclose("删除成功！");
						$scope.wordsList.splice(x.$index, 1);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 800
			});
		};

		//议事结果
		$scope.resultlItem = function(x) {
			ngDialog.openConfirm({
				template: 'resultOne',
				controller: ["$scope", function($scope) {
					$scope.TitleText = "议事结果";

					//删除
					$scope.delete_Item = function(x) {
						layerAlert.autoclose("删除成功！");
						$scope.wordsList.splice(x.$index, 1);
					};

					//投票统计图表
					$scope.barData = [{
						"label": "投票结果(%)",
						"color": "#9cd159",
						"data": [
							["赞成", 88],
							["反对", 12]
						]
					}];
					$scope.barOptions = {
						series: {
							bars: {
								align: 'center',
								lineWidth: 0,
								show: true,
								barWidth: 0.6,
								fill: 0.9
							}
						},
						grid: {
							borderColor: '#eee',
							borderWidth: 1,
							hoverable: true,
							backgroundColor: '#fcfcfc'
						},
						tooltip: true,
						tooltipOpts: {
							content: function(label, x, y) {
								return x + ' : ' + y;
							}
						},
						xaxis: {
							tickColor: '#fcfcfc',
							mode: 'categories'
						},
						yaxis: {
							position: ($scope.app.layout.isRTL ? 'right' : 'left'),
							tickColor: '#eee'
						},
						shadowSize: 0
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 700
			});
		};

		//民主协商子议题
		$scope.subIssuesItem = function(x) {

			var seeVoteAction = function(a) {
				ngDialog.openConfirm({
					template: 'voteAction',
					controller: ["$scope", function($scope) {
						$scope.TitleText = "查看投票";
						$scope.voteList = [{}, {}, {}, {}];

						//投票统计图表
						$scope.barData = [{
							"label": "投票结果(%)",
							"color": "#9cd159",
							"data": [
								["赞成", 88],
								["反对", 12]
							]
						}];
						$scope.barOptions = {
							series: {
								bars: {
									align: 'center',
									lineWidth: 0,
									show: true,
									barWidth: 0.6,
									fill: 0.9
								}
							},
							grid: {
								borderColor: '#eee',
								borderWidth: 1,
								hoverable: true,
								backgroundColor: '#fcfcfc'
							},
							tooltip: true,
							tooltipOpts: {
								content: function(label, x, y) {
									return x + ' : ' + y;
								}
							},
							xaxis: {
								tickColor: '#fcfcfc',
								mode: 'categories'
							},
							yaxis: {
								position: 'left',
								tickColor: '#eee'
							},
							shadowSize: 0
						};
					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 700
				});
			};

			var seeScoreAction = function(a) {
				ngDialog.openConfirm({
					template: 'scoreAction',
					controller: ["$scope", function($scope) {
						$scope.TitleText = "查看评分";

						$scope.scoreList = [{}, {}, {}, {}, {}, {}];

					}],
					className: 'ngdialog-theme-default',
					//closeByEscape: true,
					closeByDocument: false,
					width: 700
				});
			};

			ngDialog.openConfirm({
				template: 'subIssues',
				controller: ["$scope", function($scope) {
					$scope.TitleText = "子议题";
					$scope.subIssuesList = [{}, {}, {}, {}];

					//查看投票
					$scope.seeVote = function(a) {
						//layerAlert.autoclose("查看投票！");
						seeVoteAction(a);
					};

					//查看投票
					$scope.seeScore = function(a) {
						//layerAlert.autoclose("查看评分！");
						seeScoreAction(a);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 700
			});
		};

		//时间插件
		$("#datetimeStart").datetimepicker({
			language: 'zh-CN',
			weekStart: 1,
			todayBtn: 1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			forceParse: 0,
			format: "yyyy-mm-dd hh:ii",
			showMeridian: 1
		}).on("click", function(ev) {
			$("#datetimeStart").datetimepicker();
		});
		$("#datetimeEnd").datetimepicker({
			language: 'zh-CN',
			weekStart: 1,
			todayBtn: 1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			forceParse: 0,
			format: "yyyy-mm-dd hh:ii",
			showMeridian: 1
		}).on("click", function(ev) {
			$("#datetimeEnd").datetimepicker();
		});

	}
]);