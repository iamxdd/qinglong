$stateProvider.state('app.shijian-guanzhurenqun', {
	url: '/shijian-guanzhurenqun',
	title: '关注人群列表',
	templateUrl: helper.basepath('shijian-guanzhurenqun.html'),
	resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'guanzhurenqunCtrl'),
	controller: 'guanzhurenqunCtrl'
}).state('app.shijian-zhuquqiye', {
	url: '/shijian-zhuquqiye',
	title: '驻区企业列表',
	templateUrl: helper.basepath('shijian-zhuquqiye.html'),
	resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'zhuquqiyeCtrl'),
	controller: 'zhuquqiyeCtrl'
}).state('app.shijian-xinwengonggao', {
	url: '/shijian-xinwengonggao',
	title: '新闻公告管理',
	templateUrl: helper.basepath('shijian-xinwengonggao.html'),
	resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'xinwengonggaoCtrl'),
	controller: 'xinwengonggaoCtrl'
}).state('app.shijian-juminjifen', {
	url: '/shijian-juminjifen',
	title: '居民积分管理',
	templateUrl: helper.basepath('shijian-juminjifen.html'),
	resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'juminjifenCtrl'),
	controller: 'juminjifenCtrl'
}).state('app.shijian-minzhuxieshang', {
	url: '/shijian-minzhuxieshang',
	title: '民主协商管理',
	templateUrl: helper.basepath('shijian-minzhuxieshang.html'),
	resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', 'minzhuxieshangCtrl'),
	controller: 'minzhuxieshangCtrl'
});
var modules = [{
		name: 'guanzhurenqunCtrl',
		files: ['app/controller/guanzhurenqunCtrl.js']
	},
	{
		name: 'zhuquqiyeCtrl',
		files: ['app/controller/zhuquqiyeCtrl.js']
	},
	{
		name: 'xinwengonggaoCtrl',
		files: ['app/controller/xinwengonggaoCtrl.js']
	},
	{
		name: 'juminjifenCtrl',
		files: ['app/controller/juminjifenCtrl.js']
	},
	{
		name: 'minzhuxieshangCtrl',
		files: ['app/controller/minzhuxieshangCtrl.js']
	},
]