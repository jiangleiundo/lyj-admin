$(function(){

	var hotelID = commonFun.getLocStorage(storageKey.hotelID);
	if(hotelID)
	{
		$("#sightTitleH").text("修改酒店");
		pageParams.addAdm = 1;
		getHotelDetialModel.getModelByParams(hotelID);
	}
	else
	{
		$("#sightTitleH").text("添加酒店");
		$("#s_imgH").empty();
		$(".sight_picsH").empty();
		$(".sightPicsH").hide();//添加酒店图片时该模块不显示
		pageParams.addAdm = 2;
	}
	$(".spinner").hide();
	$(".preload").fadeIn();
});

//根据ID获取酒店详情
var getHotelDetialModel = {
	getModelByParams : function(hotelId){
		var params ={
			"hotelId" : hotelId
		};
		meeno.JQueryAjax(Api.API_GET_HOTEL_DETIALS,params,getHotelDetialModel.getHotelModelCallback)
	},
	getHotelModelCallback : function(data){
		if(data.err == 0)
		{
			var hotel = data.data.hotel;
			var pics = JSON.parse(hotel.hotelImages);
			$("#sightInputH").val(hotel.hotelName);
			$("#sightTextH").val(hotel.desc);
			var html = '';
			var html2 = '';
			if(pics && pics.length != 0)
			{
				for(var j=0; j<pics.length;j++){
				var picshow = pics[j];
				html += '<img src="'+picshow+'?imageView2/2/h/400" data-src="'+ picshow +'"/><br>';
				html2 += '<div class="s_imgH"><img src="'+picshow+'?imageView2/2/w/100" data-src="'+picshow+'"/><p class="s_delH">&times;</p></div>';
				}
				$(".sight_picsH").empty().append(html);
				$("#s_imgH").empty().append(html2);
				//删除节点
	    		$(".s_delH").on("click",function(){
	    			$(this).parent().remove();
	    		})
			}
			else
			{
				html += '<img src="'+ pageParams.defaultHotelImg +'?imageView2/2/h/400"/>';
				$("#s_imgH").empty();
				$(".sight_picsH").empty().append(html);
			}
		}
	}
};

//返回列表
$("#btnCancelH").on("click",function(){
	location.href = "hotel.html";
});

//删除图片
$("#delBtnH").on("click",function()
{
	if($(this).text() == "删除"){
		$(this).text("取消");
		$(this).attr("class","btn btn-info");
		$(".s_delH").css("display","block");
	}else{
		$(this).text("删除");
		$(this).attr("class","btn btn-danger");
		$(".s_delH").css("display","none");
	}
});

//提交数据
$("#modalSubmitH").on("click",function(){
			
	var pArr = [],
        $sightInputH = $("#sightInputH");

	$(".s_imgH").find("img").each(function()
	{
		pArr.push($(this).attr("data-src"));
	});

	if(utilities.checkStringEmpty($sightInputH.val()))
	{
		window.parent.commonDialog("酒店名不能为空！");
	}
	else
	{
        var params = {};

		if(pageParams.addAdm == 1)//修改
		{

            params.hotelId = commonFun.getLocStorage(storageKey.hotelID);
            params.hotelName = $sightInputH.val();
            params.desc = $("#sightTextH").val();
            params.hotelImages = JSON.stringify(pArr);

			meeno.JQueryAjax(Api.API_MOD_HOTEL,params,modHotel);
		}
		else if(pageParams.addAdm == 2)
		{
            params.hotelImages = JSON.stringify(pArr);
            params.hotelName = $sightInputH.val();
            params.desc = $("#sightTextH").val();
			meeno.JQueryAjax(Api.API_ADD_HOTEL,params,addHotel);
		}
	}
});

//修改hotel回调
function modHotel(){
	var tt = commonFun.getLocStorage(storageKey.hotelID);
	getHotelDetialModel.getModelByParams(tt);
	location.href = "hotel.html";
	window.parent.commonDialog(errParams.modSucces);
}

//添加回调
function addHotel(){
	$("#sightInputH").val("");
	$("#sightTextH").val("");
	$("#s_imgH").empty();
	location.href = "hotel.html";
	window.parent.commonDialog(errParams.addSucces);
}