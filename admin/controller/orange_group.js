$(function(){
	oGroupParams.guideId = commonFun.getLocStorage(storageKey.orangeGroupID);
	oGroupModel.getGroupModelById(oGroupParams.guideId);

    oGroupParams.type = GetQueryString("type");
    oGroupParams.curPage = GetQueryString("curPage");
    oGroupParams.curNum = GetQueryString("curNum");
});

var oGroupParams = {
	guideId : null,
    curPage : null,
    curNum : null,
    type : null //如果类型存在而且是1就是从推荐桔子跳过来的，否则是从桔子列表跳来的
};

var oGroupModel = {
	getGroupModelById : function(guideId){

		pageParams.searchParams = {
			guideId : guideId
		};
		pageParams.dataApi = Api.API_GET_GUIDEGROUPS;
		pageParams.callback = oGroupModel.oGroupCallback;
		ModelFun.dataModel();
		
		pageParams.txtpage.val(pageParams.currentpage);
		pageParams.pageNum.text(pageParams.totalpage);
		pageParams.setPageNum.val(pageParams.num);
	},
	
	oGroupCallback : function(data){
		if(data)//回调成功
		{
			var guideGroups = data["data"]["guideGroups"];
			var count = data["data"]["count"];
			pageParams.totalpage = commonFun.getTotalpages(count,pageParams.num);
			var html = "";

			if(guideGroups.length == 0)
			{
				html = '<tr><td colspan="5">暂无数据</td></tr>';
			}
			else
			{
				commonFun.setLocStorage(storageKey.KguideGroupsData,JSON.stringify(guideGroups));
				for(var i in guideGroups)
				{
                    if(guideGroups.hasOwnProperty(i))
                    {
                        var index = (pageParams.currentpage - 1)*pageParams.num + parseInt(i) + 1,
                            groupIcon = null;

                        //团头像
                        if(!guideGroups[i].groupIcon || guideGroups[i].groupIcon == null){
                            groupIcon = 'images/group_img.png';
                        }
                        else
                        {
                            var icon = JSON.parse(guideGroups[i].groupIcon);
                            groupIcon = icon.url + commonParams.IMG_CUT_H;
                        }
                        //创建时间
                        var cTime = guideGroups[i].createTime;
                        var createTime = cTime.split(" ")[0];
                        html += '<tr>';
                        html += '<td>'+ index +'</td>';
                        html += '<td><img src="'+ groupIcon +'"/></td>';
                        html += '<td>'+ guideGroups[i].groupName +'</td>';
                        html += '<td>'+ createTime +'</td>';
                        html += '<td><a class="btn btn-info ogroups" data-groupid="'+ guideGroups[i].id +'">团详情</a></td>';
                        html += '</tr>';
                    }
				}
			}

			$("#tbody").empty().append(html);
			$(".spinner").hide();
			$(".preload").fadeIn();

			$(".ogroups").on("click",function(){
				var thisGroupId = $(this).attr("data-groupid");
				var kGuideGroup = JSON.parse(commonFun.getLocStorage(storageKey.KguideGroupsData));
				for(var i=0; i<kGuideGroup.length;i++)
				{
					if(kGuideGroup[i].id == thisGroupId)
					{
                        var html = "";
						
						$("#tbody_01").find(".tuan").text(kGuideGroup[i].groupName);
						$("#tbody_02").find("img").attr("src", !kGuideGroup[i].groupIcon || kGuideGroup[i].groupIcon == null ? "images/default.png" : JSON.parse(kGuideGroup[i].groupIcon).url + commonParams.IMG_CUT_WH);
						$("#tbody_04").find(".tuan").text(kGuideGroup[i].startTime.split(" ")[0]);
						$("#tbody_05").find(".tuan").text(kGuideGroup[i].endTime);
						$("#tbody_06").find(".tuan").text(kGuideGroup[i].startLocation);
						if(kGuideGroup[i].endLocation)
						{
							var endLocation = JSON.parse(kGuideGroup[i].endLocation);

							for(var m =0;m<endLocation.length; m++)
							{
								html += '<sapn>'+ endLocation[m] +'&nbsp;</span>';
							}

							$("#tbody_07").find(".tuan").empty().append(html);
						}
						if(kGuideGroup[i].contacts)
						{
							var contacts = JSON.parse(kGuideGroup[i].contacts);
							for(var j=0;j<contacts.length;j++)
							{
								html += '<div>'+ contacts[j].contact_name +'<span>&nbsp;&nbsp;'+ contacts[j].contact_phone +'</span></div>';
							}

							$("#tbody_08").find(".tuan").empty().append(html);
						}
						if(kGuideGroup[i].guides)
						{

							var oguides = JSON.parse(kGuideGroup[i].guides);
							for(var k=0;k<oguides.length;k++)
							{
								html += '<div>'+ oguides[k].guide_name +'<span>&nbsp;&nbsp;'+ oguides[k].guide_phone +'</span></div>';
							}

							$("#tbody_09").find(".tuan").empty().append(html);
						}
						if(kGuideGroup[i].destinationInfo)
						{
							var destinationInfo = JSON.parse(kGuideGroup[i].destinationInfo);

							for(var n in destinationInfo)
							{
                                if(destinationInfo.hasOwnProperty(n))
                                {
                                    var dInfo = destinationInfo[n];
                                    if(dInfo == "")
                                    {
                                        dInfo = "暂无数据";
                                    }
                                    html += '<p><span style="font-weight: 700;">'+ n +'：</sapn>'+ dInfo +'</p>';
                                }
							}

							$("#tbody_10").find(".tuan").empty().append(html);
						}
						$("#tbody_11").find(".tuan").text(kGuideGroup[i].safetyInfo == "" || kGuideGroup[i].safetyInfo == null ? "暂无数据" : kGuideGroup[i].safetyInfo);
						$("#tbody_12").find(".tuan").text(kGuideGroup[i].carryInfo == "" || kGuideGroup[i].carryInfo == null ? "暂无数据" : kGuideGroup[i].carryInfo);
					}
				}
				$(".oGroup").hide();
				$(".oGroupDital").fadeIn();
			})
			
		}
		else//回调失败
		{
			pageParams.totalpage = 0;
			//var html = "";
            html = '<tr><td colspan="5">暂无数据</td></tr>';
			$("#tbody").append(html);
			$(".spinner").hide();
			$(".preload").fadeIn();
		}
			
	}
};

$("#btnCancel").on("click",function(){
    if(utilities.checkStringEmpty(oGroupParams.type))
    {
        location.href = "orange_list.html?curPage=" + oGroupParams.curPage + '&curNum=' + oGroupParams.curNum;
    }
    else
    {
        location.href = "orange_recommend.html?curPage=" + oGroupParams.curPage + '&curNum=' + oGroupParams.curNum;
    }
});

$("#btnCancel0").on("click",function(){
	$(".oGroup").fadeIn();
	$(".oGroupDital").hide();
});
