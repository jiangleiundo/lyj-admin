$(function(){
	getTravelModel.getModelByParams();
});

var getTravelParams = {
	groupOwner : null,
	groupOwnerId : null,
	state : null
};

var getTravelModel = {
	getModelByParams : function(){

		pageParams.searchParams = {};
		pageParams.dataApi = Api.API_GET_GROUP;
		pageParams.callback = getTravelModel.getTravelCallback;
		ModelFun.dataModel();
		
		pageParams.txtpage.val(pageParams.currentpage);
		pageParams.pageNum.text(pageParams.totalpage);
		pageParams.setPageNum.val(pageParams.num);
	},
	getTravelCallback : function(data){
		var group = data["data"]["group"],
            count = data["data"]["count"],
            html = "";

        pageParams.totalpage = commonFun.getTotalpages(count,pageParams.num);
		if(group.length == 0)
		{
			html = '<tr><td colspan="8">暂无数据</td></tr>';
		}
		else
		{
			for(var i in group)
			{
                if(group.hasOwnProperty(i))
                {
                    guideIdModel.getModelByParams(group[i].id);//获得导游昵称
                    var endLocation = '';
                    var index = (pageParams.currentpage - 1)*pageParams.num + parseInt(i) + 1;
                    html += '<tr>';
                    html += '<td>'+ index +'</td>';
                    html += '<td>'+ group[i].groupName +'</td>';
                    html += '<td>'+ getTravelParams.groupOwner +'</td>';
                    html += '<td>'+ group[i].startTime +'</td>';
                    html += '<td>'+ group[i].endTime +'</td>';
                    html += '<td>'+ group[i].startLocation +'</td>';
                    try
                    {
                        if(group[i].endLocation)
                        {
                            var endLocationArr = JSON.parse(group[i].endLocation);
                            endLocation = endLocationArr.join(","); //join() 方法将数组中的所有元素连接成一个字符串。
                        }
                    }catch(e){
                    }
                    html += '<td>'+ endLocation +'</td>';
                    html += '<td><a class="btn btn-info checkDetials" data-id="'+ group[i].id +'">行程详情</a></td>';
                    html += '</tr>';
                }
			}
		}

		$("#tbody").empty().append(html);

		$(".spinner").hide();
		$(".preload").fadeIn();

		//查看更改行程详情
		$(".checkDetials").on("click",function(){
			getTravelDetialModel.getModelByParams( $(this).attr("data-id") );
			$(".get_travel").hide();
			$(".get_travel_detial").fadeIn();
		})
	}
};

