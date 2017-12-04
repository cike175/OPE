var tabIndex=0;
var tabTitleStr;
function addPanel(titleStr, flagIndex){
	tabIndex = flagIndex;
	tabTitleStr = titleStr;
	var tab = $("#tabContent").tabs("getTab", titleStr);
	if(tab){
		$('#tabContent').tabs("select", titleStr);
		if(tabIndex!=2){
			clearAllRowStatus();
		}		
		return;
	}
	
	var url, cols, columns, columns1, columns2, content, url1, url2;
	
	if(flagIndex==1){
		url='http://localhost:2403/students/';		
		cols = ["{field:\"\",checkbox:true},",
		        "{field:\"className\",title:\"名称\",width:200,align:\"center\"},",
		        "{field:\"year\",title:\"年级\",width:200,align:\"center\"},",
		        "{field:\"lingdao\",title:\"班主任\",width:200,align:\"center\"},",
		        "{field:\"teachers\",title:\"任课老师\",width:280,align:\"center\"},",
		        "{field:\"count\",title:\"人数\",width:150,align:\"center\"}"];

		columns = createColumnsHead(cols);
	
	}else if(flagIndex==3){
		url='http://localhost:2403/teachers/';		
		cols = ["{field:\"\",checkbox:true},",
		        "{field:\"teachersName\",title:\"姓名\",width:200,align:\"center\"},",
		        "{field:\"age\",title:\"年龄\",width:140,align:\"center\"},",
		        "{field:\"year\",title:\"入职年份\",width:140,align:\"center\"},",
		        "{field:\"sex\",title:\"性别\",width:140,align:\"center\"},",
		        "{field:\"children\",title:\"婚姻状况\",width:200,align:\"center\"},",
		        "{field:\"address\",title:\"住址\",width:240,align:\"center\"}"];

		columns = createColumnsHead(cols);  
	}
	
	//flagIndex==1||flagIndex==3内容格式相同，所以一并操作
	if(flagIndex==1||flagIndex==3){
		content = "<table style=\"margin:10px\" class=\"easyui-datagrid\" id='tabGrid" + tabIndex + "'" 
				+ "data-options='url:\""+ url +"\",method:\"get\","
				+ "loadMsg:\"数据加载中, 请稍等......\","
				+ "fit:true,singleSelect:false,title:tabTitleStr+\"——通过右键菜单操作\",rownumbers:true,checkOnSelect:true,cache:false,"
				+ "pagination:true,pagePosition:\"bottom\",border:false," 
				+ columns
				+ "onLoadSuccess:setPage,"
				+ "'></table>";
								
		$("#tabContent").tabs("add",{
				title: titleStr,
				border:false, 
				content:content,
				closable: true			
		});
	}
	
	//flagIndex==2内容较多而且与flagIndex==1以及flagIndex==3不同，所以单独操作
	if(flagIndex==2){
		url1='http://localhost:2403/class/';
		url2='http://localhost:2403/studentscomputer4/';
		
		cols1 = ["{field:\"\",checkbox:true},",
		         "{field:\"className\",title:\"名称\",width:130,align:\"center\"},",
		         "{field:\"year\",title:\"年级\",width:170,align:\"center\"}"];
		        
		cols2 = ["{field:\"\",checkbox:true},",
		         "{field:\"number\",title:\"学号\",width:100,align:\"center\"},",
		         "{field:\"name\",title:\"姓名\",width:100,align:\"center\"},",
		         "{field:\"sex\",title:\"性别\",width:60,align:\"center\"},",
		         "{field:\"yuanxi\",title:\"院系\",width:220,align:\"center\"},",
		         "{field:\"zhuanye\",title:\"专业\",width:100,align:\"center\"},",
		         "{field:\"phone\",title:\"联系电话\",width:100,align:\"center\"},",
		         "{field:\"email\",title:\"邮箱\",width:140,align:\"center\"}"];
		        
        columns1 = createColumnsHead(cols1);  
		columns2 = createColumnsHead(cols2); 
		
		content="<div class=\"easyui-layout\" data-options=\"fit:true,border:false\">"
		            +"<div data-options='title:\"班级列表\",region:\"west\",split:true,width:330'>"
		                +"<table style=\"margin:10px\" class=\"easyui-datagrid\" id='tabGrid" + tabIndex + "'" 
						+ "data-options='url:\""+ url1 +"\",method:\"get\","
						+ "loadMsg:\"数据加载中, 请稍等......\","
						+ "fit:true,singleSelect:true,rownumbers:true,checkOnSelect:true,cache:true,"
						+ "pagination:true,pagePosition:\"bottom\",border:false," 
						+ columns1						
						+ "'>"
		                +"</table>"
		            +"</div>"		            
		            +"<div data-options='title:\"学生列表\",region:\"center\",width:820'>"
		                +"<table style=\"margin:10px\" class=\"easyui-datagrid\" id='tabGrid1" + tabIndex + "'" 
						+ "data-options='url:\""+ url2 +"\",method:\"get\","
						+ "loadMsg:\"数据加载中, 请稍等......\","
						+ "fit:true,singleSelect:false,rownumbers:true,checkOnSelect:true,cache:true,toolbar:\"#datagridTool\","
						+ "pagination:true,pagePosition:\"bottom\",border:false," 
						+ columns2
						+ "onLoadSuccess:reSetPage"
						+ "'>"
		                +"</table>"
		            +"</div>"
		         +"</div>";
		         
		         
		$("#tabContent").tabs("add",{
				title: titleStr,
				border:false, 
				content:content,
				closable: true			
		}); 
		
		//班级列表的操作，实现学生列表的切换	
		$("#tabGrid" + tabIndex).datagrid({
			onLoadSuccess: function(data){
            //默认选中第一行,也即计算机四班
            tabIndex=2;
		    $(this).datagrid('selectRow', 0);
		    setPage();
	       },
	       onSelect: function(index){
	       	//前三个班级实现切换
	       	    tabIndex=2;
		        if(index==0){
		        	$("#tabGrid1" + tabIndex).datagrid({
		        		url:'http://localhost:2403/studentscomputer4/'
		        	})		        	
		        }else if(index==1){
		        	$("#tabGrid1" + tabIndex).datagrid({
		        		url:'http://localhost:2403/studentscomputer2/'
		        	})		    
		        }else if(index==2){
		        	$("#tabGrid1" + tabIndex).datagrid({
		        		url:'http://localhost:2403/studentsceshi3/'
		        	});		    
		        }else{
		        	$.messager.alert('系统提示','该班级已毕业或未开班','info');
		        }
	        }
		});
				
	}
	
	// 为班级管理以及教师管理添加右键菜单
		if(flagIndex == 1){	// 解决切换不同tab时显示的右键菜单相同的问题
			$("#tabGrid" + tabIndex).datagrid({
				onRowContextMenu:studentTabContextMenu
			});
		}else if(flagIndex == 3){
			$("#tabGrid" + tabIndex).datagrid({
				onRowContextMenu:teacherTabContextMenu
			});
		}
							
}    //addPanel()函数结束位置;

