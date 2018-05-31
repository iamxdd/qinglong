App.controller('checkInCtrl', ['$scope', '$q', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$filter',
	function($scope, $q, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $filter) {
		$scope.list = [];
		$scope.PcService = PcService;
		$scope.searchOption = {
			value: "",
			sellType: 0,
			State: 0,
			startTime: $filter('date')('', "yyyy-MM-dd 00:00"),
			endTime: $filter('date')('', "yyyy-MM-dd 00:00"),
		};
		$scope.postionList = [];
		$scope.location = [{
			Id: "全部",
			Name: "全部"
		}];
		$scope.Sex = [{
			Id: 1,
			Name: '男'
		}, {
			Id: 2,
			Name: '女'
		}];

		//经营分类
		$scope.ManagementClassification = [{
			Id: 0,
			Name: '全部'

		}, {
			Name: "居家生活",
			Id: 1
		}, {
			Name: "交通",
			Id: 2
		}, {
			Name: "服装",
			Id: 3
		}, {
			Name: "美食",
			Id: 4
		}];

		//状态
		$scope.State = [{
			Id: 0,
			Name: '全部'
		}, {
			Id: 1,
			Name: "正常"
		}, {
			Id: 2,
			Name: "关闭"
		}, {
			Id: 3,
			Name: "注销"
		}];

		$scope.Classification = [{
			Name: "居家生活",
			Id: 1
		}, {
			Name: "交通",
			Id: 2
		}, {
			Name: "服装",
			Id: 3
		}, {
			Name: "美食",
			Id: 4
		}];

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

		/*对号码验证*/
		var phoneCheck = function(val) {
			var flag = true;
			var pattern = /^1[3|4|5|8][0-9]\d{4,8}$/;
			var patternTwo = /^0\d{2,3}-?\d{7,8}$/;
			if(pattern.test(val) || patternTwo.test(val)) {
				flag = true;
			} else {
				flag = false;
			}
			return flag;
		}
		/*检验名称*/
		var DevNameCheck = function(val) {
			var flag = true;
			var patternName = /^[\u4E00-\u9FA5a-zA-Z0-9_]{1,200}$/;
			if(patternName.test(val)) {
				flag = true;
			} else {
				flag = false;
			}
			return flag;
		}
		/*检验身份证号码*/
		var IDNumberCheck = function(val) {
			var flag = true;
			var pattern = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
			if(pattern.test(val)) {
				flag = true;
			} else {
				flag = false;
			}
			return flag;
		}
		//重置密码
		$scope.resetItem = function(x) {
			setTimeout(function() {
				layerAlert.autoclose("功能开发中");
			}, 500);

		}
		//获取所有院落列表
		var courtyardAll = function(deffered, $scope) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: serverUrls.courtyardAll + "?openstate=" + 1
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.postionList = response.Content;
					var newAarr = $scope.postionList;
					if(newAarr.length > 0) {
						newAarr.map(function(v) {
							$scope.location.push({
								Id: v.Name,
								Name: v.Name
							})
						})
					}
					if(deffered) {
						deffered.resolve("success");
					}
				} else {
					layerAlert.autoclose(PcService.errorResult(Message));
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		//分页获取商家入驻登记
		$scope.fetchData = function() {
			var defered = $q.defer();
			var promises = defered.promise;
			if($scope.postionList.length === 0) {
				courtyardAll(defered, $scope);
			} else {
				defered.resolve();
			}
			if($scope.searchOption.startTime != '' && $scope.searchOption.endTime != '') {
				var start = new Date($scope.searchOption.startTime);
				start = start.getTime();
				var end = new Date($scope.searchOption.endTime);
				end = end.getTime();

				if(start > end) {
					layerAlert.autoclose("开始时间大于结束时间! 请重新选择");
					return;
				}
			}

			promises.then(function() {
				PagerExtends.regListSpecifyPage($scope, {
					apiUrl: serverUrls.pointmallGetListByPage,
					params: $scope.searchOption,
					success: function(response) {
						$scope.list = response;
					},
					error: function(error) {
						layerAlert.autoclose(errorResult(error));
					}
				}, $rootScope.pHeader);
			}, function(value) {
				console.log(value);
			}, function(value) {
				console.log(value);
			});
		};
		$scope.fetchData();

		//开启关闭文本显示
		$scope.toggleText = function(x) {
			var _text = "";
			switch(x.State) {
				case 2:
					_text = "开启";
					break;
				case 1:
					_text = "关停";
					break;
				default:
					break;
			}
			return _text;
		};

		//开启关闭className
		$scope.isToggle = function(x) {
			return {
				'btn-success': x.State === 2 || x.State === 0 || !x.State,
				'btn-danger': x.State === 1
			};
		};
		//开启，关闭
		$scope.toggleItem = function(x) {

			var state = 0;
			var stateText = "";

			switch(x.State) {
				case 1:
					state = 2;
					stateText = "关闭";
					break;
				case 2:
					state = 1;
					stateText = "开启";
				default:
					break;
			}
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: serverUrls.ChangeStateById + "?id=" + x.Id + "&state=" + state
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose(stateText + "操作成功!");
					$scope.fetchData();
				} else {
					layerAlert.autoclose(Message);
				}

			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//删除店铺
		$scope.deleteItem = function(x) {
			layerAlert.checkone("选择操作", function() {
				$scope.ngDialogPromise = $http({
					headers: $rootScope.pHeader,
					method: 'DELETE',
					url: serverUrls.DeleteShopById + '?id=' + x.Id,
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					var Content = response.Content;
					if(Code === 0) {
						layerAlert.autoclose('删除操作成功');
						$scope.fetchData();
					} else {
						layerAlert.autoclose(Message);
					}
				}).error(function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				});
			}, function() {
				return;
			}, "确定", "取消", true, true, "确定要删除吗?");

		};

		$scope.shop = {
			IDCardNo: "",

		};
		$scope.editorData = {};
		//隐藏
		$scope.hideLi = function() {
			//getPersonInCharge(1,shop.IDCardNo)
			/*setTimeout(function() {
				$(".ulInput").css('display', 'none');
			}, 3000)*/
		};
		$scope.serachData = {};
		$scope.serachDataIDCode = '';
		$scope.ulInputData = [];

		//获取负责人
		$scope.getPersonInCharge = function(IDCardNo, key) {
			if(IDCardNo && IDCardNo.length != 18 && key) {
				return;
			}
			if(IDCardNo == undefined || IDCardNo == '') {
				return;
			}
			//通过居民身份证Id获取居民信息	
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.getIdcardno + "?idcardno=" + IDCardNo
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				var Content = response.Content;
				if(Code === 0) {
					if(Content.MemberId != null) {
						$scope.serachDataIDCode = Content.IDCardNo;
						$scope.serachData = Content;
						$scope.shop.Name = Content.Name;
						$scope.shop.Sex = Content.Sex;
						$scope.shop.Phone = Content.Telephone;
						$scope.shop.MemberId = Content.MemberId;
						$scope.shop.ResidentStaus = Content.ResidentStaus;

						$scope.editorData.Principal = Content.Name;
						$scope.editorData.Phone = Content.Telephone;
						$scope.editorData.Sex = Content.Sex;
						$scope.editorData.ResidentStatus = Content.ResidentStaus;
						$scope.editorData.IdentityCode = Content.MemberId;
					} else {
						layerAlert.autoclose("该身份证未激活");
					}

				} else {
					layerAlert.autoclose(PcService.errorResult(Message + ',' + '请重新输入'));
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});

		};

		var checkBtn = function(x) {
			$scope.Classification.map(function(v) {
				if(v.Name == x.SellType) {
					$scope.editorData.SellType = v.Id;
				}
			});
			$scope.Sex.map(function(v) {
				if(v.Name == x.Sex) {
					$scope.editorData.Sex = v.Id;
				}
			});
		}
		//修改
		$scope.editorOne = function(x) {
			$scope.editorData = angular.copy(x);
			$scope.shop.MainPic='';
			checkBtn(x);
			if($scope.editorData.Address != '' && $scope.editorData.Address != null && $scope.editorData.Address != undefined) {
				$scope.editorData.AddressOne = $scope.editorData.Address.slice(0, 4);
				$scope.editorData.AddressTwo = $scope.editorData.Address.substring(4);
			}

			$scope.editorData.IdentityCode = x.IdentityCode;
			$scope.editordefaultImageSrc=x.LicenseImages;
			$scope.shop.MainPic=$scope.editordefaultImageSrc;
			ngDialog.openConfirm({
				template: 'createTwo',
				scope: $scope,
				controller: ["$scope", function($scope) {

					//表单提交
					$scope.formSubmit = function() {
						var address = $scope.editorData.AddressOne + $scope.editorData.AddressTwo;
						var param = {
							"Id": x.Id,
							"Resident": {
								"Name": $scope.editorData.Principal,
								"Phone": $scope.editorData.Phone,
								"Sex": $scope.editorData.Sex,
								"IDCardNo": $scope.editorData.IDCardNo,
								"ResidentStatus": $scope.editorData.ResidentStatus,
								"Address": '',
								"IdentityCode": $scope.editorData.IdentityCode,
								"Images": ''
							},
							"Name": $scope.editorData.Name,
							"Phone": $scope.editorData.Phone,
							"BusinessLicense": $scope.editorData.BusinessLicense,
							"SellType": parseInt($scope.editorData.SellType),
							"Remarks": $scope.editorData.Remarks,
							"Address": address,
							"LicenseImages":$scope.shop.MainPic
						}
						console.log(param);
						if($scope.editorData.Name == undefined ||$scope.shop.MainPic==undefined||$scope.shop.MainPic=="img/upload.png" || $scope.editorData.IDCardNo == undefined || $scope.editorData.BusinessLicense === undefined || $scope.editorData.AddressTwo == undefined) {
							layerAlert.autoclose("提交表单不能为空");
							return;
						}
						if($scope.editorData.IDCardNo == $scope.serachDataIDCode && $scope.editorData.IdentityCode == undefined) {
							layerAlert.autoclose("该身份证号码未绑定账号");
							return;
						}
						if($scope.editorData.IDCardNo != $scope.serachDataIDCode) {
							layerAlert.autoclose("请输入系统中存在的身份证号码");
							return;
						}

						formSubmit(false, param);
					};
					$scope.closeDialog = function() {
						ngDialog.closeAll();
					};

				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 700,
			});

		};
		//清空
		$scope.clearInput = function() {
			$scope.shop.Phone = '';
			$scope.shop.Sex = '';
			$scope.shop.Name = '';
			$scope.editorData.Principal = '';
			$scope.editorData.Sex = '';
			$scope.editorData.Phone = '';
			$scope.shop.MainPic='';

		};
		$scope.configImageAfterUpload = function(url) {
			if (url) {
				$scope.shop.MainPic = url !== 'img/upload.png' ? url : "";
			} else {
				layerAlert.autoclose('上传图片失败，请稍后再试！');
			}
		}
		//新增
		$scope.creatOne = function(x) {
			$scope.shop = {};
			$scope.defaultImageSrc='';
			$scope.shop.Address = "西林豫府";
			$scope.shop.SellType = 1;
			ngDialog.openConfirm({
				template: 'creatOne',
				scope: $scope,
				controller: ["$scope", function($scope) {
					//表单提交
					$scope.formSubmit = function() {
						var Address = $scope.shop.Address + $scope.shop.AddressTwo;
						var param = {
							"Resident": {
								"Name": $scope.shop.Name,
								"Phone": $scope.shop.Phone,
								"Sex": $scope.shop.Sex,
								"IDCardNo": $scope.shop.IDCardNo,
								"ResidentStatus": $scope.shop.ResidentStaus,
								"Address": "",
								"IdentityCode": $scope.shop.MemberId,
								"Images": ''
							},
							"Name": $scope.shop.shopName,
							"Phone": $scope.shop.Phone,
							"BusinessLicense": $scope.shop.BusinessLicense,
							"SellType": parseInt($scope.shop.SellType),
							"Remarks": $scope.shop.Remarks,
							"Address": Address,
							"LicenseImages":$scope.shop.MainPic
						};
						console.log(param);
						if($scope.shop.shopName == undefined || $scope.shop.MainPic=="img/upload.png" ||$scope.shop.MainPic==undefined ||$scope.shop.MainPic==''|| $scope.shop.IDCardNo == undefined || $scope.shop.BusinessLicense == undefined || $scope.shop.SellType == undefined || $scope.shop.AddressTwo == undefined) {
							layerAlert.autoclose("提交表单不能为空");
							return;
						}
						if($scope.shop.IDCardNo != $scope.serachDataIDCode && $scope.shop.MemberId == undefined) {
							layerAlert.autoclose("该身份证号码未绑定账号");
							return;
						}
						if($scope.shop.IDCardNo != $scope.serachDataIDCode) {
							layerAlert.autoclose("请输入系统中存在的身份证");
							return;
						}

						formSubmit(true, param);
					};
					$scope.closeDialog = function() {
						ngDialog.closeAll();
					};

				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 700,
			});
		}

		//提交表单时获取data
		var getFormData = function(fieldsList) {
			var data = {};
			fieldsList.map(function(item) {
				data[item.name] = item.value;
			});
			return data;
		};

		//提交新增表单
		var formSubmit = function(create, param) {

			var title, url, method;
			if(create) {
				title = "新增";
				method = "post";
				url = serverUrls.AddShop;
			} else {
				title = "修改";
				method = "post";
				url = serverUrls.UpdateShop;

			}

			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: method,
				url: url,
				data: param
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose(title + "操作成功！");
					$scope.fetchData();
					setTimeout(function() {
						ngDialog.closeAll();
					}, 1600);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
	}
]);