var getTravelDetialModel = {
	getModelByParams : function(groupId){

		page0Params.searchParams = {
			groupId : groupId
		};
		page0Params.dataApi = Api.API_GET_TRAVEL;
		page0Params.callback = getTravelDetialModel.getTravelDetialCallback;
		ModelFun0.dataModel();
		
		page0Params.txtpage.val(page0Params.currentpage);
		page0Params.pageNum.text(page0Params.totalpage);
		page0Params.setPageNum.val(page0Params.num);
	},
	getTravelDetialCallback : function(data){
		var travel = data.data.travel,
		    count = data.data.count,
            html = "";

        page0Params.totalpage = commonFun.getTotalpages(count,page0Params.num);
		for(var i = 0, len = travel.length; i < len; i++)
		{
			var index = (page0Params.currentpage - 1)*page0Params.num + parseInt(i) + 1,
			    dinners = JSON.parse(travel[i].dinners),
			    vehicles = JSON.parse(travel[i].vehicles),
			    scenicSpots = JSON.parse(travel[i].scenicSpots),
			    hotels = JSON.parse(travel[i].hotels),
			    isFreeStyle = travel[i].isFreeStyle,
			    ziyouxing = "";

			if(isFreeStyle == 1)
			{
				ziyouxing = "自由行";
			}
			html += '<div class="teavel_detial_days">';
			html += 	'<div class="dayNum">第&nbsp;<span>'+ index +'</span>&nbsp;天 &nbsp;<span style="color: #1AA97B;">'+ ziyouxing +'</span></div>';
			html += 	'<div class="travel_days_con">';
			for(var k=0; k<vehicles.length;k++)
			{
				html += '<div class="travel_vehicles travel_padding">';
				if(vehicles[k].startTime)
				{
					html += '<div class="lt travel_time"><span class="t_starttime">'+ vehicles[k].startTime +'</span></div>';
				}
				else
				{
					html += '<div class="lt travel_time"><span class="t_starttime">00:00</span></div>';
				}
				if(vehicles[k].startLocation && vehicles[k].icon && vehicles[k].endLocation)
				{
					html += '<div class="lt travel_right">交通: <span class="t_startLocation">'+ vehicles[k].startLocation +'</span>&nbsp;<img height="20"; src="'+ vehicles[k].icon +'"/>&nbsp;<span class="t_endLocation">'+ vehicles[k].endLocation +'</span></div>';
				}
				else
				{
					html += '<div class="lt travel_right">交通: <span class="t_startLocation">暂无数据</span>&nbsp;<img height="20"; src="http://meeno.f3322.net:8082/journey/uploads/pic/daba.png"/>&nbsp;<span class="t_endLocation">暂无数据</span></div>';
				}
				html += '</div>';
			}
			html += 		'<div class="travel_sights">';
			//景点列表
			for(var j=0;j<scenicSpots.length;j++)
			{
				
				html += 		'<div class="travel_sight travel_padding">';
				if(scenicSpots[j].startTime)
				{
					html += '<div class="lt travel_time"><span class="t_starttime">'+ scenicSpots[j].startTime +'</span></div>';
				}
				else
				{
					html += '<div class="lt travel_time"><span class="t_starttime">00:00</span></div>';
				}
				html += '<div class="lt travel_right">';
				if(scenicSpots[j].endLocation)
				{
					var endLocation = scenicSpots[j].endLocation;
					var endLocationArr = endLocation.join();
					html += '<div class="t_sight_name">游览景点: <span>'+ endLocationArr +'</span></div>';
				}
				else
				{
					html += '<div class="t_sight_name">游览景点: <span>暂无景区名</span></div>';
				}
				if(scenicSpots[j].sightInfo)
				{
					var sightInfo = scenicSpots[j].sightInfo;
					for(var f in sightInfo)
					{
                        if(sightInfo.hasOwnProperty(f))
                        {
                            if(sightInfo[f].description)
                            {
                                html += '<div class="t_sight_brief"><span style="font-weight: bold;">'+ f +': </span>'+ sightInfo[f].description +'</div>';
                            }
                            var sPics = sightInfo[f].pics;
                            if(!utilities.checkStringEmpty(sPics))
                            {
                                var sightpic = JSON.parse(sPics);
                                html += '<div class="t_signt_pics">';
                                for(var p=0; p<sightpic.length;p++)
                                {
                                    html += '<img height="100"; src="'+ sightpic[p] +'"/>';
                                }
                                html += '</div>';
                            }
                        }
					}
				}
				else
				{
					html += '<div class="t_sight_brief">暂无景区信息</div>';
				}
				if(scenicSpots[j].remark)
				{
					html += '<div class="t_signt_beizhu">景点备注: <span>'+ scenicSpots[j].remark +'</span></div>';
				}
				html += 			'</div>';
				html += 		'</div>';
			}
			html += '</div>';
			//三餐数据
			html += 		'<div class="travel_breakfast travel_padding">';
			html += 			'<div class="lt travel_time">08:00</div>';
			if(dinners.breakfast.desc)
			{
				html += 			'<div class="lt travel_right"><div t_meal_name>早餐:<span>'+ dinners.breakfast.meal +'</span></div><div t_meal_disc>备注:<span>'+ dinners.breakfast.desc +'</span></div></div>';
			}
			else
			{
				html += 			'<div class="lt travel_right"><div t_meal_name>早餐:<span>'+ dinners.breakfast.meal +'</span></div><div t_meal_disc>备注:<span></span></div></div>';				
			}
			html += 		'</div>';
			html += 		'<div class="travel_lunch travel_padding">';
			html += 			'<div class="lt travel_time">12:00</div>';
			if(dinners.lunch.desc)
			{
				html += 			'<div class="lt travel_right"><div t_meal_name>午餐:<span>'+ dinners.lunch.meal +'</span></div><div t_meal_disc>备注:<span>'+ dinners.lunch.desc +'</span></div></div>';
			}
			else
			{
				html += 			'<div class="lt travel_right"><div t_meal_name>午餐:<span>'+ dinners.lunch.meal +'</span></div><div t_meal_disc>备注:<span></span></div></div>';
			}
			html += 		'</div>';
			html += 		'<div class="travel_supper travel_padding">';
			html += 			'<div class="lt travel_time">18:00</div>';
			if(dinners.dinner.desc)
			{
				html += 			'<div class="lt travel_right"><div t_meal_name>晚餐:<span>'+ dinners.dinner.meal +'</span></div><div t_meal_disc>备注:<span>'+ dinners.dinner.desc +'</span></div></div>';
			}
			else
			{
				html += 			'<div class="lt travel_right"><div t_meal_name>晚餐:<span>'+ dinners.dinner.meal +'</span></div><div t_meal_disc>备注:<span></span></div></div>';
			}
			html += 		'</div>';
			//酒店数据
			html += 		'<div class="travel_hotel travel_padding">';
			html += 			'<div class="lt travel_time">时间自定</div>';
			html += 			'<div class="lt travel_right">';
			if(hotels.hotelName)
			{
				html += '<div class="t_hotel_name">酒店: <span>'+ hotels.hotelName +'</span></div>';
			}
			else
			{
				html += '<div class="t_hotel_name">酒店: <span>无需住宿</span></div>';
			}
			if(hotels.desc)
			{
				html += '<div class="t_hotel_brief">'+ hotels.desc +'</div>';
			}
			if(hotels.hotelImages)
			{
				html += '<div class="t_hotel_pic">';
				for(var c in hotels.hotelImages )//当key和value值一样动态变化时可以这样取出值
				{
                    if(hotels.hotelImages.hasOwnProperty(c))
                    {
                        html += '<img height="100"; src="'+ hotels.hotelImages[c] +'"/>';
                    }
				}
				html += '</div>';
			}
			html += 			'</div>';
			html += 		'</div>';
			html += 		'<div class="checkBtn"><a href="#" class="btn btn-info" data-id="'+ travel[i].id +'">查看行程更改</a></div>';
			html += 	'</div>';
			html += '</div>';
		}

		$("#travel_detial_body").empty().append(html);
		
		
		$(".checkBtn a").on("click",function(){
			getTravelChangeModel.getModelByParams( $(this).attr("data-id") );
			$(".get_travel_detial").hide();
			$(".get_change").fadeIn();
		});
	}
};

