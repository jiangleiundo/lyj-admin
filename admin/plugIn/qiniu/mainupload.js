var sourceLink = null;
$(function() {
// meeno.JQueryAjax(Api.API_GET_TOKEN,{},getToken);
});

function getToken(data){
	var token = data.data.token;
	var uploader = Qiniu.uploader({
		runtimes: 'html5,flash,html4',
        browse_button: 'pickfiles',
        uptoken_url: '/token',  
        get_new_uptoken: false,
        container: 'container',
        drop_element: 'container',
        max_file_size: '1000mb',
        flash_swf_url: 'js/plupload/Moxie.swf',
        dragdrop: true,
        chunk_size: '10mb',
        uptoken:token,
        domain: data.data.site,//从七牛官网获取base_url填写到此处
        auto_start: true,
        init: {
            'FilesAdded': function(up, files) {
                $(".table").show();
                $('#success').hide();
                plupload.each(files, function(file) {
                    var progress = new FileProgress(file, 'fsUploadProgress');
                    progress.setStatus("等待...");
                    progress.bindUploadCancel(up);
                });
            },
            'BeforeUpload': function(up, file) {
            	$("#fsUploadProgress").empty();
                var progress = new FileProgress(file, 'fsUploadProgress');
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                if (up.runtime === 'html5' && chunk_size) {
                    progress.setChunkProgess(chunk_size);
                }
            },
            'UploadProgress': function(up, file) {
                var progress = new FileProgress(file, 'fsUploadProgress');
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                progress.setProgress(file.percent + "%", file.speed, chunk_size);
                 $("#video_url").show();
                 $("#video_url").val("视频上传中，请耐心等待...")
            },
            'UploadComplete': function() {
                $('#success').show();
            },
            'FileUploaded': function(up, file, info) {
				var domain = up.getOption('domain');
                var res = JSON.parse(info);
                sourceLink = 'http://'+domain + '/'+res.key;
                $("#video_url").val(sourceLink)
                var progress = new FileProgress(file, 'fsUploadProgress');
                progress.setComplete(up, sourceLink);

            },
            'Error': function(up, err, errTip) {
                $(".table").show();
                var progress = new FileProgress(err.file, 'fsUploadProgress');
                progress.setError();
                progress.setStatus(errTip);
            }
        }
	})
	
	
	var Qiniu2 = new QiniuJsSDK();
	var uploader = Qiniu2.uploader({
		runtimes: 'html5,flash,html4',
        browse_button: 'pickfiles2',
        uptoken_url: '/token',  
        get_new_uptoken: false,
        container: 'container',
        drop_element: 'container',
        max_file_size: '1000mb',
        flash_swf_url: 'js/plupload/Moxie.swf',
        dragdrop: true,
        chunk_size: '10mb',
        uptoken:token,
        domain: data.data.site,//从七牛官网获取base_url填写到此处
        auto_start: true,
        init: {
            'FilesAdded': function(up, files) {
                $(".table2").show();
                $('#success2').hide();
                plupload.each(files, function(file) {
                    var progress = new FileProgress(file, 'fsUploadProgress2');
                    progress.setStatus("等待...");
                    progress.bindUploadCancel(up);
                });
            },
            'BeforeUpload': function(up, file) {
            	$("#fsUploadProgress2").empty();
                var progress = new FileProgress(file, 'fsUploadProgress2');
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                if (up.runtime === 'html5' && chunk_size) {
                    progress.setChunkProgess(chunk_size);
                }
            },
            'UploadProgress': function(up, file) {
                var progress = new FileProgress(file, 'fsUploadProgress2');
                var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                progress.setProgress(file.percent + "%", file.speed, chunk_size);
                 $("#video_url2").show();
                 $("#video_url2").val("视频上传中，请耐心等待...")
            },
            'UploadComplete': function() {
                $('#success2').show();
            },
            'FileUploaded': function(up, file, info) {
				var domain = up.getOption('domain');
                var res = JSON.parse(info);
                sourceLink = 'http://'+domain + '/'+res.key;
                $("#video_url2").val(sourceLink)
                var progress = new FileProgress(file, 'fsUploadProgress2');
                progress.setComplete(up, sourceLink);

            },
            'Error': function(up, err, errTip) {
                $(".table2").show();
                var progress = new FileProgress(err.file, 'fsUploadProgress2');
                progress.setError();
                progress.setStatus(errTip);
            }
        }
	})
}
