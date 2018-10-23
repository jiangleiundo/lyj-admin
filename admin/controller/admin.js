$(function(){

	pageParams.searchParams = {};
	pageParams.dataApi = Api.API_GET_USERS;
	pageParams.callback = getUsers;
	ModelFun.dataModel();
	
	pageParams.txtpage.val(pageParams.currentpage);
	pageParams.pageNum.text(pageParams.totalpage);
	pageParams.setPageNum.val(pageParams.num);
});

var adminParams = {
	permissions : $(".userPeremison_main span"),
	txtName : $("#userName"),
	txtpwd : $("#pwd"),
	uid : 0,
	uname : 0,
	uType : 0
};

/**
 * @param data
 * @param data.data.users.userType 用户类型
 * @param data.data.users.registerTime 注册时间
 * @param data.data.users.lastLoginTime 最近登录时间
 */
function getUsers(data)
{
	var users = data["data"]["users"],
	    count = data["data"]["count"],
        html = "";

	pageParams.totalpage = commonFun.getTotalpages(count, pageParams.num);

	if(users.length == 0)
	{
		html += '<tr><td colspan = 8>暂无数据</td></tr>';
	}
	else
	{
		for(var i = 0, len = users.length; i < len; i++) {

            var index = (pageParams.currentpage - 1)*pageParams.num + (i + 1),
                uId = users[i].id,
                uType = users[i].userType,
                uType0 = adminFun.getUserType(uType),
                uName = users[i].username,
                uPwd = users[i].password,

                //注册时间
                registerTime = users[i].registerTime,

                //最近登录
                lastLoginTime = users[i].lastLoginTime,
                uPerm = users[i].permissions;
			
			html += '<tr>';
			html += '<td>'+ index +'</td>';
			html += '<td>'+ uType0 +'</td>';
			html += '<td>'+ uName +'</td>';
			html += '<td>'+ uPwd +'</td>';
			html += '<td>'+ registerTime +'</td>';
			html += '<td>'+ lastLoginTime +'</td>';
			if(uType == "1")
			{
				html += '<td></td>';
				html += '<td>';
				html += '</td>';
			}
			else
			{
				html += '<td><a href="#" class="btn btn-info modify" data-id="'+uId+'" data-name="'+uName+'" data-pwd="'+uPwd+'" data-perm="'+uPerm+'">修改</a></td>';
				html += '<td>';
				html += '<div class="rem_con">';
				html += '<div class="rem_con_lf"><span class="un_sel" data-id="'+uId+'"></span></div></div>';
				html += '</td>';
			}
			html += '</tr>';
		}
		
	}
	pageParams.tbody.empty().append(html);
	$(".spinner").hide();
	$(".preload").fadeIn();
	
	commonFun.oneSelected("allsel");
	
	$(".modify").on("click",function(){
		pageParams.addAdm = 2;
		commonFun.showModal("修改管理员");
		adminParams.permissions.attr("class",commonParams.btnItem);
		adminParams.txtName.val($(this).attr("data-name"));
		adminParams.txtpwd.val($(this).attr("data-pwd"));
		adminParams.uid = $(this).attr("data-id");
		adminParams.uname = $(this).attr("data-name");
		var permission = $(this).attr("data-perm");
		if(permission != null)
		{
			var permArry = permission.split(','); //split() 方法用于把一个字符串分割成字符串数组。
			for(var i = 0, len = permArry.length; i < len; i++) {
				adminParams.permissions.each(function(){
					var curId = $(this).attr("data-id");
					if(curId == permArry[i]){
						$(this).attr("class",commonParams.actItem)
					}
				})
			}
		}
	})
}

commonFun.allSelected("allsel");

commonParams.btnDel.on("click",function() {

	if(adminParams.uType != 1) {//不能删除超级管理员

		commonFun.delListByIds("ids", Api.API_DEL_USERS);
	}
});


adminParams.permissions.on("click",function() {
	var curClass = $(this).attr("class");

	if(curClass == commonParams.btnItem) {
		$(this).attr("class", commonParams.actItem);
	}
    else
    {
		$(this).attr("class", commonParams.btnItem);
	}
});

commonParams.btnAdd.on("click",function() {
	adminParams.txtName.val("");
	adminParams.txtpwd.val("");
	adminParams.permissions.attr("class",commonParams.btnItem);
	commonFun.showModal("添加管理员");
});

commonParams.modalSubmit.on("click", function(){
	var pArr = [];
	adminParams.permissions.each(function(){
		var curClass = $(this).attr("class");
		if(curClass == commonParams.actItem){
			pArr.push($(this).attr("data-id"));
		}
	});

	var pIdArray = pArr.join(",");

	if(adminParams.txtName.val() == "" || adminParams.txtpwd.val() == "")
	{
		window.parent.commonDialog("用户名或密码不能为空！");
	}
    else
	{
		var params = {};

		if(pageParams.addAdm == 1)
		{

			params.username = adminParams.txtName.val();
			params.password = adminParams.txtpwd.val();
			params.permissions = pIdArray;

			meeno.JQueryAjax(Api.API_ADD_USERS, params, commonFun.addSuccessWithModal);
		}
		else
		{
			params["id"] = adminParams.uid;

			if(adminParams.uname == adminParams.txtName.val())
			{
				params["account"] = "";  //由于后台的原因当传递同一个用户名时系统会报错，当不修改用户名时只要传一个空就行了。
			}
			else
			{
				params["account"] = adminParams.txtName.val();
			}
			params["password"] = adminParams.txtpwd.val();
			params["permissions"] = pIdArray;
			meeno.JQueryAjax(Api.API_MOD_ADMIN,params,commonFun.modSuccessWithModal);
		}
	}
});
