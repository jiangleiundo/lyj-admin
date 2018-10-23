$(function(){
	var str = String(window.location);
	gParams.vName = decodeURI(str.split("=")[2]);
	
	var idsArr = [];
	idsArr.push(GetQueryString("groupId"));
	var params = {
        ids: JSON.stringify( idsArr )
    };

	meeno.JQueryAjax(Api.API_GET_GROUPWIDTHIDS, params, getGroupObjWithIds);
});

var gParams = {
	vName : null
};

/**
 * 团详情
 * @param data
 * @param data.data.groups.safetyInfo 安全须知
 * @param data.data.groups.carryInfo 携带物品须知
 * @param data.data.groups.startLocation 开始地点
 * @param data.data.groups.endLocation 结束地点
 * @param data.data.groups.contacts 联系人
 * @param data.data.groups.contact_name 联系人姓名
 * @param data.data.groups.guides 导游
 * @param data.data.groups.guide_name 导游名
 * @param data.data.groups.contact_phone 联系人电话
 * @param data.data.groups.guide_phone 导游电话
 */
function getGroupObjWithIds(data){
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
            $("#tbody_03").find(".tuan").text(gParams.vName);
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
	$(".spinner").hide();
	$(".preload").fadeIn();
	
}

$("#btnCancel").on("click",function(){
	location.href = document.referrer;//返回上一页，document.referrer是获取上一页的url
});
