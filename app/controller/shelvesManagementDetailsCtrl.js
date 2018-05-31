App.controller('shelvesManagementDetailsCtrl', ['$scope', '$state', '$stateParams', 'PcService', '$rootScope', 'serverUrls', '$q', '$location', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', '$filter',
	function($scope, $state, $stateParams, PcService, $rootScope, serverUrls, $q, $location, $http, ngDialog, PagerExtends, layerAlert, $filter) {
		var list = JSON.parse($stateParams.object);
		$scope.type = list.type;
		$scope.title = list.List.Name;
		//console.log('list',list)
		$scope.ShelfState = list.List.ShelfState;
		$scope.PcService = PcService;
		$scope.newsAdd = {};
		$scope.commodity={};
		$scope.DetailsData={};
		//数字转文字
		$scope.numberToText = function(id, _arrry) {
			var _text = "";
			_arrry.forEach(function(item, index) {
				if (typeof id === "boolean") {
					id = id.toString();
				}
				if (item.Id === id) {
					_text = item.Name;
				}
			});
			_text = _text === "全部" ? "" : _text;
			return _text;
		};
		$scope.changeUpper = function(id) {
			var text = $('.changeUpper').text();
			var tText = '',
				url = '',
				data = {};
			// if(text!=='上架中') return;
			if(id == 1) {
				data = {
					"Id": $scope.DetailsData.Id,
					"State": 3,
					"Remarks": $scope.newsAdd.Remarks
				};
				url = serverUrls.isshelf;
				tText = '已下架';
			} else if(id == 2) {
				data = {
					"Id": $scope.DetailsData.Id,
					"State": 3,
					"Remarks": $scope.newsAdd.Remarks
				};
				url = serverUrls.isreview;
				tText = '未通过';
			} else {
				data = {
					"Id": $scope.DetailsData.Id,
					"State": 2,
					"Remarks": $scope.newsAdd.Remarks
				};
				url = serverUrls.isreview;
				tText = '已通过';
			}
			$scope.changeUpperUrl(url, data, id, tText)
		}
		$scope.fetchData = function() {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: 'get',
				url: serverUrls.getcoupont + '?id=' + (list.List.CouponId ? list.List.CouponId : list.List.Id)
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				var Content = response.Content;
				var newarr = [];
				if(Code === 0) {
					/*
					newarr.push(Content);
					newarr.map(function(v) {
						v.Images = v.Images.split(',');
						if(v.Way == 2) {
							v.UseTimeRange = $filter('date')(v.StartAt, "yyyy-MM-dd") + '   ~   ' + $filter('date')(v.EndAt, "yyyy-MM-dd")
						}
						// if(v.ReviewState==2){
						// 	v.ShelfRemarks = v.ReviewRemarks;
						// }
					});
					$scope.list = newarr;*/
					$scope.DetailsData = response.Content;
					if ($scope.DetailsData.Way == 1) { //普通商品
						$scope.UseTimeRange = $scope.DetailsData.UseTimeRange;
					} else { //活动商品
						$scope.UseTimeRangeO = $filter('date')($scope.DetailsData.StartAt, "yyyy-MM-dd HH:mm");
						$scope.UseTimeRangeT = $filter('date')($scope.DetailsData.EndAt, "yyyy-MM-dd HH:mm");
					}
					var imgList = $scope.DetailsData.Images;
					if (imgList != '') {
						imgList = imgList.split(",");
						$scope.DetailsData.imgList = imgList.slice(0, 4);
					}
				} else {
					layerAlert.autoclose(PcService.errorResult(Message));
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		}
		$scope.fetchData()

		$scope.changeUpperUrl = function(url, data, id, text) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: 'put',
				url: url,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.ShelfState = text;
					$scope.fetchData();
					setTimeout(function() {
						ngDialog.closeAll();
					}, 200);
				} else {
					layerAlert.autoclose(PcService.errorResult(Message));
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		}

		$scope.tdClass = function(value) {
			var classStyle = '';
			switch(value) {
				case '待上架':
					classStyle = 'todoSpan';
					break;
				case '上架中':
					classStyle = 'passSpan';
					break;
				case '已下架':
					classStyle = 'noSpan';
					break;
				case '待审核':
					classStyle = 'todoAudit';
					break;
				case '已通过':
					classStyle = 'passAudit';
					break;
				case '未通过':
					classStyle = 'noAudit';
					break;
				case '待验证':
					classStyle = 'passingdaisz';
					break;
				case '已验证':
					classStyle = 'passingyyz';
					break;
				case '已退还':
					classStyle = 'passingyth';
					break;
				case '已失效':
					classStyle = 'passingysx';
					break;
				default:
					break;
			}
			return classStyle;
		}

		$scope.creatOne = function(id) {
			ngDialog.openConfirm({
				template: "createOne",
				scope: $scope,
				controller: ['$scope', function($scope) {
					$scope.newsAdd.Remarks = ''
					$scope.formSubmit = function() {
						$scope.changeUpper(id)

						$scope.closeDialog = function() {
							ngDialog.closeAll();
						};
					}
				}],
				className: 'ngdialog-theme-default',
				closeByDocument: false,
				width: 900,

			});

		};
	/*修改*/
	$scope.ticketCategoryCodes = [{
			Name: '折扣券',
			Id: 1
		}, {
			Name: '抵用券',
			Id: 2
		}, {
			Name: '满减券',
			Id: 3
		}, {
			Name: '礼品券',
			Id: 4
		}];
		$scope.showWorth = false;
		//选中礼品券
		$scope.selectCouponType = function(CouponType) {
			if (CouponType === 4) {
				$scope.showWorth = true;
			} else {
				$scope.showWorth = false;
			}
		};
		//范围
		$scope.RangeSelect = [{
			Id: 1,
			Name: "全部商品"
		}, {
			Id: 2,
			Name: "部分商品"
		}]

		$scope.wayScope = [{
			Name: '普通商品',
			Id: 1
		}, {
			Name: '活动商品',
			Id: 1
		}];
		//检验名称
		var DevNameCheck = function(val) {
			var flag = true;
			var patternName = /^[\u4E00-\u9FA5a-zA-Z0-9_]{1,32}$/;
			if (patternName.test(val)) {
				flag = true;
			} else {
				flag = false;
			}
			return flag;
		};
		var numberCheck = function(val) {
			var flag = true;
			var patternName = /(^[1-9]\d*$)/;
			if (patternName.test(val)) {
				flag = true;
			} else {
				flag = false;
			}
			return flag;
		};
		//上传图片确认
		$scope.configImageAfterUploadOne = function(url) {
			if (url) {
				$scope.commodity.ImagesOne = url !== 'img/upload.png' ? url : "";
			} else {
				layerAlert.autoclose('上传图片失败，请稍后再试！');
			}

		};
		$scope.configImageAfterUploadTwo = function(url) {
			if (url) {
				$scope.commodity.ImagesTwo = url !== 'img/upload.png' ? url : "";
			} else {
				layerAlert.autoclose('上传图片失败，请稍后再试！');
			}

		};
		$scope.configImageAfterUploadThree = function(url) {

			if (url) {
				$scope.commodity.ImagesThree = url !== 'img/upload.png' ? url : "";
			} else {
				layerAlert.autoclose('上传图片失败，请稍后再试！');
			}
		};
		$scope.configImageAfterUploadFour = function(url) {

			if (url) {
				$scope.commodity.ImagesFour = url !== 'img/upload.png' ? url : "";
			} else {
				layerAlert.autoclose('上传图片失败，请稍后再试！');
			}
		};
		
		var initTimeSelct = function() {
			setTimeout(function() {
				//时间插件  开始时间	
				$("#startTime").datetimepicker({
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
					$("#startTime").datetimepicker();
				});

				//时间插件  结束时间	
				$("#endTime").datetimepicker({
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
					$("#endTime").datetimepicker();
				});
			}, 100);
		};
		var MutiSelct = function($scope) {
			initTimeSelct();
		};
		//修改
		$scope.editorItem = function() {
			$scope.commodity={};
			$scope.commodity = angular.copy($scope.DetailsData);
			if ($scope.commodity.CouponType === 4) {
				$scope.showWorth = true;
			} else {
				$scope.showWorth = false;
			}
			
			if ($scope.commodity.Way == 1) { //普通商品
				$scope.commodity.Type = '1';

			} else { //活动商品
				$scope.commodity.Type = '2';
				if ($scope.commodity.StartAt != '') {
					$scope.commodity.StartAt = $filter('date')($scope.commodity.StartAt, "yyyy-MM-dd HH:mm");
					$scope.commodity.EndAt = $filter('date')($scope.commodity.EndAt, "yyyy-MM-dd HH:mm");

				}
			}
			$scope.editroeDefaultImageSrc = $scope.commodity.Images;
			console.log(typeof($scope.editroeDefaultImageSrc));
			//普通商品，绑定时间
			var imgList = $scope.commodity.Images;
			if ($scope.editroeDefaultImageSrc != '') {
				imgList = imgList.split(",");
				imgList = imgList.slice(0, 4);
				$scope.commodity.ImagesOne = imgList[0];
				$scope.commodity.ImagesTwo = imgList[1];
				$scope.commodity.ImagesThree = imgList[2];
				$scope.commodity.ImagesFour = imgList[3];
			}

			ngDialog.openConfirm({
				template: 'createTwo',
				scope: $scope,
				controller: ["$scope", function($scope) {
					setTimeout(function() {
						MutiSelct($scope);
					}, 200);
					$scope.formSubmit = function() {
						var UseTimeRange = $('button[data-id="maxOption2"]').attr('title');
						var text = "修改";
						var Worth = 0;
						var param = '';

						var img = '';
						var arr = [];

						if ($scope.commodity.ImagesOne != undefined) {
							arr.push($scope.commodity.ImagesOne);

						};
						if ($scope.commodity.ImagesTwo != undefined) {
							arr.push($scope.commodity.ImagesTwo);
						};
						if ($scope.commodity.ImagesThree != undefined) {
							arr.push($scope.commodity.ImagesThree);
						};
						if ($scope.commodity.ImagesFour != undefined) {
							arr.push($scope.commodity.ImagesFour);
						}

						img = arr.join();
						param = {
							"Id": $scope.commodity.Id,
							"Name": $scope.commodity.Name,
							"Range": $scope.commodity.Range,
							"CouponType": $scope.commodity.CouponType,
							"Way": 2,
							"Flag":1,
							"StartAt": $scope.commodity.StartAt,
							"EndAt": $scope.commodity.EndAt,
							"Describe": $scope.commodity.Describe,
							"SuperpositionNum": parseInt($scope.commodity.SuperpositionNum),
							"Images": img,
							"ShopId": $scope.commodity.ShopId,
							"Worth": $scope.commodity.CouponType===4 ? $scope.commodity.Worth :0,
							"PointNum": $scope.commodity.PointNum,
							"RepositoryCount":$scope.commodity.RepositoryCount
						};
						console.log(param);
						if($scope.commodity.CouponType===4){
							if($scope.commodity.Worth==undefined || $scope.commodity.Worth==''){
								layerAlert.autoclose("表单提交不能为空!");
								return;
							}
						}
						if (img == '' ||$scope.commodity.PointNum==undefined||$scope.commodity.PointNum==''|| $scope.commodity.RepositoryCount==undefined|| $scope.commodity.Describe==undefined|| $scope.commodity.Describe==''|| $scope.commodity.Name == '' || $scope.commodity.Name == undefined || $scope.commodity.SuperpositionNum == undefined) {
							layerAlert.autoclose("表单提交不能为空!");
							return;
						}
						if ($scope.commodity.Name != undefined) {
							var DevNameFlagReceiver = DevNameCheck($scope.commodity.Name.replace(/\s/g, ""));
							if (!DevNameFlagReceiver) {
								layerAlert.autoclose('名称输入不合法,支持文字，数字，英文和下划线,请重新输入');

								return;
							}
						}
						if ($scope.commodity.SuperpositionNum != '') {
							var numberFlag = numberCheck(parseInt($scope.commodity.SuperpositionNum));
							if (isNaN(Number($scope.commodity.SuperpositionNum)) && !numberFlag) {
								layerAlert.autoclose('库存,限购数量,积分数量为数字且只能为正整数,请重新输入');
								return;
							}
						}
						if ($scope.commodity.PointNum != '') {
							var numberFlag = numberCheck(parseInt($scope.commodity.PointNum));
							if (isNaN(Number($scope.commodity.PointNum)) && !numberFlag) {
								layerAlert.autoclose('库存,限购数量,积分数量为数字且只能为正整数,请重新输入');
								return;
							}
						}
						if ($scope.commodity.RepositoryCount != '') {
							var numberFlag = numberCheck(parseInt($scope.commodity.RepositoryCount));
							if (isNaN(Number($scope.commodity.RepositoryCount)) && !numberFlag) {
								layerAlert.autoclose('库存,限购数量,积分数量为数字且只能为正整数,请重新输入');
								return;
							}
						}
						formsubmitData(text, $scope, param);
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 1000

			});
		};
		//表单提交
		var formsubmitData = function(text, $scope, param) {
			var url = serverUrls.upcoupon;
			var method = 'put';
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: method,
				url: url,
				data: param
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					layerAlert.autoclose(text + "操作成功！");
					/*$scope.fetchData();
					setTimeout(function() {
						$scope.closeThisDialog();
					}, 1600);*/
					$state.go("app.auditManagement");
				} else {

					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
	/*结束*/
	}
]);