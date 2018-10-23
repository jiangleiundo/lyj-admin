var commonFun = {
	setLocStorage : function(key, value)
	{
		localStorage.setItem(key, value);
	},
	
	getLocStorage : function(key)
	{
		return localStorage.getItem(key);
	},
	
	showModal : function(title){
		commonParams.modalTitle.text(title);
		commonParams.commonModal.modal("show");
	},
	
	hideModal : function(){
		commonParams.commonModal.modal("hide");
	},
	
	addSuccessWithModal : function(data)
	{
		var err = data["err"];
		if(err == errCode.success)
		{
			commonFun.hideModal();
			pageParams.tbody.empty();
			ModelFun.dataModel();
			window.parent.commonDialog(errParams.addSucces);
		}
	},
	
	modSuccessWithModal:function(data)
	{
		var err = data["err"];
		if(err == errCode.success)
		{
			commonFun.hideModal();
			pageParams.tbody.empty();
			ModelFun.dataModel();
			window.parent.commonDialog(errParams.modSucces);
		}
	},
	
	delSuccess:function(data)
	{
		var err = data["err"];
		if(err == errCode.success)
		{
			pageParams.tbody.empty();
			ModelFun.dataModel();
			window.parent.commonDialog(errParams.delSucces);
		}
	},
	
	getTotalpages : function(count,num)
	{
		var pagecount = "";
	   	var remainder = count%num;
	   	var integer = parseInt(count/num);
	   	if(remainder == 0)
	   	{
	   	 	pagecount = integer;
	   	}
	   	else
	   	{
	   	 	pagecount = integer + 1;
	   	}
	   	return pagecount;
	},
	
	oneSelected : function(id){
		$("#tbody span").click(function(){
			$("#" + id).attr("class","un_sel");
			var curClass = $(this).attr("class");
			if(curClass == "un_sel"){
				$(this).attr("class","has_sel");
			}else{
				$(this).attr("class","un_sel");
			}
		})
	},
	
	allSelected : function(id){
		$("#" + id).click(function(){
			var curClass = $(this).attr("class");

			if(curClass == "un_sel") {
				$(this).attr("class","has_sel");
				$("#tbody span").attr("class","has_sel");
			}
            else {
				$(this).attr("class","un_sel");
				$("#tbody span").attr("class","un_sel");
			}
		})
	},
	
	delListByIds : function(ids,api)
	{
		var id_array = new Array();  
		$('#tbody span').each(function(){  
	        if($(this).attr("class") == "has_sel")
	        {
	        	id_array.push($(this).attr('data-id')); 
	        }
		});  
		if(id_array.length == 0)
		{
			window.parent.commonDialog("请选择删除的选项");
		}
		else
		{
			var params = {};
			params[ids] = JSON.stringify(id_array);
			meeno.JQueryAjax(api,params,commonFun.delSuccess);
		}	
	},
	
	getDefaultImgae : function(serUrl,defaulturl){
		var getImage = "";
		if( !serUrl || serUrl == null){
			getImage = defaulturl;
		}else{
			getImage = serUrl;
		}
		return getImage;
	},
	
	getDefaultIcon : function(serUrl,defaulturl){
		var getImage = "";
		if( !serUrl || serUrl == null){
			getImage = defaulturl;
		}else{
			var icon = JSON.parse(serUrl);
			getImage = icon.url;
		}
		return getImage;
	},

	getSex : function(gender){
		var sex = "";
		if(gender == 0){
			sex = "男";
		}else{
			sex = "女";
		}
		return sex;
	},
	
	getnowDate : function(data){
	var today = new Date(parseInt(data));
	var y = today.getFullYear();
	var m = today.getMonth() + 1;
	var d = today.getDate();
	
	return y + '-' + m + '-' + d;
	},
	
	//获取当前登录的具体日期
	userDate : function(data){
	     var myDate = new Date(parseInt(data));
	     var year = myDate.getFullYear();
	     var month = myDate.getMonth() + 1;
	     var day = myDate.getDate();
	     var hours = myDate.getHours();
	     var minutes = myDate.getMinutes();
	     if(minutes < 10){
	     	minutes = "0"+ minutes;
	     }
	     var seconds = myDate.getSeconds();
	     return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
	},
	
	//判断用户的类型
	getuType : function(type){
		var typeText;
		if(type == 1){
			typeText = "游客";
		}else{
			typeText = "导游";
		}
		return typeText;
	},
	
	//判断积分类型
	getIntegralType : function(type){
		var integralType;
		switch(parseInt(type))
		{
		case 1:
			integralType = "注册";
			break;
			
		case 2:
			integralType = "每日登陆";
			break;
			
		case 3:
			integralType = "连续登陆";
			break;
			
		case 4:
			integralType = "回答问题";
			break;
			
		case 5:
			integralType = "采纳答案";
			break;
			
		case 6:
			integralType = "答案被点赞";
			break;
			
		case 7:
			integralType = "邀请好友成功";
			break;
			
		case 8:
			integralType = "带团积分";
			break;
			
		case 9:
			integralType = "足迹被赞";
			break;
			
		case 10:
			integralType = "交易";
			break;
			
		case 11:
			integralType = "点赞获取积分";
			break;
			
		case 12:
			integralType = "私信提问扣除积分";
			break;
			
		case 13:
			integralType = "私信回答获得积分";
			break;
			
		default:
			integralType = "";
		}
		return integralType;
	},
	
	//判断积分类型
	getReadPermissions : function(type){
		var readPermissions;
		switch(parseInt(type))
		{
		case 1:
			readPermissions = "默认";
			break;
			
		case 2:
			readPermissions = "只给桔子看";
			break;
			
		case 3:
			readPermissions = "只给游客看";
			break;
			
		case 4:
			readPermissions = "只给关注我的人看";
			break;
			
		case 5:
			readPermissions = "只给自己看";
			break;
		default:
			readPermissions = "";
		}
		return readPermissions;
	},
	
	//判断须知类型
	getNoticeType : function(type){
		var safetyType = "";
		switch(parseInt(type))
		{
		case 1:
			safetyType = "安全须知";
			break;
		case 2:
			safetyType = "国内携带物品须知";
			break;
		case 3:
			safetyType = "港澳携带物品须知";
			break;
		case 4:
			safetyType = "国外携带物品须知";
			break;
		case 5:
			safetyType = "台湾携带物品须知";
			break;
		default:
			safetyType = "暂无数据";
			
		}
		return safetyType;
	},
	
	//获得消息类型
	getMessageType : function(type){
		var msgType = "";
		switch (type)
		{
		case "txt":
			msgType = "文字";
			break;
		case "img":
			msgType = "图片";
			break;
		case "audio":
			msgType = "语音";
			break;
		default:
			break;
		}
		return msgType;
	}

};

