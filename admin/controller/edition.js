$(function(){
	getVersion();
	getServicePhone();
});

//版本信息
function getVersion(){
	versionFun.getVersion(function(data){
		var versions = data.data.versions;
		var html = "";
		for(var i = 0; i < versions.length; i++)
		{
			var versionIdCopy = versions[i].id;
			var versionTypeCopy = versionFun.getVersionType(versions[i].versionType);
			var versionCodeCopy = versions[i].versionCode;
			var updateInfoCopy = versions[i].updateInfo;
			var updateUrlCopy = versions[i].updateUrl == null? "暂无数据" : versions[i].updateUrl;
			
			html += '<div class="version-box"><div class="version-con"><span>版本类型：</span><div class="version-content">'+ versionTypeCopy +'</div></div>';
			html += '<div class="version-con"><span>版本号：</span><div class="version-content">'+ versionCodeCopy +'</div></div>';
			html += '<div class="version-con"><span>升级信息：</span><div class="version-content">'+ updateInfoCopy +'</div></div>';
			html += '<div class="version-con"><span>更新链接：</span><div class="version-content">'+ updateUrlCopy +'</div></div>';
			html += '<div class="version-con"><span>修改版本：</span><div class="version-content"><input id="modIput'+ versionIdCopy +'" class="form-control"/></div><div class="version-btn"><a data-id="'+ versionIdCopy +'" class="btn btn-info modVersion">提交</a></div></div></div>';
		}
		
		$("#version-about").empty().append(html);
        $(".spinner").hide();
        $(".preload").show();
		$(".modVersion").on('click', function(){
			var curId = $(this).attr("data-id");
			var code = $("#modIput" + curId).val();
			var params = {
				"id" : curId,
				"versionCode" : code
			};
			if(code != "")
			{
				versionFun.modVersion(params, function(data){
					getVersion();
					alert("更新成功");
				})
			}
			
		})
	})
}

//服务电话
function getServicePhone(){
	versionFun.getServicePhone(function(data){
		var version = data.data.version;
		var serviceTelCopy = version.serviceTel;
		var id = version.id;
		
		var html = '';
		html += '<div class="version-con"><span>服务电话：</span><div class="version-content">'+ serviceTelCopy +'</div></div>';
		html += '<div class="version-con"><span>修改服务电话：</span><div class="version-content"><input id="modPhone" class="form-control"/></div><div class="version-btn"><a data-id="'+ id +'" class="btn btn-info modVersion2">提交</a></div></div></div>';
		
		$("#version-service").empty().append(html);
		$(".modVersion2").on("click", function(){
			var curId = $(this).attr("data-id");
			var code = $("#modPhone").val();
			var params = {
				"serviceTel" : code
			};
			if(code != "")
			{
				versionFun.modServicePhone(params, function(data){
					getServicePhone();
					alert("更新成功");
				})
			}
		})
		
	})
}

//version Fun
var versionFun = {
	//获得版本信息
	getVersion : function(callback){
		meeno.JQueryAjax(Api.API_GET_VERSION, {}, callback)
	},
	
	//修改版本信息
	modVersion : function(params, callback){
		meeno.JQueryAjax(Api.API_MOD_VERSION, params, callback)
	},
	
	//获取服务电话
	getServicePhone : function(callback){
		meeno.JQueryAjax(Api.API_GET_CONSTANT, {}, callback)
	},
	
	//修改服务电话
	modServicePhone : function(params, callback){
		meeno.JQueryAjax(Api.API_MOD_CONSTANT, params, callback)
	},
	
	//版本类型
	getVersionType : function(type){
		var version = "";
		switch (parseInt(type))
		{
			case 1:
				version = "Android版";
				break;
			case 2:
				version = "IOS版";
				break;
			default:
				version = "";
				break;
		}
		return version;
	}
};