function createColumnsHead(cols){
	var colsHead = "columns:[["
		for(var index in cols){
			colsHead += cols[index];
		}
		colsHead += "]],";
	return colsHead;
}

//设置分页组件
function setPage(){
	var pager = $("#tabGrid" + tabIndex).datagrid("getPager");
	var options = pager.data("pagination").options;
	var total = options.total;
	var pageCount = Math.ceil(total/options.pageSize);
	pager.pagination({
		pageSize: 20,
		pageList:[20,25,30,35],
		beforePageText: '第',
		afterPageText: '页    共 {pages} 页',  
		displayMsg: '显示 {from} - {to} 条记录   共 {total} 条记录',
		showPageList:true,
		onRefresh:function(){
			$("#tabGrid" + tabIndex).datagrid("reload");
		}
	});
}

//依然是设置分页组件
function reSetPage(){
	var pager = $("#tabGrid1" + tabIndex).datagrid("getPager");
	var options = pager.data("pagination").options;
	var total = options.total;
	var pageCount = Math.ceil(total/options.pageSize);
	pager.pagination({
		pageSize: 20,
		pageList:[20,25,30,35],
		beforePageText: '第',
		afterPageText: '页    共 {pages} 页',  
		displayMsg: '显示 {from} - {to} 条记录   共 {total} 条记录',
		showPageList:true,
		onRefresh:function(){
			$("#tabGrid1" + tabIndex).datagrid("reload");
		}
	});
}

