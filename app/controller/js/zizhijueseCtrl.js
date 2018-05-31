/*!qinglongWeb-1.0.0 2017-11-01*/
App.controller("zizhijueseCtrl",["$scope","$rootScope","$http","ngDialog","PagerExtends","layerAlert","serverUrls","PcService","$q",function(a,b,c,d,e,f,g,h,i){a.list=[],a.TitleText="新增",a.roleMembers=[],a.fetchData=function(){h.fetchList(a,g.autoNomyrolelist)},a.fetchData(),a.deleteItem=function(b){h.deleteItem(a,g.deleteRole,b)},a.fieldsList=[{name:"Name",nameDisplay:"角色名称",editor:"normal",required:!0,value:"",originValue:""},{name:"Code",nameDisplay:"角色Code",editor:"normal",required:!0,value:"",originValue:""},{name:"Description",nameDisplay:"角色描述",editor:"normal",required:!1,value:"",originValue:""}],a.creatOne=function(){var b=a.fetchData,c=a.fieldsList;h.initFormList(c),d.openConfirm({template:"createOne",controller:["$scope",function(a){a.TitleText="修改自治角色",a.fetchData=b,a.fieldsList=c,a.formSubmit=function(){h.formSubmit(a,!0,a.fieldsList,g.inAutonomyrole)}}],className:"ngdialog-theme-default",closeByDocument:!1,width:600})};var j=function(a,b,d,e){a.listBusyPromise=c({method:"get",url:g.staffList+"?length=9999&currentPage=1&code="+b.Code}).success(function(b){var c=b.State.Code,g=b.State.Message;0===c?(a.roleMembers=b.Content.pagelist,e&&(e.roleMembers=b.Content.pagelist),d&&d.resolve()):f.autoclose(g)}).error(function(a){f.autoclose(h.errorResult(a))})},k=function(a,b){b&&(a.getResidentPromise=c({method:"get",url:g.negotiationList+"?value="+b}).success(function(b){var c=b.State.Code,d=b.State.Message;0===c?(a.ResidentStatus=b.Content,a.ResidentStatus&&a.ResidentStatus.length>0?(a.ResidentStatus.forEach(function(a,b){a.Id=a.ResidentStatus}),a.fieldsList[0].opts=a.ResidentStatus,a.fieldsList[0].value=a.ResidentStatus[0]?a.ResidentStatus[0].Id:""):f.autoclose("当前关键字没有相关居民，请重新搜索！")):f.autoclose(d)}).error(function(a){f.autoclose(h.errorResult(a))}))},l=function(a,b){a.ngDialogPromise=c({method:"get",url:g.Associationall}).success(function(c){var d=c.State.Code,e=c.State.Message;0===d?(a.autonomyOrganizations=c.Content,a.fieldsList.forEach(function(b,c){"AutonomyOrganizationsId"===b.name&&(b.opts=a.autonomyOrganizations,b.originValue=a.autonomyOrganizations[0]?a.autonomyOrganizations[0].Id:"")}),b&&b.resolve()):f.autoclose(e)}).error(function(a){f.autoclose(h.errorResult(a))})},m=function(a,b,d,e){b.ngDialogPromise=b.listBusyPromise=c({method:"post",url:g.inStaff,data:d}).success(function(c){var d=c.State.Code,g=c.State.Message;0===d?(f.autoclose("新增成功!"),a&&j(a.$parent.$parent,e,null,a),setTimeout(function(){b.closeThisDialog()},1600)):f.autoclose(g)}).error(function(a){f.autoclose(h.errorResult(a))})},n=function(a,b,d){a.getResidentPromise=c({method:"delete",url:g.deStaff+"?id="+d.Id}).success(function(c){var d=c.State.Code,e=c.State.Message;0===d?(f.autoclose("删除成功！"),j(a.$parent.$parent,b,null,a)):f.autoclose(e)}).error(function(a){f.autoclose(h.errorResult(a))})};a.MembersManageItem=function(b){var c=i.defer(),e=c.promise;j(a,b,c);var g=a.fetchData;e.then(function(){d.openConfirm({template:"MemberManage",scope:a,controller:["$scope",function(a){a.TitleText="角色成员管理",a.fetchData=g,a.roleMembers=a.$parent.$parent.roleMembers,a.AutonomyOrganizations=[{Id:0,Name:"请选择"}],a.fieldsList=[{editor:"select",name:"ResidentStatus",nameDisplay:"选择居民",required:!0,value:"",originValue:0,opts:[{Id:0,Name:"请选择"}]},{editor:"select",name:"AutonomyOrganizationsId",nameDisplay:"选择组织",required:!0,value:"",originValue:a.AutonomyOrganizations[0].Id,opts:a.Grids}],a.deleteMember=function(c){n(a,b,c)},a.addMember=function(){var c=i.defer(),e=c.promise;l(a,c),e.then(function(){var c=a,e=a.fieldsList;h.initFormList(e);var g=a.fetchData;d.openConfirm({template:"createMember",controller:["$scope",function(a){a.TitleText="新增",a.fieldsList=e,a.fetchData=g,a.Resident={value:""},a.getResidentStatus=function(){k(a,a.Resident.value)},a.formSubmit=function(){var d={Code:b.Code};return 0===a.fieldsList[0].value?void f.autoclose("居民身份不能为空!"):(d=$.extend(!0,d,h.getFormData(a.fieldsList)),void m(c,a,d,b))}}],className:"ngdialog-theme-default",closeByDocument:!1,width:600})})}}],className:"ngdialog-theme-default",closeByDocument:!1,width:600})})},a.editItem=function(b){var c=a.fetchData,e=a.fieldsList;h.bindFormData(b,e),d.openConfirm({template:"createOne",controller:["$scope",function(a){a.TitleText="修改自治角色",a.fetchData=c,a.fieldsList=e,a.formSubmit=function(){h.formSubmit(a,!1,a.fieldsList,g.upAutonomyrole,b)}}],className:"ngdialog-theme-default",closeByDocument:!1,width:600})}}]);