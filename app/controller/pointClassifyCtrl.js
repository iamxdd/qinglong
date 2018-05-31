App.controller('pointClassifyCtrl', ['$scope', '$state', '$q', 'serverUrls', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', '$filter', 'PcService',
	function($scope, $state, $q, serverUrls, $rootScope, $http, ngDialog, PagerExtends, layerAlert, $filter, PcService) {
	
	$scope.list = [];
	$scope.PcService = PcService;
	$scope.openState = [{
		Id:0,
		Name:'请选择'
	},{
		Id:1,
		Name:'启用'
	},{
		Id:2,
		Name:'关闭'
	}];
	$scope.category = [{
		Id:0,
		Name:'请选择'
	},{
		Id:1,
		Name:'居民'
	},{
		Id:2,
		Name:'社区人员'
	},{
		Id:3,
		Name:'商家'
	}];
	// 积分来源查询
	$scope.searchOption={
		value:'',
		category:0,
		openState:0
	};
	// 积分兑换查询
	$scope.searchOption1={
		startAt: $filter('date')("", "yyyy-MM-dd"),
		endAt: $filter('date')("", "yyyy-MM-dd"),
		value:'',
		openState:0,
		cid:0
	};
	$scope.searchOption2 = {
       cid:0,
       svalue:''
	};
	$scope.fieldsList = [{
			name: "Name",
			nameDisplay: "名称",
			editor: "normal",
			required: true,
			value: '',
		},{
			editor: "textarea",
			name: "Description",
			nameDisplay: "描述",
			required: false,
			value: "",
			originValue: ""
	}];
	$scope.checkedGroup = [{
		Id: 1,
		Name: "积分分类",
		Active: true,
		Disabled: false,
		show:true
	}, {
		Id: 2,
		Name: "配置兑换规则",
		Active: false,
		Disabled: true,
		show:false
	}, {
		Id: 3,
		Name: "配置积分来源",
		Active: false,
		Disabled: true,
		show:false
	}];

	$scope.checkedItem = {
		Id: 1,
		Name: "积分分类",
		Active: true,
		disabled: true
	};
	$scope.addData = {
		Ratio:'',
		OpenState: 0,
		ValidStart: $filter('date')("", "yyyy-MM-dd"),
		ValidEnd: $filter('date')("", "yyyy-MM-dd"),
	};
	
	$scope.checked = function(x, workflowItem) {
			if(x.Disabled) {
				return;
			}
			$scope.checkedGroup.forEach(function(item, index) {
				if(index < x.Id) {
					item.Active = false;
					item.Disabled = false;
				} else {
					item.Active = false;
					item.Disabled = true;
				}
			});
			x.Active = true;
			x.disabled = false;
			$scope.checkedItem = x;
			x.show = true;
			if(x.Id==3){
				$scope.checkedGroup[1].show = false;
				$scope.checkedGroup[2].show = true
			}
			if(x.Id==2){
				//时间插件  开始时间
				setTimeout(function(){
					$("#startAttime").datetimepicker({
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
					$("#startAttime").datetimepicker();
				});

				

				//时间插件  结束时间	
				$("#endAtAttime").datetimepicker({
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
					$("#endAtAttime").datetimepicker();
				});
				},100)	
				
			}
			$scope.fetchData();
	};
	//配置节点
	$scope.configItem = function(x,index) {
		if(index==1){
			$scope.searchOption1.cid = x.Id;
			$scope.checkedGroup[1].Disabled = false;
			$scope.checked($scope.checkedGroup[1]);
		}else{
			$scope.searchOption2.cid = x.Id;
			$scope.checkedGroup[2].Disabled = false;
			$scope.checked($scope.checkedGroup[2]);
		}
	};
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
	$scope.numText=function(id,arr){
		var text='';
		arr.forEach(function(v){
			if(v.Id==id){
				text=v.Name;
			}
		});
		return text;
	}
	//分页查询基金列表
	$scope.fetchData = function() {
		var url='',params={};
		switch($scope.checkedItem.Id){
		 case 1:
		     url =  serverUrls.pointsourceclassify;
		     params = $scope.searchOption;
			 break
		 case 2:
		     url =  serverUrls.classifiedexchangelist;
		     params = $scope.searchOption1;
		 	 break
		 case 3:
		     url =  serverUrls.psclassifierpslist;
		     params = $scope.searchOption2;
			 break
		 default:
			 break;
		}
        PagerExtends.regListSpecifyPage($scope, {
					apiUrl:url ,
					params: params,
					success: function(response) {
						$scope.list = response;
						console.log(response)
					},
					error: function(error) {
						layerAlert.autoclose(PcService.errorResult(error));
					}
				}, $rootScope.pHeader);


		};
	$scope.fetchData();
	
	//新增积分分类
	$scope.creatOne = function(x) {
		var fieldsList = $scope.fieldsList;
		ngDialog.openConfirm({
			template: 'createOne',
			controller: ['$scope', function($scope) {
				$scope.fieldsList = fieldsList;
				if(x){
					$scope.fieldsList[0].value = x.Name;
//					$scope.fieldsList[1].value = x.Category;
					$scope.fieldsList[1].value = x.Description;

				}else{
					$scope.fieldsList[0].value = '';
//					$scope.fieldsList[1].value = 0;
					$scope.fieldsList[1].value = '';
				}
				$scope.formSubmit = function() {
					var method='', data={};
                    var DevNameCheckFlag = DevNameCheck($scope.fieldsList[0].value);
                    if(!DevNameCheckFlag){
                    	layerAlert.autoclose('名称输入不合法');
                    	return;
                    }
//                  if($scope.fieldsList[1].value==0){
//						layerAlert.autoclose("请选择人员类型");
//						return;
//					}
					if(x){
                     method='put';
                     data={
                     	  "Id":x.Id,
						  "Name": $scope.fieldsList[0].value,
//						  "Category": $scope.fieldsList[1].value,
						  "Description": $scope.fieldsList[1].value,
						};
					}else{
					  method='post';
					  data={
						  "Name": $scope.fieldsList[0].value,
//						  "Category": $scope.fieldsList[1].value,
						  "Description": $scope.fieldsList[1].value,
						}

					}

					formSubmit(method, data,serverUrls.addpointsourceclassify)

				}

				
				
			}],
			className: 'ngdialog-theme-default',
			//closeByEscape: true,
			closeByDocument: false,
			// width: 600
		});
	};
   	var formSubmit = function(method,data,url) {
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

		//删除数据
	$scope.deletelItem = function(x) {
		var url = '';
		var method = "delete";
		var id = x.Id;
		if($scope.checkedItem.Id==1){
			url = serverUrls.addpointsourceclassify;
		}else if($scope.checkedItem.Id==2){
			url = serverUrls.addclassifiedexchange;
		}
		
		layerAlert.checkone("选择操作", function() {
			deletelItemData($scope, method, id, url,'删除成功');
		}, function() {
			return;
		}, "确定", "取消", true, true, "确定要删除吗?");

	};

    deletelItemData = function($scope, method, id, url,text) {
		$scope.listBusyPromise = $http({
			headers: $rootScope.pHeader,
			method: method,
			url: url + "?id=" + id
		}).success(function(response) {
			var Code = response.State.Code;
			var Message = response.State.Message;
			if (Code === 0) {
				if(method == 'delete'){
					setTimeout(function() {
					layerAlert.autoclose(text);
				   }, 100);
				}
				if(method == 'put'){
					setTimeout(function() {
					layerAlert.autoclose("修改成功");
				   }, 100);
				}
				
				$scope.fetchData();
			} else {
				layerAlert.autoclose(Message);
			}
		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});
	};

	//积分兑换修改
  $scope.editItem=function(x){
  	    var url = '';
		var method = "put";
		var id = x.Id;
		url = serverUrls.addclassifiedexchange;
		deletelItemData($scope, method, id, url);
  }

  $scope.creatAdd = function(x){
	  	var url = serverUrls.pointsourceclassifier,data={},method='';
	  	console.log(x)
	  	if(x.Classify===null){
	  		method = 'post';
	  		data={
			  "Source": {

			    "Id": x.Source.Id
			  },
			  "Classify": {

			    "Id":$scope.searchOption2.cid
			  }

			};
			$scope.addServuls(method,url,data);
	  	}else{
		  		method = 'delete';
		  		layerAlert.checkone("选择操作", function() {
					deletelItemData($scope, method, x.Id, url,'取消成功');
				}, function() {
					return;
				}, "确定", "取消", true, true, "确定要取消吗?");
	  	}
   }

   $scope.addServuls = function(method,url,data){
  	  $scope.listBusyPromise = $http({
			headers: $rootScope.pHeader,
			method: method,
			url: url,
			data:data
		}).success(function(response) {
			var Code = response.State.Code;
			var Message = response.State.Message;
			if (Code === 0) {
				setTimeout(function() {
					layerAlert.autoclose("添加成功");
				 }, 100);
				$scope.fetchData();
			} else {
				layerAlert.autoclose(Message);
			}
		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});
   }


   //浮点数
	var floatCheck = function(val) {
			var flag = true;
			var patternName = /\d{1,}\.{0,1}\d{0,}/;
			if (patternName.test(val)) {
				flag = true;
			} else {
				flag = false;
			}
			return flag;
	}

   // 新增 修改积分兑换
  $scope.creatTwo = function(x){
		ngDialog.openConfirm({
			template: 'createTwo',
			scope:$scope,
			controller: ['$scope', function($scope) {
				 //时间插件  开始时间
				setTimeout(function(){
					$("#startAttime1").datetimepicker({
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
					$("#startAttime1").datetimepicker();
				});

				//时间插件  结束时间	
				$("#endAtAttime1").datetimepicker({
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
					$("#endAtAttime1").datetimepicker();
				});
				},100)	
					if(x){
						$scope.addData.Ratio = x.Ratio;
						$scope.addData.OpenState = x.OpenState
						$scope.addData.ValidStart = $filter('date')(x.ValidStart, "yyyy-MM-dd");
						$scope.addData.ValidEnd = $filter('date')(x.ValidEnd, "yyyy-MM-dd")
						

					}else{
						$scope.addData.Ratio = '';
						$scope.addData.OpenState = 0;
						$scope.addData.ValidStart = '';
						$scope.addData.ValidEnd = '';
					
					}
				$scope.formSubmit = function() {
					var method='', data={};
					var floatFlag= floatCheck(Number($scope.addData.Ratio));
					if(!floatFlag){
						layerAlert.autoclose("比例输入错误");
						return;
					}
					if($scope.addData.Ratio==''){
						layerAlert.autoclose("请输入比例");
						return;
					}
					if($scope.addData.OpenState==0){
						$scope.addData.OpenState=2;
					}
                    var startTime = (new Date($scope.addData.ValidStart)).getTime()/1000;
                    var endTime = (new Date($scope.addData.ValidEnd)).getTime()/1000;
                    if(startTime > endTime){
                    	layerAlert.autoclose("开始时间大于结束时间");
						return;
                    }
					if(x){
                     method='put';
                     data={
						  "Classify": {
						    "Id": $scope.searchOption1.cid
						  },
						  Ratio: $scope.addData.Ratio,
						  OpenState: $scope.addData.OpenState,
						  ValidStart: $scope.addData.ValidStart,
						  ValidEnd: $scope.addData.ValidEnd,
						  Id:x.Id
						};
					}else{
					  method='post';
					  data={
						  "Classify": {
						    "Id": $scope.searchOption1.cid
						  },
						  Ratio: $scope.addData.Ratio,
						  OpenState: $scope.addData.OpenState,
						  ValidStart: $scope.addData.ValidStart,
						  ValidEnd: $scope.addData.ValidEnd
						};

					}
					formSubmit(method, data,serverUrls.addclassifiedexchange)

				}

				
				
			}],
			className: 'ngdialog-theme-default',
			//closeByEscape: true,
			closeByDocument: false,
			// width: 600
		});
	
  }	
  $scope.OpenStop = function(x){
  	var state = (x.OpenState===1 ? 2 : 1);
  	$scope.listBusyPromise = $http({
			headers: $rootScope.pHeader,
			method: 'put',
			url: serverUrls.addclassifiedexchange,
			data:{
				Id:x.Id,
				OpenState:state
			}
		}).success(function(response) {
			var Code = response.State.Code;
			var Message = response.State.Message;
			if (Code === 0) {
				if(x.OpenState==2){
					setTimeout(function() {
					layerAlert.autoclose("启用成功");
				   }, 100);
				}
				if(x.OpenState==1){
					setTimeout(function() {
					layerAlert.autoclose("停用成功");
				   }, 100);
				}
				
				$scope.fetchData();
			} else {
				layerAlert.autoclose(Message);
			}
		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});
  }
  		      
}]);
