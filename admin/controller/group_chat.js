  $(function(){
      groupChatModel.getModelByParams();
});

var groupChatParams = {
	groupOwner : null,
	groupId : null,
	groupOwnerId : null,
	groupVisterId : null
  };

var groupChatModel = {
	getModelByParams : function(){

		pageParams.searchParams = {};
		pageParams.dataApi = Api.API_GET_GROUP;
		pageParams.callback = groupChatModel.groupChatCallback;
		ModelFun.dataModel();
		
		pageParams.txtpage.val(pageParams.currentpage);
		pageParams.pageNum.text(pageParams.totalpage);
		pageParams.setPageNum.val(pageParams.num);	
	},
    groupChatCallback : function(data){
		var group = data["data"]["group"],
		    count = data["data"]["count"],
            html = "";

        pageParams.totalpage = commonFun.getTotalpages(count,pageParams.num);

		if(group.length == 0)
		{
			html = '<tr<td colspan="9">暂无数据</td></tr>';
		}
		else
		{
			for(var i in group)
			{
                if(group.hasOwnProperty(i))
                {
                    var index = (pageParams.currentpage - 1)*pageParams.num + parseInt(i) + 1,
                        groupIcon = null,
                        icon = null;

                    //团头像
                    if( !group[i].groupIcon || group[i].groupIcon == null)
                    {
                        groupIcon = 'images/group_img.png';
                    }
                    else
                    {
                        icon = JSON.parse(group[i].groupIcon);
                        groupIcon = icon.url + commonParams.IMG_CUT_H;
                    }

                    //创建人
                    guideIdModel.getModelByParams(group[i].id);

                    //开始时间
                    var startTime = group[i].startTime;
                    var sTime = startTime.split(" ")[0];

                    //结束时间
                    var endTime = group[i].endTime;
                    var eTime = endTime.split(" ")[0];

                    //团人数
                    var members = group[i].members,
                        memberArr = JSON.parse(members),
                        memberNum = null;

                    if(!utilities.checkStringEmpty(memberArr))
                    {
                        memberNum = memberArr.length;
                    }
                    else
                    {
                        memberNum = 0;
                    }
                    html += '<tr>';
                    html += '<td>'+ index +'</td>';
                    html += '<td>'+ group[i].groupName +'</td>';
                    html += '<td><img src="'+ groupIcon +'"/></td>';
                    html += '<td>'+ groupChatParams.groupOwner +'</td>';
                    html += '<td>'+ sTime +'</td>';
                    html += '<td>'+ eTime +'</td>';
                    html += '<td><a href="#" class="btn btn-info checkNum" data-id="'+ group[i].groupOwner +'" data-gid="'+ group[i].id +'" data-num="'+ memberNum +'">'+ memberNum +'</a></td>';
                    html += '<td><a href="#" class="btn btn-info safeTips" data-gid="'+ group[i].id +'">安全提醒</a></td>';
                    html += '<td><a href="#" class="btn btn-info travelTips" data-gid="'+ group[i].id +'">行程通知</a></td>';
                    html += '</tr>';
                }
			}
		}

		$("#tbody").empty().append(html);
		$(".spinner").hide();
		$(".preload").fadeIn();

		//点击查看团员
		$(".checkNum").on("click",function(){
			var mNum = $(this).attr("data-num");
			if(mNum == 0)
			{
				window.parent.commonDialog("暂无数据")
			}
			else
			{
				$(".group_chat").hide();
				$(".group_notice").hide();
				$(".group_chat0").fadeIn();
				groupChatParams.groupOwnerId = $(this).attr("data-id");
				groupChatParams.groupId = $(this).attr("data-gid");
				groupMembersModel.getModelByParams( $(this).attr("data-gid") );
			}
		});

		//查看安全提醒
		$(".safeTips").on("click",function(){
			$(".group_chat").hide();
			$(".group_chat0").hide();
			$(".group_notice").fadeIn();
			getNoticeModel.getModelByParams(1 , $(this).attr("data-gid"));
		});

		//查看行程通知
		$(".travelTips").on("click",function(){
			$(".group_chat").hide();
			$(".group_chat0").hide();
			$(".group_notice").fadeIn();
			getNoticeModel.getModelByParams(0 , $(this).attr("data-gid"));
		});
	}
};

