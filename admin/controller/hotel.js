$(function(){
	pageParams.searchParams = {};
	getHotelParams();
});

function getHotelParams(){
	pageParams.dataApi = Api.API_GET_HOTEL;
	pageParams.callback = getHotelModel;
	ModelFun.dataModel();
	
	pageParams.txtpage.val(pageParams.currentpage);
	pageParams.pageNum.text(pageParams.totalpage);
	pageParams.setPageNum.val(pageParams.num);
}
function getHotelModel(data){
	if(data.err == 0)
	{
		$(".spinner").hide();
		$(".preload").fadeIn();
		var hotel = data.data.hotel;
		var count = data.data.count;
		pageParams.totalpage = commonFun.getTotalpages(count, pageParams.num);
		var html = "";
		if(hotel.length == 0)
		{
			html += '<tr><td colspan = 8>暂无数据</td></tr>';
		}
		else
		{
			for(var i = 0; i < hotel.length; i++)
			{
				var index = (pageParams.currentpage - 1)*pageParams.num + (i + 1);
				if(hotel[i].desc)
				{
					var desc = hotel[i].desc;
					var desc_clip = desc.substring(0,70);
				}
				else
				{
					var desc = "暂无数据";
					var desc_clip = "暂无数据";
				}
				html += '<tr>';
				html += '<td class="jd-width-1">'+ index +'</td>';
				html += '<td class="jd-width-2">'+ hotel[i].hotelName +'</td>';
				if(hotel[i].hotelImages)
				{
					var hotelPics = JSON.parse(hotel[i].hotelImages);
					if(hotelPics.length != 0)
					{
						html += '<td class="jd-width-3"><img src="'+ hotelPics[0] +'?imageView/1/w/110/h/70"/></td>';
					}
					else{
						html += '<td class="jd-width-3"><img src="'+ pageParams.defaultHotelImg +'?imageView/1/w/110/h/70"/></td>';
					}
				}
				else
				{
					html += '<td class="jd-width-3"><img src="'+ pageParams.defaultHotelImg +'?imageView/1/w/110/h/70"/></td>';
				}
				html += '<td class="jd-width-4">'+ desc_clip +'<div class="jd-txt" style="display:none"><textarea disabled class="showTextarea" rows="10" style="width:100%; height:100%;">'+ desc +'</textarea></div></td>';
				html += '<td class="jd-width-1"><a class="btn btn-info modify" data-id="'+ hotel[i].id +'" data-desc="'+ desc +'" data-name="'+ hotel[i].hotelName +'">修改</a></td>';
				html += '<td class="jd-width-1">';
				html += '<div class="rem_con">';
				html += '<div class="rem_con_lf"><span class="un_sel" data-id="'+ hotel[i].id +'"></span></div></div>';
				html += '</td>';
				html += '</tr>';
			}	
		}
		
		pageParams.tbody.empty().append(html);
		//单选全选
		commonFun.oneSelected("allsel");
		commonFun.allSelected("allsel");
		/* 隔行变色 */
		var trL = $("#tbody tr");
		for(var i=0; i<trL.length; i++)
		{
			if(i%2 == 0)
			{
				trL[i].style.backgroundColor = "#f6f6f6";
			}
		}
		/*鼠标悬停景点介绍文本显示*/
		$(".jd-width-4").on("mouseover",function(){
			$(this).children("div").css("display","block");
		});
		$(".jd-width-4").on("mouseout",function(){
			$(this).children("div").css("display","none");
		});
		//修改酒店信息
		$(".modify").on("click",function(){
			var hotelID = $(this).attr("data-id");
			location.href = "hotel_detial.html";  //带id传递
			commonFun.setLocStorage(storageKey.hotelID, hotelID);
		})
	}
}


//搜索酒店
$("#coun_search_btn").on("click",function(){
	pageParams.tbody.empty();
	pageParams.searchParams = {
		"hotelName" : $("#txtPriName").val()
	};
	getHotelParams();
});
//删除酒店
commonParams.btnDel.on("click",function(){
    commonFun.delListByIds("hotelId",Api.API_DEL_HOTEL);
});
//添加酒店
commonParams.btnAdd.on("click",function(){
	location.href = "hotel_detial.html";
	commonFun.setLocStorage(storageKey.hotelID, "");
});








