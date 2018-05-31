App.controller('evaluationSurveyDetailCtrl', ['$scope', '$q', '$stateParams', '$state', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService',
	function($scope, $q, $stateParams, $state, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService) {
		$scope.list = [];
		var shopId = $stateParams.Id;
		//券类型
		$scope.couponTypeSelect = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "折扣券"
		}, {
			Id: 2,
			Name: "抵用券"
		}, {
			Id: 3,
			Name: "满减券"
		}, {
			Id: 4,
			Name: "礼品券"
		}];
		$scope.gradeSelect = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: "1颗星"
		}, {
			Id: 2,
			Name: "2颗星"
		}, {
			Id: 3,
			Name: "3颗星"
		}, {
			Id: 4,
			Name: "4颗星"
		}, {
			Id: 5,
			Name: "5颗星"
		}];
		$scope.searchOption = {
			value: "",
			startTime: "",
			endTime: "",
			couponType: 0,
			grade: 0,
			shopId: shopId
		};
		/*时间插件*/
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

		$scope.statusClass = function(value) {
			var statusClass = ''
			switch (value) {
				case '已通过':
					statusClass = 'todoColor';
					break;
				case '未通过':
					statusClass = 'passColor';
					break;
				case '待审核':
					statusClass = 'noPassColor';
					break;

				default:
					break;
			}
			return statusClass;
		};
		//获取列表
		$scope.fetchData = function() {

			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.GetOrderEvaluationListByShopId,
				params: $scope.searchOption,
				success: function(response) {
					$scope.list = response;

				},
				error: function(error) {
					layerAlert.autoclose(errorResult(error));
				}
			}, $rootScope.pHeader);

		};

		$scope.fetchData();
		//评价明细
		$scope.heading = 0;
		$scope.DetailData = {};
		$scope.seeItem = function(x, _index) {
			
			var hasHeading = false;
			var headingIndex = 0;
			var hasHeading = false;
			var headingIndex = 0;
			$scope.list.forEach(function(item, index) {
				if (item.heading) {
					$scope.list.splice(index, 1);
					hasHeading = true;
					headingIndex = index;

				}
			});
			if (_index === headingIndex - 1) {
				return;
			} else if (_index < headingIndex) {
				_index++;
			}
			if (!hasHeading) {
				_index++;
			}
			var id = x.Id;
			$scope.heading = 1;
			$scope.DetailData = angular.copy(x);
			var imgList = $scope.DetailData.EvaluateImages;
			if (imgList != null &&  imgList != "" && imgList != 'string') {
				imgList = imgList.split(",");
				$scope.DetailData.imgList = imgList.slice(0, 4);
			}
			var arr = [];
			arr.push($scope.DetailData);
			var itemObj = {
				heading: true,
				list: arr
			};
			$scope.list.splice(_index, 0, itemObj);
		};
	}
]);