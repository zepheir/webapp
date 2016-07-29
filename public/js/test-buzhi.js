// new_element=document.createElement("script");
// new_element.setAttribute("type","text/javascript");
// new_element.setAttribute("src","Dialog.js");// 在这里引入了a.js
// document.body.appendChild(new_element);
//
var pub_number = 0;//表格当前行号
var pub_isrun = true;//是否允许测试
var pub_isauto =false;//自动、手动，自动测试时手动按钮无效
var pub_iskeydown = false;//是否键盘有按键按下。
var pub_ispasue = false;//是否暂停
var gRO= new Array(16); //'电阻信号值,在串口通信中使用String类型,0~14=>0.1~1024,15备用
var pub_devName_channel ;//仪表型号选中通道
var pub_devName_channelnum;//仪表型号选中的通道号；
var pub_baud_channel;//波特率选中通道
var pub_baud_channelnum;//波特率选中通道号
var pub_fraType_channel;//帧格式选中通道
var pub_fraType_channelnum;//帧格式选中通道号
var pub_fraFor_channel;//帧类型选中通道
var pub_fraFor_channelnum;//帧类型选中通道号
//CAN数据
var pub_canForm;//CAN帧格式：０－数据帧，１－远程帧
var pub_canType;//CAN帧类型：０－标准帧，１－扩展帧
var pub_canID;//CAN ID
var pub_canbaud;//CAN波特率
var pub_canTiming0;//CAN波特率定时器０
var pub_canTiming1;//CAN波特率定时器1
var pub_cantime;//CAN  发送间隔(ms)
var pub_canData;//CAN　数据

//电阻信号的矫正值，即为每个标准电阻的实际电阻值,0-5代表6路电阻的某路0~2为实际电阻值,15为线电阻值
var rcg  =  new Array(2);
rcg[0] = new Array(16);
rcg[1] = new Array(16);

var pub_num_tab =[1,2,3,4,5];//增加表格的序号数组。
var pub_data_tab =[11,21,31,41,51,61];//增加表格的操作数据值数组。
var pub_data_type =['R01','R02','R05','F01','CAN'];//增加表格的操作数据类型数组。
var pub_data_explan = ['电阻1','电阻2','电阻5','频率1','CAN信号'];//增加表格的操作数据说明数组。
var pub_power = [1,2,3,4,5];//执行指令的权重。权重越高越先运行。
//
$(document).ready(function(){
	// alert("欢迎！");
	var id_status = document.getElementById('device_info');
	pub_ispasue = false;
	pub_iskeydown =false;
	add_talbe(pub_data_type,pub_data_tab,pub_data_explan);
	id_status.innerHTML ="系统初始化完成！"
	//调用ＣＳＳ
	fuc_css()
	get_canPara()
	


});
document.onkeydown = hotkey_down; //当按下键盘onkeydown 事件发生时调用hotkey_down函数  
document.onkeyup = hotkey_up; //当释放键盘onkeyup 事件发生时调用hotkey_up函数  

// //时钟
 
