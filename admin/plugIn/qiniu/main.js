var sourceLink = null;
$(function() {
	//掉接口，得到gettoken
	meeno.JQueryAjax(Api.API_GET_UPLOADTOKEN,{},getUploadToken);
});

function getUploadToken(data){
	//获得token
	var token = data.data.token;
	
	var uploader = Qiniu.uploader({
		runtimes: 'html5,flash,html4',
        browse_button: 'fileUpload',    //点击上传文件的按钮id传进来，此处是fileUpload
        uptoken_url: '/token',  
        get_new_uptoken: false,
        container: 'sight_pics',    //此处放传入文件后文件放置的位置的父元素id，此处为sight_pics
        max_file_size: '1000mb',
        flash_swf_url: 'qiniu/Moxie.swf',
        dragdrop: true,
        chunk_size: '10mb',
        uptoken:token,
        domain: data.data.site,
        auto_start: true,
        init: {
            'UploadProgress': function(up, file) {
				$("#showMsg").val("上传中，请等待......")
            },
            'UploadComplete': function() {
            	$("#showMsg").val("");
            	$("#delBtn").text("删除");
				$("#delBtn").attr("class","btn btn-danger");
            },
            'FileUploaded': function(up, file, info) {
				var domain = up.getOption('domain');
                var res = JSON.parse(info);
            	sourceLink = 'http://'+domain + '/'+res.key;
				//添加节点
            	var temp = '<div class="s_img"><img src="'+sourceLink+'?imageView2/2/w/100"data-src="'+sourceLink+'"/><p class="s_del">&times;</p></div>';
            	$("#s_img").append(temp);
            	
        		//删除节点
        		$(".s_del").on("click",function(){
        			$(this).parent().remove();
        		})
            },
        	'Error': function(up, err, errTip) {
        		$("#showMsg").val("上传失败，请重新上传")
        	}
       	}
	})

	var Qiniu2 = new QiniuJsSDK();
	var uploader = Qiniu2.uploader({
		runtimes: 'html5,flash,html4',
        browse_button: 'fileUploadH',
        uptoken_url: '/token',
        get_new_uptoken: false,
        container: 's_imgH',
        max_file_size: '1000mb',
        flash_swf_url: 'qiniu/Moxie.swf',
        dragdrop: true,
        chunk_size: '10mb',
        uptoken:token,
        domain: data.data.site,
        auto_start: true,
        init: {
            'UploadProgress': function(up, file) {
				$("#showMsgH").val("上传中，请等待......")
            },
            'UploadComplete': function() {
            	$("#showMsgH").val("");
            	$("#delBtnH").text("删除");
				$("#delBtnH").attr("class","btn btn-danger");
            },
            'FileUploaded': function(up, file, info) {
				var domain = up.getOption('domain');
                var res = JSON.parse(info);
            	sourceLink = 'http://'+domain + '/'+res.key;
				//添加节点
            	var temp = '<div class="s_imgH"><img src="'+sourceLink+'?imageView2/2/w/100"data-src="'+sourceLink+'"/><p class="s_delH">&times;</p></div>';
            	$("#s_imgH").append(temp);
            	
        		//删除节点
        		$(".s_delH").on("click",function(){
        			$(this).parent().remove();
        		})
            },
        	'Error': function(up, err, errTip) {
        		$("#showMsgH").val("上传失败，请重新上传")
        	}
       	}
	})
	
	
	var Qiniu3 = new QiniuJsSDK();
	var uploader = Qiniu3.uploader({
		runtimes: 'html5,flash,html4',
        browse_button: 'bannerUpload',
        uptoken_url: '/token',
        get_new_uptoken: false,
        container: 'banner-con',
        max_file_size: '1000mb',
        flash_swf_url: 'qiniu/Moxie.swf',
        dragdrop: true,
        chunk_size: '10mb',
        uptoken:token,
        domain: data.data.site,
        auto_start: true,
        init: {
            'UploadProgress': function(up, file) {
				$("#percent").css("width", file.percent + "%")
            },
            'UploadComplete': function() {
            	$("#percent").css("width", 0)
            },
            'FileUploaded': function(up, file, info) {
				var domain = up.getOption('domain');
                var res = JSON.parse(info);
            	sourceLink = 'http://'+domain + '/'+res.key;
				//添加节点
            	var temp = '<div class="banner-img"><img src="'+sourceLink+'?imageView2/2/w/480" data-src="'+sourceLink+'"/></div>';
            	$("#banner-box").empty();
            	$("#banner-box").append(temp);
            	
            },
        	'Error': function(up, err, errTip) {
        		alert("上传失败，请重新上传");
        	}
       	}
	})
//	
//	var Qiniu4 = new QiniuJsSDK();
//	var uploader = Qiniu4.uploader({
//		runtimes: 'html5,flash,html4',
//      browse_button: 'background_btn1',
//      uptoken_url: '/token',  
//      get_new_uptoken: false,
//      container: 'bg_image_1',
//      max_file_size: '1000mb',
//      flash_swf_url: 'qiniu/Moxie.swf',
//      dragdrop: true,
//      chunk_size: '10mb',
//      uptoken:token,
//      domain: data.data.site,
//      auto_start: true,
//      init: {
//          'UploadProgress': function(up, file) {
//          },
//          'UploadComplete': function() {
//          },
//          'FileUploaded': function(up, file, info) {
//				var domain = up.getOption('domain');
//              var res = JSON.parse(info);
//          	sourceLink = 'http://'+domain + '/'+res.key;
//          	$("#background_img1").attr("src",sourceLink)
//          	$("#background_img1").attr("data-id",sourceLink)
//          },
//      	'Error': function(up, err, errTip) {
//      		alert("上传失败，请重新上传")
//      	}
//     	}
//	})
//	
//	var Qiniu5 = new QiniuJsSDK();
//	var uploader = Qiniu5.uploader({
//		runtimes: 'html5,flash,html4',
//      browse_button: 'video_btn1',
//      uptoken_url: '/token',  
//      get_new_uptoken: false,
//      container: 'video_content_1',
//      max_file_size: '1000mb',
//      flash_swf_url: 'qiniu/Moxie.swf',
//      dragdrop: true,
//      chunk_size: '10mb',
//      uptoken:token,
//      domain: data.data.site,
//      auto_start: true,
//      init: {
//          'UploadProgress': function(up, file) {
//          	$("#video_1").val("视频上传中，请耐心等待...")
//          },
//          'UploadComplete': function() {
//          },
//          'FileUploaded': function(up, file, info) {
//				var domain = up.getOption('domain');
//              var res = JSON.parse(info);
//          	sourceLink = 'http://'+domain + '/'+res.key;
//          	$("#video_1").val(sourceLink)
//          },
//      	'Error': function(up, err, errTip) {
//      		$("#video_1").val("视频上传失败，请重新上传...")
//      	}
//     	}
//	})
//	
////	2-----------------------------------------------------------------------------------------------
//	var Qiniu6 = new QiniuJsSDK();
//	var uploader = Qiniu6.uploader({
//		runtimes: 'html5,flash,html4',
//      browse_button: 'image_btn2',
//      uptoken_url: '/token',  
//      get_new_uptoken: false,
//      container: 'image_all2',
//      max_file_size: '1000mb',
//      flash_swf_url: 'qiniu/Moxie.swf',
//      dragdrop: true,
//      chunk_size: '10mb',
//      uptoken:token,
//      domain: data.data.site,
//      auto_start: true,
//      init: {
//          'UploadProgress': function(up, file) {
//          },
//          'UploadComplete': function() {
//          },
//          'FileUploaded': function(up, file, info) {
//				var domain = up.getOption('domain');
//              var res = JSON.parse(info);
//          	sourceLink = 'http://'+domain + '/'+res.key;
//          	var temp = '<img src="'+sourceLink+'"data-id="'+sourceLink+'"/>';
//          	$("#img_content2").append(temp)
//          },
//      	'Error': function(up, err, errTip) {
//      		alert("上传失败，请重新上传")
//      	}
//     	}
//	})
//	
//	var Qiniu7 = new QiniuJsSDK();
//	var uploader = Qiniu7.uploader({
//		runtimes: 'html5,flash,html4',
//      browse_button: 'background_btn2',
//      uptoken_url: '/token',  
//      get_new_uptoken: false,
//      container: 'bg_image_2',
//      max_file_size: '1000mb',
//      flash_swf_url: 'qiniu/Moxie.swf',
//      dragdrop: true,
//      chunk_size: '10mb',
//      uptoken:token,
//      domain: data.data.site,
//      auto_start: true,
//      init: {
//          'UploadProgress': function(up, file) {
//          },
//          'UploadComplete': function() {
//          },
//          'FileUploaded': function(up, file, info) {
//				var domain = up.getOption('domain');
//              var res = JSON.parse(info);
//          	sourceLink = 'http://'+domain + '/'+res.key;
//          	$("#background_img2").attr("src",sourceLink)
//          	$("#background_img2").attr("data-id",sourceLink)
//          },
//      	'Error': function(up, err, errTip) {
//      		alert("上传失败，请重新上传")
//      	}
//     	}
//	})
//	
//	var Qiniu8 = new QiniuJsSDK();
//	var uploader = Qiniu8.uploader({
//		runtimes: 'html5,flash,html4',
//      browse_button: 'video_btn2',
//      uptoken_url: '/token',  
//      get_new_uptoken: false,
//      container: 'video_content_2',
//      max_file_size: '1000mb',
//      flash_swf_url: 'qiniu/Moxie.swf',
//      dragdrop: true,
//      chunk_size: '10mb',
//      uptoken:token,
//      domain: data.data.site,
//      auto_start: true,
//      init: {
//          'UploadProgress': function(up, file) {
//          	$("#video_2").val("视频上传中，请耐心等待...")
//          },
//          'UploadComplete': function() {
//          },
//          'FileUploaded': function(up, file, info) {
//				var domain = up.getOption('domain');
//              var res = JSON.parse(info);
//          	sourceLink = 'http://'+domain + '/'+res.key;
//          	$("#video_2").val(sourceLink)
//          },
//      	'Error': function(up, err, errTip) {
//      		$("#video_2").val("视频上传失败，请重新上传...")
//      	}
//     	}
//	})
////	3-----------------
//	var Qiniu9 = new QiniuJsSDK();
//	var uploader = Qiniu9.uploader({
//		runtimes: 'html5,flash,html4',
//      browse_button: 'image_btn3',
//      uptoken_url: '/token',  
//      get_new_uptoken: false,
//      container: 'image_all3',
//      max_file_size: '1000mb',
//      flash_swf_url: 'qiniu/Moxie.swf',
//      dragdrop: true,
//      chunk_size: '10mb',
//      uptoken:token,
//      domain: data.data.site,
//      auto_start: true,
//      init: {
//          'UploadProgress': function(up, file) {
//          },
//          'UploadComplete': function() {
//          },
//          'FileUploaded': function(up, file, info) {
//				var domain = up.getOption('domain');
//              var res = JSON.parse(info);
//          	sourceLink = 'http://'+domain + '/'+res.key;
//          	var temp = '<img src="'+sourceLink+'"data-id="'+sourceLink+'"/>';
//          	$("#img_content3").append(temp)
//          },
//      	'Error': function(up, err, errTip) {
//      		alert("上传失败，请重新上传")
//      	}
//     	}
//	})
//	
//	var Qiniu10 = new QiniuJsSDK();
//	var uploader = Qiniu10.uploader({
//		runtimes: 'html5,flash,html4',
//      browse_button: 'background_btn3',
//      uptoken_url: '/token',  
//      get_new_uptoken: false,
//      container: 'bg_image_3',
//      max_file_size: '1000mb',
//      flash_swf_url: 'qiniu/Moxie.swf',
//      dragdrop: true,
//      chunk_size: '10mb',
//      uptoken:token,
//      domain: data.data.site,
//      auto_start: true,
//      init: {
//          'UploadProgress': function(up, file) {
//          },
//          'UploadComplete': function() {
//          },
//          'FileUploaded': function(up, file, info) {
//				var domain = up.getOption('domain');
//              var res = JSON.parse(info);
//          	sourceLink = 'http://'+domain + '/'+res.key;
//          	$("#background_img3").attr("src",sourceLink)
//          	$("#background_img3").attr("data-id",sourceLink)
//          },
//      	'Error': function(up, err, errTip) {
//      		alert("上传失败，请重新上传")
//      	}
//     	}
//	})
//	
//	var Qiniu11 = new QiniuJsSDK();
//	var uploader = Qiniu11.uploader({
//		runtimes: 'html5,flash,html4',
//      browse_button: 'video_btn3',
//      uptoken_url: '/token',  
//      get_new_uptoken: false,
//      container: 'video_content_3',
//      max_file_size: '1000mb',
//      flash_swf_url: 'qiniu/Moxie.swf',
//      dragdrop: true,
//      chunk_size: '10mb',
//      uptoken:token,
//      domain: data.data.site,
//      auto_start: true,
//      init: {
//          'UploadProgress': function(up, file) {
//          	$("#video_3").val("视频上传中，请耐心等待...")
//          },
//          'UploadComplete': function() {
//          },
//          'FileUploaded': function(up, file, info) {
//				var domain = up.getOption('domain');
//              var res = JSON.parse(info);
//          	sourceLink = 'http://'+domain + '/'+res.key;
//          	$("#video_3").val(sourceLink)
//          },
//      	'Error': function(up, err, errTip) {
//      		$("#video_3").val("视频上传失败，请重新上传...")
//      	}
//     	}
//	})
//			
}
