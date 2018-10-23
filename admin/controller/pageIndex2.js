var page2Params = {
	dataApi:null,
	currentpage:1,
	num:10,
	totalpage:null,
	addAdm:1,
	dataType: 0,
	txtpage:$("#txtPage2"),
	pageNum:$("#pagenum2"),
	setPageNum:$("#setPagenum2"),
	callback:null,
	next:$("#next2"),
	prev:$("#prev2"),
	last:$("#last2"),
	first:$("#first2"),
	toPage:$("#toPage2"),
	tbody:$("#tbody2"),
	btnSearch:$("#btnSearch2"),
	searchParams:"",
	countryId:"",
	provinceIds:"",
	defaultImg:"http://7xsewn.com1.z0.glb.clouddn.com/default.jpg"
};


//4.20修改，对应pageIndex1调用函数（meenojs中的函数）
var ModelFun2 = {
	dataModel :  function(){
		baseFun.baseModel(
			page2Params.dataType,
			page2Params.currentpage,
			page2Params.num,
			page2Params.searchParams,
			page2Params.dataApi,
			page2Params.callback
		)
	}
};

//上一页
page2Params.prev.on("click",function(){
	if(page2Params.currentpage > 1)
	{
		page2Params.tbody.empty();
		page2Params.currentpage --;
		page2Params.txtpage.val(page2Params.currentpage);
		ModelFun.dataModel();
	}
    else
    {
        $modal.toast("没有更多了，试试后一页吧");
    }
});

//下一页
page2Params.next.on("click",function(){
	if(page2Params.currentpage != page2Params.totalpage)
	{
		page2Params.tbody.empty();
		page2Params.currentpage ++;
		page2Params.txtpage.val(page2Params.currentpage);
	 	ModelFun.dataModel();
	}
    else
    {
        $modal.toast("没有更多了，试试前一页吧");
    }
});

//首页
page2Params.first.on("click",function(){
	page2Params.tbody.empty();
	page2Params.currentpage = 1;
	page2Params.txtpage.val(page2Params.currentpage);
	ModelFun.dataModel();
});

//尾页
page2Params.last.on("click",function(){
	page2Params.tbody.empty();
	page2Params.currentpage = page2Params.totalpage;
	page2Params.txtpage.val(page2Params.currentpage);
	ModelFun.dataModel();
});

//跳转至第几页
page2Params.toPage.on("click",function(){
	var txtVal = page2Params.txtpage.val();
	var type ="^[0-9]*[1-9][0-9]*$"; 
    var re = new RegExp(type); 
	if(txtVal.match(re) == null) 
	{ 
		page2Params.tbody.empty();
		page2Params.txtpage.val(page2Params.currentpage);
		ModelFun.dataModel();
	}else{
		if(txtVal > page2Params.totalpage){
			page2Params.txtpage.val(page2Params.currentpage);
		}else{
			page2Params.tbody.empty();
			page2Params.currentpage = txtVal;
			page2Params.txtpage.val(page2Params.currentpage);
			ModelFun.dataModel();
		}
	}
})

//设置显示数目
page2Params.setPageNum.change(function(){
	page2Params.tbody.empty();
	page2Params.currentpage = 1;
	page2Params.judge = 1;
	page2Params.num = page2Params.setPageNum.val();
	ModelFun.dataModel();
	page2Params.txtpage.val(page2Params.currentpage);
	page2Params.pageNum.text(page2Params.totalpage);
	page2Params.setPageNum.val(page2Params.num);
})
