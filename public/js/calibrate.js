// <!--/*
//  * test.html 
//  * Version - 1.0.0
//  * Copyright (c) 2016 Marvin
//  */-->
// // new_element=document.createElement("script");
// // new_element.setAttribute("type","text/javascript");
// // new_element.setAttribute("src","Dialog.js");// 在这里引入了a.js
// // document.body.appendChild(new_element);

var pub_Rchannel ;//电阻选中通道
var pub_Rchannelnum;//电阻选中的通道号；
var pub_Vchannel ;//电压选中通道
var pub_Vchannelnum;//电压选中的通道号；
var gRO= new Array(16); //'电阻信号值,在串口通信中使用String类型,0~14=>0.1~1024,15备用

//电阻信号的矫正值，即为每个标准电阻的实际电阻值,0-5代表6路电阻的某路0~2为实际电阻值,15为线电阻值
// var rcg  =  new Array(2);
// rcg[0] = new Array(16);
// rcg[1] = new Array(16);

//电压矫正值
var v_rcg = new Array(2);
//
$(document).ready(function(){
	var obj = document.getElementById("R_channel");
	pub_Rchannelnum =obj.selectedIndex; //序号，取当前选中选项的序号
	pub_Rchannel = obj.options[pub_Rchannelnum].value;

	var objV = document.getElementById("V_channel");
	pub_Vchannelnum = objV.selectedIndex; //序号，取当前选中选项的序号
	pub_Vchannel = objV.options[pub_Vchannelnum].value;
	alert(pub_Rchannel);
	for (var i = 0; i < 2; i++) 
	{
		for (var j = 0; j < 16; j++) 
		{
			rcg[i][j]=0;
		}
	}
	$("#R_channel").change(function(){
		var obj = document.getElementById("R_channel");
		pub_Rchannelnum = obj.selectedIndex; //序号，取当前选中选项的序号
		pub_Rchannel = obj.options[pub_Rchannelnum].value;
		alert(pub_Rchannel);
		//obj[index].selected=true;
	});
	//电阻校验发送指令
 	$("#btnR_0").click(function(){
 		alert(pub_Rchannel)
 		outputR(pub_Rchannel,0);
 	});
 	$("#btnR_01").click(function(){
 		outputR(pub_Rchannel,0.1);
 	}); 
 	$("#btnR_02").click(function(){
 		outputR(pub_Rchannel,0.2);
 	});
 	$("#btnR_04").click(function(){
 		outputR(pub_Rchannel,0.4);
 	});
 	$("#btnR_08").click(function(){
 		outputR(pub_Rchannel,0.8);
 	});
 	$("#btnR_1").click(function(){
 		outputR(pub_Rchannel,1);
 	});
 	$("#btnR_2").click(function(){
 		outputR(pub_Rchannel,2);
 	});
 	$("#btnR_4").click(function(){
 		outputR(pub_Rchannel,4);
 	});
 	$("#btnR_8").click(function(){
 		outputR(pub_Rchannel,8);
 	});
 	$("#btnR_16").click(function(){
 		outputR(pub_Rchannel,16);
 	});
 	$("#btnR_32").click(function(){
 		outputR(pub_Rchannel,32);
 	});
 	$("#btnR_64").click(function(){
 		outputR(pub_Rchannel,64);
 	}); 
 	$("#btnR_128").click(function(){
 		outputR(pub_Rchannel,128);
 	});
 	$("#btnR_256").click(function(){
 		outputR(pub_Rchannel,256);
 	});
 	$("#btnR_512").click(function(){
 		outputR(pub_Rchannel,512);
 	});
 	$("#btnR_1024").click(function(){
 		outputR(pub_Rchannel,1024);
 	}); 		
 	//电阻校准修改校准值
 	$("#txtR_0").change(function(){
 		rcg[pub_Rchannelnum][15] = document.getElementById("txtR_0").value;
 	}); 	
 	$("#txtR_01").change(function(){
 		rcg[pub_Rchannelnum][0] = document.getElementById("txtR_01").value;
 	});	
 	$("#txtR_02").change(function(){
 		rcg[pub_Rchannelnum][1] = document.getElementById("txtR_02").value;
 	});
 	$("#txtR_04").change(function(){
 		rcg[pub_Rchannelnum][2] = document.getElementById("txtR_04").value;
 	});
 	$("#txtR_08").change(function(){
 		rcg[pub_Rchannelnum][3] = document.getElementById("txtR_08").value;
 	});
 	$("#txtR_1").change(function(){
 		rcg[pub_Rchannelnum][4] = document.getElementById("txtR_1").value;
 	});
 	$("#txtR_2").change(function(){
 		rcg[pub_Rchannelnum][5] = document.getElementById("txtR_2").value;
 	}); 	
 	$("#txtR_4").change(function(){
 		rcg[pub_Rchannelnum][6] = document.getElementById("txtR_4").value;
 	});	
 	$("#txtR_8").change(function(){
 		rcg[pub_Rchannelnum][7] = document.getElementById("txtR_8").value;
 	});
 	$("#txtR_16").change(function(){
 		rcg[pub_Rchannelnum][8] = document.getElementById("txtR_16").value;
 	});
 	$("#txtR_32").change(function(){
 		rcg[pub_Rchannelnum][9] = document.getElementById("txtR_32").value;
 	});
 	$("#txtR_64").change(function(){
 		rcg[pub_Rchannelnum][10] = document.getElementById("txtR_64").value;
 	});
 	$("#txtR_128").change(function(){
 		rcg[pub_Rchannelnum][11] = document.getElementById("txtR_128").value;
 	}); 	
 	$("#txtR_256").change(function(){
 		rcg[pub_Rchannelnum][12] = document.getElementById("txtR_256").value;
 	});	
 	$("#txtR_512").change(function(){
 		rcg[pub_Rchannelnum][13] = document.getElementById("txtR_512").value;
 	});
 	$("#txtR_1024").change(function(){
 		rcg[pub_Rchannelnum][14] = document.getElementById("txtR_1024").value;
 	});


 	//电压校准
 	var objV = document.getElementById("V_channel");
	pub_Vchannelnum =objV.selectedIndex; //序号，取当前选中选项的序号
	pub_Vchannel = objV.options[pub_Vchannelnum].value;

	for (var i = 0; i < 2; i++) 
	{
		for (var j = 0; j < 16; j++) 
		{
			rcg[i][j]=0;
		}
	}
	$("#V_channel").change(function(){
		var objV = document.getElementById("V_channel");
		pub_Vchannelnum = objV.selectedIndex; //序号，取当前选中选项的序号
		pub_Vchannel = objV.options[pub_Vchannelnum].value;
		//obj[index].selected=true;
	});
	//电压校验发送指令
 	$("#btnV_1").click(function(){
 		v_rcg[0] = 36;
 		outputV(pub_Vchannel,36);
 		alert("btnV_1");
 	});
 	$("#btnV_2").click(function(){
 		v_rcg[1] = 36;
 		outputV(pub_Vchannel,36);
 		alert("btnV_2");
 	}); 
		
 	//电压校准修改校准值
 	$("#txtV_1").change(function(){
 		v_rcg[0] = document.getElementById("txtV_1").value;
 		alert(v_rcg[0]);
 	}); 	
 	$("#txtV_2").change(function(){
 		v_rcg[1] = document.getElementById("txtV_2").value;
 		alert(v_rcg[1]);
 	});	
 	
 });



 	
