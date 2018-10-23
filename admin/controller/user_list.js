$(function(){
    var curPage = GetQueryString("curPage"),
        curNum = GetQueryString("curNum");

    if(!utilities.checkStringEmpty(curPage))
    {
        pageParams.currentpage = curPage;
        pageParams.num = curNum;
    }

	userListModel.getModelByTime(pageParams.currentpage, pageParams.num);
});

var userListParams = {
	startTime : null,
	endTime : null,
	searchBtn : $("#coun_search_btn")
};

userListParams.searchBtn.on("click", function(){
	userListParams.startTime = $(".search_start").val();
	userListParams.endTime = $(".search_end").val();

	if(userListParams.startTime > userListParams.endTime)
	{
		window.parent.commonDialog("查询时间不正确");
	}
	else
	{
        pageParams.currentpage = 1;
        pageParams.searchParams = {
            startTime : userListParams.startTime,
            endTime : userListParams.endTime
        };

        pageParams.dataApi = Api.API_GET_VISITORSTIME;
        pageParams.callback = userListModel.userListCallback;
        ModelFun.dataModel();
	}
});

var userListModel = {
	getModelByTime : function(currentpage, num){

		pageParams.searchParams = {};
		pageParams.dataApi = Api.API_GET_VISITORSTIME;
		pageParams.callback = userListModel.userListCallback;
		ModelFun.dataModel();
		
		pageParams.txtpage.val(currentpage);
		pageParams.setPageNum.val(num);
	},

    /**
     *
     * @param data
     * @param data.data.visitor.nickName 昵称
     * @param data.data.visitor.gender 性别
     * @param data.data.visitor.platformId 平台
     * @param data.data.visitor.groups 参加过的团
     * @param data.data.visitor.myQuestions 提过的问题
     * @param data.data.visitor.integral 积分
     */
	userListCallback : function(data){

		var visitors = data["data"]["visitor"],
		    count = data["data"]["count"],
            html = "";

        pageParams.totalpage = commonFun.getTotalpages(count, pageParams.num);
        pageParams.pageNum.text(pageParams.totalpage);

		if(visitors.length == 0)
		{
			
			html = '<tr><td colspan="8">暂无数据</td></tr>'
		}
		else
		{
			for(var i in visitors)
			{
                if(visitors.hasOwnProperty(i))
                {
                    var index = (pageParams.currentpage - 1)*pageParams.num + parseInt(i) + 1,
                        o_icon = null;

                    //头像
                    if(utilities.checkStringEmpty(visitors[i].icon)) {
                        o_icon = 'images/default.png';
                    }
                    else
                    {
                        var icon = JSON.parse(visitors[i].icon);
                        o_icon = icon.url + commonParams.IMG_CUT_H;
                    }
                    var userId = visitors[i].userId;
                    var nickName =visitors[i].nickName;
                    var gender = visitors[i].gender;
                    var sex = commonFun.getSex(gender);
                    var phone = visitors[i].platformId;

                    //参加过的团
                    var groups = visitors[i].groups,
                        vGroups = JSON.parse(groups), //解析出数组
                        groupsNum = null;

                    if(vGroups != null && vGroups != ""){
                        groupsNum = vGroups.length;
                    }
                    else
                    {
                        groupsNum = 0;
                    }

                    //提过的问题
                    var myQuestions = visitors[i].myQuestions,
                        vmyQuestions = JSON.parse(myQuestions),
                        myQuestionsNum = null;

                    if(!utilities.checkStringEmpty(vmyQuestions)) {
                        myQuestionsNum = vmyQuestions.length;
                    }
                    else
                    {
                        myQuestionsNum = 0;
                    }

                    //积分
                    var integral = visitors[i].integral; //积分string类型

                    //最近登录时间
                    var lastLoginTime = visitors[i].lastLoginTime;
                    var vLastLoginTime = lastLoginTime == "0"? "暂未登陆": commonFun.userDate(lastLoginTime*1000).split(" ")[0];
                    
                    //注册时间
                    var registerTime2 = visitors[i].registerTime.split(" ")[0];

                    html += '<tr>';
                    html += '<td>'+index+'</td>';
                    html += '<td><img id="uListPic" src="'+o_icon+'"/></td>';
                    html += '<td>'+nickName+'</td>';
                    html += '<td>'+sex+'</td>';
                    html += '<td>'+phone+'</td>';
                    html += '<td><a class="btn btn-info ugroup" data-id="'+ userId +'" data-num="'+ groupsNum +'">'+groupsNum+'</a></td>';
                    html += '<td><a class="btn btn-info uquestion" data-id="'+ userId +'" data-name="'+ visitors[i].nickName +'" data-num="'+ myQuestionsNum +'">'+myQuestionsNum+'</a></td>';
                    html += '<td><a class="btn btn-info uguide" data-id="'+ userId +'">咨询详情</a></td>';
                    html += '<td><a class="btn btn-info uintegral" data-id="'+ userId +'" data-name="'+ visitors[i].nickName +'">'+integral+'</a></td>';
                    html += '<td>'+registerTime2+'</td>';
                    html += '<td>'+vLastLoginTime+'</td>';
                    html += '</tr>';
                }
			}
		}
		pageParams.tbody.empty().append(html);
		$(".spinner").hide();
		$(".preload").fadeIn();

        //查看积分
		$(".uintegral").on("click",function(){
			var judgeNum = $(this).attr("data-num");
			if(judgeNum == 0){
				window.parent.commonDialog("暂无数据");
			}else{
				var id = $(this).attr("data-id");
				var name = $(this).attr("data-name");
				location.href = "userList_integral.html?id=" + id + "&curPage=" + pageParams.txtpage.val() + '&curNum=' + pageParams.setPageNum.val() + "&name=" + encodeURI(name);
			}
		});

        //跟过的团
		$(".ugroup").on("click",function(){
			var judgeNum = $(this).attr("data-num");
			if(judgeNum == 0){
				window.parent.commonDialog("暂无数据");
			}else{
				var id = $(this).attr("data-id");
				var name = $(this).attr("data-name");
				location.href = "userList_group.html?id=" + id + "&curPage=" + pageParams.txtpage.val() + '&curNum=' + pageParams.setPageNum.val();
			}
		});

        //提过的问题
		$(".uquestion").on("click",function(){
			var judgeNum = $(this).attr("data-num");
			if(judgeNum == 0){
				window.parent.commonDialog("暂无数据");
			}else{
				var id = $(this).attr("data-id");
				var name = $(this).attr("data-name");
				location.href = "userList_question.html?id=" + id + "&curPage=" + pageParams.txtpage.val() + '&curNum=' + pageParams.setPageNum.val() + "&name=" + encodeURI(name);
			}
		});

        //咨询过的导游
		$(".uguide").on("click",function(){
			var id = $(this).attr("data-id");
			var name = $(this).attr("data-name");
			location.href = "userList_myguides.html?id=" + id + "&curPage=" + pageParams.txtpage.val() + '&curNum=' + pageParams.setPageNum.val() + "&name=" + encodeURI(name);
		})
	}
};
