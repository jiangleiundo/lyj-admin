$(function(){
	orangeParams.guideId = commonFun.getLocStorage(storageKey.orangeQuestionID);
	orangeQuestionModel.getQuestionModel(orangeParams.guideId);

    orangeParams.type = GetQueryString("type");
    orangeParams.curPage = GetQueryString("curPage");
    orangeParams.curNum = GetQueryString("curNum");
});

var orangeParams = {
	guideId : null,
	orangeName : null,
    curPage : null,
    curNum : null,
	type : null //如果类型存在而且是1就是从推荐桔子跳过来的，否则是从桔子列表跳来的
};

var orangeQuestionModel = {
	getQuestionModel : function(guideId){

		pageParams.searchParams = {
			guideId : guideId
		};
		pageParams.dataApi = Api.API_GET_GUIDEREPLY;
		pageParams.callback = orangeQuestionModel.orangeQuestionCallback;
		ModelFun.dataModel();
		
		pageParams.txtpage.val(pageParams.currentpage);
		pageParams.pageNum.text(pageParams.totalpage);
		pageParams.setPageNum.val(pageParams.num);
	},
	
	orangeQuestionCallback : function(data){
		var guideReply = data["data"]["guideReply"];
		var count = data["data"]["count"];
		pageParams.totalpage = commonFun.getTotalpages(count,pageParams.num);
		var html = "";
		if(guideReply.length == 0)
		{
			html = '<tr><td colspan="7">暂无数据</td></tr>';
		}
		else
		{
			for(var i in guideReply)
			{
                if(guideReply.hasOwnProperty(i))
                {
                    var index = (pageParams.currentpage - 1)*pageParams.num + parseInt(i) + 1;
                    orangeParams.orangeName = guideReply[0].nickName;

                    //是否被采纳
                    var isAccept = customFun.isRecommand(parseInt(guideReply[i].isAccept));
                    html += '<tr>';
                    html += '<td>'+ index +'</td>';
                    html += '<td>'+ guideReply[i].question +'</td>';
                    html += '<td>'+ guideReply[i].replyContent +'</td>';
                    html += '<td><i class="fa fa-thumbs-o-up"></i> &nbsp;'+ guideReply[i].praiseNum +'</td>';
                    html += '<td><i class="fa fa-thumbs-o-down"></i> &nbsp;'+ guideReply[i].criticismNum +'</td>';
                    html += '<td>'+ isAccept +'</td>';
                    html += '<td>'+ guideReply[i].replyTime +'</td>';
                    html += '</tr>';
                }
			}
		}
		pageParams.tbody.empty().append(html);
		$("#orangeName").text(orangeParams.orangeName);
		$(".spinner").hide();
		$(".preload").fadeIn();
	}
};

$("#btnCancel").on("click",function(){
    if(utilities.checkStringEmpty(orangeParams.type))
    {
        location.href = "orange_list.html?curPage=" + orangeParams.curPage + '&curNum=' + orangeParams.curNum;
    }
    else
    {
        location.href = "orange_recommend.html?curPage=" + orangeParams.curPage + '&curNum=' + orangeParams.curNum;
    }
});


















