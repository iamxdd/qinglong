App.controller('neighborhoodCircleCtrl', ['$scope', '$rootScope', '$q', 'PcService', 'serverUrls', '$state', '$stateParams', '$location', '$http', 'ngDialog', 'PagerExtends', 'layerAlert',
	function($scope, $rootScope, $q, PcService, serverUrls, $state, $stateParams, $location, $http, ngDialog, PagerExtends, layerAlert) {
		$scope.list = []; //分页获取圈子列表
		//网页初始化默认值
		$scope.searchOption = {
			name: '',
			Openstate: 0
		};
		$scope.statusSlect = [{
			Id: 0,
			Name: "全部"
		}, {
			Id: 1,
			Name: '开启'

		}, {
			Id: 2,
			Name: '关闭'

		}, {
			Id: 3,
			Name: '已解散'
		}];
		$scope.PcService = PcService;
		$scope.startState = '开启';
		$scope.startEnd = '关闭';
		$scope.chargePeple = [{
			Id: 0,
			Name: "请选择"
		}];
		$scope.fieldsList = [{
			name: "usefundType",
			nameDisplay: "转让",
			editor: "search-select",
			required: true,
			value: $scope.chargePeple[0].Id,
			opts: $scope.chargePeple,
			originValue: $scope.chargePeple[0].Id
		}];
		//分页获取圈子列表
		$scope.fetchData = function() {
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: serverUrls.apicoteriegetlistbypage,
				params: $scope.searchOption,
				success: function(response) {
					$scope.list = response;
				},
				error: function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				}
			}, $rootScope.pHeader);
		};
		$scope.fetchData();

		//开启关闭className
		$scope.isToggle = function(x) {

			return {
				'btn-success': x.OpenState === 2,
				'btn-danger': x.OpenState === 1

			};
		};
		//开启关闭文本显示 1 开启 2关闭
		$scope.toggleText = function(x) {
			var _text = "";
			switch (x.OpenState) {
				case 2:
					_text = "开启";
					break;
				case 1:
					_text = "关闭";

				default:
					break;
			}
			return _text;
		};
		var formSubmidissolve = function(x, $scope) {
				var state = 3;
				var stateText = '解散';
				$scope.listBusyPromise = $http({
					headers: $rootScope.pHeader,
					method: "get",
					url: serverUrls.changecoteriestate + "?id=" + x.Id + "&state=" + state
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					if (Code === 0) {
						layerAlert.autoclose(stateText + "操作成功!");
						$scope.fetchData();
						ngDialog.closeAll();
					} else {
						layerAlert.autoclose(Message);
					}

				}).error(function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				});
			}
			//解散
		$scope.dissolve = function(x) {
				layerAlert.checkone("选择操作", function() {
					formSubmidissolve(x, $scope);
				}, function() {
					return;
				}, "确定", "取消", true, true, "确定要解散吗?");

			}
			//开启关闭
		$scope.toggleItem = function(x) {
			var state = 0;
			var stateText = "";
			switch (x.OpenState) {
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

			if (state !== 2 && state !== 1) {
				return;
			}
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: serverUrls.changecoteriestate + "?id=" + x.Id + "&state=" + state
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					layerAlert.autoclose(stateText + "操作成功!");
					$scope.fetchData();
				} else {
					layerAlert.autoclose(Message);
				}

			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});

		};

		$scope.isDisabled = function(x) {
			return x.OpenState === 3;
		};

		$scope.chk = false //默认不选中

		//转让是否选中来线上转让列表的显示
		$scope.isChecked = function(chk) {

			return $scope.chk
		};
		$scope.isClick = function() {
				$scope.chk = !$scope.chk;
			}
			//新增，点击加号按钮生成input框
		$scope.addTags = function() {
				if ($("#neighborhoodForm input").length > 3) {
					layerAlert.autoclose("标签个数不能超过4个")
					return;
				}
				$("<div class=' col-lg-2  neiber-label' ><input type='text' maxlength='50' ng-model='Resident.Tags' class='form-control TagsName'/></div>").appendTo("#btn-add");

			}
			//影藏
		$scope.hideLi = function() {
			setTimeout(function() {
				$(".ulInput").css('display', 'none');
			}, 2000)
		};

		//存取负责人相关信息
		$scope.PersonInChargeList = [];

		$scope.Resident = {
			value: "",

		};
		$scope.ResidentTwo = {
			pepele: "",
		};

		//获取负责人
		$scope.getPersonInCharge = function(id, value) {
			if (id == 1) {
				setTimeout(function() {
					$scope.ulInputData = [];
					if (!value) {
						$(".ulInput").css('display', 'none');
						return;
					}
					$(".ulInput").css('display', 'block');
					$scope.ngDialogPromise = $http({
						method: 'get',
						url: serverUrls.negotiationList + "?value=" + value
					}).success(function(response) {
						var Code = response.State.Code;
						var Message = response.State.Message;
						$scope.ResidentStatus = response.Content;
							
						if (Code === 0) {
							if(response.Content.length==0){
								
							}
							$scope.serachData = $scope.ResidentStatus;
							if ($scope.ResidentStatus.length == 0) {
								$(".ulInput").css('display', 'none');
								$scope.PersonInChargeList = response.Content;

							}
							if ($scope.ResidentStatus && $scope.ResidentStatus.length > 0) {
								$scope.ulInputData = response.Content;
								$scope.PersonInChargeList = $scope.ulInputData;

							} else {
								$(".ulInput").css('display', 'none');
							}
						} else {
							$(".ulInput").css('display', 'none');

						}
					}).error(function(error) {
						layerAlert.autoclose(PcService.errorResult(error));
					});
				}, 500)
			}
		};

		//通过id获取单条圈子
		var getbyid = function(quanziId, $scope, deffered) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: serverUrls.getbyid + "?id=" + quanziId
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					$scope.quanzi = response.Content;
					if (deffered) {
						deffered.resolve("success");
					}
				} else {
					layerAlert.autoclose(Message);
				}

			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		var getmember = function(quanziId, $scope, deffered) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: serverUrls.GetMemberNoOwner + "?coterieId=" + quanziId
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				var newcontent = [];
				if (Code === 0) {
					var Content = response.Content;
					$scope.quanziMenber = response.Content;
					if (Content.length > 0) {
						newcontent.push({
							"Id": $scope.chargePeple[0].Id,
							"Name": $scope.chargePeple[0].Name
						})
						Content.map(function(v) {

							newcontent.push({
								"Id": v.Id,
								"Name": v.Name
							});
						});
					}
					//将值赋值到select框
					$scope.fieldsList[0].opts = newcontent;
					$scope.fieldsList[0].value = $scope.chargePeple[0].Id;
					if (deffered) {
						deffered.resolve("success");
					}
				} else {
					layerAlert.autoclose(Message);
				}

			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		}

		//点击修改按钮
		$scope.editItem = function(x) {
			$scope.fieldsList[0].value = '';
			$scope.chk = false
			var quanziId = x.Id;
			var deffered = $q.defer();
			var promises = deffered.promise;
			getbyid(quanziId, $scope, deffered);
			if (!$scope.quanzi || $scope.quanzi === '') {
				getbyid(quanziId, $scope, deffered);
			} else {
				deffered.resolve();
			};
			//标签处理
			$scope.TagsList = x.Tags;
			if ($scope.TagsList) {
				$scope.TagsList = $scope.TagsList.split(",");
			}
			//通过圈子id获取圈内成员
			getmember(quanziId, $scope, deffered);
			if (!$scope.quanziMenber || $scope.quanziMenber.length === 0) {
				getmember(quanziId, $scope, deffered);
			} else {
				deffered.resolve();
			};
			//获取圈内人
			ngDialog.openConfirm({
				template: "createEditor",
				scope: $scope,
				controller: ['$scope', function($scope) {
					$scope.quanzine = x;

					$scope.TitleText = "修改邻里圈";
					$scope.formSubmit = function() {

						if ($("#chbox").is(':checked')) {
							if (!$scope.quanziMenber || $scope.quanziMenber.length === 0 || $scope.fieldsList[0].value === 0) {
								formSubmitEdit(x, $scope);
							} else {
								formSubmitEditnew(x, $scope);
							}
						} else {
							formSubmitEdit(x, $scope);
						}

					};

					$scope.closeDialog = function() {
						$scope.closeThisDialog();
					};
				}],
				className: 'ngdialog-theme-default',
				closeByDocument: false,
				width: 900,

			});
		};

		//点击复选框
		var formSubmitEditnew = function(x, $scope) {
			console.log("选中复选框");
			var tagSpilt = [];
			$(".TagsName").each(function() {
				if ($(this).val() != '') {
					tagSpilt.push($(this).val());
				}

			});
			tagSpilt = tagSpilt.join();

			var param = {
				"Id": x.Id,
				"Name": $("#quanziName").val(),
				"Tags": tagSpilt,
				"coterieMemberId": $scope.fieldsList[0].value
			}
			console.log(param);
			//发出请求
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: "post",
				url: serverUrls.CoterieChange,
				data: param
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					layerAlert.autoclose("修改操作成功！");
					//查询圈子列表
					$scope.fetchData();
					setTimeout(function() {
						$scope.closeThisDialog();
					}, 1600);
				} else {

					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		//修改圈子
		var formSubmitEdit = function(x, $scope) {
			var url = '',
				method = 'put';
			url = serverUrls.updatecoterie;
			var tagSpilt = [];

			$(".TagsName").each(function() {
				if ($(this).val() != '') {
					tagSpilt.push($(this).val());
				}
			});
			tagSpilt = tagSpilt.join();

			var param = {
				"Id": x.Id,
				"Name": $("#quanziName").val(),
				"Tags": tagSpilt
			};
			console.log(param);
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: method,
				url: url,
				data: param
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					layerAlert.autoclose("修改操作成功！");
					//查询圈子列表
					$scope.fetchData();
					setTimeout(function() {
						$scope.closeThisDialog();
					}, 1600);
				} else {

					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});

		};

		$scope.NeSelect = [{
			Id: 0,
			Name: '关联社团'
		}];
		$scope.NeSelectinput = 0;

		//点击邻里圈 添加按钮
		$scope.creatOne = function() {
			$scope.Resident = {};
			ngDialog.openConfirm({
				template: "creatOne",
				scope: $scope,
				controller: ['$scope', function($scope) {
					$scope.TitleText = "添加";
					$scope.Resident = {};
					$scope.formSubmit = function() {

						formSubmitAdd($scope);
					};
					$scope.fillpersonInCharge = function(x) {
						$scope.PersonInChargeList.map(function(item, index) {
							if (item.ResidentStatus = x.ResidentStatus) {
								$scope.Resident.IdentityCode = x.IdentityCode;
								$scope.Resident.HouseId = x.HouseId;
								$scope.Resident.Images = x.Images;
								$scope.Resident.Sex = x.Sex;
								$scope.Resident.ResidentName = x.ResidentStatus;
							}
						});
						$scope.Resident.value = x.Name;
						console.log($scope.Resident.value)
						$(".ulInput").css('display', 'none');
					};
					$scope.closeDialog = function() {
						ngDialog.closeAll();
					};
				}],
				className: 'ngdialog-theme-default',
				closeByDocument: false,
				width: 900,

			});
		};

		var formSubmitAdd = function($scope) {

			var url = '',
				method = 'post';
			url = serverUrls.addcoterie;
			var tagSpilt = [];

			$(".TagsName").each(function() {
				if ($(this).val() != '') {
					tagSpilt.push($(this).val());
				}
			});
			tagSpilt = tagSpilt.join();
			var param = {
				"Name": $scope.Resident.Name,
				"Presentation": "",
				"IconUrl": "",
				"Tags": tagSpilt,
				"Account": {
					"Name": $scope.Resident.ResidentName,
					"IdentityCode": $scope.Resident.IdentityCode,
					"ResidentName": $scope.Resident.value,
					"Sex": $scope.Resident.Sex,
					"imgUrl": $scope.Resident.Images,
					"HouseId": $scope.Resident.HouseId,
				}
			};
			console.log(param);
			if ($("#chargePeple").val() === "") {
				layerAlert.autoclose("请输入负责人");
			} else {
				if ($scope.Resident.ResidentName === undefined) {
					layerAlert.autoclose("系统中不存在该用户");
				} else {
					$scope.ngDialogPromise = $http({
						headers: $rootScope.pHeader,
						method: method,
						url: url,
						data: param
					}).success(function(response) {
						var Code = response.State.Code;
						var Message = response.State.Message;
						if (Code === 0) {
							layerAlert.autoclose("新增操作成功！");
							//查询圈子列表
							$scope.$parent.$parent.fetchData();
							setTimeout(function() {
								$scope.closeThisDialog();
							}, 1600);
						} else {

							layerAlert.autoclose(Message);
						}
					}).error(function(error) {
						layerAlert.autoclose(PcService.errorResult(error));
					});
				}

			}

		};

		//邻里圈子查看详情页面
		$scope.seeDetails = function(x) {
			$scope.DetailsData = JSON.stringify(x);
			$state.go("app.seeDetails", {
				object: $scope.DetailsData
			});
		};

	}
]);