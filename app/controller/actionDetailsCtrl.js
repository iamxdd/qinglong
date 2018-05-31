App.controller('actionDetailsCtrl', ['$scope', '$rootScope','$state', '$stateParams', '$location','$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService','$q','$filter',
	function($scope,$rootScope,$state, $stateParams,  $location, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService,$q,$filter) {
	$scope.PcService = PcService;
	$scope.list = [];
	var list = JSON.parse($stateParams.object);
	console.log('list',list)
		//选项卡
	$scope.navTabList = [{
		Id: 0,
		Name: "浏览",
		Active: true,
		show:true
	},{
		Id: 3,
		Name: "收藏",
		Active: false,
		show:true
	},{
		Id: 1,
		Name: "点赞",
		Active: false,
		show:true
	}, {
		Id: 2,
		Name: "分享",
		Active: false,
		show:true
	}, {
		Id: 5,
		Name: "参与",
		Active: false,
		show:true
	}];
	if(list.CategoryCode!=='activity'){
		$scope.navTabList[$scope.navTabList.length-1].show = false;
		$scope.title = '资讯报表详情';
	}else{
		$scope.title = '活动报表详情';
	}
	//详情页选项卡选择操作
	$scope.checked = function(x) {
		$scope.navTabList.forEach(function(item, index) {
			if (item.Name === x.Name) {
				item.Active = true;

			} else {
				item.Active = false;
			}
		});
		if ($scope.selectTab !== x) {
			$scope.selectTab = x;
			if (x.Id === 1) {
				$scope.tabTop = true;
				$scope.showOne = 1;
			} else {
				$scope.tabTop = false;

			}
			if (x.Id === 2) {
				$scope.showActivityStatus = 1;
				$scope.tabTopTwo = true;
			} else {
				$scope.tabTopTwo = false;
			}
			if (x.Id === 4) {
				$scope.showAffairStatus = 1;
				$scope.tabTopThree = true;
			} else {
				$scope.tabTopThree = false;
			}
			$scope.fetchData(x.Id);

		}

	};
	$scope.numtext=function(id,arr){
		var text = '';
		arr.forEach(function(v){
			if(id==v.Id){
				text = v.Name;
			}
		});
		return text;
	}

  $scope.fetchData = function(state) {
  	var param = {};
  	param.length = 10;
	param.currentPage = 1;
	param.state=state;
	param.id=list.Id;
  	PagerExtends.regListSpecifyPage($scope, {
					apiUrl: serverUrls.Visitlist,
					params:param,
					success: function(response) {
						$scope.list = response;
						$scope.list.map(function(v){
							if(v.UserName==null || v.UserName==''){
								v.UserName="匿名用户";
							}
						})
					},
					error: function(error) {
						layerAlert.autoclose(errorResult(error));
					}
				}, $rootScope.pHeader);
  }
  //默认选中详情首页tab
  $scope.selectTab = $scope.navTabList[0];
  $scope.fetchData(0);
	//新增管理
	$scope.creatOne = function() {
		ngDialog.openConfirm({
			template: 'createOne',
			controller: 'actionDetailsCtrl',
			className: 'ngdialog-theme-default',
			//closeByEscape: true,
			closeByDocument: false
		});
	};
}]);