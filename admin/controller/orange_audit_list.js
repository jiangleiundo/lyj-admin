$(function(){
	oAuditModel.getModelByParams(oAuditParams.status);
});

var oAuditParams = {
	status : 2, //审核中
	status3 : 3, //审核失败
	status4 : 4 //审核成功
};

var oAuditModel = {
	getModelByParams : function(status){

		pageParams.searchParams = {
			status : status
		};
		pageParams.dataApi = Api.API_GET_GUIDEAUDIT;
		pageParams.callback = oAuditModel.oAuditModelCallback;
		ModelFun.dataModel();
		
		pageParams.txtpage.val(pageParams.currentpage);
		pageParams.pageNum.text(pageParams.totalpage);
		pageParams.setPageNum.val(pageParams.num);
	},

    /**
     *
     * @param data
     * @param data.data.guideAudit.applyTime 申请时间
     */
	oAuditModelCallback : function(data){
		var guideAudit = data["data"]["guideAudit"];
		var count = data["data"]["count"];
		pageParams.totalpage = commonFun.getTotalpages(count,pageParams.num);
		var html = "";
		if(guideAudit.length == 0)
		{
			html = '<tr><td colspan="6">暂无数据</td></tr>';
		}
		else
		{
			commonFun.setLocStorage(storageKey.kGuideAuditData,JSON.stringify(guideAudit));
			for(var i in guideAudit)
			{
                if (guideAudit.hasOwnProperty(i))
                {
                    var index = (pageParams.currentpage - 1)*pageParams.num + parseInt(i) + 1,
                        guideIcon = null;

                    //头像
                    if( !guideAudit[i].icon || guideAudit[i].icon == null)
                    {
                        guideIcon = 'images/default.png';
                    }
                    else
                    {
                        var icon = JSON.parse(guideAudit[i].icon);
                        guideIcon = icon.url + commonParams.IMG_CUT_H;
                    }

                    //性别
                    var sex = commonFun.getSex(guideAudit[i].gender);

                    //申请时间
                    var applyTime = guideAudit[i].applyTime; 
                    var applyTime0 = applyTime.split(" ")[0] == "0000-00-00"? "暂无数据": applyTime.split(" ")[0];

                    html += '<tr>';
                    html += '<td>'+ index +'</td>';
                    html += '<td><img src="'+ guideIcon +'"/></td>';
                    html += '<td>'+ guideAudit[i].nickName +'</td>';
                    html += '<td>';
                    if(!utilities.checkStringEmpty(guideAudit[i].legallyPhotos))
                    {
                        var arr = JSON.parse(guideAudit[i].legallyPhotos),
                            len = arr.length > 2? 2: arr.length; //只取2张图片

                        for(var j = 0; j < len; j++)
                        {
                            html += '<img style="margin:3px;" class="check-img" data-src="'+ arr[j] +'" src="'+ arr[j] + commonParams.IMG_CUT_H3 +'">';
                        }
                    }
                    html += '</td>';
                    html += '<td>'+ sex +'</td>';
                    html += '<td>'+ applyTime0 +'</td>';
                    html += '<td><a class="btn btn-info checkDetials" data-id="'+guideAudit[i].userId+'">查看详情</a></td>';
                    html += '</tr>';
                }
			}
		}

		pageParams.tbody.empty().append(html);
		$(".spinner").hide();
		$(".preload").fadeIn();

        /* 查看大图 */
        $(".check-img").unbind().on("click", function(){
            var curURL = $(this).attr("data-src");

            imgModal.show(curURL);
        });

		//查看桔子详情
		$(".checkDetials").on("click",function() {

			var userId = $(this).attr("data-id"),
                guideAudit =JSON.parse(commonFun.getLocStorage(storageKey.kGuideAuditData));

            checkOrangeInfo(userId, guideAudit);
		})
	}
};

//点击退出当前页面
$("#btnCancel").on("click",function(){
	$(".oAuditListDital").hide();
	$(".oAuditList").fadeIn();
});

/* 搜索 */
$("#coun_search_btn").on("click", function(){

    pageParams.currentpage = 1;
    pageParams.searchParams = {
        "name" : $("#search").val(),
        "status" : oAuditParams.status
    };
    pageParams.dataApi = Api.API_GET_GUIDEAUDIT;
    pageParams.callback = oAuditModel.oAuditModelCallback;
    ModelFun.dataModel();
});

//根据语种id获取语种文字
var languageModel = {
	getModelById : function(ids){
		var params = {
			ids : ids
		};
		meeno.JQueryAjax(Api.API_GET_LANGUAGEWIDTHIDS,params,languageModel.languageCallback);
	},

    /**
     *
     * @param data
     * @param data.data.languages.languageName 语种
     */
	languageCallback : function(data){
		var languages = data["data"]["languages"];
		var lanArr = [];
		for(var i in languages)
		{
            if(languages.hasOwnProperty(i))
            {
                var language = languages[i].languageName;
                lanArr.push(language + " ");
            }
		}

		$("#tbody_08").find(".tuan").empty().append(lanArr);
	}
};

