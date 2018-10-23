var page1Params = {
	dataApi:null,
	currentpage:1,
	num:10,
	totalpage:null,
	addAdm:1,
	dataType: 0,
	txtpage:$("#txtPage1"),
	pageNum:$("#pagenum1"),
	setPageNum:$("#setPagenum1"),
	callback:null,
	next:$("#next1"),
	prev:$("#prev1"),
	last:$("#last1"),
	first:$("#first1"),
	toPage:$("#toPage1"),
	tbody:$("#tbody1"),
	btnSearch:$("#btnSearch1"),
	searchParams:"",
	countryId:"",
	provinceIds:"",
	defaultImg:"http://7xsewn.com1.z0.glb.clouddn.com/default.jpg"
};


//4.20修改，对应pageIndex1调用函数（meenojs中的函数）
var ModelFun1 = {
	dataModel :  function(){
		baseFun.baseModel(
			page1Params.dataType,
			page1Params.currentpage,
			page1Params.num,
			page1Params.searchParams,
			page1Params.dataApi,
			page1Params.callback
		)
	}
};

//上一页
page1Params.prev.on("click",function(){
	if(page1Params.currentpage > 1)
	{
		page1Params.tbody.empty();
		page1Params.currentpage --;
		page1Params.txtpage.val(page1Params.currentpage);
		ModelFun.dataModel();
	}
    else
    {
        $modal.toast("没有更多了，试试后一页吧");
    }
});

//下一页
page1Params.next.on("click",function(){
	if(page1Params.currentpage != page1Params.totalpage)
	{
		page1Params.tbody.empty();
		page1Params.currentpage ++;
		page1Params.txtpage.val(page1Params.currentpage);
	 	ModelFun.dataModel();
	}
    else
    {
        $modal.toast("没有更多了，试试前一页吧");
    }
});

//首页
page1Params.first.on("click",function(){
	page1Params.tbody.empty();
	page1Params.currentpage = 1;
	page1Params.txtpage.val(page1Params.currentpage);
	ModelFun.dataModel();
});

//尾页
page1Params.last.on("click",function(){
	page1Params.tbody.empty();
	page1Params.currentpage = page1Params.totalpage;
	page1Params.txtpage.val(page1Params.currentpage);
	ModelFun.dataModel();
});

//跳转至第几页
page1Params.toPage.on("click",function(){
	var txtVal = page1Params.txtpage.val();
	var type ="^[0-9]*[1-9][0-9]*$"; 
    var re = new RegExp(type); 
	if(txtVal.match(re) == null) 
	{ 
		page1Params.tbody.empty();
		page1Params.txtpage.val(page1Params.currentpage);
		ModelFun.dataModel();
	}else{
		if(txtVal > page1Params.totalpage){
			page1Params.txtpage.val(page1Params.currentpage);
		}else{
			page1Params.tbody.empty();
			page1Params.currentpage = txtVal;
			page1Params.txtpage.val(page1Params.currentpage);
			ModelFun.dataModel();
		}
	}
})

//设置显示数目
page1Params.setPageNum.change(function(){
	page1Params.tbody.empty();
	page1Params.currentpage = 1;
	page1Params.judge = 1;
	page1Params.num = page1Params.setPageNum.val();
	ModelFun.dataModel();
	page1Params.txtpage.val(page1Params.currentpage);
	page1Params.pageNum.text(page1Params.totalpage);
	page1Params.setPageNum.val(page1Params.num);
})
