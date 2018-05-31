App.controller('scInfoUploadCtrl', ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$filter',
	function($scope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $filter) {
		$scope.list = [];
		$scope.navList = [{
			Id: 1,
			Name: "按类型统计",
			Checked: true
		}, {
			Id: 2,
			Name: "按位置统计",
			Checked: false
		}, {
			Id: 3,
			Name: "按上报人统计",
			Checked: false
		}, {
			Id: 4,
			Name: "按核实人统计",
			Checked: false
		}];

		$scope.States = [{
			Id: 1,
			Name: "按年查询"
		}, {
			Id: 2,
			Name: "按月查询"
		}];

		$scope.titles = [{
			Id: 1,
			Name: "流动人口"
		}, {
			Id: 2,
			Name: "环境卫生"
		}, {
			Id: 3,
			Name: "纠纷调解"
		}, {
			Id: 4,
			Name: "重点人群"
		}];

		$scope.searchOption = {
			state: 1,
			startTime: $filter('date')(new Date(), "yyyy-MM-dd"),
			endTime: $filter('date')(new Date(), "yyyy-MM-dd")
		};

		$scope.selectedItem = $scope.navList[0];
		var myEcharts = document.getElementById("myEcharts");
		var myChart = echarts.init(myEcharts);

		//展示图标
		var showEcharts = function(type, list) {

			var xAxisArray = []; //横坐标数组
			var seriesArray = [], //相对应的zhi
				seriesNames = [];

			switch(type) {
				case 1:
					list.forEach(function(item, index) {
						item.DTODateAt.forEach(function(_item, _index) {
							if(index === 0) {
								seriesArray.push([]);
								seriesNames.push(_item.DateAt);
							}
						});
						item.DTODateAt.forEach(function(_item, _index) {
							seriesArray[_index].push(_item.Count);
						});
						xAxisArray[index] = item.Type;
					});

					break;
				case 2:
					list.forEach(function(item, index) {
						item.DTODateAt.forEach(function(_item, _index) {
							if(index === 0) {
								seriesArray.push([]);
								seriesNames.push(_item.DateAt);
							}

						});
						item.DTODateAt.forEach(function(_item, _index) {
							seriesArray[_index].push(_item.Count);
						});
						xAxisArray[index] = item.Name;
					});

					break;
				case 3:
					list.forEach(function(item, index) {
						item.DTODateAt.forEach(function(_item, _index) {
							if(index === 0) {
								seriesArray.push([]);
								seriesNames.push(_item.DateAt);
							}

						});
						item.DTODateAt.forEach(function(_item, _index) {
							seriesArray[_index].push(_item.Count);
						});
						xAxisArray[index] = item.Name;
					});

					break;
				case 4:
					list.forEach(function(item, index) {
						item.DTODateAt.forEach(function(_item, _index) {
							if(index === 0) {
								seriesArray.push([]);
								seriesNames.push(_item.DateAt);
							}

						});
						item.DTODateAt.forEach(function(_item, _index) {
							seriesArray[_index].push(_item.Count);
						});
						xAxisArray[index] = item.Name;
					});

					break;
				default:
					break;
			}
			if(type === 1) {
				xAxisArray.forEach(function(item, index) {
					xAxisArray[index] = PcService.numberToText(xAxisArray[index], $scope.titles);
				});
			}

			$scope.xAxisArray = xAxisArray;
			$scope.seriesArray = seriesArray;
			$scope.seriesNames = seriesNames;

			var option = {
				title: {
					text: '基础资源库统计',
					subtext: '重点人群、关注人群'
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					left: '1%',
					right: '1%',
					bottom: '5%',
					containLabel: true
				},
				legend: {
					data: []
				},
				toolbox: {
					feature: {
						saveAsImage: {
							show: true
						},
						magicType: {
							show: true,
							type: ['line', 'bar']
						}
					}
				},
				calculable: true,
				xAxis: [{
					type: 'category',
					data: xAxisArray,
					"axisLabel": {
						interval: 0,
						formatter: function (name) {
				        return echarts.format.truncateText(name, 40, '14px Microsoft Yahei', '…');
				     }
					},

				}],
				yAxis: [{
					type: 'value'
				}],
				series: []
			};

			//var _legend = seriesNames[index];
			seriesNames.forEach(function(item, index) {
				var itemCell = {
					name: seriesNames[index],
					type: 'bar',
					data: seriesArray[index]
				};
				option.series.push(itemCell);
			});

			//option.legend.data.push(_legend);

			myChart.setOption(option, true);
		};

		//获取数据
		$scope.fetchData = function() {
			var param = {
				type: $scope.selectedItem.Id
			};
			param = $.extend(true, param, $scope.searchOption);
			var url = serverUrls.infostatistic;
			var completionUrl = "?";
			if(param) {
				for(var x in param) {
					completionUrl += x + "=" + param[x] + "&";
				}
				url += completionUrl.substring(0, completionUrl.length - 1);
			}

			$scope.listBusyPromise = $http({
				method: "get",
				url: url
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.list = response.Content.filter(function(v) {
						return v.Name!==null;
					});
					showEcharts($scope.selectedItem.Id, $scope.list);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});

		};

		$scope.fetchData();

		$scope.setState = function(value) {
			$scope.fetchData();
		};

		//选择操作
		$scope.CheckItem = function(x) {
			$scope.navList.forEach(function(item, index) {
				item.Checked = false;
				if(item.Id === x.Id) {
					item.Checked = true;
				}
			});
			$scope.selectedItem = x;
			$scope.fetchData();
		};

		$("#datetimeStart").datetimepicker({
			language: 'zh-CN',
			weekStart: 1,
			todayBtn: 1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			minView: 4,
			maxView: 4,
			forceParse: 0,
			format: "yyyy-mm-dd",
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
			minView: 4,
			maxView: 4,
			forceParse: 0,
			format: "yyyy-mm-dd",
			showMeridian: 1
		}).on("click", function(ev) {
			$("#datetimeEnd").datetimepicker();
		});
	}
]);