//退出团员列表返回团列表
$("#btnCancel").on("click",function(){
	$(".group_chat0").hide();
	$(".group_chat").fadeIn();
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
		groupChatParams.groupOwner = groupGuide.nickName;
	}
};

//获得团成员信息
var groupMembersModel = {
	getModelByParams : function(groupId){

		page0Params.searchParams = {
			groupId : groupId
		};
		page0Params.dataApi = Api.API_GET_GROUPVISITOR;
		page0Params.callback = groupMembersModel.groupMemberCallback;
		ModelFun0.dataModel();
		
		page0Params.txtpage.val(page0Params.currentpage);
		page0Params.pageNum.text(page0Params.totalpage);
		page0Params.setPageNum.val(page0Params.num);
	},
	groupMemberCallback : function(data){
		var groupVisitor = data["data"]["groupVisitor"],
		    count = data["data"]["count"],
            html = "";

        page0Params.totalpage = commonFun.getTotalpages(count,page0Params.num);

		if(groupVisitor.length == 0)
		{
			html = '<tr><td colspan="6">暂无数据</td></tr>';
		}
		else
		{
			for(var i in groupVisitor)
			{
                if(groupVisitor.hasOwnProperty(i))
                {
                    var index = (page0Params.currentpage - 1)*page0Params.num + parseInt(i) + 1,
                        visitorIcon = null,
                        icon = null;

                    //头像
                    if( !groupVisitor[i].icon || groupVisitor[i].icon == null)
                    {
                        visitorIcon = 'images/default.png';
                    }
                    else
                    {
                        icon = JSON.parse(groupVisitor[i].icon);
                        visitorIcon = icon.url + commonParams.IMG_CUT_H;
                    }

                    //性别
                    var sex = commonFun.getSex(groupVisitor[i].gender);

                    html += '<tr>';
                    html += '<td>'+ index +'</td>';
                    html += '<td><img height="60" src="'+ visitorIcon +'"/></td>';
                    html += '<td>'+ groupVisitor[i].nickName +'</td>';
                    html += '<td>'+ sex +'</td>';
                    html += '<td>'+ groupVisitor[i].integral +'</td>';
                    html += '<td><a class="btn btn-info groupChat" data-id="'+ groupVisitor[i].userId +'">群聊记录</a></td>';
                    html += '</tr>';
                }
			}
		}

		$("#tbody0").empty().append(html);
		$(".groupChat").on("click", function(){
			$(".group_chat0").hide();
			$(".group_chat_list").fadeIn();
			groupChatParams.groupVisterId = $(this).attr("data-id");
			getGroupChatModel.getModelByParams(groupChatParams.groupVisterId, groupChatParams.groupId, "groupchat");
		})
	}
};

//退出群聊列表返回团列表
$("#btnCancel00").on("click",function(){
	var $getIntegral = $("#get_integral");

    $getIntegral.addClass("tab_active").siblings("div").removeClass("tab_active");
    $getIntegral.siblings("span").stop().animate({left:0},"fast");
	$(".group_chat_list").hide();
	$(".group_chat0").fadeIn();
});

//点击切换聊天记录
$("#get_integral").on("click", function(){
	getGroupChatModel.getModelByParams( groupChatParams.groupVisterId, groupChatParams.groupId, "groupchat");
});

$("#take_integral").on("click",function(){
	getGroupChatModel.getModelByParams( groupChatParams.groupOwnerId, groupChatParams.groupId, "groupchat");
});

