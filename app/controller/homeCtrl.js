App.controller('homeCtrl', ['$scope', '$rootScope', '$http', 'ngDialog', 'serverUrls', 'layerAlert', 'PcService', '$filter',
	function($scope, $rootScope, $http, ngDialog, serverUrls, layerAlert, PcService, $filter) {	
		//创建和初始化地图函数：
		var map;

		function createMap() {
			map = new BMap.Map("map");
			map.centerAndZoom(new BMap.Point(104.120987, 30.704218), 19);
		}

		function setMapEvent() {
			map.enableScrollWheelZoom();
			map.enableKeyboard();
			map.enableDragging();
			map.enableDoubleClickZoom();
		}

		function addClickHandler(target, window) {
			target.addEventListener("click", function() {
				target.openInfoWindow(window);
			});
		}

		function addMapOverlay() {}
		//向地图添加控件
		function addMapControl() {
			var scaleControl = new BMap.ScaleControl({
				anchor: BMAP_ANCHOR_BOTTOM_LEFT
			});
			scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
			map.addControl(scaleControl);
			var navControl = new BMap.NavigationControl({
				anchor: BMAP_ANCHOR_TOP_LEFT,
				type: 1
			});
			map.addControl(navControl);
			var overviewControl = new BMap.OverviewMapControl({
				anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
				isOpen: false
			});
			map.addControl(overviewControl);
		}

		function initMap() {
			createMap(); //创建地图
			setMapEvent(); //设置地图事件
			addMapControl(); //向地图添加控件
			addMapOverlay(); //向地图添加覆盖物
		}
		initMap();

		$scope.listData = []; //待办数据
		$scope.listIntegerData = []; //积分数据
		$scope.Obtain = 0; //首页积分发放数据
		$scope.sumPeple = 0; //首页居民信息总数
		$scope.sumMatterCount = 0; //首页自治事项总条数
		$rootScope.integralAarr = [];
		$rootScope.disposematterRate = "0"; //首页上报事件处理率百分数
		$rootScope.disposematterDone = 0; //本月处理事项
		$scope.PcService = PcService;
		//获取首页我的待办事项
		$scope.scheduleData = function() {
			var param = {
				currentPage: 1,
				length: 9,
				verify: false,
				history: false
			};
			var url = serverUrls.myWorkers;

			//get请求带参数的处理
			var completionUrl = "?";
			if(param) {
				for(var x in param) {
					completionUrl += x + "=" + param[x] + "&";
				}
				url += completionUrl.substring(0, completionUrl.length - 1);
			}
			$scope.todoListPromise = $http({
				headers: $rootScope.gHeader,
				method: "get",
				url: url
			}).success(function(response) {
				var Code = response.State.Code;
				if(Code === 0) {
					$scope.listData = response.Content.pagelist;

				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		$scope.scheduleData();

		//获取首页积分发放数 obtainpoint
		$scope.obtainpointData = function() {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.totalpoints
			}).success(function(response) {
				var Code = response.State.Code;
				if(Code === 0) {
					$scope.Obtain = response.Content;
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		$scope.obtainpointData();

		//获取首页居民信息总数
		$scope.sumResidentData = function() {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.sumResident
			}).success(function(response) {
				var Code = response.State.Code;
				if(Code === 0) {
					$scope.sumPeple = response.Content;
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});

		};
		$scope.sumResidentData();

		//获取首页自治事项总条数 
		$scope.sumMatterData = function() {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.sumMatter
			}).success(function(response) {
				var Code = response.State.Code;
				if(Code === 0) {
					$scope.sumMatterCount = response.Content;
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});

		};
		$scope.sumMatterData();

		//首页圆环图表
		function PercentPie(option) {
			this.backgroundColor = option.backgroundColor || '#fff';
			this.color = option.color || ['#38a8da', '#d4effa'];
			this.fontSize = option.fontSize || 12;
			this.domEle = option.domEle;
			this.value = option.value;
			this.name = option.name;
			this.title = option.title;
		}
		var option1 = {
				value: 0, //百分比,必填
				backgroundColor: null,
				color: ['#38a8da', '#d4effa'],
				fontSize: 16,
				domEle: document.getElementById("pieDiagram") //必填
			},
			percentPie1;
		//首页上报事项处理率 disposeMatter
		$scope.disposematterData = function() {
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.disposeMatter
			}).success(function(response) {
				var Code = response.State.Code;
				if(Code === 0) {
					$rootScope.disposematterRate = response.Content.ProcessingRate.replace("%", '');
					$rootScope.disposematterDone = response.Content.Count;

					option1.value = $rootScope.disposematterRate;
					percentPie1 = new PercentPie(option1);
					percentPie1.init();
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		$scope.disposematterData();

		PercentPie.prototype.init = function() {
			var _that = this;
			var option = {
				backgroundColor: _that.backgroundColor,
				color: _that.color,
				title: {
					text: _that.title,
					top: '3%',
					left: '1%',
					textStyle: {
						color: '#333',
						fontStyle: 'normal',
						fontWeight: 'normal',
						fontFamily: 'sans-serif',
						fontSize: 16
					}
				},
				series: [{
					name: '来源',
					type: 'pie',
					radius: ['60%', '75%'],
					avoidLabelOverlap: false,
					hoverAnimation: false,
					label: {
						normal: {
							show: false,
							position: 'center',
							textStyle: {
								fontSize: _that.fontSize,
								fontWeight: 'bold'
							},
							formatter: '{b}\n{c}%'
						}
					},
					data: [{
						value: _that.value,
						name: _that.name,
						label: {
							normal: {
								show: true
							}
						}
					}, {
						value: 100 - _that.value,
						name: ''
					}]
				}]
			};
			echarts.init(_that.domEle).setOption(option);
		};

		function getSixMonthBefor() {
			var resultDate, year, month, date, hms;
			var currDate = new Date();
			year = currDate.getFullYear();
			month = currDate.getMonth() + 1;
			switch(month) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
					month += 7;
					year--;
					break;
				default:
					month -= 5;
					break;
			}
			month = (month < 10) ? ('0' + month) : month;
			resultDate = year + '-' + month;
			return resultDate;
		}

		$scope.integralData = function() {

			var url = serverUrls.homePt + "?closeMonths=7";
			$scope.listBusyPromise = $http({
				method: "get",
				url: url
			}).success(function(response) {
				var Code = response.State.Code;
				if(Code === 0) {

					$scope.listIntegerData = response.Content;

					//二维数组赋值
					$scope.ObtainArr = []; //积分发放
					$scope.ConsumeArr = []; //积分消耗
					//Y轴数据的最大值
					var Yarr = $scope.listIntegerData.months;
					var allArray = [];
					$scope.listIntegerData.data[0].forEach(function(item, index) {
						allArray.push(item);

					});
					var newArr = [];
					$scope.listIntegerData.data[1].forEach(function(item, index) {
						item = Math.abs(item);
						allArray.push(item);
						newArr.push(item);
					});
					$scope.listIntegerData.data[1] = newArr;
					$rootScope.integralAarr.push({
						"label": "发放积分数",
						"color": "#768294",
						"data": $scope.ObtainArr
					});
					$rootScope.integralAarr.push({
						"label": "消耗积分数",
						"color": "#1f92fe",
						"data": $scope.ConsumeArr
					});

					//获取数据的最大值
					var yMax = Math.max.apply(null, allArray) < 1 ? 2 : Math.max.apply(null, allArray);
					console.log(yMax);
					var myChart = echarts.init(document.getElementById('myChart'));

					var options = {

						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'cross',
								label: {
									backgroundColor: '#768294'
								}
							}
						},
						legend: {
							data: ['积分发放', '积分消耗']
						},
						toolbox: {
							feature: {
								saveAsImage: {}
							}
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						xAxis: [{
							type: 'category',
							boundaryGap: false,
							data: $scope.listIntegerData.months
						}],
						yAxis: [{
							type: 'value'
						}],
						series: [{
								name: '积分发放',
								type: 'line',
								stack: '总量',
								areaStyle: {
									normal: {
										color: 'rgba(122,122,122,.3)'
									}
								},
								data: $scope.listIntegerData.data[0]
							}, {
								name: '积分消耗',
								type: 'line',
								stack: '总量',
								areaStyle: {
									normal: {
										normal: {
											color: '#1f92fe'
										}
									}
								},
								data: $scope.listIntegerData.data[1]
							}

						]
					};
					myChart.setOption(options); //先把可选项注入myChart中  

				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		$scope.integralData();

		//获取首页天气预报
		$scope.weaterData = function() {

			// web端跨域请求天气接口
			$http.jsonp('http://wthrcdn.etouch.cn/weather_mini?city=成都&output=json&ak=tQydkkwXfEtSNgvAEHUr1v6u0GbXUvZo&callback=JSON_CALLBACK')
				.success(function(response) {
					var Content = response.data;
					//获取天气数组
					$scope.forecast = Content.forecast;
					$scope.weatherLogType = $scope.forecast[0].type;
					var nowDate = new Date();
					$scope.forecast.forEach(function(item, index) {
						item.date = new Date((nowDate.getTime() + index * 24 * 3600 * 1000));
						item.low = item.low.substring(3, 7);
						item.high = item.high.substring(3, 7);

					});

				}).error(function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				});

		};
		$scope.weaterData();
		$scope.weathers = [{
			type: "阴",
			sty: "wi wi-cloudy"
		}, {
			type: "小雨",
			sty: "wi wi-day-rain-mix"
		}, {
			type: "中雨",
			sty: "wi wi-day-rain-wind"
		}, {
			type: "大雨",
			sty: "wi wi-day-rain"
		}, {
			type: "晴",
			sty: "wi wi-day-sunny"
		}, {
			type: "多云",
			sty: "wi wi-day-cloudy"
		}];
		//根据天气不同获取不同的 图标
		$scope.weatherClass = function(item) {
			var _class;
			$scope.weathers.forEach(function(weather, index) {
				if(weather.type === item.type) {
					_class = weather.sty;
				}
			});
			return _class;
		};

		//获取首页天气logo
		$scope.weatherLogoArr = [{
			type: "阴",
			sty: "cloudy"
		}, {
			type: "小雨",
			sty: "rain"
		}, {
			type: "中雨",
			sty: "rain"
		}, {
			type: "大雨",
			sty: "sleet"
		}, {
			type: "晴",
			sty: "clear-day"
		}, {
			type: "多云",
			sty: "partly-cloudy-day"
		}];

	}

]);