$(function(){
	var isremember = commonFun.getLocStorage(storageKey.kisrem);
	var userName = commonFun.getLocStorage(storageKey.KuserName);
	var pwd = commonFun.getLocStorage(storageKey.Kpwd);
	if(!utilities.checkStringEmpty(pwd) && isremember == 1)
	{
		loginParams.remLogin.attr("class",commonParams.hasSel0);
	}
	
	if(isremember == 1){
		loginParams.txtUserName.val(userName);
		loginParams.txtpwd.val(pwd);
	}else{
		loginParams.txtpwd.val("");
		loginParams.remLogin.attr("class",commonParams.unSel0);
	}
})

//登陆变量
var loginParams = {
	txtUserName : $(".user_input"),
	txtpwd : $(".pwd_input"),
	errTip : $(".error_tip"),
	remLogin : $(".remBox_lt span"),
	btnLogin : $(".btn_login"),
}

//记住密码点击事件
loginParams.remLogin.on("click",function(){
	var curClass = $(this).attr("class");
	if(curClass == commonParams.unSel0){
		$(this).attr("class",commonParams.hasSel0);
	}else{
		$(this).attr("class",commonParams.unSel0);
	}
})

//表单验证和登陆方法
var login = {
	//表单验证
	validateForm : function(errMeg){
		loginParams.errTip.text(errMeg);
		loginParams.errTip.slideDown();
	},
	
	//管理员登陆
	adminLogin : function (username,pwd){
		var params = {};
		params["username"] = loginParams.txtUserName.val();
		params["password"] = loginParams.txtpwd.val();
		
		$.ajax({        
	        url: Api.API_ADMIN_LOGIN,
	        async:false,
	        type: "post",
	        data: params,
	        dataType:"json",
	        success: function(data) {         	
	        	var err = data['err'];
	            var errMsg = data['errMsg'];
	            if (err != errCode.success)
	            {
	                if (errMsg != "")
	                {
	                	login.validateForm(errMsg);
	                }                
	            }    
	            else
	            {
	            	var myDate=new Date();
					var timestamp1 = myDate.getTime();//获得用户登录时间戳
					commonFun.setLocStorage(storageKey.kStamp,timestamp1);//存储当前用户登录时间到本地
	            	commonFun.setLocStorage( storageKey.KuserName,loginParams.txtUserName.val() );//存储用户名
	            	commonFun.setLocStorage(storageKey.KadminType,data["data"]["adminType"]);//存储用户类型
	            	commonFun.setLocStorage(storageKey.KPHPSESSID,data["data"]["PHPSESSID"]);//存储
	            	commonFun.setLocStorage(storageKey.Kpermissions,data["data"]["permissions"]);//存储权限
	                var curClass = loginParams.remLogin.attr("class");
	                if(curClass == commonParams.hasSel0){
	                	commonFun.setLocStorage(storageKey.kisrem,1);//存储是否记住密码
	                	commonFun.setLocStorage(storageKey.Kpwd,loginParams.txtpwd.val());
	                }else{
	                	commonFun.setLocStorage(storageKey.kisrem,0);
	                }
	                location.href = "index.html";
	            }        	        	
		    },
	        error: function () {
//	           alert('请求数据失败');
	        }
	    });
	}
}
//调用登陆方法
loginParams.btnLogin.on("click",function(){
	if(loginParams.txtUserName.val() == "")
	{
		login.validateForm(errParams.userNameblank);
	}
	else if(loginParams.txtpwd.val() == "")
	{
		login.validateForm(errParams.pwdblank);
	}
	else
	{
		login.adminLogin(
			loginParams.txtUserName.val(),
			loginParams.txtpwd.val()
		)
	}
})

//Enter键盘绑定事件
document.onkeypress = function(){
	if(event.keyCode == 13){
		login.adminLogin(
			loginParams.txtUserName.val(),
			loginParams.txtpwd.val()
		)
	}
}
 



