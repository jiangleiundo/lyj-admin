$(function(){
	groupParams.visitorId = GetQueryString("id");
    groupParams.curPage = GetQueryString("curPage");
    groupParams.curNum = GetQueryString("curNum");

    groupParams.curPage2 = GetQueryString("curPage2");
    groupParams.curNum2 = GetQueryString("curNum2");

    //如果是从列表跳进来
    if(!utilities.checkStringEmpty(groupParams.curPage))
    {
        var str = String(window.location);
        groupParams.userName = decodeURI( str.split("=")[4] );//获取跳转页面前用户名
    }

    //如果是从详情跳进来
    if(!utilities.checkStringEmpty(groupParams.curPage2))
    {
        groupParams.userName = decodeURI(GetQueryString("name"));
    }

    if(!utilities.checkStringEmpty(groupParams.curPage2))
    {
        pageParams.currentpage = groupParams.curPage2;
        pageParams.num = groupParams.curNum2;
    }

	setParams(groupParams.visitorId, pageParams.currentpage, pageParams.num);
});

var groupParams = {
	visitorId : null,
    userName : null,
    curPage : null, //跳过来的那一页的当前页
    curPage2 : null, //跳出去的那一页当前页
    curNum : null, //跳过来的分页数
    curNum2 : null //跳出去的分页数
};

/**
 * 用户提出问题
 * @param visitorId 用户ID
 * @param currentpage 当前页
 * @param num 当前分页数
 */
function setParams(visitorId, currentpage, num) {
    pageParams.searchParams = {
        "visitorId" : visitorId
    };

    pageParams.dataApi = Api.API_GET_VISITORQUESTION;
    pageParams.callback = getVisitorQuestion;
    ModelFun.dataModel();

    pageParams.txtpage.val(currentpage);
    pageParams.setPageNum.val(num);
}

/**
 * 用户提出的问题回调
 * @param data
 * @param data.data.visitorQuestion.questionTime 提问时间
 * @param data.data.visitorQuestion.questionContent 提问内容
 */
function getVisitorQuestion(data){
	var visitorQuestion = data["data"]["visitorQuestion"],
	    count = data["data"]["count"],
        html = "";

    pageParams.totalpage = commonFun.getTotalpages(count,pageParams.num);
    pageParams.pageNum.text(pageParams.totalpage);

	if(visitorQuestion.length == 0)
    {
		html = '<tr><td colspan="4">暂无数据</td></tr>';
	}
    else
    {
		for(var i in visitorQuestion) {
            if(visitorQuestion.hasOwnProperty(i))
            {
                var index = (pageParams.currentpage - 1)*pageParams.num + parseInt(i) + 1,
                    sTime = visitorQuestion[i].questionTime,
                    startTime = sTime.split(" ")[0];

                html += '<tr>';
                html += '<td>'+ index +'</td>';
                html += '<td>'+ groupParams.userName +'</td>';
                html += '<td>'+ visitorQuestion[i].questionContent +'</td>';
                html += '<td>'+ startTime +'</td>';
                html += '<td><a class="btn btn-info checkBtn" data-id="'+ visitorQuestion[i].id +'">查看详情</a></td>';
                html += '</tr>';
            }
		}
	}

	$(pageParams.tbody).empty().append(html);

	$(".checkBtn").on("click",function(){
		var questionId = $(this).attr("data-id");
		location.href = "userList_question_detials.html?id=" + questionId
                                                             + "&visitorId=" + groupParams.visitorId
                                                             + "&curPage=" + groupParams.curPage
                                                             + '&curNum=' + groupParams.curNum
                                                             + "&curPage2=" + pageParams.txtpage.val()
                                                             + '&curNum2=' + pageParams.setPageNum.val()
                                                             + "&name=" + encodeURI(groupParams.userName);
	});

	$(".spinner").hide();
	$(".preload").fadeIn();
}

$("#btnCancel").on("click",function(){
	location.href = "user_list.html?curPage=" + groupParams.curPage + '&curNum=' + groupParams.curNum;
});
