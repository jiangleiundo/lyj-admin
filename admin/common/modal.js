/**
 * Created by Administrator on 2016/10/19.
 */

var imgModal = {
    show: function(url) {
        var html = '';

        html += '<div class="img-bg"><div class="img-box">';
        html += '<img src="'+ url +'">';
        html += '</div></div>';

        $('body', window.parent.document).append(html);

        $(".img-bg", window.parent.document).show().on("click", function(){
            $(this).remove();
        })
    }
};