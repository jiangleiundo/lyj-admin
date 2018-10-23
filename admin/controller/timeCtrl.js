/**
 * Created by Administrator on 2016/8/8.
 */
$(function(){
    getTimeData();
});

function getTimeData(){
    timeFn.getTimeInfo(function(data){
        var timeInfo = data.data.report;

        var reportTimeCopy = utilities.formatDate(timeInfo.reportTime, false);
        var pullTimeCopy = utilities.formatDate(timeInfo.pullTime, false);

        var html = '<span>'+ reportTimeCopy +'</span>';
        $("#reportTime").empty().append(html);

        var timeGap = '<input class="form-control" value="'+ timeInfo.reportIntervalTime +'"/>';
        $("#reportTimeGap").empty().append(timeGap);

        var pullTime = '<span>'+ pullTimeCopy +'</span>';
        $("#pullTime").empty().append(pullTime);

        var pullTimeGap = '<input class="form-control" value="'+ timeInfo.pullIntervalTime +'"/>';
        $("#pullTimeGap").empty().append(pullTimeGap);
        
        $(".spinner").hide();
		$(".preload").fadeIn();
        
    });

    $("#modifyTime").on("click", function(){
        var timeG = $("#reportTimeGap").children("input").val();
        var pullTimeG = $("#pullTimeGap").children("input").val();

        if(!utilities.checkStringEmpty(timeG) && !utilities.checkStringEmpty(pullTimeG))
        {
            modTimeData(timeG, pullTimeG);
        }
        else
        {
            alert("间隔时间不能为空");
        }
    });


}

function modTimeData(timeG, pullTimeG){
    var params = {
    	"reportIntervalTime": timeG,
    	"pullIntervalTime": pullTimeG
    };

    timeFn.modTimeInfo(params, function(){
        alert("修改成功");
    })
}

var timeFn = {
    //获取时间信息
    getTimeInfo : function(callback){
        meeno.JQueryAjax(Api.API_GET_POSITION_TIME, {}, callback)
    },

    modTimeInfo : function(params, callback){
        meeno.JQueryAjax(Api.API_MOD_POSITION_TIME, params, callback)
    }
};