$(function(){
    var curPage = GetQueryString("curPage"),
        curNum = GetQueryString("curNum");

    if(!utilities.checkStringEmpty(curPage))
    {
        pageParams.currentpage = curPage;
        pageParams.num = curNum;
    }

	orangeListModel.getModelByxx(pageParams.currentpage, pageParams.num);
});

var orangeListModel = {
	getModelByxx : function(currentpage, num){

		pageParams.searchParams = {};
		pageParams.dataApi = Api.API_GET_GUIDE;
		pageParams.callback = orangeListModel.orangeListCall;
		ModelFun.dataModel();
		
		pageParams.txtpage.val(currentpage);
		pageParams.setPageNum.val(num);
	},
	
	orangeListCall : function(data){
		var guide = data["data"]["guide"];
		var count = data["data"]["count"];
		pageParams.totalpage = commonFun.getTotalpages(count,pageParams.num);
		pageParams.pageNum.text(pageParams.totalpage);
		
		var html = "";
		if(guide.length == 0)
		{
			html = '<tr><td colspan="12">暂无数据</td></tr>';
		}
		else
		{
			for(var i in guide)
			{
                if(guide.hasOwnProperty(i))
                {
                    var index = (pageParams.currentpage - 1)*pageParams.num + parseInt(i) + 1,
                        oicon = null;

                    //头像
                    if(utilities.checkStringEmpty(guide[i].icon))
                    {
                        oicon = 'images/default.png';
                    }
                    else
                    {
                        var icon = JSON.parse(guide[i].icon);
                        oicon = icon.url + commonParams.IMG_CUT_WH;
                    }

                    //性别
                    var sex = commonFun.getSex(guide[i].gender);

                    //所在地
                    var orangelocation = guide[i].location,
                        olocation = null;

                    if(orangelocation != null && orangelocation != "")
                    {
                        olocation = orangelocation;
                    }
                    else
                    {
                        olocation = "暂无数据";
                    }

                    //是否禁言
                    var gag = customFun.isRecommand(parseInt(guide[i].gag));

                    //推荐桔子
                    var isRec = (guide[i].isRecommend == '0')? '推荐':'取消推荐';

                    //回答的问题
                    var myReply = guide[i].myReply,
                        myReplyArr = JSON.parse(myReply),
                        myReplyNum = null;

                    if(myReplyArr != null && myReplyArr != "")
                    {
                        myReplyNum = myReplyArr.length;
                    }
                    else
                    {
                        myReplyNum = 0;
                    }

                    //最近登录时间
                    var lastLoginTime = guide[i].lastLoginTime;
                    var oLastLoginTime = lastLoginTime == "0"? "暂未登陆": commonFun.userDate(lastLoginTime*1000).split(" ")[0];

					//注册时间
                    var registerTime2 = guide[i].registerTime.split(" ")[0];
                    
                    //熟悉领域
                    var oguideKeyword = guide[i].guideKeyword,
                        orangeoguideKeyword = null;

                    if(oguideKeyword != null && oguideKeyword != ""){
                        orangeoguideKeyword = oguideKeyword;
                    }
                    else
                    {
                        orangeoguideKeyword = "暂无数据";
                    }

                    //自我评价
                    var oselfEvaluation = guide[i].selfEvaluation,
                        orangeoselfEvaluation = null;

                    if(oselfEvaluation != null && oselfEvaluation != ""){
                        orangeoselfEvaluation = oselfEvaluation;
                    }
                    else
                    {
                        orangeoselfEvaluation = "暂无数据";
                    }

                    //人生格言
                    var lifeMotto = guide[i].lifeMotto,
                        olifeMotto = null;

                    if(lifeMotto != null && lifeMotto != ""){
                        olifeMotto = lifeMotto;
                    }
                    else
                    {
                        olifeMotto = "暂无数据";
                    }

                    //是否定制路线
                    var customTourism = customFun.isRecommand(parseInt(guide[i].customTourism));

                    html += '<tr>';
                    html += '<td>'+ index +'</td>';
                    html += '<td><img id="uListPic" src="'+ oicon +'"/></td>';
                    html += '<td>'+ guide[i].nickName +'</td>';
                    html += '<td>';
                    if(!utilities.checkStringEmpty(guide[i].legallyPhotos))
                    {
                        var arr = JSON.parse(guide[i].legallyPhotos),
                            len = arr.length > 2? 2: arr.length; //只取2张图片

                        for(var j = 0; j < len; j++)
                        {
                            html += '<img style="margin:3px;" class="check-img" data-src="'+ arr[j] +'" src="'+ arr[j] + commonParams.IMG_CUT_H3 +'">';
                        }
                    }
                    html += '</td>';
                    html += '<td>'+ guide[i].lv +'</td>';
                    html += '<td>'+ sex +'</td>';
                    html += '<td>'+ guide[i].platformId +'</td>';
                    html += '<td>'+ olocation +'</td>';
                    html += '<td>'+ guide[i].integral +'</td>';
                    html += '<td>'+ gag +'</td>';
                    html += '<td><a class="btn btn-info isRec" data-isRec="'+ guide[i].isRecommend +'" data-id="'+ guide[i].userId +'">'+ isRec +'</a></td>';
                    html += '<td><a class="btn btn-info oReply" data-id="'+ guide[i].userId +'" data-num="'+ myReplyNum +'">'+ myReplyNum +'</a></td>';
                    html += '<td><a class="btn btn-info groupsNum" data-id="'+ guide[i].userId +'">查看团</a></td>';
                    html += '<td><a class="juzidetial">查看详情';
                    html += '<div class="juBox"><div class="juziBox"><b></b>';
                    html += 	'<div class="okeyword">';
                    html += 		'<span>熟悉领域：</span>';
                    html += 		'<p>'+ orangeoguideKeyword +'</p>';
                    html += 	'</div>';
                    html += 	'<div class="okeyword">';
                    html += 		'<span>自我评价：</span>';
                    html += 		'<p>'+ orangeoselfEvaluation +'</p>';
                    html += 	'</div>';
                    html += 	'<div class="okeyword">';
                    html += 		'<span>人生格言：</span>';
                    html += 		'<p>'+ olifeMotto +'</p>';
                    html += 	'</div>';
                    html += 	'<div class="okeyword">';
                    html += 		'<span>定制路线：</span>';
                    html += 		'<p>'+ customTourism +'</p>';
                    html += 	'</div>';
                    html += '</div></div>';
                    html += '</a></td>';
                    html += '<td>'+ registerTime2 +'</td>';
                    html += '<td>'+ oLastLoginTime +'</td>';
                    html += '</tr>';
                }
			}
		}

		pageParams.tbody.empty().append(html);
		$(".spinner").hide();
		$(".preload").fadeIn();

		onClickFn();
	}
};

