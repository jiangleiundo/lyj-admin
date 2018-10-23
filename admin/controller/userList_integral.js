$(function(){
	_params.userId = GetQueryString("id"); //获取点击用户的id
    _params.curPage = GetQueryString("curPage");
    _params.curNum = GetQueryString("curNum");

	var str = String(window.location);
	_params.userName = decodeURI( str.split("=")[4] );//获取跳转页面前用户名
	_integralModel.getModelByType(_params.opType, _params.userId);
});

var _params = {
	opType : 0,
	userId : null,
	userName : null,
    curPage : null,
    curNum : null,
	tab : $("#tab").find("div")

};

_params.tab.on("click",function(){

	_integralModel.getModelByType($(this).attr("data-id"), _params.userId);
	if($(this).attr("data-id") == 0) {
		$(".thead_jfget").text("获得积分");
		$(".thead_jftype").text("获得积分类型");
		$(".thead_jftime").text("获得积分时间");
	}else{
		$(".thead_jfget").text("使用积分");
		$(".thead_jftype").text("使用积分类型");
		$(".thead_jftime").text("使用积分时间");
	}
});

var _integralModel = {
	getModelByType : function(type,id){

		pageParams.searchParams = {
			"userId" : id,
			"opType" : type
		};
		pageParams.dataApi = Api.API_GET_INTEGRAL;
		pageParams.callback = _integralModel.integralCallback;//获取积分回调
		ModelFun.dataModel();
		
		pageParams.txtpage.val(pageParams.currentpage);
		pageParams.pageNum.text(pageParams.totalpage);
		pageParams.setPageNum.val(pageParams.num);
	},
	
	integralCallback : function(data){
		var integral = data["data"]["integral"];
		var count = data["data"]["count"];
		pageParams.totalpage = commonFun.getTotalpages(count,pageParams.num);
		var html = "";
		if(integral.length == 0)
        {
			html = '<tr><td colspan="6">暂无数据</td></tr>';
		}
        else
        {
			for(var i in integral){
                if(integral.hasOwnProperty(i))
                {
                    var index = (pageParams.currentpage - 1)*pageParams.num + parseInt(i) + 1;

                    //判断用户类型
                    var uType = integral[i].userType;
                    var userType = commonFun.getuType(uType);
                    //获得积分类型
                    var integralType = integral[i].integralType;
                    var integType = commonFun.getIntegralType(integralType);

                    html += '<tr>';
                    html += '<td>'+ index +'</td>';
                    html += '<td>'+ _params.userName +'</td>';
                    html += '<td>'+ userType +'</td>';
                    html += '<td>'+ integral[i].integral +'</td>';
                    html += '<td>'+ integType +'</td>';
                    html += '<td>'+ integral[i].time +'</td>';
                    html += '</tr>'
                }
			}
		}

		$("#tbody").empty().append(html);
		$(".spinner").hide();
		$(".preload").fadeIn();
	}
};

$("#btnCancel").on("click",function(){

	location.href = "user_list.html?curPage=" + _params.curPage + '&curNum=' + _params.curNum;
});
