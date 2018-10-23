$(function(){
	pageParams.countryId = commonFun.getLocStorage(storageKey.KcountryId);

	pageParams.dataApi = Api.API_GET_PROVINCE;
	pageParams.searchParams = {
		"countryId" : pageParams.countryId
	};
	pageParams.callback = getProvince;
	ModelFun.dataModel();
	
	pageParams.txtpage.val(pageParams.currentpage);
	pageParams.pageNum.text(pageParams.totalpage);
	pageParams.setPageNum.val(pageParams.num);
	
});
var provinceParams = {
	countryName : $("#countryName"),
	cid : null,
	cname : null
};

//获取省份回调
function getProvince(data)
{
	var province = data["data"]["province"];
	var count = data["data"]["count"];
	pageParams.totalpage = commonFun.getTotalpages(count,pageParams.num);
	var html = "";
	if(province.length == 0)
	{
		html += '<tr><td colspan = 8>暂无数据</td></tr>';
	}
	else
	{
		for(var i=0; i<province.length; i++){
			var index = (pageParams.currentpage - 1)*pageParams.num + (i + 1);
			var cName = province[i].name;
			var cid = province[i].id;
			
			html += '<tr>';
			html += '<td>'+index+'</td>';
			html += '<td>'+cName+'</td>';
			html += '<td><a class="btn btn-info modify" data-id="'+cid+'" data-name="'+cName+'">修改</a></td>';
			html += '<td><a class="btn btn-default pInfo" data-id="'+cid+'" data-name="'+cName+'">城市列表</a></td>';
			html += '<td>';
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
		commonFun.showModal("修改省份名");
		$("#countryName").val($(this).attr("data-name"));
		provinceParams.cid = $(this).attr("data-id");
		provinceParams.cname = $(this).attr("data-name");
	});
	
	/*引入子页面*/
	$(".pInfo").on("click",function(){
		var KprovinceId = $(this).attr("data-id");
		commonFun.setLocStorage(storageKey.KprovinceId,KprovinceId);
		location.href = "get_city.html";
	})
}

commonFun.allSelected("allsel");


commonParams.btnDel.on("click",function(){
    commonFun.delListByIds("provinceIds",Api.API_DEL_PROVINCE)
});

//后退一步
$("#btnCancel").on("click",function(){
	location.href = "get_country.html";
});

$("#coun_search_btn").on("click",function(){
	pageParams.tbody.empty();

	pageParams.currentpage = 1;
	pageParams.searchParams = {
		"name" : $("#txtPriName").val(),
		"countryId" : pageParams.countryId
 	};
	pageParams.dataApi = Api.API_GET_PROVINCE;
	pageParams.callback = getProvince;
	ModelFun.dataModel();
});

commonParams.btnAdd.on("click",function(){
	$("#countryName").val("");
	commonFun.showModal("添加省份");
});

commonParams.modalSubmit.on("click",function(){
	if($("#countryName").val() == ""){
		
		window.parent.commonDialog("省份名不能为空！");
		
	}else{
		
		if(pageParams.addAdm == 1){
			var params = {};
			params["countryId"] = pageParams.countryId;
			params["name"] = $("#countryName").val();
			meeno.JQueryAjax(Api.API_ADD_PROVINCE,params,commonFun.addSuccessWithModal);
		}else{
			var params = {};
			params["provinceId"] = provinceParams.cid;
			if(provinceParams.cname != $("#countryName").val()){
				params["modData"] = '{"name" :"' + $("#countryName").val() + '" }';
				meeno.JQueryAjax(Api.API_MOD_PROVINCE,params,commonFun.modSuccessWithModal);
			}else{
				window.parent.commonDialog("请填入不同的数据!");
			}
		}
	}
});
















