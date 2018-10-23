$(function(){
    var curPage = GetQueryString("curPage");
    var curNum = GetQueryString("curNum");

	pageParams.KcityId = commonFun.getLocStorage(storageKey.KcityId);

    if(!utilities.checkStringEmpty(curPage))
    {
        pageParams.currentpage = curPage;
        pageParams.num = curNum;
    }
    pageParams.dataApi = Api.API_GET_SIGHTS;
    pageParams.searchParams = {
		"cityId" : pageParams.KcityId
	};
    pageParams.callback = getSights;
	ModelFun.dataModel();

	pageParams.txtpage.val(pageParams.currentpage);
	pageParams.pageNum.text(pageParams.totalpage);
	pageParams.setPageNum.val(pageParams.num);
	
});

//获取省份回调
function getSights(data)
{
	var sights = data["data"]["sights"];
	var count = data["data"]["count"];
	pageParams.totalpage = commonFun.getTotalpages(count,pageParams.num);
	var html = "";
	if(sights.length == 0)
	{
		html += '<tr><td colspan = 8>暂无数据</td></tr>';
	}
	else
	{
		for(var i = 0, len = sights.length; i < len; i++){
			var index = (pageParams.currentpage - 1)*pageParams.num + (i + 1);
			var cName = sights[i].name;
			var cid = sights[i].id;
			try 
			{ 
				var description = decodeURI(sights[i].description);
			} 
			catch (e) 
			{ 
				var description = sights[i].description;
			} 
			var clipstr = description.substring(0,70);
			var pics = JSON.parse(sights[i].pics);
			if(pics != null && pics.length != 0)
			{
				var pUrl01 = pics[0];			
			}else{
				var pUrl01 = '';
			}
			var Img = commonFun.getDefaultImgae(pUrl01,pageParams.defaultImg);
			
			
			html += '<tr>';
			html += '<td class="jd-width-1">'+index+'</td>';
			html += '<td class="jd-width-2">'+cName+'</td>';
			html += '<td class="jd-width-3"><img height="70" src="'+Img+'?imageView/1/w/110/h/70"/></td>';
			html += '<td class="jd-width-4">'+clipstr+'<div class="jd-txt" style="display:none"><textarea disabled class="showTextarea" rows="10" style="width:100%; height:100%;">'+ description +'</textarea></div></td>';
			html += '<td class="jd-width-1"><a class="btn btn-info modify" data-id="'+cid+'" data-name="'+cName+'" data-dsp="'+description+'">修改</a></td>';
			html += '<td class="jd-width-1">';
			html += '<div class="rem_con">';
			html += '<div class="rem_con_lf"><span class="un_sel" data-id="'+cid+'"></span></div></div>';
			html += '</td>';
			html += '</tr>';
		}
		
	}
	pageParams.tbody.empty().append(html);
	$(".spinner").hide();
	$(".preload").fadeIn();

	/* 隔行变色 */
	var trL = $("#tbody").find("tr");
	for(var i = 0; i < trL.length; i++)
	{
		if(i%2 == 0)
		{
			trL[i].style.backgroundColor = "#f6f6f6";
		}
	}
	
	commonFun.oneSelected("allsel");
	commonFun.allSelected("allsel");
	
	$(".modify").on("click",function(){
		var id = $(this).attr("data-id");
        var curPage = $("#txtPage").val();
        var curNum = $("#setPagenum").val();

		location.href = "sightdetials.html?id=" + id + '&curPage='+ curPage + '&curNum=' + curNum;  //带id传递
	});
	
	/*鼠标悬停景点介绍文本显示*/
	$(".jd-width-4").on("mouseover",function() {

		$(this).children("div").css("display","block");
	}).on("mouseout",function() {

		$(this).children("div").css("display","none");
	})
}

commonParams.btnDel.on("click",function(){
    commonFun.delListByIds("sightsIds",Api.API_DEL_SIGHTS);
});

//搜索
$("#coun_search_btn").on("click",function(){

	pageParams.currentpage = 1;
	pageParams.searchParams = {
		"name" : $("#txtPriName").val(),
		"cityId" : pageParams.KcityId
 	};
	pageParams.dataApi = Api.API_GET_SIGHTS;
	pageParams.callback = getSights;
	ModelFun.dataModel();
});

//后退一步
$("#btnCancel").on("click",function(){
	location.href = "get_city.html";
});

//新增景点
commonParams.btnAdd.on("click",function(){
	location.href = "sightdetials.html";
});


