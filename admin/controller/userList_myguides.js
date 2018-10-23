$(function(){
	groupParams.visitorId = GetQueryString("id");
    groupParams.curPage = GetQueryString("curPage");
    groupParams.curNum = GetQueryString("curNum");

	pageParams.searchParams = {
		"visitorId" : groupParams.visitorId
	};
	pageParams.dataApi = Api.API_GET_CHATRECORD;
	pageParams.callback = getChatRecord;
	ModelFun.dataModel();
	
	pageParams.txtpage.val(pageParams.currentpage);
	pageParams.pageNum.text(pageParams.totalpage);
	pageParams.setPageNum.val(pageParams.num);
});

var groupParams = {
	visitorId : null,
	orangeId : null,
    curPage : null,
    curNum : null
};

/**
 * 聊天记录
 * @param data
 * @param data.data.chatRecord.recordTime 聊天时刻
 */
function getChatRecord(data){
	var chatRecord = data["data"]["chatRecord"],
	    count = data["data"]["count"],
        html = "";

    pageParams.totalpage = commonFun.getTotalpages(count, pageParams.num);

	if(chatRecord.length == 0)
	{
		html = '<tr><td colspan="4">暂无数据</td></tr>';
	}
	else
	{
		for(var i in chatRecord){
            if(chatRecord.hasOwnProperty(i))
            {
                var index = (pageParams.currentpage - 1)*pageParams.num + parseInt(i) + 1;

                html += '<tr>';
                html += '<td>'+ index +'</td>';
                html += '<td>'+ chatRecord[i].nickName +'</td>';
                html += '<td>'+ chatRecord[i].recordTime +'</td>';
                html += '<td><a class="btn btn-info checkChat" data-id="'+ chatRecord[i].userId +'">聊天记录</a></td>';
                html += '</tr>';
            }
		}
	}

	$(pageParams.tbody).empty().append(html);
	$(".spinner").hide();
	$(".preload").fadeIn();

	$(".checkChat").on("click",function(){
		$(".my_chat_guide").hide();
		$(".chat_detials").fadeIn();
		groupParams.orangeId = $(this).attr("data-id");
		getChatGuideModel.getModelByParams(groupParams.visitorId, groupParams.orangeId, "chat");
	})
}

//返回列表
$("#btnCancel").on("click",function(){
	location.href = "user_list.html?curPage=" + groupParams.curPage + '&curNum=' + groupParams.curNum;
});

/**
 * 聊天详情
 * @type {{getModelByParams: Function, getChatGuideCallback: Function}}
 */
var getChatGuideModel = {
	getModelByParams : function(sender, toSender, chatType){

		page0Params.searchParams = {
			sender : sender,
			toSender : toSender,
			chatType : chatType
		};
		page0Params.dataApi = Api.API_GET_CHATMESSAGE;
		page0Params.callback = getChatGuideModel.getChatGuideCallback;
		ModelFun0.dataModel();
		
		page0Params.txtpage.val(page0Params.currentpage);
		page0Params.pageNum.text(page0Params.totalpage);
		page0Params.setPageNum.val(page0Params.num);
	},

    /**
     * 聊天详情回调
     * @param data
     * @param data.data.chatMessage 消息
     * @param data.data.count 计数
     * @param data.data.timesTamp 时间戳
     */
	getChatGuideCallback : function(data){
		var chatMessage = data.data.chatMessage,
		    count = data.data.count,
            html = "";

        page0Params.totalpage = commonFun.getTotalpages(count, page0Params.num);

		if(chatMessage.length == 0)
		{
			html = '<tr><td colspan="5">暂无数据</td></tr>';
		}
		else
		{
			for(var i in chatMessage)
			{
                if(chatMessage.hasOwnProperty(i))
                {
                    var index = (page0Params.currentpage - 1)*page0Params.num + parseInt(i) + 1;
                    //消息类型
                    var msgtype = commonFun.getMessageType(chatMessage[i].type);

                    html += '<tr>';
                    html += '<td>'+ index +'</td>';
                    html += '<td>'+ chatMessage[i].nickName +'</td>';
                    html += '<td>'+ msgtype +'</td>';

                    //显示消息方式
                    if(chatMessage[i].type == "txt")
                    {
                        html += '<td>'+ chatMessage[i].msg +'</td>';
                    }
                    else if(chatMessage[i].type == "img")
                    {
                        html += '<td class="groupchatImg"><img height="70" src="'+ chatMessage[i].url +'"/><div style="display:none;"><img width="250" src="'+ chatMessage[i].url +'"/></div></td>';
                    }
                    else
                    {
                        html += '<td><audio src="'+ chatMessage[i].url +'" controls="controls">Your browser does not support the audio element.</audio></td>';
                    }
                    html += '<td>'+ commonFun.userDate(chatMessage[i].timesTamp) +'</td>';
                    html += '</tr>';
                }
			}
			
		}

		$("#tbody0").empty().append(html);

		/*鼠标悬停景点介绍文本显示*/
        var $groupChatImg = $(".groupchatImg");
        $groupChatImg.on("mouseover", function(){

			$(this).find("div").css("display","block");
		});

        $groupChatImg.on("mouseout", function(){

			$(this).find("div").css("display","none");
		})
	}
};

//点击返回咨询过的导游列表
$("#btnCancel00").on("click",function(){

	//退出时游客/导游聊天记录切换到默认状态
    var $getIntergral = $("#get_integral");
    $getIntergral.addClass("tab_active").siblings("div").removeClass("tab_active");
    $getIntergral.siblings("span").stop().animate({left:0},"fast");

	$(".chat_detials").hide();
	$(".my_chat_guide").fadeIn();
});

//点击切换聊天记录
$("#get_integral").on("click",function(){
	getChatGuideModel.getModelByParams(groupParams.visitorId,groupParams.orangeId,"chat");
});
$("#take_integral").on("click",function(){
	getChatGuideModel.getModelByParams(groupParams.orangeId,groupParams.visitorId,"chat");
});








