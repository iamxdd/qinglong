App.controller('appyfundManagementDetailsCtrl', ['$scope', '$state', 'PcService', '$rootScope', 'serverUrls', '$q', '$stateParams', '$location', '$http', 'ngDialog', 'PagerExtends', 'layerAlert',
	function($scope, $state, PcService, $rootScope, serverUrls, $q, $stateParams, $location, $http, ngDialog, PagerExtends, layerAlert) {

		var Id = $stateParams.Id;
		$scope.DetailData = {};
		$scope.PcService = PcService;
		var initList = [{
						Id: 0,
						Name: "请选择"
					}];
		$scope.fetchData = function() {
			var url = serverUrls.FinanceProjectGetById;
			getData(url, Id, $scope);
		};
		var getData = function(url, id, $scope) {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: url + "?id=" + Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					$scope.DetailData = response.Content;
					$scope.DetailData.Amount = $scope.DetailData.Amount+'.00';
					$scope.imgs = ($scope.DetailData.Images.split(',')).filter(function(v) {
						return v!=='img/upload.png' && v!=='';
					});
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		$scope.fetchData();
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
		$scope.tdClass = function(value) {
			var classStyle = '';
			switch (value) {
				//1--待审核、2--已通过、3--未通过、4--待提交
				case 1:
					classStyle = 'todoAudit';
					break;
				case 2:
					classStyle = 'passAudit';
					break;
				case 3:
					classStyle = 'noAudit';
					break;
				case 4:
					classStyle = 'nosubmit';
					break;
				default:
					break;
			}
			return classStyle;
		};
		//删除
		$scope.deleteItem = function() {
			var url = serverUrls.delFinanceProject;
			deleteData(url);
		};
		var deleteData = function(url) {
			layerAlert.checkone("执行删除操作", function() {
				$scope.listBusyPromise = $http({
					headers: $rootScope.pHeader,
					method: 'delete',
					url: url + "?id=" + $scope.DetailData.Id
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					if (Code === 0) {
						layerAlert.autoclose('删除操作成功');
						$state.go("app.appyfundManagement", {
							reload: true
						});
					} else {
						layerAlert.autoclose(Message);
					}
				}).error(function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				});

			}, function() {}, "删除", "取消", true, true);
		};
		//基金录入审核和提交
		$scope.bannerBtn = function(number) {
			$scope.bannerNew = {};
			ngDialog.openConfirm({
				template: 'createTwo',
				scope: $scope,
				controller: ["$scope", function($scope) {
					var param = '';
					var url = '';
					var message = '';

					$scope.formSubmit = function() {

						switch (number) {
							case 1:
								//提交
								param = {
									"Id": $scope.DetailData.Id,
									"SubmitRemarks": $scope.bannerNew.Remarks
								};
								url = serverUrls.FinanceProjectSubmit;
								message = "提交";
								break
							case 2:
								//不通过
								param = {
									"Id": $scope.DetailData.Id,
									"ReviewState": 3,
									"ReviewRemarks": $scope.bannerNew.Remarks
								};
								url = serverUrls.FinanceProjectReview;
								message = "不通过";
								break;
							case 3:
								//通过
								param = {
									"Id": $scope.DetailData.Id,
									"ReviewState": 2,
									"ReviewRemarks": $scope.bannerNew.Remarks
								};
								url = serverUrls.FinanceProjectReview;
								message = "通过";
								break;
							default:
								break;
						}

						bannerF($scope, param, url, message);
					}
					$scope.closeDialog = function() {
						ngDialog.closeAll();
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});

		};
		var bannerF = function($scope, param, url, message) {
			$scope.ngDialogPromise = $http({
				headers: $rootScope.pHeader,
				method: "post",
				url: url,
				data: param
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					layerAlert.autoclose(message + "操作成功！");
					ngDialog.closeAll();
					$scope.fetchData();

				} else {

					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
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
					$scope.location[0].opts1=$scope.CourtyardList;
					$scope.location[0].opts2=$scope.BuildingList;
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
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

		$scope.editorItem = function(x) {
			
			var defered=$q.defer();
			var promises=defered.promise;
			var typeId = $scope.typeId(x.SeatName);
			getSuperior($scope, x.Seat, $scope.location,typeId,defered);
			 // promises.then( function(){
                ngDialog.openConfirm({
				template: 'createThreee',
				scope: $scope,
				controller: ["$scope", function($scope) {
							   $scope.TitleText = '修改'+x.Name+'基金';
							   getCourtyardList($scope);
							   $scope.newsAdd.Name = x.Name;
                               $scope.newsAdd.ReviewState = x.ReviewState;
                               $scope.newsAdd.FinancesType = x.FinancesType;
                               $scope.newsAdd.Amount = x.Amount;
                               $scope.newsAdd.Remarks = x.Remarks;
                               editImgd =(x.Images).split(',');
                               $scope.newsAdd.OneImages =  editImgd[0];
                               $scope.newsAdd.TwoImages =  editImgd[1];
                               $scope.newsAdd.ThreeImages =  editImgd[2];
                               $scope.newsAdd.FourImages =  editImgd[3]	
							//修改基金使用
							$scope.formSubmit = function() {
								var method='', url='', data={},arr=[];
								var moneyFlag = moneyCheck($scope.newsAdd.Amount);
								if($scope.location[0].value1==0){
									layerAlert.autoclose("请选择位置");
									return;
								}
								if($scope.newsAdd.FinancesType==-1){
									layerAlert.autoclose("请选择类型");
									return;
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
			 // })


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
	
}]);