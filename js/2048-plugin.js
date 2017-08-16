(function ( $ ) {
 
    $.fn.redify = function () {
		//for debug
		this.css({color: "#ff0000"});
		this.css({opacity : 0.5});
		return this;
	};
 
}( jQuery ));



$(document).ready(function(){
	console.log("start");

	//for debug
	$("a").redify();


	console.log("end");
});