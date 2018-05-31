var fs = require("fs");
var data = '';
console.log("nodejs运行正常！");

//var jsTemplate = function(name) {
//	return 'App.controller(\'' + name + 'Ctrl\', [\'$scope\', \'ngDialog\',\'$http\',\'layerAlert\', function($scope, ngDialog,$http,layerAlert) {\n' +
//		'	$scope.list = [{}, {}];\n' +
//		'	\n' +
//		'	//新增管理\n' +
//		'	$scope.creatOne = function() {\n' +
//		'		ngDialog.openConfirm({\n' +
//		'			template: \'createOne\',\n' +
//		'			controller: \'' + name + 'Ctrl\',\n' +
//		'			className: \'ngdialog-theme-default\',\n' +
//		'			//closeByEscape: true,\n' +
//		'			closeByDocument: false\n' +
//		'		});\n' +
//		'	};\n' +
//		'}]);\n'
//};
//
//var stateTemplate = function(menuGroup, menuItem) {
//	return ".state('app." + menuGroup.text + "-" + menuItem.name + "', {\n" +
//		"	url: '/" + menuGroup.text + "-" + menuItem.name + "',\n" +
//		"	title:'" + menuItem.display + "',\n" +
//		"	templateUrl: helper.basepath('" + menuGroup.text + "-" + menuItem.name + ".html'),\n" +
//		"	resolve: helper.resolveFor('ngGrid', 'ngDialog', 'localytics.directives', '" + menuItem.name + "Ctrl'),\n" +
//		"	controller: '" + menuItem.name + "Ctrl'\n" +
//		"})"
//};
//
//var moduleTemplate = function(ctrlName) {
//	return "{\n" +
//		"	name: '" + ctrlName + "Ctrl',\n" +
//		"	files: ['app/controller/" + ctrlName + "Ctrl.js']\n" +
//		"},\n"
//}
//
//var fileNames = [{
//		text: "shijian",
//		submenu: [{
//			name: "liudongrenkou",
//			display: "流动人口事项"
//		}, {
//			name: "fangwuchuzu",
//			display: "房屋出租事项"
//		}, {
//			name: "zhongdianrenqun",
//			display: "重点人群事项"
//		}, {
//			name: "guanhuaiduixiang",
//			display: "关怀对象事项"
//		}, {
//			name: "jiufentiaojie",
//			display: "纠纷调解事项"
//		}]
//	},
//	{
//		text: "huanwei",
//		submenu: [{
//			name: "huanjingweisheng",
//			display: "环境卫生治理"
//		}, {
//			name: "chengguanshangbao",
//			display: "城管上报事项"
//		}, {
//			name: "wuranyuan",
//			display: "污染源事项"
//		}]
//	},
//	{
//		text: "anquan",
//		submenu: [{
//			name: "anquanxiaofang",
//			display: "安全消防事项"
//		}, {
//			name: "yichangqingkuang",
//			display: "异常情况事项"
//		}, {
//			name: "shiyaoanquan",
//			display: "食药安全事项"
//		}]
//	},
//	{
//		text: "yuanluo",
//		submenu: [{
//			name: "shipinjiankong",
//			display: "视频监控"
//		}, {
//			name: "tingcheguanli",
//			display: "停车管理"
//		}, {
//			name: "menjinguanli",
//			display: "门禁管理"
//		}, {
//			name: "lvhuaguanli",
//			display: "绿化管理"
//		}, {
//			name: "ziliaoguanli",
//			display: "资料管理"
//		}, {
//			name: "shujucaiji",
//			display: "数据采集"
//		}, {
//			name: "diantiguanli",
//			display: "电梯管理"
//		}, {
//			name: "xiaofangguanli",
//			display: "消防管理"
//		}, {
//			name: "jinchukouguanli",
//			display: "进出口管理"
//		}]
//	},
//	{
//		text: "zonghe",
//		submenu: [{
//			name: "xinwenfabu",
//			display: "新闻发布"
//		}, {
//			name: "jifentiaozheng",
//			display: "积分调整"
//		}, {
//			name: "zhiyuanzhe",
//			display: "志愿者列表"
//		}]
//	},
//	{
//		text: "peizhi",
//		submenu: [{
//			name: "shixiangmuban",
//			display: "事项模板管理"
//		}, {
//			name: "shixiangshili",
//			display: "事项实例管理"
//		}, {
//			name: "jifenguize",
//			display: "积分规则"
//		}]
//	},
//	{
//		text: "tongji",
//		submenu: [{
//			name: "maodunjiufen",
//			display: "矛盾纠纷统计"
//		}, {
//			name: "xinfangtaizhang",
//			display: "信访台账统计"
//		}, {
//			name: "gonganjingqing",
//			display: "公安警情统计"
//		}, {
//			name: "shengchanyinhuan",
//			display: "生产隐患统计"
//		}, {
//			name: "guanhuaiduixiang",
//			display: "关怀对象统计"
//		}, {
//			name: "yuanluoxinxi",
//			display: "院落信息统计"
//		}, {
//			name: "teshurenqunfuwu",
//			display: "特殊人群服务统计"
//		}, {
//			name: "guanhuaiduixiangfuwu",
//			display: "关怀对象服务统计"
//		}, {
//			name: "danweixunchangfuwu",
//			display: "单位巡场服务统计"
//		}]
//	}
//];
//
//// 创建可读流
//var readerStream = fs.createReadStream('app/views/zuzhi-zuzhijiagou.html');
//
//// 设置编码为 utf8。
//readerStream.setEncoding('UTF8');
//
//// 处理流事件 --> data, end, and error
//readerStream.on('data', function(chunk) {
//	data += chunk;
//});
//
//readerStream.on('end', function() {
//	var stateCtrl = fs.createWriteStream("app/js/state.js");
//	var ctrlState = "$stateProvider";
//	var moduleSate = "";
//	fileNames.forEach(function(_item, _index) {
//		_item.submenu.forEach(function(item, index) {
//			//生成html文件（目录：app/views/）
//			var writeStreamPath = "app/views/" + _item.text + "-" + item.name + ".html";
//			var writerStream = fs.createWriteStream(writeStreamPath);
//			writerStream.write(data);
//			//生成js文件（目录：app/controller/）
//			var cwriteStreamPath = "app/controller/" + item.name + "Ctrl.js";
//			var cwriterStream = fs.createWriteStream(cwriteStreamPath);
//			cwriterStream.write(jsTemplate(item.name));
//			//生成uirout路由和文件关联（目标：app/js/state.js）
//			ctrlState += stateTemplate(_item, item);
//			moduleSate += moduleTemplate(item.name);
//		});
//	});
//	stateCtrl.write(ctrlState + ";\n" + "var modules= [\n" + moduleSate + "]");
//});