var apiAdds0 = "http://192.168.1.101:8012/api/";
var apiAdds1 = "http://192.168.1.101:8014/api/";
var apiAdds2 = "http://192.168.1.101:8022/api/";
var apiAdds3 = "http://192.168.1.101:8016/api/";
var apiAdds4 = "http://192.168.1.101:8018/api/";
var apiAdds5 = "http://192.168.1.101:8019/api/";
var apiAdds6 = "http://192.168.1.101:8006/api/";
var apiAdds7 = "http://192.168.1.101:8024/api/";
var apiAdds8 = "http://192.168.1.101:8023/api/";
var apiAdds9 = "http://192.168.1.101:8025/api/";
App.constant("serverUrls", {
	//基础资源库
	courtyardList: apiAdds + "foundation/courtyardlist", //获取院落列表(表格)
	buildingList: apiAdds + "foundation/buildinglist", //获取楼栋列表(表格)
	unitList: apiAdds + "foundation/unitlist", //获取单元列表(表格)
	houseList: apiAdds + "foundation/houselist", //获取单元列表(表格)
	courtyardAll: apiAdds + "foundation/courtyardall", //获取院落列表(下拉选项)
	buildingAll: apiAdds + "foundation/all", //获取楼栋,单元，楼层列表(下拉选项)
	unitHouseList: apiAdds + "foundation/unithouseList", //根据单元ID获取房屋列表（下拉选项）
	whetherState: apiAdds + "foundation/whetherstate", //院落启用停用
	inCourtyard: apiAdds + "foundation/incourtyard", //新增院落
	inItialization: apiAdds + "foundation/initialization", //新增楼栋
	inUnit: apiAdds + "foundation/addunit", //新增单元
	inHouse: apiAdds + "foundation/addhouse", //新增房屋
	upcourtyard: apiAdds + "foundation/upcourtyard", //更新院落
	deBuilding: apiAdds + "foundation/debuilding", //删除楼栋
	deUnit: apiAdds + "foundation/deunit", //删除单元
	deHouse: apiAdds + "foundation/dehouse", //删除房屋
	residentList: apiAdds + "foundation/residentlist", //居民信息列表
	addResident: apiAdds + "foundation/addresident", //新增居民信息(Population:1流动/2常驻人口新增)
	upResident: apiAdds + "foundation/upresident", //编辑修改居民信息
	experienceDetails: apiAdds + "foundation/experiencedetails", //根据居民Id获取教育工作信息
	upExperience: apiAdds + "foundation/upexperience", //更新教育工作经历信息
	inExperience: apiAdds + "foundation/inexperience", //新增教育工作经历信息
	vehiclelist: apiAdds + "foundation/vehiclelist", //车辆管理列表
	addVehicle: apiAdds + "foundation/addvehicle", //新增车辆
	upVehicle: apiAdds + "foundation/upvehicle", //修改车辆,
	vehicleState: apiAdds + "foundation/vehiclestate", //
	courtyardAllList: apiAdds + "foundation/alllist", //院落列表树形结构
	houseResident: apiAdds + "foundation/houseresident", //根据房屋id获取居民列表,
	getSuperior: apiAdds + "foundation/getlist", //根据房屋Id获取父级信息
	//驻区企业管理
	enterpriseList: apiAdds + "foundation/enterpriselist", //驻区企业列表
	addEnterprise: apiAdds + "foundation/addenterprise", //新增企业
	negotiationList: apiAdds + "foundation/negotiationlist", //搜索协商组成员
	allOcation: apiAdds + "foundation/allocation", //分配居民Id
	//社区管理
	keypopulationList: apiAdds + "foundation/keypopulationlist", //重点人群列表
	addKeypopulation: apiAdds + "foundation/addkeypopulation", //新增重点人群
	upKeypopulation: apiAdds + "foundation/upkeypopulation", //更新重点人群
	populationlist: apiAdds + "foundation/populationlist", //流动/常住人口列表
	//组织管理
	organizationLogin: apiAdds1 + "organization/login", //组织管理登录
	organizationList: apiAdds1 + "organization/organizationlist", //组织列表
	addOrganization: apiAdds1 + "organization/addorganization", //新增组织
	upOrganization: apiAdds1 + "organization/uporganization", //修改组织
	organizationState: apiAdds1 + "organization/organizationstate", //启用，停用
	personnelList: apiAdds1 + "organization/personnellist", //人员列表
	positionList: apiAdds1 + "organization/positionlist", //岗位列表,
	addPosition: apiAdds1 + "organization/addposition", //新增岗位
	upPosition: apiAdds1 + "organization/upposition", //修改岗位
	positionState: apiAdds1 + "organization/positionstate", //岗位启用，停用
	organizationAll: apiAdds1 + "organization/organizationall", //获取组织列表（下拉列表用）
	gridList: apiAdds1 + "organization/gridlist", //获取区域列表
	inGrid: apiAdds1 + "organization/ingrid", //新增区域
	upGrid: apiAdds1 + "organization/upgrid", //修改区域
	griderAll: apiAdds1 + "organization/griderall", //获取所有区域管理员
	gridGangelist: apiAdds1 + "organization/gridgangelist", //获取区域范围
	inGridrange: apiAdds1 + "organization/ingridrange", //增加区域范围
	deGridgange: apiAdds1 + "organization/degridgange", //删除区域范围
	//员工管理
	personnelList: apiAdds1 + "organization/personnellist", //员工管理列表
	addPersonnel: apiAdds1 + "organization/addpersonnel", //新增员工
	upPersonnel: apiAdds1 + "organization/uppersonnel", //修改员工
	personnelState: apiAdds1 + "organization/personnelstate", //员工管理启用，停用
	positionAll: apiAdds1 + "organization/positionall", //获取所有岗位列表（下拉列表用）
	
	workinggtrajectoryList:apiAdds1 + "organization/workingtrajectorylist", //员工获取工作轨迹
	//社团管理
	societyList: apiAdds1 + "organization/societylist", //社团管理列表,
	addSociety: apiAdds1 + "organization/addsociety", //新增社团
	upSociety: apiAdds1 + "organization/upsociety", //修改社团
	societyState: apiAdds1 + "organization/societystate", //启用，停用社团
	allOcationf: apiAdds1 + "organization/allocation", //分配员工账号
	//自治组织
	associationList: apiAdds2 + "association/associationlist", //自治组织列表
	associationState: apiAdds2 + "association/associationstate", //启用停用
	inAssociation: apiAdds2 + "association/inassociation", //新增自治组织管理
	upAssociation: apiAdds2 + "association/upassociation", //修改自治组织管理
	Associationall: apiAdds2 + "association/associationall", //自治组织上级组织列表
	staffList: apiAdds2 + "association/stafflist", //自治组织成员管理
	inStaff: apiAdds2 + "association/instaff", //新增自治组织成员
	upStaff: apiAdds2 + "association/upstaff", //修改自治组织成员
	deStaff: apiAdds2 + "association/destaff", //删除自治组织成员
	//新闻公告
	informationList: apiAdds3 + "information/information/list", //新闻公告列表
	informationTypeList: apiAdds3 + "information/category/all", //获取新闻类型列表（下拉列表用）
	reviewstateInformation: apiAdds3 + "information/reviewstate", //审核
	addInformation: apiAdds3 + "information/addinformation", //新增
	addCategory: apiAdds3 + "information/category", //新增新闻分类
	upInformation: apiAdds3 + "information/upinformation", //修改新闻
	inCategory: apiAdds3 + "information/category", //新增新闻公告类型
	//居民积分
	getUserpointList: apiAdds4 + "apipoint/m/getuserpointlist", //居民积分列表
	changePoint: apiAdds4 + "apipoint/m/changepoint", //调整积分
	getPointrecordbymemberid: apiAdds4 + "apipoint/m/getpointrecordbymemberid", //积分明细
	getEventlist: apiAdds4 + "apipoint/m/geteventlist", //获取积分事件列表
	//民主协商
	transacationList: apiAdds5 + "transacation/democratictransaction/list", //民主协商列表
	demoCratictransaction: apiAdds5 + "transacation/democratictransaction", //更新民主协商
	negotiationGroupsbydpid: apiAdds5 + "group/negotiationgroupsbydpid", //根据协商议题Id获取协商组
	negotiationGroupmembersbygid: apiAdds5 + "group/negotiationgroupmembersbygid", //根据协商组Id获取协商组成员
	//权限管理
	getRole: apiAdds6 + "menubar/getrole", //获取用户下的角色列表
	getAllRole: apiAdds6 + "menubar/all", //获取(所有)角色列表
	addRole: apiAdds6 + "menubar/inrole", //新增(所有)角色
	upRole: apiAdds6 + "menubar/uprole", //修改(所有)角色
	userList: apiAdds6 + "menubar/userlist", //获取所有用户列表
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
	//事项模板
	eventInspectorlist: apiAdds7 + "event/eventinspector/list", //事项模板列表
	eventInspector: apiAdds7 + "event/eventinspector", //修改事项模板
	eventCategorylist: apiAdds7 + "event/eventcategory/list", //获取事件类型
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

	//工作流
	workFlowgrouplist: apiAdds8 + "group/workflowgroup/list", //工作流工作组列表
	workflowList: apiAdds8 + "workflow/workflow/list", //工作流模板列表
	upWorkflow: apiAdds8 + "workflow/workflow", //更新工作流模板
	inWorkflow: apiAdds8 + "workflow/workflow", //新增工作流模板
	workFlowsteplist: apiAdds8 + "workflow/workflowstep/list", //工作流步骤列表
	workFlowstepsbyworkflowid: apiAdds8 + "workflow/workflowstepsbyworkflowid", //根据工作流模板Id获取工作流步骤列表
	workFlowstep: apiAdds8 + "workflow/workflowstep", //新增工作流步骤(新增和编辑)
	workFlownodesbystepid: apiAdds8 + "workflow/workflownodesbystepid", //根据步骤Id获取节点列表
	workFlownode: apiAdds8 + "workflow/workflownode", //工作流节点(新增和修改)
	getWorkbynodeid: apiAdds8 + "work/getworkbynodeid", //根据节点Id获取工作流工作
	workPointmodify: apiAdds8 + "work/workpointmodify", //积分修改工作定义(新增和修改)
	workUploadform: apiAdds8 + "work/workuploadform", //表单上传工作定义(新增和修改)
	workAudit: apiAdds8 + "work/workaudit", //表单审核工作定义(新增和修改)
	workDemocraticproject: apiAdds8 + "work/workdemocraticproject", //民主协商工作定义(新增和修改)
	workFlowersbyids: apiAdds8 + "workflow/workflowersbyids", //根据IDS获取工作流实例
	steppersByworkflowid: apiAdds8 + "workflow/steppersbyworkflowid", //根据工作流Id获取工作流步骤实例
	workflowNodersbystepid: apiAdds8 + "workflow/workflownodersbystepid", //根据工作流步骤Id获取工作流节点实例
	getworkerBynoderid: apiAdds8 + "work/getworkerbynoderid", //根据工作流节点Id获取工作流实例工作实例
	myWorkers: apiAdds8 + "work/myworkers", //待办事项列表
	myWorkershistory: apiAdds8 + "work/myworkershistory", //历史事项列表
	workflowerBynode: apiAdds8 + "workflow/workflowerbynoder", //根据工作流节点实例Id获取工作流实例
	workerDemocraticproject: apiAdds8 + "work/workerdemocraticproject", //更新民主协商监听者
	workerAudit: apiAdds8 + "work/workeraudit", //完成审核工作
	workFlowgroups: apiAdds8 + "group/workflowgroup/list", //工作组管理列表
	upWorkflowgroup: apiAdds8 + "group/workflowgroup", //修改，新增工作组
	deleteWorkflowgroup: apiAdds8 + "group/workflowgroup", //删除工作组
	workflowGroupmembersbygid: apiAdds8 + "group/workflowgroupmembersbygid", //根据iD获取工作组成员
	inWorkflowgroupmember: apiAdds8 + "group/workflowgroupmember", //新增小组成员
	deleteWorkflowgroupmember: apiAdds8 + "group/workflowgroupmember", //删除小组成员

	//表单上传
	inFloatingpopulation: apiAdds9 + "infloatingpopulation", //流动人口表单上报
	getFloating: apiAdds9 + "getfloating", //流动人口详情
	inEnvironmental: apiAdds9 + "inenvironmental", //环境卫生表单上报
	inDispute: apiAdds9 + "indispute ", //纠纷调解表单上报
	inKeypopulation: apiAdds9 + "inkeypopulation", //重点人群表单上报
	getKeypopulation: apiAdds9 + "getkeypopulation", //

});