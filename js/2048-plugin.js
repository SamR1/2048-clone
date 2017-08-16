(function ( $ ) {

	var gradient = {
		"2":    "#d2e4de",
		"4":    "#c7ded6",
		"8":    "#bbd7ce",
		"16":   "#b0d0c6",
		"32":   "#a5cabe",
		"64":   "#9ac3b6",
		"128":  "#8fbdae",
		"256":  "#80aa9c",
		"512":  "#72978b",
		"1024": "#648479",
		"2048": "#475e57"
	};
 
 	$.fn.initPage   = function(){

 		$("html, body").css({
 			"font-family"     : "Arial, sans-serif",
 			"font-size"       : "0.95em",
 			"background-color": "#f6f6f6"
 		});

 		$(".topnav").css({
			"background-color": "#333",
			"overflow"        : "hidden"
 		});
 		$(".topnav a").css({
			"float"           : "left",
			"display"         : "block",
			"color"           : "#f2f2f2",
			"text-align"      : "center",
			"padding"         : "22px 16px 16px 16px",
			"text-decoration" : "none",
			"font-size"       : "17px"
 		});
 		$(".brand").css({
			"background-color": "#adadad",
			"padding-top"     : "16px",
			"font-size"       : "24px"
 		});

 		$(".contnr").css({
			"padding"         : "20px",
			"position"        : "relative",
			"left"            : "20%",
			"right"           : "20%",
			"width"           : "60%",
			"text-align"      : "center",
			"background-color": "#dedede",
			"border-style"    : "solid",
			"border-width"    : "0.5px",
			"border-color"    : "#f6f6f6"
 		});

 		$(".scoretab").css({
			"width"           : "100%",
			"text-align"      : "center"
 		});
 		$("button").css({
 			"cursor"          : "pointer",
			"padding"         : "6px 0 6px 0",
			"font"            : "bold 16px Arial",
			"background"      : "#f5f5f5",
			"color"           : "#555",
			"border-radius"   : "2px",
			"width"           : "150px",
			"border"          : "none"
 		});
 		$(".score").css({
			"background"      : "#e6e6e6",
			"color"           : "#555",
			"font"            : "bold 16px Arial",
			"width"           : "150px",
 		});


 		$(".square").css({
			"table-layout"    : "fixed",
			"word-break"      : "break-all",
 			"border-collapse" : "collapse",
			"width"           : "600px",
			"height"          : "600px",
			"margin"          : "auto",
			"text-align"      : "center"
 		});
 		$(".square th, .square td").css({
 			"border"          : "15px solid #8a8a8a",
 			"font"            : "bold 45px Arial"
 		});
 		$(".square td").css({
 			"border"          : "15px solid #8a8a8a",
			"background"      : "#cdcdcd",
			"color"           : "#cdcdcd"
 		});

 		$("#how").css({
			"font"            : "18px Arial"
 		});

 		return this;
 	};

 	$.fn.colorCell  = function(){
 		this.css({
 			"background-color": gradient[this.text()],
 			"color": "#474747"
 		});
 	};

 	$.fn.initSquare = function(){

 		//fisrt number
 		var first  = Math.floor((Math.random() * 2) + 1) *2;
 		var firstx = Math.floor(Math.random() * 4);
 		var firsty = Math.floor(Math.random() * 4);
 		$(".row-" + firstx + " .col-" + firsty + "").html(first).colorCell();

 		//second number
 		var second  = Math.floor((Math.random() * 2) + 1) *2;
 		var secondx = Math.floor(Math.random() * 4);
 		var secondy = Math.floor(Math.random() * 4);
 		$(".row-" + secondx + " .col-" + secondy + "").html(second).colorCell();

 		return this;
 	};
 	
}( jQuery ));

function generateMultiple(){
	var res = Math.floor(Math.random() * ((2048 - 2) / 2)) * 2 + 2;
	return res;
}

$(document).ready(function(){
	console.log("start");

	$(document).initPage();

	$("#squaret").initSquare();

	console.log("end");
});