//退出详情返回行程列表
$("#btnCancel0").on("click",function(){
	$(".get_travel_detial").hide();
	$(".get_travel").fadeIn();
});


//获得导游昵称
var guideIdModel = {
	getModelByParams : function(groupId){
		var params = {
		groupId : groupId
		};
		meeno.JQueryAjax(Api.API_GET_GROUPGUIDE,params,guideIdModel.getGuideIdCallback);
	},

	getGuideIdCallback : function(data){
		var groupGuide = data["data"]["groupGuide"];
		getTravelParams.groupOwner = groupGuide.nickName;
	}
};

//获得更改行程详情
var getTravelChangeModel = {
	getModelByParams : function(travelId){
		var params = {
			travelId : travelId
		};
		meeno.JQueryAjax(Api.API_GET_TRAVELVOTE,params,getTravelChangeModel.getTravelChangeCallback);
	},

	getTravelChangeCallback : function(data){
		var travelVote = data.data.travelVote;
		if(travelVote && travelVote != "")
		{
			$("#tbody_01").find(".tuan").text(travelVote[0].nickName);
			$("#tbody_02").find(".tuan").text(travelVote[0].theme);
			$("#tbody_03").find(".tuan").text(travelVote[0].publishTime);
			$("#tbody_04").find(".tuan").text(travelVote[0].voteNum);

			var optionList = "",
			    list = "",
			    optionArr = JSON.parse(travelVote[0].options);

			for(var i=0; i<optionArr.length; i++)
			{
				optionList += '<div><span>'+ optionArr[i].num +'</span>人选择 &nbsp;&nbsp;<span>'+ optionArr[i].content +'</span></div>';
			}

			$("#tbody_05").find(".tuan").empty().append(optionList);

			for(var j = 0, len = JSON.parse(travelVote[0].pics).length; j < len; j++)
			{
				if(JSON.parse(travelVote[0].pics).length == 0)
				{
					list = '<img src="../images/moren.png"/>';
				}
				else
				{
					list += '<img src="'+ JSON.parse(travelVote[0].pics)[j] + commonParams.IMG_CUT_H2 +'"/>';
				}
			}

			$("#tbody_06").find(".tuan").empty().append(list);
		}
		else
		{
			$("#tbody1").find(".tuan").text("暂无数据");
		}
	}
};


//行程变更退回上一步
$("#btnCancel").on("click",function(){
	$(".get_change").hide();
	$(".get_travel_detial").fadeIn();
});
