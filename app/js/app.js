if(typeof $ === 'undefined') {
	throw new Error('This application\'s JavaScript requires jQuery');
}

// APP START
// ----------------------------------- 

var App = angular.module('scoc', [
	'ngRoute',
	'ngAnimate',
	'ngStorage',
	'ngCookies',
	'pascalprecht.translate',
	'ui.bootstrap',
	'ui.router',
	'oc.lazyLoad',
	'cfp.loadingBar',
	'ngSanitize',
	'ngResource',
	'tmh.dynamicLocale',
	'ui.utils',
	'bw.paging',
	'cgBusy',
	'ngSanitize',
	'ui.load'
]);

App.run(["$http", "$rootScope", "$state", "$stateParams", '$window', '$templateCache', 'serverUrls', 'layerAlert',
	function($http, $rootScope, $state, $stateParams, $window, $templateCache, serverUrls, layerAlert) {
		// Set reference to access them from any scope
		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;
		$rootScope.$storage = $window.localStorage;

		// Uncomment this to disable template cache
		/*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
		    if (typeof(toState) !== 'undefined'){
		      $templateCache.remove(toState.templateUrl);
		    }
		});*/

		// Scope Globals
		// ----------------------------------- 

		$rootScope.app = {
			name: '智慧致强社区',
			description: '智慧街区试点项目',
			year: ((new Date()).getFullYear()),
			layout: {
				isFixed: true,
				isCollapsed: false,
				isBoxed: false,
				isRTL: false,
				horizontal: false,
				isFloat: false,
				asideHover: false,
				theme: 2,
				logoName: "致强社区"
			},
			useFullLayout: false,
			hiddenFooter: false,
			viewAnimation: 'ng-fadeInUp'
		};
		$rootScope.user = {
			name: '王晓武',
			job: '超级管理员',
			picture: 'app/img/user/08.jpg',
			token: ''
		};

		$rootScope.gHeader = {};
		$rootScope.pHeader = {};
		$rootScope.iHeader = {};
		//$rootScope.$locale = 'zh';

	}
]);

