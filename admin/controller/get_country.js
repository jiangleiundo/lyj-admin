$(function(){
	pageParams.dataType = pageParams.dataType;
	pageParams.searchParams = {};
	pageParams.dataApi = Api.API_GET_COUNTRY;
	pageParams.callback = getCountry;
	ModelFun.dataModel();
	
	pageParams.txtpage.val(pageParams.currentpage);
	pageParams.pageNum.text(pageParams.totalpage);
	pageParams.setPageNum.val(pageParams.num);
	
});

var countryParams = {
	countryName : $("#countryName"),
	destnationInfo: $("#destnationInfo"),
	textarea0 : $("#textarea"), 
	cid : "",
	cname : "",
	cinfo:""
};

//获取国家回调
function getCountry(data)
{
	var country = data["data"]["country"];
	var count = data["data"]["count"];
	pageParams.totalpage = commonFun.getTotalpages(count,pageParams.num);
	var html = "";
	if(country.length == 0)
	{
		html += '<tr><td colspan = 8>暂无数据</td></tr>';
	}
	else
	{
		commonFun.setLocStorage(storageKey.KcountryData,JSON.stringify(country));
		for(var i=0; i<country.length; i++){
			var index = (pageParams.currentpage - 1)*pageParams.num + (i + 1);
			var cName = country[i].name;
			var cid = country[i].id;

			try {
				var cinfo = decodeURI(country[i].destinationInfo);
			}
            catch(e) {
				var cinfo = country[i].destinationInfo;
			}
			var cinfoStr = cinfo.substring(0,170);
			var copyInfo = "";
			var allInfo = "";
			if(country[i].destinationInfo == null || country[i].destinationInfo == ""){
				copyInfo = "暂无数据";
				allInfo = "暂无数据";
			}else{
				copyInfo = cinfoStr;
				allInfo = cinfo;
			}
			
			html += '<tr>';
			html += '<td class="c_width1">'+index+'</td>';
			html += '<td class="c_width1">'+cName+'</td>';
			html += '<td class="c_width3">'+ copyInfo +'<div style="display:none"><textarea disabled class="showTextarea" rows="10" style="width:100%; height:100%;">'+ allInfo +'</textarea></div></td>';
			html += '<td class="c_width2"><a class="btn btn-info modify" data-id="'+cid+'" data-name="'+cName+'">修改</a></td>';
			html += '<td class="c_width2"><a class="btn btn-default pInfo" data-id="'+cid+'" data-name="'+cName+'">省份列表</a></td>';
			html += '<td class="c_width2">';
			html += '<div class="rem_con">';
			html += '<div class="rem_con_lf"><span class="un_sel" data-id="'+cid+'"></span></div></div>';
			html += '</td>';
			html += '</tr>';
		}
		
	}
	pageParams.tbody.empty().append(html);

	/* 隔行变色 */
	var trL = $("#tbody").find("tr");
	for(var i = 0; i < trL.length; i++){
		if(i%2 == 0){
			trL[i].style.backgroundColor = "#f6f6f6";
		}
	}

	$(".spinner").hide();
	$(".preload").fadeIn();
	
	commonFun.oneSelected("allsel");
	
	$(".modify").on("click",function(){
		pageParams.addAdm = 2;
		commonFun.showModal("修改国家信息");
		countryParams.cid = $(this).attr("data-id");
		var countryData = JSON.parse(commonFun.getLocStorage(storageKey.KcountryData));
		for(var i=0; i<countryData.length; i++)
		{
			if(countryParams.cid == countryData[i].id)
			{
				if(countryData[i].destinationInfo == null)
				{
					$("#textarea").val( "暂无数据" );
				}
				else
				{
					try{
						$("#textarea").val( decodeURI(countryData[i].destinationInfo) );
						countryParams.cinfo = decodeURI(countryData[i].destinationInfo);
					}catch(e){
						$("#textarea").val( countryData[i].destinationInfo );
						countryParams.cinfo = countryData[i].destinationInfo;
					}
					
				}
			}
		}
		$("#countryName").val($(this).attr("data-name"));
		countryParams.cname = $(this).attr("data-name");
	});
	
	/*鼠标悬停景点介绍文本显示*/
	$(".c_width3").on("mouseover",function() {

		$(this).children("div").css("display","block");
	}).on("mouseout",function() {

		$(this).children("div").css("display","none");
	});
	
	/*引入子页面*/
	$(".pInfo").on("click",function(){
		var KcountryId = $(this).attr("data-id");
		commonFun.setLocStorage(storageKey.KcountryId,KcountryId);
		location.href = "get_province.html";
	})
}

commonFun.allSelected("allsel");

commonParams.btnDel.on("click",function(){
    commonFun.delListByIds("countryIds",Api.API_DEL_COUNTRY)
});


$("#coun_search_btn").on("click",function(){

	pageParams.currentpage = 1;
	pageParams.searchParams = {
		"name" : $("#txtPriName").val()
	};
	pageParams.dataApi = Api.API_GET_COUNTRY;
	pageParams.callback = getCountry;
	ModelFun.dataModel();
});

commonParams.btnAdd.on("click",function(){
	$("#countryName").val("");
	$("#textarea").val("");
	commonFun.showModal("添加国家");
});

commonParams.modalSubmit.on("click",function(){

	if($("#countryName").val() == "") {

		window.parent.commonDialog("国家名不能为空！");
		
	}
    else
    {
        var params = {};
		if(pageParams.addAdm == 1)
		{
			params["name"] = $("#countryName").val();
			params["destinationInfo"] = $("#textarea").val();
			meeno.JQueryAjax(Api.API_ADD_COUNTRY,params,commonFun.addSuccessWithModal);
		}
		else
		{
			params["countryId"] = countryParams.cid;
			if(countryParams.cname != $("#countryName").val() || countryParams.cinfo != $("#textarea").val())
			{
				var modData = {};
				modData.name = $("#countryName").val();
				modData.destinationInfo = encodeURI( $("#textarea").val() );
				params["modData"] = JSON.stringify(modData);
				meeno.JQueryAjax(Api.API_MOD_COUNTRY,params,commonFun.modSuccessWithModal);
			}
			else
			{
				window.parent.commonDialog("请填入不同的数据!");
			}
		}
	}
});















