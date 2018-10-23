/*解析获取景点id*/
var sightsId = GetQueryString("id");
var curPage = GetQueryString("curPage");
var curNum = GetQueryString("curNum");

$(function()
{
	pageParams.KcityId = commonFun.getLocStorage(storageKey.KcityId);
	if(sightsId)
	{
		pageParams.addAdm = 2;
        $("#sightTitle").text("修改景点");
		getSightData();
	}
	else
	{
		pageParams.addAdm = 1;
        $("#sightTitle").text("添加景点");
		$(".spinner").hide();
		$(".preload").fadeIn();
	}
});

//调用回调函数
function getSightData()
{
	var params = {};
	params.sightsId = sightsId;
	meeno.JQueryAjax(Api.API_SIGHT_DETIAL,params,setSight);
}

//获取回调
function setSight(data)
{
	var html = '',
        html2 = '',
        cName = data.data.sights.name,
        description = null;

	try {
        description = decodeURI(data.data.sights.description);
	}catch(e) {
        description = data.data.sights.description;
	}
	var cid = data.data.sights.id;
	var pics = JSON.parse(data.data.sights.pics);
	if(cid == sightsId){
		$("#sightInput").val(cName);
		$("#sightText").val(description);

		if(pics != null && pics.length != 0)
		{
			for(var j=0; j<pics.length;j++){
				var picshow = pics[j];
				html += '<img src="'+picshow+'?imageView2/2/h/400" data-src="'+ picshow +'"/>';
				html2 += '<div class="s_img"><img src="'+picshow+'?imageView2/2/w/100" data-src="'+picshow+'"/><p class="s_del">&times;</p></div>';
			}
			$("#sight_pics").append(html);
			$("#s_img").append(html2);

			//删除节点
    		$(".s_del").on("click",function(){
    			$(this).parent().remove();
    		})
		}
		else
		{
			html += '<img src="'+pageParams.defaultImg+'?imageView2/2/h/400"/>';
			$("#sight_pics").append(html);
		}
	}
	$(".spinner").hide();
	$(".preload").fadeIn();

}//getSights回调

commonParams.modalSubmit.on("click",function()
{
	var pArr = [];
	$(".s_img img").each(function()
	{
		pArr.push($(this).attr("data-src"));
	});

	if($("#sightInput").val() == "")
	{
		window.parent.commonDialog("景点名不能为空！");
	}
	else
	{
        var params = {};

		if(pageParams.addAdm == 1)
		{
			params["cityId"] = pageParams.KcityId;
			params["name"] = $("#sightInput").val();
			params["description"] = encodeURI( $("#sightText").val() );
			params["pics"] = JSON.stringify(pArr);
			meeno.JQueryAjax(Api.API_ADD_SIGHTS,params,addSights);
		}
		else
		{
			params["sightsId"] = sightsId;
			var modeData = {};
			modeData.name = $("#sightInput").val();
			modeData.description = encodeURI( $("#sightText").val() );
			modeData.pics = JSON.stringify(pArr);
			params["modData"] = JSON.stringify(modeData);
			meeno.JQueryAjax(Api.API_MOD_SIGHTS,params,modSights);
		}
	}
});

function addSights(){
	$("#sightInput").val("");
	$("#sightText").val("");
	$("#s_img").empty();
	window.parent.commonDialog(errParams.addSucces);
	location.href = "get_sights.html";
}

function modSights(){
	$("#s_img").empty();
	$("#sight_pics").empty();
	getSightData();
	window.parent.commonDialog(errParams.modSucces);
}


$("#delBtn").on("click",function()
{
	if($(this).text() == "删除"){
		$(this).text("取消");
		$(this).attr("class","btn btn-info");
		$(".s_del").css("display","block");
	}else{
		$(this).text("删除");
		$(this).attr("class","btn btn-danger");
		$(".s_del").css("display","none");
	}
});

$("#btnCancel2").on("click",function()
{
	location.href = "get_sights.html?curPage=" + curPage + '&curNum=' + curNum;
});