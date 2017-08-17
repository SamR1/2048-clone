(function ( $ ) {

	// //for test only !!!
	// var winValue = [2, 2, 2, 2, 2, 2048];
	// //for test only !!!

	var gradient = {
		"0":    "#cdcdcd",
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
	var isGameWonOrLose = false; 
	var hasOneCellMovedOrPopped = false;

	//to get more chances to get a 2 instead of a 4
	var initValues = [2, 2, 2, 2, 2, 2, 2, 4];
	function initValue(){
		var i = Math.floor(Math.random() * 8);
		return initValues[i];
	};

	function randomPosition(){
		var x = 10; // 0 is a correct position
		var y = 10;

		if ($(".square td:contains(\"0\")").length > 0) {
			while ((x == 10) ||
				   ($(".row-" + x + " .col-" + y).text() != 0)) {
				x = Math.floor(Math.random() * 4);
				y = Math.floor(Math.random() * 4);
			}
			hasOneCellMovedOrPopped = true;
			return {x: x, y: y};
		}
		else{
			hasOneCellMovedOrPopped = false;
			return null;
		}
	};
 	
 	$.fn.initPage     = function(){

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
			"text-align"      : "center",
			"font"            : "bold 20px Arial",
			"color"           : "#555",
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
			"width"           : "150px"
 		});

 		$(".squarec").css({
 			"position"        : "fixed",
 		});
 		$(".square").css({
			"table-layout"    : "fixed",
			"word-break"      : "break-all",
 			"border-collapse" : "collapse",
			"width"           : "600px",
			"height"          : "600px",
			"margin"          : "auto",
			"text-align"      : "center",
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

 		$("#msg").css({
			"font-size"       : "40px",
			"font-weight"     : "bold"
 		});

 		$("#how").css({
			"font"            : "18px Arial" // be aware, in one line the line-height is set
 		});


 		$("#squaret").initSquare();
 		var top  = $("#squarec").position().top;
 		var left = $("#squarec").position().left;
 		var width  = $("#squarec").width();
 		var height = $("#squarec").height();
 		$('#overl')
 			.addClass('overlay')
 			.css({
	 			"position"       : "absolute",
 				"top"            : top,
 				"left"           : left,
 				"width"          : width,
 				"height"         : height,
 				"line-height"    : height + "px",
				"background"     : "#dedede",
				"opacity"        : "0.5",
				"filter"         : "alpha(opacity=75)",
				"text-align"     : "center",
 				"z-index"        : "-100"
 			});

 		return this;
 	};

 	$.fn.colorCell    = function(withFadeIn=false){

		if (withFadeIn && this.text() != 0) {
	
			this.css({ "opacity": 0 });
			this.css({
 				"background-color": gradient[this.text()],
 			});
			this.css({"color": "#474747"});
			this.animate({ "opacity": 1 });
		}
		else{
	 		this.css({
	 			"background-color": gradient[this.text()],
	 		});
			if (this.text() == 0){
				this.css({"color": "#cdcdcd"});
			}
			else{
				this.css({"color": "#474747"});
			}
		}

		return this;
 	};

 	$.fn.initSquare   = function(){

 		//fisrt number
 		var first   = initValue();
 		var pos     = randomPosition();
 		var firstx  = pos.x;
 		var firsty  = pos.y;
 		$(".row-" + firstx + " .col-" + firsty).html(first).colorCell();

 		//second number
 		var second  = initValue();
 		var pos     = randomPosition();
 		var secondx = pos.x;
 		var secondy = pos.y;
 		$(".row-" + secondx + " .col-" + secondy).html(second).colorCell();

 		return this;
 	};

 	$.fn.moveCells    = function(key){

 		if (isGameWonOrLose) {
 			return this;
 		}		

		var initRow  = 0;
		var initCol  = 0;
		var offset   = 0;
		var beginsBy = "";
		hasOneCellMovedOrPopped = false;

 		switch (key){
 			case(37): // to the left
 				initRow  = 0;
 				initCol  = 1;
 				offset   = 1;
 				beginsBy = "row";
 				break;

 			case(38): // to the top
 				initRow  = 1;
 				initCol  = 0;
 				offset   = 1;
  				beginsBy = "col";
 				break;

 			case(39): // to the right
 				initRow  = 0;
 				initCol  = 2;
 				offset   = -1;
  				beginsBy = "row";
 				break;

 			case(40): // to the bottom 
 				initRow  = 2;
 				initCol  = 0;
 				offset   = -1;
 				beginsBy = "col";
 				break;

 			default:
 				// in case the function is called with 
 				// others keys
 				return this;
		}

		$(".square td").removeClass("merged");

		// A cell can move up to 3 times
		for (k=1; k<4; k++){

			var currentRow = initRow;
			var currentCol = initCol;

			// According to the key, the table is first read by:
			// - rows (left or right keys)
			// - columns (up or downt keys)
			// (4 by 4 square)
		    for (j=1; j<5; j++){


				// After, the table is read by:
				// - columns (left or right keys)
				// - rows (up or downt keys)
				// It begins with the farest element, that can move
				// if the next cell is empty
				// Example: if the left key is pressed, it begins
				// with the column 1 and checks if this cell can
				// move to the column 0.
		 	    for (i=1; i<4; i++){

		 	    	var nextRow;
		 	    	var nextCol;
		 	    	
					if (beginsBy == "row") {
						nextRow = currentRow;
						nextCol = currentCol + (0 - offset);
					}
					else {
						nextRow = currentRow + (0 - offset);
						nextCol = currentCol;
					}

 					currentCellValue = parseInt($(".row-" + currentRow + " .col-" + currentCol).text());

		 	    	if ( currentCellValue != 0 ){

		 	    		var isSameValue = false;
		 	    		newCellValue = parseInt($(".row-" + nextRow + " .col-" + nextCol).text());
	 	    		
		 	    		if ( ( newCellValue == 0 )     
		 	    	    ||	 ((currentCellValue == newCellValue) 
		 	    	    	&& (!$(".row-" + currentRow + " .col-" + currentCol).hasClass("merged"))
		 	    			 )
		 	    		   ) {

							if ( currentCellValue == newCellValue ){

								isSameValue = true;
								
								$("#currentScore").text(parseInt($("#currentScore").text()) + newCellValue * 2);
								if ( parseInt( $("#bestScore").text()) < parseInt( $("#currentScore").text()) ){
									$("#bestScore").text($("#currentScore").text());
								}

								$(".row-" + nextRow + " .col-" + nextCol).addClass("merged");
							} 

							newCellValue = currentCellValue + newCellValue;

							// // for test only !!!
							// var index = Math.floor(Math.random() * 6);
							// if (winValue[index] == 2048) {
							// 	newCellValue = 2048;
							// }
							// // for test only !!!

							$(".row-" + nextRow + " .col-" + nextCol).text(newCellValue);

							if ( newCellValue == 2048 ) {

						 		if ( $(".square td").text() != "0" ) {
							 		$("this").css({ 
							 			"background-color": "#2d2d2d", 
							 			"color": "#ffffff"
							 		});
						 		}
						 		$(".row-" + nextRow + " .col-" + nextCol).css({ 
						 			"background-color": "#ffffff", 
						 			"color": "#2d2d2d"
						 		});
								isGameWonOrLose = true;
						 		$('#overl').text("You win! Brava !!")
						 		           .css({"z-index": "100"});
								return this;
							}
							else {

								if (isSameValue){
									$(".row-" + nextRow + " .col-" + nextCol).colorCell();
								}
								else {
									$(".row-" + nextRow + " .col-" + nextCol).colorCell();
								}

								$(".row-" + currentRow + " .col-" + currentCol).text(0).colorCell();						
							}
							hasOneCellMovedOrPopped = true;
		 	    		}  		
		 	    	}

					if (beginsBy == "row") {
						currentCol += offset;
					}
					else {
						currentRow += offset;
					}
		 	    }

				if (beginsBy == "row") {
					currentRow++;
					currentCol = initCol;
				}
				else {
					currentRow = initRow;
					currentCol++;
				}
		 	}
		}
	
 		var pos = randomPosition();
 		if (hasOneCellMovedOrPopped) {
 			var newValue  = initValue();
			var newCellx  = pos.x;
			var newCelly  = pos.y;
			$(".row-" + newCellx + " .col-" + newCelly).html(newValue).colorCell(true);
 		}
 		else{
 			isGameWonOrLose = true;
	 		$('#overl').css({"z-index": "100"});
	 		$('#msg').text("You loose! Too bad :(");
			return this;
 		}

 		return this;
 	} 

 	$.fn.resetSquare  = function() {

 		$(".square td").text(0).css({ 
 			"background-color": "#cdcdcd", 
 			"color": "#cdcdcd"
 		});
 		$("#currentScore").text(0);
		$("#squaret").initSquare();
		isGameWonOrLose = false;
		hasOneCellMovedOrPopped = false;
 		$('#overl').text("").css({"z-index": "-100"});

 		return this;
 	}

}( jQuery ));
