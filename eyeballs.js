/*
eyeballs.js (c) 2015 Owen Swerkstrom
GPLv3, but seriously, use this however you want.  I don't care.  :^)
*/
(function() {
	var canv = document.createElement("canvas");
	var ctx = canv.getContext("2d");
	var targX = 0;
	var targY = 0;
	var winkLeft = false;
	var winkRight = false;
	var draweye = function(x, wink) {
		var toX = targX - (canv.offsetLeft + x);
		var toY = targY - (canv.offsetTop + (canv.height / 2));
		var angle = Math.atan2(toX, toY);
		var dist = Math.sqrt(Math.pow(toX, 2) + Math.pow(toY, 2));
		ctx.save();
		//eyeball
		ctx.fillStyle = "white";
		ctx.strokeStyle = "black";
		ctx.translate(x, canv.height / 2);
		ctx.beginPath();
		ctx.arc(0, 0, (canv.height / 2) - 2, 0, (Math.PI * 2));
		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		if(wink) {
			//lid
			ctx.translate(0, canv.height / -2);
			ctx.beginPath();
			ctx.arc(0, 0, canv.height * 3 / 5, Math.PI * 1 / 4, Math.PI * 3 / 4);
			ctx.stroke();
		} else {
			//pupil
			ctx.rotate(-angle);
			ctx.translate(0, Math.min(canv.height / 4, dist));
			ctx.fillStyle = "black";
			ctx.beginPath();
			ctx.arc(0, 0, canv.height / 6, 0, (Math.PI * 2));
			ctx.closePath();
			ctx.fill();
		}
		ctx.restore();
	};
	var draw = function() {
		if(parseInt(canv.style.width, null)) {
			canv.width = parseInt(canv.style.width, null) || 50;
			canv.height = canv.width / 2;
		} else {
			canv.height = parseInt(canv.style.height, null) || 25;
			canv.width = canv.height * 2;
		}
		draweye(canv.width * 1 / 4, winkLeft);
		draweye(canv.width * 3 / 4, winkRight);
	};
	window.addEventListener("load", function() {
		canv.id = "EYEBALLS";
		document.body.appendChild(canv);
		draw();
		window.addEventListener("mousemove", function(e) {
			targX = e.clientX;
			targY = e.clientY;
			draw();
		});
		window.addEventListener("mousedown", function(e) {
			if(e.button) {
				winkRight = true;
			} else {
				winkLeft = true;
			}
			draw();
		});
		window.addEventListener("mouseup", function(e) {
			if(e.button) {
				winkRight = false;
			} else {
				winkLeft = false;
			}
			draw();
		});
	});
})();
