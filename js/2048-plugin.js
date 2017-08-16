(function ( $ ) {
 
 	$.fn.initPage = function(){

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
			"background-color": "#dedede"
 		});

 		$(".scoretab").css({
			"width"           : "100%",
			"text-align"      : "center"
 		});

 		$("button").css({
 			"cursor"          : "pointer",
			"padding"         : "6px 0 6px 0",
			"font"            : "bold 14px Arial",
			"background"      : "#f5f5f5",
			"color"           : "#555",
			"border-radius"   : "2px",
			"width"           : "100px",
			"border"          : "none"
 		});

 		$(".score").css({
			"background"      : "#e6e6e6",
			"color"           : "#555",
			"font"            : "bold 14px Arial",
			"width"           : "150px",
 		});

 		return this;
 	};

}( jQuery ));



$(document).ready(function(){
	console.log("start");

	$(document).initPage();

	console.log("end");
});