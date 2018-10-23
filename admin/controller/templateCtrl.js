/**
 * Created by Administrator on 2016/9/22.
 */
$(function(){
    getTemplateModel.getModelByParams();
});

var templateParams = {
    curId : null,
    isAdd : false
};

var getTemplateModel = {
    getModelByParams : function(){

        pageParams.dataApi = Api.API_GET_TEMPLATE_LIST;
        pageParams.callback = getTemplateModel.modelCallback;
        ModelFun.dataModel();

        pageParams.txtpage.val(pageParams.currentpage);
        pageParams.pageNum.text(pageParams.totalpage);
        pageParams.setPageNum.val(pageParams.num);
    },
    modelCallback : function(data){

        var modelList = data.data.templateList;
        var count = modelList.length;

        pageParams.totalpage = commonFun.getTotalpages(count, pageParams.num);

        var html = '';
        if(count == 0)
        {
            html = '<tr><td colspan="5">暂无数据</td></tr>';
        }
        else
        {
            for(var i = 0; i < count; i++)
            {
                var index = (pageParams.currentpage - 1)*pageParams.num + parseInt(i) + 1;
                var createTime = utilities.formatDate(modelList[i].createTime, true);

                html += '<tr>';
                html += '<td class="t-notice1">'+ index +'</td>';
                html += '<td class="t-notice3">'+ modelList[i].template +'</div></td>';
                html += '<td class="t-notice2">'+ createTime +'</td>';
                html += '<td class="t-notice2"><a class="btn btn-info modify" data-con="'+ modelList[i].template +'" data-id="'+ modelList[i].id +'">编辑</a></td>';
                html += '<td class="t-notice2"><a class="btn btn-danger delModel" data-id="'+ modelList[i].id +'">删除</a></td>';
                html += '</tr>';
            }
        }

        $("#tbody").empty().append(html);
        $(".spinner").hide();
        $(".preload").fadeIn();
        refresh();

        //修改
        $(".modify").on("click", function(){
            var id = $(this).attr("data-id");
            var con = $(this).attr("data-con");
            modTemplate(id, con);
        });

        //删除
        $(".delModel").on("click", function(){
            var id = $(this).attr("data-id");
            delTemplate(id);
        })
    }
};

/**
 * 刷新参数
 */
function refresh(){
    templateParams.curId = null;
    templateParams.isAdd = false;
}

//点击事件
$("#btnAdd").on("click", function(){
    commonFun.showModal("添加模板");

    templateParams.isAdd = true;

    $("#templateBox").val('');

    addParam();
});

//提交数据
$("#templateSubmit").on("click", function(){
    if(templateParams.isAdd)
    {
        addTemplate();
    }
    else
    {
        modTemp();
    }
});

/**
 * 修改模板
 * @param curId 当前选中ID
 * @param con 当前模板内容
 */
function modTemplate(curId, con){
    commonFun.showModal("修改模板");

    templateParams.curId = curId;
    templateParams.isAdd = false;

    $("#templateBox").val(con);

    addParam();
}

/**
 * 添加模板
 */
function addTemplate(){

    var temp = $("#templateBox").val();

    var params = {
        "template": temp
    };

    if(!utilities.checkStringEmpty(temp))
    {
        meeno.JQueryAjax(Api.API_ADD_TEMPLATE_LIST, params, function(data){
            commonFun.addSuccessWithModal(data);
        });
    }
    else
    {
        commonFun.hideModal();
    }
}

/**
 * 修改模板
 */
function modTemp(){

    var temp = $("#templateBox").val();

    var params = {
        "id": templateParams.curId
    };

    var modInfo = {
        "template": temp
    };

    if(!utilities.checkStringEmpty(temp))
    {
        params.modInfo = JSON.stringify(modInfo);
        meeno.JQueryAjax(Api.API_MOD_TEMPLATE_LIST, params, function(data){
            commonFun.modSuccessWithModal(data);
        });
    }
    else
    {
        commonFun.hideModal();
    }
}

/**
 * 添加参数
 */
function addParam(){
    var $addTime = $("#addTime");
    var $addInput = $("#addInput");

    $addTime.unbind("click").on("click", function(){
        AddOnPos(templateBox, 'time');
    });

    $addInput.unbind("click").on("click", function(){
        AddOnPos(templateBox, 'input');
    })
}

/**
 * 删除模板
 * @param curId 删除模板ID
 */
function delTemplate(curId){
    var params = {
        "id": curId
    };
    meeno.JQueryAjax(Api.API_DEL_TEMPLATE_LIST, params, function(data){
        commonFun.delSuccess(data);
    })
}

/**
 * 在光标的位置插入图片
 * @param {Object} myField  textarea的Id
 * @param {Object} myValue  插入的字符
 */
function AddOnPos(myField, myValue)
{
    //IE support
    if (document.selection)
    {
        myField.focus();
        sel = document.selection.createRange();
        myValue = "{"+myValue+"}";
        sel.text = myValue;
        sel.select();
    }

    //MOZ/NETSCAPE support
    else if (myField.selectionStart || myField.selectionStart == '0')
    {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;

        var restoreTop = myField.scrollTop;
        myValue = "{"+myValue+"}";
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
        if (restoreTop > 0)
        {
            myField.scrollTop = restoreTop;
        }
        myField.focus();
        myField.selectionStart = startPos + myValue.length;
        myField.selectionEnd = startPos + myValue.length;
    } else {
        myField.value += myValue;
        myField.focus();
    }
}