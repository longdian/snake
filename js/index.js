$(function(){
     alert(2)
		for(var i=0;i<20;i++){
		for(var j=0;j<20;j++){
			var r=Math.floor(Math.random()*255)
			var g=Math.floor(Math.random()*255)
			var b=Math.floor(Math.random()*255)
			var color="rgba("+r+","+g+","+b+",1)"
			$("<div>").attr("id",i+"_"+j)
					.addClass("block")
					.css("background-color",color)
					.appendTo(".scence")
		}
	}


var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}]
function finddiv(x,y){
	return $('#'+x+'_'+y);
}
$.each(she,function(i,v){
	finddiv(v.x,v.y).addClass('she');
})
var shebiao=[];
function fangshiwu(){
	do{
		var x=Math.floor(Math.random()*19);
		var y=Math.floor(Math.random()*19);
	}while(shebiao[x+"_"+y]){
		finddiv(x,y).addClass('food');
		return {x:x,y:y}
	}
	
	
}

	var shiwu=fangshiwu();
	 var t=setInterval(move,200)
	var direction='you';
function move(){
	var jiutou=she[she.length-1];
	if(direction==='you'){
		var xintou={x:jiutou.x,y:jiutou.y+1};
	}
	if(direction==='zuo'){
		var xintou={x:jiutou.x,y:jiutou.y-1};
	}
	if(direction==='shang'){
		var xintou={x:jiutou.x-1,y:jiutou.y};
	}
	if(direction==='xia'){
		var xintou={x:jiutou.x+1,y:jiutou.y};
	}	
	 if(shebiao[xintou.x+"_"+xintou.y]){
   	 	clearInterval(t)
   	 	alert("撞到自己了")
   	 	return
   	 }
   	 if(xintou.x<0||xintou.x>19||xintou.y<0||xintou.y>19){
   	 	clearInterval(t)
   	 	alert("撞墙了")
   	 	return
   	 }

	she.push(xintou)
	finddiv(xintou.x,xintou.y).addClass('she');
	if(xintou.x===shiwu.x&&xintou.y===shiwu.y){
		finddiv(shiwu.x,shiwu.y).removeClass('food');
		shiwu=fangshiwu();
	}else{
		var weiba=she.shift();
		finddiv(weiba.x,weiba.y).removeClass('she');
	}	



}
	
	$(document).on('keyup',function(e){
		var fanbiao={'zuo':37,'you':39,'shang':38,'xia':40}
		var biao={37:'zuo',38:'shang',39:'you',40:'xia'};
		if(Math.abs(e.keyCode-fanbiao[direction])==2){
     	return
     }else{
     	direction=biao[e.keyCode]
     }
	})

	})