//改变待审核状态
var auditModel = {
	getModelByParams : function(status,guideId){
		var params = {
			guideId : guideId,
			status : status
		};
		meeno.JQueryAjax(Api.API_MOD_GUIDEAUDIT,params,auditModel.oAuditCallback);
	},
	oAuditCallback : function(){
		window.parent.commonDialog("操作成功，可在桔子列表中查看");
	}
};

/**
 * 查看桔子详情
 * @param userId 桔子ID
 * @param guideAudit 桔子数据
 * @param guideAudit.length 数组长度
 * @param guideAudit.realName 真实姓名
 * @param guideAudit.birthday 生日
 * @param guideAudit.legallyNumber 导游证编号
 * @param guideAudit.legallyLanguages 导游语种
 * @param guideAudit.legallyTime 导游语种
 * @param guideAudit.legallyPhotos 导游证
 * @param guideAudit.canDriver 导游驾照
 * @param guideAudit.canAnswer 导游是否愿意回答问题
 * @param guideAudit.canProvideLine 导游是否定制路线
 * @param guideAudit.familiarPlace 导游熟悉城市
 * @param guideAudit.guideKeyword 导游熟悉景点
 * @param guideAudit.selfEvaluation 导游自我评价
 * @param guideAudit.lifeMotto 导游座右铭
 */
function checkOrangeInfo(userId, guideAudit) {

    for(var i = 0, len = guideAudit.length; i < len; ++i){

        if(guideAudit[i].userId == userId)
        {
            $("#tbody_01").find(".tuan").text(guideAudit[i].nickName);
            $("#tbody_02").find(".tuan").text(guideAudit[i].realName);
            $("#tbody_03").find(".tuan").text(guideAudit[i].location);
            $("#tbody_04").find(".tuan").text(commonFun.getSex(guideAudit[i].gender));
            $("#tbody_05").find(".tuan").text(guideAudit[i].birthday.split(" ")[0]);
            $("#tbody_07").find(".tuan").text(guideAudit[i].legallyNumber == ""? "暂无数据" : guideAudit[i].legallyNumber);
            if(utilities.checkStringEmpty(guideAudit[i].legallyLanguages))
            {
                $("#tbody_08").find(".tuan").text("暂无数据")
            }
            else
            {
                var languageIdsArr = [];
                for(var j = 0; j < JSON.parse(guideAudit[i].legallyLanguages).length; j++)
                {
                    languageIdsArr.push(JSON.parse(guideAudit[i].legallyLanguages)[j]);
                }
                var tt = '['+ languageIdsArr +']';
                languageModel.getModelById(tt);
            }
            $("#tbody_09").find(".tuan").text(guideAudit[i].legallyTime == ""? "暂无数据" : guideAudit[i].legallyTime.split(" ")[0]);
            if(!utilities.checkStringEmpty(guideAudit[i].legallyPhotos))
            {
                var legallyPhotos = JSON.parse(guideAudit[i].legallyPhotos);
                var html = "";
                for(var k = 0; k < legallyPhotos.length; k++)
                {
                    html += '<img src="'+ legallyPhotos[k] + commonParams.IMG_CUT_H2 +'"/>&nbsp;&nbsp;';
                }

                $("#tbody_10").find(".tuan").empty().append(html);
            }
            else
            {
                $("#tbody_10").find(".tuan").empty();
            }

            $("#tbody_11").find(".tuan").text(customFun.isRecommand(parseInt(guideAudit[i].canDriver)));
            $("#tbody_12").find(".tuan").text(customFun.isRecommand(parseInt(guideAudit[i].canAnswer)));
            $("#tbody_13").find(".tuan").text(customFun.isRecommand(parseInt(guideAudit[i].canProvideLine)));
            $("#tbody_14").find(".tuan").text(guideAudit[i].familiarPlace);
            $("#tbody_15").find(".tuan").text(guideAudit[i].guideKeyword);
            $("#tbody_16").find(".tuan").text(guideAudit[i].selfEvaluation);
            $("#tbody_17").find(".tuan").text(guideAudit[i].lifeMotto);
        }
    }

    $(".oAuditList").hide();
    $(".oAuditListDital").fadeIn();

    //同意申请
    $("#btnagree").on("click",function()
    {
        auditModel.getModelByParams(oAuditParams.status4, userId);
        $(".oAuditListDital").hide();
        $(".oAuditList").fadeIn();
        oAuditModel.getModelByParams(oAuditParams.status);
    });

    //拒绝申请
    $("#btnrefuse").on("click",function()
    {
        auditModel.getModelByParams(oAuditParams.status3, userId);
        $(".oAuditListDital").hide();
        $(".oAuditList").fadeIn();
        oAuditModel.getModelByParams(oAuditParams.status);
    })
}