/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
	function($stateProvider, $locationProvider, $urlRouterProvider, helper) {
		'use strict';

		// Set the following to true to enable the HTML5 Mode
		// You may have to set <base> tag in index and a routing configuration in your server
		$locationProvider.html5Mode(false);

		// defaults to dashboard
		$urlRouterProvider.otherwise('/app/home');

		// 
		// Application Routes
		// -----------------------------------   
		$stateProvider
			.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: helper.basepath('app.html'),
				controller: 'AppController',
				resolve: helper.resolveFor('textAngular', 'ui.select', 'fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'whirl', 'angularBootstrapNavTree', 'kind-editor')
			})
			.state('app.home', {
				url: '/home',
				title: '管理首页',
				templateUrl: helper.basepath('home.html'),
				resolve: helper.resolveFor('flot-chart', 'flot-chart-plugins', 'ngGrid', 'ngDialog', 'homeCtrl'),
				controller: 'homeCtrl'

			})
			.state('app.event', {
				url: '/event',
				title: '待办事项',
				templateUrl: helper.basepath('daibanshixiang.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'filestyle', 'daibanshixiangCtrl'),
				controller: 'daibanshixiangCtrl'
			})
			.state('app.todoList', {
				url: '/todoList',
				title: '待办事项',
				templateUrl: helper.basepath('todoList.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'filestyle', 'todoListCtrl'),
				controller: 'todoListCtrl'
			}) //statistic-basicfound
			.state('app.infoUpload', {
				url: '/infoUpload',
				title: '事件上报中心',
				templateUrl: helper.basepath('xinxishangbao.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'xinxishangbaoCtrl'),
				controller: 'xinxishangbaoCtrl'
			})
			.state('app.eventHandle', {
				url: '/eventHandle',
				title: '事件进度查询',
				templateUrl: helper.basepath('shixiangchuli.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'shixiangchuliCtrl'),
				controller: 'shixiangchuliCtrl'
			})
			.state('app.deviceManagement', {
				url: '/deviceManagement',
				title: '设备管理',
				templateUrl: helper.basepath('shebeiguanli.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'shebeiguanliCtrl'),
				controller: 'shebeiguanliCtrl'
			})
			.state('app.employee', {
				url: '/employee',
				title: '员工管理',
				templateUrl: helper.basepath('yuangongguanli.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'yuangongguanliCtrl'),
				controller: 'yuangongguanliCtrl'
			})
			.state('app.build', {
				url: '/build',
				title: '建设中...',
				templateUrl: helper.basepath('building.html'),
				resolve: helper.resolveFor('flot-chart', 'flot-chart-plugins')
			})
			.state('app.shijian-changzhurenkou', {
				url: '/shijian-changzhurenkou',
				title: '常住人口列表',
				templateUrl: helper.basepath('shijian-changzhurenkou.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'changzhurenkouCtrl'),
				controller: 'changzhurenkouCtrl'
			})
			.state('app.peizhi-gongzuoliu', {
				url: '/peizhi-gongzuoliu',
				title: '工作流管理',
				templateUrl: helper.basepath('peizhi-gongzuoliu.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'gongzuoliuCtrl'),
				/*angular.extend(helper.resolveFor('ngDialog'), {
					tpl: function() {
						return {
							path: helper.basepath('peizhi-gongzuoliu-add1.html')
						};
					}
				}),*/
				controller: 'gongzuoliuCtrl'
			})
			.state('app.workGroups', {
				url: '/workGroups',
				title: '工作组管理',
				templateUrl: helper.basepath('workGroups.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'workGroupsCtrl'),
				controller: 'workGroupsCtrl'
			})
			.state('app.Owers', {
				url: '/Owers',
				title: '拥有者管理',
				templateUrl: helper.basepath('Owers.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'OwersCtrl'),
				controller: 'OwersCtrl'
			})
			.state('app.gongzuoliu-buzhou', {
				url: '/gongzuoliu-buzhou',
				title: '工作流管理-步骤配置',
				templateUrl: helper.basepath('gongzuoliu-buzhou.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'gzlbuzhouCtrl'),
				controller: 'gzlbuzhouCtrl'
			})
			.state('app.zuzhi-zuzhijiagou', {
				url: '/zuzhi-zuzhijiagou',
				title: '组织架构',
				templateUrl: helper.basepath('zuzhi-zuzhijiagou.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'zuzhijiagouCtrl'),
				controller: 'zuzhijiagouCtrl'
			})
			.state('app.zuzhi-gangweiguanli', {
				url: '/zuzhi-gangweiguanli',
				title: '岗位管理',
				templateUrl: helper.basepath('zuzhi-gangweiguanli.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'gangweiguanliCtrl'),
				controller: 'gangweiguanliCtrl'
			})
			.state('app.zuzhi-renyuanguanli', {
				url: '/zuzhi-renyuanguanli',
				title: '人员管理',
				templateUrl: helper.basepath('zuzhi-renyuanguanli.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'renyuanguanliCtrl'),
				controller: 'renyuanguanliCtrl'
			})
			.state('app.zuzhi-shetuanguanli', {
				url: '/zuzhi-shetuanguanli',
				title: '社团管理',
				templateUrl: helper.basepath('zuzhi-shetuanguanli.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'shetuanguanliCtrl'),
				controller: 'shetuanguanliCtrl'
			})
			.state('app.zuzhi-zizhizuzhi', {
				url: '/zuzhi-zizhizuzhi',
				title: '自治组织管理',
				templateUrl: helper.basepath('zuzhi-zizhizuzhi.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'zizhizuzhiCtrl'),
				controller: 'zizhizuzhiCtrl'
			})
			.state('app.zuzhi-zizhijuese', {
				url: '/zuzhi-zizhijuese',
				title: '自治角色管理',
				templateUrl: helper.basepath('zuzhi-zizhijuese.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'zizhijueseCtrl'),
				controller: 'zizhijueseCtrl'
			})
			.state('app.shequ-fangwuguanli', {
				url: '/shequ-fangwuguanli',
				title: '房屋管理',
				templateUrl: helper.basepath('shequ-fangwuguanli.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'fangwuguanliCtrl'),
				controller: 'fangwuguanliCtrl'
			})
			.state('app.shequ-juminguanli', {
				url: '/shequ-juminguanli',
				title: '人员管理',
				templateUrl: helper.basepath('shequ-juminguanli.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'juminguanliCtrl'),
				controller: 'juminguanliCtrl'
			})
			.state('app.shequ-cheliangguanli', {
				url: '/shequ-cheliangguanli',
				title: '车辆管理',
				templateUrl: helper.basepath('shequ-cheliangguanli.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'cheliangguanliCtrl'),
				controller: 'cheliangguanliCtrl'
			})
			.state('app.shequ-qiyeguanli', {
				url: '/shequ-qiyeguanli',
				title: '企业管理',
				templateUrl: helper.basepath('shequ-qiyeguanli.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'qiyeguanliCtrl'),
				controller: 'qiyeguanliCtrl'
			}).state('app.shijian-liudongrenkou', {
				url: '/shijian-liudongrenkou',
				title: '流动人口列表',
				templateUrl: helper.basepath('shijian-liudongrenkou.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'liudongrenkouCtrl'),
				controller: 'liudongrenkouCtrl'
			})
			.state('app.shijian-zhongdianrenqun', {
				url: '/shijian-zhongdianrenqun',
				title: '重点人群列表',
				templateUrl: helper.basepath('shijian-zhongdianrenqun.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'zhongdianrenqunCtrl'),
				controller: 'zhongdianrenqunCtrl'
			})
			.state('app.shijian-guanzhurenqun', {
				url: '/shijian-guanzhurenqun',
				title: '关注人群列表',
				templateUrl: helper.basepath('shijian-guanzhurenqun.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'guanzhurenqunCtrl'),
				controller: 'guanzhurenqunCtrl'
			})
			.state('app.shijian-zhuquqiye', {
				url: '/shijian-zhuquqiye',
				title: '驻区企业列表',
				templateUrl: helper.basepath('shijian-zhuquqiye.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'zhuquqiyeCtrl'),
				controller: 'zhuquqiyeCtrl'
			})
			.state('app.shijian-xinwengonggao', {
				url: '/shijian-xinwengonggao',
				title: '新闻公告管理',
				templateUrl: helper.basepath('shijian-xinwengonggao.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'xinwengonggaoCtrl'),
				controller: 'xinwengonggaoCtrl'
			})
			.state('app.shijian-juminjifen', {
				url: '/shijian-juminjifen',
				title: '居民积分管理',
				templateUrl: helper.basepath('shijian-juminjifen.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'juminjifenCtrl'),
				controller: 'juminjifenCtrl'
			})
			.state('app.shijian-minzhuxieshang', {
				url: '/shijian-minzhuxieshang',
				title: '民主协商管理',
				templateUrl: helper.basepath('shijian-minzhuxieshang.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'minzhuxieshangCtrl', 'flot-chart', 'flot-chart-plugins'),
				controller: 'minzhuxieshangCtrl'
			})
			.state('app.shijian-xieshanggongshi', {
				url: '/shijian-xieshanggongshi',
				title: '民主协商公示',
				templateUrl: helper.basepath('shijian-xieshanggongshi.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'xieshanggongshiCtrl', 'flot-chart', 'flot-chart-plugins'),
				controller: 'xieshanggongshiCtrl'
			})
			.state('app.shijian-wanggeguanli', {
				url: '/shijian-wanggeguanli',
				title: '自治单元管理',
				templateUrl: helper.basepath('shijian-wanggeguanli.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'wanggeguanliCtrl', 'flot-chart', 'flot-chart-plugins'),
				controller: 'wanggeguanliCtrl'
			})
			.state('app.huanwei-huanjingweisheng', {
				url: '/huanwei-huanjingweisheng',
				title: '环境卫生治理',
				templateUrl: helper.basepath('huanwei-huanjingweisheng.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'huanjingweishengCtrl'),
				controller: 'huanjingweishengCtrl'
			})
			.state('app.huanwei-chengguanshangbao', {
				url: '/huanwei-chengguanshangbao',
				title: '城管上报事项',
				templateUrl: helper.basepath('huanwei-chengguanshangbao.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'chengguanshangbaoCtrl'),
				controller: 'chengguanshangbaoCtrl'
			})
			.state('app.huanwei-wuranyuan', {
				url: '/huanwei-wuranyuan',
				title: '污染源事项',
				templateUrl: helper.basepath('huanwei-wuranyuan.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'wuranyuanCtrl'),
				controller: 'wuranyuanCtrl'
			})
			.state('app.anquan-anquanxiaofang', {
				url: '/anquan-anquanxiaofang',
				title: '安全消防事项',
				templateUrl: helper.basepath('anquan-anquanxiaofang.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'anquanxiaofangCtrl'),
				controller: 'anquanxiaofangCtrl'
			})
			.state('app.anquan-yichangqingkuang', {
				url: '/anquan-yichangqingkuang',
				title: '异常情况事项',
				templateUrl: helper.basepath('anquan-yichangqingkuang.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'yichangqingkuangCtrl'),
				controller: 'yichangqingkuangCtrl'
			})
			.state('app.anquan-shiyaoanquan', {
				url: '/anquan-shiyaoanquan',
				title: '食药安全事项',
				templateUrl: helper.basepath('anquan-shiyaoanquan.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'shiyaoanquanCtrl'),
				controller: 'shiyaoanquanCtrl'
			})
			.state('app.yuanluo-shipinjiankong', {
				url: '/yuanluo-shipinjiankong',
				title: '视频监控',
				templateUrl: helper.basepath('yuanluo-shipinjiankong.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'shipinjiankongCtrl'),
				controller: 'shipinjiankongCtrl'
			})
			.state('app.yuanluo-tingcheguanli', {
				url: '/yuanluo-tingcheguanli',
				title: '停车管理',
				templateUrl: helper.basepath('yuanluo-tingcheguanli.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'tingcheguanliCtrl'),
				controller: 'tingcheguanliCtrl'
			})
			.state('app.yuanluo-menjinguanli', {
				url: '/yuanluo-menjinguanli',
				title: '门禁管理',
				templateUrl: helper.basepath('yuanluo-menjinguanli.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'menjinguanliCtrl'),
				controller: 'menjinguanliCtrl'
			})
			.state('app.yuanluo-lvhuaguanli', {
				url: '/yuanluo-lvhuaguanli',
				title: '绿化管理',
				templateUrl: helper.basepath('yuanluo-lvhuaguanli.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'lvhuaguanliCtrl'),
				controller: 'lvhuaguanliCtrl'
			})
			.state('app.yuanluo-ziliaoguanli', {
				url: '/yuanluo-ziliaoguanli',
				title: '资料管理',
				templateUrl: helper.basepath('yuanluo-ziliaoguanli.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'ziliaoguanliCtrl'),
				controller: 'ziliaoguanliCtrl'
			})
			.state('app.yuanluo-shujucaiji', {
				url: '/yuanluo-shujucaiji',
				title: '数据采集',
				templateUrl: helper.basepath('yuanluo-shujucaiji.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'shujucaijiCtrl'),
				controller: 'shujucaijiCtrl'
			})
			.state('app.yuanluo-diantiguanli', {
				url: '/yuanluo-diantiguanli',
				title: '电梯管理',
				templateUrl: helper.basepath('yuanluo-diantiguanli.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'diantiguanliCtrl'),
				controller: 'diantiguanliCtrl'
			})
			.state('app.yuanluo-xiaofangguanli', {
				url: '/yuanluo-xiaofangguanli',
				title: '消防管理',
				templateUrl: helper.basepath('yuanluo-xiaofangguanli.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'xiaofangguanliCtrl'),
				controller: 'xiaofangguanliCtrl'
			})
			.state('app.yuanluo-jinchukouguanli', {
				url: '/yuanluo-jinchukouguanli',
				title: '进出口管理',
				templateUrl: helper.basepath('yuanluo-jinchukouguanli.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'jinchukouguanliCtrl'),
				controller: 'jinchukouguanliCtrl'
			})
			.state('app.zonghe-xinwenfabu', {
				url: '/zonghe-xinwenfabu',
				title: '新闻发布',
				templateUrl: helper.basepath('zonghe-xinwenfabu.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'xinwenfabuCtrl'),
				controller: 'xinwenfabuCtrl'
			})
			.state('app.zonghe-jifentiaozheng', {
				url: '/zonghe-jifentiaozheng',
				title: '积分调整',
				templateUrl: helper.basepath('zonghe-jifentiaozheng.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'jifentiaozhengCtrl'),
				controller: 'jifentiaozhengCtrl'
			})
			.state('app.zonghe-zhiyuanzhe', {
				url: '/zonghe-zhiyuanzhe',
				title: '志愿者列表',
				templateUrl: helper.basepath('zonghe-zhiyuanzhe.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'zhiyuanzheCtrl'),
				controller: 'zhiyuanzheCtrl'
			})
			.state('app.peizhi-shixiangmuban', {
				url: '/peizhi-shixiangmuban',
				title: '事项模板管理',
				templateUrl: helper.basepath('peizhi-shixiangmuban.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'shixiangmubanCtrl'),
				controller: 'shixiangmubanCtrl'
			})
			.state('app.peizhi-shixiangshili', {
				url: '/peizhi-shixiangshili',
				title: '模板实例查看',
				templateUrl: helper.basepath('peizhi-shixiangshili.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'shixiangshiliCtrl'),
				controller: 'shixiangshiliCtrl'
			})
			.state('app.peizhi-jifenguize', {
				url: '/peizhi-jifenguize',
				title: '积分规则',
				templateUrl: helper.basepath('peizhi-jifenguize.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'jifenguizeCtrl'),
				controller: 'jifenguizeCtrl'
			})
			.state('app.peizhi-zuzhileixing', {
				url: '/peizhi-zuzhileixing',
				title: '组织类型管理',
				templateUrl: helper.basepath('peizhi-zuzhileixing.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'zuzhileixingCtrl'),
				controller: 'zuzhileixingCtrl'
			})
			.state('app.peizhi-shangbaomuban', {
				url: '/peizhi-shangbaomuban',
				title: '信息上报模板',
				templateUrl: helper.basepath('peizhi-shangbaomuban.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'eventTemplateCtrl'),
				controller: 'eventTemplateCtrl'
			})
			.state('app.statistic-basicfound', {
				url: '/statistic-basicfound',
				title: '居民信息统计',
				templateUrl: helper.basepath('statistic-basicfound.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'scBasicfoundCtrl'),
				controller: 'scBasicfoundCtrl'
			})
			.state('app.statistic-housesInfo', {
				url: '/statistic-housesInfo',
				title: '房屋信息统计',
				templateUrl: helper.basepath('statistic-housesInfo.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'schousesInfoCtrl'),
				controller: 'schousesInfoCtrl'
			})
			.state('app.statistic-vehicleInfo', {
				url: '/statistic-vehicleInfo',
				title: '车辆信息统计',
				templateUrl: helper.basepath('statistic-vehicleInfo.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'scvehicleInfoCtrl'),
				controller: 'scvehicleInfoCtrl'
			})
			.state('app.statistic-infoUpload', {
				url: '/statistic-infoUpload',
				title: '信息上报统计',
				templateUrl: helper.basepath('statistic-infoUpload.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'scInfoUploadCtrl'),
				controller: 'scInfoUploadCtrl'
			})
			.state('app.tongji-maodunjiufen', {
				url: '/tongji-maodunjiufen',
				title: '矛盾纠纷统计',
				templateUrl: helper.basepath('tongji-maodunjiufen.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'maodunjiufenCtrl'),
				controller: 'maodunjiufenCtrl'
			})
			.state('app.tongji-xinfangtaizhang', {
				url: '/tongji-xinfangtaizhang',
				title: '信访台账统计',
				templateUrl: helper.basepath('tongji-xinfangtaizhang.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'xinfangtaizhangCtrl'),
				controller: 'xinfangtaizhangCtrl'
			})
			.state('app.tongji-gonganjingqing', {
				url: '/tongji-gonganjingqing',
				title: '公安警情统计',
				templateUrl: helper.basepath('tongji-gonganjingqing.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'gonganjingqingCtrl'),
				controller: 'gonganjingqingCtrl'
			})
			.state('app.tongji-shengchanyinhuan', {
				url: '/tongji-shengchanyinhuan',
				title: '生产隐患统计',
				templateUrl: helper.basepath('tongji-shengchanyinhuan.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'shengchanyinhuanCtrl'),
				controller: 'shengchanyinhuanCtrl'
			})
			.state('app.tongji-guanhuaiduixiang', {
				url: '/tongji-guanhuaiduixiang',
				title: '关怀对象统计',
				templateUrl: helper.basepath('tongji-guanhuaiduixiang.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'guanhuaiduixiangCtrl'),
				controller: 'guanhuaiduixiangCtrl'
			})
			.state('app.tongji-yuanluoxinxi', {
				url: '/tongji-yuanluoxinxi',
				title: '院落信息统计',
				templateUrl: helper.basepath('tongji-yuanluoxinxi.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'yuanluoxinxiCtrl'),
				controller: 'yuanluoxinxiCtrl'
			})
			.state('app.tongji-teshurenqunfuwu', {
				url: '/tongji-teshurenqunfuwu',
				title: '特殊人群服务统计',
				templateUrl: helper.basepath('tongji-teshurenqunfuwu.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'teshurenqunfuwuCtrl'),
				controller: 'teshurenqunfuwuCtrl'
			})
			.state('app.tongji-guanhuaiduixiangfuwu', {
				url: '/tongji-guanhuaiduixiangfuwu',
				title: '关怀对象服务统计',
				templateUrl: helper.basepath('tongji-guanhuaiduixiangfuwu.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'guanhuaiduixiangfuwuCtrl'),
				controller: 'guanhuaiduixiangfuwuCtrl'
			})
			.state('app.tongji-danweixunchangfuwu', {
				url: '/tongji-danweixunchangfuwu',
				title: '单位巡场服务统计',
				templateUrl: helper.basepath('tongji-danweixunchangfuwu.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'danweixunchangfuwuCtrl'),
				controller: 'danweixunchangfuwuCtrl'
			}) //.app.roles
			.state('app.roles', {
				url: '/roles',
				title: '角色菜单配置',
				templateUrl: helper.basepath('roles.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'rolesCtrl'),
				controller: 'rolesCtrl'
			}).state('app.acounts', {
				url: '/acounts',
				title: '用户角色分配',
				templateUrl: helper.basepath('acounts.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'acountsCtrl'),
				controller: 'acountsCtrl'
			}).state('app.menus', {
				url: '/menus',
				title: '菜单管理',
				templateUrl: helper.basepath('menus.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'menusCtrl'),
				controller: 'menusCtrl'
			})
			.state('app.addChangeUrl', {
				url: '/addChangeUrl',
				title: 'url中转设置',
				templateUrl: helper.basepath('addChangeUrl.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'addChangeUrlCtrl'),
				controller: 'addChangeUrlCtrl'
			})
			.state('app.projects', {
				url: '/projects',
				title: '版本管理',
				templateUrl: helper.basepath('projects.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'projectsCtrl'),
				controller: 'projectsCtrl'
			})
			.state('app.communityNews', {
				url: '/communityNews',
				title: '社区资讯',
				templateUrl: helper.basepath('communityNews.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'filestyle', 'communityNewsCtrl'),
				controller: 'communityNewsCtrl'
			})
			.state('app.newsDetail', {
				url: '/newsDetail/:Id&:Type',
				title: '资讯详情',
				templateUrl: helper.basepath('newsDetail.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'filestyle', 'newsDetailCtrl'),
				controller: 'newsDetailCtrl'
			})
			.state('app.advertisingInfo', {
				url: '/advertisingInfo',
				title: '广告资讯',
				templateUrl: helper.basepath('advertisingInfo.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'advertisingInfoCtrl'),
				controller: 'advertisingInfoCtrl'
			})
			.state('app.advertisingDetails', {
				url: '/advertisingDetails',
				title: '广告资讯/详情',
				templateUrl: helper.basepath('advertisingDetails.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'advertisingDetailsCtrl'),
				controller: 'advertisingDetailsCtrl'
			})
			.state('app.bannerNews', {
				url: '/bannerNews',
				reload: true,
				title: 'banner广告',
				templateUrl: helper.basepath('bannerNews.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'bannerNewsCtrl'),
				controller: 'bannerNewsCtrl'
			})
			.state('app.bannerNewsDetails', {
				url: '/bannerNewsDetails/:object',
				title: 'banner广告详情',
				templateUrl: helper.basepath('bannerNewsDetails.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'bannerNewsDetailsCtrl'),
				controller: 'bannerNewsDetailsCtrl'
			})
			.state('app.reportOfmation', {
				url: '/reportOfmation',
				title: '资讯统计报表',
				templateUrl: helper.basepath('reportOfmation.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'reportOfmationCtrl'),
				controller: 'reportOfmationCtrl'
			})
			.state('app.actionDetails', {
				url: '/actionDetails/:object',
				title: '活动报表详情',
				templateUrl: helper.basepath('actionDetails.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'actionDetailsCtrl'),
				controller: 'actionDetailsCtrl'
			})
			.state('app.classificationSettings', {
				url: '/classificationSettings',
				title: '资讯分类设置',
				templateUrl: helper.basepath('classificationSettings.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'classificationSettingsCtrl'),
				controller: 'classificationSettingsCtrl'
			})
			.state('app.AdvertClassification', {
				url: '/AdvertClassification',
				title: '广告推送设置',
				templateUrl: helper.basepath('AdvertClassification.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'AdvertClassificationCtrl'),
				controller: 'AdvertClassificationCtrl'
			})
			.state('app.drafts', {
				url: '/drafts',
				title: '资讯草稿箱',
				templateUrl: helper.basepath('drafts.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'draftsCtrl'),
				controller: 'draftsCtrl'
			})
			.state('app.adDrafts', {
				url: '/adDrafts',
				title: '广告草稿箱',
				templateUrl: helper.basepath('adDrafts.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'adDraftsCtrl'),
				controller: 'adDraftsCtrl'
			})
			.state('app.recycleBin', {
				url: '/recycleBin',
				title: '资讯回收站',
				templateUrl: helper.basepath('recycleBin.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'recycleBinCtrl'),
				controller: 'recycleBinCtrl'
			})
			.state('app.adRecycleBin', {
				url: '/adRecycleBin',
				title: '广告回收站',
				templateUrl: helper.basepath('adRecycleBin.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'adRecycleBinCtrl'),
				controller: 'adRecycleBinCtrl'
			})
			.state('app.familyCircle', {
				url: '/familyCircle',
				title: '家庭圈子',
				templateUrl: helper.basepath('familyCircle.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'familyCircleCtrl'),
				controller: 'familyCircleCtrl'
			})
			.state('app.neighborhoodCircle', {
				url: '/neighborhoodCircle',
				title: '邻里圈',
				templateUrl: helper.basepath('neighborhoodCircle.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'neighborhoodCircleCtrl'),
				controller: 'neighborhoodCircleCtrl'
			})
			.state('app.seeDetails', {
				url: '/seeDetails/:object',
				title: '邻里圈/详情',
				templateUrl: helper.basepath('seeDetails.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'seeDetailsCtrl'),
				controller: 'seeDetailsCtrl'
			})
			.state('app.fundManagement', {
				url: '/fundManagement/:selected&:tabId',
				title: '院落基金管理',
				reload: true,
				templateUrl: helper.basepath('fundManagement.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'fundManagementCtrl'),
				controller: 'fundManagementCtrl'
			})
			.state('app.appyfundManagement', {
				url: '/appyfundManagement',
				title: '出资项目管理',
				templateUrl: helper.basepath('appyfundManagement.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'appyfundManagementCtrl'),
				controller: 'appyfundManagementCtrl'
			})
			.state('app.appyfundManagementDetails', {
				url: '/appyfundManagementDetails/:Id',
				title: '基金申请管理详情',
				templateUrl: helper.basepath('appyfundManagementDetails.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'appyfundManagementDetailsCtrl'),
				controller: 'appyfundManagementDetailsCtrl'
			})
			.state('app.fundationDetails', {
				url: '/fundationDetails/:Id&:selectedId&:tabId',
				title: '基金管理详情',
				templateUrl: helper.basepath('fundationDetails.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'fundationDetailsCtrl'),
				controller: 'fundationDetailsCtrl'
			})
			.state('app.charitableManagement', {
				url: '/charitableManagement',
				title: '慈善管理',
				templateUrl: helper.basepath('charitableManagement.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'charitableManagementCtrl'),
				controller: 'charitableManagementCtrl'
			})
			/*.state('app.fundClassSetting', {
				url: '/fundClassSetting',
				title: '类型设置',
				templateUrl: helper.basepath('fundClassSetting.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'fundClassSettingCtrl'),
				controller: 'fundClassSettingCtrl'
			})*/
			.state('app.courtyardSquare', {
				url: '/courtyardSquare',
				title: '院落广场',
				templateUrl: helper.basepath('courtyardSquare.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'courtyardSquareCtrl'),
				controller: 'courtyardSquareCtrl'
			})
			.state('app.PartyMembers', {
				url: '/PartyMembers',
				title: '党员信息',
				templateUrl: helper.basepath('PartyMembers.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'PartyMembersCtrl'),
				controller: 'PartyMembersCtrl'
			})
			.state('app.PartyCancellation', {
				url: '/PartyCancellation',
				title: '党员注销',
				templateUrl: helper.basepath('PartyCancellation.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'PartyCancellationCtrl'),
				controller: 'PartyCancellationCtrl'
			})
			.state('app.PartyInformation', {
				url: '/PartyInformation',
				title: '党组资讯',
				templateUrl: helper.basepath('PartyInformation.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'PartyInformationCtrl'),
				controller: 'PartyInformationCtrl'
			})
			.state('app.partyInformationDetails', {
				url: '/partyInformationDetails/:object',
				title: '党组资讯详情',
				templateUrl: helper.basepath('partyInformationDetails.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'partyInformationDetailsCtrl'),
				controller: 'partyInformationDetailsCtrl'
			})
			.state('app.PartyActivity', {
				url: '/PartyActivity',
				title: '党组活动',
				templateUrl: helper.basepath('PartyActivity.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'PartyActivityCtrl'),
				controller: 'PartyActivityCtrl'
			})
			.state('app.partyActivityDetail', {
				url: '/partyActivityDetail/:object',
				title: '党组活动详情',
				templateUrl: helper.basepath('partyActivityDetail.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'partyActivityDetailCtrl'),
				controller: 'partyActivityDetailCtrl'
			})
			.state('app.PartyConferenceHall', {
				url: '/PartyConferenceHall',
				title: '党员议事厅',
				templateUrl: helper.basepath('PartyConferenceHall.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'PartyConferenceHallCtrl'),
				controller: 'PartyConferenceHallCtrl'
			})
			.state('app.partyConferenceHallDetail', {
				url: '/partyConferenceHallDetail/:object',
				title: '党员议事厅详情',
				templateUrl: helper.basepath('partyConferenceHallDetail.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'partyConferenceHallDetailCtrl'),
				controller: 'partyConferenceHallDetailCtrl'
			})
			.state('app.partyMechanismDetail', {
				url: '/partyMechanismDetail/:object',
				title: '党组织机构详情',
				templateUrl: helper.basepath('partyMechanismDetail.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'partyMechanismDetailCtrl'),
				controller: 'partyMechanismDetailCtrl'
			})
			.state('app.PartyMechanism', {
				url: '/PartyMechanism',
				title: '党组织机构',
				templateUrl: helper.basepath('PartyMechanism.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'PartyMechanismCtrl'),
				controller: 'PartyMechanismCtrl'
			})
			.state('app.checkIn', {
				url: '/checkIn',
				title: '商家入驻登记',
				templateUrl: helper.basepath('checkIn.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'checkInCtrl'),
				controller: 'checkInCtrl'
			})
			.state('app.cancellation', {
				url: '/cancellation',
				title: '商家注销管理',
				templateUrl: helper.basepath('cancellation.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'cancellationCtrl'),
				controller: 'cancellationCtrl'
			})
			.state('app.commoditySurvey', {
				url: '/commoditySurvey/:object',
				title: '商品概览',
				templateUrl: helper.basepath('commoditySurvey.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'commoditySurveyCtrl'),
				controller: 'commoditySurveyCtrl'
			})
			.state('app.singlecommoditySurvey', {
				url: '/singlecommoditySurvey/:object',
				title: '普通商品',
				templateUrl: helper.basepath('singlecommoditySurvey.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'singlecommoditySurveyCtrl'),
				controller: 'singlecommoditySurveyCtrl'
			})
			.state('app.commodityDetails', {
				url: '/commodityDetails',
				title: '商品详情',
				templateUrl: helper.basepath('commodityDetails.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'commodityDetailsCtrl'),
				controller: 'commodityDetailsCtrl'
			})
			.state('app.auditManagement', {
				url: '/auditManagement',
				title: '审核管理',
				templateUrl: helper.basepath('auditManagement.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'auditManagementCtrl'),
				controller: 'auditManagementCtrl'
			})
			.state('app.auditManagementDetails', {
				url: '/auditManagementDetails',
				title: '审核详情',
				templateUrl: helper.basepath('auditManagementDetails.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'auditManagementDetailsCtrl'),
				controller: 'auditManagementDetailsCtrl'
			})
			.state('app.shelvesManagement', {
				url: '/shelvesManagement',
				title: '上下架管理',
				templateUrl: helper.basepath('shelvesManagement.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'shelvesManagementCtrl'),
				controller: 'shelvesManagementCtrl'
			})
			.state('app.shelvesManagementDetails', {
				url: '/shelvesManagementDetails/:object',
				title: '商品详情',
				templateUrl: helper.basepath('shelvesManagementDetails.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'shelvesManagementDetailsCtrl'),
				controller: 'shelvesManagementDetailsCtrl'
			})
			.state('app.ordersSurvey', {
				url: '/ordersSurvey',
				title: '店铺订单',
				templateUrl: helper.basepath('ordersSurvey.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'ordersSurveyCtrl'),
				controller: 'ordersSurveyCtrl'
			})
			.state('app.ordersManagement', {
				url: '/ordersManagement',
				title: '订单明细',
				templateUrl: helper.basepath('ordersManagement.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'ordersManagementCtrl'),
				controller: 'ordersManagementCtrl'
			})
			.state('app.ordersManagementDetail', {
				url: '/ordersManagementDetail/:object',
				title: '订单明细',
				templateUrl: helper.basepath('ordersManagement.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'ordersManagementCtrl'),
				controller: 'ordersManagementCtrl'
			})
			.state('app.evaluationSurvey', {
				url: '/evaluationSurvey',
				title: '店铺评价',
				templateUrl: helper.basepath('evaluationSurvey.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'evaluationSurveyCtrl'),
				controller: 'evaluationSurveyCtrl'
			})
			.state('app.evaluationManagement', {
				url: '/evaluationManagement',
				title: '评价明细',
				templateUrl: helper.basepath('evaluationManagement.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'evaluationManagementCtrl'),
				controller: 'evaluationManagementCtrl'
			})
			.state('app.scoresSurvey', {
				url: '/scoresSurvey',
				title: '店铺积分',
				templateUrl: helper.basepath('scoresSurvey.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'scoresSurveyCtrl'),
				controller: 'scoresSurveyCtrl'
			})
			.state('app.scoresManagement', {
				url: '/scoresManagement',
				title: '积分消费明细',
				templateUrl: helper.basepath('scoresManagement.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'scoresManagementCtrl'),
				controller: 'scoresManagementCtrl'
			})
			.state('app.Classificationofgoods', {
				url: '/Classificationofgoods',
				title: '商品分类设置',
				templateUrl: helper.basepath('Classificationofgoods.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'ClassificationofgoodsCtrl'),
				controller: 'ClassificationofgoodsCtrl'
			})
			.state('app.evaluationSurveyDetail', {
				url: '/evaluationSurveyDetail/:Id',
				title: '店铺评价明细表',
				templateUrl: helper.basepath('evaluationSurveyDetail.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'evaluationSurveyDetailCtrl'),
				controller: 'evaluationSurveyDetailCtrl'
			})
			.state('app.scoresDetail', {
				url: '/scoresDetail/Id=:Id',
				title: '店铺积分明细表',
				templateUrl: helper.basepath('scoresManagement.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'scoresManagementCtrl'),
				controller: 'scoresManagementCtrl'
			})
			.state('app.resume', {
				url: '/resume/x=:x',
				title: '居民基本信息',
				templateUrl: helper.basepath('resume.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'resumeCtrl'),
				controller: 'resumeCtrl'
			})
			.state('app.communityIntroduction', {
				url: '/communityIntroduction',
				title: '社区介绍',
				templateUrl: helper.basepath('communityIntroduction.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'communityIntroductionCtrl'),
				controller: 'communityIntroductionCtrl'
			})
			.state('app.workGuide', {
				url: '/workGuide',
				title: '办事指南',
				templateUrl: helper.basepath('workGuide.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'workGuideCtrl'),
				controller: 'workGuideCtrl'
			})
			.state('app.gridService', {
				url: '/gridService',
				title: '网格服务',
				templateUrl: helper.basepath('gridService.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'gridServiceCtrl'),
				controller: 'gridServiceCtrl'
			})
			.state('app.mechanismCall', {
				url: '/mechanismCall',
				title: '机构电话',
				templateUrl: helper.basepath('mechanismCall.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'mechanismCallCtrl'),
				controller: 'mechanismCallCtrl'
			})
			.state('app.appointment', {
				url: '/appointment',
				title: '预约办事',
				templateUrl: helper.basepath('appointment.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'appointmentCtrl'),
				controller: 'appointmentCtrl'
			})
			.state('app.feedback', {
				url: '/feedback',
				title: '意见建议',
				templateUrl: helper.basepath('feedback.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'feedbackCtrl'),
				controller: 'feedbackCtrl'
			})
			.state('app.IntegralRule', {
				url: '/IntegralRule',
				title: '积分规则',
				templateUrl: helper.basepath('IntegralRule.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'IntegralRuleCtrl'),
				controller: 'IntegralRuleCtrl'
			})
			.state('app.pointClassify', {
				url: '/pointClassify',
				title: '积分分类管理',
				templateUrl: helper.basepath('pointClassify.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'pointClassifyCtrl'),
				controller: 'pointClassifyCtrl'
			})
			.state('app.earlyWarning', {
				url: '/earlyWarning',
				title: '人房预警',
				templateUrl: helper.basepath('building.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives'),
				//controller: 'IntegralRuleCtrl'
			})
			.state('app.dynamicManagement', {
				url: '/dynamicManagement',
				title: '动态管理',
				templateUrl: helper.basepath('building.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives'),
				//controller: 'IntegralRuleCtrl'
			})
			.state('app.yardMonitoring', {
				url: '/yardMonitoring',
				title: '平安院落',
				templateUrl: helper.basepath('building.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives'),
				//controller: 'IntegralRuleCtrl'
			})
			.state('app.templateManagement', {
				url: '/templateManagement',
				title: '模板管理',
				templateUrl: helper.basepath('templateManagement.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'templateManagementCtrl'),
				controller: 'templateManagementCtrl'
			})
			.state('app.contentManagement', {
				url: '/contentManagement',
				title: '内容管理',
				templateUrl: helper.basepath('contentManagement.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'contentManagementCtrl'),
				controller: 'contentManagementCtrl'
			})
			.state('app.contentDetails', {
				url: '/contentDetails/Id=:Id',
				title: '办事内容详情',
				templateUrl: helper.basepath('contentDetails.html'),
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'contentDetailsCtrl'),
				controller: 'contentDetailsCtrl'
			})

			// 
			// Single Page Routes 
			// ----------------------------------- 
			.state('page', {
				url: '/page',
				templateUrl: 'app/pages/page.html',
				resolve: helper.resolveFor('modernizr', 'icons'),
				controller: ["$rootScope", function($rootScope) {
					$rootScope.app.layout.isBoxed = false;
				}]
			})
			.state('page.login', {
				url: '/login',
				title: "Login",
				templateUrl: 'app/pages/login.html',
				controller: 'LoginFormController'
			})
			.state('page.register', {
				url: '/register',
				title: "Register",
				templateUrl: 'app/pages/register.html'
			})
			.state('page.recover', {
				url: '/recover',
				title: "Recover",
				templateUrl: 'app/pages/recover.html',
				controller: 'recoverCtrl',
				resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'recoverCtrl'),
			})
			.state('page.lock', {
				url: '/lock',
				title: "Lock",
				templateUrl: 'app/pages/lock.html',
				controller: 'lockCtrl'
			})
			.state('page.404', {
				url: '/404',
				title: "Not Found",
				templateUrl: 'app/pages/404.html'
			});

	}
]).config(['$ocLazyLoadProvider', 'APP_REQUIRES', function($ocLazyLoadProvider, APP_REQUIRES) {
	'use strict';

	// Lazy Load modules configuration
	$ocLazyLoadProvider.config({
		debug: false,
		events: true,
		modules: APP_REQUIRES.modules
	});

}]).config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
	function($controllerProvider, $compileProvider, $filterProvider, $provide) {
		'use strict';
		// registering components after bootstrap
		App.controller = $controllerProvider.register;
		App.directive = $compileProvider.directive;
		App.filter = $filterProvider.register;
		App.factory = $provide.factory;
		App.service = $provide.service;
		App.constant = $provide.constant;
		App.value = $provide.value;

	}
]).config(['$translateProvider', function($translateProvider) {

	$translateProvider.useStaticFilesLoader({
		prefix: 'app/i18n/',
		suffix: '.json'
	});
	$translateProvider.preferredLanguage('zh');
	$translateProvider.useLocalStorage();
	$translateProvider.usePostCompiling(true);

}]).config(['tmhDynamicLocaleProvider', function(tmhDynamicLocaleProvider) {

	tmhDynamicLocaleProvider.localeLocationPattern('vendor/angular-i18n/angular-locale_zh.js');

	// tmhDynamicLocaleProvider.useStorage('$cookieStore');

}]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {

	cfpLoadingBarProvider.includeBar = true;
	cfpLoadingBarProvider.includeSpinner = false;
	cfpLoadingBarProvider.latencyThreshold = 500;
	cfpLoadingBarProvider.parentSelector = '.wrapper > section';

}]).config(['$tooltipProvider', function($tooltipProvider) {

	$tooltipProvider.options({
		appendToBody: true
	});

}]);

/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
var ctrlPath = "app/controller/";
App.constant('APP_COLORS', {
		'primary': '#5d9cec',
		'success': '#27c24c',
		'info': '#23b7e5',
		'warning': '#ff902b',
		'danger': '#f05050',
		'inverse': '#131e26',
		'green': '#37bc9b',
		'pink': '#f532e5',
		'purple': '#7266ba',
		'dark': '#3a3f51',
		'yellow': '#fad732',
		'gray-darker': '#232735',
		'gray-dark': '#3a3f51',
		'gray': '#dde6e9',
		'gray-light': '#e4eaec',
		'gray-lighter': '#edf1f2'
	})
	.constant('APP_MEDIAQUERY', {
		'desktopLG': 1200,
		'desktop': 992,
		'tablet': 768,
		'mobile': 480
	})
	.constant('APP_REQUIRES', {
		// jQuery based and standalone scripts
		scripts: {
			'whirl': ['vendor/whirl/dist/whirl.css'],
			'classyloader': ['vendor/jquery-classyloader/js/jquery.classyloader.min.js'],
			'animo': ['vendor/animo.js/animo.js'],
			'fastclick': ['vendor/fastclick/lib/fastclick.js'],
			'modernizr': ['vendor/modernizr/modernizr.js'],
			'animate': ['vendor/animate.css/animate.min.css'],
			'icons': ['vendor/skycons/skycons.js',
				'vendor/fontawesome/css/font-awesome.min.css',
				'vendor/simple-line-icons/css/simple-line-icons.css',
				'vendor/weather-icons/css/weather-icons.min.css'
			],
			'sparklines': ['app/vendor/sparklines/jquery.sparkline.min.js'],
			'wysiwyg': ['vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
				'vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js'
			],
			'slimscroll': ['vendor/slimScroll/jquery.slimscroll.min.js'],
			'screenfull': ['vendor/screenfull/dist/screenfull.js'],
			'vector-map': ['vendor/ika.jvectormap/jquery-jvectormap-1.2.2.min.js',
				'vendor/ika.jvectormap/jquery-jvectormap-1.2.2.css'
			],
			'vector-map-maps': ['vendor/ika.jvectormap/jquery-jvectormap-world-mill-en.js',
				'vendor/ika.jvectormap/jquery-jvectormap-us-mill-en.js'
			],
			'loadGoogleMapsJS': ['app/vendor/gmap/load-google-maps.js'],
			'flot-chart': ['vendor/Flot/jquery.flot.js'],
			'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
				'vendor/Flot/jquery.flot.resize.js',
				'vendor/Flot/jquery.flot.pie.js',
				'vendor/Flot/jquery.flot.time.js',
				'vendor/Flot/jquery.flot.categories.js',
				'vendor/flot-spline/js/jquery.flot.spline.min.js'
			],
			// jquery core and widgets
			'jquery-ui': ['vendor/jquery-ui/ui/core.js',
				'vendor/jquery-ui/ui/widget.js'
			],
			// loads only jquery required modules and touch support
			'jquery-ui-widgets': ['vendor/jquery-ui/ui/core.js',
				'vendor/jquery-ui/ui/widget.js',
				'vendor/jquery-ui/ui/mouse.js',
				'vendor/jquery-ui/ui/draggable.js',
				'vendor/jquery-ui/ui/droppable.js',
				'vendor/jquery-ui/ui/sortable.js',
				'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js'
			],
			'moment': ['vendor/moment/min/moment-with-locales.min.js'],
			'inputmask': ['vendor/jquery.inputmask/dist/jquery.inputmask.bundle.min.js'],
			'flatdoc': ['vendor/flatdoc/flatdoc.js'],
			'codemirror': ['vendor/codemirror/lib/codemirror.js',
				'vendor/codemirror/lib/codemirror.css'
			],
			// modes for common web files
			'codemirror-modes-web': ['vendor/codemirror/mode/javascript/javascript.js',
				'vendor/codemirror/mode/xml/xml.js',
				'vendor/codemirror/mode/htmlmixed/htmlmixed.js',
				'vendor/codemirror/mode/css/css.js'
			],
			'taginput': ['vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
				'vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'
			],
			'filestyle': ['vendor/bootstrap-filestyle/src/bootstrap-filestyle.js'],
			'parsley': ['vendor/parsleyjs/dist/parsley.min.js'],
			'fullcalendar': ['vendor/fullcalendar/dist/fullcalendar.min.js',
				'vendor/fullcalendar/dist/fullcalendar.css'
			],
			'gcal': ['vendor/fullcalendar/dist/gcal.js'],
			'chartjs': ['vendor/Chart.js/Chart.js'],
			'morris': ['vendor/raphael/raphael.js',
				'vendor/morris.js/morris.js',
				'vendor/morris.js/morris.css'
			],
			'loaders.css': ['vendor/loaders.css/loaders.css'],
			'spinkit': ['vendor/spinkit/css/spinkit.css']
		},
		// Angular based script (use the right module name)
		modules: [{
			name: 'contentDetailsCtrl',
			files: [ctrlPath + 'contentDetailsCtrl.js']
		}, {
			name: 'contentManagementCtrl',
			files: [ctrlPath + 'contentManagementCtrl.js']
		}, {
			name: 'templateManagementCtrl',
			files: [ctrlPath + 'templateManagementCtrl.js']
		}, {
			name: 'adDraftsCtrl',
			files: [ctrlPath + 'adDraftsCtrl.js']
		}, {
			name: 'adRecycleBinCtrl',
			files: [ctrlPath + 'adRecycleBinCtrl.js']
		}, {
			name: 'IntegralRuleCtrl',
			files: [ctrlPath + 'IntegralRuleCtrl.js']
		}, {
			name: 'feedbackCtrl',
			files: [ctrlPath + 'feedbackCtrl.js']
		}, {
			name: 'appointmentCtrl',
			files: [ctrlPath + 'appointmentCtrl.js']
		}, {
			name: 'mechanismCallCtrl',
			files: [ctrlPath + 'mechanismCallCtrl.js']
		}, {
			name: 'gridServiceCtrl',
			files: [ctrlPath + 'gridServiceCtrl.js']
		}, {
			name: 'workGuideCtrl',
			files: [ctrlPath + 'workGuideCtrl.js']
		}, {
			name: 'communityIntroductionCtrl',
			files: [ctrlPath + 'communityIntroductionCtrl.js']
		}, {
			name: 'resumeCtrl',
			files: [ctrlPath + 'resumeCtrl.js']
		}, {
			name: 'checkInCtrl',
			files: [ctrlPath + 'checkInCtrl.js']
		}, {
			name: 'cancellationCtrl',
			files: [ctrlPath + 'cancellationCtrl.js']
		}, {
			name: 'commoditySurveyCtrl',
			files: [ctrlPath + 'commoditySurveyCtrl.js']
		}, {
			name: 'singlecommoditySurveyCtrl',
			files: [ctrlPath + 'singlecommoditySurveyCtrl.js']
		}, {
			name: 'commodityDetailsCtrl',
			files: [ctrlPath + 'commodityDetailsCtrl.js']
		}, {
			name: 'auditManagementCtrl',
			files: [ctrlPath + 'auditManagementCtrl.js']
		}, {
			name: 'auditManagementDetailsCtrl',
			files: [ctrlPath + 'auditManagementDetailsCtrl.js']
		}, {
			name: 'shelvesManagementCtrl',
			files: [ctrlPath + 'shelvesManagementCtrl.js']
		}, {
			name: 'shelvesManagementDetailsCtrl',
			files: [ctrlPath + 'shelvesManagementDetailsCtrl.js']
		}, {
			name: 'ordersSurveyCtrl',
			files: [ctrlPath + 'ordersSurveyCtrl.js']
		}, {
			name: 'ordersManagementCtrl',
			files: [ctrlPath + 'ordersManagementCtrl.js']
		}, {
			name: 'evaluationSurveyCtrl',
			files: [ctrlPath + 'evaluationSurveyCtrl.js']
		}, {
			name: 'evaluationManagementCtrl',
			files: [ctrlPath + 'evaluationManagementCtrl.js']
		}, {
			name: 'evaluationSurveyDetailCtrl',
			files: [ctrlPath + 'evaluationSurveyDetailCtrl.js']
		}, {
			name: 'scoresSurveyCtrl',
			files: [ctrlPath + 'scoresSurveyCtrl.js']
		}, {
			name: 'scoresManagementCtrl',
			files: [ctrlPath + 'scoresManagementCtrl.js']
		}, {
			name: 'ClassificationofgoodsCtrl',
			files: [ctrlPath + 'ClassificationofgoodsCtrl.js']
		}, {
			name: 'PartyMembersCtrl',
			files: [ctrlPath + 'PartyMembersCtrl.js']
		}, {
			name: 'PartyCancellationCtrl',
			files: [ctrlPath + 'PartyCancellationCtrl.js']
		}, {
			name: 'PartyInformationCtrl',
			files: [ctrlPath + 'PartyInformationCtrl.js']
		}, {
			name: 'partyInformationDetailsCtrl',
			files: [ctrlPath + 'partyInformationDetailsCtrl.js']
		}, {
			name: 'PartyActivityCtrl',
			files: [ctrlPath + 'PartyActivityCtrl.js']
		}, {
			name: 'partyActivityDetailCtrl',
			files: [ctrlPath + 'partyActivityDetailCtrl.js']
		}, {
			name: 'partyConferenceHallDetailCtrl',
			files: [ctrlPath + 'partyConferenceHallDetailCtrl.js']
		}, {
			name: 'PartyConferenceHallCtrl',
			files: [ctrlPath + 'PartyConferenceHallCtrl.js']
		}, {
			name: 'PartyMechanismCtrl',
			files: [ctrlPath + 'PartyMechanismCtrl.js']
		}, {
			name: 'partyMechanismDetailCtrl',
			files: [ctrlPath + 'partyMechanismDetailCtrl.js']
		}, {
			name: 'newsDetailCtrl',
			files: [ctrlPath + 'newsDetailCtrl.js']
		}, {
			name: 'familyCircleCtrl',
			files: [ctrlPath + 'familyCircleCtrl.js']
		}, {
			name: 'neighborhoodCircleCtrl',
			files: [ctrlPath + 'neighborhoodCircleCtrl.js']
		}, {
			name: 'fundManagementCtrl',
			files: [ctrlPath + 'fundManagementCtrl.js']
		}, {
			name: 'appyfundManagementCtrl',
			files: [ctrlPath + 'appyfundManagementCtrl.js']
		}, {
			name: 'appyfundManagementDetailsCtrl',
			files: [ctrlPath + 'appyfundManagementDetailsCtrl.js']
		}, {
			name: 'fundationDetailsCtrl',
			files: [ctrlPath + 'fundationDetailsCtrl.js']
		}, {
			name: 'charitableManagementCtrl',
			files: [ctrlPath + 'charitableManagementCtrl.js']
		}, {
			name: 'fundClassSettingCtrl',
			files: [ctrlPath + 'fundClassSettingCtrl.js']
		}, {
			name: 'courtyardSquareCtrl',
			files: [ctrlPath + 'courtyardSquareCtrl.js']
		}, {
			name: 'seeDetailsCtrl',
			files: [ctrlPath + 'seeDetailsCtrl.js']
		}, {
			name: 'classificationSettingsCtrl',
			files: [ctrlPath + 'classificationSettingsCtrl.js']
		}, {
			name: 'recycleBinCtrl',
			files: [ctrlPath + 'recycleBinCtrl.js']
		}, {
			name: 'draftsCtrl',
			files: [ctrlPath + 'draftsCtrl.js']
		}, {
			name: 'bannerNewsCtrl',
			files: [ctrlPath + 'bannerNewsCtrl.js']
		}, {
			name: 'bannerNewsDetailsCtrl',
			files: [ctrlPath + 'bannerNewsDetailsCtrl.js']
		}, {
			name: 'reportOfmationCtrl',
			files: [ctrlPath + 'reportOfmationCtrl.js']
		}, {
			name: 'actionDetailsCtrl',
			files: [ctrlPath + 'actionDetailsCtrl.js']
		}, {
			name: 'AdvertClassificationCtrl',
			files: [ctrlPath + 'AdvertClassificationCtrl.js']
		}, {
			name: 'projectsCtrl',
			files: [ctrlPath + 'projectsCtrl.js']
		}, {
			name: 'advertisingInfoCtrl',
			files: [ctrlPath + 'advertisingInfoCtrl.js']
		}, {
			name: 'advertisingDetailsCtrl',
			files: [ctrlPath + 'advertisingDetailsCtrl.js']
		}, {
			name: 'draftsCtrl',
			files: [ctrlPath + 'draftsCtrl.js']
		}, {
			name: 'recycleBinCtrl',
			files: [ctrlPath + 'recycleBinCtrl.js']
		}, {
			name: 'classificationSettingsCtrl',
			files: [ctrlPath + 'classificationSettingsCtrl.js']
		}, {
			name: 'communityNewsCtrl',
			files: [ctrlPath + 'communityNewsCtrl.js']
		}, {
			name: 'shebeiguanliCtrl',
			files: [ctrlPath + 'shebeiguanliCtrl.js']
		}, {
			name: 'recoverCtrl',
			files: [ctrlPath + 'recoverCtrl.js']
		}, {
			name: 'scvehicleInfoCtrl',
			files: [ctrlPath + 'scvehicleInfoCtrl.js']
		}, {
			name: 'schousesInfoCtrl',
			files: [ctrlPath + 'schousesInfoCtrl.js']
		}, {
			name: 'scBasicfoundCtrl',
			files: [ctrlPath + 'scBasicfoundCtrl.js']
		}, {
			name: 'scInfoUploadCtrl',
			files: [ctrlPath + 'scInfoUploadCtrl.js']
		}, {
			name: 'todoListCtrl',
			files: [ctrlPath + 'todoListCtrl.js']
		}, {
			name: 'zizhijueseCtrl',
			files: [ctrlPath + 'zizhijueseCtrl.js']
		}, {
			name: 'addChangeUrlCtrl',
			files: [ctrlPath + 'addChangeUrlCtrl.js']
		}, {
			name: 'OwersCtrl',
			files: [ctrlPath + 'OwersCtrl.js']
		}, {
			name: 'workGroupsCtrl',
			files: [ctrlPath + 'workGroupsCtrl.js']
		}, {
			name: 'eventTemplateCtrl',
			files: [ctrlPath + 'eventTemplateCtrl.js']
		}, {
			name: 'xinxishangbaoCtrl',
			files: [ctrlPath + 'xinxishangbaoCtrl.js']
		}, {
			name: 'shixiangchuliCtrl',
			files: [ctrlPath + 'shixiangchuliCtrl.js']
		}, {
			name: 'wanggeguanliCtrl',
			files: [ctrlPath + 'wanggeguanliCtrl.js']
		}, {
			name: 'menusCtrl',
			files: [ctrlPath + 'menusCtrl.js']
		}, {
			name: 'acountsCtrl',
			files: [ctrlPath + 'acountsCtrl.js']
		}, {
			name: 'rolesCtrl',
			files: [ctrlPath + 'rolesCtrl.js']
		}, {
			name: 'zuzhileixingCtrl',
			files: [ctrlPath + 'zuzhileixingCtrl.js']
		}, {
			name: 'zizhizuzhiCtrl',
			files: [ctrlPath + 'zizhizuzhiCtrl.js']
		}, {
			name: 'yuangongguanliCtrl',
			files: [ctrlPath + 'yuangongguanliCtrl.js']
		}, {
			name: 'daibanshixiangCtrl',
			files: [ctrlPath + 'daibanshixiangCtrl.js']
		}, {
			name: 'homeCtrl',
			files: [ctrlPath + 'homeCtrl.js']
		}, {
			name: 'gzlbuzhouCtrl',
			files: [ctrlPath + 'gzlbuzhouCtrl.js']
		}, {
			name: 'changzhurenkouCtrl',
			files: [ctrlPath + 'changzhurenkouCtrl.js']
		}, {
			name: 'minzhuxieshangCtrl',
			files: [ctrlPath + 'minzhuxieshangCtrl.js']
		}, {
			name: 'xieshanggongshiCtrl',
			files: [ctrlPath + 'xieshanggongshiCtrl.js']
		}, {
			name: 'juminjifenCtrl',
			files: [ctrlPath + 'juminjifenCtrl.js']
		}, {
			name: 'xinwengonggaoCtrl',
			files: [ctrlPath + 'xinwengonggaoCtrl.js']
		}, {
			name: 'zhuquqiyeCtrl',
			files: [ctrlPath + 'zhuquqiyeCtrl.js']
		}, {
			name: 'guanzhurenqunCtrl',
			files: [ctrlPath + 'guanzhurenqunCtrl.js']
		}, {
			name: 'zhongdianrenqunCtrl',
			files: [ctrlPath + 'zhongdianrenqunCtrl.js']
		}, {
			name: 'gongzuoliuCtrl',
			files: [ctrlPath + 'gongzuoliuCtrl.js']
		}, {
			name: 'renyuanguanliCtrl',
			files: [ctrlPath + 'renyuanguanliCtrl.js']
		}, {
			name: 'zuzhijiagouCtrl',
			files: [ctrlPath + 'zuzhijiagouCtrl.js']
		}, {
			name: 'shetuanguanliCtrl',
			files: [ctrlPath + 'shetuanguanliCtrl.js']
		}, {
			name: 'gangweiguanliCtrl',
			files: [ctrlPath + 'gangweiguanliCtrl.js']
		}, {
			name: 'fangwuguanliCtrl',
			files: [ctrlPath + 'fangwuguanliCtrl.js']
		}, {
			name: 'juminguanliCtrl',
			files: [ctrlPath + 'juminguanliCtrl.js']
		}, {
			name: 'cheliangguanliCtrl',
			files: [ctrlPath + 'cheliangguanliCtrl.js']
		}, {
			name: 'qiyeguanliCtrl',
			files: [ctrlPath + 'qiyeguanliCtrl.js']
		}, {
			name: 'liudongrenkouCtrl',
			files: [ctrlPath + 'liudongrenkouCtrl.js']
		}, {
			name: 'fangwuchuzuCtrl',
			files: [ctrlPath + 'fangwuchuzuCtrl.js']
		}, {
			name: 'zhongdianrenqunCtrl',
			files: [ctrlPath + 'zhongdianrenqunCtrl.js']
		}, {
			name: 'guanhuaiduixiangCtrl',
			files: [ctrlPath + 'guanhuaiduixiangCtrl.js']
		}, {
			name: 'jiufentiaojieCtrl',
			files: [ctrlPath + 'jiufentiaojieCtrl.js']
		}, {
			name: 'huanjingweishengCtrl',
			files: [ctrlPath + 'huanjingweishengCtrl.js']
		}, {
			name: 'chengguanshangbaoCtrl',
			files: [ctrlPath + 'chengguanshangbaoCtrl.js']
		}, {
			name: 'wuranyuanCtrl',
			files: [ctrlPath + 'wuranyuanCtrl.js']
		}, {
			name: 'anquanxiaofangCtrl',
			files: [ctrlPath + 'anquanxiaofangCtrl.js']
		}, {
			name: 'yichangqingkuangCtrl',
			files: [ctrlPath + 'yichangqingkuangCtrl.js']
		}, {
			name: 'shiyaoanquanCtrl',
			files: [ctrlPath + 'shiyaoanquanCtrl.js']
		}, {
			name: 'shipinjiankongCtrl',
			files: [ctrlPath + 'shipinjiankongCtrl.js']
		}, {
			name: 'tingcheguanliCtrl',
			files: [ctrlPath + 'tingcheguanliCtrl.js']
		}, {
			name: 'menjinguanliCtrl',
			files: [ctrlPath + 'menjinguanliCtrl.js']
		}, {
			name: 'lvhuaguanliCtrl',
			files: [ctrlPath + 'lvhuaguanliCtrl.js']
		}, {
			name: 'ziliaoguanliCtrl',
			files: [ctrlPath + 'ziliaoguanliCtrl.js']
		}, {
			name: 'shujucaijiCtrl',
			files: [ctrlPath + 'shujucaijiCtrl.js']
		}, {
			name: 'diantiguanliCtrl',
			files: [ctrlPath + 'diantiguanliCtrl.js']
		}, {
			name: 'xiaofangguanliCtrl',
			files: [ctrlPath + 'xiaofangguanliCtrl.js']
		}, {
			name: 'jinchukouguanliCtrl',
			files: [ctrlPath + 'jinchukouguanliCtrl.js']
		}, {
			name: 'xinwenfabuCtrl',
			files: [ctrlPath + 'xinwenfabuCtrl.js']
		}, {
			name: 'jifentiaozhengCtrl',
			files: [ctrlPath + 'jifentiaozhengCtrl.js']
		}, {
			name: 'zhiyuanzheCtrl',
			files: [ctrlPath + 'zhiyuanzheCtrl.js']
		}, {
			name: 'shixiangmubanCtrl',
			files: [ctrlPath + 'shixiangmubanCtrl.js']
		}, {
			name: 'shixiangshiliCtrl',
			files: [ctrlPath + 'shixiangshiliCtrl.js']
		}, {
			name: 'jifenguizeCtrl',
			files: [ctrlPath + 'jifenguizeCtrl.js']
		}, {
			name: 'maodunjiufenCtrl',
			files: [ctrlPath + 'maodunjiufenCtrl.js']
		}, {
			name: 'xinfangtaizhangCtrl',
			files: [ctrlPath + 'xinfangtaizhangCtrl.js']
		}, {
			name: 'gonganjingqingCtrl',
			files: [ctrlPath + 'gonganjingqingCtrl.js']
		}, {
			name: 'shengchanyinhuanCtrl',
			files: [ctrlPath + 'shengchanyinhuanCtrl.js']
		}, {
			name: 'guanhuaiduixiangCtrl',
			files: [ctrlPath + 'guanhuaiduixiangCtrl.js']
		}, {
			name: 'yuanluoxinxiCtrl',
			files: [ctrlPath + 'yuanluoxinxiCtrl.js']
		}, {
			name: 'teshurenqunfuwuCtrl',
			files: [ctrlPath + 'teshurenqunfuwuCtrl.js']
		}, {
			name: 'guanhuaiduixiangfuwuCtrl',
			files: [ctrlPath + 'guanhuaiduixiangfuwuCtrl.js']
		}, {
			name: 'danweixunchangfuwuCtrl',
			files: [ctrlPath + 'danweixunchangfuwuCtrl.js']
		}, {
			name: 'evaluationDetailCtrl',
			files: [ctrlPath + 'evaluationDetailCtrl.js']
		}, {
			name: 'pointClassifyCtrl',
			files: [ctrlPath + 'pointClassifyCtrl.js']
		}, {
			name: 'toaster',
			files: ['vendor/angularjs-toaster/toaster.js',
				'vendor/angularjs-toaster/toaster.css'
			]
		}, {
			name: 'localytics.directives',
			files: ['vendor/chosen_v1.2.0/chosen.jquery.min.js',
				'vendor/chosen_v1.2.0/chosen.min.css',
				'vendor/angular-chosen-localytics/chosen.js'
			]
		}, {
			name: 'ngDialog',
			files: ['vendor/ngDialog/js/ngDialog.min.js',
				'vendor/ngDialog/css/ngDialog.min.css',
				'vendor/ngDialog/css/ngDialog-theme-default.min.css'
			]
		}, {
			name: 'ngWig',
			files: ['vendor/ngWig/dist/ng-wig.min.js']
		}, {
			name: 'ngTable',
			files: ['vendor/ng-table/dist/ng-table.min.js',
				'vendor/ng-table/dist/ng-table.min.css'
			]
		}, {
			name: 'ngTableExport',
			files: ['vendor/ng-table-export/ng-table-export.js']
		}, {
			name: 'angularBootstrapNavTree',
			files: ['vendor/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
				'vendor/angular-bootstrap-nav-tree/dist/abn_tree.css'
			]
		}, {
			name: 'htmlSortable',
			files: ['vendor/html.sortable/dist/html.sortable.js',
				'vendor/html.sortable/dist/html.sortable.angular.js'
			]
		}, {
			name: 'xeditable',
			files: ['vendor/angular-xeditable/dist/js/xeditable.js',
				'vendor/angular-xeditable/dist/css/xeditable.css'
			]
		}, {
			name: 'angularFileUpload',
			files: ['vendor/angular-file-upload/angular-file-upload.js']
		}, {
			name: 'ngImgCrop',
			files: ['vendor/ng-img-crop/compile/unminified/ng-img-crop.js',
				'vendor/ng-img-crop/compile/unminified/ng-img-crop.css'
			]
		}, {
			name: 'ui.select',
			files: ['vendor/angular-ui-select/dist/select.js',
				'vendor/angular-ui-select/dist/select.css'
			]
		}, {
			name: 'ui.codemirror',
			files: ['vendor/angular-ui-codemirror/ui-codemirror.js']
		}, {
			name: 'angular-carousel',
			files: ['vendor/angular-carousel/dist/angular-carousel.css',
				'vendor/angular-carousel/dist/angular-carousel.js'
			]
		}, {
			name: 'ngGrid',
			files: ['vendor/ng-grid/build/ng-grid.min.js',
				'vendor/ng-grid/ng-grid.css'
			]
		}, {
			name: 'infinite-scroll',
			files: ['vendor/ngInfiniteScroll/build/ng-infinite-scroll.js']
		}, {
			name: 'ui.bootstrap-slider',
			files: ['vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
				'vendor/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
				'vendor/angular-bootstrap-slider/slider.js'
			]
		}, {
			name: 'ui.grid',
			files: ['vendor/angular-ui-grid/ui-grid.min.css',
				'vendor/angular-ui-grid/ui-grid.min.js'
			]
		}, {
			name: 'textAngularSetup',
			files: ['vendor/textAngular/src/textAngularSetup.js']
		}, {
			name: 'textAngular',
			files: ['vendor/textAngular/dist/textAngular-rangy.min.js',
				'vendor/textAngular/src/textAngular.js',
				'vendor/textAngular/src/textAngularSetup.js',
				'vendor/textAngular/src/textAngular.css'
			],
			serie: true
		}, {
			name: 'angular-rickshaw',
			files: ['vendor/d3/d3.min.js',
				'vendor/rickshaw/rickshaw.js',
				'vendor/rickshaw/rickshaw.min.css',
				'vendor/angular-rickshaw/rickshaw.js'
			],
			serie: true
		}, {
			name: 'angular-chartist',
			files: ['vendor/chartist/dist/chartist.min.css',
				'vendor/chartist/dist/chartist.js',
				'vendor/angular-chartist.js/dist/angular-chartist.js'
			],
			serie: true
		}, {
			name: 'ui.map',
			files: ['vendor/angular-ui-map/ui-map.js']
		}, {
			name: 'datatables',
			files: ['vendor/datatables/media/css/jquery.dataTables.css',
				'vendor/datatables/media/js/jquery.dataTables.js',
				'vendor/angular-datatables/dist/angular-datatables.js'
			],
			serie: true
		}, {
			name: 'angular-jqcloud',
			files: ['vendor/jqcloud2/dist/jqcloud.css',
				'vendor/jqcloud2/dist/jqcloud.js',
				'vendor/angular-jqcloud/angular-jqcloud.js'
			]
		}, {
			name: 'angularGrid',
			files: ['vendor/ag-grid/dist/angular-grid.css',
				'vendor/ag-grid/dist/angular-grid.js',
				'vendor/ag-grid/dist/theme-dark.css',
				'vendor/ag-grid/dist/theme-fresh.css'
			]
		}, {
			name: 'ng-nestable',
			files: ['vendor/ng-nestable/src/angular-nestable.js',
				'vendor/nestable/jquery.nestable.js'
			]
		}, {
			name: 'akoenig.deckgrid',
			files: ['vendor/angular-deckgrid/angular-deckgrid.js']
		}, {
			name: "kind-editor",
			files: ['vendor/angular-kindEditor/vendor/kindeditor-4.1.10/themes/default/default.css',
				'vendor/angular-kindEditor/css/ms_angluar.css',
				'vendor/angular-kindEditor/vendor/kindeditor-4.1.10/lang/zh_CN.js',
				'vendor/angular-kindEditor/vendor/kindeditor-4.1.10/plugins/code/prettify.js'
			]
		}]

	});
/**=========================================================
 * Module: flot-chart.js
 * Setup options and data for flot chart directive
 =========================================================*/

App.controller('FlotChartController', ['$scope', 'serverUrls', '$http', '$rootScope', 'ChartData', '$timeout', function($scope, serverUrls, $http, $rootScope, ChartData, $timeout) {
	'use strict';

	// BAR
	// ----------------------------------- 
	$scope.barData = ChartData.load('server/chart/bar.json');
	$scope.barOptions = {
		series: {
			bars: {
				align: 'center',
				lineWidth: 0,
				show: true,
				barWidth: 0.6,
				fill: 0.9
			}
		},
		grid: {
			borderColor: '#eee',
			borderWidth: 1,
			hoverable: true,
			backgroundColor: '#fcfcfc'
		},
		tooltip: true,
		tooltipOpts: {
			content: function(label, x, y) {
				return x + ' : ' + y;
			}
		},
		xaxis: {
			tickColor: '#fcfcfc',
			mode: 'categories'
		},
		yaxis: {
			position: ($scope.app.layout.isRTL ? 'right' : 'left'),
			tickColor: '#eee'
		},
		shadowSize: 0
	};

	// BAR STACKED
	// ----------------------------------- 
	$scope.barStackeData = ChartData.load('server/chart/barstacked.json');
	$scope.barStackedOptions = {
		series: {
			stack: true,
			bars: {
				align: 'center',
				lineWidth: 0,
				show: true,
				barWidth: 0.6,
				fill: 0.9
			}
		},
		grid: {
			borderColor: '#eee',
			borderWidth: 1,
			hoverable: true,
			backgroundColor: '#fcfcfc'
		},
		tooltip: true,
		tooltipOpts: {
			content: function(label, x, y) {
				return x + ' : ' + y;
			}
		},
		xaxis: {
			tickColor: '#fcfcfc',
			mode: 'categories'
		},
		yaxis: {
			min: 0,
			max: 200, // optional: use it for a clear represetation
			position: ($scope.app.layout.isRTL ? 'right' : 'left'),
			tickColor: '#eee'
		},
		shadowSize: 0
	};

	// SPLINE
	// ----------------------------------- 
	//$scope.splineData = ChartData.load('server/chart/spline.json');
	//获取首页积分echart图表数据

	// AREA
	// ----------------------------------- 
	$scope.areaData = ChartData.load('server/chart/area.json');
	$scope.areaOptions = {
		series: {
			lines: {
				show: true,
				fill: 0.8
			},
			points: {
				show: true,
				radius: 4
			}
		},
		grid: {
			borderColor: '#eee',
			borderWidth: 1,
			hoverable: true,
			backgroundColor: '#fcfcfc'
		},
		tooltip: true,
		tooltipOpts: {
			content: function(label, x, y) {
				return x + ' : ' + y;
			}
		},
		xaxis: {
			tickColor: '#fcfcfc',
			mode: 'categories'
		},
		yaxis: {
			min: 0,
			tickColor: '#eee',
			position: ($scope.app.layout.isRTL ? 'right' : 'left'),
			tickFormatter: function(v) {
				return v + ' visitors';
			}
		},
		shadowSize: 0
	};

	// LINE
	// ----------------------------------- 
	$scope.lineData = ChartData.load('server/chart/line.json');
	$scope.lineOptions = {
		series: {
			lines: {
				show: true,
				fill: 0.01
			},
			points: {
				show: true,
				radius: 4
			}
		},
		grid: {
			borderColor: '#eee',
			borderWidth: 1,
			hoverable: true,
			backgroundColor: '#fcfcfc'
		},
		tooltip: true,
		tooltipOpts: {
			content: function(label, x, y) {
				return x + ' : ' + y;
			}
		},
		xaxis: {
			tickColor: '#eee',
			mode: 'categories'
		},
		yaxis: {
			position: ($scope.app.layout.isRTL ? 'right' : 'left'),
			tickColor: '#eee'
		},
		shadowSize: 0
	};

	// PIE
	// ----------------------------------- 
	$scope.pieData = ChartData.load('server/chart/pie.json');
	$scope.pieOptions = {
		series: {
			pie: {
				show: true,
				innerRadius: 0,
				label: {
					show: true,
					radius: 0.8,
					formatter: function(label, series) {
						return '<div class="flot-pie-label">' +
							//label + ' : ' +
							Math.round(series.percent) +
							'%</div>';
					},
					background: {
						opacity: 0.8,
						color: '#222'
					}
				}
			}
		}
	};

	// DONUT
	// ----------------------------------- 
	$scope.donutData = ChartData.load('server/chart/donut.json');
	$scope.donutOptions = {
		series: {
			pie: {
				show: true,
				innerRadius: 0.5 // This makes the donut shape
			}
		}
	};

	// REALTIME
	// ----------------------------------- 
	$scope.realTimeOptions = {
		series: {
			lines: {
				show: true,
				fill: true,
				fillColor: {
					colors: ['#a0e0f3', '#23b7e5']
				}
			},
			shadowSize: 0 // Drawing is faster without shadows
		},
		grid: {
			show: false,
			borderWidth: 0,
			minBorderMargin: 20,
			labelMargin: 10
		},
		xaxis: {
			tickFormatter: function() {
				return "";
			}
		},
		yaxis: {
			min: 0,
			max: 110
		},
		legend: {
			show: true
		},
		colors: ["#23b7e5"]
	};

	// Generate random data for realtime demo
	var data = [],
		totalPoints = 300;

	update();

	function getRandomData() {
		if(data.length > 0)
			data = data.slice(1);
		// Do a random walk
		while(data.length < totalPoints) {
			var prev = data.length > 0 ? data[data.length - 1] : 50,
				y = prev + Math.random() * 10 - 5;
			if(y < 0) {
				y = 0;
			} else if(y > 100) {
				y = 100;
			}
			data.push(y);
		}
		// Zip the generated y values with the x values
		var res = [];
		for(var i = 0; i < data.length; ++i) {
			res.push([i, data[i]]);
		}
		return [res];
	}

	function update() {
		$scope.realTimeData = getRandomData();
		$timeout(update, 30);
	}
	// end random data generation

	// PANEL REFRESH EVENTS
	// ----------------------------------- 

	$scope.$on('panel-refresh', function(event, id) {

		// Instead of timeout you can request a chart data
		$timeout(function() {

			// directive listen for to remove the spinner 
			// after we end up to perform own operations
			$scope.$broadcast('removeSpinner', id);

			console.log('Refreshed #' + id);

		}, 3000);

	});

	// PANEL DISMISS EVENTS
	// ----------------------------------- 

	// Before remove panel
	$scope.$on('panel-remove', function(event, id, deferred) {

		console.log('Panel #' + id + ' removing');

		// Here is obligatory to call the resolve() if we pretend to remove the panel finally
		// Not calling resolve() will NOT remove the panel
		// It's up to your app to decide if panel should be removed or not
		deferred.resolve();

	});

	// Panel removed ( only if above was resolved() )
	$scope.$on('panel-removed', function(event, id) {

		console.log('Panel #' + id + ' removed');

	});

}]).service('ChartData', ["$resource", function($resource) {

	var opts = {
		get: {
			method: 'GET',
			isArray: true
		}
	};
	return {
		load: function(source) {
			return $resource(source, {}, opts).get();
		}
	};
}]);

/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

App.controller('LoginFormController', ['$scope', '$rootScope', '$http', '$state', 'serverUrls', 'layerAlert', '$q',
	function($scope, $rootScope, $http, $state, serverUrls, layerAlert, $q) {
		var PcService = {
			errorResult: function(value) {
				var _text;
				if(!value) {
					_text = "网络错误,请检查您的网络！";
				} else if(typeof value === "string") {
					_text = value !== "An error has occurred." ? value : "服务端错误，请联系管理员！";
				} else if(typeof value === "object") {
					if(!!value.Message) {
						_text = value.Message !== "An error has occurred." ? value.Message : "服务端错误，请联系管理员！";
					}
				} else {
					_text = "网络错误,请检查您的网络！";
				}
				return _text;
			}
		};
		$scope.account = {
			name: "",
			password: "",
			remember: true,
			require: true
		};

		var userInfo = JSON.parse(localStorage.getItem("userInfo"));
		if(userInfo) {
			$scope.account.name = userInfo.count;
			$scope.account.password = userInfo.password;
		}

		$scope.nameRequire = false;
		$scope.passwordRequire = false;

		var getPower = function(MyMenusJurisdiction, name) {
			var Power = false;
			MyMenusJurisdiction.DTOMenu.forEach(function(item, index) {
				if(item.StreetMenuName === name) {
					Power = item.Flag;
					return;
				}
			});

			return Power;
		};

		var loadSidebarMenu = function(MyMenusJurisdiction) {
			var menuJson = 'server/sidebar-menu.json',
				menuURL = menuJson + '?v=' + (new Date().getTime()); // jumps cache
			$http.get(menuURL).success(function(items) {
				var heading = items[0];
				heading.Power = true;
				for(var i = 1; i < items.length; i++) {
					var item = items[i];
					item.statusChild = true;
					item.color = true;
					if(item.submenu && item.submenu.length > 0) {
						item.Power = false;
						for(var j = 0; j < item.submenu.length; j++) {
							var _item = item.submenu[j];
							_item.Power = getPower(MyMenusJurisdiction, _item.sref);

							if(_item.Power) {
								item.Power = true;
							}
						}
					} else if(item.sref !== "#" && !item.submenu) {
						item.Power = getPower(MyMenusJurisdiction, item.sref);
					} else {
						item.Power = false;
					}
				}
				localStorage.setItem("menuItems", JSON.stringify(items));
				var ngstoragelayout = {
					isFixed: true,
					isCollapsed: false,
					isBoxed: false,
					isRTL: false,
					horizontal: false,
					isFloat: false,
					asideHover: false,
					theme: 2,
					logoName: "致强社区"
				};
				localStorage.setItem("ngStorage-layout", JSON.stringify(ngstoragelayout));

			}).error(function(data, status, headers, config) {
				layerAlert.error('菜单加载出错!');
			});
		};

		var getMyMenusJurisdiction = function(roleCode) {
			$http({
				headers: $rootScope.gHeader,
				method: 'get',
				url: serverUrls.newMenurolelist + "?roleCode=" + roleCode
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var MyMenusJurisdiction = response.Content;
					$rootScope.MyMenusJurisdiction = MyMenusJurisdiction;
					loadSidebarMenu(MyMenusJurisdiction);
					localStorage.setItem("MyMenusJurisdiction", JSON.stringify(MyMenusJurisdiction));
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//获取账户下的角色列表
		var getMyRoles = function(headers) {
			$scope.listBusyPromise = $http({
				headers: headers,
				method: 'get',
				url: serverUrls.getRole
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var mrRoles = response.Content;
					if(mrRoles.length > 0) {
						var rolesList = mrRoles;
						localStorage.setItem("rolesList", JSON.stringify(rolesList));
						var myRoleInfo = mrRoles[0];
						localStorage.setItem("myRoleInfo", JSON.stringify(myRoleInfo));
						/*var myRoleInfo = "";
						rolesList.forEach(function(item, index) {
							if(item.RoleId === 1) {
								myRoleInfo = item;
								localStorage.setItem("myRoleInfo", JSON.stringify(myRoleInfo));
								return;
							}
						});*/

						//根据角色获取菜单权限
						getMyMenusJurisdiction(myRoleInfo.RoleCode);
						setTimeout(function() {
							layerAlert.autoclose("登录成功，正在获取角色菜单..");
						}, 500);

						setTimeout(function() {
							$state.go("app.home");
						}, 800);
					} else {
						layerAlert.autoclose("当前账号下，没有任何角色！");
						return;
						setTimeout(function() {
							$state.go("page.login");
						}, 800);
					}
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//判断是否为员工
		var isEmployee = function(headers, defferd) {
			$scope.listBusyPromise = $http({
				headers: headers,
				method: 'get',
				url: serverUrls.loginFlag
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					defferd.resolve();
				} else {
					defferd.reject();
					layerAlert.autoclose("当前用户不是有效的员工账号！");
					return;
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//用户登录
		$scope.login = function() {
			$scope.nameRequire = !$scope.account.name;
			$scope.passwordRequire = !$scope.account.password;
			if($scope.nameRequire || $scope.passwordRequire) {
				return;
			}
			var _password = md5($scope.account.password) + "_" + md5(new Date().getTime());
			var name = $scope.account.name;
			var data = {
				name: name,
				password: _password,
				userType: 1
			};

			$scope.listBusyPromise = $http({
				method: 'post',
				url: serverUrls.residentLogin,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.userInfo = response.Content;
					var token = $scope.userInfo.Token;
					$rootScope.gHeader = {
						'Content-Type': 'undefined',
						"Authorization": "Bearer " + token,
						"Accept": "application/json"
					};
					$rootScope.pHeader = {
						'Content-Type': "application/json",
						"Authorization": "Bearer " + token,
						"Accept": "application/json"
					};
					$rootScope.iHeader = {
						"Authorization": "Bearer " + token,
						"Accept": "application/json"
					};
					/*var defferd = $q.defer();
					var promises = defferd.promise;
					isEmployee($rootScope.pHeader, defferd);
					promises.then(function(value) {*/
					var myCountInfo = {
						gHeader: $rootScope.gHeader,
						pHeader: $rootScope.pHeader,
						iHeader: $rootScope.iHeader,
						name: $scope.userInfo.Name,
						memberid: $scope.userInfo.IdentityCode,
						picture: $scope.userInfo.Images ? $scope.userInfo.Images : 'app/img/user/08.jpg',
						token: token,
					};
					localStorage.setItem("myCountInfo", JSON.stringify(myCountInfo));
					if($scope.account.remember) {
						var userInfo = {
							count: $scope.account.name,
							password: $scope.account.password,
							memberid: $scope.userInfo.IdentityCode
						};

						localStorage.setItem("userInfo", JSON.stringify(userInfo));
					} else {
						localStorage.removeItem("userInfo");
					}
					getMyRoles($rootScope.gHeader);
					/*}, function(value) {

					}, function(value) {

					});*/

				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//联系我们
		$scope.connectUs = function() {

		};
	}
]);
App.controller('topNavbarCtrl', ['$scope', '$rootScope', '$interval', '$http', 'serverUrls', 'layerAlert',
	function($scope, $rootScope, $interval, $http, serverUrls, layerAlert) {

		$scope.list = [];
		var param = {
			currentPage: 1,
			length: 9999,
			verify: false,
			history: false
		};

		var errorResult = function(value) {
			var _text;
			if(!value) {
				_text = value + "";
			} else if(typeof value === "string") {
				_text = value;
			} else if(typeof value === "object") {
				if(!!value.Message) {
					_text = value.Message;
				}
			} else {
				_text = value + "";
			}
			return _text;
		};

		//获取待办事项长度   
		var getMyToDOList = function() {
			var url = serverUrls.allWorkerscount;
			var completionUrl = "?";
			$http({
				headers: $rootScope.gHeader,
				method: "get",
				url: url
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.list = response.Content;
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(errorResult(error));
			});
		};

		//获取上报事项列表
		var getUpLoadList = function() {
			var url = serverUrls.eventFeedbackcount;
			var completionUrl = "?";
			if(param) {
				for(var x in param) {
					completionUrl += x + "=" + param[x] + "&";
				}
				url += completionUrl.substring(0, completionUrl.length - 1);
			}
			$http({
				headers: $rootScope.gHeader,
				method: "get",
				url: url
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.uplist = response.Content;
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(errorResult(error));
			});
		};

		getMyToDOList();
		getUpLoadList();
		$interval(function() {
			getMyToDOList();
			getUpLoadList();
		}, 600 * 1000);
	}
]);
App.controller("lockCtrl", ['$rootScope', '$scope', '$state', 'layerAlert', function($rootScope, $scope, $state, layerAlert) {

	$scope.lock = {
		password: ""
	};
	//解锁操作
	$scope.unLockScreen = function() {

		var userInfo = JSON.parse(localStorage.getItem("myCountInfo")) ? JSON.parse(localStorage.getItem("myCountInfo")) : undefined;
		if(!$scope.lock.password) {
			return;
		} else {
			if(userInfo) {
				var password = userInfo.password;
				if(password === $scope.lock.password) {
					layerAlert.autoclose("解锁成功,即将返回首页！");
					setTimeout(function() {
						$state.go("app.home");
					}, 1000);
				} else {
					layerAlert.autoclose("密码错误,请重新输入！");
				}
			} else {
				layerAlert.autoclose("登录失效,请重新登录！");
				setTimeout(function() {
					$state.go("app.login");
				}, 1000);
			}
		}
	}

}]);

/**=========================================================
 * Module: access-register.js
 * Demo for register account api
 =========================================================*/

App.controller('RegisterFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {

	// bind here all data from the form
	$scope.account = {};
	// place the message if something goes wrong
	$scope.authMsg = '';

	$scope.register = function() {
		$scope.authMsg = '';

		if($scope.registerForm.$valid) {

			$http.post('api/account/register', {
					email: $scope.account.email,
					password: $scope.account.password
				})
				.then(function(response) {
					// assumes if ok, response is an object with some data, if not, a string with error
					// customize according to your api
					if(!response.account) {
						$scope.authMsg = response;
					} else {
						$state.go('app.dashboard');
					}
				}, function(x) {
					$scope.authMsg = 'Server Request Error';
				});
		} else {
			// set as dirty if the user click directly to login so we show the validation messages
			$scope.registerForm.account_email.$dirty = true;
			$scope.registerForm.account_password.$dirty = true;
			$scope.registerForm.account_agreed.$dirty = true;

		}
	};

}]);

/**
 * AngularJS default filter with the following expression:
 * "person in people | filter: {name: $select.search, age: $select.search}"
 * performs a AND between 'name: $select.search' and 'age: $select.search'.
 * We want to perform a OR.
 */
App.filter('propsFilter', function() {
	return function(items, props) {
		var out = [];

		if(angular.isArray(items)) {
			items.forEach(function(item) {
				var itemMatches = false;

				var keys = Object.keys(props);
				for(var i = 0; i < keys.length; i++) {
					var prop = keys[i];
					var text = props[prop].toLowerCase();
					if(item[prop].toString().toLowerCase().indexOf(text) !== -1) {
						itemMatches = true;
						break;
					}
				}

				if(itemMatches) {
					out.push(item);
				}
			});
		} else {
			// Let the output be the input untouched
			out = items;
		}

		return out;
	};
});
/**=========================================================
 * Module: calendar-ui.js
 * This script handle the calendar demo with draggable 
 * events and events creations
 =========================================================*/

App.controller('CalendarController', ['$scope', function($scope) {
	'use strict';

	if(!$.fn.fullCalendar) return;

	// global shared var to know what we are dragging
	var draggingEvent = null;

	/**
	 * ExternalEvent object
	 * @param jQuery Object elements Set of element as jQuery objects
	 */
	var ExternalEvent = function(elements) {

		if(!elements) return;

		elements.each(function() {
			var $this = $(this);
			// create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
			// it doesn't need to have a start or end
			var calendarEventObject = {
				title: $.trim($this.text()) // use the element's text as the event title
			};

			// store the Event Object in the DOM element so we can get to it later
			$this.data('calendarEventObject', calendarEventObject);

			// make the event draggable using jQuery UI
			$this.draggable({
				zIndex: 1070,
				revert: true, // will cause the event to go back to its
				revertDuration: 0 //  original position after the drag
			});

		});
	};

	/**
	 * Invoke full calendar plugin and attach behavior
	 * @param  jQuery [calElement] The calendar dom element wrapped into jQuery
	 * @param  EventObject [events] An object with the event list to load when the calendar displays
	 */
	function initCalendar(calElement, events) {

		// check to remove elements from the list
		var removeAfterDrop = $('#remove-after-drop');

		calElement.fullCalendar({
			isRTL: $scope.app.layout.isRTL,
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			buttonIcons: { // note the space at the beginning
				prev: ' fa fa-caret-left',
				next: ' fa fa-caret-right'
			},
			buttonText: {
				today: 'today',
				month: 'month',
				week: 'week',
				day: 'day'
			},
			editable: true,
			droppable: true, // this allows things to be dropped onto the calendar 
			drop: function(date, allDay) { // this function is called when something is dropped

				var $this = $(this),
					// retrieve the dropped element's stored Event Object
					originalEventObject = $this.data('calendarEventObject');

				// if something went wrong, abort
				if(!originalEventObject) return;

				// clone the object to avoid multiple events with reference to the same object
				var clonedEventObject = $.extend({}, originalEventObject);

				// assign the reported date
				clonedEventObject.start = date;
				clonedEventObject.allDay = allDay;
				clonedEventObject.backgroundColor = $this.css('background-color');
				clonedEventObject.borderColor = $this.css('border-color');

				// render the event on the calendar
				// the last `true` argument determines if the event "sticks" 
				// (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
				calElement.fullCalendar('renderEvent', clonedEventObject, true);

				// if necessary remove the element from the list
				if(removeAfterDrop.is(':checked')) {
					$this.remove();
				}
			},
			eventDragStart: function(event, js, ui) {
				draggingEvent = event;
			},
			// This array is the events sources
			events: events
		});
	}

	/**
	 * Inits the external events panel
	 * @param  jQuery [calElement] The calendar dom element wrapped into jQuery
	 */
	function initExternalEvents(calElement) {
		// Panel with the external events list
		var externalEvents = $('.external-events');

		// init the external events in the panel
		new ExternalEvent(externalEvents.children('div'));

		// External event color is danger-red by default
		var currColor = '#f6504d';
		// Color selector button
		var eventAddBtn = $('.external-event-add-btn');
		// New external event name input
		var eventNameInput = $('.external-event-name');
		// Color switchers
		var eventColorSelector = $('.external-event-color-selector .circle');

		// Trash events Droparea 
		$('.external-events-trash').droppable({
			accept: '.fc-event',
			activeClass: 'active',
			hoverClass: 'hovered',
			tolerance: 'touch',
			drop: function(event, ui) {

				// You can use this function to send an ajax request
				// to remove the event from the repository

				if(draggingEvent) {
					var eid = draggingEvent.id || draggingEvent._id;
					// Remove the event
					calElement.fullCalendar('removeEvents', eid);
					// Remove the dom element
					ui.draggable.remove();
					// clear
					draggingEvent = null;
				}
			}
		});

		eventColorSelector.click(function(e) {
			e.preventDefault();
			var $this = $(this);

			// Save color
			currColor = $this.css('background-color');
			// De-select all and select the current one
			eventColorSelector.removeClass('selected');
			$this.addClass('selected');
		});

		eventAddBtn.click(function(e) {
			e.preventDefault();

			// Get event name from input
			var val = eventNameInput.val();
			// Dont allow empty values
			if($.trim(val) === '') return;

			// Create new event element
			var newEvent = $('<div/>').css({
					'background-color': currColor,
					'border-color': currColor,
					'color': '#fff'
				})
				.html(val);

			// Prepends to the external events list
			externalEvents.prepend(newEvent);
			// Initialize the new event element
			new ExternalEvent(newEvent);
			// Clear input
			eventNameInput.val('');
		});
	}

	/**
	 * Creates an array of events to display in the first load of the calendar
	 * Wrap into this function a request to a source to get via ajax the stored events
	 * @return Array The array with the events
	 */
	function createDemoEvents() {
		// Date for the calendar events (dummy data)
		var date = new Date();
		var d = date.getDate(),
			m = date.getMonth(),
			y = date.getFullYear();

		return [{
			title: 'All Day Event',
			start: new Date(y, m, 1),
			backgroundColor: '#f56954', //red 
			borderColor: '#f56954' //red
		}, {
			title: 'Long Event',
			start: new Date(y, m, d - 5),
			end: new Date(y, m, d - 2),
			backgroundColor: '#f39c12', //yellow
			borderColor: '#f39c12' //yellow
		}, {
			title: 'Meeting',
			start: new Date(y, m, d, 10, 30),
			allDay: false,
			backgroundColor: '#0073b7', //Blue
			borderColor: '#0073b7' //Blue
		}, {
			title: 'Lunch',
			start: new Date(y, m, d, 12, 0),
			end: new Date(y, m, d, 14, 0),
			allDay: false,
			backgroundColor: '#00c0ef', //Info (aqua)
			borderColor: '#00c0ef' //Info (aqua)
		}, {
			title: 'Birthday Party',
			start: new Date(y, m, d + 1, 19, 0),
			end: new Date(y, m, d + 1, 22, 30),
			allDay: false,
			backgroundColor: '#00a65a', //Success (green)
			borderColor: '#00a65a' //Success (green)
		}, {
			title: 'Open Google',
			start: new Date(y, m, 28),
			end: new Date(y, m, 29),
			url: '//google.com/',
			backgroundColor: '#3c8dbc', //Primary (light-blue)
			borderColor: '#3c8dbc' //Primary (light-blue)
		}];
	}

	// When dom ready, init calendar and events
	$(function() {

		// The element that will display the calendar
		var calendar = $('#calendar');

		var demoEvents = createDemoEvents();

		initExternalEvents(calendar);

		initCalendar(calendar, demoEvents);

	});

}]);

/**=========================================================
 * Module: chartist.js
 =========================================================*/

App.controller('ChartistController', ['$scope', function($scope) {
	'use strict';

	// Line chart
	// ----------------------------------- 

	$scope.lineData = {
		labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
		series: [
			[12, 9, 7, 8, 5],
			[2, 1, 3.5, 7, 3],
			[1, 3, 4, 5, 6]
		]
	};

	$scope.lineOptions = {
		fullWidth: true,
		height: 220,
		chartPadding: {
			right: 40
		}
	};

	// Bar bipolar
	// ----------------------------------- 

	$scope.barBipolarOptions = {
		high: 10,
		low: -10,
		height: 220,
		axisX: {
			labelInterpolationFnc: function(value, index) {
				return index % 2 === 0 ? value : null;
			}
		}
	};
	$scope.barBipolarData = {
		labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
		series: [
			[1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
		]
	};

	// Bar horizontal
	// ----------------------------------- 

	$scope.barHorizontalData = {
		labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		series: [
			[5, 4, 3, 7, 5, 10, 3],
			[3, 2, 9, 5, 4, 6, 4]
		]
	};

	$scope.barHorizontalOptions = {
		seriesBarDistance: 10,
		reverseData: true,
		horizontalBars: true,
		height: 220,
		axisY: {
			offset: 70
		}
	};

	// Smil Animations
	// ----------------------------------- 

	// Let's put a sequence number aside so we can use it in the event callbacks
	var seq = 0,
		delays = 80,
		durations = 500;

	$scope.smilData = {
		labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		series: [
			[12, 9, 7, 8, 5, 4, 6, 2, 3, 3, 4, 6],
			[4, 5, 3, 7, 3, 5, 5, 3, 4, 4, 5, 5],
			[5, 3, 4, 5, 6, 3, 3, 4, 5, 6, 3, 4],
			[3, 4, 5, 6, 7, 6, 4, 5, 6, 7, 6, 3]
		]
	};

	$scope.smilOptions = {
		low: 0,
		height: 260
	};

	$scope.smilEvents = {
		created: function() {
			seq = 0;
		},
		draw: function(data) {
			seq++;

			if(data.type === 'line') {
				// If the drawn element is a line we do a simple opacity fade in. This could also be achieved using CSS3 animations.
				data.element.animate({
					opacity: {
						// The delay when we like to start the animation
						begin: seq * delays + 1000,
						// Duration of the animation
						dur: durations,
						// The value where the animation should start
						from: 0,
						// The value where it should end
						to: 1
					}
				});
			} else if(data.type === 'label' && data.axis === 'x') {
				data.element.animate({
					y: {
						begin: seq * delays,
						dur: durations,
						from: data.y + 100,
						to: data.y,
						// We can specify an easing function from Chartist.Svg.Easing
						easing: 'easeOutQuart'
					}
				});
			} else if(data.type === 'label' && data.axis === 'y') {
				data.element.animate({
					x: {
						begin: seq * delays,
						dur: durations,
						from: data.x - 100,
						to: data.x,
						easing: 'easeOutQuart'
					}
				});
			} else if(data.type === 'point') {
				data.element.animate({
					x1: {
						begin: seq * delays,
						dur: durations,
						from: data.x - 10,
						to: data.x,
						easing: 'easeOutQuart'
					},
					x2: {
						begin: seq * delays,
						dur: durations,
						from: data.x - 10,
						to: data.x,
						easing: 'easeOutQuart'
					},
					opacity: {
						begin: seq * delays,
						dur: durations,
						from: 0,
						to: 1,
						easing: 'easeOutQuart'
					}
				});
			} else if(data.type === 'grid') {

				// Using data.axis we get x or y which we can use to construct our animation definition objects
				var pos1Animation = {
					begin: seq * delays,
					dur: durations,
					from: data[data.axis + '1'] - 30,
					to: data[data.axis + '1'],
					easing: 'easeOutQuart'
				};

				var pos2Animation = {
					begin: seq * delays,
					dur: durations,
					from: data[data.axis + '2'] - 100,
					to: data[data.axis + '2'],
					easing: 'easeOutQuart'
				};

				var animations = {};
				animations[data.axis + '1'] = pos1Animation;
				animations[data.axis + '2'] = pos2Animation;
				animations['opacity'] = {
					begin: seq * delays,
					dur: durations,
					from: 0,
					to: 1,
					easing: 'easeOutQuart'
				};

				data.element.animate(animations);
			}
		}
	};

	// SVG PATH animation
	// ----------------------------------- 

	$scope.pathData = {
		labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		series: [
			[1, 5, 2, 5, 4, 3],
			[2, 3, 4, 8, 1, 2],
			[5, 4, 3, 2, 1, 0.5]
		]
	};

	$scope.pathOptions = {
		low: 0,
		showArea: true,
		showPoint: false,
		fullWidth: true,
		height: 260
	};

	$scope.pathEvents = {
		draw: function(data) {
			if(data.type === 'line' || data.type === 'area') {
				data.element.animate({
					d: {
						begin: 2000 * data.index,
						dur: 2000,
						from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
						to: data.path.clone().stringify(),
						easing: Chartist.Svg.Easing.easeOutQuint
					}
				});
			}
		}
	};

}]);

/**=========================================================
 * Module: code-editor.js
 * Codemirror code editor controller
 =========================================================*/

App.controller('CodeEditorController', ['$scope', '$http', '$ocLazyLoad', function($scope, $http, $ocLazyLoad) {

	$scope.editorThemes = ['3024-day', '3024-night', 'ambiance-mobile', 'ambiance', 'base16-dark', 'base16-light', 'blackboard', 'cobalt', 'eclipse', 'elegant', 'erlang-dark', 'lesser-dark', 'mbo', 'mdn-like', 'midnight', 'monokai', 'neat', 'neo', 'night', 'paraiso-dark', 'paraiso-light', 'pastel-on-dark', 'rubyblue', 'solarized', 'the-matrix', 'tomorrow-night-eighties', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light'];

	$scope.editorOpts = {
		mode: 'javascript',
		lineNumbers: true,
		matchBrackets: true,
		theme: 'mbo',
		viewportMargin: Infinity
	};

	$scope.refreshEditor = 0;

	// Load dinamically the stylesheet for the selected theme
	// You can use ozLazyLoad to load also the mode js based 
	// on the file extension that is loaded (see handle_filetree)
	$scope.loadTheme = function() {
		var BASE = 'vendor/codemirror/theme/';
		$ocLazyLoad.load(BASE + $scope.editorOpts.theme + '.css');
		$scope.refreshEditor = !$scope.refreshEditor;
	};
	// load default theme
	$scope.loadTheme($scope.editorOpts.theme);
	// Add some initial text
	$scope.code = "// Open a file from the left menu \n" +
		"// It will be requested to the server and loaded into the editor\n" +
		"// Also try adding a New File from the toolbar\n";

	// Tree

	var selectedBranch;
	$scope.handle_filetree = function(branch) {

		selectedBranch = branch;

		var basePath = 'server/editor/';
		var isFolder = !!branch.children.length;

		console.log("You selected: " + branch.label + ' - isFolder? ' + isFolder);

		if(!isFolder) {

			$http
				.get(basePath + branch.path)
				.success(function(response) {

					console.log('Loaded.. ' + branch.path);
					// set the new code into the editor
					$scope.code = response;

					$scope.editorOpts.mode = detectMode(branch.path);
					console.log('Mode is: ' + $scope.editorOpts.mode);

				});
		}
	};

	function detectMode(file) {
		var ext = file.split('.');
		ext = ext ? ext[ext.length - 1] : '';
		switch(ext) {
			case 'html':
				return 'htmlmixed';
			case 'css':
				return 'css';
			default:
				return 'javascript';
		}
	}

	var tree;
	tree = $scope.filetree = {};

	// Adds a new branch to the tree
	$scope.new_filetree = function() {
		var b;
		b = tree.get_selected_branch();

		// if we select a leaf -> select the parent folder
		if(b && b.children.length === 0) {
			b = tree.get_parent_branch(b);
		}

		return tree.add_branch(b, {
			"label": "another.html",
			"path": "source/another.html"
		});
	};

}]).service('LoadTreeService', ["$resource", function($resource) {
	return $resource('server/editor/filetree.json');
}]);

/**=========================================================
 * Module: datatable,js
 * Angular Datatable controller
 =========================================================*/

/**=========================================================
 * Module: main.js
 * Main Application Controller
 =========================================================*/

App.controller('AppController', ['$rootScope', '$scope', '$http', '$state', '$translate', '$window', '$localStorage', '$timeout', 'toggleStateService', 'colors', 'browser', 'cfpLoadingBar', 'layerAlert', 'serverUrls',
	function($rootScope, $scope, $http, $state, $translate, $window, $localStorage, $timeout, toggle, colors, browser, cfpLoadingBar, layerAlert, serverUrls) {
		"use strict";

		var myCountInfo = JSON.parse(localStorage.getItem("myCountInfo"));
		var myRoleInfo = JSON.parse(localStorage.getItem("myRoleInfo"));
		var rolesList = JSON.parse(localStorage.getItem("rolesList"));
		var MyMenusJurisdiction = JSON.parse(localStorage.getItem("MyMenusJurisdiction"));
		/*localStorage.setItem("ngStorage-layout",JSON.stringify($rootScope.app.layout) );*/
		var ngStorageLayout = JSON.parse(localStorage.getItem("ngStorage-layout"));
		if(!myCountInfo) {
			layerAlert.autoclose("登录已过期,请重新登录!");
			setTimeout(function() {
				$state.go("page.login");
			}, 1500);
		} else {
			$rootScope.gHeader = myCountInfo.gHeader;
			$rootScope.pHeader = myCountInfo.pHeader;
			$rootScope.iHeader = myCountInfo.iHeader;
			$rootScope.myRoleInfo = myRoleInfo;
			$rootScope.rolesList = rolesList;
			$rootScope.MyMenusJurisdiction = MyMenusJurisdiction;
			$rootScope.user.name = myCountInfo.name;
			$rootScope.user.memberid = myCountInfo.memberid;
			$rootScope.user.picture = myCountInfo.picture ? myCountInfo.picture : 'app/img/user/08.jpg';
			$rootScope.user.job = myRoleInfo.RoleName;
			$rootScope.app.layout = ngStorageLayout;
			$rootScope.app.name = ngStorageLayout ? "智慧" + ngStorageLayout.logoName : $rootScope.app.name;
			//$rootScope.output = "当前选择: " + $rootScope.app.theme.uuid;
		}

		var getPower = function(MyMenusJurisdiction, name) {
			var Power = false;
			MyMenusJurisdiction.DTOMenu.forEach(function(item, index) {
				if(item.StreetMenuName === name) {
					Power = item.Flag;
					return;
				}
			});

			return Power;
		};

		$scope.getLogoImg = function(theme) {
			var logoUrl = "";
			switch(theme) {
				case 1:
					logoUrl = "img/logo.jpg";
					break;
				case 2:
					logoUrl = "img/logo_c.jpg";
					break;
				case 3:
					logoUrl = "img/logo_t.jpg";
					break;
				default:
					break;
			}

			return logoUrl;
		};

		var loadSidebarMenu = function(MyMenusJurisdiction, isFresh) {
			var menuJson = '';

			switch($rootScope.app.layout.theme) {
				case 1:
					menuJson = "server/sidebar-menu-street.json";
					break;
				case 2:
					menuJson = "server/sidebar-menu.json";
					break;
				case 3:
					menuJson = "server/sidebar-menu-courtyard.json";
					break;
				default:
					menuJson = "server/sidebar-menu.json";
					break;
			}
			var menuURL = menuJson + '?v=' + (new Date().getTime()); // jumps cache
			$http.get(menuURL).success(function(items) {
				var heading = items[0];
				heading.Power = true;
				for(var i = 1; i < items.length; i++) {
					var item = items[i];
					if(item.submenu && item.submenu.length > 0) {
						item.Power = false;
						for(var j = 0; j < item.submenu.length; j++) {
							var _item = item.submenu[j];
							_item.Power = getPower(MyMenusJurisdiction, _item.sref);
							if(_item.Power) {
								item.Power = true;
							}
						}
					} else if(item.sref !== "#" && !item.submenu) {
						item.Power = getPower(MyMenusJurisdiction, item.sref);
					} else {
						item.Power = false;
					}
				}
				localStorage.setItem("menuItems", JSON.stringify(items));
				if(isFresh) {
					//location.reload();
					$rootScope.menuItems = items;
					$timeout(function() {
						$rootScope.isLoading = false;
						$state.go("app.home");
					}, 600);
				}

			}).error(function(data, status, headers, config) {
				layerAlert.error('菜单加载出错!');
			});
		};

		//重新获取菜单列表
		$scope.reGetMemus = function() {
			$rootScope.menuItems = JSON.parse(localStorage.getItem("menuItems"));
			if($rootScope.menuItems && $rootScope.menuItems.length === 0) {

				layerAlert.autoclose("当前角色下暂无任何菜单！");
			}
		};

		var getMyMenusJurisdiction = function(RoleCode, isFresh) {
			$rootScope.isLoading = true;
			/*$scope.menuPromise =*/
			$http({
				headers: $rootScope.gHeader,
				method: 'get',
				url: serverUrls.newMenurolelist + "?roleCode=" + RoleCode
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					var MyMenusJurisdiction = response.Content;
					$rootScope.MyMenusJurisdiction = MyMenusJurisdiction;
					loadSidebarMenu(MyMenusJurisdiction, isFresh);
					localStorage.setItem("MyMenusJurisdiction", JSON.stringify(MyMenusJurisdiction));
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(error + "");
			});
		};

		$rootScope.changRole = function(x) {
			var myRoleInfo = JSON.parse(localStorage.getItem("myRoleInfo"));
			if(myRoleInfo.RoleCode === x.RoleCode) {
				layerAlert.autoclose("已经是当前角色！");
				return;
			} else {
				localStorage.setItem("myRoleInfo", JSON.stringify(x));
				getMyMenusJurisdiction(x.RoleCode, true);
				$rootScope.user.job = x.RoleDescription;
			}
		};

		// Setup the layout mode
		$rootScope.app.layout = {};
		$rootScope.app.layout.horizontal = ($rootScope.$stateParams.layout == 'app-h');
		// Loading bar transition
		// ----------------------------------- 
		var thBar;
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			if($('.wrapper > section').length) // check if bar container exists
				thBar = $timeout(function() {
					cfpLoadingBar.start();
				}, 0); // sets a latency Threshold
		});
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			event.targetScope.$watch("$viewContentLoaded", function() {
				$timeout.cancel(thBar);
				cfpLoadingBar.complete();
			});
		});

		// Hook not found
		$rootScope.$on('$stateNotFound',
			function(event, unfoundState, fromState, fromParams) {
				console.log(unfoundState.to); // "lazy.state"
				console.log(unfoundState.toParams); // {a:1, b:2}
				console.log(unfoundState.options); // {inherit:false} + default options
			});
		// Hook error
		$rootScope.$on('$stateChangeError',
			function(event, toState, toParams, fromState, fromParams, error) {
				console.log(error);
			});
		// Hook success
		$rootScope.$on('$stateChangeSuccess',
			function(event, toState, toParams, fromState, fromParams) {
				// display new view from top
				$window.scrollTo(0, 0);
				// Save the route title
				$rootScope.currTitle = $state.current.title;
			});

		$rootScope.pageTitle = function() {
			$rootScope.currTitle = $state.current.title;
			var title = $rootScope.app.name + '-' + ($rootScope.currTitle || $rootScope.app.description);
			document.title = title;
			return title;
		};

		// iPad may presents ghost click issues
		// if( ! browser.ipad )
		// FastClick.attach(document.body);

		// Close submenu when sidebar change from collapsed to normal
		$rootScope.$watch('app.layout.isCollapsed', function(newValue, oldValue) {
			if(newValue === false)
				$rootScope.$broadcast('closeSidebarMenu');
		});

		// Restore layout settings
		if(angular.isDefined($localStorage.layout))
			$scope.app.layout = $localStorage.layout;
		else
			$localStorage.layout = $scope.app.layout;

		$rootScope.$watch("app.layout", function() {
			$localStorage.layout = $scope.app.layout;
		}, true);

		// Allows to use branding color with interpolation
		// {{ colorByName('primary') }}
		$scope.colorByName = colors.byName;

		// Hides/show user avatar on sidebar
		$scope.toggleUserBlock = function() {
			$scope.$broadcast('toggleUserBlock');
		};

		//退出系统
		$scope.exitStstem = function() {
			layerAlert.checkone("选择操作", function() {
				var userInfo = JSON.parse(localStorage.getItem("userInfo"));
				localStorage.clear();
				localStorage.setItem("userInfo", JSON.stringify(userInfo));
				$state.go("page.login");
			}, function() {
				return;
			}, "确定", "取消", true, true, "确定要退出当前系统吗?");
		};

		// Internationalization
		// ----------------------

		$scope.language = {
			// Handles language dropdown
			listIsOpen: false,
			// list of available languages
			available: {
				'en': 'English',
				'es_AR': 'Español',
				'zh': 'chinese'
			},
			// display always the current ui language
			init: function() {
				var proposedLanguage = $translate.proposedLanguage() || $translate.use();
				var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
				$scope.language.selected = $scope.language.available[(proposedLanguage || preferredLanguage)];
			},
			set: function(localeId, ev) {
				// Set the new idiom
				$translate.use(localeId);
				// save a reference for the current language
				$scope.language.selected = $scope.language.available[localeId];
				// finally toggle dropdown
				$scope.language.listIsOpen = !$scope.language.listIsOpen;
			}
		};

		$scope.language.init();

		// Restore application classes state
		toggle.restoreState($(document.body));

		// cancel click event easily
		$rootScope.cancel = function($event) {
			$event.stopPropagation();
		};

	}
]);

App.controller('SidebarController', ['$rootScope', '$scope', '$state', '$http', '$timeout', 'Utils', 'layerAlert',
	function($rootScope, $scope, $state, $http, $timeout, Utils, layerAlert) {

		var collapseList = [];

		// demo: when switch from collapse to hover, close all items
		$rootScope.$watch('app.layout.asideHover', function(oldVal, newVal) {
			if(newVal === false && oldVal === true) {
				closeAllBut(-1);
			}
		});

		// Check item and children active state
		var isActive = function(item) {
			if(!item) return;
			if(!item.sref || item.sref == '#') {
				var foundActive = false;
				angular.forEach(item.submenu, function(value, key) {
					if(isActive(value)) foundActive = true;
				});
				return foundActive;
			} else
				return $state.is(item.sref) || $state.includes(item.sref);
		};

		// Load menu from json file
		// ----------------------------------- 

		$scope.getMenuItemPropClasses = function(item) {
			return(item.heading ? 'nav-heading' : '') +
				(isActive(item) ? ' active' : '') +
				(item.islast ? ' islast' : '');
		};

		$rootScope.menuItems = JSON.parse(localStorage.getItem("menuItems"));

		// Handle sidebar collapse items
		// ----------------------------------- 
		$scope.addCollapse = function($index, item) {
			collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
		};

		$scope.isCollapse = function($index) {
			return(collapseList[$index]);
		};

		$scope.toggleCollapse = function($event, $index, isParentItem, item) {

			$event.stopPropagation();
			if(isParentItem) {
				item.color = !item.color
			}
			if(item) {
				$scope.menuItems.forEach(function(_item, _index) {
					_item.color = true;
					if(_index === $index && collapseList[$index]) {
						_item.color = false;
					}
				});
			}
			if(item) {
				item.statusChild = !item.statusChild;
			} else {
				return true;
			}
			// collapsed sidebar doesn't toggle drodopwn
			if(Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover) {
				return true;
			}
			// make sure the item index exists
			if(angular.isDefined(collapseList[$index])) {
				if(!$scope.lastEventFromChild) {
					collapseList[$index] = !collapseList[$index];
					closeAllBut($index);
				}
			} else if(isParentItem) {
				closeAllBut(-1);
			}

			$scope.lastEventFromChild = isChild($index);
			$rootScope.pageTitle();
			return true;

		};

		function closeAllBut(index) {
			index += '';
			for(var i in collapseList) {
				if(index < 0 || index.indexOf(i) < 0)
					collapseList[i] = true;
			}
		}

		function isChild($index) {
			return(typeof $index === 'string') && !($index.indexOf('-') < 0);
		}
		//首页菜单图标显示
		$scope.indexMenu = function(item) {
			if(item.color) {
				return 'fa fa-chevron-down';
			} else {
				return 'fa fa-chevron-up';
			}

		}

	}
]);

/**=========================================================
 /**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

App.controller('AbnTestController', ['$scope', '$rootScope', '$timeout', '$resource', 'layerAlert', '$http', '$state',
	function($scope, $rootScope, $timeout, $resource, layerAlert, $http, $state) {

		var getPower = function(MyMenusJurisdiction, name) {
			var Power = false;
			MyMenusJurisdiction.DTOMenu.forEach(function(item, index) {
				if(item.StreetMenuName === name) {
					Power = item.Flag;
					return;
				}
			});

			return Power;
		};

		//切换院落获取不同的菜单
		var changeLvelMenus = function(branch,numb) {
			var menuFileUrl = "";
			switch(branch.level) {
				case 1:
					menuFileUrl = "server/sidebar-menu-street.json";
					break;
				case 2:
					menuFileUrl = "server/sidebar-menu.json";
					break;
				case 3:
					menuFileUrl = "server/sidebar-menu-courtyard.json";
					break;
				default:
					menuFileUrl = "server/sidebar-menu.json";
					break;
			}
			$scope.listBusyPromise = $http.get(menuFileUrl).success(function(items) {
				var heading = items[0];
				heading.Power = true;
				for(var i = 1; i < items.length; i++) {
					var item = items[i];
					item.statusChild = true;
					item.color = true;
					if(item.submenu && item.submenu.length > 0) {
						item.Power = false;
						for(var j = 0; j < item.submenu.length; j++) {
							var _item = item.submenu[j];
							_item.Power = getPower($rootScope.MyMenusJurisdiction, _item.sref);
							if(_item.Power) {
								item.Power = true;
							}
						}
					} else if(item.sref !== "#" && !item.submenu) {
						item.Power = getPower($rootScope.MyMenusJurisdiction, item.sref);
					} else {
						item.Power = false;
					}
				}
				$rootScope.menuItems = items;
				$rootScope.app.layout.theme = branch.level;
				$rootScope.app.name = "智慧" + branch.label;
				$rootScope.app.layout.logoName = branch.label;
				$rootScope.app.layout.uuid = branch.uid;
				if(numb===1){
					
				}else{
					$state.go("app.home");
				}
				
				localStorage.setItem("menuItems", JSON.stringify(items));
				localStorage.setItem("ngStorage-layout", JSON.stringify($rootScope.app.layout));
			}).error(function(data, status, headers, config) {
				layerAlert.error('菜单加载出错!');
			});

		};
		// onSelect event handlers
		var apple_selected = function(branch, isFirst, selected_branchCallback, isInit) {
			if(isFirst) {
				$scope.output = "当前选择: " + branch.label;
				$scope.for_each_branch(function(b) {
					if(b.label === $rootScope.app.layout.logoName) {
						b.selected = true;
					}
				});
				if(isInit) {
					changeLvelMenus(branch,1);
					selected_branchCallback(true, branch);
				}
				return;
			} else {
				layerAlert.checkone("确定要切换到" + branch.label + "吗？", function() {
					$scope.output = "当前选择: " + branch.label;
					var levelText = "";
					$scope.for_each_branch(function(b) {
						b.selected = false;
					});
					branch.selected = true;
					changeLvelMenus(branch);
					selected_branchCallback(true, branch);
				}, function() {
					selected_branchCallback(false, branch);
				}, "确定", "取消", true, true);

			}

		};

		var treedata_avm = [{
			label: '青龙街道',
			onSelect: apple_selected,
			children: [{
				label: '致强社区',
				onSelect: apple_selected,
				children: [{
					label: '西林豫府',
					onSelect: apple_selected
				}]
			}]
		}];

		$scope.my_data = treedata_avm;

		var tree;
		// This is our API control variable
		$scope.my_tree = tree = {};

		// Adds a new branch to the tree
		$scope.try_adding_a_branch = function() {
			var b;
			b = tree.get_selected_branch();
			return tree.add_branch(b, {
				label: 'New Branch',
				data: {
					something: 42,
					"else": 43
				}
			});
		};

	}
]);

App.controller('UserBlockController', ['$scope', function($scope) {

	$scope.userBlockVisible = true;

	$scope.$on('toggleUserBlock', function(event, args) {

		$scope.userBlockVisible = !$scope.userBlockVisible;

	});

}]);

/**=========================================================
 * Module: anchor.js
 * Disables null anchor behavior
 =========================================================*/

App.directive('href', function() {

	return {
		restrict: 'A',
		compile: function(element, attr) {
			return function(scope, element) {
				if(attr.ngClick || attr.href === '' || attr.href === '#') {
					if(!element.hasClass('dropdown-toggle'))
						element.on('click', function(e) {
							e.preventDefault();
							e.stopPropagation();
						});
				}
			};
		}
	};
});
/**=========================================================
 * Module: animate-enabled.js
 * Enable or disables ngAnimate for element with directive
 =========================================================*/

App.directive("animateEnabled", ["$animate", function($animate) {
	return {
		link: function(scope, element, attrs) {
			scope.$watch(function() {
				return scope.$eval(attrs.animateEnabled, scope);
			}, function(newValue) {
				$animate.enabled(!!newValue, element);
			});
		}
	};
}]);
/**=========================================================
 * Module: chart.js
 * Wrapper directive for chartJS. 
 * Based on https://gist.github.com/AndreasHeiberg/9837868
 =========================================================*/

var ChartJS = function(type) {
	return {
		restrict: "A",
		scope: {
			data: "=",
			options: "=",
			id: "@",
			width: "=",
			height: "=",
			resize: "=",
			chart: "@",
			segments: "@",
			responsive: "=",
			tooltip: "=",
			legend: "="
		},
		link: function($scope, $elem) {
			var ctx = $elem[0].getContext("2d");
			var autosize = false;

			$scope.size = function() {
				if($scope.width <= 0) {
					$elem.width($elem.parent().width());
					ctx.canvas.width = $elem.width();
				} else {
					ctx.canvas.width = $scope.width || ctx.canvas.width;
					autosize = true;
				}

				if($scope.height <= 0) {
					$elem.height($elem.parent().height());
					ctx.canvas.height = ctx.canvas.width / 2;
				} else {
					ctx.canvas.height = $scope.height || ctx.canvas.height;
					autosize = true;
				}
			};

			$scope.$watch("data", function(newVal, oldVal) {
				if(chartCreated)
					chartCreated.destroy();

				// if data not defined, exit
				if(!newVal) {
					return;
				}
				if($scope.chart) {
					type = $scope.chart;
				}

				if(autosize) {
					$scope.size();
					chart = new Chart(ctx);
				}

				if($scope.responsive || $scope.resize)
					$scope.options.responsive = true;

				if($scope.responsive !== undefined)
					$scope.options.responsive = $scope.responsive;

				chartCreated = chart[type]($scope.data, $scope.options);
				chartCreated.update();
				if($scope.legend)
					angular.element($elem[0]).parent().after(chartCreated.generateLegend());
			}, true);

			$scope.$watch("tooltip", function(newVal, oldVal) {
				if(chartCreated)
					chartCreated.draw();
				if(newVal === undefined || !chartCreated.segments)
					return;
				if(!isFinite(newVal) || newVal >= chartCreated.segments.length || newVal < 0)
					return;
				var activeSegment = chartCreated.segments[newVal];
				activeSegment.save();
				activeSegment.fillColor = activeSegment.highlightColor;
				chartCreated.showTooltip([activeSegment]);
				activeSegment.restore();
			}, true);

			$scope.size();
			var chart = new Chart(ctx);
			var chartCreated;
		}
	};
};

/*最大宽度*/
App.directive("maxWidth", function() {
	return {
		restrict: 'EA',
		replace: true,
		scope: {
			maxWidth: '@',
			callback: '&uifCallback',
		},
		link: function(scope, element, attr) {
			var $ele = $(element);
			$ele.css({
				"width": scope.maxWidth
			});
		}

	};
});

/*kindEditor*/
App.directive('uiKindeditor', ['serverUrls', 'uiLoad', '$timeout', function(serverUrls, uiLoad, $timeout) {
	return {
		restrict: 'ACEM',
		require: '?ngModel',
		scope: {},
		link: function(scope, element, attrs, kindEditorController) {
			var kindeditor;
			var authorization = scope.$root.pHeader["Authorization"];
			$timeout(function() {
				kindeditor = KindEditor.create(element[0], {
					afterChange: function() {
						kindEditorController.$setViewValue(this.html());
					},
					cssPath: 'vendor/angular-kindEditor/vendor/kindeditor-4.1.10/plugins/code/prettify.css',
					uploadJson: serverUrls.richTextFileUpLoad,
					uploadResultJson: serverUrls.richTextFileUpLoadResult,
					fileManagerJson: serverUrls.richTextFilesManage,
					allowFileManager: true,
					extraFileUploadParams: {
						"Authorization": authorization
					},
					ajaxCustomHeaders: {
						"Authorization": authorization
					},
					baseImageDir: serverUrls.richTextFilesDomain,
				});
				kindEditorController.$render = function() {
					kindeditor.html(kindEditorController.$viewValue);
				}
			}, 0);

		}
	}
}]);

/* Aliases for various chart types */
App.directive("chartjs", function() {
	return ChartJS();
});
App.directive("linechart", function() {
	return ChartJS("Line");
});
App.directive("barchart", function() {
	return ChartJS("Bar");
});
App.directive("radarchart", function() {
	return ChartJS("Radar");
});
App.directive("polarchart", function() {
	return ChartJS("PolarArea");
});
App.directive("piechart", function() {
	return ChartJS("Pie");
});
App.directive("doughnutchart", function() {
	return ChartJS("Doughnut");
});
App.directive("donutchart", function() {
	return ChartJS("Doughnut");
});

/**=========================================================
 * Module: classy-loader.js
 * Enable use of classyloader directly from data attributes
 =========================================================*/

App.directive('classyloader', ["$timeout", "Utils", function($timeout, Utils) {
	'use strict';

	var $scroller = $(window),
		inViewFlagClass = 'js-is-in-view'; // a classname to detect when a chart has been triggered after scroll

	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			// run after interpolation  
			$timeout(function() {

				var $element = $(element),
					options = $element.data();

				// At lease we need a data-percentage attribute
				if(options) {
					if(options.triggerInView) {

						$scroller.scroll(function() {
							checkLoaderInVIew($element, options);
						});
						// if the element starts already in view
						checkLoaderInVIew($element, options);
					} else
						startLoader($element, options);
				}

			}, 0);

			function checkLoaderInVIew(element, options) {
				var offset = -20;
				if(!element.hasClass(inViewFlagClass) &&
					Utils.isInView(element, {
						topoffset: offset
					})) {
					startLoader(element, options);
				}
			}

			function startLoader(element, options) {
				element.ClassyLoader(options).addClass(inViewFlagClass);
			}
		}
	};
}]);
/**=========================================================
 * Create new imageFileUploader direcitive.
 * Create by PengCong at 2017-11-03 17:23.
 =========================================================*/
App.directive('imageFileUploader', function($http, $rootScope, serverUrls) {
	/* ng-disabled="uifDisabled"*/
	var templateHtmlString = '<div class="uploadBusyBox" cg-busy="uploadBusyPromise"><input type="file" role="uploader" ng-show="false" />' +
		'<img ng-src="{{defaultUrl}}" role="trigger" width="120" title="点击上传图片" alt="点击上传图片">' +
		'<span class="delImage" role="deletImg" title="点击删除图片">x</span>';
	return {
		restrict: 'EA',
		template: templateHtmlString,
		replace: true,
		scope: {
			defaultUrl: '@',
			callback: '&uifCallback',
			/*uifDisabled: "=uifDisabled"*/
		},
		link: function(scope, element, attr) {

			var $ele = $(element);
			var uploader = $ele.find('input[role=uploader]');
			var trigger = $ele.find('img[role=trigger]');
			var uploadUrl = serverUrls.fileUpload;
			var deletImg = $ele.find("span[role=deletImg]");
			if(scope.defaultUrl == "" || scope.defaultUrl == undefined || scope.defaultUrl == null) {
				trigger.attr("src", 'img/upload.png');
			}
			trigger.click(function() {
				if($ele.attr("disabled")) return;
				uploader.click();
			});
			uploader.on('change', function() {
				var fd = new FormData();
				var $this = $(this);
				var file = $this.get(0).files[0];
				fd.append('image', file);
				$rootScope.iHeader['Content-Type'] = undefined;
				scope.uploadBusyPromise = $http({
					method: 'post',
					url: uploadUrl,
					data: fd,
					headers: $rootScope.iHeader,
					transformRequest: angular.identity
				}).then(
					function(response) {
						var code = response.data.State.Code;
						var url = '';
						if(code == 0) {
							url = response.data.Content[0].Url;
							trigger.attr('src', url);
						}
						if(scope.callback) {
							scope.callback({
								url: url
							});
						}
					},
					function(err) {
						if(scope.callback) {
							scope.callback({
								url: ''
							});
						}
					}
				);
				uploader.val("");
			});
			deletImg.on("click", function() {
				if($ele.attr("disabled")) return;
				trigger.attr('src', 'img/upload.png');
				scope.callback({
					url: 'img/upload.png'
				});
			});
		}
	}
})
/**=========================================================
 * Create new formList direcitive.
 * Create by PengCong at 2017-07-05 16:00.
 =========================================================*/
App.directive("formlist", function($http, serverUrls, layerAlert) {
	'use strict';
	var formlistTemplate =
		'<form class="form-horizontal" ng-submit="formSubmit()" cg-busy="ngDialogPromise">' +
		'<div class="form-group" ng-if="!field.isHide" ng-repeat="field in fieldsData" ng-class="{\'form-inline\':field.editor==\'complex\'||field.editor==\'text-normal\'||field.editor===\'normal-check\'||field.editor==\'_complex\',\'col-lg-6\':column===2&&field.column!==1}" ng-if="!field.shouldHide">' +
		'<label class="control-label" for="id_{{field.name}}" ng-bind="field.nameDisplay" ng-class="{\'col-lg-4\':column===2&&field.column!==1,\'col-lg-3\':column!==2&&field.column!==1,\'col-lg-2\':field.column===1}"></label>' +
		'<div ng-class="{\'col-lg-8\':column===2&&field.column!==1,\'col-lg-9\':column!==2&&field.column!==1,\'col-lg-10\':field.column===1,\'mycheckbox-inline\':field.editor===\'multiselect\' || field.editor===\'multiselect-string\'}">' +
		'<!--普通输入框-->' +
		'<input ng-if="field.editor===\'normal\'" ng-disabled="field.editable" ng-model="field.value" id="id_{{field.name}}" placeholder="请输入{{field.nameDisplay}}" ng-required="field.required" type="text" class="form-control" />' +
		'<!--车牌号-->' +
		'<input ng-if="field.editor===\'plate-number\'" ng-disabled="field.editable" ng-model="field.value" id="id_{{field.name}}" placeholder="{{field.noteValue}}" ng-required="field.required" type="text" class="form-control" />' +
		'<!--时间选择输入框-->' +
		'<input ng-if="field.editor===\'time-picker\'"  ng-disabled="field.editable" data-format="field.format" ng-model="field.value" id="id_{{field.name}}"placeholder="请选择{{field.nameDisplay}}" ng-required="field.required" type="text" class="form-control"  name="date" datepicker-popup="{{format}}" is-open="opened" min-date="minDate" datepicker-options="dateOptions" close-text="Close">' +
		'<!--普通下拉菜单-->' +
		'<select ng-if="field.editor===\'select\'" ng-disabled="field.editable" ng-model="field.value" id="id_{{field.name}}" ng-required="field.required" class="form-control" ng-options="x.Id as x.Name for x in field.opts"></select>' +
		'<!--文件上传-->' +
		'<input ng-if="field.editor===\'file-upload\'" ng-model="field.value" filestyle="" type="file" data-button-text="选择文件" data-class-button="btn btn-default" data-classinput="form-control inline" nv-file-select="" uploader="uploader" class="form-control" />' +
		'<!--单选输入框-->' +
		'<div ng-if="field.editor===\'radio\'" class="form-inline">' +
		'<label class="checkbox-inline" ng-repeat="x1 in field.opts">' +
		'<input name="name_{{field.name}}" type="radio" ng-model="field.value" value="{{x1.Id}}" /> {{x1.Name}}' +
		'</label>' +
		'</div>' +
		'<!--带搜索下拉菜单-->' +
		'<select ng-if="field.editor===\'search-select\'" ng-disabled="field.editable" chosen="" ng-model="field.value" id="id_{{field.name}}" ng-required="field.required" class="form-control chosen-select" ng-options="x.Id as x.Name for x in field.opts"></select>' +
		'<!--图片展示-->' +
		'<div class="form-inline form-lineheight" ng-if="field.editor===\'photo\'">' +
		'<ul class="list-group my-list-group">' +
		'<li ng-if="!mySplit(field.value) || mySplit(field.value).length===0" class="list-group-item col-lg-4">暂无图片</li>' +
		'<li ng-repeat="a in mySplit(field.value)" class="list-group-item col-lg-4"><img class="my-field-photo" ng-src="{{a}}" /></li>' +
		'</ul>' +
		'</div>' +
		'<!--多选下拉菜单-->' +
		'<ui-select ng-if="field.editor===\'multi-select\'"ng-disabled="field.editable" multiple="" ng-model="field.value" theme="bootstrap" ng-required="field.required">' +
		'<ui-select-match placeholder="请选择{{field.nameDisplay}}">{{$item.Name}}</ui-select-match>' +
		'<ui-select-choices repeat="x in field.opts">{{x.Name}}</ui-select-choices>' +
		'</ui-select>' +
		'<!--普通富文本输入框-->' +
		'<textarea ng-if = "field.editor===\'textarea\'" ng-disabled="field.editable" ng-model="field.value" id = "id_{{field.name}}" placeholder = "请输入{{field.nameDisplay}}" ng-required="field.required" class ="form-control"/>' +
		'<!--kind-editor富文本输入框-->' +
		'<textarea ng-if = "field.editor===\'kind-editor\'" ui-kindeditor  ng-disabled="field.editable" ng-model="field.value" id = "id_{{field.name}}" placeholder = "请输入{{field.nameDisplay}}" ng-required="field.required" class ="form-control"/>' +
		'<!--联动下拉选择框-->' +
		'<div class="form-inline form-lineheight" ng-if="field.editor===\'four-select\'">' +
		'<select ng-disabled="field.editable" ng-change="choseCourtyard(field)" ng-options="x.Id as x.Name for x in field.opts1" ng-model="field.value1" class="form-control" ng-required="field.required"></select>&nbsp;' +
		'<select ng-disabled="field.editable" ng-change="choseBuild(field)" ng-options="x.Id as x.Name for x in field.opts2" ng-model="field.value2" class="form-control" ng-required="field.required"></select>&nbsp;' +
		'<select ng-disabled="field.editable" ng-change="choseUnit(field)" ng-options="x.Id as x.Name for x in field.opts3" ng-model="field.value3" class="form-control" ng-required="field.required"></select>&nbsp;' +
		'<select ng-disabled="field.editable" ng-change="choseRoom(field)" ng-options="x.Id as x.Name for x in field.opts4" ng-model="field.value4" class="form-control" ng-required="field.required"></select>' +
		'</div>' +
		'<!--输入框混搭-->' +
		'<div class="form-inline form-lineheight" ng-if="field.editor===\'normal-select\'">' +
		'<input ng-disabled="field.editable" ng-model="field.value" id="id_{{field.name}}" ng-required="field.required" type="text" class="form-control form-autowidth" />&nbsp;' +
		'<select ng-model="field.value1" class="form-control" ng-options="x.Id as x.Name for x in field.opts"></select>' +
		'&nbsp;{{field.lastName}}' +
		'</div>' +
		'<!--多选组-->' +
		'<div ng-if="field.editor===\'multiselect\' || field.editor===\'multiselect-string\'" class="form-inline">' +
		'<div class="checkbox checkbox-inline c-checkbox" ng-repeat="x in field.opts">' +
		'<label>' +
		'<input type="checkbox" ng-disabled="field.editable" ng-model="x.Checked">' +
		'<span class="fa fa-check"></span> {{x.Name}}' +
		'</label>' +
		'</div>' +
		'</div>' +
		'<!--文本带多选框混搭-->' +
		'<div ng-if="field.editor===\'normal-check\'" class="form-inline form-lineheight">' +
		'<input ng-disabled="field.editable" ng-model="field.value" id="id_{{field.name}}" placeholder = "请输入{{field.nameDisplay}}" ng-required="field.required" type="text" class="form-control form-halfwidth" />' +
		'&nbsp;<input class="form-control" type="checkbox" ng-checked="{{field.checked}}" id="label_{{field.name}}"/>' +
		'<label class="control-label" for="label_{{field.name}}">不显示</label>' +
		'</div>' +
		'<!--层数起止输入框-->' +
		'<div ng-if="field.editor===\'_complex\'">' +
		'<label class="complex">' +
		'<input class="form-control form-autowidth" placeholder="层" type="text" ng-required="field.required" ng-model="field.values[0]" />&nbsp;—&nbsp;' +
		'<input class="form-control form-autowidth" placeholder="层" type="text" ng-required="field.required" ng-model="field.values[1]" />&nbsp;' +
		'</label>' +
		'</div>' +
		'<!--层户数单选输入框-->' +
		'<div ng-if="field.editor===\'complex\'">' +
		'<label class="complex">' +
		'<input class="form-control form-autowidth" placeholder="层" type="text" ng-required="field.required" ng-model="field.values[0]" />&nbsp;—&nbsp;' +
		'<input class="form-control form-autowidth" placeholder="层" type="text" ng-required="field.required" ng-model="field.values[1]" />&nbsp;每层&nbsp;' +
		'<input class="form-control form-autowidth" placeholder="户" type="text" ng-required="field.required" ng-model="field.values[2]" />' +
		'</label>' +
		'</div>' +
		'</div>' +
		'</div>' + '<div class="form-group">' +
		'<div ng-class="{\'col-lg-offset-3 col-lg-9\':column===1||!column,\'col-lg-offset-5 col-lg-7\':column===2}">' +
		'<button type="submit" class="btn btn-success">确 定</button> ' +
		'<button type="button" ng-click="closeDialog(0)" class="btn btn-default">取 消</button>' +
		'</div>' +
		'</div>' +
		'</form>';

	return {
		restrict: 'ACEM',
		template: formlistTemplate,
		replace: true,
		scope: {
			fieldsData: '=',
			formSubmit: '&',
			closeDialog: "&",
			column: '='
		},
		link: function(scope) {
			var initList = [{
				Id: 0,
				Name: "请选择"
			}];

			scope.mySplit = function(string) {
				var _array = [];
				if(string) {
					_array = string.split(",");
				}
				return _array;
			};

			var initRoom = [{
				Id: 0,
				RoomNumber: "请选择"
			}];

			//院落：CourtyardList 楼栋：BuildingList 单元：UnitList 楼层：FloorList 房屋：HouseList
			//选择院落
			scope.choseCourtyard = function(field) {
				scope.ngDialogPromise = $http({
					method: 'get',
					url: serverUrls.getAll + "?id=" + field.value1
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					if(Code === 0) {
						var list = initList.concat(response.Content);
						if(scope.fieldsData) {
							scope.fieldsData.forEach(function(item, index) {
								if(item.name === "HouseId") {
									item.opts2 = list;
									item.value2 = list[0] ? list[0].Id : 0;
								}
							});
						}
					} else {
						layerAlert.autoclose(Message);
					}
				}).error(function(error) {
					layerAlert.autoclose(error);
				});

				/*field.opts1.forEach(function(item, index) {
					if(item.Id === field.value1) {
						field.opts2 = initList.concat(field.opts1[index].BuildingList);
						field.value2 = field.opts2[0].Id;
						field.opts3 = initList;
						field.value3 = initList[0].Id;
						field.opts4 = initList;
						field.value4 = initList[0].Id;
					}
				});*/
			};

			//选择楼栋
			scope.choseBuild = function(field) {
				scope.ngDialogPromise = $http({
					method: 'get',
					url: serverUrls.getAll + "?id=" + field.value2
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					if(Code === 0) {
						var list = initList.concat(response.Content);
						if(scope.fieldsData) {
							scope.fieldsData.forEach(function(item, index) {
								if(item.name === "HouseId") {
									item.opts3 = list;
									item.value3 = list[0] ? list[0].Id : 0;
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
			scope.choseUnit = function(field) {
				scope.ngDialogPromise = $http({
					method: 'get',
					url: serverUrls.unitHouseList + "?id=" + field.value3
				}).success(function(response) {
					var Code = response.State.Code;
					var Message = response.State.Message;
					if(Code === 0) {
						var list = initRoom.concat(response.Content);
						list.forEach(function(_item, _index) {
							_item.Name = _item.RoomNumber;
						});
						if(scope.fieldsData) {
							scope.fieldsData.forEach(function(item, index) {
								if(item.name === "HouseId") {
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

			//选择房号
			scope.choseRoom = function(field) {
				if(field.getResident) {
					scope.ngDialogPromise = $http({
						method: 'get',
						url: serverUrls.houseResident + "?id=" + field.value4
					}).success(function(response) {
						var Code = response.State.Code;
						var Message = response.State.Message;
						if(Code === 0) {
							scope.residentList = response.Content;
							if(!scope.residentList || scope.residentList.length === 0) {
								layerAlert.autoclose("当前房号下暂无居民!");
							}
							if(scope.fieldsData) {
								scope.fieldsData.forEach(function(item, index) {
									if(item.name === "ResidentId") {
										item.opts = scope.residentList;
										item.value = scope.residentList[0] ? scope.residentList[0].Id : 0;
									}
								});
							}
						} else {
							layerAlert.autoclose(Message);
						}
					}).error(function(error) {
						layerAlert.autoclose(error);
					});
				}

			};

			//时间插件
			setTimeout(function() {
				// console.log(($("input[name='date']")))  	
				$("input[name='date']").datetimepicker({
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
					$("input[name='date']").datetimepicker();
					// console.log('ev=>',ev)
				});
			}, 20)

		}
	};
});
/**=========================================================
 * Create new currency service.
 * Create by PengCong at 2017-08-02 10:00.
 =========================================================*/
App.filter("myFilter", function() {
	return function(list, type) {
		var _Array = [];
		list.forEach(function(item, index) {
			if(item.WorkNodeWorkerType === type) {
				_Array.push(item);
			}
		});
		return _Array;
	}
});

App.filter("hasParents", function() {
	return function(_array) {
		if(_array instanceof Array && _array.length > 0) {
			var newArray = [];
			_array.map(function(item, index) {
				if(item.ParentId !== 0) {
					newArray.push(item);
				}
			});
			return newArray;
		} else {
			return _array;
		}

	};
});
/**=========================================================
 * Create new currency service.
 * Create by PengCong at 2017-08-02 10:00.
 =========================================================*/
App.service("PcService", ["$http", "$rootScope", "layerAlert", "PagerExtends", "ngDialog", "$filter",
	function($http, $rootScope, layerAlert, PagerExtends, ngDialog, $filter) {

		//正则表达式；判断车牌号是否正确
		this.isPlateNumber = function(vehicleNumber) {
			var result = false;
			if(vehicleNumber.length == 7) {
				var express = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
				result = express.test(vehicleNumber);
			}
			return result;
		}

		//正则表达式；判断身份证号码是否正确
		this.isIDNumber = function(idno) {
			var result = false;
			var IDNOString = new RegExp(/^\d{17}(\d|X|x)$/);
			if(IDNOString.test(idno)) {
				result = true;
			}
			return result;
		}

		//正则表达式；判断是否为手机号码
		this.isPhoneNumber = function(phoneno) {
			var result = false;
			var PhoneString = new RegExp(/^(((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8})|((\d{3,4}-?|\s)?\d{7,14})$/);
			if(PhoneString.test(phoneno)) {
				result = true;
			}
			return result;
			return result;
		}

		//错误结果处理
		var errorResult = function(value) {
			var _text;
			if(!value) {
				_text = value + "";
			} else if(typeof value === "string") {
				_text = value !== "An error has occurred." ? value : "服务端错误，请联系管理员！";
			} else if(typeof value === "object") {
				if(!!value.Message) {
					_text = value.Message !== "An error has occurred." ? value.Message : "服务端错误，请联系管理员！";
				}
			} else {
				_text = value + "";
			}
			return _text;
		};
		this.errorResult = errorResult;

		//获取列表数据分页
		this.fetchData = function($scope, url, params, headers) {
			PagerExtends.regListSpecifyPage($scope, {
				apiUrl: url,
				params: params,
				success: function(response) {
					$scope.list = response;
				},
				error: function(error) {
					layerAlert.autoclose(errorResult(error));
				}
			}, headers);
		};

		//获取列表数据不分页
		this.fetchList = function($scope, url, param, headers, index) {
			var completionUrl = "?";
			if(param) {
				for(var x in param) {
					completionUrl += x + "=" + param[x] + "&";
				}
				url += completionUrl.substring(0, completionUrl.length - 1);
			}

			$scope.listBusyPromise = $http({
				headers: headers ? headers : null,
				method: "get",
				url: url
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.list = response.Content;
				}
			}).error(function(error) {
				layerAlert.autoclose(errorResult(error));
			});
		};

		//列表数字转文字
		this.numberToText = function(id, _arrry) {
			var _text = "";
			_arrry.forEach(function(item, index) {
				if(typeof id === "boolean") {
					id = id.toString();
				}
				if(item.Id === id) {
					_text = item.Name;
				}
			});
			_text = _text === "全部" ? "" : _text;
			return _text;
		};
		//表格状态颜色
		this.statusClass = function(value) {
			var statusClass = ''
			switch(value) {
				case 1:
					statusClass = 'todoColor';
					break;
				case 2:
					statusClass = 'passColor';
					break;
				case 3:
					statusClass = 'noPassColor';
					break;

				default:
					break;
			}
			return statusClass;
		};
		//新增时初始化表单
		this.initFormList = function(fieldsList) {
			fieldsList.forEach(function(item, index) {
				if(item.editor === "four-select") {
					item.value3 = 0;
					item.value4 = 0;
				} else if(item.editor === "multiselect") {
					item.value = item.originValue !== undefined ? item.originValue : "";
					item.opts.forEach(function(_item, _index) {
						_item.Checked = false;
					});
				} else {
					item.value = item.originValue !== undefined ? item.originValue : "";
				}

			});
		};
		//根据fieldsList获取提交data
		this.getFormData = function(fieldsList) {
			var data = {};
			fieldsList.forEach(function(item, index) {
				if(item.editor === "double-datePick") {
					data[item.name1] = $filter('date')(item.value1, "yyyy-MM-dd HH:mm");
					data[item.name2] = $filter('date')(item.value2, "yyyy-MM-dd HH:mm");
				} else if(item.editor === "time-picker") {
					data[item.name] = $filter('date')(item.value, "yyyy-MM-dd HH:mm");

				} else if(item.editor === "four-select") {
					data[item.name] = item.value4;
				} else if(item.editor === "multi-select") {
					var values = "";
					item.value.forEach(function(_ite, _ind) {
						values += _ite.Id + ",";
					});
					values = values.substring(0, values.length - 1);
					data[item.name] = values;
				} else if(item.editor === "multiselect") {
					var list = [];
					item.opts.forEach(function(_item, _index) {
						if(_item.Checked) {
							var _cell = {
								RoleCode: _item.Code,
								RoleName: _item.Name
							}
							list.push(_cell);
						}
					});
					data[item.name] = list;
				} else if(item.editor === "multiselect-string") {
					var list = "";
					item.opts.forEach(function(_item, _index) {
						if(_item.Checked) {
							list += _item.Id + ",";
						}
					});
					data[item.name] = list.substring(0, list.length - 1);
				} else if(item.editor === "normal-select") {
					switch(item.value1) {
						case 1:
							data[item.name] = item.value * 3600 * 24 * 1000;
							break;
						case 2:
							data[item.name] = item.value * 3600 * 1000;
							break;
						case 3:
							data[item.name] = item.value * 60 * 1000;
							break;
						default:
							break;
					}
				} else {
					data[item.name] = item.value;
				}
			});
			return data;
		};
		//编辑时绑定绑定数据
		this.bindFormData = function(x, fieldsList) {
			fieldsList.forEach(function(item, index) {
				if(x[item.name] !== undefined) {
					if(item.name === "OccurTime" || item.name === "CreatedAt" || item.name === "UpdatedAt" || item.name === "ValidEndTime" || item.name === "ValidStartTime") {
						item.value = $filter("date")(x[item.name], "yyyy-MM-dd HH:mm");
					} else if(item.editor === "multiselect") {
						var CheckedList = x[item.name];
						if(!CheckedList) {
							item.opts.forEach(function(_item, _index) {
								_item.Checked = false;
							});
						} else {
							if(typeof CheckedList === "string") {
								CheckedList = CheckedList.split(",");
								item.opts.forEach(function(_item, _index) {
									_item.Checked = false;
									CheckedList.forEach(function(ite, ind) {
										if(ite === _item.Id || ite === _item.Id.toString()) {
											_item.Checked = true;
										}
									});
								});
							} else {
								item.opts.forEach(function(_item, _index) {
									_item.Checked = false;
									CheckedList.forEach(function(ite, ind) {
										if(ite.RoleCode === _item.Code) {
											_item.Checked = true;
										}
									});
								});
							}

						}

					} else if(item.editor === "normal-select") {
						var value = x[item.name];
						item.value = value;
						if(value < 3600 * 1000) {
							item.value = value / (60 * 1000);
							item.value1 = 3;
						} else if(value < 3600 * 1000 * 24) {
							item.value = value / (3600 * 1000);
							item.value1 = 2;
						} else {
							item.value = value / (3600 * 1000 * 24);
							item.value1 = 1;
						}

					} else {
						if(typeof x[item.name] === "boolean") {
							item.value = x[item.name] + "";
						} else {
							item.value = x[item.name];
						}

					}

				}
			});
		};
		//字符串截取
		this.subStrDescribe = function(_string, n) {
			if(!n) {
				n = 10;
			}
			if(_string && _string.length > n) {
				_string = _string.substring(0, n) + "..";
			}
			return _string;
		};

		//催办时间处理
		this.timeDo = function(value) {
			var _text;
			if(value < 3600 * 1000) {
				_text = value / (60 * 1000) + "分";
			} else if(value < 3600 * 1000 * 24) {
				_text = value / (3600 * 1000) + "时";
			} else {
				_text = value / (3600 * 1000 * 24) + "天";
			}
			return _text;
		};

		//启用停用显示class
		this.toggleClass = function(x) {
			return {
				'btn-success': x.OpenState === 2 || x.OpenState === 0 || !x.OpenState,
				'btn-danger': x.OpenState === 1
			};
		};

		this.toggleLabelClass = function(x) {
			return {
				'btn-success': x.OpenState === 1,
				'btn-danger': x.OpenState === 2 || x.OpenState === 0 || !x.OpenState
			};
		};

		//启用停用text
		this.toggleText = function(x) {
			var text;
			switch(x.OpenState) {
				case 2:
					text = "启用";
					break;
				case 1:
					text = "停用";
					break;

				default:
					text = "启用";
					break;
			}
			return text;
		};

		//列表状态显示
		this.stateText = function(x) {
			var text;
			switch(x.OpenState) {
				case 2:
					text = "停用中";
					break;
				case 1:
					text = "启用中";
					break;
				default:
					text = "停用中";
					break;
			}
			return text;
		};

		//L列表操作，启用停用，状态必须为OpenState
		this.toggleItem = function($scope, x, url) {
			var actionText, state;
			if(x.OpenState === 1) {
				state = 2;
				actionText = "停用";
			} else if(x.OpenState === 2) {
				state = 1;
				actionText = "启用";
			} else {
				state = 3;
				actionText = "解散";
			}

			if(state !== 2 && state !== 1 && state !== 3) {
				return;
			}

			//D列表操作，启用停用，状态必须为OpenState
			$scope.listBusyPromise = $http({
				method: "get",
				url: url + "?id=" + x.Id + "&state=" + state
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose(actionText + "操作成功！");
					$scope.fetchData();
				}
			}).error(function(error) {
				layerAlert.autoclose(errorResult(error));
			});
		};

		this.toggleStatus = function($scope, x, url) {
			var actionText;
			if(x.OpenState === 1) {
				actionText = "停用";
				x.OpenState = 2;
			} else {
				actionText = "启用";
				x.OpenState = 1;
			}
			$scope.listBusyPromise = $http({
				method: "put",
				headers: $rootScope.pHeader,
				url: url,
				data: x
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose(actionText + "操作成功！");
					$scope.fetchData();
				} else {
					layerAlert.autoclose(errorResult(Message));
					if(x.OpenState === 1) {
						x.OpenState = 2;
					} else {
						x.OpenState = 1;
					}
				}
			}).error(function(error) {
				layerAlert.autoclose(errorResult(error));
				if(x.OpenState === 1) {
					x.OpenState = 2;
				} else {
					x.OpenState = 1;
				}
			});
		};

		this.formSubmit = function($scope, create, fieldsList, url, x, param, headers, Message) {
			var method, data, doAction;
			var scope = $scope;
			if(param) {
				data = $.extend(true, this.getFormData(fieldsList), param);
			} else {
				data = this.getFormData(fieldsList);
			}
			switch(create) {
				case true:
					method = "post";
					doAction = Message ? Message : "新增";
					break;
				case false:
					method = "put";
					doAction = Message ? Message : "修改";
					if(x && x.Id) {
						data.Id = x.Id;
					}
					break;
			}
			scope.ngDialogPromise = "";
			scope.ngDialogPromise = $http({
				headers: headers ? headers : null,
				method: method,
				url: url,
				data: data
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose(doAction + "操作成功！");
					if(scope) {
						scope.fetchData();
					}
					setTimeout(function() {
						scope.closeThisDialog();
					}, 1600);
				} else {
					layerAlert.autoclose(errorResult(Message));
				}
			}).error(function(error) {
				layerAlert.autoclose(errorResult(error));
			});
		};

		this.deleteItem = function(scope, url, x, headers) {
			scope.listBusyPromise = $http({
				headers: headers ? headers : null,
				method: "delete",
				url: url + "?id=" + x.Id
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("删除操作成功！");
					scope.fetchData();
					setTimeout(function() {
						ngDialog.close(0);
					}, 1600);
				} else {
					layerAlert.autoclose(errorResult(Message));
				}
			}).error(function(error) {
				layerAlert.autoclose(errorResult(error));
			});
		};

		//HTML转义为实体
		this.htmlToEntity = function(html) {
			var elem = document.createElement('div');
			var txt = document.createTextNode(html);
			elem.appendChild(txt);
			return elem.innerHTML;
		};

		//实体字符转回为HTML
		this.entityToHtml = function(str) {
			var elem = document.createElement('div');
			elem.innerHTML = str;
			return elem.innerHTML;
		};

	}
]);
/**=========================================================
 * Module: clear-storage.js
 * Removes a key from the browser storage via element click
 =========================================================*/

App.directive('resetKey', ['$state', '$rootScope', function($state, $rootScope) {
	'use strict';

	return {
		restrict: 'A',
		scope: {
			resetKey: '='
		},
		link: function(scope, element, attrs) {

			scope.resetKey = attrs.resetKey;

		},
		controller: ["$scope", "$element", function($scope, $element) {

			$element.on('click', function(e) {
				e.preventDefault();

				if($scope.resetKey) {
					delete $rootScope.$storage[$scope.resetKey];
					$state.go($state.current, {}, {
						reload: true
					});
				} else {
					$.error('No storage key specified for reset.');
				}
			});

		}]

	};

}]);
/**=========================================================
 * Module: filestyle.js
 * Initializes the fielstyle plugin
 =========================================================*/

App.directive('filestyle', function() {
	return {
		restrict: 'A',
		controller: ["$scope", "$element", function($scope, $element) {
			var options = $element.data();

			// old usage support
			options.classInput = $element.data('classinput') || options.classInput;

			$element.filestyle(options);
		}]
	};
});

/**=========================================================
 * Module: flatdoc.js
 * Creates the flatdoc markup and initializes the plugin
 =========================================================*/

App.directive('flatdoc', ['$location', function($location) {
	return {
		restrict: "EA",
		template: "<div role='flatdoc'><div role='flatdoc-menu'></div><div role='flatdoc-content'></div></div>",
		link: function(scope, element, attrs) {

			Flatdoc.run({
				fetcher: Flatdoc.file(attrs.src)
			});

			var $root = $('html, body');
			$(document).on('flatdoc:ready', function() {
				var docMenu = $('[role="flatdoc-menu"]');
				docMenu.find('a').on('click', function(e) {
					e.preventDefault();
					e.stopPropagation();

					var $this = $(this);

					docMenu.find('a.active').removeClass('active');
					$this.addClass('active');

					$root.animate({
						scrollTop: $(this.getAttribute('href')).offset().top - ($('.topnavbar').height() + 10)
					}, 800);
				});

			});
		}
	};

}]);
/**=========================================================
 * Module: flot.js
 * Initializes the Flot chart plugin and handles data refresh
 =========================================================*/

App.directive('flot', ['$http', '$timeout', function($http, $timeout) {
	'use strict';
	return {
		restrict: 'EA',
		template: '<div></div>',
		scope: {
			dataset: '=?',
			options: '=',
			series: '=',
			callback: '=',
			src: '='
		},
		link: linkFunction
	};

	function linkFunction(scope, element, attributes) {
		var height, plot, plotArea, width;
		var heightDefault = 220;

		plot = null;

		width = attributes.width || '100%';
		height = attributes.height || heightDefault;

		plotArea = $(element.children()[0]);
		plotArea.css({
			width: width,
			height: height
		});

		function init() {
			var plotObj;
			if(!scope.dataset || !scope.options) return;
			plotObj = $.plot(plotArea, scope.dataset, scope.options);
			scope.$emit('plotReady', plotObj);
			if(scope.callback) {
				scope.callback(plotObj, scope);
			}

			return plotObj;
		}

		function onDatasetChanged(dataset) {
			if(plot) {
				plot.setData(dataset);
				plot.setupGrid();
				return plot.draw();
			} else {
				plot = init();
				onSerieToggled(scope.series);
				return plot;
			}
		}
		scope.$watchCollection('dataset', onDatasetChanged, true);

		function onSerieToggled(series) {
			if(!plot || !series) return;
			var someData = plot.getData();
			for(var sName in series) {
				angular.forEach(series[sName], toggleFor(sName));
			}

			plot.setData(someData);
			plot.draw();

			function toggleFor(sName) {
				return function(s, i) {
					if(someData[i] && someData[i][sName])
						someData[i][sName].show = s;
				};
			}
		}
		scope.$watch('series', onSerieToggled, true);

		function onSrcChanged(src) {

			if(src) {

				$http.get(src)
					.success(function(data) {

						$timeout(function() {
							scope.dataset = data;
						});

					}).error(function() {
						$.error('Flot chart: Bad request.');
					});

			}
		}
		scope.$watch('src', onSrcChanged);
	}

}]);

/**=========================================================
 * Module: form-wizard.js
 * Handles form wizard plugin and validation
 =========================================================*/

App.directive('formWizard', ["$parse", function($parse) {
	'use strict';

	return {
		restrict: 'A',
		scope: true,
		link: function(scope, element, attribute) {
			var validate = $parse(attribute.validateSteps)(scope),
				wiz = new Wizard(attribute.steps, !!validate, element);
			scope.wizard = wiz.init();

		}
	};

	function Wizard(quantity, validate, element) {

		var self = this;
		self.quantity = parseInt(quantity, 10);
		self.validate = validate;
		self.element = element;

		self.init = function() {
			self.createsteps(self.quantity);
			self.go(1); // always start at fist step
			return self;
		};

		self.go = function(step) {

			if(angular.isDefined(self.steps[step])) {

				if(self.validate && step !== 1) {
					var form = $(self.element),
						group = form.children().children('div').get(step - 2);

					if(false === form.parsley().validate(group.id)) {
						return false;
					}
				}

				self.cleanall();
				self.steps[step] = true;
			}
		};

		self.active = function(step) {
			return !!self.steps[step];
		};

		self.cleanall = function() {
			for(var i in self.steps) {
				self.steps[i] = false;
			}
		};

		self.createsteps = function(q) {
			self.steps = [];
			for(var i = 1; i <= q; i++) self.steps[i] = false;
		};

	}

}]);

/**=========================================================
 * Module: fullscreen.js
 * Toggle the fullscreen mode on/off
 =========================================================*/

App.directive('toggleFullscreen', function() {
	'use strict';

	return {
		restrict: 'A',
		link: function(scope, element, attrs) {

			element.on('click', function(e) {
				e.preventDefault();

				if(screenfull.enabled) {

					screenfull.toggle();

					// Switch icon indicator
					if(screenfull.isFullscreen)
						$(this).children('em').removeClass('fa-expand').addClass('fa-compress');
					else
						$(this).children('em').removeClass('fa-compress').addClass('fa-expand');

				} else {
					$.error('Fullscreen not enabled');
				}

			});
		}
	};

});

/**=========================================================
 * Module: load-css.js
 * Request and load into the current page a css file
 =========================================================*/

App.directive('loadCss', function() {
	'use strict';

	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.on('click', function(e) {
				if(element.is('a')) e.preventDefault();
				var uri = attrs.loadCss,
					link;

				if(uri) {
					link = createLink(uri);
					if(!link) {
						$.error('Error creating stylesheet link element.');
					}
				} else {
					$.error('No stylesheet location defined.');
				}

			});

		}
	};

	function createLink(uri) {
		var linkId = 'autoloaded-stylesheet',
			oldLink = $('#' + linkId).attr('id', linkId + '-old');

		$('head').append($('<link/>').attr({
			'id': linkId,
			'rel': 'stylesheet',
			'href': uri
		}));

		if(oldLink.length) {
			oldLink.remove();
		}

		return $('#' + linkId);
	}

});
/**=========================================================
 * Module: masked,js
 * Initializes the masked inputs
 =========================================================*/

App.directive('masked', function() {
	return {
		restrict: 'A',
		controller: ["$scope", "$element", function($scope, $element) {
			var $elem = $($element);
			if($.fn.inputmask)
				$elem.inputmask();
		}]
	};
});

/**=========================================================
 * Module: morris.js
 * AngularJS Directives for Morris Charts
 =========================================================*/

(function() {
	"use strict";

	App.directive('morrisBar', morrisChart('Bar'));
	App.directive('morrisDonut', morrisChart('Donut'));
	App.directive('morrisLine', morrisChart('Line'));
	App.directive('morrisArea', morrisChart('Area'));

	function morrisChart(type) {
		return function() {
			return {
				restrict: 'EA',
				scope: {
					morrisData: '=',
					morrisOptions: '='
				},
				link: function($scope, elem, attrs) {
					// start ready to watch for changes in data
					$scope.$watch("morrisData", function(newVal, oldVal) {
						if(newVal) {
							$scope.morrisInstance.setData(newVal);
							$scope.morrisInstance.redraw();
						}
					}, true);
					// the element that contains the chart
					$scope.morrisOptions.element = elem;
					// If data defined copy to options
					if($scope.morrisData)
						$scope.morrisOptions.data = $scope.morrisData;
					// Init chart
					$scope.morrisInstance = new Morris[type]($scope.morrisOptions);

				}
			}
		}
	}

})();

/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

App.directive('searchOpen', ['navSearch', function(navSearch) {
	'use strict';

	return {
		restrict: 'A',
		controller: ["$scope", "$element", function($scope, $element) {
			$element
				.on('click', function(e) {
					e.stopPropagation();
				})
				.on('click', navSearch.toggle);
		}]
	};

}]).directive('searchDismiss', ['navSearch', function(navSearch) {
	'use strict';

	var inputSelector = '.navbar-form input[type="text"]';

	return {
		restrict: 'A',
		controller: ["$scope", "$element", function($scope, $element) {

			$(inputSelector)
				.on('click', function(e) {
					e.stopPropagation();
				})
				.on('keyup', function(e) {
					if(e.keyCode == 27) // ESC
						navSearch.dismiss();
				});

			// click anywhere closes the search
			$(document).on('click', navSearch.dismiss);
			// dismissable options
			$element
				.on('click', function(e) {
					e.stopPropagation();
				})
				.on('click', navSearch.dismiss);
		}]
	};

}]);

/**=========================================================
 * Module: notify.js
 * Directive for notify plugin
 =========================================================*/

App.directive('notify', ["$window", "Notify", function($window, Notify) {

	return {
		restrict: 'A',
		scope: {
			options: '=',
			message: '='
		},
		link: function(scope, element, attrs) {

			element.on('click', function(e) {
				e.preventDefault();
				Notify.alert(scope.message, scope.options);
			});

		}
	};

}]);

/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

App.directive("now", ['dateFilter', '$interval', function(dateFilter, $interval) {
	return {
		restrict: 'E',
		link: function(scope, element, attrs) {

			var format = attrs.format;

			function updateTime() {
				var dt = dateFilter(new Date(), format);

				switch(dt) {
					case "January":
						dt = '一月';
						break;
					case "February":
						dt = '二月';
						break;
					case "March":
						dt = '三月';
						break;
					case "April":
						dt = '四月';
						break;
					case "May":
						dt = '五月';
						break;
					case "June":
						dt = '六月';
						break;
					case "July":
						dt = '七月';
						break;
					case "August":
						dt = '八月';
						break;
					case "September":
						dt = '九月';
						break;
					case "October":
						dt = '十月';
						break;
					case "November":
						dt = '十一月';
						break;
					case "December":
						dt = '十二月';
						break;
					default:
						break;
				}
				switch(dt) {
					case "Monday":
						dt = '星期一';
						break;
					case "Tuesday":
						dt = '星期二';
						break;
					case "Wednesday":
						dt = '星期三';
						break;
					case "Thursday":
						dt = '星期四';
						break;
					case "Friday":
						dt = '星期五';
						break;
					case "Saturday":
						dt = '星期六';
						break;
					case "Sunday":
						dt = '星期日';
						break;
					default:
						break;
				}
				element.text(dt);
			}

			updateTime();
			$interval(updateTime, 1000);
		}
	};
}]);
/**=========================================================
 * Module panel-tools.js
 * Directive tools to control panels. 
 * Allows collapse, refresh and dismiss (remove)
 * Saves panel state in browser storage
 =========================================================*/

App.directive('paneltool', ["$compile", "$timeout", function($compile, $timeout) {
		var templates = {
			/* jshint multistr: true */
			collapse: "<a href='#' panel-collapse='' tooltip='折叠面板' ng-click='{{panelId}} = !{{panelId}}'> \
                <em ng-show='{{panelId}}' class='fa fa-plus'></em> \
                <em ng-show='!{{panelId}}' class='fa fa-minus'></em> \
              </a>",
			dismiss: "<a href='#' panel-dismiss='' tooltip='关闭面板'>\
               <em class='fa fa-times'></em>\
             </a>",
			refresh: "<a href='#' panel-refresh='' data-spinner='{{spinner}}' tooltip='刷新面板'>\
               <em class='fa fa-refresh'></em>\
             </a>"
		};

		function getTemplate(elem, attrs) {
			var temp = '';
			attrs = attrs || {};
			if(attrs.toolCollapse)
				temp += templates.collapse.replace(/{{panelId}}/g, (elem.parent().parent().attr('id')));
			if(attrs.toolDismiss)
				temp += templates.dismiss;
			if(attrs.toolRefresh)
				temp += templates.refresh.replace(/{{spinner}}/g, attrs.toolRefresh);
			return temp;
		}

		return {
			restrict: 'E',
			scope: false,
			link: function(scope, element, attrs) {

				var tools = scope.panelTools || attrs;

				$timeout(function() {
					element.html(getTemplate(element, tools)).show();
					$compile(element.contents())(scope);

					element.addClass('pull-right');
				});

			}
		};
	}])
	/**=========================================================
	 * Dismiss panels * [panel-dismiss]
	 =========================================================*/
	.directive('panelDismiss', ["$q", "Utils", function($q, Utils) {
		'use strict';
		return {
			restrict: 'A',
			controller: ["$scope", "$element", function($scope, $element) {
				var removeEvent = 'panel-remove',
					removedEvent = 'panel-removed';

				$element.on('click', function() {

					// find the first parent panel
					var parent = $(this).closest('.panel');

					removeElement();

					function removeElement() {
						var deferred = $q.defer();
						var promise = deferred.promise;

						// Communicate event destroying panel
						$scope.$emit(removeEvent, parent.attr('id'), deferred);
						promise.then(destroyMiddleware);
					}

					// Run the animation before destroy the panel
					function destroyMiddleware() {
						if(Utils.support.animation) {
							parent.animo({
								animation: 'bounceOut'
							}, destroyPanel);
						} else destroyPanel();
					}

					function destroyPanel() {

						var col = parent.parent();
						parent.remove();
						// remove the parent if it is a row and is empty and not a sortable (portlet)
						col
							.filter(function() {
								var el = $(this);
								return(el.is('[class*="col-"]:not(.sortable)') && el.children('*').length === 0);
							}).remove();

						// Communicate event destroyed panel
						$scope.$emit(removedEvent, parent.attr('id'));

					}
				});
			}]
		};
	}])
	/**=========================================================
	 * Collapse panels * [panel-collapse]
	 =========================================================*/
	.directive('panelCollapse', ['$timeout', function($timeout) {
		'use strict';

		var storageKeyName = 'panelState',
			storage;

		return {
			restrict: 'A',
			scope: false,
			controller: ["$scope", "$element", function($scope, $element) {

				// Prepare the panel to be collapsible
				var $elem = $($element),
					parent = $elem.closest('.panel'), // find the first parent panel
					panelId = parent.attr('id');

				storage = $scope.$storage;

				// Load the saved state if exists
				var currentState = loadPanelState(panelId);
				if(typeof currentState !== 'undefined') {
					$timeout(function() {
							$scope[panelId] = currentState;
						},
						10);
				}

				// bind events to switch icons
				$element.bind('click', function() {

					savePanelState(panelId, !$scope[panelId]);

				});
			}]
		};

		function savePanelState(id, state) {
			if(!id) return false;
			var data = angular.fromJson(storage[storageKeyName]);
			if(!data) {
				data = {};
			}
			data[id] = state;
			storage[storageKeyName] = angular.toJson(data);
		}

		function loadPanelState(id) {
			if(!id) return false;
			var data = angular.fromJson(storage[storageKeyName]);
			if(data) {
				return data[id];
			}
		}

	}])
	/**=========================================================
	 * Refresh panels
	 * [panel-refresh] * [data-spinner="standard"]
	 =========================================================*/
	.directive('panelRefresh', ["$q", function($q) {
		'use strict';

		return {
			restrict: 'A',
			scope: false,
			controller: ["$scope", "$element", function($scope, $element) {

				var refreshEvent = 'panel-refresh',
					whirlClass = 'whirl',
					defaultSpinner = 'standard';

				// catch clicks to toggle panel refresh
				$element.on('click', function() {
					var $this = $(this),
						panel = $this.parents('.panel').eq(0),
						spinner = $this.data('spinner') || defaultSpinner;

					// start showing the spinner
					panel.addClass(whirlClass + ' ' + spinner);

					// Emit event when refresh clicked
					$scope.$emit(refreshEvent, panel.attr('id'));

				});

				// listen to remove spinner
				$scope.$on('removeSpinner', removeSpinner);

				// method to clear the spinner when done
				function removeSpinner(ev, id) {
					if(!id) return;
					var newid = id.charAt(0) == '#' ? id : ('#' + id);
					angular
						.element(newid)
						.removeClass(whirlClass);
				}
			}]
		};
	}]);

/**=========================================================
 * Module: play-animation.js
 * Provides a simple way to run animation with a trigger
 * Requires animo.js
 =========================================================*/

App.directive('animate', ["$window", "Utils", function($window, Utils) {

	'use strict';

	var $scroller = $(window).add('body, .wrapper');

	return {
		restrict: 'A',
		link: function(scope, elem, attrs) {

			// Parse animations params and attach trigger to scroll
			var $elem = $(elem),
				offset = $elem.data('offset'),
				delay = $elem.data('delay') || 100, // milliseconds
				animation = $elem.data('play') || 'bounce';

			if(typeof offset !== 'undefined') {

				// test if the element starts visible
				testAnimation($elem);
				// test on scroll
				$scroller.scroll(function() {
					testAnimation($elem);
				});

			}

			// Test an element visibilty and trigger the given animation
			function testAnimation(element) {
				if(!element.hasClass('anim-running') &&
					Utils.isInView(element, {
						topoffset: offset
					})) {
					element
						.addClass('anim-running');

					setTimeout(function() {
						element
							.addClass('anim-done')
							.animo({
								animation: animation,
								duration: 0.7
							});
					}, delay);

				}
			}

			// Run click triggered animations
			$elem.on('click', function() {

				var $elem = $(this),
					targetSel = $elem.data('target'),
					animation = $elem.data('play') || 'bounce',
					target = $(targetSel);

				if(target && target.length) {
					target.animo({
						animation: animation
					});
				}

			});
		}
	};

}]);

/**=========================================================
 * Module: scroll.js
 * Make a content box scrollable
 =========================================================*/

App.directive('scrollable', function() {
	return {
		restrict: 'EA',
		link: function(scope, elem, attrs) {
			var defaultHeight = 250;
			elem.slimScroll({
				height: (attrs.height || defaultHeight)
			});
		}
	};
});
/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

App.directive('sidebar', ['$rootScope', '$window', 'Utils', function($rootScope, $window, Utils) {

	var $win = $($window);
	var $body = $('body');
	var $scope;
	var $sidebar;
	var currentState = $rootScope.$state.current.name;

	return {
		restrict: 'EA',
		template: '<nav class="sidebar" ng-transclude></nav>',
		transclude: true,
		replace: true,
		link: function(scope, element, attrs) {

			$scope = scope;
			$sidebar = element;

			var eventName = Utils.isTouch() ? 'click' : 'mouseenter';
			var subNav = $();
			$sidebar.on(eventName, '.nav > li', function() {

				if(Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover) {

					subNav.trigger('mouseleave');
					subNav = toggleMenuItem($(this));

					// Used to detect click and touch events outside the sidebar          
					sidebarAddBackdrop();

				}

			});

			scope.$on('closeSidebarMenu', function() {
				removeFloatingNav();
			});

			// Normalize state when resize to mobile
			$win.on('resize', function() {
				if(!Utils.isMobile())
					$body.removeClass('aside-toggled');
			});

			// Adjustment on route changes
			$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
				currentState = toState.name;
				// Hide sidebar automatically on mobile
				$('body.aside-toggled').removeClass('aside-toggled');

				$rootScope.$broadcast('closeSidebarMenu');
			});

			// Allows to close
			if(angular.isDefined(attrs.sidebarAnyclickClose)) {

				$('.wrapper').on('click.sidebar', function(e) {
					// don't check if sidebar not visible
					if(!$body.hasClass('aside-toggled')) return;

					// if not child of sidebar
					if(!$(e.target).parents('.aside').length) {
						$body.removeClass('aside-toggled');
					}

				});
			}

		}
	};

	function sidebarAddBackdrop() {
		var $backdrop = $('<div/>', {
			'class': 'dropdown-backdrop'
		});
		$backdrop.insertAfter('.aside-inner').on("click mouseenter", function() {
			removeFloatingNav();
		});
	}

	// Open the collapse sidebar submenu items when on touch devices 
	// - desktop only opens on hover
	function toggleTouchItem($element) {
		$element
			.siblings('li')
			.removeClass('open')
			.end()
			.toggleClass('open');
	}

	// Handles hover to open items under collapsed menu
	// ----------------------------------- 
	function toggleMenuItem($listItem) {

		removeFloatingNav();

		var ul = $listItem.children('ul');

		if(!ul.length) return $();
		if($listItem.hasClass('open')) {
			toggleTouchItem($listItem);
			return $();
		}

		var $aside = $('.aside');
		var $asideInner = $('.aside-inner'); // for top offset calculation
		// float aside uses extra padding on aside
		var mar = parseInt($asideInner.css('padding-top'), 0) + parseInt($aside.css('padding-top'), 0);
		var subNav = ul.clone().appendTo($aside);

		toggleTouchItem($listItem);

		var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
		var vwHeight = $win.height();

		subNav
			.addClass('nav-floating')
			.css({
				position: $scope.app.layout.isFixed ? 'fixed' : 'absolute',
				top: itemTop,
				bottom: (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
			});

		subNav.on('mouseleave', function() {
			toggleTouchItem($listItem);
			subNav.remove();
		});

		return subNav;
	}

	function removeFloatingNav() {
		$('.dropdown-backdrop').remove();
		$('.sidebar-subnav.nav-floating').remove();
		$('.sidebar li.open').removeClass('open');
	}

}]);
/**=========================================================
 * Module: skycons.js
 * Include any animated weather icon from Skycons
 =========================================================*/

App.directive('skycon', function() {

	return {
		restrict: 'A',
		scope: {
			test: '@data'
		},
		link: function(scope, element, attrs) {

			var weatherType = [{
				type: "阴",
				sty: "cloudy"
			}, {
				type: "小雨",
				sty: "rain"
			}, {
				type: "中雨",
				sty: "rain"
			}, {
				type: "大雨",
				sty: "sleet"
			}, {
				type: "晴",
				sty: "clear-day"
			}, {
				type: "多云",
				sty: "partly-cloudy-day"
			}];

			attrs.$observe('data', function(_value) {
				if(_value != '') {
					scope.weatherParam = _value;

					for(var i = 0; i < weatherType.length; i++) {

						if(_value === weatherType[i].type) {
							attrs.skycon = weatherType[i].sty;
							var skycons = new Skycons({
								'color': (attrs.color || 'white')
							});

							element.html('<canvas width="' + attrs.width + '" height="' + attrs.height + '"></canvas>');

							skycons.add(element.children()[0], attrs.skycon);
							skycons.play();
						}
					}
				}
			});

		}
	};
});
/**=========================================================
 * Module: sparkline.js
 * SparkLines Mini Charts
 =========================================================*/

App.directive('sparkline', ['$timeout', '$window', function($timeout, $window) {

	'use strict';

	return {
		restrict: 'EA',
		controller: ["$scope", "$element", function($scope, $element) {
			var runSL = function() {
				initSparLine($element);
			};

			$timeout(runSL);
		}]
	};

	function initSparLine($element) {
		var options = $element.data();

		options.type = options.type || 'bar'; // default chart is bar
		options.disableHiddenCheck = true;

		$element.sparkline('html', options);

		if(options.resize) {
			$(window).resize(function() {
				$element.sparkline('html', options);
			});
		}
	}

}]);

/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/

App.directive('checkAll', function() {
	'use strict';

	return {
		restrict: 'A',
		controller: ["$scope", "$element", function($scope, $element) {

			$element.on('change', function() {
				var $this = $(this),
					index = $this.index() + 1,
					checkbox = $this.find('input[type="checkbox"]'),
					table = $this.parents('table');
				// Make sure to affect only the correct checkbox column
				table.find('tbody > tr > td:nth-child(' + index + ') input[type="checkbox"]')
					.prop('checked', checkbox[0].checked);

			});
		}]
	};

});
/**=========================================================
 * Module: tags-input.js
 * Initializes the tag inputs plugin
 =========================================================*/

App.directive('tagsinput', ["$timeout", function($timeout) {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ngModel) {

			element.on('itemAdded itemRemoved', function() {
				// check if view value is not empty and is a string
				// and update the view from string to an array of tags
				if(ngModel.$viewValue && ngModel.$viewValue.split) {
					ngModel.$setViewValue(ngModel.$viewValue.split(','));
					ngModel.$render();
				}
			});

			$timeout(function() {
				element.tagsinput();
			});

		}
	};
}]);

/**=========================================================
 * Module: toggle-state.js
 * Toggle a classname from the BODY Useful to change a state that 
 * affects globally the entire layout or more than one item 
 * Targeted elements must have [toggle-state="CLASS-NAME-TO-TOGGLE"]
 * User no-persist to avoid saving the sate in browser storage
 =========================================================*/

App.directive('toggleState', ['toggleStateService', function(toggle) {
	'use strict';

	return {
		restrict: 'A',
		link: function(scope, element, attrs) {

			var $body = $('body');

			$(element)
				.on('click', function(e) {
					e.preventDefault();
					var classname = attrs.toggleState;

					if(classname) {
						if($body.hasClass(classname)) {
							$body.removeClass(classname);
							if(!attrs.noPersist)
								toggle.removeState(classname);
						} else {
							$body.addClass(classname);
							if(!attrs.noPersist)
								toggle.addState(classname);
						}

					}

				});
		}
	};

}]);

/**=========================================================
 * Module: trigger-resize.js
 * Triggers a window resize event from any element
 =========================================================*/

App.directive("triggerResize", ['$window', '$timeout', function($window, $timeout) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.on('click', function() {
				$timeout(function() {
					$window.dispatchEvent(new Event('resize'))
				});
			});
		}
	};
}]);

/**=========================================================
 * Module: validate-form.js
 * Initializes the validation plugin Parsley
 =========================================================*/

App.directive('validateForm', function() {
	return {
		restrict: 'A',
		controller: ["$scope", "$element", function($scope, $element) {
			var $elem = $($element);
			if($.fn.parsley)
				$elem.parsley();
		}]
	};
});

/**=========================================================
 * Module: vector-map.js.js
 * Init jQuery Vector Map plugin
 =========================================================*/

App.directive('vectorMap', ['vectorMap', function(vectorMap) {
	'use strict';

	var defaultColors = {
		markerColor: '#23b7e5', // the marker points
		bgColor: 'transparent', // the background
		scaleColors: ['#878c9a'], // the color of the region in the serie
		regionFill: '#bbbec6' // the base region color
	};

	return {
		restrict: 'EA',
		link: function(scope, element, attrs) {

			var mapHeight = attrs.height || '300',
				options = {
					markerColor: attrs.markerColor || defaultColors.markerColor,
					bgColor: attrs.bgColor || defaultColors.bgColor,
					scale: attrs.scale || 1,
					scaleColors: attrs.scaleColors || defaultColors.scaleColors,
					regionFill: attrs.regionFill || defaultColors.regionFill,
					mapName: attrs.mapName || 'world_mill_en'
				};

			element.css('height', mapHeight);

			vectorMap.init(element, options, scope.seriesData, scope.markersData);

		}
	};

}]);
/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

App.service('browser', function() {
	"use strict";

	var matched, browser;

	var uaMatch = function(ua) {
		ua = ua.toLowerCase();

		var match = /(opr)[\/]([\w.]+)/.exec(ua) ||
			/(chrome)[ \/]([\w.]+)/.exec(ua) ||
			/(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) ||
			/(webkit)[ \/]([\w.]+)/.exec(ua) ||
			/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
			/(msie) ([\w.]+)/.exec(ua) ||
			ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) ||
			ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

		var platform_match = /(ipad)/.exec(ua) ||
			/(iphone)/.exec(ua) ||
			/(android)/.exec(ua) ||
			/(windows phone)/.exec(ua) ||
			/(win)/.exec(ua) ||
			/(mac)/.exec(ua) ||
			/(linux)/.exec(ua) ||
			/(cros)/i.exec(ua) || [];

		return {
			browser: match[3] || match[1] || "",
			version: match[2] || "0",
			platform: platform_match[0] || ""
		};
	};

	matched = uaMatch(window.navigator.userAgent);
	browser = {};

	if(matched.browser) {
		browser[matched.browser] = true;
		browser.version = matched.version;
		browser.versionNumber = parseInt(matched.version);
	}

	if(matched.platform) {
		browser[matched.platform] = true;
	}

	// These are all considered mobile platforms, meaning they run a mobile browser
	if(browser.android || browser.ipad || browser.iphone || browser["windows phone"]) {
		browser.mobile = true;
	}

	// These are all considered desktop platforms, meaning they run a desktop browser
	if(browser.cros || browser.mac || browser.linux || browser.win) {
		browser.desktop = true;
	}

	// Chrome, Opera 15+ and Safari are webkit based browsers
	if(browser.chrome || browser.opr || browser.safari) {
		browser.webkit = true;
	}

	// IE11 has a new token so we will assign it msie to avoid breaking changes
	if(browser.rv) {
		var ie = "msie";

		matched.browser = ie;
		browser[ie] = true;
	}

	// Opera 15+ are identified as opr
	if(browser.opr) {
		var opera = "opera";

		matched.browser = opera;
		browser[opera] = true;
	}

	// Stock Android browsers are marked as Safari on Android.
	if(browser.safari && browser.android) {
		var android = "android";

		matched.browser = android;
		browser[android] = true;
	}

	// Assign the name and platform variable
	browser.name = matched.browser;
	browser.platform = matched.platform;

	return browser;

});
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/

App.factory('colors', ['APP_COLORS', function(colors) {

	return {
		byName: function(name) {
			return(colors[name] || '#fff');
		}
	};

}]);

/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/

App.service('navSearch', function() {
	var navbarFormSelector = 'form.navbar-form';
	return {
		toggle: function() {

			var navbarForm = $(navbarFormSelector);

			navbarForm.toggleClass('open');

			var isOpen = navbarForm.hasClass('open');

			navbarForm.find('input')[isOpen ? 'focus' : 'blur']();

		},

		dismiss: function() {
			$(navbarFormSelector)
				.removeClass('open') // Close control
				.find('input[type="text"]').blur() // remove focus
				.val('') // Empty input
			;
		}
	};

});
/**=========================================================
 * Module: notify.js
 * Create a notifications that fade out automatically.
 * Based on Notify addon from UIKit (http://getuikit.com/docs/addons_notify.html)
 =========================================================*/

App.service('Notify', ["$timeout", function($timeout) {
	this.alert = alert;

	////////////////

	function alert(msg, opts) {
		if(msg) {
			$timeout(function() {
				$.notify(msg, opts || {});
			});
		}
	}

}]);

/**
 * Notify Addon definition as jQuery plugin
 * Adapted version to work with Bootstrap classes
 * More information http://getuikit.com/docs/addons_notify.html
 */

(function($, window, document) {

	var containers = {},
		messages = {},

		notify = function(options) {

			if($.type(options) == 'string') {
				options = {
					message: options
				};
			}

			if(arguments[1]) {
				options = $.extend(options, $.type(arguments[1]) == 'string' ? {
					status: arguments[1]
				} : arguments[1]);
			}

			return(new Message(options)).show();
		},
		closeAll = function(group, instantly) {
			if(group) {
				for(var id in messages) {
					if(group === messages[id].group) messages[id].close(instantly);
				}
			} else {
				for(var id in messages) {
					messages[id].close(instantly);
				}
			}
		};

	var Message = function(options) {

		var $this = this;

		this.options = $.extend({}, Message.defaults, options);

		this.uuid = "ID" + (new Date().getTime()) + "RAND" + (Math.ceil(Math.random() * 100000));
		this.element = $([
			// @geedmo: alert-dismissable enables bs close icon
			'<div class="uk-notify-message alert-dismissable">',
			'<a class="close">&times;</a>',
			'<div>' + this.options.message + '</div>',
			'</div>'

		].join('')).data("notifyMessage", this);

		// status
		if(this.options.status) {
			this.element.addClass('alert alert-' + this.options.status);
			this.currentstatus = this.options.status;
		}

		this.group = this.options.group;

		messages[this.uuid] = this;

		if(!containers[this.options.pos]) {
			containers[this.options.pos] = $('<div class="uk-notify uk-notify-' + this.options.pos + '"></div>').appendTo('body').on("click", ".uk-notify-message", function() {
				$(this).data("notifyMessage").close();
			});
		}
	};

	$.extend(Message.prototype, {

		uuid: false,
		element: false,
		timout: false,
		currentstatus: "",
		group: false,

		show: function() {
			if(this.element.is(":visible")) return;
			var $this = this;
			containers[this.options.pos].show().prepend(this.element);
			var marginbottom = parseInt(this.element.css("margin-bottom"), 10);
			this.element.css({
				"opacity": 0,
				"margin-top": -1 * this.element.outerHeight(),
				"margin-bottom": 0
			}).animate({
				"opacity": 1,
				"margin-top": 0,
				"margin-bottom": marginbottom
			}, function() {

				if($this.options.timeout) {

					var closefn = function() {
						$this.close();
					};

					$this.timeout = setTimeout(closefn, $this.options.timeout);

					$this.element.hover(
						function() {
							clearTimeout($this.timeout);
						},
						function() {
							$this.timeout = setTimeout(closefn, $this.options.timeout);
						}
					);
				}

			});

			return this;
		},

		close: function(instantly) {

			var $this = this,
				finalize = function() {
					$this.element.remove();

					if(!containers[$this.options.pos].children().length) {
						containers[$this.options.pos].hide();
					}

					delete messages[$this.uuid];
				};

			if(this.timeout) clearTimeout(this.timeout);

			if(instantly) {
				finalize();
			} else {
				this.element.animate({
					"opacity": 0,
					"margin-top": -1 * this.element.outerHeight(),
					"margin-bottom": 0
				}, function() {
					finalize();
				});
			}
		},

		content: function(html) {

			var container = this.element.find(">div");

			if(!html) {
				return container.html();
			}

			container.html(html);

			return this;
		},

		status: function(status) {

			if(!status) {
				return this.currentstatus;
			}

			this.element.removeClass('alert alert-' + this.currentstatus).addClass('alert alert-' + status);

			this.currentstatus = status;

			return this;
		}
	});

	Message.defaults = {
		message: "",
		status: "normal",
		timeout: 5000,
		group: null,
		pos: 'top-center'
	};

	$["notify"] = notify;
	$["notify"].message = Message;
	$["notify"].closeAll = closeAll;

	return notify;

}(jQuery, window, document));

/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/
App.provider('RouteHelpers', ['APP_REQUIRES', function(appRequires) {
	"use strict";

	// Set here the base of the relative path
	// for all app views
	this.basepath = function(uri) {
		return 'app/views/' + uri;
	};

	// Generates a resolve object by passing script names
	// previously configured in constant.APP_REQUIRES
	this.resolveFor = function() {
		var _args = arguments;
		return {
			deps: ['$ocLazyLoad', '$q', function($ocLL, $q) {
				// Creates a promise chain for each argument
				var promise = $q.when(1); // empty promise
				for(var i = 0, len = _args.length; i < len; i++) {
					promise = andThen(_args[i]);
				}
				return promise;

				// creates promise to chain dynamically
				function andThen(_arg) {
					// also support a function that returns a promise
					if(typeof _arg == 'function')
						return promise.then(_arg);
					else
						return promise.then(function() {
							// if is a module, pass the name. If not, pass the array
							var whatToLoad = getRequired(_arg);
							// simple error check
							if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
							// finally, return a promise
							return $ocLL.load(whatToLoad);
						});
				}
				// check and returns required data
				// analyze module items with the form [name: '', files: []]
				// and also simple array of script files (for not angular js)
				function getRequired(name) {
					if(appRequires.modules)
						for(var m in appRequires.modules)
							if(appRequires.modules[m].name && appRequires.modules[m].name === name)
								return appRequires.modules[m];
					return appRequires.scripts && appRequires.scripts[name];
				}

			}]
		};
	}; // resolveFor

	// not necessary, only used in config block for routes
	this.$get = function() {
		return {
			basepath: this.basepath
		}
	};

}]);
/**=========================================================
 * 分页获取数据
 * 
 =========================================================*/
App.service("PagerExtends", ["$http", function($http) {
	this.regListSpecifyPage = function($scope, options, headers) {
		$scope.pagination = {
			//默认每页10条数据
			page: 1,
			pageSize: 10,
			total: 0,
		};

		var defaultOpt = {
			apiUrl: "",
			params: {
				length: $scope.pagination.pageSize,
				currentPage: $scope.pagination.page
			},
			success: function() {},
			error: function() {},
			addIndex: function(list) {
				$(list).each(function(n, i) {
					i.$index = ($scope.pagination.page - 1) * ($scope.pagination.pageSize) + n + 1;
				});
			}
		}

		var opts = $.extend(true, {}, defaultOpt, options);

		$scope.__paginationOpts = opts;

		//第一次获取精确列表数值
		(function() {
			$scope.listBusyPromise = $http.get(opts.apiUrl, {
				headers: headers ? headers : null,
				method: "GET",
				params: opts.params,
			}).then(function success(response) {
				var dataPackage = response.data;
				if(dataPackage.State.Code === 0) {
					var data = dataPackage.Content;
					opts.success(data.pagelist);
					opts.addIndex(data.pagelist);
					$scope.pagination.page = data.paginator.currentPage;
					$scope.pagination.pageSize = data.paginator.length;
					$scope.pagination.total = data.paginator.totleNum;
				} else {
					opts.error(response.message || response.data.State.Message);
				}
			});
		})();

		//点击分页事件
		$scope.getListSpecifyPage = function(page, pageSize) {
			var opts = $scope.__paginationOpts;
			var params = opts.params;
			params.length = pageSize;
			params.currentPage = page;
			//params.value = $scope.userSearchPattern || "";
			$scope.listBusyPromise = $http.get(opts.apiUrl, {
				headers: headers ? headers : null,
				method: "GET",
				params: params
			}).then(function success(response) {
				var dataPackage = response.data;
				if(dataPackage.State.Code === 0) {
					var data = dataPackage.Content;
					$scope.pagination.page = data.paginator.currentPage;
					$scope.pagination.pageSize = data.paginator.length;
					$scope.pagination.total = data.paginator.totleNum;
					opts.success(data.pagelist);
					opts.addIndex(data.pagelist);
				} else {
					opts.error(response.message);
				}
			}, function error(error) {
				opts.error(error);
			});
		}

		$scope.paginatorFirstPage = function() {
			$scope.getListSpecifyPage(1, 10);
		}
	}
}]);
/**=========================================================
 * Module: toggle-state.js
 * Services to share toggle state functionality
 =========================================================*/

App.service('toggleStateService', ['$rootScope', function($rootScope) {

	var storageKeyName = 'toggleState';

	// Helper object to check for words in a phrase //
	var WordChecker = {
		hasWord: function(phrase, word) {
			return new RegExp('(^|\\s)' + word + '(\\s|$)').test(phrase);
		},
		addWord: function(phrase, word) {
			if(!this.hasWord(phrase, word)) {
				return(phrase + (phrase ? ' ' : '') + word);
			}
		},
		removeWord: function(phrase, word) {
			if(this.hasWord(phrase, word)) {
				return phrase.replace(new RegExp('(^|\\s)*' + word + '(\\s|$)*', 'g'), '');
			}
		}
	};

	// Return service public methods
	return {
		// Add a state to the browser storage to be restored later
		addState: function(classname) {
			var data = angular.fromJson($rootScope.$storage[storageKeyName]);

			if(!data) {
				data = classname;
			} else {
				data = WordChecker.addWord(data, classname);
			}

			$rootScope.$storage[storageKeyName] = angular.toJson(data);
		},

		// Remove a state from the browser storage
		removeState: function(classname) {
			var data = $rootScope.$storage[storageKeyName];
			// nothing to remove
			if(!data) return;

			data = WordChecker.removeWord(data, classname);

			$rootScope.$storage[storageKeyName] = angular.toJson(data);
		},

		// Load the state string and restore the classlist
		restoreState: function($elem) {
			var data = angular.fromJson($rootScope.$storage[storageKeyName]);

			// nothing to restore
			if(!data) return;
			$elem.addClass(data);
		}

	};

}]);
/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

App.service('Utils', ["$window", "APP_MEDIAQUERY", function($window, APP_MEDIAQUERY) {
	'use strict';

	var $html = angular.element("html"),
		$win = angular.element($window),
		$body = angular.element('body');

	return {
		// DETECTION
		support: {
			transition: (function() {
				var transitionEnd = (function() {

					var element = document.body || document.documentElement,
						transEndEventNames = {
							WebkitTransition: 'webkitTransitionEnd',
							MozTransition: 'transitionend',
							OTransition: 'oTransitionEnd otransitionend',
							transition: 'transitionend'
						},
						name;

					for(name in transEndEventNames) {
						if(element.style[name] !== undefined) return transEndEventNames[name];
					}
				}());

				return transitionEnd && {
					end: transitionEnd
				};
			})(),
			animation: (function() {

				var animationEnd = (function() {

					var element = document.body || document.documentElement,
						animEndEventNames = {
							WebkitAnimation: 'webkitAnimationEnd',
							MozAnimation: 'animationend',
							OAnimation: 'oAnimationEnd oanimationend',
							animation: 'animationend'
						},
						name;

					for(name in animEndEventNames) {
						if(element.style[name] !== undefined) return animEndEventNames[name];
					}
				}());

				return animationEnd && {
					end: animationEnd
				};
			})(),
			requestAnimationFrame: window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				function(callback) {
					window.setTimeout(callback, 1000 / 60);
				},
			touch: (
				('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
				(window.DocumentTouch && document instanceof window.DocumentTouch) ||
				(window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
				(window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
				false
			),
			mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
		},
		// UTILITIES
		isInView: function(element, options) {

			var $element = $(element);

			if(!$element.is(':visible')) {
				return false;
			}

			var window_left = $win.scrollLeft(),
				window_top = $win.scrollTop(),
				offset = $element.offset(),
				left = offset.left,
				top = offset.top;

			options = $.extend({
				topoffset: 0,
				leftoffset: 0
			}, options);

			if(top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
				left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
				return true;
			} else {
				return false;
			}
		},
		langdirection: $html.attr("dir") == "rtl" ? "right" : "left",
		isTouch: function() {
			return $html.hasClass('touch');
		},
		isSidebarCollapsed: function() {
			return $body.hasClass('aside-collapsed');
		},
		isSidebarToggled: function() {
			return $body.hasClass('aside-toggled');
		},
		isMobile: function() {
			return $win.width() < APP_MEDIAQUERY.tablet;
		}
	};
}]);
/**=========================================================
 * Module: vector-map.js
 * Services to initialize vector map plugin
 =========================================================*/

App.service('vectorMap', function() {
	'use strict';
	return {
		init: function($element, opts, series, markers) {
			$element.vectorMap({
				map: opts.mapName,
				backgroundColor: opts.bgColor,
				zoomMin: 1,
				zoomMax: 8,
				zoomOnScroll: false,
				regionStyle: {
					initial: {
						'fill': opts.regionFill,
						'fill-opacity': 1,
						'stroke': 'none',
						'stroke-width': 1.5,
						'stroke-opacity': 1
					},
					hover: {
						'fill-opacity': 0.8
					},
					selected: {
						fill: 'blue'
					},
					selectedHover: {}
				},
				focusOn: {
					x: 0.4,
					y: 0.6,
					scale: opts.scale
				},
				markerStyle: {
					initial: {
						fill: opts.markerColor,
						stroke: opts.markerColor
					}
				},
				onRegionLabelShow: function(e, el, code) {
					if(series && series[code])
						el.html(el.html() + ': ' + series[code] + ' visitors');
				},
				markers: markers,
				series: {
					regions: [{
						values: series,
						scale: opts.scaleColors,
						normalizeFunction: 'polynomial'
					}]
				},
			});
		}
	};
});

App.service("layerAlert", function() {
	var area = ['360px', 'auto'], //设置弹出框大小
		btn = ['确定', '取消'], //设置弹出框按钮组
		shift = 5,
		shadeClose = false; //点击遮罩关闭层

	this.error = function(text, title) {
		var def_title = '出错啦！';
		title = title ? title : def_title;
		layer.open({
			title: title,
			shadeClose: shadeClose,
			area: area,
			btn: btn,
			btnAlign: 'c',
			content: text,
			icon: 2,
			shift: shift
		});
	};

	this.iframe = function(title, url) {
		var def_title = '弹出窗口';
		title = title ? title : def_title;
		layer.open({
			type: 2,
			title: title,
			maxmin: true,
			shadeClose: false, //点击遮罩关闭层
			area: ['100%', '100%'],
			content: url
		});
	};

	this.autoclose = function(text, title, time) {
		var def_title = '提示！';
		title = title ? title : def_title;
		time = time ? time : 1000;
		if(arguments.length === 1) {
			layer.alert(text);
		} else {
			layer.open({
				title: title,
				shadeClose: shadeClose,
				area: area,
				btn: btn,
				btnAlign: 'c',
				content: text,
				icon: 0,
				shift: shift
			});
		}
		setTimeout(function(index, layero) {
			layer.closeAll();
		}, time);
	};
	this.success = function(text, title) {
		var def_title = '成功啦！';
		title = title ? title : def_title;
		layer.open({
			title: title,
			shadeClose: shadeClose,
			area: ['360px', 'auto'],
			btn: btn,
			btnAlign: 'c',
			content: text,
			icon: 1,
			shift: shift
		});
	};
	this.info = function(text, title) {
		var def_title = '提示！';
		title = title ? title : def_title;
		layer.open({
			title: title,
			shadeClose: shadeClose,
			area: area,
			btn: btn,
			btnAlign: 'c',
			content: text,
			icon: 0,
			shift: shift
		});
	};

	this.confirm = function(text, todo, title) {
		var def_title = '提示：';
		title = title ? title : def_title;
		layer.open({
			title: title,
			shadeClose: shadeClose,
			area: area,
			btn: btn,
			btnAlign: 'c',
			content: text,
			icon: 0,
			shift: shift,
			yes: function(index, layero) {
				if(todo) todo();
				layer.close(index);
			}
		});
	};

	this.checkone = function() {
		/*==========================================*/
		/*arguments=[title,function1,function2,btn1Text,btn2Text,btn1ClickedClose,btn1ClickedClose,text];
		* title:窗口显示标题
		* function1：回调函数1
		* function2：回调函数2
		* btn1Text:按钮1文本
		* btn2Text:按钮2文本
		* btn1ClickedClose:回调函数1执行完成是否关闭窗口
		* btn2ClickedClose:回调函数2执行完成是否关闭窗口
		* text:窗口显示内容
		/*==========================================*/
		var def_title = '提示:';
		var def_text = '请选择要执行的操作';
		var title = arguments[0] ? arguments[0] : def_title;
		var _btn = arguments[3] && arguments[4] ? [arguments[3], arguments[4]] : btn;
		var text = arguments[7] ? arguments[7] : def_text;
		if(typeof arguments[0] == "function" && typeof arguments[1] == "function") {
			var btn1ClickedClose = arguments[4],
				btn2ClickedClose = arguments[5];
			title = def_title;
			_btn = arguments[2] && arguments[3] ? [arguments[2], arguments[3]] : btn;
			var fun1 = arguments[0],
				fun2 = arguments[1];
			layer.open({
				title: title,
				shadeClose: shadeClose,
				area: area,
				btn: _btn,
				btnAlign: 'c',
				content: text,
				icon: 0,
				shift: shift,
				btn1: function(index, layero) {
					fun1();
					if(btn1ClickedClose) layer.close(index);
				},
				btn2: function(index, layero) {
					fun2();
					if(!btn2ClickedClose) return false;
				}
			});
		} else {
			var fun1 = arguments[1],
				fun2 = arguments[2],
				btn1ClickedClose = arguments[5],
				btn2ClickedClose = arguments[6];
			layer.open({
				title: title,
				shadeClose: shadeClose,
				area: area,
				btn: _btn,
				btnAlign: 'c',
				content: text,
				icon: 0,
				shift: shift,
				btn1: function(index, layero) {
					if(fun1) fun1();
					if(btn1ClickedClose) layer.close(index);
				},
				btn2: function(index, layero) {
					if(fun2) fun2();
					if(!btn2ClickedClose) return false;
				}
			});
		}

	};
});

// -----------------------------------