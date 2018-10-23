/**
 * const.js
 * Created By: 梁勇
 * Data: 2015-08-06
 * Description: 配置文件
 */

/**************基础接口url****************/
//var BASE_URL = "http://meeno.f3322.net:8082/journey/index.php/"; //内网Url
//var BASE_URL = "http://121.40.101.57:9000/journey/index.php/";
var BASE_URL = "http://inner.meeno.net:9000/journey/index.php/";


/***************配置接口*****************/
var Api = {
	API_GET_UPLOADTOKEN : BASE_URL + "common/getUploadToken",
	
	API_ADMIN_LOGIN : BASE_URL + "account/adminLogin",
	API_GET_TOURISTSTATISTICS : BASE_URL + "admin/getTouristStatistics",
	
	API_GET_USERS : BASE_URL + "admin/getUsers",
	API_ADD_USERS : BASE_URL + "admin/addUser",
	API_DEL_USERS : BASE_URL + "admin/delUsers",
	API_MOD_ADMIN : BASE_URL + "admin/modAdmin",
	API_GET_COUNTRY : BASE_URL + "admin/getCountry",
	API_ADD_COUNTRY : BASE_URL + "admin/addCountry",
	API_MOD_COUNTRY : BASE_URL + "admin/modCountry",
	API_DEL_COUNTRY : BASE_URL + "admin/delCountry",
	API_GET_PROVINCE : BASE_URL + "admin/getProvince",
	API_ADD_PROVINCE : BASE_URL + "admin/addProvince",
	API_MOD_PROVINCE : BASE_URL + "admin/modProvince",
	API_DEL_PROVINCE : BASE_URL + "admin/delProvince",
	API_GET_CITY : BASE_URL + "admin/getCity",
	API_ADD_CITY : BASE_URL + "admin/addCity",
	API_MOD_CITY : BASE_URL + "admin/modCity",
	API_DEL_CITY : BASE_URL + "admin/delCity",
	API_GET_SIGHTS : BASE_URL + "admin/getSights",
	API_ADD_SIGHTS : BASE_URL + "admin/addSights",
	API_MOD_SIGHTS : BASE_URL + "admin/modSights",
	API_DEL_SIGHTS : BASE_URL + "admin/delSights",
	API_SIGHT_DETIAL : BASE_URL + "admin/getSightsId",
	
	API_GET_GROUPWIDTHIDS : BASE_URL + "group/getGroupObjWithIds",
	API_GET_LANGUAGEWIDTHIDS : BASE_URL + "language/getLanguageWithIds",
	API_CLEAR_MEMCACHE : BASE_URL + "common/clearMemcache",
	
	
	API_GET_VISITORS : BASE_URL + "admin/getVisitor",
	API_GET_VISITORSTIME : BASE_URL + "admin/getVisitorTime",
	API_GET_INTEGRAL : BASE_URL + "admin/getIntegral",
	API_GET_VISITORGROUPS : BASE_URL + "admin/getVisitorGroups",
	API_GET_VISITORQUESTION : BASE_URL + "admin/getVisitorQuestion",
	API_GET_QUESTIONREPLAY : BASE_URL + "admin/getQuestionReply",
	API_GET_CHATRECORD : BASE_URL + "admin/getChatRecord",
	API_GET_GUIDE : BASE_URL + "admin/getGuide",
	API_GET_GUIDEGROUPS : BASE_URL + "admin/getGuideGroups",
	API_GET_GUIDEREPLY : BASE_URL + "admin/getGuideReply",
	API_GET_GROUP : BASE_URL + "admin/getGroup",
	API_GET_GROUPGUIDE : BASE_URL + "admin/getGroupGuide",
	API_GET_GROUPVISITOR : BASE_URL + "admin/getGroupVisitor",
	API_GET_GUIDEAUDIT : BASE_URL + "admin/getGuideAudit",
	API_MOD_GUIDEAUDIT : BASE_URL + "admin/modGuideAudit",
	API_GET_FOOTMARK : BASE_URL + "admin/getFootMark",
	API_DEL_FOOTMARK : BASE_URL + "admin/delFootMark",
	API_GET_FOOTMARKCOMMENTS : BASE_URL + "admin/getFootMarkComments",
	API_GET_TRAVEL : BASE_URL + "admin/getTravel",
	API_GET_TRAVELVOTE : BASE_URL + "admin/getTravelVote",
	API_GET_QUESTION : BASE_URL + "admin/getQuestion",
	API_GET_QUESTIONREPLY : BASE_URL + "admin/getQuestionReply",
	API_GET_NOTICE : BASE_URL + "admin/getNotice",
	API_GET_NOTICEREAD : BASE_URL + "admin/getNoticeRead",
	API_GET_INSTRUCTIONS : BASE_URL + "admin/getInstructions",
	API_MOD_INSTRUCTIONS : BASE_URL + "admin/modInstructions",
	API_GET_CHATMESSAGE : BASE_URL + "admin/getChatMessage",
	API_GET_HOTEL : BASE_URL + "admin/getHotel",
	API_DEL_HOTEL : BASE_URL + "admin/delHotel",
	API_GET_HOTEL_DETIALS : BASE_URL + "admin/getHotelObjWithIds",
	API_MOD_HOTEL : BASE_URL + "admin/modHotel",
	API_ADD_HOTEL : BASE_URL + "admin/addHotel",
	API_GET_VERSION : BASE_URL + "admin/getVersions",//获取版本
	API_MOD_VERSION : BASE_URL + "admin/modVersion",//修改版本
	API_GET_CONSTANT : BASE_URL + "common/getConstant",//获取常量
	API_MOD_CONSTANT : BASE_URL + "common/modVersion",//修改服务电话
	
	//banner
	API_GET_BANNER : BASE_URL + "admin/getBanner",//获取banner
	API_ADD_BANNER : BASE_URL + "admin/addBanner",//添加banner
	API_MOD_BANNER : BASE_URL + "admin/modBanner",//修改banner
	API_DEL_BANNER : BASE_URL + "admin/delBanner",//删除banner

    //时间刷新
	API_GET_POSITION_TIME : BASE_URL + "admin/getPositionsTime",//拉取时间
	API_MOD_POSITION_TIME : BASE_URL + "admin/modPositionsTime",//修改上传时间间隔和拉取时间间隔信息

    //推荐桔子
    API_RECOMMEND_GUIDE : BASE_URL + "admin/recommendGuide",//推荐桔子~取消
    API_GET_RECOMMEND_GUIDE_LIST : BASE_URL + "admin/getRecommendGuideList",//推荐桔子列表

    //模板控制
    API_GET_TEMPLATE_LIST : BASE_URL + "admin/getTemplateList",//获取模板列表
    API_ADD_TEMPLATE_LIST : BASE_URL + "admin/addTemplateList",//添加模板
    API_MOD_TEMPLATE_LIST : BASE_URL + "admin/modTemplateList",//修改模板
    API_DEL_TEMPLATE_LIST : BASE_URL + "admin/delTemplateList",//删除模板
    
    //推送系统消息
    API_GET_SYS_MSG_LIST : BASE_URL + "admin/getSystemMessage", //系统消息列表
    API_SEND_SYS_MSG : BASE_URL + "admin/jPushSystemNews", //系统消息
    API_DEL_SYS_MSG : BASE_URL + "admin/delSystemMessage" //删除系统消息
};
/**************配置常量*******************/

