/*!qinglongWeb-1.0.0 2017-11-01*/
App.controller("eventTemplateCtrl",["$scope","$rootScope","$http","ngDialog","PagerExtends","layerAlert","serverUrls","PcService",function(a,b,c,d,e,f,g,h){a.list=[],a.TitleText="新增",a.searchOption={openState:-1,usageLv:-1},a.PcService=h,a.fetchData=function(){h.fetchData(a,g.eventFeedbackinspectorList,a.searchOption)},a.fetchData(),a.toggeItem=function(b){h.toggleStatus(a,b,g.eventFeedbackinspector)};var i=function(a,b){a.ngDialogPromise=c({method:"get",url:g.eventInspectorlist+"?length=9999&currentPage=1"}).success(function(c){var d=c.State.Code;c.State.Message;if(0===d){var e=c.Content.pagelist,f=[];e.forEach(function(a,b){0===a.Scope&&f.push(a)}),a.InspectorList=f,a.fieldsList.forEach(function(c,d){"InspectorId"===c.name&&(c.opts=a.InspectorList,b&&(c.value=a.InspectorList[0]?a.InspectorList[0].Id:""))})}}).error(function(a){f.autoclose(h.errorResult(a))})};a.creatOne=function(){var c=a.fieldsList,e=a.fetchData;h.initFormList(c),d.openConfirm({template:"createOne",controller:["$scope",function(a){a.TitleText="新增",a.fieldsList=c,a.InspectorList=[],0===a.InspectorList.length&&i(a,!0),a.fetchData=e,a.formSubmit=function(){h.formSubmit(a,!0,a.fieldsList,g.eventFeedbackinspector,null,null,b.pHeader)}}],className:"ngdialog-theme-default",closeByDocument:!1,width:600})},a.editItem=function(c){var e=a.fieldsList,f=a.fetchData;h.bindFormData(c,e),d.openConfirm({template:"createOne",controller:["$scope",function(a){a.TitleText="修改",a.fieldsList=e,a.InspectorList=[],0===a.InspectorList.length&&i(a,!1),a.fetchData=f,a.formSubmit=function(){h.formSubmit(a,!1,a.fieldsList,g.eventFeedbackinspector,c,null,b.pHeader)}}],className:"ngdialog-theme-default",closeByDocument:!1,width:600})},a.FeedbackTypes=[{Id:1,Name:"流动人口"},{Id:2,Name:"环境卫生"},{Id:3,Name:"纠纷调解"},{Id:4,Name:"重点人群"}],a.OpenStates=[{Id:1,Name:"启用"},{Id:2,Name:"停用"}],a.fieldsList=[{name:"InspectorId",nameDisplay:"事件模板",editor:"select",required:!0,value:"",originValue:""},{name:"Name",nameDisplay:"模板名称",editor:"normal",required:!0,value:"",originValue:""},{name:"FormType",nameDisplay:"表单类型",editor:"select",required:!0,value:"",originValue:a.FeedbackTypes[0].Id,opts:a.FeedbackTypes},{name:"OpenState",nameDisplay:"启用状态",editor:"select",required:!0,value:"",opts:a.OpenStates,originValue:a.OpenStates[0].Id},{name:"Description",nameDisplay:"描述",editor:"normal",required:!1,value:"",originValue:""},{name:"Note",nameDisplay:"备注",editor:"normal",required:!1,value:"",originValue:""}]}]);