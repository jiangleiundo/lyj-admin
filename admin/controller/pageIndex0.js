var page0Params = {
	dataApi:null,
	currentpage:1,
	num:10,
	totalpage:null,
	addAdm:1,
	dataType: 0,
	txtpage:$("#txtPage0"),
	pageNum:$("#pagenum0"),
	setPageNum:$("#setPagenum0"),
	callback:null,
	next:$("#next0"),
	prev:$("#prev0"),
	last:$("#last0"),
	first:$("#first0"),
	toPage:$("#toPage0"),
	tbody:$("#tbody0"),
	btnSearch:$("#btnSearch0"),
	searchParams:"",
	countryId:"",
	provinceIds:"",
	defaultImg:"http://7xsewn.com1.z0.glb.clouddn.com/default.jpg"
};


//4.14修改，对应pageIndex0调用函数（meenojs中的函数）
var ModelFun0 = {
	dataModel :  function(){
		baseFun.baseModel(
			page0Params.dataType,
			page0Params.currentpage,
			page0Params.num,
			page0Params.searchParams,
			page0Params.dataApi,
			page0Params.callback
		)
	}
};

//上一页
page0Params.prev.on("click",function(){
	if(page0Params.currentpage > 1)
	{
		page0Params.tbody.empty();
		page0Params.currentpage --;
		page0Params.txtpage.val(page0Params.currentpage);
		ModelFun.dataModel();
	}
    else
    {
        $modal.toast("没有更多了，试试后一页吧");
    }
});

//下一页
page0Params.next.on("click",function(){
	if(page0Params.currentpage != page0Params.totalpage)
	{
		page0Params.tbody.empty();
		page0Params.currentpage ++;
		page0Params.txtpage.val(page0Params.currentpage);
	 	ModelFun.dataModel();
	}
    else
    {
        $modal.toast("没有更多了，试试前一页吧");
    }
});

//首页
page0Params.first.on("click",function(){
	page0Params.tbody.empty();
	page0Params.currentpage = 1;
	page0Params.txtpage.val(page0Params.currentpage);
	ModelFun.dataModel();
});

//尾页
page0Params.last.on("click",function(){
	page0Params.tbody.empty();
	page0Params.currentpage = page0Params.totalpage;
	page0Params.txtpage.val(page0Params.currentpage);
	ModelFun.dataModel();
});

//跳转至第几页
page0Params.toPage.on("click",function(){
	var txtVal = page0Params.txtpage.val();
	var type ="^[0-9]*[1-9][0-9]*$"; 
    var re = new RegExp(type); 
	if(txtVal.match(re) == null) 
	{ 
		page0Params.tbody.empty();
		page0Params.txtpage.val(page0Params.currentpage);
		ModelFun.dataModel();
	}else{
		if(txtVal > page0Params.totalpage){
			page0Params.txtpage.val(page0Params.currentpage);
		}else{
			page0Params.tbody.empty();
			page0Params.currentpage = txtVal;
			page0Params.txtpage.val(page0Params.currentpage);
			ModelFun.dataModel();
		}
	}
});

//设置显示数目
page0Params.setPageNum.change(function(){
	page0Params.tbody.empty();
	page0Params.currentpage = 1;
	page0Params.judge = 1;
	page0Params.num = page0Params.setPageNum.val();
	ModelFun.dataModel();
	page0Params.txtpage.val(page0Params.currentpage);
	page0Params.pageNum.text(page0Params.totalpage);
	page0Params.setPageNum.val(page0Params.num);
});
