$(function() {
		var shebiao = [];
		var she = [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}]
		var score=0;
		var list = $('.list');
		var start = $('.start');
		var label = $('.label', list);
		var flag = true;
	    var chuji = $('.chuji');
		var zhongji = $('.zhongji');
		var gaoji = $('.gaoji');
		var submit = $('.submit');
		var labe = $('.labe');
	    var end=$('.end');
		var ts=$('.t-s');
		var cue=$('.cue',ts);
		var cueList=$('.cue-list');
	    var point=$('.point');
	    var scence=$('.scence');
		for (var i = 0; i < 20; i++) {
			for (var j = 0; j < 20; j++) {
				var r = Math.floor(Math.random() * 150)
				var g = Math.floor(Math.random() * 150)
				var b = Math.floor(Math.random() * 150)
				// var color="rgba("+r+","+g+","+b+",0.6)"
				$("<div>").attr("id", i + "_" + j).addClass("block").appendTo(".scence");
			}
		}

		function finddiv(x, y) {
			return $("#" + x + "_" + y)
		}

		$.each(she, function (i, v) {
			finddiv(v.x, v.y).addClass('she')
		})
        //放食物
		function fangshiwu() {
			do {
				var x = Math.floor(Math.random() * 19)
				var y = Math.floor(Math.random() * 19)
			} while (shebiao[x + "_" + y])
			{
				finddiv(x, y).addClass("food")
				return {x: x, y: y}
			}
		}
		var shiwu = fangshiwu();
		var direction = "you";
	    var kuang=$('.kuang');
	    var L=$('.btnL');
	    var R=$('.btnR');
	    L.on("mousedown",function () {
			kuang.hide();
		})
	    R.on("mousedown",function () {
			kuang.hide();
			score=0;
			$(".d-f").text("得分:0");
			//页面重载
			window.location.reload();
	    })
	    kuang.hide();
        //新头与旧头比较  进行判断
		var move = function () {
			var jiutou = she[she.length - 1]
			if (direction === "you") {
				var xintou = {x: jiutou.x, y: jiutou.y + 1}
			}
			if (direction === "zuo") {
				var xintou = {x: jiutou.x, y: jiutou.y - 1}
			}
			if (direction === "shang") {
				var xintou = {x: jiutou.x - 1, y: jiutou.y}
			}
			if (direction === "xia") {
				var xintou = {x: jiutou.x + 1, y: jiutou.y}
			}

			if (shebiao[xintou.x + "_" + xintou.y]) {
				clearInterval(t)
				alert("kuang")
				return
			}
			if (xintou.x < 0 || xintou.x > 19 || xintou.y < 0 || xintou.y > 19) {
				clearInterval(t)
				kuang.show();
				return
			}
			she.push(xintou)
			//等于true  原来shebiao里边是一个空的数组  让它等于true  就会存进去
			shebiao[xintou.x + "_" + xintou.y] = true;
			finddiv(xintou.x, xintou.y).addClass("she")
			if (xintou.x === shiwu.x && xintou.y === shiwu.y) {
				score += 10;
				$('.d-f').text("得分:" + score);
				finddiv(shiwu.x, shiwu.y).removeClass("food")
				shiwu = fangshiwu()
			} else {
				var weiba = she.shift()
				//上边存进去之后  还得把尾巴给清楚掉 所有false；
				shebiao[weiba.x + "_" + weiba.y] = false;
				finddiv(weiba.x, weiba.y).removeClass("she")
			}
		}
        //键盘事件
		function key() {
			$(document).on("keyup", function (e) {
				var fanbiao = {'zuo': 37, 'you': 39, 'shang': 38, 'xia': 40}
				var biao = {37: 'zuo', 39: 'you', 38: 'shang', 40: 'xia'}
				if (Math.abs(e.keyCode - fanbiao[direction]) == 2) {
					return
				} else {
					direction = biao[e.keyCode]
				}
			})
		}

		start.on("mousedown", false);
		start.on("mousedown", function () {
			flag = false;
			list.addClass("active");
		})

		$(".list .chuji input").on('click', function () {
			$('.list .chuji input:checkbox').prop('checked', true)
			$('.list .zhongji input:checkbox').prop('checked', false)
			$('.list .gaoji input:checkbox').prop('checked', false)
		})

		$(".list .gaoji input").on('click', function () {
			$('.list .chuji input:checkbox').prop('checked', false)
			$('.list .zhongji input:checkbox').prop('checked', false)
			$('.list .gaoji input:checkbox').prop('checked', true)
		})

		submit.on("click", function () {
			//如果想要判断span就得进来声明 因为放在外边它只能获取一次
			// var pp=$('span');
			list.removeClass("active");
			if ($('.list .chuji input:checked').length == 1) {
				key();
				t = setInterval(move, 300)
			} else {
				key();
				t = setInterval(move, 100)
			}
		})

		//结束游戏
		end.on("click",function () {
			window.close();
		})
		//温馨提示
		cue.on("mousedown",false);
		cue.on("mousedown",function () {
			cueList.toggleClass("pop")
		})

	    //	重新开始
		point.on("click",function () {
			score=0;
			$(".d-f").text("得分:0");
			//页面重载
           window.location.reload();
		})
//	暂停游戏
	var ZT=$('.Z-T');
	ZT.on("click",function () {
		clearInterval(t)
	})
	ZT.on("dblclick",function () {
		if ($('.list .chuji input:checked').length == 1) {
			key();
			t = setInterval(move, 300)
		} else {
			key();
			t = setInterval(move, 100)
		}
	})

	var Start=$('.start-box');
	var cenT=$('.cen-boxs');
	cenT.on("mousedown",function () {
		Start.addClass("top-fly")
	})
})