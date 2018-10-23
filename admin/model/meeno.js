/**
 * meeno.js
 * Created By: 梁勇
 * Data: 2015-08-06
 * Description: 提供基础方法和共用方法
 */

var meeno = {
	//封装Ajax
	JQueryAjax : function(s_url, param, callback)
	{
		var phpSessId = localStorage.getItem('PHPSESSID');	
		if ((phpSessId != null) && (phpSessId != ''))
		{
			s_url = s_url + "?sid=" + phpSessId;
		}
		
	    $.ajax({        
	        url: s_url,
	        async:false,
	        type: "post",
	        data: param,
	        dataType:"json",
	        success: function(data) {  
	        	var err = data['err'];
	            var errMsg = data['errMsg'];
	            if (err != errCode.success)
	            {
	                // 调用接口返回错误
	                if (errMsg != "")
	                {
                        alert(errMsg);
	                }                
	                if (err == errCode.tokenFailed)
	                {
	                    // 会话不存在，需要清本地数据
	                    try{
		                    window.parent.frames.location.href = "login.html";
	                    }catch(e){
	                    	location.href = "login.html";
	                    }
	                }
	                callback(''); //掉接口失败的回调
	            }
	            else
	            {
	                callback(data); //成功的回调
	            }        	        	
		    },
	        error: function () {

	           	alert('请求数据失败');
	        }
	    });
	}
	
};

//取列表类数据，type 1 为没有分页 ， 0为有分页
var baseFun = {
	baseModel : function(type,currentpage, num, searchparams,api,callback){
		if(type == 1)
		{
			var params = {};
			meeno.JQueryAjax(api,params,callback);
		}
		else
		{
			var defaultparams = {
				"startIndex":(currentpage - 1)*num,
				"num":num
			};
			var extendparams = $.extend({}, defaultparams,searchparams);
			meeno.JQueryAjax(api,extendparams,callback);
		}
	}
};

//简化底层，方便调用
var ModelFun = {
	dataModel :  function(){
		baseFun.baseModel(
			pageParams.dataType,
			pageParams.currentpage,
			pageParams.num,
			pageParams.searchParams,
			pageParams.dataApi,
			pageParams.callback
		)
	}
};

