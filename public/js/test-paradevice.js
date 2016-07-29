var signalchannel ;//信号类型选中
var signalchannelnum;//信号通道号；
var signal_type ;//信号类型
var signal_value ;//信号值
var signal_name;//信号名称
var write_type;
var write_value;
var write_name;
var signal_NO;
var num_signal;//信号个数。

$(document).ready(function(){
	var obj = document.getElementById("signal_type");
	signalchannelnum =obj.selectedIndex; //序号，取当前选中选项的序号
	signalchannel = obj.options[signalchannelnum].value;
	signal_type = signalchannel;
	num_signal = 0;
	// connectdatabase()
	//将数据写入数据库
	$("#write_signal").click(function(){
		var obj1 = document.getElementById("signal_type");
		var obj2 = document.getElementById("signal_value0");
		var obj3 = document.getElementById("signal_name");
		write_type = obj1.value;
		write_name = obj3.value;
		write_value =$.trim(obj2.value);
		// alert(write_va$.trim(lue);
		if(!isNaN(write_value) && write_value)//判断是否为数字
		{
			writedata();
		}
		else
		{
			alert("警告：信号值请输入数字！");
		}
	});
	//增加信号数据
	$("#add_signal").click(function(){

		var newElem = "<p><label style=margin:10px;>信号类型：</label>\
 					<select id=signal_type" + num_signal + " name=sigal_type" + num_signal + " style=margin:10px;>\
 					<option value=R01>R01</option>\
 					<option value=R02>R02</option>\
 					<option value=V01>V01</option>\
 					<option value=V02>V02</option>\
 					<option value=F01>F01</option>\
 					<option value=F02>F02</option>\
 					<option value=F03>F03</option>\
 					<option value=F04>F04</option>\
 					<option value=F05>F05</option>\
 					<option value=CAN>CAN</option>\
 					</select>\
 					<label style=margin:10px;>信号值：</label>\
 					<input class=signal  id=signal_value" + num_signal + " type=text name=signal_value" + num_signal + ">\
 					<label style=margin:10px;>信号名称：</label>\
 					<input class=signal  id=signal_name" + num_signal + " type=text name=signal_name" + num_signal + ">\
 					<button type=button class=signal id=del_signal" + num_signal + ">删除</button><p>";
 				$(this).after(newElem);
 				num_signal++;
 	});
 	$("#para_data_bar").on('click',"button",function(){
 		for (var i = 0; i < num_signal; i++) {
 			$("#para_data_bar").on('click',"#del_signal"+i,function(){
				$(this).parent().remove();
			});
 		}
 		
 	});
	// $("#para_data_bar").on('change',"select",function(){
 // 		for (var i = 0; i < num_signal; i++) {
 // 			$("#para_data_bar").on('change',"#signal_type"+i,function(){
	// 			$(this).parent().remove();
	// 		});
 // 		}
 		
 // 	});	
 	
 });
//将数据写入数据库
function writedata()
{
	alert("数据已写入。")
}
//从数据库中读取数据
function readdata()
{
	alert("读取数据完成。")
}
//连接数据库
function connectdatabase()
{
	var mongo=require("mongodb");
	var host="localhost";
	var port=mongo.Connection.DEFAULT_PORT;
	var server=new mongo.Server(host,port,{auto_reconnect:true});//创建数据库所在的服务器服务器
	var db=new mongo.Db("node-mongo-examples",server,{safe:true});//创建数据库对象
	db.open(function (err,db) {//连接数据库
	    if(err)
	        throw err;
	    else{
	        console.log("成功建立数据库连接");
	        db.close();
	    }
	});
	db.on("close", function (err,db) {//关闭数据库
	    if(err) throw err;
	    else console.log("成功关闭数据库.");
	});
}