//  	// document.getElementByCLASS('time').innerHTML=new Date().toLocaleString();    
//  	document.getElementsByClassName('time').innerHTML=new Date().toLocaleString();
// 	setInterval("document.getElementsByClassName('time').innerHTML = new Date().toLocaleString();",1000);  
//复位运行表格
function reset_table()
{
	var dd = document.getElementById('run_bar').getElementsByTagName("tr");
	pub_isrun =true;

	for (var i = 0.; i <dd.length ; i++) 
	{
		dd[i].style.background = "white";
	}
	// document.getElementById('run_bar').getElementsByTagName("tr").background = "#fff";
}
//启动自动测试
function start_run()
{	
		setTimeout('change_background()',600);
}
//自动测试 ，变化表格背景色，指示测试状态
function change_background(get_value)
{
	var id_tab = document.getElementById('run_tab')
	var dd = document.getElementById('run_bar').getElementsByTagName("tr");
	var id_status = document.getElementById('device_info');
	val_length = dd.length;
	var val_type ;//数据类型
	var val_data;//数据值
	var val_start = document.getElementById('btn_start');
	if(val_start.innerHTML == "暂停（/）"&& pub_isrun == true)
	{
		pub_number++;
		if(pub_number < dd.length )
		{
			// var id_tab = document.getElementById('run_tab')
			// var dd = document.getElementById('run_bar').getElementsByTagName("tr");
			// var id_status = document.getElementById('device_info');
			// val_length = dd.length;
			// var val_type ;//数据类型
			// var val_data;//数据值
			// document.getElementById('device_v').innerHTML = dd[pub_number].innerHTML + pub_number;
			// document.getElementById('device_type').innerHTML = val_length;
			// dd[pub_number].style.background = "green";
			getdata_changebtntext(pub_number);
			start_run();
			// // id_status.innerHTML = dd[pub_number].innerHTML + pub_number;
			// // id_status.innerHTML = id_tab.rows[pub_number].cells[1].innerHTML;
			// val_string = id_tab.rows[pub_number].cells[1].innerHTML;
			// val_type = val_string.substr(0,4);
			// val_data = val_string.substr(4).replace(/[^0-9]/ig,"");
			// id_status.innerHTML =val_type +val_data;

		}
		else
		{
			// alert(pub_number);
			pub_number = 0;
			pub_isrun =true;
			val_start.innerHTML = "启动（/）";
 			pub_ispasue = false;
			val_start.style.backgroundColor="#A5DE37";
			pub_isauto = false;
			id_status.innerHTML = "测试完成！";

		}
	}
    else
    {
    	// alert(pub_number);
    	pub_isrun =true;
		val_start.innerHTML = "启动（/）";
		pub_isauto = false;
		id_status.innerHTML = "测试暂停！";
    }
}
//启动 
function autorun(id)
{
	var id_status = document.getElementById('device_info');
	if(id.innerHTML == "启动（/）")
	{
		id.innerHTML = "暂停（/）";
		id.style.backgroundColor="#FF3333";
		id_status.innerHTML = "测试继续！";
		if (pub_ispasue == false) 
		{
			reset_table();
			id_status.innerHTML = "测试启动！";
		}
		
		start_run();
		pub_isauto = true;
		// pub_number = 0;
		// id_status.innerHTML = "测试启动！";
	}
	else
	{
 		pub_ispasue = true ;
		id.innerHTML = "启动（/）";
		id.style.backgroundColor="#A5DE37";
		id_status.innerHTML = "测试暂停！";
	}
}
//停止测试
function stoprun()
{
	var id_status = document.getElementById('device_info');
	reset_table();
	pub_isrun =false;
	pub_number=0;
	document.getElementById('btn_start').innerHTML = "启动（/）";
	document.getElementById('btn_start').style.backgroundColor="#A5DE37";
	// setTimeout('reset_table()',1000);
	id_status.innerHTML = "测试停止！";
}
//当前步
function operating_step()
{
	var val_start = document.getElementById('btn_start');
	var id_status = document.getElementById('device_info');
	if(val_start.innerHTML == "启动（/）" )
	{
		reset_table();
		val_index = pub_number;
		// alert(pub_number);
		var dd = document.getElementById('run_bar').getElementsByTagName("tr");
		val_length = dd.length;
		// pub_number++;
		if(val_index < 1)
		{
			val_index = 1;
		}

		if(val_index >= dd.length-1)
		{
			val_index = dd.length-1;
		}
		// document.getElementById('device_v').innerHTML = dd[val_index].innerHTML + val_index;
		// document.getElementById('device_type').innerHTML = val_length;
		// dd[val_index].style.background = "green";
		// id_status.innerHTML = dd[val_index].innerHTML + val_index;
		getdata_changebtntext(val_index);//注意此处的val_index不要写成pub_number!!!!
	}
}
//下一步
function next_step()
{
	var val_start = document.getElementById('btn_start');
	var id_status = document.getElementById('device_info');
		if(val_start.innerHTML == "启动（/）" )
		{
			reset_table();
			var dd = document.getElementById('run_bar').getElementsByTagName("tr");
			val_length = dd.length;
			if(pub_number <dd.length-1)
			{
				pub_number++;
			}
			else
			{
				pub_number = 1;
			}
			// document.getElementById('device_v').innerHTML = dd[pub_number].innerHTML + pub_number;
			// document.getElementById('device_type').innerHTML = val_length;
			// dd[pub_number].style.background = "green";
			// id_status.innerHTML = dd[pub_number].innerHTML + pub_number;
			getdata_changebtntext(pub_number);
		}
}
//上一步
function previous_step()
{
	var val_start = document.getElementById('btn_start');
	var id_status = document.getElementById('device_info');
		if(val_start.innerHTML == "启动（/）" )
		{
			reset_table();
			var dd = document.getElementById('run_bar').getElementsByTagName("tr");
			val_length = dd.length;
			if(pub_number >1)
			{
				pub_number--;
			}
			else
			{
				pub_number = dd.length-1;
			}
			// document.getElementById('device_v').innerHTML = dd[pub_number].innerHTML + pub_number;
			// document.getElementById('device_type').innerHTML = val_length;
			// dd[pub_number].style.background = "green";
			// id_status.innerHTML = dd[pub_number].innerHTML + pub_number;
			getdata_changebtntext(pub_number);
		}
}
//获取当前表格行的数据类型、数据值和改变背景色
function getdata_changebtntext(obj)
{
	var id_tab = document.getElementById('run_tab')
	var dd = document.getElementById('run_bar').getElementsByTagName("tr");
	// var id_status = document.getElementById('device_info');
	val_length = dd.length;
	var val_type ;//数据类型
	var val_data;//数据值
	// document.getElementById('device_v').innerHTML = dd[obj].innerHTML + obj;
	// document.getElementById('device_type').innerHTML = val_length;
	//改变背景色
	dd[obj].style.background = "#00CC66";
	// id_status.innerHTML = dd[obj].innerHTML + obj;
	// id_status.innerHTML = id_tab.rows[obj].cells[1].innerHTML;
	//获取当前表格行的数据类型
	val_string = id_tab.rows[obj].cells[1].innerHTML;
	val_type = pub_data_type[obj-1];
	val_data = pub_data_tab[obj-1];
	// val_type = val_string.substr(0,4);
	// val_data = val_string.substr(4).replace(/[^0-9]/ig,"");
	// id_status.innerHTML =val_type + ":" + val_data;
	Send_data(val_type,val_data);
}
//测试
function test()
{
	// alert(pub_number);
	// duihua()
	del_talbe();
	pub_num_tab =[1,2,3,4,5,6];//增加表格的序号数组。
	pub_data_tab =[11,21,31,41,51,61];//增加表格的操作数据值数组。
	pub_data_type =['R01','F02','R03','F01','CAN','R04'];//增加表格的操作数据类型数组。
	pub_data_explan = ['电阻1','频率2','电阻3','频率1','CAN信号','电阻4'];//增加表格的操作数据说明数组。
	pub_power = [1,1,2,3,3,4];//执行指令的权重。权重越高越先运行。
	setTimeout('add_talbe(pub_data_type,pub_data_tab,pub_data_explan)',1000);//测试用
}
//测试2	 
function tishi()
	{
	// var t=prompt("请输入您的名字","KING视界")
	// if (t!=null && t!="")
	// {
	// 	document.write("精彩MV就在，" + t + "！属于你的世界")
 //    }
 //   var diag = new Dialog();
 //   diag.title ="帮助";
}
//关于/帮助
function about()
{
	alert("简介：汽车仪表测试台是专用于..........");
}
//测试3
function duihua()
{
	alert("简介：汽车仪表测试台是专用于..........");
}
//发送数据,将表格当前行的数据发送给下位机
function Send_data(send_type,send_data)
{	
	var id_status = document.getElementById('device_info');
	id_status.innerHTML ="发送的数据为：" + send_type + ":" + send_data;
	if(send_type=="R01" || send_type =="R02")
	{
		outputR(send_type,send_data);//输出电阻
	}
	// if(send_type=="V01" || send_type =="V02")
	// {
	// 	outputV(send_type,send_data);//输出电压
	// }
	// if(send_type=="F01" || send_type =="F02"|| send_type =="F02"|| send_type =="F02"|| send_type =="F02")
	// {
	// 	outputF(send_type,send_data);//输出频率
	// }
	// if(send_type=="CAN")
	// {
	// 	outputCAN(send_type,send_data);//CAN信号输出
	// }

}
//接收数据:报警状态值
function Receive_data(receive_data)
{
	var get_data = receive_data;
	if (get_data) {}
}
//删除原表格数据
function del_talbe()
{
	var id_tab = document.getElementById('run_tab')
		val_length = id_tab.rows.length;
		// alert(val_length);
		for (var i = val_length - 1; i >0; i--) 
		{
			// alert(id_tab.rows.length);
			id_tab.deleteRow(id_tab.rows.length-1);
		}
}
//添加表格新数据(类型，数据，说明)
function add_talbe(val_type,val_data,val_explan)
{
	// pub_num_tab =[1,2,3,4,5,6];//增加表格的序号数组。
	// pub_data_tab =[11,21,31,41,51,61];//增加表格的操作数据值数组。
	// pub_data_type =['R01','F02','R03','F01','CAN','R04'];//增加表格的操作数据类型数组。
	// pub_data_explan = ['电阻1','频率2','电阻3','频率1','CAN信号','电阻4'];//增加表格的操作数据说明数组。

	var id_tab = document.getElementById('run_tab')
	var id_status = document.getElementById('device_info');
	// var dd = document.getElementById('run_bar').getElementsByTagName("tr");
	// var val_length = id_tab.rows.length;
	// alert(val_length);
	for (var i = 0 ; i < val_type.length ; i++)
	{
		// 插入行
		var tr = id_tab.insertRow(i+1);
		// 为每行循环插入4列
		for (var j = 0 ; j < 4 ; j++)//序号、类型、数值、说明
		{
			switch (j)
			{
				case 0:var td = tr.insertCell(0);td.innerHTML = i+1 ;break;
				case 1:var td = tr.insertCell(1);td.innerHTML =  val_type[i] ; break;
				case 2:var td = tr.insertCell(2);td.innerHTML =  val_data[i] ; break;
				case 3:var td = tr.insertCell(3);td.innerHTML = val_explan[i] + "。" ; break;

			}
		}
	}
	// alert("表格数据更新完成！");
	id_status.innerHTML = "仪表数据更新完成！";
}
//获得仪表所有参数数据
function getallinfo_device(device_data)
{

}
//鼠标放在上面
function mOver(obj)
{
	obj.innerHTML="谢谢"
	obj.style="background-color:green;color:#ffffff;"
}
//鼠标移走
function mOut(obj)
{
	obj.innerHTML="谢谢"
	obj.style="background-color:green;color:#ffffff;"
}
//按下鼠标
function mDown(obj)
{
	// obj.style.backgroundColor="#1ec5e5";
	// obj.innerHTML="请释放鼠标按钮"
	// alert("你按了键吧"); 
}
//释放鼠标
function mUp(obj)
{
	// obj.style.backgroundColor="#D1D1D1";
	// obj.innerHTML="请按下鼠标按钮"
	// alert("你释放了键吧"); 
}
//当按下按钮快捷键:小键盘"/":111,小键盘"*":106,小键盘"5":101,小键盘"8":104,小键盘"2":98,小键盘".":110,小键盘"0":96,
function hotkey_down()  
{  
	var val_key=window.event.keyCode;  
	var id_btn_start = document.getElementById('btn_start')
	var id_btn_stop = document.getElementById('btn_stop')
	var id_btn_operating = document.getElementById('btn_operating')
	var id_btn_prvious = document.getElementById('btn_previous')
	var id_btn_next = document.getElementById('btn_next')
	var id_btn_test = document.getElementById('btn_test')	
	if (pub_iskeydown == false) 
	{
		pub_iskeydown = true ;
		if(val_key==96)  //小键盘"0":96 备用
		{  
			// alert("你按了0键吧"); 
			// mDown(obj)
			// test(); 
		}  
		if(val_key==98)  //小键盘"2":98 下一步
		{  
			// alert("你按了2键吧"); 
			// test(); 
			next_step();
			mDown(id_btn_next);
		} 
		if(val_key==101)  //小键盘"5":101 当前步
		{  
			// alert("你按了5键吧"); 
			// test(); 
			operating_step();
			mDown(id_btn_operating);
		} 
		if(val_key==104)  //小键盘"8":104 上一步
		{  
			// alert("你按了8键吧"); 
			// test(); 
			previous_step();
			mDown(id_btn_prvious);
		}  
		if(val_key==106)  //小键盘"*":106 停止
		{  
			// alert("你按了*键吧"); 
			// test();
			stoprun(); 
			mDown(id_btn_stop);
		} 
		if(val_key==110)  //小键盘".":110 测试
		{  
			// alert("你按了.键吧"); 
			test(); 
			mDown(id_btn_test);
		} 
		if(val_key==111)  //小键盘"/":111 启动
		{  
			// alert("你按了/键吧"); 
			// test(); 
			autorun(id_btn_start);
			mDown(id_btn_start);
		} 
	}
}
//当释放按钮快捷键:小键盘"/":111,小键盘"*":106,小键盘"5":101,小键盘"8":104,小键盘"2":98,小键盘".":110,小键盘"0":96,
function hotkey_up()  
{  
	var val_key=window.event.keyCode;  
	var id_btn_start = document.getElementById('btn_start')
	var id_btn_stop = document.getElementById('btn_stop')
	var id_btn_operating = document.getElementById('btn_operating')
	var id_btn_prvious = document.getElementById('btn_previous')
	var id_btn_next = document.getElementById('btn_next')
	var id_btn_test = document.getElementById('btn_test')	
	// alert("释放按钮" +val_key);
	pub_iskeydown = false;
	if(val_key==96)  //小键盘"0":96 备用
	{  
		// alert("你释放了0键吧"); 
		// mUp(obj)
		// test(); 
	}  
	if(val_key==98)  //小键盘"2":98 下一步
	{  
		// alert("你释放了2键吧"); 
		mUp(id_btn_next);
	} 
	if(val_key==101)  //小键盘"5":101 当前步
	{  
		// alert("你释放了5键吧"); 
		// test(); 
		mUp(id_btn_operating);
	} 
	if(val_key==104)  //小键盘"8":104 上一步
	{  
		// alert("你释放了8键吧"); 
		// test(); 
		mUp(id_btn_prvious);
	}  
	if(val_key==106)  //小键盘"*":106 停止
	{  
		// alert("你释放了*键吧"); 
		// test();
		mUp(id_btn_stop);
	} 
	if(val_key==110)  //小键盘".":110 测试
	{  
		// alert("你释放了.键吧"); 
		mUp(id_btn_test);
	} 
	if(val_key==111)  //小键盘"/":111 启动,启动键不用释放处理在autorun（）函数中
	{  
		// alert("你释放了/键吧"); 
		// test(); 
		// mUp(id_btn_start);
	} 
}
//关闭当前页面
function closeCurrentWindow()
{
  window.close();
}
//电阻值转换成二进制开关量值，val_data为电阻值，val_num标记哪路电阻
function rch(val_num,val_data)
{
	var val_R = 0;//电阻值

	if (val_num == 0) 
	{
		for (var i = 0; i <= 14; i++)
		 {
			gRO[i] =0;
			// if(i==14)
			// {
			// 	gRO[i]=1;
			// }
		}
	}
	else
	{
		val_R = val_data-rcg[val_num][15]//除掉线电阻
		for (var i = 14; i >= 0; i--) 
		{
			if (val_R>=rcg[val_num][i]) 
			{
				gRO[i]=1;
				// if (i==14) {gRO[i]=0;}
				val_R = val_data-rcg[val_num][i]
			}
			else
			{
				gRO[i]=0;
				// if (i==14) {gRO[i]=1;}
			}
		}
	}
}

