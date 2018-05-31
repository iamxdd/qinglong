App.controller('shebeiguanliCtrl', ['$scope', '$rootScope','$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService','$q','$filter',
	function($scope,$rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService,$q,$filter) {
		$scope.newnavTabList = [{
			Id: 1,
			Name: "领用记录",
			Active: true
		},{
			Id: 2,
			Name: "归还记录",
			Active: false
		},{
			Id: 3,
			Name: "设备管理",
			Active: false
		}];
		$scope.Resident = {value: ""};
		// 表格数据
		$scope.devlist=[];
        $scope.selectTab = $scope.newnavTabList[0];
        $scope.requiredfield={required:true};
        //新增设备
        $scope.newDev={
        	// 新增领取设备记录
            TitleText:'新增领取设备记录',
        	//设备名称
        	DevName:'',
            //设备号
            DevId:'',
            //领用人
            LeadName:'',
            //电话
            LeadPhone:'',
            //描述
            Describe:'',
            //备注
            Remark:'' 
        }; 
       $scope.newEquipeDevName=[{
			Id: 0,
			Name: "请选择",
			Num:-1
		}];
		$scope.AddEquipeDevName=$scope.SelectName="请选择";
		$scope.newDevId=[{
			Id: 0,
			Name: "请选择",
			Phone:'无'
		}]; 
		$scope.ulInputData=[];
        //新增设备筛选
        $scope.DevnewSelect= [{Name:'可使用',Id:1},{Name:'使用中',Id:2},{Name:'已损坏',Id:3}];
        //归还设备状态记录
        $scope.newDevSelect=[{Name:'可使用',Id:2},{Name:'已损坏',Id:3}];
        //领用刷选
        $scope.UseBrush=[{value:'全部',index:0},{value:'使用中',index:1},{value:'已归还',index:2}];
          //归还筛选
        $scope.BackSelect= [{value:'全部',index:0},{value:'待归还',index:1},{value:'已归还',index:2}];
        //设备筛选
        $scope.DevSelect= [{value:'全部',index:0},{value:'可使用',index:1},{value:'使用中',index:2},{value:'已损坏',index:3}];
        //新增设备入库记录
        //
        $scope.newEquipment={
        	TitleTextTwo:'新增入库设备记录',
        	// 入库设备名称
        	DevName:'',
        	// 入库状态
        	DevCode:'',
        	// 入库设备号
        	DevId:'',
        	// 入库描述
        	Describe:'',
        	// 入库备注
            Remark:''
        };
       $scope.newBack={
       	 TitleTextBack:'归还记录'
       };
       $scope.EquipmentId=0;
       $scope.EquipmentDeviceNumber=0;
       // $scope.devID=0;

        //新增领取设备记录列表
		$scope.fieldsList = [{
				name: "NotifyBeforeVaildEndTime",
				nameDisplay: "使用时间",
				editor: "normal-select",
				required: false,
				value: "",
				lastName: "",
				originValue: "",
				opts: [{
					Id: 1,
					Name: "天"
				}, {
					Id: 2,
					Name: "时"
				}, {
					Id: 3,
					Name: "分"
				}],
				value1: 1
			},{
			editor: "textarea",
			name: "Describe",
			nameDisplay: "描述",
			required: false,
			value: "",
			originValue: ""
		},{
			editor: "textarea",
			name: "Remark",
			nameDisplay: "备注",
			required: false,
			value: "",
			originValue: ""
		}];
		//归还设备记录列表
		$scope.fieldsListBack = [{
			name: "BackEquipmenName",
			nameDisplay: "设备名称",
			editor: "normal",
			required: true,
			value: "",
			editable:true,
			originValue: "",
			isState:false,
			BackStateValue:'已归还'
		},{
			name: "BackEquipmenId",
			nameDisplay: "设备号",
			editor: "normal",
			required: true,
			value: "",
			editable:true,
			originValue: ""
		},{
			name: "BackName",
			nameDisplay: "归还人",
			editor: "normal",
			required: true,
			editable:true,
			value: "",
			originValue: ""
		},{
			name: "BackPhone",
			nameDisplay: "归还人电话",
			editor: "normal",
			required: false,
			value: "",
			editable:true,
			originValue: ""
		},{
			name: "DevBackCode",
			nameDisplay: "设备状态",
			editor: "select",
			required: true,
			value: $scope.newDevSelect[0].Id,
			opts: $scope.newDevSelect,
			originValue: 0
		},{
			editor: "textarea",
			name: "Describe",
			nameDisplay: "描述",
			required: false,
			value: "",
			editable:true,
			originValue: ""
		},{
			editor: "textarea",
			name: "Remark",
			nameDisplay: "备注",
			required: false,
			value: "",
			originValue: ""
		}];
		$scope.newId='无';
		$scope.serachData=[];
		//新增设备入库记录列表
		$scope.fieldsListTwo = [{
			name: "DevName",
			nameDisplay: "设备名称",
			editor: "normal",
			required: true,
			value: '',
			originValue: ""
		},{
			name: "DevCode",
			nameDisplay: "设备状态",
			editor: "select",
			required: true,
			value: $scope.DevnewSelect[0].Id,
			opts: $scope.DevnewSelect,
			originValue: 0
		},{
			name: "DevId",
			nameDisplay: "设备号",
			editor: "normal",
			required: true,
			value: '',
			originValue: ''
		},{
			editor: "textarea",
			name: "Describe",
			nameDisplay: "描述",
			required: false,
			value: "",
			originValue: ""
		},{
			editor: "textarea",
			name: "Remark",
			nameDisplay: "备注",
			required: false,
			value: "",
			originValue: ""
		}];
		// 查询字段
		$scope.searchOption = {
			value: "",
			state:0
		};
		$scope.newPhone='无';
		//对新增领取中的使用时间检验
	   var timeCheck=function(val){
    		var flag=true;
    		var pattern=/^[0-9]{1,8}$/; 
    		if(pattern.test(val)){
            	flag=true;
                if(val.length>1){
                	if(val[0]=='0'){
                      flag=false
                	}else{
                		flag=true;
                	}
                 }
	    	}else{
		       flag=false;
		    }	
           return flag;
	   }
	   //对手机号码验证
	   var phoneCheck=function(val){
	   	var flag=true;
	   	var pattern=/^1[3|4|5|8][0-9]\d{4,8}$/;
	   	if(pattern.test(val)){
	   		flag=true;
	   	}else{
	   		flag=false;
	   	}
	   	return flag;
	   }
      //检验设备名称
      var DevNameCheck=function(val){
      	var flag=true;
      	var patternName=/^[\u4E00-\u9FA5a-zA-Z0-9_]{1,32}$/;
		if(patternName.test(val)){
          flag=true;
    	}else{
	      flag=false;
	    }
	    return flag;
      }
      //检验设备号
      var DevIdCheck=function(val){
        var flag=true;
      	var patterId=/^[0-9a-zA-Z_]{1,18}$/;
		if(patterId.test(val)){
          flag=true;
    	}else{
	      flag=false;
	    }
	    return flag;
      }
	   $scope.PcService = PcService;
		//设备管理传递数据
       var dataListGet=function(url,params){  	
        	PagerExtends.regListSpecifyPage($scope, {
				apiUrl: url,
				params: params,
				success: function(response) { 
						$scope.devlist = response;
						if($scope.selectTab.Id===3){
							$scope.devlist.map(function(v){
								if(v.State===1){
	                              v.State='可使用';
								}else if(v.State===2){
	                                v.State='使用中';
								}else if(v.State===3){
									v.State='已损坏';
								}
							});
						}else if($scope.selectTab.Id===2){
							$scope.devlist.map(function(v){
								if(v.RecordState===1){
	                              v.RecordState='待归还';
	                               v.UpdatedAt=''
								}else if(v.RecordState===2){
	                                v.RecordState='已归还';
								}
							});
						}else if($scope.selectTab.Id===1){
							$scope.devlist.map(function(v){
								if(v.RecordState===1){
	                              v.RecordState='使用中';
								}else if(v.RecordState===2){
	                                v.RecordState='已归还';
								}
							});
						}				
				},
				error: function(error) {
					layerAlert.autoclose(error);
				}
			});
       };
		//页面初始化 查询
		$scope.devInit=function(id){
			var data={},url='',method='';
			data=$scope.searchOption;
			if(id===1 || id===2){
				url=serverUrls.equipmentrecordList;			
			}else if(id===3){
				url=serverUrls.equipmentList; 
			}

			dataListGet(url,data);
		};
		//第一次调用页面初始化
		$scope.devInit($scope.newnavTabList[0].Id);
		//选项卡选择操作
		$scope.newchecked = function(x) {
			$scope.selectTab = x;
			$scope.searchOption = {
			value: "",
			state:0
		    };
			$scope.newnavTabList.forEach(function(item, index) {
				if(item.Name === x.Name) {
					item.Active = true;
				} else {
					item.Active = false;
				}
			});
			$scope.devInit($scope.selectTab.Id);
		};
		
		var addNewData=function(url,method,data){
			$scope.ngDialogPromise = $http({
				headers:$rootScope.pHeader,
				method: method,
				url: url,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					// layerAlert.autoclose(title + "操作成功！");
					$scope.devInit($scope.selectTab.Id);
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
		//点击新增领取设备
		var newEquipmentF=function(url,method,data){
			$scope.fieldsList.map(function(v){
				v.value='';
			})
			$scope.Resident.value='';
			$scope.SelectName='请选择';
			$scope.newPhone='无';
			$scope.ngDialogPromise = $http({
				headers:$rootScope.pHeader,
				method: method,
				url: url,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				var content=response.Content;
				var newcontent=[];
				// console.log('content',content)
				content.map(function(v){
					if(v.State==1){
							newcontent.push({
							Id:v.DeviceNumber,
							Name:v.Name,
							Num:v.Id
						});
					}				
				})
				if(Code === 0) {
					if(newcontent.length>0){
						$scope.AddEquipeDevName=newcontent[0].Id;
						$scope.inputNum=newcontent[0].Id;
						// console.log(newcontent)
						$scope.devID=newcontent[0].Num
						// $scope.newEquipeDevName[0].Name=newcontent[0].Id;
						$scope.newEquipeDevName=newcontent;
					}
					
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		}
		
		var formSubmit=function(Id){
			var url='',data={},method='post';
			var today = new Date();
			var TimeUnit='';
			if($scope.fieldsList[0].value1==1){
                TimeUnit='天';
			}else if($scope.fieldsList[0].value1==2){
				TimeUnit='小时';

			}else{
               TimeUnit='分';
			}
		    switch(Id){
		    	case 1:
		    	url=serverUrls.addequipmentrecord;	
		    	data={
				   "EquipmentId": $scope.devID,
				   "ResidentStatus": $scope.newId,
				   "Phone": $scope.newPhone,
				   "UsingTime":$scope.fieldsList[0].value+TimeUnit,
				   "Describe":$scope.fieldsList[1].value,
				   "Remarks":$scope.fieldsList[2].value,
				   "RecordState": 1
		    	};
		    	
		    	var DevNameFlag=DevNameCheck($scope.Resident.value.replace(/\s/g, ""));
		    	if($scope.serachData.length==0){
		    		if(!DevNameFlag){
		    		 layerAlert.autoclose('领用人不合法,支持文字，数字，英文和下划线,请重新输入');
		    		 $scope.Resident.value='';
		    		return;
		    	 }
		    	}
		    		
		    	var phoneFlag=phoneCheck($scope.newPhone);
		    	if(!phoneFlag){
		    		 layerAlert.autoclose('号码输入不合法');
		    		 $(".inputPhone").value='';
		    		return;
		    	}
		    	var Timeflag=timeCheck($scope.fieldsList[0].value.replace(/\s/g, ""));
		    	if(!Timeflag){
		    		 layerAlert.autoclose('时间输入不合法,请重新输入');
		    		 $scope.fieldsList[0].value='';
		    		return;
		    	}
		    	
		    	addNewData(url,method,data);
		    	break;
		    	case 2:
		    	url=serverUrls.addequipmentrecord;	
		    	data={
		    	   "Id":$scope.NameId,
				   "EquipmentId": $scope.EquipmentId,
				   "ResidentStatus": $scope.fieldsListBack[2].value,
				   "Phone": $scope.fieldsListBack[3].value,
				   "UsingTime":$filter('date')(today, 'yyyy-MM-dd HH:mm'),
				   "Describe":$scope.fieldsListBack[5].value,
				   "Remarks":$scope.fieldsListBack[6].value,
				   "RecordState": $scope.fieldsListBack[4].value
		    	};	
		    	console.log('data=>',data)
		    	addNewData(url,method,data);
		    	break;
		    	case 3:
		    	url=serverUrls.addEquipment;
		    	data={
                   // "Id": 0,
				   "Name": $scope.fieldsListTwo[0].value,
				   "DeviceNumber": $scope.fieldsListTwo[2].value,
				   "Describe": $scope.fieldsListTwo[3].value,
				   "Remarks": $scope.fieldsListTwo[4].value,
				   "State": $scope.fieldsListTwo[1].value
		    	};
		    	var DevNameFlag=DevNameCheck($scope.fieldsListTwo[0].value.replace(/\s/g, ""));
		    	if(!DevNameFlag){
		    		 layerAlert.autoclose('设备名称输入不合法,支持文字，数字，英文和下划线,请重新输入');
		    		 $scope.fieldsListTwo[0].value='';
		    		return;
		    	}
                var DevIdFlag=DevIdCheck($scope.fieldsListTwo[2].value.replace(/\s/g, ""));
                if(!DevIdFlag){
		    		 layerAlert.autoclose('设备号输入不合法,支持英文,数字和下划线,请重新输入');
		    		 $scope.fieldsListTwo[2].value='';
		    		 return;
		    	}
		    	addNewData(url,method,data);
		    	break;
		    }

		};	
		// 获取搜索领用名字
		$scope.getResidentStatus = function(id,value) {
			if(id==1){
				setTimeout(function(){
				$scope.ulInputData=[];   
			if(!value) {
				$(".ulInput").css('display','none');
				return;
			}
			$(".ulInput").css('display','block');
			$scope.ngDialogPromise  = $http({
				method: 'get',
				url: serverUrls.negotiationList + "?value=" + value
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
                $scope.ResidentStatus = response.Content;
				if(Code === 0) {
					$scope.serachData=$scope.ResidentStatus;
					if($scope.ResidentStatus.length==0){
						$(".ulInput").css('display','none');
						$scope.newPhone=$(".inputPhone").val();
						$scope.newId='无';
					}
					if($scope.ResidentStatus && $scope.ResidentStatus.length > 0) {
						$scope.ulInputData=response.Content;
						$scope.SelectName=$scope.ResidentStatus[0].Id;
						$scope.newId=$scope.ResidentStatus[0].ResidentStatus;
						$scope.newPhone=$scope.ResidentStatus[0].Phone;
						$scope.newDevId[0].Name = $scope.ResidentStatus[0] ? $scope.ResidentStatus[0].Id : "";
					} else {
						$(".ulInput").css('display','none');
						// layerAlert.autoclose("当前关键字没有相关居民，请手动输入或者重新搜索！");
					}

				} else {
					$(".ulInput").css('display','none');
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		 },500)
			}
			
			
		};
		$scope.getnewPhone=function(){
			$scope.newPhone=$(".inputPhone").val();
		}
		$scope.hideLi=function(){
			setTimeout(function(){$(".ulInput").css('display','none');},3000)
		}
		$scope.getPhone=function(x,ulInputData){
			var count=0;		
			$scope.ulInputData.forEach(function(v,i){
				if(v.Name===x){
                   count=i;
				}
			});
			$scope.Resident.value=x;
			$scope.newId=$scope.ulInputData[count].ResidentStatus;
			$scope.newPhone=$scope.ulInputData[count].Phone;
			$(".ulInput").css('display','none');
		}
        $scope.getDevId=function(x,newEquipeDevName){
			var count=0;
			$scope.inputNum=x;
			$scope.newEquipeDevName.forEach(function(v,i){
				if(v.Id===x){
                   count=i;
				}
			});
			$scope.devID=$scope.newEquipeDevName[count].Num;
			console.log('$scope.devID',$scope.devID)
		}
		//点击弹出新增领取设备窗口  新增设备入库弹出设备窗口
		$scope.creatOne = function(Id) {
			ngDialog.openConfirm({
					template: 'createOne',
					scope:$scope,
					controller: ['$scope', function($scope){
						$scope.formSubmit = function() {
							formSubmit(Id);						
						};
					}],
					className: 'ngdialog-theme-default',
					closeByDocument: false,
					width: 600
				});
			if(Id==1){
				var url=serverUrls.equipmentall,data={},method='get';
				$scope.newId='无';
				// $scope.devID=''
				newEquipmentF(url,method,data);
			}
			if(Id==3){
				$scope.fieldsListTwo.map(function(v){
					if(v.editor=='select') return;
					 v.value=''
				})
			}

		};
		//点击归还记录
		$scope.BackF=function(x){
			$scope.EquipmentId=x.EquipmentId;
			$scope.NameId=x.Id;
			console.log('id=>',$scope.EquipmentId)
			$scope.EquipmentDeviceNumber=x.EquipmentDeviceNumber;
			$scope.creatOne($scope.selectTab.Id,x);
			$scope.fieldsListBack[0].value=x.EquipmentName;
			$scope.fieldsListBack[1].value=x.EquipmentDeviceNumber;
			$scope.fieldsListBack[2].value=x.RecipientsLoginName;
			$scope.fieldsListBack[3].value=x.Phone;
			$scope.fieldsListBack[5].value=x.Describe;
			$scope.fieldsListBack[6].value='';	
		}
	}]);