App.controller('partyMechanismDetailCtrl', ['$scope', '$stateParams', '$state', '$rootScope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$q', '$compile',
	function($scope, $stateParams, $state, $rootScope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $q, $compile) {
		$scope.objectNum = JSON.parse($stateParams.object);
		$scope.isState = 0;
		console.log($scope.objectNum.Id)

		//获取党组织成员
		var partyMenber = [];
		$scope.partyorganizationpersonnellist = function() {
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: serverUrls.partyorganizationdetails + "?id=" + $scope.objectNum.Id 
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				var Content = response.Content;
				Content['PersonnelName'] = Content.PrincipalName;
				Content['PersonnelResidentStatus'] = Content.ResidentStatus;
				Content['childrens'] = Content.Personnel;
				Content['PersonnelImages']= Content.PrincipalImages
				delete Content.PrincipalName;
				delete Content.Personnel;
				delete Content.ResidentStatus;
				delete Content.PrincipalImages;
				var newchildren = [];
				var newObj = {};
				if (Code == 0) {
					if (Content) {
						var newarr = JSON.parse(JSON.stringify(Content).replace(/"Id":/gi, '"id":').replace(/"PersonnelName":/gi, '"name":'));
						newarr.childrens.map(function(v) {
							v['childrens'] = [];
							v['pid'] = 2
							if (v.hasOwnProperty('PersonnelImages') && (v.PersonnelImages == '' || v.PersonnelImages == null)) {
								v.PersonnelImages = "app/img/person.png";
							}
						});
					
							if(newarr['PersonnelImages'] == '' || newarr['PersonnelImages'] == null){
								newarr['PersonnelImages'] = "app/img/person.png";
							}
						newObj = {
							name: newarr.Name,
							id: -1,
							pid: null,
							childrens: [newarr]
						};
						newchildren.push(newObj)
						var showlist = $("<ul id='org' style='display:none'></ul>");
						console.log(newchildren)
						showall(newchildren, showlist);
						$("#jOrgChart").append(showlist);
						$("#org").jOrgChart({
							chartElement: '#jOrgChart', //指定在某个dom生成jorgchart
							dragAndDrop: false //设置是否可拖动
						});

					}
				} else {
					layerAlert.autoclose(Message);
				}

			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		$scope.partyorganizationpersonnellist();
		//开启关闭解散
		$scope.toggleItem = function(id) {

			var state = 0;
			var stateText = "";

			if (id == 1) {
				switch ($scope.PartyState) {
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
			} else if (id == 2) {
				state = 3;
				stateText = "解散";
			}


			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: serverUrls.ispartystate + "?id=" + $scope.objectNum.Id + "&state=" + state
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					layerAlert.autoclose(stateText + "操作成功!");
					$scope.getpartyorganizationdetails();
				} else {
					layerAlert.autoclose(Message);
				}

			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};
		$scope.PartyState;
		$scope.getpartyorganizationdetails = function() {
			var PartyNumber = parseInt($scope.objectNum.PartyNumber);
			$scope.listBusyPromise = $http({
				headers: $rootScope.pHeader,
				method: "get",
				url: serverUrls.getpartyorganizationdetails + "?partyNumber=" + PartyNumber
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if (Code === 0) {
					$scope.PartyState = response.Content.PartyState;
				} else {
					layerAlert.autoclose(Message);
				}

			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		}
		$scope.getpartyorganizationdetails();
		//开启关闭className
		$scope.isToggle = function(isState) {
			$scope.isState = $scope.objectNum.PartyState;
			return {
				'btn-success': $scope.PartyState === 2 || $scope.PartyState === 0 || $scope.PartyState === 3,
				'btn-danger': $scope.PartyState === 1
			};
		};

		function showall(menu_list, parent) {
			$.each(menu_list, function(index, val) {

				if (val.childrens.length > 0) {
					if (val.id === -1) {
						var li = $("<li class='first-li'></li>");
						li.append('<h4 class="party-title"> '+val.name +'</h4>').append("<ul></ul>").appendTo(parent);
						//递归显示
						showall(val.childrens, $(li).children().eq(1));
					} else {
						var li = $("<li></li>");
						li.append("<div class='party-div'><img  class='imgsrc' src= " + val.PersonnelImages + "  /><h5>负责人:" + val.name + "</h5><h5>居民ID:" + val.PersonnelResidentStatus + "</h5></div>").append("<ul></ul>").appendTo(parent);
						//递归显示
						showall(val.childrens, $(li).children().eq(1));
					}

				} else {
					$("<li></li>").append("<div class='party-div'><img class='imgsrc'  src=" + val.PersonnelImages + " /><h5>负责人:" + val.name + "</h5><h5>居民ID:" + val.PersonnelResidentStatus + "</h5></div>").append("<ul></ul>").appendTo(parent);
				}

			});
		}
	}
]);