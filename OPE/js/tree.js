//加载服务器树形菜单数据
$('#tree').tree({
		animate:true,
		url:'http://localhost:2403/treemenu',
		method:'get',
		async:true
	});
	
//点击树形菜单添加选项卡	
$("#tree").tree({
		onClick:function(node){
			if(node.attributes.flagIndex >= 4){
				$.messager.alert('系统提示','你没有操作权限，请联系管理员获取权限','warning');
				return;
			}else if(node.attributes.flagIndex == 0){
				return;
			}
			addPanel(node.text, node.attributes.flagIndex);
		}
	});






















