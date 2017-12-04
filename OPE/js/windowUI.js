
var currentRow;	// 当前操作行
var currentRowIndex;	// 当前操作行索引

// 针对班级管理以及教师管理的右键菜单操作
function createWindow(msg, content, btn, width, height, opIndex){
	// flag: 0为详情, 1为编辑, 2为删除, 3为添加
	// 查看/编辑/添加Window窗口一致, 删除窗口例外
	$("<div id=\"win\"><div id=\"winlayout\" style=\"margin:10px;\"></div></div>").appendTo(document.body);
	$("#win").window({
		title:tabTitleStr + " - " + msg,
		modal:true,
		width:width,
		height:height,
		cache:false,
		resizable:false,
		minimizable:false,
		maximizable:false,
		closable:false,
		collapsible:false
	});
	$("#winlayout").layout({
		fit:true
	});
	// 指定窗口显示内容  0代表详情  1代表编辑  2代表删除  3代表添加  
	if(opIndex == 1 || opIndex == 3 ||opIndex == 0){
		$("#winlayout").layout("add",{
			region:"center",
			style:{"padding":"0 20px 0 0"},		
			href:content,   //返回远程数据
			onLoad:function(){
				if(opIndex != 3){
					showData(opIndex);
				}				
			}
		});
	}else{	// 删除窗口信息
		$("#winlayout").layout("add",{
			region:"center",
			style:{"padding":"0 20px 0 0"},		
			content:content      //这个content与上面的可是不一样的
		});
	}
	
	// 指定按钮
	$("#winlayout").layout("add",{
		region:"south",
		border:false,
		style:{"text-align":"right","padding":"10px 20px 20px 0"},
		content:btn
	});
}

//控制window窗口中的默认显示表单内容
function showData(opIndex){	
	// 0为查看窗口, 1为编辑窗口  , 3为添加窗口
	if(tabIndex == 1 && (opIndex == 0 || opIndex == 1)){     //tabIndex == 1 是班级管理对应的classEdit.html
		$("#className").textbox({
			value:currentRow.className
		});
		
		$("#classYear").textbox({
			value:currentRow.year
		});	
		
		$("#lingdao").textbox({
			value:currentRow.lingdao
		});	
			
		$("#teachers").textbox({
			value:currentRow.teachers
		});
		
		$("#count").numberbox({
			value:currentRow.count
		});
		
		if(opIndex == 0){
			$("#className").textbox("disable");
			$("#classYear").textbox("disable");
			$("#lingdao").textbox("disable");
			$("#teachers").textbox("disable");
			$("#count").numberbox("disable");	
		}
	}
	
	
	
	else if(tabIndex == 3 && (opIndex == 0 || opIndex == 1)){     //tabIndex == 1 是班级管理对应的classEdit.html
		$("#teachersName").textbox({
			value:currentRow.teachersName
		});
		
		$("#age").numberbox({
			value:currentRow.age
		});
		
		$("#year").numberbox({
			value:currentRow.year
		});
			
		$("#sex").textbox({
			value:currentRow.sex
		});
		
		$("#children").textbox({
			value:currentRow.children
		});
		
		$("#address").textbox({
			value:currentRow.address
		});
		
		if(opIndex == 0){
			$("#teachersName").textbox("disable");
			$("#age").numberbox("disable");	
			$("#year").numberbox("disable");	
			$("#sex").textbox("disable");
			$("#children").textbox("disable");
			$("#address").textbox("disable");
	    }
	}
	
	
			
}

// 点击确定  编辑  删除 添加按钮时，对应执行的操作
function test(opIndex){
	// opIndex: 0为查看, 1为编辑, 2为删除, 3为添加
	if(opIndex == 1){		
	    submitTicketForm();  // 提交表单
	}else if(opIndex == 2){
		delRow();
	}else if(opIndex == 3){
		addRow();
	}
	closeWin();
}

// 提交班级管理以及教师管理表单
function submitTicketForm(){
	var URL,FORM;
	if(tabIndex == 1){
		URL="classEdit.jsp";
		FORM="#classForm";
	}else if(tabIndex == 3){
		URL="teachersEdit.jsp";
		FORM="#teachersForm";
	}
	
	$(FORM).form("submit",{
		url:URL,
		onSubmit:function(){
			return $(FORM).form("validate");
		},
		success:function(data){
			setTicketColVal("#tabGrid", tabIndex, currentRowIndex, data,"修改成功");
		}
	});
}



//提交表单后更新对应的行，并且弹出提示框
function setTicketColVal(dataObj, tabIndex, currentRowIndex, data, title){
	var message = eval("(" + data + ")");
	// 根据当前选项卡中的DataGrid更新对应行数据
	//判断是班级管理还是教师管理，执行对应的操作(更新行数据)
	if(tabIndex == 1){
		$(dataObj + tabIndex).datagrid("updateRow", {
		index: currentRowIndex,
		row: {
			className:message.className,
			year:message.year,
			lingdao:message.lingdao,
			teachers:message.teachers,
			count:message.count
		}
	});
	    $.messager.alert(title, "班级 ：" + message.className + " 信息修改成功!");
	}else if(tabIndex == 3){
		$(dataObj + tabIndex).datagrid("updateRow", {
		index: currentRowIndex,
		row: {
			teachersName:message.teachersName,
			age:message.age,
			year:message.year,
			sex:message.sex,
			children:message.children,
			address:message.address
		}
	});
	    $.messager.alert(title, "教师 ：" + message.teachersName + " 信息修改成功!");
	}
	
}

function closeWin(){
	$('#win').window('close');  
	$("#win").remove();
}

function delRow(){	
	var row = $("#tabGrid" + tabIndex).datagrid('getSelected');
	if (row) {
	         var rowIndex = $("#tabGrid" + tabIndex).datagrid('getRowIndex', row);
	         $("#tabGrid" + tabIndex).datagrid('deleteRow', rowIndex);  
	 }
}
 
function addRow(){
	if(tabIndex == 1){
		$("#tabGrid" + tabIndex).datagrid("insertRow",{
		   index:currentRowIndex,
		   row:{className:$('#className').textbox("getValue"),
		   year:$('#classYear').textbox("getValue"),		   
		   lingdao:$('#lingdao').textbox("getValue"),
		   teachers:$('#teachers').textbox("getValue"),
		   count:$('#count').textbox("getValue")
		  }
	   });
	}else if(tabIndex == 3){
		$("#tabGrid" + tabIndex).datagrid("insertRow",{
		   index:currentRowIndex,
		   row:{teachersName:$('#teachersName').textbox("getValue"),
		   age:$('#age').textbox("getValue"),		   
		   year:$('#year').textbox("getValue"),
		   sex:$('#sex').textbox("getValue"),
		   children:$('#children').textbox("getValue"),
		   address:$('#address').textbox("getValue")
		  }
	   });
	}
	
}