function onClickFn(){

	//鼠标悬停查看桔子详情
	$(".juzidetial").on("mouseover",function() {

		$(this).children(".juBox").show();
	}).on("mouseout",function() {

		$(this).children(".juBox").hide();
	});

	//点击查回答问题详情
	$(".oReply").on("click",function(){
		var oNum = $(this).attr("data-num");
		if(oNum == 0)
		{
			window.parent.commonDialog("暂无数据");
		}
		else
		{
			var Qid = $(this).attr("data-id");
			commonFun.setLocStorage(storageKey.orangeQuestionID, Qid);
			location.href = "orange_question.html?curPage=" + pageParams.txtpage.val() + '&curNum=' + pageParams.setPageNum.val();
		}
	});

	//点击查看团
	$(".groupsNum").on("click",function(){
		var id = $(this).attr("data-id");
		commonFun.setLocStorage(storageKey.orangeGroupID, id);
		location.href = "orange_group.html?curPage=" + pageParams.txtpage.val() + '&curNum=' + pageParams.setPageNum.val();
	});

    //推荐桔子
    $(".isRec").on("click", function(){
        var self = $(this);
        var type = ($(this).attr("data-isRec") == '0')? '1': '0';
        var curId = $(this).attr("data-id");
        var curTxt = (type == '0')? '推荐':'取消推荐';

        var params = {
            "guideId": curId,
            "type": type
        };

        meeno.JQueryAjax(Api.API_RECOMMEND_GUIDE, params, function(){
            window.parent.commonDialog("操作成功");
            self.text(curTxt);
            self.attr("data-isRec", type);
        })
    });

    /* 搜索 */
    $("#coun_search_btn").on("click", function(){

        pageParams.currentpage = 1;
        pageParams.searchParams = {
            "name" : $("#search").val()
        };

        pageParams.dataApi = Api.API_GET_GUIDE;
        pageParams.callback = orangeListModel.orangeListCall;
        ModelFun.dataModel();
    });

    /* 查看大图 */
    $(".check-img").unbind().on("click", function(){
        var curURL = $(this).attr("data-src");

        imgModal.show(curURL);
    })
}