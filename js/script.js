$(document).ready(function(){
	$(document).initPage("#squareLocation");
	
	$("#newGame").click(function(){
		$("#squaret").resetSquare();
	});

	$(document).keypress(function(e){
		//for firefox : use of keyCode
		if (e.keyCode > 36 && e.keyCode < 41 ){
			$("#squaret").moveCells(e.keyCode);
		}
	});
});