// 班级管理右键菜单
function studentTabContextMenu(e, index, row){
	tabIndex=1;
                tabTitleStr='班级管理';
	clearAllRowStatus();
	$("#tabGrid" + tabIndex).datagrid("selectRow", index);	// 设置当前行为被选中状态
	if(index == null || index < 0){
		return;
	}

	$("#studentMenu").empty(); //每一次都进行初始化
	$("#studentMenu").menu("appendItem", {
		id:"info",
		text: "班级详情",
		iconCls: "icon-search",
		onclick: function(){
			editMessage(index, row, "班级详情", 0); // 当前行索引, 当前行对象, 操作信息，标记
		}
	}); 	 
	$("#studentMenu").menu("appendItem", {
		id:"edit",
		text: "编辑班级",
		iconCls: "icon-edit",
		onclick: function(){			
			editMessage(index, row, "编辑班级", 1);
		}
	}); 
	$("#studentMenu").menu("appendItem", {
		id:"del",
		text: "删除班级",
		iconCls: "icon-remove",
		onclick: function(){
			delMessage(index, row, "删除班级", 2);
		}
	}); 
	$("#studentMenu").menu("appendItem", {
		id:"add",
		text: "添加班级",
		iconCls: "icon-add",
		onclick: function(){
			editMessage(index, row, "添加班级", 3);
		}
	});
	
	$("#studentMenu").menu("show", {    //控制右键菜单的出现
		left:e.pageX,
		top:e.pageY
	});
	
	e.preventDefault();	//阻止系统右键菜单的出现
}

// 教师管理右键菜单
function teacherTabContextMenu(e, index, row){
                tabTitleStr='教师管理';
	tabIndex=3;
	clearAllRowStatus();
	$("#tabGrid" + tabIndex).datagrid("selectRow", index);	// 设置当前行为被选中状态
	if(index == null || index < 0){
		return;
	}

	$("#teacherMenu").empty(); //每一次都进行初始化
	$("#teacherMenu").menu("appendItem", {
		id:"info",
		text: "教师详情",
		iconCls: "icon-search",
		onclick: function(){
			editMessage(index, row, "教师详情", 0); // 当前行索引, 当前行对象, 操作信息，标记
		}
	}); 	 
	$("#teacherMenu").menu("appendItem", {
		id:"edit",
		text: "编辑教师",
		iconCls: "icon-edit",
		onclick: function(){			
			editMessage(index, row, "编辑教师", 1);
		}
	}); 
	$("#teacherMenu").menu("appendItem", {
		id:"del",
		text: "删除教师",
		iconCls: "icon-remove",
		onclick: function(){
			delMessage(index, row, "删除教师", 2);
		}
	}); 
	$("#teacherMenu").menu("appendItem", {
		id:"add",
		text: "添加教师",
		iconCls: "icon-add",
		onclick: function(){
			editMessage(index, row, "添加教师", 3);
		}
	});
	
	$("#teacherMenu").menu("show", {    //控制右键菜单的出现
		left:e.pageX,
		top:e.pageY
	});
	
	e.preventDefault();	//阻止系统右键菜单的出现
}

