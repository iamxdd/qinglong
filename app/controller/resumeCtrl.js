App.controller("resumeCtrl", ['$scope', '$rootScope', '$stateParams', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', '$filter', 'serverUrls', 'PcService', '$q',
	function($scope, $rootScope, $stateParams, $http, ngDialog, PagerExtends, layerAlert, $filter, serverUrls, PcService, $q) {

		//性别列表
		$scope.sexes = [{
			Id: 1,
			Name: "男"
		}, {
			Id: 2,
			Name: "女"
		}];

		//社保状态列表
		$scope.socialsecurity = [{
			Id: 1,
			Name: "有社保"
		}, {
			Id: 2,
			Name: "无社保"
		}];

		//居住类型列表
		$scope.stayType = [{
			Id: 1,
			Name: "租赁房屋"
		}, {
			Id: 2,
			Name: "单位内部"
		}, {
			Id: 3,
			Name: "亲友家中"
		}, {
			Id: 4,
			Name: "自住"
		}];

		//最高学历
		$scope.Education = [{
			Id: 2,
			Name: "大专"
		}, {
			Id: 3,
			Name: "本科"
		}, {
			Id: 4,
			Name: "研究生"
		}, {
			Id: 5,
			Name: "博士及以上"
		}];

		//最高学历
		$scope.Education = [{
			Id: 2,
			Name: "大专"
		}, {
			Id: 3,
			Name: "本科"
		}, {
			Id: 4,
			Name: "研究生"
		}, {
			Id: 5,
			Name: "博士及以上"
		}];

		$scope.Nations = [{
			Id: 1,
			Name: "汉族"
		}, {
			Id: 2,
			Name: "藏族"
		}, {
			Id: 3,
			Name: "彝族"
		}, {
			Id: 4,
			Name: "其他少数民族"
		}];

		//政治面貌列表
		$scope.PoliticalStatuses = [{
			Id: 1,
			Name: "中共党员"
		}, {
			Id: 2,
			Name: "中共预备党员"
		}, {
			Id: 3,
			Name: "共青团员"
		}, {
			Id: 4,
			Name: "群众"
		}, {
			Id: 5,
			Name: "民革党员"
		}, {
			Id: 6,
			Name: "民盟盟员"
		}, {
			Id: 7,
			Name: "民建会员"
		}, {
			Id: 8,
			Name: "民进会员"
		}, {
			Id: 9,
			Name: "农工党党员"
		}, {
			Id: 10,
			Name: "致公党党员"
		}, {
			Id: 11,
			Name: "九三学社社员"
		}, {
			Id: 12,
			Name: "台盟盟员"
		}, {
			Id: 13,
			Name: "无党派民主人士"
		}];

		//人群类型
		$scope.Populations = [{
			Id: 1,
			Name: "常住人口"
		}, {
			Id: 2,
			Name: "流动人口"
		}];

		$scope.Keypopulation = [{
			Id: 1,
			Name: "是"
		}, {
			Id: 2,
			Name: "否"
		}];

		//重点人群类型
		$scope.PeopleType = [{
			Name: "孤寡老人",
			Id: 1
		}, {
			Name: "残疾人",
			Id: 2
		}, {
			Name: "高龄老人",
			Id: 3
		}, {
			Name: "低保户",
			Id: 4
		}, {
			Name: "失独老人",
			Id: 5
		}, {
			Name: "吸毒人群",
			Id: 6
		}, {
			Name: "劳改刑满释放人员",
			Id: 7
		}, {
			Name: "社区矫正人员",
			Id: 8
		}, {
			Name: "其他人员",
			Id: 9
		}];

		//婚姻状态
		$scope.maritalStatus = [{
			Id: 1,
			Name: "未婚"
		}, {
			Id: 2,
			Name: "已婚"
		}, {
			Id: 3,
			Name: "离异"
		}, {
			Id: 4,
			Name: "丧偶"
		}];

		$scope.PcService = PcService;
		$scope.x = JSON.parse($stateParams.x);
		var Id = $scope.x.Id;
		var KeyPopulation = $scope.x.KeyPopulation,
			KeyPopulations = "";
		for(var i = 0; i < KeyPopulation.length; i++) {
			KeyPopulations += (PcService.numberToText(KeyPopulation[i].PopulationType, $scope.PeopleType)) + "，";
		};
		KeyPopulations = KeyPopulations.substring(0, KeyPopulations.length - 1);
		$scope.x.KeyPopulations = KeyPopulations;
		$scope.listBusyPromise = $http({
			method: 'get',
			url: serverUrls.getresident + "?id=" + Id
		}).success(function(response) {
			var Code = response.State.Code;
			var Message = response.State.Message;
			if(Code === 0) {
				var DegreeInfomation = response.Content;
				var ConstructionText='';
				var SocietyText='';
				if(DegreeInfomation.WorkExperience!==''){
					DegreeInfomation.WorkExperience = JSON.parse(DegreeInfomation.WorkExperience);
				}
				
				$scope.x = $.extend(true, $scope.x, DegreeInfomation);
				console.log($scope.x.Construction)
				if($scope.x.Construction !==null  &&  $scope.x.Construction.length>0){
	                $scope.x.Construction.forEach(function(v,i){
	                	 ConstructionText += v.Name+'('+$scope.stateText(v.State)+')'+';';
	                })
				}
				if($scope.x.Society !==null  &&  $scope.x.Society.length>0){
	                $scope.x.Society.forEach(function(v,i){
	                	 SocietyText += v.Name+'('+$scope.stateText(v.State)+')'+';';
	                })
				}

				$scope.x.OrganRelation = ConstructionText+'  '+SocietyText;
			} else {
				layerAlert.autoclose(Message);
			}
		}).error(function(error) {
			layerAlert.autoclose(PcService.errorResult(error));
		});

		$scope.printMyResume = function() {
			window.print();
		};

		$scope.stateText=function(id){
			var text='';
			if(id==0){
				text='成员';
			}else if(id==1){
				text='负责人';
			}
			return text;
		}
	}
]);