//获取当前团员对群的聊天记录或者团导游的聊天记录
var getGroupChatModel = {
	getModelByParams : function(sender, toSender, chatType){

		page2Params.searchParams = {
			sender : sender,
			toSender : toSender,
			chatType : chatType
		};
		page2Params.dataApi = Api.API_GET_CHATMESSAGE;
		page2Params.callback = getGroupChatModel.getGroupChatCallback;
		ModelFun2.dataModel();
		
		page2Params.txtpage.val(page2Params.currentpage);
		page2Params.pageNum.text(page2Params.totalpage);
		page2Params.setPageNum.val(page2Params.num);
	},
	getGroupChatCallback : function(data){
		var chatMessage = data.data.chatMessage,
		    count = data.data.count,
            html = "";

        page2Params.totalpage = commonFun.getTotalpages(count,page2Params.num);

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
                    var index = parseInt(i) + 1 + (page2Params.currentpage - 1)*page2Params.num,
                        msgtype = commonFun.getMessageType(chatMessage[i].type);

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

		$("#tbody2").empty().append(html);

		/*鼠标悬停景点介绍文本显示*/
        var $groupchatImg = $(".groupchatImg");
        $groupchatImg.on("mouseover",function(){
			$(this).find("div").css("display","block");
		});
        $groupchatImg.on("mouseout",function(){
			$(this).find("div").css("display","none");
		})
	}
};



//退出通知列表返回团列表
$("#btnCancel0").on("click",function(){
	$(".group_chat0").hide();
	$(".group_notice").hide();
	$(".group_chat").fadeIn();
});

//获取通知列表
var getNoticeModel = {
	getModelByParams : function(type, groupId){

		page1Params.searchParams = {
			type : type,
			groupId : groupId
		};

		page1Params.dataApi = Api.API_GET_NOTICE;
		page1Params.callback = getNoticeModel.getNoticeCallback;
		ModelFun1.dataModel();
		
		page1Params.txtpage.val(page1Params.currentpage);
		page1Params.pageNum.text(page1Params.totalpage);
		page1Params.setPageNum.val(page1Params.num);
	},
	getNoticeCallback : function(data){
		var notice = data.data.notice,
		    count = data.data.count,
            html = "";

        page1Params.totalpage = commonFun.getTotalpages(count, page1Params.num);

		if(notice.length == 0)
		{
			html = '<tr><td colspan="5">暂无数据</td></tr>';
		}
		else
		{
			for(var i in notice)
			{
                if(notice.hasOwnProperty(i))
                {
                    var index = parseInt(i) + 1 + (page1Params.currentpage - 1)*page1Params.num;
                    html += '<tr>';
                    html += '<td>'+ index +'</td>';
                    html += '<td>'+ notice[i].nickName +'</td>';
                    html += '<td>'+ notice[i].createTime +'</td>';
                    html += '<td>'+ notice[i].noticeContent +'</td>';
                    html += '<td><a class="btn btn-info readNum" data-id="'+ notice[i].id +'">阅读详情</a></td>';
                    html += '</tr>';
                }
			}
		}

		$("#tbody1").empty().append(html);

		$(".readNum").on("click",function(){
			$(".group_notice").hide();
			$(".group_chat_read_list").fadeIn();
			getNoticeReadModel.getModelByParams( $(this).attr("data-id") );
		})
	}
};

//退出阅读详情返回通知列表
$("#btnCancel000").on("click",function(){
	$(".group_chat_read_list").hide();
	$(".group_notice").fadeIn();
});

//获取是否已经阅读
var getNoticeReadModel = {
	getModelByParams : function(noticeId){
		var params = {
			noticeId : noticeId
		};
		meeno.JQueryAjax(Api.API_GET_NOTICEREAD, params, getNoticeReadModel.getNoticeReadCallback);
	},
	getNoticeReadCallback : function(data){
		var noticeRead = data.data.noticeRead,
		    html = "";

		if(noticeRead.length == 0)
		{
			html = '<tr><td colspan="3">暂无数据</td></tr>';
		}
		else
		{
			for(var i = 0, len = noticeRead.length; i < len; i++)
			{
				var index = parseInt(i) + 1;

				//是否已经阅读
				var isRead = customFun.isRecommand( noticeRead[i].type );
				html += '<tr>';
				html += '<td>'+ index +'</td>';
				html += '<td>'+ noticeRead[i].name +'</td>';
				html += '<td>'+ isRead +'</td>';
				html += '</tr>';
			}
		}
		$("#tbody3").empty().append(html);
	}
};










