App.controller('scvehicleInfoCtrl', ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$filter',
	function($scope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $filter) {
		$scope.list = [];
		$scope.navList = [{
			Id: 1,
			Name: "按院落统计",
			Checked: true
		}];

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
					seriesNames = ["数量"];
					list.forEach(function(item, index) {
						seriesArray[index] = item.Count;
						xAxisArray[index] = item.Name;
					});
					break;
				case 2:
					seriesNames = ["入住率"];
					list.forEach(function(item, index) {
						seriesArray[index] = item.OccupancyRate;
						xAxisArray[index] = item.Name;
					});
					break;
				case 3:
					seriesNames = ["户平均数"];
					list.forEach(function(item, index) {
						seriesArray[index] = item.OccupancyRate;
						xAxisArray[index] = item.Name;
					});
					break;
				default:
					break;
			}

			if(type === 2) {
				seriesArray.forEach(function(item, index) {
					item = Number(item);
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
						interval: 0
					}
				}],
				yAxis: [{
					type: 'value'
				}],
				series: []
			};

			option.series.push({
				name: seriesNames,
				type: 'bar',
				data: seriesArray
			});

			myChart.setOption(option, true);
		};

		//获取数据
		$scope.fetchData = function() {
			var param = {
				type: $scope.selectedItem.Id
			};
			var url = serverUrls.vehiclestatistic;
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
					$scope.list = response.Content;
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
	}
]);