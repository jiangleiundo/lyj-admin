$(function(){
	footMarkModel.getModelByParams();
});

var footMarkModel = {
	getModelByParams : function(){

		pageParams.searchParams = {};
		pageParams.dataApi = Api.API_GET_FOOTMARK;
		pageParams.callback = footMarkModel.footMarkCallback;
		ModelFun.dataModel();
		
		pageParams.txtpage.val(pageParams.currentpage);
		pageParams.pageNum.text(pageParams.totalpage);
		pageParams.setPageNum.val(pageParams.num);
	},

    /**
     *
     * @param data
     * @param data.data.footMark
     * @param data.data.praiseNum 赞数
     * @param data.data.commentNum 评论数
     */
	footMarkCallback : function(data){
		var footMark = data.data.footMark,
		    count = data.data.count,
            html = "";

        pageParams.totalpage = commonFun.getTotalpages(count,pageParams.num);

		if(footMark.length == 0)
		{
			html = '<tr><td colspan="7">暂无数据</td></tr>';
		}
		else
		{
			commonFun.setLocStorage(storageKey.KfootMarkData,JSON.stringify(footMark));
			for(var i in footMark)
			{
                if(footMark.hasOwnProperty(i))
                {
                    var index = (pageParams.currentpage - 1)*pageParams.num + parseInt(i) + 1,
                        userIcon = null;

                    //头像
                    if( !footMark[i].icon || footMark[i].icon == null)
                    {
                        userIcon = 'images/default.png';
                    }
                    else
                    {
                        var icon = JSON.parse(footMark[i].icon);
                        userIcon = icon.url + commonParams.IMG_CUT_WH;
                    }

                    html += '<tr>';
                    html += '<td>'+ index +'</td>';
                    html += '<td><img src="'+ userIcon +'"/></td>';
                    html += '<td>'+ footMark[i].nickName +'</td>';
                    html += '<td><i class="fa fa-thumbs-o-up"></i>&nbsp;'+ footMark[i].praiseNum +'</td>';
                    html += '<td><a class="btn btn-info checkComments" data-id="'+ footMark[i].id +'">'+ footMark[i].commentNum +'</a></td>';
                    html += '<td><a class="btn btn-info checkDetials" data-id="'+ footMark[i].id +'">查看详情</a></td>';
                    html += '<td><div class="rem_con">';
                    html += '<div class="rem_con_lf">&nbsp;<span class="un_sel" data-id="'+ footMark[i].id +'"></span></div>';
                    html += '</div></td>';
                    html += '</tr>';
                }
			}
		}

		pageParams.tbody.empty().append(html);

		$(".spinner").hide();
		$(".preload").show();

		commonFun.oneSelected("allsel");

		//查看详情
		$(".checkDetials").on("click",function(){
			var footmarkId = $(this).attr("data-id");
			var footmarks = JSON.parse(commonFun.getLocStorage(storageKey.KfootMarkData));
			var list = "";
			for(var i=0; i<footmarks.length; i++)
			{
				if(footmarks[i].id == footmarkId)
				{
					$("#tbody_01").find(".tuan").text(footmarks[i].nickName);
					$("#tbody_02").find("img").attr("src", !footmarks[i].icon || footmarks[i].icon == null ? "images/default.png" : JSON.parse(footmarks[i].icon).url + commonParams.IMG_CUT_WH);
					$("#tbody_03").find(".tuan").text(footmarks[i].publishTime);
					$("#tbody_04").find(".tuan").text(JSON.parse(footmarks[i].place).locationName == ""? "暂无数据" : JSON.parse(footmarks[i].place).locationName);
					$("#tbody_05").find(".tuan").text(footmarks[i].content);
					for(var j=0; j<JSON.parse(footmarks[i].pics).length;j++)
					{
						if(JSON.parse(footmarks[i].pics).length == 0)
						{
							list = '<img src="../images/moren.png"/>';
						}
						else
						{
							list += '<img src="'+ JSON.parse(footmarks[i].pics)[j] + commonParams.IMG_CUT_H2 +'"/>';
						}
					}

					$("#tbody_06").find(".tuan").empty().append(list);
					$("#tbody_07").find(".tuan").text(commonFun.getReadPermissions(footmarks[i].readPermissions));
				}
			}

			$(".footmarkDital").fadeIn();//详情显示其余隐藏
			$(".footMarkList").hide();
			$(".footmarkComment").hide();
		});

		//查看评论列表
		$(".checkComments").on("click",function(){
			$(".footmarkComment").fadeIn();
			$(".footmarkDital").hide();//详情显示其余隐藏
			$(".footMarkList").hide();
			footMarkCommentModel.getModelByParams( $(this).attr("data-id") );
		})
	}
};

//全选
commonFun.allSelected("allsel");

//删除选中的
$("#btnDel").on("click",function(){
	commonFun.delListByIds("ids",Api.API_DEL_FOOTMARK);
});

//详情列表返回
$("#btnCancel").on("click",function(){
	$(".footMarkList").fadeIn();
	$(".footmarkDital").hide();//详情显示其余隐藏
	$(".footmarkComment").hide();
});

//评论列表返回
$("#btnCancel00").on("click",function(){
	$(".footMarkList").fadeIn();
	$(".footmarkDital").hide();//详情显示其余隐藏
	$(".footmarkComment").hide();
});

//评论列表
var footMarkCommentModel = {
	getModelByParams : function(footMarkId){

		page0Params.searchParams = {
			footMarkId : footMarkId
		};
		page0Params.dataApi = Api.API_GET_FOOTMARKCOMMENTS;
		page0Params.callback = footMarkCommentModel.footMarkCommentCallback;
		ModelFun0.dataModel();
		
		page0Params.txtpage.val(page0Params.currentpage);
		page0Params.pageNum.text(page0Params.totalpage);
		page0Params.setPageNum.val(page0Params.num);
	},
	footMarkCommentCallback : function(data){
		var comments = data["data"]["comments"],
		    count = data["data"]["count"],
            html = '';

        page0Params.totalpage = commonFun.getTotalpages(count,page0Params.num);

		if(comments.length == 0)
		{
			html = '<tr><td colspan="6">暂无数据</td></tr>';
		}
		else
		{
			for(var i in comments)
			{
                if(comments.hasOwnProperty(i))
                {
                    var index = (page0Params.currentpage - 1)*page0Params.num + parseInt(i) + 1;
                    //获取头像
                    var userIcon = commonFun.getDefaultIcon(comments[i].icon,pageParams.defaultIcon);
                    html += '<tr>';
                    html += '<td>'+ index +'</td>';
                    html += '<td><img src="'+ userIcon + '?imageView2/1/w/60/h/60"/></td>';
                    html += '<td>'+ comments[i].nickName +'</td>';
                    html += '<td>'+ comments[i].commentContent +'</td>';
                    html += '<td>'+ comments[i].commentsTime +'</td>';
                    html += '</tr>';
                }
			}
		}

		$("#tbody0").empty().append(html);
	}
};