var errCode = {
	success : 0,
	tokenFailed : 3
};

var errParams = {
	userNameblank:"用户名不能为空",
	pwdblank:"密码不能为空",
	addSucces:"添加成功",
	delSucces:"删除成功",
	modSucces:"修改成功"
};

var chParams = {
	addBanner : "添加Banner",
	modBanner : "修改Banner"
};

/**************通用变量*******************/
var commonParams = {
	isAdd: null,
	curId: null,
	hasSel : "has_sel",
	unSel : "un_sel",
	hasSel0 : "has_sel0",
	unSel0 : "un_sel0",
	btnItem : "btn_item",
	actItem : "act_item",
	btnAdd : $("#btnAdd"),
	btnDel : $("#btnDel"),
	commonModal : $("#commonModal"),
	modalTitle : $("#modalTitle"),
	modalSubmit : $("#modalSubmit"),
	IMG_CUT_H2 : '?imageView2/2/h/200', //七牛-固定高度宽度自适应
	IMG_CUT_WH : '?imageView2/1/w/60/h/60',//七牛裁剪-正方形
    IMG_CUT_H : '?imageView2/2/h/70', //七牛-固定高度宽度自适应
    IMG_CUT_H3 : '?imageView/1/w/110/h/70', //七牛裁切
    IMG_CUT_WH2 : "?imageView2/1/w/165/h/121"//七牛裁剪-长方形
};

var pageParams = {
	dataApi:null,
	currentpage:1,
	num:10,
	totalpage:null,
	addAdm:1,
	dataType: 0,
	txtpage:$("#txtPage"),
	pageNum:$("#pagenum"),
	setPageNum:$("#setPagenum"),
	callback:null,
	next:$("#next"),
	prev:$("#prev"),
	last:$("#last"),
	first:$("#first"),
	toPage:$("#toPage"),
	tbody:$("#tbody"),
	tbody2:$("#tbody2"),
	btnSearch:$("#btnSearch"),
	searchParams:"",
	countryId:"",
	provinceId:"",
	cityId:"",
	provinceIds:"",
	defaultImg:"http://7xsewn.com1.z0.glb.clouddn.com/default.jpg",//景点详情默认图片
	defaultIcon:"http://7xsewn.com1.z0.glb.clouddn.com/default.png",//用户头像默认图片
	defaultHotelImg:"http://7xsewn.com1.z0.glb.clouddn.com/default-hotel.jpg"//酒店默认图片
};

var storageKey = {
	KPHPSESSID : "PHPSESSID",
	KuserName : "KuserName",
	Kpwd : "Kpwd",
	Kpermissions : "Kpermissions",
	KadminType : "KadminType",
	kisrem : "kisrem",
	KcountryId : "KcountryId",
	KprovinceId : "KprovinceId",
	KcityId : "KcityId",
	kStamp : "kStamp",
	kGuideAuditData : "kGuideAuditData",
	KfootMarkData : "KfootMarkData",
	KguideGroupsData : "KguideGroupsData",
	KcountryData : "KcountryData",
	KcityData : "KcityData",
	KsafetyNotice : "KsafetyNotice",
	hotelID : "hotelID",
	orangeGroupID : "orangeGroupID",
	orangeQuestionID : "orangeQuestionID"
};

var homeParams = {
	toExit : $("#toExit"),
	clear : $("#clear"),
	indexAdmin : $(".index_admin"),
	indexTopRt : $(".index_top_rt"),
	indexLayout : $(".index_layout"),
	navItem : "navitem",
	navItemActive : "navitem_act",
	nav : $(".navContainer div")
};


