App.controller('fundClassSettingCtrl', ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert','serverUrls','PcService', '$rootScope',function($scope, $http, ngDialog, PagerExtends, layerAlert,serverUrls,PcService,$rootScope) {
	$scope.list = [];

	//新增管理
	$scope.creatOne = function() {
		ngDialog.openConfirm({
			template: 'createOne',
			controller: 'classificationSettingsCtrl',
			className: 'ngdialog-theme-default',
			//closeByEscape: true,
			closeByDocument: false
		});
	};
	   // zTree 的参数配置，深入使用请参考 API 文档（setting 配置详解）
	     var setting = {
			 view:{
				addHoverDom: addHoverDom,
				removeHoverDom: removeHoverDom,
				selectedMulti: false,
				dblClickExpand : false, 
				showIcon:false,
				showLine: true
			},
			treeId:'',
			edit:{
				enable:true,
				editNameSelectAll: true,
				removeTitle : "删除",
				renameTitle : "修改",
				showRemoveBtn : showRemoveBtn,
				showRenameBtn : showRenameBtn
			},
			callback: {
				beforeEditName: beforeEditName,
				beforeRemove: beforeRemove,
                onClick: onClick
			},
			data: {
				simpleData: {
					enable : true,  
	                idKey : "id",       // 结点的id,对应到Json中的id  
	                pIdKey : "parentId",// 结点的pId,对应到Json中的parentId  
	                rootPId : 0         // 根节点设置为0  
				}
			},
	     };
	
       filter();
       var addId=0;
       var indexId=-1;
       var PId=0;
       var editName='';
       var editCode=0;
       var addName='';
       var chareditName='';
       var CategoryType=-1;
       var typeId=-1;
       $scope.jijingName='基金类型';
       $scope.cishanName='慈善类型';
 
	// 初始化数据
	function filter(){
		$scope.listBusyPromise = $http({
			        headers:$rootScope.pHeader,
					method: "get",
					url: serverUrls.GetList
					}).success(function(childNodes) {
						var Code = childNodes.State.Code;
						var Message = childNodes.State.Message;
						$scope.childContent=childNodes.Content;
						var i=0;
						if (!childNodes) return null;
						if(Code === 0) {
							$scope.childContent.map(function(v){
							v['open']=true;	
							if(v.name==$scope.jijingName){
								v['CategoryType']=1;
							}else if(v.name== $scope.cishanName){
								v['CategoryType']=2;
							}
						});
						    $.fn.zTree.init($("#treeDemo"), setting,$scope.childContent);	
						} else { 
							layerAlert.autoclose(Message);
						}
					}).error(function(error) {
						layerAlert.autoclose(PcService.errorResult(error));
					 });
		}
	function onClick(e,treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.expandNode(treeNode);
		}
    function beforeRemove(treeId, treeNode) {
    	var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.selectNode(treeNode);
            var isDeled=false;
             layerAlert.checkone("提示", function() {
                 $scope.listBusyPromise = $http({
                 	headers:$rootScope.pHeader,
					method: "DELETE",
					url: serverUrls.DeleteCategoryById+'?id='+treeNode.id
					}).success(function(response) {
						var Code = response.State.Code;
						var Message = response.State.Message;
						if(Code === 0) {
							isDeled= true;  
						    zTree.removeNode(treeNode, false);	
						} else {
							isDeled= false;  
							layerAlert.autoclose(Message);
						}
						return isDeled;
					}).error(function(error) {
						layerAlert.autoclose(PcService.errorResult(error));
					 });
			}, function() {
				  return;
			}, "确定", "取消", true, true, "你确定要删除"+treeNode.name+"分类吗？");
             return false
    	
        		
     }
	 // 增加按钮
	function addHoverDom(treeId, treeNode) {
		if(treeNode.level==0){
		    var mathData=Math.round(Math.random()*100);
			var sObj = $("#" + treeNode.tId + "_span");
			if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
			var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
				+ "' title='添加' onfocus='this.blur();'></span>";
			sObj.after(addStr);
			var btn = $("#addBtn_"+treeNode.tId);
			if (btn) btn.bind("click", function(){
				CategoryType=treeNode.CategoryType;
				// if(treeNode.CategoryType==1){
				// 	CategoryType=treeNode.children[0].CategoryType;
				// }
				// if(v['CategoryType']=1)
				addName=treeNode.name;
				addId=treeNode.id;
				indexId=0; 
				creatNewsTypes();
				return false;
			});
		}
			
		};
	function removeHoverDom(treeId, treeNode) {
			$("#addBtn_"+treeNode.tId).unbind().remove();
		};
	 //是否显示编辑按钮
	function showRenameBtn(treeId, treeNode){
		//获取节点所配置的noEditBtn属性值
	 	if(treeNode.level==0 ){
			return false;
		}else{
			return true;
		}
	}
	//是否显示删除按钮
	function showRemoveBtn(treeId, treeNode){
		// console.log("treeNode",treeNode)
	//获取节点所配置的noRemoveBtn属性值
		if(treeNode.level ==0 ){
			return false;
		}else{
			return true;
		}
	}
	// 在进行重命名之前，进行一下确认  
	function beforeEditName(treeId, treeNode) {
		console.log(treeNode)
	    indexId=1;
	    addId=treeNode.id; 
	    PId=treeNode.ParentId;
	    editName=treeNode.name;
        editCode=treeNode.Code;
         typeId=treeNode.CategoryType;
	    var zTree = $.fn.zTree.getZTreeObj("treeDemo");  
	    zTree.selectNode(treeNode);  
	    creatNewsTypes();
        return false;	
	} 
    var creatNewsTypes = function($scope) {
			var _scope = $scope;
			ngDialog.openConfirm({
				template: 'creatNewsTypes',
				controller: ["$scope", function($scope) {
					if(indexId==0){
						$scope.TitleText = "新增"+addName;
						$scope.fieldsList = [{
							name: "Name",
							nameDisplay: "名称",
							editor: "normal",
							required: true,
							value: "",
							originValue: ""
						    }];
					}else if(indexId==1){
                       $scope.TitleText = "修改"+editName+'名称';
						$scope.fieldsList = [{
							name: "Names",
							nameDisplay: "名称",
							editor: "normal",
							required: true,
							value: editName,
							originValue: ""
						    }];
					}
					$scope.formSubmit = function() {
						method="post";
						if(indexId==0){
							var url=serverUrls.AddCategory;
							var data={
								"Name":$scope.fieldsList[0].value,
								"Remark": " ",
								"CategoryType": CategoryType,
							};
						}else if(indexId==1){
							url=serverUrls.UpdateCategory
							var data={
								"Name":$scope.fieldsList[0].value,
								"Remark": " ",
								"CategoryType": typeId,
								"Id":addId,
								};
						}
						var EditNameFlag=DevNameCheck($scope.fieldsList[0].value.replace(/\s/g, ""));
						if(!EditNameFlag){
				    		 layerAlert.autoclose('名称不合法,支持文字，数字，英文和下划线,请重新输入');
				    		 $scope.fieldsList[0].value='';
				    		 if(indexId==0){
				    		 	$scope.fieldsList[1].value='';
				    		 }
				    		return;
				    	 }
						addDom($scope,method,url,data)
					};
				}],
				className: 'ngdialog-theme-default',
				//closeByEscape: true,
				closeByDocument: false,
				width: 600
			});
		};

	function addDom($scope,method,url,data){
		$scope.ngDialogPromise  = $http({
	            headers:$rootScope.pHeader,
				method: method ,
				url:  url ,
				data:data
				}).success(function(response) {
					console.log('$scope.parentId=>',$scope.parentId)
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					filter();
					layerAlert.autoclose('操作成功');
					ngDialog.closeAll();	
				    // return false;
				} else {
					layerAlert.autoclose(Message); 
				} 
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
	}

	//检验名称
   function DevNameCheck(val){
      	var flag=true;
      	var patternName=/^[\u4E00-\u9FA5a-zA-Z0-9_]{1,15}$/;
		if(patternName.test(val)){
          flag=true;
    	}else{
	      flag=false;
	    }
	    return flag;
  }	
		
}]);
