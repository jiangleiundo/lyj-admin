$(function(){
	groupParams.visitorId = GetQueryString("id");
    groupParams.curPage = GetQueryString("curPage");
    groupParams.curNum = GetQueryString("curNum");

    getVisitorGroupsParams();
});

var groupParams = {
	visitorId : null,
	orangeName : null,
    curPage : null,
    curNum : null
};

/**
 * 用户跟的团
 */
function getVisitorGroupsParams() {
    pageParams.searchParams = {
        "visitorId" : groupParams.visitorId
    };
    pageParams.dataApi = Api.API_GET_VISITORGROUPS;
    pageParams.callback = getVisitorGroups;
    ModelFun.dataModel();

    pageParams.txtpage.val(pageParams.currentpage);
    pageParams.pageNum.text(pageParams.totalpage);
    pageParams.setPageNum.val(pageParams.num);
}

/**
 * 用户跟的团回调
 * @param data
 * @param data.data.visitorGroups.groupIcon 团头像
 * @param data.data.visitorGroups.groupName 团名称
 */
function getVisitorGroups(data){
	var visitorGroups = data["data"]["visitorGroups"],
	    count = data["data"]["count"],
        html = "";

    pageParams.totalpage = commonFun.getTotalpages(count,pageParams.num);

    if(visitorGroups.length == 0)
    {
		html = '<tr><td colspan="7">暂无数据</td></tr>';
	}
    else
    {
		for(var i in visitorGroups){
            if(visitorGroups.hasOwnProperty(i))
            {
                var index = (pageParams.currentpage - 1)*pageParams.num + parseInt(i) + 1,
                    groupIcon = null;

                //团头像
                if(utilities.checkStringEmpty(visitorGroups[i].groupIcon)){
                    groupIcon = 'images/group_img.png';
                }else{
                    var icon = JSON.parse(visitorGroups[i].groupIcon);
                    groupIcon = icon.url + commonParams.IMG_CUT_H;
                }

                //参团时间
                var sTime = visitorGroups[i].startTime;
                var startTime = sTime.split(" ")[0];

                html += '<tr>';
                html += '<td>'+ index +'</td>';
                html += '<td><img height="70" src="'+ groupIcon +'"/></td>';
                html += '<td>'+ visitorGroups[i].groupName +'</td>';
                html += '<td>'+ visitorGroups[i].nickName +'</td>';
                html += '<td>'+ startTime +'</td>';
                html += '<td><a class="btn btn-info checkBtn" data-name="'+ visitorGroups[i].nickName +'" data-gid="'+ visitorGroups[i].id +'">团详情</a></td>';
                html += '</tr>';
            }
		}
	}

	$(pageParams.tbody2).empty().append(html);

	$(".checkBtn").on("click",function(){
		groupParams.orangeName = $(this).attr("data-name");
		var groupId = $(this).attr("data-gid");
        groupInfo.getParam(groupId);
        $("#group").hide();
        $("#groupInfo").fadeIn();
	});

	$(".spinner").hide();
	$(".preload").fadeIn();
}

$("#btnCancel").on("click",function(){
	location.href = "user_list.html?curPage=" + groupParams.curPage + '&curNum=' + groupParams.curNum;
});

//查看详情返回
$("#btnCancel2").on("click",function(){
    $("#groupInfo").hide();
    $("#group").fadeIn();
});

/*团详情*/
var groupInfo = {
    getParam: function(groupId) {
        var idsArr = [];
        idsArr.push(groupId);
        var params = {
            ids: JSON.stringify( idsArr )
        };

        meeno.JQueryAjax(Api.API_GET_GROUPWIDTHIDS, params, groupInfo.groupInfoCallback);
    },

    groupInfoCallback: function(data) {
        var groups = data["data"]["groups"];

        for(var i in groups){

            if(groups.hasOwnProperty(i))
            {
                var groupIcon = null,
                    icon = null,
                    carryInfo = null,
                    safetyInfo = null,
                    html = "";

                //团头像
                if(!groups[i].groupIcon || groups[i].groupIcon == null){
                    groupIcon = 'images/group_img.png';
                }else{
                    icon = JSON.parse(groups[i].groupIcon);
                    groupIcon = icon.url + commonParams.IMG_CUT_H;
                }

                //参团时间
                var sTime = groups[i].startTime;
                var startTime = sTime.split(" ")[0];

                //返程时间
                var eTime = groups[i].endTime;
                var endTime = eTime.split(" ")[0];

                //安全须知
                if(utilities.checkStringEmpty(groups[i].safetyInfo)) {
                    safetyInfo = "暂无数据";
                }
                else
                {
                    safetyInfo = groups[i].safetyInfo;
                }

                //携带物品须知
                if(utilities.checkStringEmpty(groups[i].carryInfo)) {
                    carryInfo = "暂无数据";
                }
                else
                {
                    carryInfo = groups[i].carryInfo;
                }

                $("#tbody_01").find(".tuan").text(groups[i].groupName);
                $("#tbody_02").find("img").attr("src",groupIcon);
                $("#tbody_03").find(".tuan").text(groupParams.orangeName);
                $("#tbody_04").find(".tuan").text(startTime);
                $("#tbody_05").find(".tuan").text(endTime);
                $("#tbody_06").find(".tuan").text(groups[i].startLocation);
                if(groups[i].endLocation)
                {
                    var endLocation = JSON.parse(groups[i].endLocation);

                    for(var m =0;m<endLocation.length; m++)
                    {
                        html += '<sapn>'+ endLocation[m] +'&nbsp;</span>';
                    }

                    $("#tbody_07").find(".tuan").empty().append(html);
                }
                if(groups[i].contacts)
                {

                    var contacts = JSON.parse(groups[i].contacts);
                    for(var j=0;j<contacts.length;j++)
                    {
                        html += '<div>'+ contacts[j].contact_name +'<span>&nbsp;&nbsp;'+ contacts[j].contact_phone +'</span></div>';
                    }

                    $("#tbody_08").find(".tuan").empty().append(html);
                }
                if(groups[i].guides)
                {

                    var oguides = JSON.parse(groups[i].guides);
                    for(var k=0;k<oguides.length;k++)
                    {
                        html += '<div>'+ oguides[k].guide_name +'<span>&nbsp;&nbsp;'+ oguides[k].guide_phone +'</span></div>';
                    }

                    $("#tbody_09").find(".tuan").empty().append(html);
                }
                if(groups[i].destinationInfo)
                {
                    var destinationInfo = JSON.parse(groups[i].destinationInfo);

                    for(var d in destinationInfo)
                    {
                        if(destinationInfo.hasOwnProperty(d))
                        {
                            var dInfo = destinationInfo[d];
                            if(dInfo == "")
                            {
                                dInfo = "暂无数据";
                            }
                            html += '<p><span style="font-weight: 600;">'+ d +'：</sapn>'+ dInfo +'</p>';
                        }
                    }
                    $("#tbody_10").find(".tuan").empty().append(html);
                }
                $("#tbody_11").find(".tuan").text(safetyInfo);
                $("#tbody_12").find(".tuan").text(carryInfo);
            }
        }
    }
};








