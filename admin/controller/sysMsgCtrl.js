/**
 * Created by Jack on 2016/11/16.
 */

$(function(){
    sysMsgCtrl.setParams();
});

var sysMsgCtrl = {
    setParams: function(){
        pageParams.searchParams = {};
        pageParams.dataApi = Api.API_GET_SYS_MSG_LIST;
        pageParams.callback = sysMsgCtrl.callback;
        ModelFun.dataModel();

        pageParams.txtpage.val(pageParams.currentpage);
        pageParams.setPageNum.val(pageParams.num);
    },

    /**
     * 系统消息
     * @param data.data.messageList
     * @param data.data.messageContent 消息内容
     * @param data.data.messageTime 推送消息时间
     */
    callback: function(data){
        var msgArr = data.data.messageList,
            html = "";

        pageParams.totalpage = commonFun.getTotalpages(data.data.count, pageParams.num);
        pageParams.pageNum.text(pageParams.totalpage);

        if(msgArr.length == 0)
        {
            html = '<tr><td colspan="5">暂无数据</td></tr>';
        }
        else
        {
            for(var i = 0; i < msgArr.length; i++)
            {
                var index = (pageParams.currentpage - 1)*pageParams.num + i + 1;

                html += '<tr>';
                html += '<td>'+ index +'</td>';
                html += '<td>'+ msgArr[i].messageContent +'</td>';
                html += '<td>'+ msgArr[i].messageTime +'</td>';
                html += '<td><a class="btn btn-danger del-msg" data-id="'+ msgArr[i].id +'">删除</a></td>';
                html += '</tr>';
            }
        }

        $("#tbody").empty().append(html);
        $(".spinner").hide();
        $(".preload").fadeIn();

        //初始化显示隐藏
        $("#main-box").fadeIn(300);
        $("#info-box").hide();

        $(".del-msg").on("click", function(){
            var params = {
                id: $(this).attr("data-id")
            };
            meeno.JQueryAjax(Api.API_DEL_SYS_MSG, params, function(){
                $modal.toast(errParams.delSucces);
                sysMsgCtrl.setParams();
            })
        })
    }
};

//推送系统消息
$("#sendMsg").on("click", function(){
    $("#main-box").hide();
    $("#info-box").fadeIn(300);
    $("#msgCon").val("");
});

//返回列表
$("#back2MsgList").on("click", function(){
    $("#main-box").fadeIn(300);
    $("#info-box").hide();
});

//提交数据
$("#submitMsg").on("click", function(){
    var params = {
        messageContent: $("#msgCon").val()
    };

    if(utilities.checkStringEmpty(params.messageContent))
    {
        $modal.toast("推送消息不能为空");
    }
    else
    {
        meeno.JQueryAjax(Api.API_SEND_SYS_MSG, params, function(){
            pageParams.currentpage = 1; //从第一页开始
            sysMsgCtrl.setParams();
            $modal.toast(errParams.addSucces);
        })
    }
});