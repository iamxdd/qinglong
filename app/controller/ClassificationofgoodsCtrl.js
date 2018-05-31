App.controller('ClassificationofgoodsCtrl', ['$scope', '$rootScope','$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService','$q','$filter',
	function($scope,$rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService,$q,$filter) {
	$scope.PcService = PcService;
	$scope.searchOption = {
			value:'',
			categoryType:0
		};
	$scope.categoryType=[{
		Id:0,
		Name:'请选择'
	},{
		Id:2,
		Name:'经营类型'
	},{
		Id:3,
		Name:'优惠劵类型'
	},]
	$scope.nav = [{
      id:-1,
      Name:'商品类型',
      categoryType:2

	}, {
      id:-2,
      Name:'券类型',
      categoryType:3
	}];

    $scope.fetchData = function() {	
	   	PagerExtends.regListSpecifyPage($scope, {
			apiUrl: serverUrls.getlistbypage,
			params: $scope.searchOption,
			success: function(response) {
				// var onearr = response.filter(function(v){
				// 	return v.CategoryTypeId!==2
				// });
				// onearr.unshift({
				// 	Name:'优惠券类型',
				// 	CategoryTypeId:3,
				// 	line:true
				// });
				// var twoarr = response.filter(function(v){
				// 	return v.CategoryTypeId!==3
				// });
				// twoarr.unshift({
				// 	Name:'经营类型',
				// 	CategoryTypeId:2,
				// 	line:true
				// });
				// console.log('onearr',onearr);
				// console.log('twoarr',twoarr)
				// $scope.list = twoarr.concat(onearr);
				$scope.list = response;
				$scope.list.map(function(v){
					if(v.IconUrl=='' || v.IconUrl=='string' || v.IconUrl==undefined || v.IconUrl==null){
						v.IconUrl='';
					}
					// if(!v.line){
					// 	v.Name ='--' +v.Name;
					// }
					
					// if(v.CategoryType)
				});
				console.log($scope.list)
			},
			error: function(error) {
				layerAlert.autoclose(errorResult(error));
			}
		}, $rootScope.gHeader);
    }
    $scope.fetchData();
    $scope.newsAdd = {};
    $scope.configImageAfterUpload = function(url) {
			if(url) {
				$scope.newsAdd.MainPic = url !== 'img/upload.png' ? url : "";
			} else {
				layerAlert.autoclose('上传图片失败，请稍后再试！');
			}
		}
    //点击添加按钮 添加广告资讯
	$scope.creatOne = function(x) {
			ngDialog.openConfirm({
				template: "createOne",
				scope: $scope,
				controller: ['$scope', function($scope) {
					$scope.textTitle = (x==undefined ? '添加': '修改'+x.Name);
					if(x==undefined){
                       $scope.newsAdd.Name = '';
                       $scope.newsAdd.CategoryType = 0;
                       $scope.newsAdd.OrderNumber = '';
                       $scope.newsAdd.Remarks = ''
					}else{
                       $scope.newsAdd.Name = x.Name;
                       $scope.newsAdd.CategoryType = x.CategoryTypeId;
                       $scope.newsAdd.OrderNumber = x.OrderNumber;
                       $scope.defaultImageSrc=x.IconUrl;
                       $scope.newsAdd.Remarks = x.Remarks;
					}
					$scope.formSubmit = function() {
						if($scope.newsAdd.CategoryType == 0){
							layerAlert.autoclose('请选择类型');
							return;
						}
						if($scope.newsAdd.Name == ''){
							layerAlert.autoclose('请输入名称');
							return;
						}
						if($scope.newsAdd.MainPic == ''){
							layerAlert.autoclose('请上传缩略图');
							return;
						}
						var parren = /^(([0-9]\d?)|100)$/;
						if(!parren.test($scope.newsAdd.OrderNumber)){
							layerAlert.autoclose('排序输入不合法，请重新输入，只支持整数[0-99]');
							return;
						}
						var url='',data={};
						if(x==undefined){
                            url=serverUrls.addcategory;
                            data={
							  "CategoryType": $scope.newsAdd.CategoryType,
							  "Name": $scope.newsAdd.Name,
							  "IconUrl": $scope.newsAdd.MainPic,
							  "OrderNumber": $scope.newsAdd.OrderNumber
							};
						}else{
							url=serverUrls.updatecategory;
							data={
							   "Id": x.Id,
							  "CategoryType": $scope.newsAdd.CategoryType,
							  "Name": $scope.newsAdd.Name,
							  "IconUrl": $scope.newsAdd.MainPic,
							  "OrderNumber": $scope.newsAdd.OrderNumber
							};

						}
					formSubmit(url,data);

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
	var formSubmit = function(url,data){
		$scope.listBusyPromise = $http({
			headers: $rootScope.pHeader,
			method: 'post',
			url: url,
			data:data
		}).success(function(response) {
			var Code = response.State.Code;
			var Message = response.State.Message;
			if (Code === 0) {
				$scope.fetchData();	
				setTimeout(function() {
						ngDialog.closeAll();
					}, 200);	
			} else {
				layerAlert.autoclose(Message);
			}
		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});
	}

	$scope.deleteItem = function(x){
		layerAlert.checkone("执行删除操作", function() {
				$scope.listBusyPromise = $http({
					headers: $rootScope.pHeader,
					method: 'DELETE',
					url: serverUrls.deletebyid+'?id='+x.Id
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					if (Code === 0) {
						$scope.fetchData();
					} else {
						layerAlert.autoclose(Message);
					}
				}).error(function(error) {
					layerAlert.autoclose(PcService.errorResult(error));
				});

			}, function() {}, "确定", "取消", true, true);
		
	}
		
}]);
