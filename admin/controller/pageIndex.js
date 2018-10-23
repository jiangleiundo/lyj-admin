//上一页
pageParams.prev.on("click",function(){
	if(pageParams.currentpage > 1)
	{
		pageParams.tbody.empty();
		pageParams.currentpage --;
		pageParams.txtpage.val(pageParams.currentpage);
		ModelFun.dataModel();
	}
    else
    {
        $modal.toast("没有更多了，试试后一页吧");
    }
});

//下一页
pageParams.next.on("click",function(){
	if(pageParams.currentpage != pageParams.totalpage)
	{
		pageParams.tbody.empty();
		pageParams.currentpage ++;
		pageParams.txtpage.val(pageParams.currentpage);
	 	ModelFun.dataModel();
	}
    else
    {
        $modal.toast("没有更多了，试试前一页吧");
    }
});

//首页
pageParams.first.on("click",function(){
	pageParams.tbody.empty();
	pageParams.currentpage = 1;
	pageParams.txtpage.val(pageParams.currentpage);
	ModelFun.dataModel();
});

//尾页
pageParams.last.on("click",function(){
	pageParams.tbody.empty();
	pageParams.currentpage = pageParams.totalpage;
	pageParams.txtpage.val(pageParams.currentpage);
	ModelFun.dataModel();
});

//跳转至第几页
pageParams.toPage.on("click",function(){
	var txtVal = pageParams.txtpage.val();
	var type ="^[0-9]*[1-9][0-9]*$"; 
    var re = new RegExp(type); 
	if(txtVal.match(re) == null) 
	{ 
		pageParams.tbody.empty();
		pageParams.txtpage.val(pageParams.currentpage);
		ModelFun.dataModel();
	}else{
		if(txtVal > pageParams.totalpage){
			pageParams.txtpage.val(pageParams.currentpage);
		}else{
			pageParams.tbody.empty();
			pageParams.currentpage = txtVal;
			pageParams.txtpage.val(pageParams.currentpage);
			ModelFun.dataModel();
		}
	}
});

//设置显示数目
pageParams.setPageNum.change(function(){
	pageParams.tbody.empty();
	pageParams.currentpage = 1;
	pageParams.judge = 1;
	pageParams.num = pageParams.setPageNum.val();
	ModelFun.dataModel();
	pageParams.txtpage.val(pageParams.currentpage);
	pageParams.pageNum.text(pageParams.totalpage);
	pageParams.setPageNum.val(pageParams.num);
});