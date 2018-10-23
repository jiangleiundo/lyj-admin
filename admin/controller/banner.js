
$(function(){
	getBanner();
});

function getBanner(){
	meeno.JQueryAjax(Api.API_GET_BANNER, {}, function(data){
		if(data.err == 0)
		{
			$(".spinner").hide();
			$(".preload").fadeIn();
			var bannerData = data.data.banners;
			var html = '';
			if(bannerData.length == 0)
			{
				html += '<tr><td colspan = 7>暂无数据</td></tr>';
			}
			else
			{
				for(var i=0; i < bannerData.length; i++)
				{
					var picPosition = bannerData[i].posType == '0'?'顶部':'中间';
					if(utilities.checkStringEmpty(bannerData[i].bannerIcon))
					{
						var picUrl = null;
					}
					else
					{
						var bannerPic = JSON.parse(bannerData[i].bannerIcon);
						var picUrl = bannerPic.url;
					}
					var jumpType = jumpStyle(bannerData[i].bannerType);
					
					if(utilities.checkStringEmpty(bannerData[i].bannerParam))
					{
						var jumpParam = "无数据";
					}
					else
					{
						var jumpParam = bannerData[i].bannerParam;
					}
					
					html += '<tr>';
					html += '<td class="jd-width-1">'+ picPosition +'</td>';
					html += '<td class="jd-width-3"><img height="70" src="'+ picUrl +'?imageView/1/w/110/h/70"/></td>';
					html += '<td class="jd-width-1">'+ jumpType +'</td>';
					html += '<td>'+ jumpParam +'</td>';
					html += '<td>'+ bannerData[i].sort +'</td>';
					html += '<td><a class="btn btn-info modify" data-id="'+ bannerData[i].id +'" data-param="'+ bannerData[i].bannerParam +'" data-src="'+ picUrl +'" data-sort="'+ bannerData[i].sort +'" data-position="'+ bannerData[i].posType +'" data-type="'+ bannerData[i].bannerType +'">修改</a></td>';
					html += '<td><a class="btn btn-danger delete" data-id="'+ bannerData[i].id +'">删除</a></td>';
					html += '</tr>';
				
				}
			}

			$("#tbody").empty().append(html);
			
			$(".modify").on("click", function(){
				_banner.addTitle.text(chParams.modBanner);
				_banner.dataContainer.hide();
				_banner.addContainer.fadeIn();
	
				commonParams.isAdd = 2;
				commonParams.curId = $(this).attr("data-id");
				$("#sel-position").val( $(this).attr("data-position") );
				$("#sel-jump-style").val( $(this).attr("data-type") );
				$("#banner-sort").val( $(this).attr("data-sort") );
				var dataParam = "";
				if(utilities.checkStringEmpty( $(this).attr("data-param") ))
				{
					dataParam = ""
				}
				else
				{
					dataParam = $(this).attr("data-param")
				}
				$("#banner-jump-param").val( dataParam );
				var temp = '<div class="banner-img"><img src="'+ $(this).attr("data-src") +'?imageView2/2/w/480" data-src="'+ $(this).attr("data-src") +'"/></div>';
            	$("#banner-box").empty();
            	$("#banner-box").append(temp);
				
			});
			
			$(".delete").on("click", function(){
				var params = {
					"id": $(this).attr("data-id")
				};
				meeno.JQueryAjax(Api.API_DEL_BANNER, params, function(data){
					window.parent.commonDialog(errParams.delSucces);
					getBanner();
				})
			})
		}
	})
}

function jumpStyle(type){
	var jumpType;
	switch (parseInt(type)){
		case 0:
			jumpType = '无跳转';
			break;
		case 1:
			jumpType = '跳转URL';
			break;
		case 2:
			jumpType = '跳转团';
			break;
		default:
			jumpType = '';
			break;
	}
	return jumpType;
}

var _banner = {
	dataContainer : $(".data-container"),
	addContainer : $(".add-container"),
	btnAdd : $("#btnAdd"),
	btnDel : $("#btnDel"),
	addTitle : $("#addTitle"),
	btnBack : $("#btnBack")
};

//添加
_banner.btnAdd.on("click",function(){
	_banner.addTitle.text(chParams.addBanner);
	_banner.dataContainer.hide();
	_banner.addContainer.fadeIn();
	
	commonParams.isAdd = 1;
	$("#sel-position").val(0);
	$("#sel-jump-style").val(0);
	$("#banner-sort").val("");
	$("#banner-jump-param").val("");
	$("#banner-box").empty();
});

_banner.btnBack.on("click",function(){
	_banner.addContainer.hide();
	_banner.dataContainer.fadeIn();
});

$("#subBanner").on("click", function(){

	var selPosition = $("#sel-position  option:selected").val();
	var selJumpType = $("#sel-jump-style option:selected").val();
	var sort = $("#banner-sort").val();
	var jumpParam = $("#banner-jump-param").val();
	var bannerImg = $("#banner-box").children(".banner-img").children().attr("data-src");
	
	var bannerIconCopy = {};
	bannerIconCopy.url = bannerImg;
	bannerIconCopy.image_width = 1242;
	bannerIconCopy.image_height = 264;
	
	var params1 = {
		"bannerIcon": JSON.stringify(bannerIconCopy),
		"bannerType": selJumpType,
		"posType": selPosition,
		"bannerParam": jumpParam,
		"sort": sort
	};
	
	var modInfo = params1;
	var params2 = {
		"id": commonParams.curId
	};
	params2.modInfo = JSON.stringify(modInfo);
	
	if(commonParams.isAdd == 1)
	{
		meeno.JQueryAjax(Api.API_ADD_BANNER, params1, addBannerCallback);
	}
	else
	{
		meeno.JQueryAjax(Api.API_MOD_BANNER, params2, modBannerCallback);
	}
});

function addBannerCallback(){
	_banner.addContainer.hide();
	_banner.dataContainer.fadeIn();
	window.parent.commonDialog(errParams.addSucces);
	getBanner();
}

function modBannerCallback(){
	_banner.addContainer.hide();
	_banner.dataContainer.fadeIn();
	window.parent.commonDialog(errParams.modSucces);
	getBanner();
}