// 班级管理，教师管理右键时以及再次点击同一个树形菜单选项时清除所有已选行
function clearAllRowStatus(){
	$("#tabGrid" + tabIndex).datagrid("clearSelections");	
}

// 数据交互,显示班级管理以及教师管理编辑窗口
function editMessage(rowIndex, row, msg, opIndex){
	var Url,btn;  //设置要切换的页面地址
	currentRowIndex = rowIndex;	// 设置当前索引(切记：currentRow与currentRowIndex是两个全局变量，后面要用到)
	currentRow = row;// 设置当前行
	
	if(tabIndex==1){
		Url = "./classEdit.html";      //学生管理编辑页面地址
	}else if(tabIndex==3){
		Url = "./teachersEdit.html";   //教师管理编辑页面地址
	}
	
	if(opIndex == 0){            // flag: 0为查看, 1为编辑, 2为删除(删除另写), 3为添加
		btn = createBtn(opIndex, "确定");
	}else if(opIndex == 1){
		btn = createBtn(opIndex, "编辑");
	}else if(opIndex == 3){
		btn = createBtn(opIndex, "添加");
	}
	var width = 360;
	var height = 330;
	showWindow(msg, Url, btn, width, height, opIndex);   //与参数一一对应
}

// 显示操作窗口
function showWindow(msg, content, btn, width, height, opIndex){
	createWindow(msg, content, btn, width, height, opIndex);
}

//创建按钮
function createBtn(opIndex, btnText){
	var btn_ok = "<a class=\"easyui-linkbutton\" data-options=\"iconCls:'icon-ok'\""		
			+ "href=\"javascript:void(0)\" onclick=\"javascript:test("+opIndex+")\""
			+ "style=\"width:80px\">" + btnText + "</a>&nbsp;";	
	var btn_cancel = "<a class=\"easyui-linkbutton\" data-options=\"iconCls:'icon-cancel'\""
			+ "href=\"javascript:void(0)\" onclick=\"javascript:closeWin()\""
			+ "style=\"width:80px\">取消</a>";
	return btn_ok + btn_cancel;
}

// 删除班级信息以及删除教师信息(因为弹框不同，所以单独操作);
function delMessage(rowIndex, row, msg, opIndex){
	var content = createWindowDiv(row, opIndex);
	var btn = createBtn(opIndex,"删除");
	var width = 500;
	var height = 300;
	showWindow(msg, content, btn, width, height, opIndex);
}

function createWindowDiv(row, opIndex){
	var insertMsg,pcon;
	if(tabIndex==1){
		insertMsg="班级";
		pcon = "<p>名称 : " + row.className + "</p><p>年级: " + row.year +  "</p><p>班主任: " + row.lingdao + "</p><p>任课老师: " + row.teachers +  "</p><p>人数: " + row.count + "</p>";
	}else if(tabIndex==3){
		insertMsg="教师";
		pcon = "<p>姓名: " + row.teachersName + "</p><p>年龄: " + row.age +  "</p><p>入职年份: " + row.year + "</p><p>性别: " + row.sex +  "</p><p>婚姻状况: " + row.children + "</p><p>住址: " + row.address + "</p>";
	};
	var delMsg = "确定要删除"+insertMsg+"信息吗?";	
	pcon = delMsg + pcon;
	var content = "<div id=\"layoutpadding\">" + pcon + "</div>";
	return content;
}

//搜索框
function doSearch(value,name){				
		$.messager.alert('系统提示' , "你输入了: " + value + ", 被选中的选项为: " + name , 'info');			
		$('#search').searchbox('reset');	// 重置搜索框
	}

//模板下载  、导入、导出、弹出菜单
function warnMsg(){
	$.messager.alert('系统提示','你没有操作权限，请联系管理员获取权限','warning');
}

//学生列表实现刷新
function refreshDatagrid(){
	tabIndex=2;
	$("#tabGrid1" + tabIndex).datagrid('reload');
}








