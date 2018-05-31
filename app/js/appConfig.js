/*var apiAdds0 = "http://192.168.1.101:8012/api/";
var apiAdds1 = "http://192.168.1.101:8014/api/";
var apiAdds2 = "http://192.168.1.101:8022/api/";
var apiAdds3 = "http://192.168.1.101:8016/api/";
var apiAdds4 = "http://192.168.1.101:8018/api/";
var apiAdds5 = "http://192.168.1.101:8019/api/";
var apiAdds6 = "http://192.168.1.101:8006/api/";
var apiAdds7 = "http://192.168.1.101:8024/api/";
var apiAdds8 = "http://192.168.1.101:8023/api/";
var apiAdds9 = "http://192.168.1.101:8025/api/";
var apiAddsa = "http://192.168.1.101:8028/api/";
var apiAddsb = "http://192.168.1.101:8021/api/";
var apiAddsc = "http://192.168.1.101:8031/api/";
var apiAddsd = "http://192.168.1.101:8031/api/";
*/

/*var mBaseUrl = "http://192.168.1.101:8030/api/gw/";
var rBaseUrl = "http://192.168.1.101:8030/res/gw/";
var iBaseUrl = "http://192.168.1.101:8030/ric/gw/";*/

var mBaseUrl = "http://192.168.1.249:91/api/gw/";
var rBaseUrl = "http://192.168.1.249:91/res/gw/";
var iBaseUrl = "http://192.168.1.249:91/ric/gw/";
var getNewUrl = function(_string) {
	return mBaseUrl + "api/" + _string + "/api/";
};
var getRicUrl = function(_string) {
	return iBaseUrl + "ric/" + _string + "/";
};
var retNewUrl = function(_string) {
	return rBaseUrl + "res/" + _string + "/";
};
var apiAdds0 = getNewUrl("foundation");
var apiAdds1 = getNewUrl("organization");
var apiAdds3 = getNewUrl("information");
var apiAdds4 = getNewUrl("point");
var apiAdds5 = getNewUrl("democratic");
var apiAdds6 = getNewUrl("member");
var apiAdds7 = getNewUrl("event");
var apiAdds8 = getNewUrl("work");
var apiAdds9 = getNewUrl("formdatacenter");
var apiAddsa = getNewUrl("statistics");
var apiAddsb = retNewUrl("media");
var apiAddsc = getNewUrl("coterie");
var apiAddsd = getNewUrl("advertisement");
var apiAddsf = getNewUrl("finances");
var apiAddsg = getNewUrl("construction");
var apiAddsh = getNewUrl("pointmall");
var apiAddsi = getNewUrl("newpoint");
var apiAddsj = getNewUrl("finances");
var apiAddsk = getRicUrl("media");
App.constant("serverUrls", {

	//默认头像（男女）
	picMen: rBaseUrl + "res/foundation/api/foundation/download?fileUrl=/files/nan.png",
	picWomen: rBaseUrl + "res/foundation/api/foundation/download?fileUrl=/files/nv.png",
	//消息发送
	//sendSms: apiAdds10 + "message/sendsms", //消息发送系统
	//基础资源库
	apiImages: apiAdds0 + "foundation/apiimages", //新增居民头像
	veriFicationcode: apiAdds0 + "foundation/verificationcode", //找回密码step1
	forgotPassword: apiAdds0 + "foundation/forgotpassword", //找回密码step2
	getAll: apiAdds0 + "foundation/getall", //根据Id获取下一级信息
	courtyardList: apiAdds0 + "foundation/courtyardlist", //获取院落列表(表格)
	buildingList: apiAdds0 + "foundation/buildinglist", //获取楼栋列表(表格)
	unitList: apiAdds0 + "foundation/unitlist", //获取单元列表(表格)
	houseList: apiAdds0 + "foundation/houselist", //获取单元列表(表格)
	courtyardAll: apiAdds0 + "foundation/courtyardall", //获取院落列表(下拉选项)
	buildingAll: apiAdds0 + "foundation/all", //获取楼栋,单元，楼层列表(下拉选项)
	unitHouseList: apiAdds0 + "foundation/unithouseList", //根据单元ID获取房屋列表（下拉选项）
	whetherState: apiAdds0 + "foundation/whetherstate", //院落启用停用
	inCourtyard: apiAdds0 + "foundation/incourtyard", //新增院落
	inItialization: apiAdds0 + "foundation/initialization", //新增楼栋
	inUnit: apiAdds0 + "foundation/addunit", //新增单元
	inHouse: apiAdds0 + "foundation/addhouse", //新增房屋
	upHouse: apiAdds0 + "foundation/uphouse", //修改房屋信息
	upcourtyard: apiAdds0 + "foundation/upcourtyard", //更新院落
	deBuilding: apiAdds0 + "foundation/debuilding", //删除楼栋
	deUnit: apiAdds0 + "foundation/deunit", //删除单元
	deHouse: apiAdds0 + "foundation/dehouse", //删除房屋
	residentList: apiAdds0 + "foundation/residentlist", //居民信息列表
	residentLogin: apiAdds0 + "foundation/login", //居民登录
	addResident: apiAdds0 + "foundation/addresident", //新增居民信息(Population:1流动/2常驻人口新增)
	upResident: apiAdds0 + "foundation/upresident", //编辑修改居民信息
	experienceDetails: apiAdds0 + "foundation/experiencedetails", //根据居民Id获取教育工作信息
	getresident: apiAdds0 + "foundation/getresident", //根据居民Id获取教育工作信息
	upExperience: apiAdds0 + "foundation/upexperience", //更新教育工作经历信息
	inExperience: apiAdds0 + "foundation/inexperience", //新增教育工作经历信息
	vehiclelist: apiAdds0 + "foundation/vehiclelist", //车辆管理列表
	addVehicle: apiAdds0 + "foundation/addvehicle", //新增车辆
	upVehicle: apiAdds0 + "foundation/upvehicle", //修改车辆,
	vehicleState: apiAdds0 + "foundation/vehiclestate", //
	courtyardAllList: apiAdds0 + "foundation/alllist", //院落列表树形结构
	houseResident: apiAdds0 + "foundation/houseresident", //根据房屋id获取居民列表,
	getSuperior: apiAdds0 + "foundation/getlist", //根据房屋Id获取父级信息
	getIdcardno: apiAdds0 + "foundation/getidcardno", //根据居民Id获取居民信息
	getresidentdatelis: apiAdds0 + "foundation/getdatelis", //根据居民身份证Id获取居民信息
	searchList: apiAdds0 + "foundation/searchlist", //搜索居民列表
	//驻区企业管理
	enterpriseList: apiAdds0 + "foundation/enterpriselist", //驻区企业列表
	addEnterprise: apiAdds0 + "foundation/addenterprise", //新增企业
	negotiationList: apiAdds0 + "foundation/negotiationlist", //搜索协商组成员
	allOcation: apiAdds0 + "foundation/allocation", //分配居民Id
	//社区管理
	keypopulationList: apiAdds0 + "foundation/keypopulationlist", //重点人群列表
	addKeypopulation: apiAdds0 + "foundation/upkeypopulation", //新增修改重点人群
	populationlist: apiAdds0 + "foundation/populationlist", //流动/常住人口列表
	getDate: apiAdds0 + "foundation/getdate", //根据位置信息Id获取信息
	//组织管理
	loginFlag: apiAdds1 + "organization/loginflag", //判断登录账号是否为员工
	upAutonomyrole: apiAdds1 + "organization/upautonomyrole", //修改角色
	inAutonomyrole: apiAdds1 + "organization/inautonomyrole", //新增角色
	deleteRole: apiAdds1 + "organization/deleterole", //删除角色
	autoNomyrolelist: apiAdds1 + "organization/autonomyrolelist", //自治组织角色列表
	organizationLogin: apiAdds1 + "organization/login", //组织管理登录
	organizationList: apiAdds1 + "organization/organizationlist", //组织列表
	addOrganization: apiAdds1 + "organization/addorganization", //新增组织
	editupOrganization: apiAdds1 + "organization/uporganization", //修改组织
	organizationState: apiAdds1 + "organization/organizationstate", //启用，停用
	personnelList: apiAdds1 + "organization/personnellist", //人员列表
	positionList: apiAdds1 + "organization/positionlist", //岗位列表,
	addPosition: apiAdds1 + "organization/addposition", //新增岗位
	upPosition: apiAdds1 + "organization/upposition", //修改岗位
	positionState: apiAdds1 + "organization/positionstate", //岗位启用，停用
	organizationAll: apiAdds1 + "organization/organizationall", //获取组织列表（下拉列表用）
	gridList: apiAdds1 + "organization/gridlist", //获取区域列表
	inGrid: apiAdds1 + "organization/ingrid", //新增自治单元
	upGrid: apiAdds1 + "organization/upgrid", //修改自治单元
	deGrid: apiAdds1 + "organization/degrid", //删除自治单元
	griderAll: apiAdds1 + "organization/griderall", //获取所有区域管理员
	gridGangelist: apiAdds1 + "organization/gridgangelist", //获取区域范围
	inGridrange: apiAdds1 + "organization/ingridrange", //增加区域范围
	deGridgange: apiAdds1 + "organization/degridgange", //删除区域范围
	addGridrange: apiAdds1 + "organization/addgridrange", //增加户
	//员工管理
	personnelList: apiAdds1 + "organization/personnellist", //员工管理列表
	addPersonnel: apiAdds1 + "organization/addpersonnel", //新增员工
	upPersonnel: apiAdds1 + "organization/uppersonnel", //修改员工
	personnelState: apiAdds1 + "organization/personnelstate", //员工管理启用，停用
	positionAll: apiAdds1 + "organization/positionall", //获取所有岗位列表（下拉列表用）
	workinggtrajectoryList: apiAdds1 + "organization/workingtrajectorylist", //员工获取工作轨迹

	//设备管理
	equipmentList: apiAdds6 + "equipment/equipmentlist", //设备管理列表
	addEquipment: apiAdds6 + "equipment/addequipment", //新增设备
	equipmentrecordList: apiAdds6 + "equipment/equipmentrecordlist", // 分页获取设备领取/归还记录
	addequipmentrecord: apiAdds6 + "equipment/addequipmentrecord", //领取、归还设备
	equipmentall: apiAdds6 + "equipment/equipmentall", //新增领取设备
	// addPersonnel: apiAdds1 + "organization/addpersonnel", //新增员工
	// upPersonnel: apiAdds1 + "organization/uppersonnel", //修改员工
	// personnelState: apiAdds1 + "organization/personnelstate", //员工管理启用，停用
	// positionAll: apiAdds1 + "organization/positionall", //获取所有岗位列表（下拉列表用）
	// workinggtrajectoryList: apiAdds1 + "organization/workingtrajectorylist", //员工获取工作轨迹
	//社团管理
	societyList: apiAdds1 + "organization/societylist", //社团管理列表,
	addSociety: apiAdds1 + "organization/addsociety", //新增社团
	upSociety: apiAdds1 + "organization/upsociety", //修改社团
	societyState: apiAdds1 + "organization/societystate", //启用，停用社团
	allOcationf: apiAdds1 + "organization/allocation", //分配员工账号
	//自治组织
	associationList: apiAdds1 + "organization/associationlist", //自治组织列表

	associationState: apiAdds1 + "organization/associationstate", //启用停用
	inAssociation: apiAdds1 + "organization/inassociation", //新增自治组织管理
	upAssociation: apiAdds1 + "organization/upassociation", //修改自治组织管理
	Associationall: apiAdds1 + "organization/associationall", //自治组织上级组织列表
	staffList: apiAdds1 + "organization/stafflist", //自治组织成员管理
	inStaff: apiAdds1 + "organization/instaff", //新增自治组织成员
	upStaff: apiAdds1 + "organization/upstaff", //修改自治组织成员
	deStaff: apiAdds1 + "organization/destaff", //删除自治组织成员
	//新闻公告
	isdelete: apiAdds3 + "information/isdelete", //删除恢复新闻
	channeltypeAll: apiAdds3 + "information/channeltypeall", //获取所有发布渠道
	informationDetail: apiAdds3 + "information/information", //新闻详情
	Visitlist: apiAdds3 + "information/visitlist", //活动报表详情
	upIstop: apiAdds3 + "information/upistop", //置顶
	inOpenstate: apiAdds3 + "information/inopenstate", //开启关闭新闻
	informationList: apiAdds3 + "information/information/list", //新闻公告列表
	informationTypeList: apiAdds3 + "information/category/all", //获取新闻类型列表（下拉列表用）
	informationCategory: apiAdds3 + "information/category/list", //分页获取新闻分类（列表）
	reviewstateInformation: apiAdds3 + "information/reviewstate", //审核
	addInformation: apiAdds3 + "information/addinformation", //新增
	addCategory: apiAdds3 + "information/category", //新增新闻分类
	upInformation: apiAdds3 + "information/upinformation", //修改新闻
	inCategory: apiAdds3 + "information/category", //新增新闻公告类型
	channelTypelist: apiAdds3 + "information/channeltypelist", //新闻渠道列表
	inChanneltype: apiAdds3 + "information/inchanneltype", //新增新闻发布渠道
	upChanneltype: apiAdds3 + "information/upChanneltype", //修改新闻发布渠道
	channelTypestate: apiAdds3 + "information/channeltypestate", //起停用发布渠道
	informationById: apiAdds3 + "information/information", //根据id
	upinformationNews: apiAdds3 + "information/upinformation", //更新资讯
	// 咨询公告管理-分类设置
	categorychildren: apiAdds3 + "information/category/children", //分类设置总数据
	updatename: apiAdds3 + "information/category", //分类设置重命名
	//社区新闻设置
	introductionList: apiAdds3 + "information/introductionlist", //获取社区介绍
	upIntroduction: apiAdds3 + "information/upintroduction", //更新社区介绍
	GetGuide: apiAdds3 + "information/GetGuide", //获取办事指南
	upGuide: apiAdds3 + "information/upguide", //更新办事指南
	tieredServicelist: apiAdds3 + "information/tieredservicelist", //获取网格服务
	upTieredservice: apiAdds3 + "information/uptieredservice", //更新网格服务
	organizationPhoneList: apiAdds3 + "information/organizationlist", //获取机构电话
	upOrganization: apiAdds3 + "information/uporganization", //修改机构电话
	reservationList: apiAdds3 + "information/reservationlist", //获取预约（分页）
	opinionList: apiAdds3 + "information/opinionlist", //意见建议（分页）

	templateManageList: apiAdds3 + "information/worktype/children", //模板列表（全部）
	templateManageLists: apiAdds3 + "information/worktypeall", //模板列表（全部）
	templateManageListAll: apiAdds3 + "information/worktypelist", //模板列表（全部/部分层级）
	templateManageListChildAll: apiAdds3 + "information/worktype/childrenall", //最后子集（全部）
	templateChildrenlist: apiAdds3 + "information/worktype/childrenlist", //模板列表分页
	inTemplateManage: apiAdds3 + "information/inworktype", //新增模板
	upTemplateManage: apiAdds3 + "information/upworktype", //修改模板
	toggleTemplateManage: apiAdds3 + "information/open", //启用停用模板
	deleteTemplateManage: apiAdds3 + "information/deleteworktype", //删除模板

	toDoContentList: apiAdds3 + "information/contentlist", //内容列表分页
	inworkContent: apiAdds3 + "information/inworkcontent", //新增内容
	upworkContent: apiAdds3 + "information/upworkcontent", //修改内容
	deContent: apiAdds3 + "information/decontent", //删除内容
	contentReview: apiAdds3 + "information/contentreview", //审核内容(3:通过，4:不通过)
	contentOpen: apiAdds3 + "information/contentopen", //启用/停用内容
	istopContent: apiAdds3 + "information/istop", //置顶内容
	issubmitContent: apiAdds3 + "information/issubmit", //提交撤回(1:提交，2:撤回)
	getWorkCotent: apiAdds3 + "information/getworkcotent", //根据Id获取办事内容详情

	//居民积分
	getUserpointList: apiAdds4 + "apipoint/m/getuserpointlist", //居民积分列表
	changePoint: apiAdds4 + "apipoint/m/changepoint", //调整积分
	getPointrecordbymemberid: apiAdds4 + "apipoint/m/getpointrecordbymemberid", //积分明细
	getEventlist: apiAdds4 + "apipoint/m/geteventlist", //获取积分事件列表
	getPointtypelist: apiAdds4 + "apipoint/m/getpointtypelist", //积分类型
	getPointrule: apiAddsi + "pt/pointrule", //获取积分规则
	upPointrule: apiAddsi + "pt/pointrule", //修改积分规则

	pointsummaryList: apiAddsi + "pt/pointsummary/list", //居民积分列表
	addPointadjustment: apiAddsi + "pt/pointadjustment", //手动增加减少用户积分
	pointreocrdhistoryList: apiAddsi + "pt/pointreocrdhistory/list", //积分明细

	pointsourceclassify: apiAddsi + "pt/pointsourceclassify/list", //分页获取积分来源
	addpointsourceclassify: apiAddsi + "pt/pointsourceclassify", //积分来源新增 删除
	classifiedexchangelist: apiAddsi + "pt/classifiedexchange/list", //分页获取积分兑换
	addclassifiedexchange: apiAddsi + "pt/classifiedexchange", //新增 修改获取积分兑换

	totalpoints: apiAddsi + "pt/totalpoints", //首页发放积分
	homePt: apiAddsi + "pt/statistic/pt", //首页积分发放与使用统计

	pointsourceclassify: apiAddsi + "pt/pointsourceclassify/list", //分页获取积分来源
	addpointsourceclassify: apiAddsi + "pt/pointsourceclassify", //积分来源新增 删除
	classifiedexchangelist: apiAddsi + "pt/classifiedexchange/list", //分页获取积分兑换
	addclassifiedexchange: apiAddsi + "pt/classifiedexchange", //新增 修改 删除 启用获取积分兑换
	psclassifierpslist: apiAddsi + "pt/psclassifierps/list", //分页获取配置积分来源
	pointsourceclassifier: apiAddsi + "pt/pointsourceclassifier", //配置积分来源 添加 取消

	//民主协商
	transacationList: apiAdds5 + "transacation/democratictransaction/list", //民主协商列表
	demoCratictransaction: apiAdds5 + "transacation/democratictransaction", //更新民主协商
	negotiationGroupsbydpid: apiAdds5 + "group/negotiationgroupsbydpid", //根据协商议题Id获取协商组
	negotiationGroupmembersbygid: apiAdds5 + "group/negotiationgroupmembersbygid", //根据协商组Id获取协商组成员
	demoCratictransactionbymid: apiAdds5 + "transacation/democratictransactionbymid", //获取民主协商议题

	//权限管理
	getRole: apiAdds6 + "menubar/getrole", //获取用户下的角色列表
	getAllRole: apiAdds6 + "menubar/all", //获取(所有)角色列表
	addRole: apiAdds6 + "menubar/inrole", //新增(所有)角色
	upRole: apiAdds6 + "menubar/uprole", //修改(所有)角色
	userList: apiAdds6 + "menubar/getuserlist", //获取所有用户列表
	menuList: apiAdds6 + "menubar/menulist", //获取(所有)菜单列表
	getMenulist: apiAdds6 + "menubar/getmenulist", //分页获取(所有)菜单
	inStreetmenu: apiAdds6 + "menubar/instreetmenu", //新增(所有)菜单
	upStreetmenu: apiAdds6 + "menubar/upstreetmenu", //修改(所有)菜单
	getRolemenu: apiAdds6 + "menubar/getrolemenu", //获取当前角色下的菜单
	userrolelist: apiAdds6 + "menubar/userrolelist", //获取当前用户下的角色列表,
	inUserrole: apiAdds6 + "menubar/inuserrole", //新增用户角色
	deUserrole: apiAdds6 + "menubar/deuserrole", //删除用户角色
	getRolemenu: apiAdds6 + "menubar/getrolemenu", //获取当前角色下拥有的菜单
	operationList: apiAdds6 + "menubar/operationlist", //获取菜单所有权限
	menuRolelist: apiAdds6 + "menubar/menurolelist", //获取所有菜单项及权限
	inStreetmenurole: apiAdds6 + "menubar/instreetmenurole", //配置(新增)角色菜单及权限
	upStreetmenurole: apiAdds6 + "menubar/upstreetmenurole", //配置(修改)角色菜单及权限
	deStreetmenurole: apiAdds6 + "menubar/destreetmenurole", //配置(删除)角色菜单及权限
	newMenurolelist: apiAdds6 + "menubar/newmenurolelist", //根据角色Code获取当前角色菜单及权限
	versionList: apiAdds6 + "project/versionlist", //获取版本号列表
	updateVersion: apiAdds6 + "project/updateversion", //修改版本号
	addVersion: apiAdds6 + "project/addversion", //新增版本号
	deviceTypelist: apiAdds6 + "project/devicetypelist", //版本类型列表
	adddEvictype: apiAdds6 + "project/adddevictype", //新增app类型
	updEvictype: apiAdds6 + "project/updevictype", //修改app类型
	//事项模板
	eventInspectorlist: apiAdds7 + "event/eventinspector/list", //事项模板列表
	eventInspector: apiAdds7 + "event/eventinspector", //修改事项模板
	eventCategorylist: apiAdds7 + "event/eventcategory/list", //获取事件类型
	eventCategory: apiAdds7 + "event/eventcategory", //事件类型增加，修改，删除
	inEventinspector: apiAdds7 + "event/eventinspector", //新增事件模板定义
	upEventinspector: apiAdds7 + "event/eventinspector", //修改事件模板定义
	eventownerList: apiAdds7 + "event/eventowner/list", //分页获取事件拥有者
	eventfeedbackList: apiAdds7 + "event/eventfeedback/list", //分页获取信息上报事件列表
	eventpointmodifyList: apiAdds7 + "event/eventpointmodify/list", //分页获取积分改变事件列表
	eventPointmodify: apiAdds7 + "event/eventpointmodify", //新增积分更改事件
	inEventfeedback: apiAdds7 + "event/eventfeedback", //新增上报事件
	eventByworkflowerid: apiAdds7 + "event/eventbyworkflowerid", //根据工作流定义Id和工作流实例Id获取信息上报事件
	eventFeedbackinspectorList: apiAdds7 + "event/eventfeedbackinspector/list", //信息上报模板列表
	eventFeedbackinspector: apiAdds7 + "event/eventfeedbackinspector", //信息上报模板(新增。修改)
	eventownerList: apiAdds7 + "event/eventowner/list", //拥有者列表
	eventownertypeList: apiAdds7 + "event/eventownertype/list", //拥有者类型列表
	inEventowner: apiAdds7 + "event/eventowner", //(新增，删除，修改)事件拥有者
	eventownerType: apiAdds7 + "event/eventownertype", //(新增，删除，修改)拥有者类型
	ewSelector: apiAdds7 + "event/ewselector", //立项处理
	ewSelectorlist: apiAdds7 + "event/ewselector/list", //立项处理列表
	eventFeedbackcount: apiAdds7 + "event/eventfeedbackcount", //信息上报数量
	//工作流
	extraRolemembersbynodeid: apiAdds8 + "ermember/extrarolemembersbynodeid", //根据节点Id获取角色
	workFlowerprogress: apiAdds8 + "workflow/workflowerprogress", //进度查询
	workFlowgrouplist: apiAdds8 + "group/workflowgroup/list", //工作流工作组列表
	workflowList: apiAdds8 + "workflow/workflow/list", //工作流模板列表
	upWorkflow: apiAdds8 + "workflow/workflow", //更新工作流模板
	inWorkflow: apiAdds8 + "workflow/workflow", //新增工作流模板
	workFlowsteplist: apiAdds8 + "workflow/workflowstep/list", //工作流步骤列表
	workFlowstepsbyworkflowid: apiAdds8 + "workflow/workflowstepsbyworkflowid", //根据工作流模板Id获取工作流步骤列表
	workFlowstep: apiAdds8 + "workflow/workflowstep", //新增工作流步骤(新增和编辑)
	workflowNode: apiAdds8 + "workflow/workflownode/list", //根据工作流模板Id获取节点列表
	workFlownode: apiAdds8 + "workflow/workflownode", //工作流节点(新增和修改)
	getWorkbynodeid: apiAdds8 + "work/getworkbynodeid", //根据节点Id获取工作流工作
	workPointmodify: apiAdds8 + "work/workpointmodify", //积分修改工作定义(新增和修改)
	workUploadform: apiAdds8 + "work/workuploadform", //表单上传工作定义(新增和修改)
	workAudit: apiAdds8 + "work/workaudit", //表单审核工作定义(新增和修改)
	workBlank: apiAdds8 + "work/workblank", //空白空座定义(新增，修改)
	workDemocraticproject: apiAdds8 + "work/workdemocraticproject", //民主协商工作定义(新增和修改)
	workVerify: apiAdds8 + "work/workverify", //核实工作定义(新增和修改)
	workStorage: apiAdds8 + "work/workstorage", //入库工作定义(新增和修改)
	workFlowersbyids: apiAdds8 + "workflow/workflowersbyids", //根据IDS获取工作流实例
	steppersByworkflowid: apiAdds8 + "workflow/steppersbyworkflowid", //根据工作流Id获取工作流步骤实例
	workflowNodersbystepid: apiAdds8 + "workflow/workflownodersbystepid", //根据工作流步骤Id获取工作流节点实例
	getworkerBynoderid: apiAdds8 + "work/getworkerbynoderid", //根据工作流节点Id获取工作流实例工作实例
	myWorkers: apiAdds8 + "work/myworkers", //待办事项列表
	allWorkers: apiAdds8 + "work/allworkers", //获取所有待办事项
	myWorkershistory: apiAdds8 + "work/myworkershistory", //历史事项列表
	workflowerBynode: apiAdds8 + "workflow/workflowerbynoder", //根据工作流节点实例Id获取工作流实例
	workerDemocraticproject: apiAdds8 + "work/workerdemocraticproject", //更新民主协商监听者
	workerAudit: apiAdds8 + "work/workeraudit", //完成审核工作
	workerVerify: apiAdds8 + "work/workerverify", //完成核实工作
	finisherVerification: apiAdds8 + "er/finisherverification", //完成核实操作
	workerStorage: apiAdds8 + "work/workerstorage", //完成入库工作
	workFlowgroups: apiAdds8 + "group/workflowgroup/list", //工作组管理列表
	upWorkflowgroup: apiAdds8 + "group/workflowgroup", //修改，新增工作组
	deleteWorkflowgroup: apiAdds8 + "group/workflowgroup", //删除工作组
	workflowGroupmembersbygid: apiAdds8 + "group/workflowgroupmembersbygid", //根据iD获取工作组成员
	inWorkflowgroupmember: apiAdds8 + "group/workflowgroupmember", //新增小组成员
	deleteWorkflowgroupmember: apiAdds8 + "group/workflowgroupmember", //删除小组成员
	pointruleList: apiAdds8 + "pointrule/pointrule/list", //积分规则列表
	pointRule: apiAdds8 + "pointrule/pointrule", //新增、修改、删除积分规则
	workBindableproperties: apiAdds8 + "work/workbindableproperties", //积分规则可绑定的属性名称，属性值
	nextNoders: apiAdds8 + "workflow/nextnoders", //获取当前节点可选下一节点
	workerBlank: apiAdds8 + "work/workerblank", //完成工作者工作
	erByworkerid: apiAdds8 + "er/erbyworkerid", //获取外部资源
	erResourcebyworkerid: apiAdds8 + "er/erresourcebyworkerid", //获取外部可用资源
	finishersFillform: apiAdds8 + "er/finishersfillform", //完成表单填写工作
	finisherStorage: apiAdds8 + "er/finisherstorage", //完成入库操作
	finisherDponline: apiAdds8 + "er/finisherdponline", //完成线上民主协商
	photoAlbum: apiAdds8 + "photo/photoalbum/list", //线下民主协商相册
	dophotoalbum: apiAdds8 + "photo/photoalbum", //新增相册
	photoitemList: apiAdds8 + "photo/photoitem/list", //获取相册下的照片列表
	photoItem: apiAdds8 + "photo/photoitem", //新增，删除照片
	erDemoprojectonline: apiAdds8 + "er/erdemoprojectonline", //更新线上民主协商
	erDemoprojectoffline: apiAdds8 + "er/erdemoprojectoffline", //获取线下民主协商
	allWorkerscount: apiAdds8 + "work/allworkerscount", //待办事项长度
	erResourcebyworkerid: apiAdds8 + "er/erresourcebyworkerid", //获取外部资源可选择资源
	erFillform: apiAdds8 + "er/erfillform", //更新表单填写
	finisherDpoffline: apiAdds8 + "er/finisherdpoffline", //完成线下民主协商项目
	erstorage: apiAdds8 + "er/erstorage", //更新入库

	//首页数据填充
	pointStatistics: apiAddsa + "statistics/pointstatistics", //首页获取当前年月的积分消耗echart图表
	obtainPoint: apiAddsa + "statistics/obtainpoint", //获取首页积分发放数
	sumResident: apiAddsa + "statistics/sumresident", //获取首页居民总数
	sumMatter: apiAddsa + "statistics/summatter", //获取首页事项总条数
	disposeMatter: apiAddsa + "statistics/disposematter", //上报事项处理率
	weatherUrl: apiAddsa + "statistics/weather",
	DeleteMemberById: apiAddsc + "apicoteriemember/DeleteMemberById", //删除管理员
	//圈子管理
	apicoteriegetlistbypage: apiAddsc + "apicoterie/getlistbypage", //分页获取圈子列表
	getmember: apiAddsc + "apicoteriemember/getmember", //根据圈子自增的id查询圈子成员
	GetCoterieDynamicList: apiAddsc + "apiCoterieDynamic/GetCoterieDynamicList", //分页获取圈子动态列表
	GetCoterieActivityListByCoterieId: apiAddsc + "ApiCoterieActivity/GetCoterieActivityListByCoterieId", //根据圈子id分页获取圈子活动
	GetCoterieAlbumListByCoterieId: apiAddsc + "CoterieAlbum/GetCoterieAlbumListByCoterieId", //分页获取相册
	coteriehistory: apiAddsc + "CoterieHistory/coteriehistory/list", //分页获取邻里圈发展史
	changecoteriestate: apiAddsc + "apicoterie/changecoteriestate", //改变圈子数据状态
	GetActivityMemberListByActivityId: apiAddsc + "/ApiCoterieActivity/GetActivityMemberListByActivityId", //通过活动id分页获取活动参与人员
	GetCoterieAffairList: apiAddsc + "CoterieAffair/GetCoterieAffairList", //通过圈子Id分页获取圈子议事
	GetAlbumImageListByAlbumId: apiAddsc + "CoterieAlbum/GetAlbumImageListByAlbumId", //通过相册id获取相册图片
	GetDynamicCommentListByDynamicId: apiAddsc + "apiCoterieDynamic/GetDynamicCommentListByDynamicId", //分页获取圈子动态的评论
	GetDynamicMessageListByDynamicId: apiAddsc + "apiCoterieDynamic/GetDynamicMessageListByDynamicId", //分页获取圈子动态留言
	GetAffairVotingList: apiAddsc + "CoterieAffair/GetAffairVotingList", //通过议事id分页获取投票结果
	addcoterie: apiAddsc + "apicoterie/addcoterie", //新增圈子
	updatecoterie: apiAddsc + "apicoterie/updatecoterie", //修改圈子
	GetFamilyCoterie: apiAddsc + "FamilyCoterie/GetFamilyCoterieByPage", //分页查询家庭圈
	GetFamilyCoterieById: apiAddsc + "FamilyCoterie/GetFamilyCoterieById", //家庭圈详情
	GetFamilyCotereHistoryByPage: apiAddsc + "FamilyCoterie/GetFamilyCotereHistoryByPage", //分页获取家庭动态
	ChangeFamilyCotereiState: apiAddsc + "FamilyCoterie/ChangeFamilyCotereiState", //改变家庭圈状态
	GetMemberNoOwner: apiAddsc + "apicoteriemember/GetMemberNoOwner", //查询圈子非圈主成员
	DeleteManagerById: apiAddsc + "apicoteriemember/DeleteManagerById", //删除管理员
	CoterieChange: apiAddsc + "apicoterie/CoterieChange", //圈子转让
	getbyid: apiAddsc + "apicoterie/getbyid", //根据id获取单挑圈子

	//基金和慈善管理
	DeleteFundUseById: apiAddsf + "ApiFundUse/DeleteFundUseById", //通过id删除基金使用
	GetListByType: apiAddsf + "ApiCategorye/GetListByType", //通过分类查询类型列表
	AddFund: apiAddsf + "ApiFund/AddFund", //新增基金;
	ApiFundGetListByPage: apiAddsf + "ApiFund/GetListByPage", //分页查询基金列表
	DeleteFundById: apiAddsf + "ApiFund/DeleteFundById", //通过id删除基金
	UpdateFund: apiAddsf + "ApiFund/UpdateFund", //修改基金
	GetListByPageUse: apiAddsf + "ApiFundUse/GetListByPage", //分页查询基金使用列表
	GetListByPageAblance: apiAddsf + "ApiFundBalance/GetListByPage", //分页查询基金剩余列表
	GetListByFundId: apiAddsf + "ApiFundBalance/GetListByFundId", //通过基金Id查询使用详情
	GetFundById: apiAddsf + "ApiFund/GetById", //修改的时候，通过id查询数据
	GetList: apiAddsf + "ApiCategorye/GetList", //基金和慈善管理分类设置初始化
	AddCategory: apiAddsf + "ApiCategorye/AddCategory", //基金和慈善管理分类设置增加
	DeleteCategoryById: apiAddsf + "ApiCategorye/DeleteCategoryById", //基金和慈善管理分类设置删除
	UpdateCategory: apiAddsf + "ApiCategorye/UpdateCategory", //基金和慈善管理分类设置修改
	AddCharity: apiAddsf + "ApiCharity/AddCharity", //慈善管理新增
	CharGetListByPage: apiAddsf + "ApiCharity/GetListByPage", //慈善资金管理分页
	DeleteCharityById: apiAddsf + "ApiCharity/DeleteCharityById", //慈善资金管理删除
	GetByCharId: apiAddsf + "ApiCharity/GetById", //慈善资金查询
	UpdateCharity: apiAddsf + "ApiCharity/UpdateCharity", //慈善修改
	GetListCharUseByPage: apiAddsf + "ApiCharityUse/GetListByPage", //慈善使用分页
	GetByCharityUseId: apiAddsf + "ApiCharityUse/GetByCharityUseId", //慈善使用查看明细
	GetListByPageBalance: apiAddsf + "ApiCharityBalance/GetListByPage", //慈善余存分页
	GetListByBalanceFundId: apiAddsf + "ApiCharityBalance/GetListByFundId", //慈善余存查看明细
	UpdateFundUse: apiAddsf + "ApiFundUse/UpdateFundUse", //修改基金使用
	AddFundUse: apiAddsf + "ApiFundUse/AddFundUse", //新增基金使用
	GetListByType: apiAddsf + "ApiCategorye/GetListByType", //通过分类查询类型列表
	GetListByName: apiAddsf + "ApiFund/GetListByName", //新增基金使用弹框 下拉框基金
	AddFund: apiAddsf + "ApiFund/AddFund", //新增基金;
	GetListByPage: apiAddsf + "ApiFund/GetListByPage", //分页查询基金列表
	DeleteFundById: apiAddsf + "ApiFund/DeleteFundById", //通过id删除基金
	UpdateFund: apiAddsf + "ApiFund/UpdateFund", //修改基金
	GetListByPageUse: apiAddsf + "ApiFundUse/GetListByPage", //分页查询基金使用列表
	GetListByPageAblance: apiAddsf + "ApiFundBalance/GetListByPage", //分页查询基金剩余列表
	GetListByFundId: apiAddsf + "ApiFundBalance/GetListByFundId", //通过基金Id查询使用详情
	GetFundById: apiAddsf + "ApiFund/GetById", //修改的时候，通过id查询基金录入单条数据
	GetListByFundId: apiAddsf + "ApiFundBalance/GetListByFundId", //基金余存明细
	GetList: apiAddsf + "ApiCategorye/GetList", //基金和慈善管理分类设置初始化
	AddCategory: apiAddsf + "ApiCategorye/AddCategory", //基金和慈善管理分类设置增加
	DeleteCategoryById: apiAddsf + "ApiCategorye/DeleteCategoryById", //基金和慈善管理分类设置删除
	UpdateCategory: apiAddsf + "ApiCategorye/UpdateCategory", //基金和慈善管理分类设置修改

	AddCharity: apiAddsf + "ApiCharity/AddCharity", //慈善管理新增
	CharGetListByPage: apiAddsf + "ApiCharity/GetListByPage", //慈善资金管理分页
	DeleteCharityById: apiAddsf + "ApiCharity/DeleteCharityById", //慈善资金管理删除
	GetByCharId: apiAddsf + "ApiCharity/GetById", //慈善资金查询
	UpdateCharity: apiAddsf + "ApiCharity/UpdateCharity", //慈善修改
	GetListCharUseByPage: apiAddsf + "ApiCharityUse/GetListByPage", //慈善使用分页
	GetByCharityUseId: apiAddsf + "ApiCharityUse/GetByCharityUseId", //慈善使用查看明细
	GetListByPageBalance: apiAddsf + "ApiCharityBalance/GetListByPage", //慈善余存分页
	GetListByBalanceFundId: apiAddsf + "ApiCharityBalance/GetListByCharityId", //慈善余存查看明细
	GetListByNamechar: apiAddsf + "ApiCharity/GetListByName", //慈善名称模糊查询
	AddChatiryUse: apiAddsf + "ApiCharityUse/AddChatiryUse", //新增慈善使用
	DeleteCharityUseDetailById: apiAddsf + "ApiCharityUse/DeleteCharityUseDetailById", //删除慈善明细

	UpdateChatiryUseDetail: apiAddsf + "ApiCharityUse/UpdateChatiryUseDetail", //修改慈善明细
	AddChatiryUseDetail: apiAddsf + "ApiCharityUse/AddChatiryUseDetail", //添加慈善明细
	AddChatiryUseDetailBatch: apiAddsf + "ApiCharityUse/AddChatiryUseDetailBatch", //慈善明细批量添加

	AddCharity: apiAddsf + "ApiCharity/AddCharity", //慈善管理新增
	CharGetListByPage: apiAddsf + "ApiCharity/GetListByPage", //慈善资金管理分页
	DeleteCharityById: apiAddsf + "ApiCharity/DeleteCharityById", //慈善资金管理删除
	GetByCharId: apiAddsf + "ApiCharity/GetById", //慈善资金查询
	UpdateCharity: apiAddsf + "ApiCharity/UpdateCharity", //慈善修改
	GetListCharUseByPage: apiAddsf + "ApiCharityUse/GetListByPage", //慈善使用分页
	GetByCharityUseId: apiAddsf + "ApiCharityUse/GetByCharityUseId", //慈善使用查看明细
	GetListByPageBalance: apiAddsf + "ApiCharityBalance/GetListByPage", //慈善余存分页
	GetListByBalanceFundId: apiAddsf + "ApiCharityBalance/GetListByCharityId", //慈善余存查看明细
	GetListByNamechar: apiAddsf + "ApiCharity/GetListByName", //慈善名称模糊查询
	AddChatiryUse: apiAddsf + "ApiCharityUse/AddChatiryUse", //新增慈善使用
	DeleteCharityUseDetailById: apiAddsf + "ApiCharityUse/DeleteCharityUseDetailById", //删除慈善明细

	//表单上传
	inFloatingpopulation: apiAdds9 + "formdatacenter/infloatingpopulation", //流动人口表单上报(新增)
	upFloatingpopulation: apiAdds9 + "formdatacenter/upfloatingpopulation", //流动人口表单上报(修改)
	getFloating: apiAdds9 + "formdatacenter/getfloating", //流动人口详情
	inEnvironmental: apiAdds9 + "formdatacenter/inenvironmental", //环境卫生表单上报(新增)
	upEnvironmental: apiAdds9 + "formdatacenter/upenvironmental", //环境卫生表单上报(修改)
	inDispute: apiAdds9 + "formdatacenter/indispute ", //纠纷调解表单上报
	upDispute: apiAdds9 + "formdatacenter/updispute ", //纠纷调解表单上报
	inKeypopulation: apiAdds9 + "formdatacenter/inkeypopulation", //重点人群表单上报(新增)
	upKeypopulation: apiAdds9 + "formdatacenter/upkeypopulation", //重点人群表单上报(修改)
	getKeypopulation: apiAdds9 + "formdatacenter/getkeypopulation", //重点人群详情
	getDispute: apiAdds9 + "formdatacenter/getdispute", //纠纷调解详情
	getEnvironmental: apiAdds9 + "formdatacenter/getenvironmental", //环境卫生详情
	floatingList: apiAdds9 + "formdatacenter/floatinglist", //分页获取流动人口上报信息 
	getfinances: apiAdds9 + "formdatacenter/getfinances", //基金详情
	gethiddendanger: apiAdds9 + "formdatacenter/gethiddendanger", //基金详情
	//统计
	residentstatistic: apiAddsa + "statistics/residentstatistic", //基础资源库统计
	infostatistic: apiAddsa + "statistics/infostatistic", //信息上报统计
	housestatistic: apiAddsa + "statistics/housestatistic", //房屋信息统计
	vehiclestatistic: apiAddsa + "statistics/vehiclestatistic", //车辆信息统计
	//文件上传
	baseImageDir: apiAddsb + "mediafile/api/download?fileUrl=", //富文本编辑器相册基础路径
	fileUpload: apiAddsb + "mediafile/api/upload", //文件上传"http://192.168.1.101:8030/res/gw/" + "res/media/mediafile/api/upload" 
	richTextFileUpLoad: apiAddsk + "mediafile/richeditor/upload", //富文本编辑器图片上传"http://media.zhiqiang.qinglong.chenghua.chengdu.sichuan.t1.s01.dldjkj.com/mediafile/richeditor/upload", //
	richTextFilesManage: apiAddsk + "mediafile/richeditor/myalbum", //富文本编辑器获取我的相册
	//广告资讯
	adverList: apiAddsd + "advertisement/information/list", //广告列表
	categoryAll: apiAddsd + "advertisement/category/all", //获取所有广告分类
	addAdinformation: apiAddsd + "advertisement/addinformation", //新增广告
	adChanneltypeall: apiAddsd + "advertisement/channeltypeall", //发布渠道
	adContentDetail: apiAddsd + "advertisement/adcontent", //获取广告详情
	adReviewstate: apiAddsd + "advertisement/reviewstate", //审核
	adInopenstate: apiAddsd + "advertisement/inopenstate", //启用停用
	adIsdelete: apiAddsd + "advertisement/isdelete", //删除,恢复
	addinformation: apiAddsd + "advertisement/addinformation", //新增广告
	adcontentByid: apiAddsd + "advertisement/adcontent", //根据id获取广告
	upadcontent: apiAddsd + "advertisement/upadcontent", //更新广告
	advertisementChanneltypeall: apiAddsd + "advertisement/channeltypeall", //获取所有渠道信息

	//广告分类设置
	categoryChildrenAdvertisement: apiAddsd + "advertisement/category/children", //获取广告所有
	DeleteAdvertisement: apiAddsd + "advertisement/category", //删除广告

	//党建
	communistList: apiAddsg + "construction/communistlist", //党员列表
	upCommunist: apiAddsg + "construction/upcommunist", //注销党员
	partyorganizationall: apiAddsg + "construction/partyorganizationall", //获取所有的党组织
	partyorganizationpersonnellist: apiAddsg + "construction/partyorganizationpersonnellist", //获取党组织成员
	getpartyorganizationdetails: apiAddsg + "construction/getpartyorganizationdetails", //分页获取党组织成员
	partyorganizationdetails: apiAddsg + "construction/partyorganizationdetails", //根据党组织编号，获取详情
	partyisreview: apiAddsg + "construction/isreview", //党组咨询审核

	//党建2
	partyInformationlist: apiAddsg + "construction/informationlist", //分页获取党组织资讯
	partyorganizationlist: apiAddsg + "construction/partyorganizationlist", //分页获取党组织
	isopenstate: apiAddsg + "construction/isopenstate", //党组资讯开启和关闭
	partyIsdelete: apiAddsg + "construction/isdelete", //删除党组资讯
	istop: apiAddsg + "construction/istop", //置顶
	partyAddinformation: apiAddsg + "construction/addinformation", //新增党组资讯
	activitylist: apiAddsg + "construction/activitylist", //分页获取党组活动
	activityopenstate: apiAddsg + "construction/activityopenstate", //党组活动的开启和关闭
	activityregistration: apiAddsg + "construction/activityregistration", //获取参与党组活动参与人员
	councilchamberlist: apiAddsg + "construction/councilchamberlist", //分页获取议事厅列表
	votelist: apiAddsg + "construction/votelist", //分页获取议事厅投票
	councilchamberopenstate: apiAddsg + "construction/councilchamberopenstate", //议事厅的开启和关闭
	ispartystate: apiAddsg + "construction/ispartystate", //开启和关闭或者解散党组织
	uppartyorganization: apiAddsg + "construction/uppartyorganization", //修改党组织咨询
	communistall: apiAddsg + "construction/communistall", //获取所有党员
	addpartyorganization: apiAddsg + "construction/addpartyorganization", //新增党组织

	//总后台商家管理
	pointmallGetListByPage: apiAddsh + "pointmall/GetListByPage", //分页获取商家入驻登记
	GetOrderEvaluationGeneralViewList: apiAddsh + "pointmall/GetOrderEvaluationGeneralViewList", //总后台评价概览列表
	GetOrderEvaluationListByShopId: apiAddsh + "pointmall/GetOrderEvaluationListByShopId", //总后台评价详情列表
	GetLogoutListByPage: apiAddsh + "pointmall/GetLogoutListByPage", //分页获取商家注销登记
	ChangeStateById: apiAddsh + "pointmall/ChangeStateById", //商家注销
	couponlist: apiAddsh + "pointmall/couponlist", //分页获取优惠券
	ShopGetListByName: apiAddsh + "pointmall/GetListByName", //获取店铺名称
	shopcouponlist: apiAddsh + "pointmall/shopcouponlist", //获取商品概览分页
	isshelf: apiAddsh + "pointmall/isshelf", //上下架
	isreview: apiAddsh + "pointmall/isreview", //审核
	shopcouponorderlist: apiAddsh + "pointmall/shopcouponorderlist", //获取订单概览分页
	couponorderlist: apiAddsh + "pointmall/couponorderlist", //获取订单列表分页
	getcoupont: apiAddsh + "pointmall/getcoupont", //获取商品详情
	OrderEvaluationReview: apiAddsh + "pointmall/OrderEvaluationReview", //评价审核
	DeleteShopById: apiAddsh + "pointmall/DeleteShopById", //通过Id删除店铺
	ChangeStateById: apiAddsh + "pointmall/ChangeStateById", //改变店铺状态
	AddShop: apiAddsh + "pointmall/AddShop", //总后台店铺新增
	UpdateShop: apiAddsh + "pointmall/UpdateShop", //修改总后台店铺
	GetOrderEvaluationDetailsById: apiAddsh + "pointmall/GetOrderEvaluationDetailsById", //通过评价Id获取详情
	OrderEvaluationManageList: apiAddsh + "pointmall/OrderEvaluationManageList", //总后台评价管理列表
	GetOrderEvaluationDetailsById: apiAddsh + "pointmall/GetOrderEvaluationDetailsById", //通过评价Id获取评价详情

	// 商品分类 优惠券分类:
	getlistbyname: apiAddsh + "/pointmall/category/getlistbyname", //商品分类 优惠券分类:
	addcategory: apiAddsh + "/pointmall/category/addcategory", //新增商品分类 优惠券分类:
	updatecategory: apiAddsh + "/pointmall/category/updatecategory", //修改商品分类 优惠券分类:
	getlistbypage: apiAddsh + "/pointmall/category/getlistbypage", //分页获取商品分类 优惠券分类:
	deletebyid: apiAddsh + "/pointmall/category/deletebyid", //删除商品分类 优惠券分类:

	ApiFundUseById: apiAddsf + "ApiFundUse/GetById", //基金使用详情

	//banner广告
	bannerGetlistbypage: apiAddsh + "pointmall/adbanner/getlistbypage", //分页获取banner
	bannerGetlistbyname: apiAddsh + "pointmall/category/getlistbyname", //获取位置
	bannerDeleteById: apiAddsh + "pointmall/adbanner/DeleteById", //删除banner
	addadbanner: apiAddsh + "pointmall/adbanner/addadbanner", //新增banner
	bannerSubmit: apiAddsh + "pointmall/adbanner/submit", //banner提交
	updateadbanner: apiAddsh + "pointmall/adbanner/updateadbanner", //修改banner广告
	bannerReview: apiAddsh + "pointmall/adbanner/review", //banner待审核的通过和不通过
	bannerOpenclose: apiAddsh + "pointmall/adbanner/openclose", //banner开启和关闭
	bannerGetByid: apiAddsh + "pointmall/adbanner/getbyid", //获取详情

	//基金调整
	fundsubmit: apiAddsf + "ApiFund/fundsubmit", //基金提交和撤销
	fundreview: apiAddsf + "ApiFund/fundreview", //基金审核
	ApiFundById: apiAddsf + "ApiFund/GetById", //基金录入详情

	upcoupon: apiAddsh + "pointmall/upcoupon", //修改优惠券
	fundusereview: apiAddsf + "ApiFundUse/fundusereview", //基金审核
	fundreview: apiAddsf + "ApiFund/fundreview", //基金录入审核,

	fundusereview: apiAddsf + "ApiFundUse/fundusereview", //基金使用审核
	fundreview: apiAddsf + "ApiFund/fundreview", //基金录入审核
	ApiFundUsesubmit: apiAddsf + "ApiFundUse/fundsubmit", //基金使用提交
	GetListForFundUse: apiAddsf + "FinanceProject/GetListForFundUse", //基金使用出资列表

	fundusereview: apiAddsf + "ApiFundUse/fundusereview", //基金审核
	fundreview: apiAddsf + "ApiFund/fundreview", //基金录入审核,

	//基金申请
	GetPassedList: apiAddsj + "FinanceProject/GetPassedList", //出资项目列表
	addFinanceProject: apiAddsj + "FinanceProject/Add", //新增出资项目
	upFinanceProject: apiAddsj + "FinanceProject/Update", //修改出资项目
	delFinanceProject: apiAddsj + "FinanceProject/Delete", //删除出资项目

	ReFinanceProject: apiAddsj + "FinanceProject/Reject", //撤销出资项目
	FinanceProjectGetById: apiAddsj + "FinanceProject/GetById", //撤销出资项目
	FinanceProjectReview: apiAddsj + "FinanceProject/Review", //审核出资项目
	FinanceProjectSubmit: apiAddsj + "FinanceProject/Submit", //未通过出资项目提交
	FinanceProjectOpenClose: apiAddsj + "FinanceProject/OpenClose", //出资项目开启关闭

});