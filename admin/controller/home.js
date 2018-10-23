var userCount = 0;

$(function(){
	var params1 = {};
	meeno.JQueryAjax(Api.API_GET_USERS,params1,getUsers);
	
	var params = {};
	params["dayTime"] = dateTime;
	for(var i=1; i<4; i++){
		params["type"] = i;
		userCount = i;
		meeno.JQueryAjax(Api.API_GET_TOURISTSTATISTICS,params,getTouristStatistics);
		
	}
});

function getTouristStatistics(data){
	var users = data["data"];
	var uTotal = users.countTotal;
	var uNew = users.countNew;
	if(userCount == 1){
		$("#user_total").text(uTotal);
		$("#user_new").text(uNew);
	}else if(userCount == 2){
		$("#orange_total").text(uTotal);
		$("#orange_new").text(uNew);
	}else{
		$("#team_total").text(uTotal);
		$("#team_new").text(uNew);
	}
}


function getUsers(data){
	var rowCount = data["data"]["count"];
	$(".count_user").text(rowCount);
	$(".spinner").hide();
	$(".preload").fadeIn();
}


var admins = commonFun.getLocStorage(storageKey.KuserName);
$(".cur_admin_nickname span").text(admins);
var adminType = commonFun.getLocStorage(storageKey.KadminType);
var atype = adminFun.getUserType(adminType);
$(".cur_admin_type span").text(atype);
var timeStamp = commonFun.getLocStorage(storageKey.kStamp);
var tt = commonFun.userDate(timeStamp);
var dateTime = commonFun.getnowDate(timeStamp);//获取年月日
$(".cur_admin_date span").text(tt);

