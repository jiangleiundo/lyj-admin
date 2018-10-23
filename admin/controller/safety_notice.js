$(function(){
	getSafetyNoticeModel.getModelByParams();
});

var safeNoticeParams ={
	instructionsId : null
};

var getSafetyNoticeModel = {
	getModelByParams : function(){
		pageParams.searchParams = {};
		pageParams.dataApi = Api.API_GET_INSTRUCTIONS;
		pageParams.callback = getSafetyNoticeModel.getSafetyNoticeCallback;
		ModelFun.dataModel();
		
		pageParams.txtpage.val(pageParams.currentpage);
		pageParams.pageNum.text(pageParams.totalpage);
		pageParams.setPageNum.val(pageParams.num);
	},
	getSafetyNoticeCallback : function(data){
		var instructions = data.data.instructions;
		var count = data.data.count;
		pageParams.totalpage = commonFun.getTotalpages(count,pageParams.num);
		var html = "";
		if(instructions.length == 0)
		{
			html = '<tr><td colspan="5">暂无数据</td></tr>';
		}
		else
		{
			commonFun.setLocStorage(storageKey.KsafetyNotice,JSON.stringify(instructions));
			for(var i in instructions)
			{
				var index = (pageParams.currentpage - 1)*pageParams.num + parseInt(i) + 1;
				//须知类型
				var noticetype = commonFun.getNoticeType(instructions[i].type);
				if(instructions[i].instructions == "" || instructions[i].instructions == null)
				{
					var noticetxt = "暂无数据";
					var noticeStr = "暂无数据";
				}
				else
				{
                    var noticetxt = instructions[i].instructions;
                    var noticeStr = noticetxt.substring(0,170);
					
				}
				   html += '<tr>';
				   html += '<td class="t-notice1">'+ index +'</td>';
				   html += '<td class="t-notice2">'+ noticetype +'</td>';
				   html += '<td class="t-notice3">'+ noticeStr +'<div style="display:none"><textarea disabled class="showTextarea" rows="10" style="width:100%; height:100%;">'+ noticetxt +'</textarea></div></td>'; 
				   html += '<td class="t-notice2"><a class="btn btn-info modify" data-id="'+ instructions[i].id +'">编辑</a></td>';
				   html += '</tr>';
			}
		}
		$("#tbody").empty().append(html);
		$(".spinner").hide();
		$(".preload").fadeIn();
		$(".modify").on("click",function(){
			safeNoticeParams.instructionsId = $(this).attr("data-id");
			var instructionsCopy = JSON.parse(commonFun.getLocStorage(storageKey.KsafetyNotice));
			var txtArea = "";
			for(var i=0;i<instructionsCopy.length;i++)
			{
				if(safeNoticeParams.instructionsId == instructionsCopy[i].id)
				{
                    txtArea = '<textarea class="form-control" name="content" style="width:100%; height:500px; padding:1%; resize:none;" id="textarea">'+ instructionsCopy[i].instructions +'</textarea>';
				}
			}
			$(".safe_detial").empty().append(txtArea);
			$(".safety_notice_list").hide();
			$(".safety_notice_detials").fadeIn();
		});

		/*鼠标悬停景点介绍文本显示*/
		$(".t-notice3").on("mouseover",function(){
			$(this).children("div").css("display","block");
		});
		$(".t-notice3").on("mouseout",function(){
			$(this).children("div").css("display","none");
		})
	}
};

//回退
$("#btnCancel").on("click",function(){
	$(".safety_notice_detials").hide();
	$(".safety_notice_list").fadeIn();
});

//提交更改的数据
$(".submitNotice").on("click",function(){
	var textArea = $("#textarea").val();
	getEditSafeNoticeModel.getModelByParams( safeNoticeParams.instructionsId, textArea );
});

var getEditSafeNoticeModel = {
	getModelByParams : function(instructionsId,instructions){
		var params = {
			instructionsId : instructionsId,
			instructions : instructions
		};
		meeno.JQueryAjax(Api.API_MOD_INSTRUCTIONS,params,getEditSafeNoticeModel.getEditSafeNoticeCallback);
	},
	getEditSafeNoticeCallback : function(data){
		if(data.err == 0)
		{
			$(".safety_notice_detials").hide();
			$(".safety_notice_list").fadeIn();
			getSafetyNoticeModel.getModelByParams();//重新获取数据
			window.parent.commonDialog("数据修改成功");
		}
		else
		{
			window.parent.commonDialog("提交失败");
		}
	}
};





















