/*!qinglongWeb-1.0.0 2017-11-01*/
App.controller("huanjingweishengCtrl",["$scope","$http","ngDialog","PagerExtends","layerAlert",function(a,b,c,d,e){a.list=[{},{}],a.creatOne=function(){c.openConfirm({template:"createOne",controller:"huanjingweishengCtrl",className:"ngdialog-theme-default",closeByDocument:!1})}}]);