//获取url参数(通过URL传递参数)
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) {

	    return  decodeURIComponent(r[2]);
    }
    else
    {
        return null;
    }
}

//自定义函数
var customFun = {
	isRecommand : function(isRec){
		var Rectext;
		switch(isRec)
		{
		  case 1:
		    Rectext ="是";
		    break;
		  case 0:
		    Rectext ="否";
		    break;
		}
		return Rectext;
	}
};

/*获取管理员类型*/
var adminFun = {
	getUserType : function(type){
		var typeText;
		if(type == 1){
			typeText = "超级管理员";
		}else{
			typeText = "普通管理员";
		}
		return typeText;
	}
};

// 一些常用函数
var utilities = {

    numberPrefix : function (size, num)
    {
        var sLen = ('' + num).length;
        if (sLen >= size) {
            return '' + num;
        }
        var preZero = (new Array(size)).join('0');

        return preZero.substring(0, size - sLen) + num;
    },

    //时间戳转日期 YYYY-MM-DD HH:SS
    formatDate : function(timestamp, onlyDate)
    {
        var date = new Date(timestamp * 1000);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();

        if (onlyDate)
        {
            return this.numberPrefix(4, year) + "-" + this.numberPrefix(2, month) + "-" + this.numberPrefix(2, day);
        }

        return this.numberPrefix(4, year) + "-" + this.numberPrefix(2, month) + "-" + this.numberPrefix(2, day) + " "
            + this.numberPrefix(2, hour) + ":" + this.numberPrefix(2, minute) + ":" + this.numberPrefix(2, second);
    },

    // 检查字符串是否为空
    checkStringEmpty : function(str)
    {
        if (str == undefined || str == 'undefined' || str == null || str == '' || str == 'null' || str == "''" || str == "[]")
        {
            return true;
        }

        return false;
    }
};

var $modal = {
    toast : function(errMsg){

        var html = '';
        html += '<div class="toast">';
        html += '<img src="./images/warnning.png" />';
        html += '<p>'+errMsg+'</p>';
        html += '</div>';

        $('body', window.parent.document).append(html);
        $(".toast", window.parent.document).fadeIn();

        setTimeout(function() {
            $(".toast", window.parent.document).remove();
        },1500);
    }
};