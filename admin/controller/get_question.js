$(function(){
	getQuestionModel.getModelByParams();
});

var getQuestionModel = {
	getModelByParams : function(){

		pageParams.searchParams = {};
		pageParams.dataApi = Api.API_GET_QUESTION;
		pageParams.callback = getQuestionModel.getQuestionCallback;
		ModelFun.dataModel();
		
		pageParams.txtpage.val(pageParams.currentpage);
		pageParams.pageNum.text(pageParams.totalpage);
		pageParams.setPageNum.val(pageParams.num);
	},
	getQuestionCallback : function(data){
		var question = data.data.question,
		    count = data.data.count,
            html = "";

        pageParams.totalpage = commonFun.getTotalpages(count,pageParams.num);

        if(question.length == 0)
		{
            html = '<tr><td colspan="5">暂无数据</td></tr>';
		}
		else
		{
			commonFun.setLocStorage(storageKey.KquestionData,JSON.stringify(question));
			for(var i in question)
			{
                if(question.hasOwnProperty(i))
                {
                    var index = parseInt(i) + 1 + (pageParams.currentpage - 1)*pageParams.num;
                    html += '<tr>';
                    html += '<td>'+ index +'</td>';
                    html += '<td>'+ question[i].questionContent +'</td>';
                    html += '<td>'+ question[i].nickName +'</td>';
                    html += '<td>'+ question[i].questionTime +'</td>';
                    html += '<td><a class="btn btn-info checkDetials" data-id="'+ question[i].id +'">查看详情</a></td>';
                    html += '</tr>';
                }
			}
		}
		pageParams.tbody.empty();
		pageParams.tbody.append(html);
		$(".spinner").hide();
		$(".preload").show();
		$(".checkDetials").on("click",function(){
			getQuestionReplyModel.getModelByParams( $(this).attr("data-id") );
			$(".get_question").hide();
			$(".get_answer").fadeIn();
		})
	}
};

$("#btnCancel").on("click",function(){
	$(".get_answer").hide();
	$(".get_question").fadeIn();
});

var getQuestionReplyModel = {
	getModelByParams : function(questionId){

		page0Params.searchParams = {
			questionId : questionId
		};
		page0Params.dataApi = Api.API_GET_QUESTIONREPLY;
		page0Params.callback = getQuestionReplyModel.getQuestionReplyCallback;
		ModelFun0.dataModel();
		
		page0Params.txtpage.val(page0Params.currentpage);
		page0Params.pageNum.text(page0Params.totalpage);
		page0Params.setPageNum.val(page0Params.num);
	},
	getQuestionReplyCallback : function(data){
		var questionReply = data["data"]["questionReply"],
		    count = data["data"]["count"],
            html = '';

        page0Params.totalpage = commonFun.getTotalpages(count,page0Params.num);

		if(questionReply.length == 0)
		{
			html = '<tr><td colspan="7">暂无数据</td></tr>';
		}
		else
		{
			for(var i in questionReply)
			{
                if(questionReply.hasOwnProperty(i))
                {
                    var index = (page0Params.currentpage - 1)*page0Params.num + parseInt(i) + 1;
                    //是否被采纳
                    var isAccept = customFun.isRecommand(parseInt(questionReply[i].isAccept));
                    html += '<tr>';
                    html += '<td>'+ index +'</td>';
                    html += '<td>'+ questionReply[i].replyContent +'</td>';
                    html += '<td>'+ questionReply[i].nickName +'</td>';
                    html += '<td><i class="fa fa-thumbs-o-up"></i> &nbsp;'+ questionReply[i].praiseNum +'</td>';
                    html += '<td><i class="fa fa-thumbs-o-down"></i> &nbsp;'+ questionReply[i].criticismNum +'</td>';
                    html += '<td>'+ isAccept +'</td>';
                    html += '<td>'+ questionReply[i].replyTime +'</td>';
                    html += '</tr>';
                }
			}
		}

		$("#tbody0").empty().append(html);
	}
};