function crtatscreen()
{
	alert($(this).find("#btnR_0").value);

}
//输出电阻信号
function outputR(send_type,send_data)
{
	var send_num;
	var strTem = "";
	var hex_strTem ;
	alert("R:" + send_type +":" + send_data)
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
	return {send_type:send_type,send_data:hex_strTem};
}
// 输出电压信号
function outputV(send_type,send_data)
{
	var send_num;
	var strTem = "";
	var hex_strTem ;
	alert("V:" + send_type +":" + send_data)
	switch (send_type)
	{
		case "V01":send_num = 0;break;
		case "V02":send_num = 1;break;
	}
	strTem = send_data*36/v_rcg[send_num];

	return {send_type:send_type,send_data:hex_strTem};
}
//关闭当前页面
function closeCurrentWindow()
{
  window.close();
}
// 电阻值转换成二进制开关量值，val_data为电阻值，val_num标记哪路电阻
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
		val_R = val_data-rcg[val_num][15];//除掉线电阻
		for (var i = 14; i >= 0; i--) 
		{
			if (val_R>=rcg[val_num][i]) 
			{
				gRO[i]=1;
				// if (i==14) {gRO[i]=0;}
				val_R = val_data-rcg[val_num]["15"];
			}
			else
			{
				gRO[i]=0;
				// if (i==14) {gRO[i]=1;}
			}
		}
	}
}

