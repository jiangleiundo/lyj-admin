$(function(){
//	pageParams.countryId = commonFun.getLocStorage(storageKey.KcountryId);
	pageParams.KprovinceId = commonFun.getLocStorage(storageKey.KprovinceId);
	pageParams.dataType = pageParams.dataType;
	pageParams.dataApi = Api.API_GET_CITY;
	pageParams.searchParams = {
		"provinceId" : pageParams.KprovinceId
	};
	pageParams.callback = getCity;
	ModelFun.dataModel();
	
	pageParams.txtpage.val(pageParams.currentpage);
	pageParams.pageNum.text(pageParams.totalpage);
	pageParams.setPageNum.val(pageParams.num);
});
var cityParams = {
	countryName : $("#countryName"),
	destnationInfo: $("#destnationInfo"),
	cid : 0,
	cname : 0,
	cinfo:""
};

//获取省份回调
function getCity(data)
{
	var city = data["data"]["city"];
	var count = data["data"]["count"];
	pageParams.totalpage = commonFun.getTotalpages(count,pageParams.num);
	var html = "";
	if(city.length == 0)
	{
		html += '<tr><td colspan = 8>暂无数据</td></tr>';
	}
	else
	{
		commonFun.setLocStorage(storageKey.KcityData,JSON.stringify(city));
		for(var i=0; i<city.length; i++){
			var index = (pageParams.currentpage - 1)*pageParams.num + (i + 1);
			var cName = city[i].name;
			var cid = city[i].id;
			try{
				var cinfo = decodeURI( city[i].destinationInfo );
			}catch(e){
				var cinfo = city[i].destinationInfo;
			}
			var cinfoStr = cinfo.substring(0,170);
			var copyInfo = "";
			var allInfo = "";
			if(city[i].destinationInfo == null || city[i].destinationInfo == "")
			{
				copyInfo = "暂无数据";
				allInfo = "暂无数据";
			}
			else
			{
				copyInfo = cinfoStr;
				allInfo = cinfo;
			}
			
			html += '<tr>';
			html += '<td class="c_width1">'+index+'</td>';
			html += '<td class="c_width1">'+cName+'</td>';
			html += '<td class="c_width3">'+ copyInfo +'<div style="display:none"><textarea disabled class="showTextarea" rows="10" style="width:100%; height:100%;">'+ allInfo +'</textarea></div></td>';
			html += '<td class="c_width2"><a class="btn btn-info modify" data-id="'+cid+'" data-name="'+cName+'">修改</a></td>';
			html += '<td class="c_width2"><a class="btn btn-default pInfo" data-id="'+cid+'" data-name="'+cName+'">景点列表</a></td>';
			html += '<td class="c_width2">';
			html += '<div class="rem_con">';
			html += '<div class="rem_con_lf"><span class="un_sel" data-id="'+cid+'"></span></div></div>';
			html += '</td>';
			html += '</tr>';
		}
		
	}
	pageParams.tbody.append(html);
	
	/* 隔行变色 */
	var trL = $("#tbody tr");
	for(var i=0; i<trL.length; i++){
		if(i%2 == 0){
			trL[i].style.backgroundColor = "#f6f6f6";
		}
	}
	$(".spinner").hide();
	$(".preload").fadeIn();
	
	commonFun.oneSelected("allsel");
	
	$(".modify").on("click",function(){
		pageParams.addAdm = 2;
		commonFun.showModal("修改城市信息");
		cityParams.cid = $(this).attr("data-id");
		$("#countryName").val($(this).attr("data-name"));
		cityParams.cname = $(this).attr("data-name");
		var cityData = JSON.parse(commonFun.getLocStorage(storageKey.KcityData));
		for(var i=0; i<cityData.length; i++)
		{
			if(cityParams.cid == cityData[i].id)
			{
				if(cityData[i].destinationInfo == null)
				{
					$("#destnationInfo").val( "暂无数据" );
				}
				else
				{
					try{
						$("#destnationInfo").val( decodeURI(cityData[i].destinationInfo) );
						cityParams.cinfo = decodeURI(cityData[i].destinationInfo);
					}catch(e){
						$("#destnationInfo").val( cityData[i].destinationInfo );
						cityParams.cinfo = cityData[i].destinationInfo;
					}
				}
			}
		}
	});
	
	/*鼠标悬停景点介绍文本显示*/
	$(".c_width3").on("mouseover",function(){
		$(this).children("div").css("display","block");
	});
	$(".c_width3").on("mouseout",function(){
		$(this).children("div").css("display","none");
	});
	
	/*引入子页面*/
	$(".pInfo").on("click",function(){
		var KcityId = $(this).attr("data-id");
		commonFun.setLocStorage(storageKey.KcityId,KcityId);
		location.href = "get_sights.html";
	})
}

commonFun.allSelected("allsel");


commonParams.btnDel.on("click",function(){
    commonFun.delListByIds("cityIds",Api.API_DEL_CITY);
    
});

//后退一步
$("#btnCancel").on("click",function(){
	location.href = "get_province.html";
});

$("#coun_search_btn").on("click",function(){
	pageParams.tbody.empty();
	pageParams.dataType = pageParams.dataType;
	pageParams.currentpage = 1;
	pageParams.searchParams = {
		"name" : $("#txtPriName").val(),
		"provinceId" : pageParams.KprovinceId
 	};
	pageParams.dataApi = Api.API_GET_CITY;
	pageParams.callback = getCity;
	ModelFun.dataModel();
});

commonParams.btnAdd.on("click",function(){
	$("#countryName").val("");
	$("#destnationInfo").val("");
	commonFun.showModal("添加城市");
});

commonParams.modalSubmit.on("click",function(){
	if($("#countryName").val() == ""){
		window.parent.commonDialog("城市名不能为空！");
	}
    else
    {
		if(pageParams.addAdm == 1){
			var params = {};
			params["provinceId"] = pageParams.KprovinceId;
			params["name"] = $("#countryName").val();
			params["destinationInfo"] = $("#destnationInfo").val();
			meeno.JQueryAjax(Api.API_ADD_CITY,params,commonFun.addSuccessWithModal);
		}
        else
        {
			var params = {};
			params["cityId"] = cityParams.cid;
			if( cityParams.cname != $("#countryName").val() || cityParams.cinfo != $("#destnationInfo").val() ){
				params["modData"] = '{"name" :"' + $("#countryName").val() + '", "destinationInfo":"' + encodeURI( $("#destnationInfo").val() ) + '"}';
				meeno.JQueryAjax(Api.API_MOD_CITY,params,commonFun.modSuccessWithModal);
			}else{
				window.parent.commonDialog("请填入不同的数据!");
			}
		}
	}
});
