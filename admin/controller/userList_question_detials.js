
$(function(){
	groupParams.questionId = GetQueryString("id");
	groupParams.visitorId = GetQueryString("visitorId");
	groupParams.userName = GetQueryString("name");
    groupParams.curPage = GetQueryString("curPage");
    groupParams.curNum = GetQueryString("curNum");
    groupParams.curPage2 = GetQueryString("curPage2");
    groupParams.curNum2 = GetQueryString("curNum2");

    setParams(groupParams.questionId, pageParams.currentpage, pageParams.num);
});

var groupParams = {
	questionId : null,
	userName : null,
    visitorId : null,
    curPage : null, //跳过来的那一页的当前页
    curPage2 : null, //跳出去的那一页当前页
    curNum : null, //跳过来的分页数
    curNum2 : null //跳出去的分页数
};


/**
 * 问题详情
 * @param questionId 问题ID
 * @param currentpage 当前页
 * @param num 当前分页数
 */
function setParams(questionId, currentpage, num){
    pageParams.searchParams = {
        "questionId" : questionId
    };

    pageParams.dataApi = Api.API_GET_QUESTIONREPLAY;
    pageParams.callback = getQuestionReply;
    ModelFun.dataModel();

    pageParams.txtpage.val(currentpage);
    pageParams.setPageNum.val(num);
}

/**
 * 问题详情回调
 * @param data
 * @param data.data.questionReply.replyContent 回答内容
 * @param data.data.questionReply.replyTime 回答时间
 */
function getQuestionReply(data){
	var questionReply = data["data"]["questionReply"],
	    count = data["data"]["count"],
        html = "";

    pageParams.totalpage = commonFun.getTotalpages(count,pageParams.num);
    pageParams.pageNum.text(pageParams.totalpage);

	if(questionReply.length == 0)
	{
		html = '<tr><td colspan="4">暂无数据</td></tr>';
	}
	else
	{
		for(var i in questionReply) {
            if(questionReply.hasOwnProperty(i))
            {
                var index = (pageParams.currentpage - 1)*pageParams.num + parseInt(i) + 1;
                html += '<tr>';
                html += '<td>'+ index +'</td>';
                html += '<td>'+ questionReply[i].replyContent +'</td>';
                html += '<td>'+ questionReply[i].nickName +'</td>';
                html += '<td>'+ questionReply[i].replyTime +'</td>';
                html += '</tr>';
            }
		}
	}

	$(pageParams.tbody).empty().append(html);

	$(".spinner").hide();
	$(".preload").fadeIn();
}

//返回上一页
$("#btnCancel").on("click",function(){
    location.href = "userList_question.html?id=" + groupParams.visitorId
                                                 + "&curPage=" + groupParams.curPage
                                                 + '&curNum=' + groupParams.curNum
                                                 + "&curPage2=" + groupParams.curPage2
                                                 + '&curNum2=' + groupParams.curNum2
                                                 + '&name=' + groupParams.userName;
});




































