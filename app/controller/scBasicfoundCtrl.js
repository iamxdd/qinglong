App.controller('scBasicfoundCtrl', ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {
		$scope.list = [];
		$scope.choseId = 1;
		$scope.navList = [{
			Id: 1,
			Name: "按类型统计",
			Checked: true
		}, {
			Id: 2,
			Name: "按年龄段统计",
			Checked: false
		}, {
			Id: 3,
			Name: "按院落统计",
			Checked: false
		}];

		$scope.selectedItem = $scope.navList[0];
		var myEcharts = document.getElementById("myEcharts");
		var myChart = echarts.init(myEcharts);

		//展示图标
		var showEcharts = function(type, list) {

			var xAxisArray = [];
			var seriesArray = [],
				seriesNames = [];

			switch(type) {
				case 1:
					if($scope.choseId === 1) {
						xAxisArray = ["孤寡老人", "残疾人", "高龄老人", "低保户", "失独老人", "吸毒人群", "劳改刑满释放人员", "社区矫正人员", "其他人员"];
						list.forEach(function(item, index) {
							seriesArray[index] = (item.PopulationType).split(",");
							seriesNames[index] = item.Name;
						});
					} else if($scope.choseId === 2) {
						xAxisArray = ["社区矫正人员", "刑释解教人员", "吸毒人员", " 有肇事倾向精神病人", "艾滋病人", "流浪乞讨人员", "闲散青少年"];
						list.forEach(function(item, index) {
							seriesArray[index] = (item.FocusCrowd).split(",");
							seriesNames[index] = item.Name;
						});
					}
					break;
				case 2:
					xAxisArray = ["0-18", "18-30", "30-45", "45-60", "60+", "其他"];
					list.forEach(function(item, index) {
						seriesArray[index] = [item.Nonage, item.Youth, item.Middle, item.Presby, item.OldAge, item.Other];
						seriesNames[index] = item.Name;
					});
					break;
				case 3:
					xAxisArray = ["数量"];
					list.forEach(function(item, index) {
						seriesArray[index] = [item.Count];
						seriesNames[index] = item.Name;
					});
					break;
				default:
					break;
			}
			$scope.xAxisArray = xAxisArray;
			$scope.seriesArray = seriesArray;
			$scope.seriesNames = seriesNames;

			var option = {
				title: {
					text: '居民信息统计'
					//subtext: '重点人群、关注人群'
				},
				grid: {
					left: '1%',
					right: '1%',
					bottom: '5%',
					containLabel: true
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
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
						interval: 0
					}
				}],
				yAxis: [{
					type: 'value'
				}],
				series: []
			};
			seriesArray.forEach(function(item, index) {
				var _legend = seriesNames[index];
				var itemCell = {
					name: seriesNames[index],
					type: 'bar',
					data: seriesArray[index]
				};

				option.series.push(itemCell);
				option.legend.data.push(_legend);
			});
			myChart.setOption(option, true);
		};

		//重点人群，关注人群切换
		$scope.choseCell = function(value) {
			$scope.choseId = value;
			showEcharts($scope.selectedItem.Id, $scope.list);
		};

		//获取数据
		$scope.fetchData = function() {
			var params = {};
			params.type = $scope.selectedItem.Id;
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.residentstatistic + "?type=" + params.type
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.list = response.Content;
					showEcharts($scope.selectedItem.Id, $scope.list);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});

		};

		$scope.fetchData();

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

	}
]);