//电阻信号输出,返回值：strTem2[0]为数据类型（R01/R02）、strTem2[1]为数据值(16进制数)；
function outputR(send_type,send_data)
{
	var send_num;
	var strTem = "";
	var hex_strTem ;
	// alert(send_type +":" + send_data)
	switch (send_type)
	{
		case "R01":send_num = 0;break;
		case "R02":send_num = 1;break;
	}

	rch(send_num,send_data);
	for (var i = 14; i >= 0; i--)
	{
		strTem =strTem + gRO[i];
	}
	hex_strTem = parseInt(strTem,2).toString(16);

	var socket = io.connect('http://localhost:3000');

	socket.emit('resCh0', 10);

	return {send_type:send_type,send_data:hex_strTem};
}

//电阻校准,获取校准值。val_data为电阻值，send_type标记哪路电阻
function calibrate_R(send_type,send_data)
{
	var send_num;
	switch (send_type)
	{
		case "R01":send_num = 0;break;
		case "R02":send_num = 1;break;
	}


}
//调用ＣＳＳ
function fuc_css()
{
 	$(".para_device_button").addClass("button button-3d button-action button-pill");		
}
//得到ＣＡＮ参数设置
function get_canPara()
{
	var obj_device_name = document.getElementById("device_name");
	pub_devName_channelnum =obj_device_name.selectedIndex; //序号，取当前选中选项的序号
	pub_devName_channel = obj_device_name.options[pub_devName_channelnum].value;

	var obj_baud = document.getElementById("baud");
	pub_Vchannelnum = obj_baud.selectedIndex; //序号，取当前选中选项的序号
	pub_baud_channel　 = obj_baud.options[pub_Vchannelnum].value;

	var obj_fraType = document.getElementById("frame_type");
	pub_fraType_channelnum =obj_fraType.selectedIndex; //序号，取当前选中选项的序号
	pub_fraType_channel = obj_fraType.options[pub_fraType_channelnum].value;

	var obj_fraFor = document.getElementById("frame_formate");
	pub_fraFor_channelnum = obj_fraFor.selectedIndex; //序号，取当前选中选项的序号
	pub_fraFor_channel = obj_fraFor.options[pub_fraFor_channelnum].value;


	$("#device_name").change(function(){
		var obj_device_name = document.getElementById("device_name");
		pub_devName_channelnum =obj_device_name.selectedIndex; //序号，取当前选中选项的序号
		pub_devName_channel = obj_device_name.options[pub_devName_channelnum].value;
	  	alert("device_name:" +　pub_devName_channel　);
	});
	$("#baud").change(function(){
		var obj_baud = document.getElementById("baud");
		pub_Vchannelnum = obj_baud.selectedIndex; //序号，取当前选中选项的序号
		pub_baud_channel　 = obj_baud.options[pub_Vchannelnum].value;
		alert( "baud:" + pub_baud_channel　);
	});
	$("#frame_type").change(function(){
		var obj_fraType = document.getElementById("frame_type");
		pub_fraType_channelnum =obj_fraType.selectedIndex; //序号，取当前选中选项的序号
		pub_fraType_channel = obj_fraType.options[pub_fraType_channelnum].value;
		alert("frame_type:" + pub_fraType_channel);
	});
	$("#frame_formate").change(function(){
		var obj_fraFor = document.getElementById("frame_formate");
		pub_fraFor_channelnum = obj_fraFor.selectedIndex; //序号，取当前选中选项的序号
		pub_fraFor_channel = obj_fraFor.options[pub_fraFor_channelnum].value;
		alert("frame_formate:" + pub_fraFor_channel);
	});
	alert("device_name:" +　pub_devName_channel　+ ";baud:" + pub_baud_channel　+ ";frame_type:" + pub_fraType_channel +";frame_formate:" + pub_fraFor_channel);
}