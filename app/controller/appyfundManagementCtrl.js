App.controller('appyfundManagementCtrl', ['$scope', '$state', '$q', 'serverUrls', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', '$filter', 'PcService',
	function($scope, $state, $q, serverUrls, $rootScope, $http, ngDialog, PagerExtends, layerAlert, $filter, PcService) {
		$scope.list = [];
		$scope.listUse = [];
		$scope.PcService = PcService;

		//状态
		$scope.state = [{
			value: '请选择',
			index: 0
		}, {
			value: '待审核',
			index: 1
		}, {
			value: '已通过',
			index: 2
		}, {
			value: '未通过',
			index: 3
		}];
      $scope.ReviewState = function(id,arr){
      	var text='';
      	arr.forEach(function(v){
      		if(v.index==id){
      			text=v.value;
      		}

      	})
      	return text;
      }
		$scope.searchOption = {
			state: 0,
			value:''
		};

		//基金使用添加弹框类型基金
		$scope.Type = [{
			Id: 1,
			Name: "困难救助"
		}, {
			Id: 2,
			Name: "院落关怀"
		}, {
			Id: 3,
			Name: "院落修缮"
		}, {
			Id: 4,
			Name: "其他"
		}];


		var initList = [{
						Id: 0,
						Name: "请选择"
					}];
		//基金使用弹框关联事项
		$scope.residentType = $scope.CourtyardList=$scope.BuildingList=$scope.UnitList=$scope.HouseList=[{
			Id: 0,
			Name: "请选择"
		}];

		$scope.location = [{
				name: "Seat",
				nameDisplay: "房屋信息",
				editor: "four-select",
				required: true,
				opts1: $scope.CourtyardList,
				opts2: $scope.BuildingList,
				opts3: $scope.UnitList,
				opts4: $scope.HouseList,
				value1: $scope.CourtyardList[0].Id,
				value2: $scope.BuildingList[0].Id,
				value3: $scope.UnitList[0].Id,
				value4: $scope.HouseList[0].Id,
				column: 1,
				originValue: 0
			}]

		$scope.modeyInfo = {
			name: '',
			money: '',
		};
		$scope.newsAdd={
				Name:'',
				ReviewState:0,
				FinancesType:-1,
				Images:'',
				Amount:'',
				Remarks:''
			};

		$scope.configImageAfterUpload = function(url,id) {
			if(url) {
				if(id===1){
                  $scope.newsAdd.OneImages = url !== 'img/upload.png' ? url : "";
				}
				if(id===2){
				  $scope.newsAdd.TwoImages = url !== 'img/upload.png' ? url : "";
				}
				if(id===3){
				  $scope.newsAdd.ThreeImages = url !== 'img/upload.png' ? url : "";
				}
				if(id===4){
				 $scope.newsAdd.FourImages = url !== 'img/upload.png' ? url : "";
				}
				// $scope.newsAdd.Images = url !== 'img/upload.png' ? url : "";
			} else {
				layerAlert.autoclose('上传图片失败，请稍后再试！');
			}
		}

		//选择院落
		$scope.choseCourtyard = function(field) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.getAll + "?id=" + field.value1
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var initList = [{
						Id: 0,
						Name: "请选择"
					}];
					var list = initList.concat(response.Content);
					if($scope.location) {
						$scope.location.forEach(function(item, index) {
							if(item.name === "Seat") {
								item.opts2 = list;
								item.value2 = list[0] ? list[0].Id : 0;
								item.opts3 = initList;
								item.value3 = 0;
								item.opts4 = initList;
								item.value4 = 0;
							}
						});
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(error);
			});

		};

		//选择楼栋
		$scope.choseBuild = function(field) {
			if(field.value2 === 0) {
				$scope.location.forEach(function(item, index) {
					if(item.name === "Seat") {
						item.opts3 = initList;
						item.value3 = 0;
						item.opts4 = initList;
						item.value4 = 0;

					}
				});
				return;
			}
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.getAll + "?id=" + field.value2
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var initList = [{
						Id: 0,
						Name: "请选择"
					}];
					var list = initList.concat(response.Content);
					if($scope.location) {
						$scope.location.forEach(function(item, index) {
							if(item.name === "Seat") {
								item.opts3 = list;
								item.value3 = list[0] ? list[0].Id : 0;
								item.opts4 = initList;
								item.value4 = 0;
							}
						});
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(error);
			});
		};

		//选择单元
		$scope.choseUnit = function(field) {
			if(field.value3 === 0) {
				$scope.location.forEach(function(item, index) {
					if(item.name === "Seat") {
						item.opts4 = initList;
						item.value4 = 0;
					}
				});
				return;
			}
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.unitHouseList + "?id=" + field.value3
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var initList = [{
						Id: 0,
						RoomNumber: "请选择"
					}];
					var list = initList.concat(response.Content);
					list.forEach(function(_item, _index) {
						_item.Name = _item.RoomNumber;
					});
					if($scope.location) {
						$scope.location.forEach(function(item, index) {
							if(item.name === "Seat") {
								item.opts4 = list;
								item.value4 = list[0] ? list[0].Id : 0;
							}
						});
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(error);
			});
		};
		//获取初始院落下的楼栋列表
		var getInitBuildList = function(id) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.getAll + "?id=" + id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.BuildingList = $scope.BuildingList.concat(response.Content);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(error);
			});
		};

		//获取院落列表
		var getCourtyardList = function($scope,x) {
			$scope.ngDialogPromise = $http({
				method: 'get',
				url: serverUrls.courtyardAllList
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.CourtyardList =$scope.CourtyardList.concat(response.Content);
					$scope.BuildingList = $scope.BuildingList.concat($scope.CourtyardList[1].Location);
					if(x==undefined){
						$scope.location[0].opts1=$scope.CourtyardList;
						$scope.location[0].value1=$scope.CourtyardList[0].Id;
						$scope.location[0].opts2=$scope.BuildingList;
						$scope.location[0].value2=$scope.BuildingList[0].Id;
						$scope.location[0].value3=$scope.BuildingList[0].Id;
						$scope.location[0].value4=$scope.BuildingList[0].Id;
					}else{
						$scope.location[0].opts1=$scope.CourtyardList;
						$scope.location[0].opts2=$scope.BuildingList;
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		var getAlloptions = function(item,type,id,url){
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: 'get',
				url: url + "?id=" + id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				var Content = response.Content;
				var arr=[];
				    
				if(Code === 0) {
					if(type===2){
						Content.map(function(v){
					    	arr.push({
					    		Id:v.Id,
					    		Name:v.Name
					    	});
					    })
						 item[0].opts3 = arr;
					 }
					 if(type===4){
					 	Content.map(function(v){
				    	arr.push({
				    		Id:v.Id,
				    		Name:v.RoomNumber
				    	  });
				        })
					 	item[0].opts4 = arr;
					 }
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
			
		}
		//1--待审核，2--已通过，3--未通过，4--待提交
		var getSuperior = function($scope, id, item,type,defered) {
			console.log(type)
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: 'get',
				url: serverUrls.getSuperior + "?id=" + id + "&type="+type
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					console.log('response',response)
					var Superior = response.Content;
					var CourtyardId = Superior.CourtyardId;
					var BuildingId = Superior.BuildingId;
					var UnitId = Superior.UnitId;
					var FloorId = Superior.FloorId;
					var Id = Superior.Id;
					item[0].value1 = CourtyardId;
					item[0].value2 =BuildingId;
					var url='';
					if(type===2){
						getAlloptions(item,type,BuildingId,serverUrls.getAll)
						item[0].value3 = UnitId;
					}
					if(type===4){
						  getAlloptions(item,2,BuildingId,serverUrls.getAll);
						  item[0].value3 = UnitId;
					 	  getAlloptions(item,type,UnitId,serverUrls.unitHouseList);
					       item[0].value4 = Id;
					  
					}
					// $scope.choseUnit
				
					if(defered){
						defered.resolve();
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		//提交和撤回
		$scope.submit = function(x) {
			var text='操作成功';
			var state=(x.State===1 ? 2 : 1 );
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: 'get',
				url: serverUrls.FinanceProjectOpenClose+'?id='+x.Id+"&state="+state
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					if(state==2){
						layerAlert.autoclose("保密"+text+'!');
					}else{
						layerAlert.autoclose("公开"+text+'!');
					}
					$scope.fetchData();
				} else {
					layerAlert.autoclose(Message);
				}

			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});

		};


		// 选择类型
		$scope.selectType = function(x) {
			$scope.selectTypeId = x;
		}
		$scope.callFundsTwo = 0;
		$scope.selectTypeSeach = function(x) {

			$scope.fundationName.forEach(function(item, index) {
				if (item.Id === x) {
					$scope.callFunds = item.BalanceQuantity;
					$scope.callFundsTwo = item.BalanceQuantity;
				}
			});

		};
		//对手机号码验证
		var phoneCheck = function(val) {
				var flag = true;
				var patternTwo = /^0\d{2,3}-?\d{7,8}$/;
				var pattern = /^1[3|4|5|8][0-9]\d{4,8}$/;

				if (pattern.test(val) || patternTwo.test(val)) {
					flag = true;
				} else {
					flag = false;
				}
				return flag;
		}
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
			}
			//检验金额
		var moneyCheck = function(val) {
			var flag = true;
			/* /^[1-9]d*.d*|0.d*[1-9]d*$/*/
			var patternName = /^([1-9][\d]{0,20}|0)(\.[\d]{1,2})?$/;
			if (patternName.test(val)) {
				flag = true;
			} else {
				flag = false;
			}
			return flag;
		};

		//时间插件  	
		$("#datetime").datetimepicker({
			language: 'zh-CN',
			weekStart: 1,
			minView: "month",
			todayBtn: 1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			forceParse: 0,
			format: "yyyy-mm-dd",
			showMeridian: 1
		}).on("click", function(ev) {
			$("#datetime").datetimepicker();
		});


		//分页查询基金列表
		$scope.fetchData = function() {
            PagerExtends.regListSpecifyPage($scope, {
						apiUrl: serverUrls.GetPassedList,
						params: $scope.searchOption,
						success: function(response) {
							$scope.list = response;
							$scope.list.map(function(v){
								v.Amount = v.Amount+'.00';
							})
						},
						error: function(error) {
							layerAlert.autoclose(PcService.errorResult(error));
						}
					}, $rootScope.pHeader);


		};
		$scope.fetchData();


		//删除基金录入和使用
		$scope.deletelItem = function(x) {
			var url = '';
			var method = "delete";
			var id = x.Id;
			url = serverUrls.delFinanceProject
			layerAlert.checkone("选择操作", function() {
				deletelItemData($scope, method, id, url);
			}, function() {
				return;
			}, "确定", "取消", true, true, "确定要删除吗?");

		};

		var deletelItemData = function($scope, method, id, url) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: method,
				url: url + "?id=" + id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					setTimeout(function() {
						layerAlert.autoclose("删除成功");
					}, 1000);
					$scope.fetchData();
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};


		var getFormData = function(fieldsList) {
			var data = {};
			fieldsList.forEach(function(item, index) {
				if (item.editor === "multiselect") {
					var types = "";
					item.opts.forEach(function(_item, _index) {
						if (_item.Checked) {
							types += _item.Id + ",";
						}
					});
					types = types.substring(0, types.length - 1);
					data[item.name] = types;
				} else {
					data[item.name] = item.value;
				}
			});
			return data;
		};
		$scope.typeId = function(val){
			var type = 0;
			for(var i = 0 ;i<val.length;i++){
				if(val[i].indexOf('/')!==-1){
					type+=1;
				}
			}

			return type;
		}
		//新增管理
		$scope.fundationName = []
		$scope.creatOne = function(x){
			var editImgd = [];
			if(x){
				 var defered=$q.defer();
				 var promises=defered.promise;
				 var typeId = $scope.typeId(x.SeatName);
				 getSuperior($scope, x.Seat, $scope.location,typeId,defered);
				 // promises.then( function(){
					 	ngDialog.openConfirm({
						template: 'createTwo',
						scope: $scope,
						controller: ["$scope", function($scope) {
							  $scope.TitleText ='修改'+x.Name+'基金';
							   $scope.typeShow = false;
							   getCourtyardList($scope,x);
							   $scope.newsAdd.Name = x.Name;
                               $scope.newsAdd.ReviewState = x.ReviewState;
                               $scope.newsAdd.FinancesType = x.FinancesType;
                               $scope.newsAdd.Amount = x.Amount;
                               $scope.newsAdd.Remarks = x.Remarks;
                               editImgd =(x.Images).split(',');
                               console.log(editImgd)
                               $scope.newsAdd.OneImages =  editImgd[0];
                               $scope.newsAdd.TwoImages =  editImgd[1];
                               $scope.newsAdd.ThreeImages =  editImgd[2];
                               $scope.newsAdd.FourImages =  editImgd[3]	
							//新增基金使用
							$scope.formSubmit = function() {
								var method='', url='', data={},arr=[];
								var moneyFlag = moneyCheck($scope.newsAdd.Amount);
								if($scope.location[0].value1==0){
									layerAlert.autoclose("请选择位置");
									return;
								}
								if($scope.newsAdd.FinancesType==-1){
									layerAlert.autoclose("请选择类型");
								}
								if(!moneyFlag){
									layerAlert.autoclose("金额输入不合法");
									return;
								}

								$scope.Seat = $scope.location[0].value4!==0 ? $scope.location[0].value4 :
								            ($scope.location[0].value3!==0 ? $scope.location[0].value3 :
								           	($scope.location[0].value2!==0 ? $scope.location[0].value2 : 
								           	$scope.location[0].value1));
								$scope.type = $scope.location[0].value4!==0 ? 4 :
								            ($scope.location[0].value3!==0 ? 2 :
								           	($scope.location[0].value2!==0 ? 1 : 
								            0));
								if($scope.newsAdd.OneImages !== undefined){
 									 arr.push($scope.newsAdd.OneImages);
								}else{
									 arr.push('img/upload.png');
								}
								if($scope.newsAdd.TwoImage !== undefined){
 									 arr.push($scope.newsAdd.TwoImage);
								}else{
									 arr.push('img/upload.png');
								}
								if($scope.newsAdd.ThreeImages !== undefined){
 									 arr.push($scope.newsAdd.ThreeImages);
								}else{
									 arr.push('img/upload.png');
								}
								if($scope.newsAdd.FourImages !== undefined){
 									 arr.push($scope.newsAdd.FourImages);
								}else{
									 arr.push('img/upload.png');
								}

								 $scope.newsAdd.Images = arr.join(',');
								 method='put';
								 data={
										  "Id":x.Id,
										  "Name": $scope.newsAdd.Name,
										  "Remarks": $scope.newsAdd.Remarks,
										  "Seat": $scope.Seat,
										  "Amount":  $scope.newsAdd.Amount,
										  "Images": $scope.newsAdd.Images,
										  "FinancesType": $scope.newsAdd.FinancesType,
										  "ReviewState": $scope.newsAdd.ReviewState,
										  "Type":$scope.type
										};
									url=serverUrls.upFinanceProject

								formSubmitFun($scope, method, url, data)
							
							};

							//取消按钮
							$scope.closeDialog = function() {
								$scope.closeThisDialog();
							};

				        }],
						className: 'ngdialog-theme-default',
						//closeByEscape: true,
						closeByDocument: false,
						width: 1000,
				        })
					 // });
			}else{
                	ngDialog.openConfirm({
						template: 'createTwo',
						scope: $scope,
						controller: ["$scope", function($scope) {
								$scope.TitleText ='新增项目基金';
								$scope.typeShow = true;
								getCourtyardList($scope);
								$scope.newsAdd.Name = '';
                                $scope.newsAdd.ReviewState = 0;
                                $scope.newsAdd.FinancesType =  '';
                                $scope.newsAdd.Amount = '';
                                $scope.newsAdd.Remarks = '';
                                $scope.newsAdd.Images = ''
                                $scope.newsAdd.OneImages =  $scope.defaultImageSrc;
                                $scope.newsAdd.TwoImages =  $scope.defaultImageSrc;
								$scope.newsAdd.ThreeImages =  $scope.defaultImageSrc;
								$scope.newsAdd.FourImages =  $scope.defaultImageSrc;
							//新增基金使用
							$scope.formSubmit = function() {
								var method='', url='', data={},arr=[];
								var moneyFlag = moneyCheck($scope.newsAdd.Amount);
								if($scope.location[0].value1==0){
									layerAlert.autoclose("请选择位置");
									return;
								}
								if($scope.newsAdd.FinancesType==-1){
									layerAlert.autoclose("请选择类型");
								}
								if(!moneyFlag){
									layerAlert.autoclose("金额输入不合法");
									return;
								}

								$scope.Seat = $scope.location[0].value4!==0 ? $scope.location[0].value4 :
								            ($scope.location[0].value3!==0 ? $scope.location[0].value3 :
								           	($scope.location[0].value2!==0 ? $scope.location[0].value2 : 
								           	$scope.location[0].value1));
								$scope.type = $scope.location[0].value4!==0 ? 4 :
								            ($scope.location[0].value3!==0 ? 2 :
								           	($scope.location[0].value2!==0 ? 1 : 
								            0));
								if($scope.newsAdd.OneImages !== undefined){
 									 arr.push($scope.newsAdd.OneImages);
								}else{
									 arr.push('img/upload.png');
								}
								if($scope.newsAdd.TwoImage !== undefined){
 									 arr.push($scope.newsAdd.TwoImage);
								}else{
									 arr.push('img/upload.png');
								}
								if($scope.newsAdd.ThreeImages !== undefined){
 									 arr.push($scope.newsAdd.ThreeImages);
								}else{
									 arr.push('img/upload.png');
								}
								if($scope.newsAdd.FourImages !== undefined){
 									 arr.push($scope.newsAdd.FourImages);
								}else{
									 arr.push('img/upload.png');
								}

								 $scope.newsAdd.Images = arr.join(',');
							    method='post';
									data={
										  "Name": $scope.newsAdd.Name,
										  "Remarks": $scope.newsAdd.Remarks,
										  "Seat": $scope.Seat,
										  "Amount":  $scope.newsAdd.Amount,
										  "Images": $scope.newsAdd.Images,
										  "FinancesType": $scope.newsAdd.FinancesType,
										  "ReviewState": 1,
										  "ReportAt":new Date(),
										  "Type":$scope.type
										};
								url=serverUrls.addFinanceProject
								formSubmitFun($scope, method, url, data)
							
							};

							//取消按钮
							$scope.closeDialog = function() {
								$scope.closeThisDialog();
							};

				        }],
						className: 'ngdialog-theme-default',
						//closeByEscape: true,
						closeByDocument: false,
						width: 1000,
				        })
			}

			
	   };


		var formSubmitFun = function($scope, method, url, data) {
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: method,
				url: url,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				var Content = response.Content;
				if (Code === 0) {
					if(method=='put'){
						layerAlert.autoclose("修改成功");
					}else if(method=='post'){
						layerAlert.autoclose("添加成功");
					}
					
					$scope.fetchData();
					ngDialog.closeAll();

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		}

		//查看详情
		$scope.seeItem = function(x) {
			$state.go("app.appyfundManagementDetails", {
				Id: x.Id
			});

		}

		// 状态样式
		$scope.typeClass=function(id){
			var typeClass=''
			switch(id){
				case 1:
					 typeClass='thColor3'
				 	 break;
				case 2:
					 typeClass='thColor'
				 	 break;
				case 3:
					 typeClass='thColor2'
				 	 break;
				default:
				break;

			}
			return typeClass;
		}
	
}]);