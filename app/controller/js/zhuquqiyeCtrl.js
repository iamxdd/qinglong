/*!qinglongWeb-1.0.0 2017-11-01*/
App.controller("zhuquqiyeCtrl",["$scope","$http","ngDialog","PagerExtends","layerAlert","serverUrls","PcService","$filter",function(a,b,c,d,e,f,g,h){a.list=[{},{}],a.TitleText="新增",a.PcService=g,a.searchOption={name:""},a.industry=[{Id:1,Name:"食品"}],a.Enterprise=[{Id:1,Name:"民营"}],a.fieldsList=[{name:"Name",nameDisplay:"企业名称",editor:"normal",required:!0,value:"",originValue:""},{name:"Industry",nameDisplay:"行业",editor:"select",required:!0,value:"",opts:a.industry,originValue:a.industry[0].Id},{editor:"normal",name:"TelePhone",nameDisplay:"电话",required:!0,value:"",originValue:""},{editor:"normal",name:"Email",nameDisplay:"邮箱",required:!1,value:"",originValue:""},{editor:"normal",name:"Website",nameDisplay:"网址",required:!1,value:"",originValue:""},{editor:"normal",name:"Address",nameDisplay:"地址",required:!0,value:"",originValue:""},{editor:"normal",name:"LegalRepresentative",nameDisplay:"法人代表",required:!0,value:"",originValue:""},{editor:"normal",name:"RegisteredCapital",nameDisplay:"注册资本",required:!1,value:"",originValue:""},{name:"RegisteredTime",nameDisplay:"注册时间",editor:"time-picker",required:!1,value:"",editable:!1,originValue:""},{editor:"normal",name:"BusinessRegistrationNo",nameDisplay:"工商注册号",required:!0,value:"",originValue:""},{editor:"normal",name:"OrganizationCode",nameDisplay:"组织机构代码",required:!0,value:"",originValue:""},{editor:"normal",name:"UniformTrustCode",nameDisplay:"统一信用代码",required:!0,value:"",originValue:""},{editor:"select",name:"Types",nameDisplay:"企业类型",required:!1,value:"",opts:a.Enterprise,originValue:a.Enterprise[0].Id},{editor:"normal",name:"TaxpayerID",nameDisplay:"纳税人识别号",required:!0,value:"",originValue:""},{editor:"normal",name:"OperationTerm",nameDisplay:"营业期限",required:!1,value:"",originValue:""},{name:"ApprovalDate",nameDisplay:"核准日期",editor:"time-picker",required:!1,value:"",editable:!1,originValue:""},{editor:"normal",name:"RegistrationAuthority",nameDisplay:"登记机关",required:!1,value:"",originValue:""},{editor:"normal",name:"RegisteredAddress",nameDisplay:"注册地址",required:!1,value:"",originValue:""},{editor:"normal",name:"OperationScope",nameDisplay:"经营范围",required:!1,value:"",originValue:""}],a.creatOne=function(){var b=a.fieldsList,d=a.fetchData;b.forEach(function(a,b){a.editable=!1}),g.initFormList(b),c.openConfirm({template:"createOne",controller:["$scope",function(a){a.TitleText="新增",a.fieldsList=b,a.fetchData=d,a.formSubmit=function(){b.map(function(a){"time-picker"===a.editor&&(a.value=a.value?h("date")(a.value,"yyyy-MM-dd"):"")}),g.formSubmit(a,!0,a.fieldsList,f.addEnterprise)}}],className:"ngdialog-theme-default",closeByDocument:!1,width:850})},a.editItem=function(b){a.fieldsList.forEach(function(a,b){a.editable=!0});var d=a.fieldsList;g.bindFormData(b,d),c.openConfirm({template:"createOne",controller:["$scope",function(a){a.fieldsList=d,a.TitleText="查看"}],className:"ngdialog-theme-default",closeByDocument:!1,width:850})},a.fetchData=function(){d.regListSpecifyPage(a,{apiUrl:f.enterpriseList,params:a.searchOption,success:function(b){a.list=b},error:function(a){e.autoclose(a)}})},a.fetchData()}]);