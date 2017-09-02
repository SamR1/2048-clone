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
	var isMergePossible = false; 
	var msgWin  = "You win! <img src='img/happy.png'>";
	var msgLose = "You loose! <img src='img/sad.png'>";

	//to get more chances to get a 2 instead of a 4
	var initValues = [2, 2, 2, 2, 2, 2, 2, 4];
	function initValue(){
		var i = Math.floor(Math.random() * 8);
		return initValues[i];
	}

	function randomPosition(){
		var x = 10; // 0 is a correct position
		var y = 10;

		if ($(".square td:contains(\"0\")").length > 0) {
			while ((x == 10) ||
				   ($(".row-" + x + " .col-" + y).text() != 0)) {
				x = Math.floor(Math.random() * 4);
				y = Math.floor(Math.random() * 4);
			}
			return {x: x, y: y};
		}
		else {
			return null;
		}
	}

	function simulateFourKeys(){
		for (key=37; key<41; key++){
			$("#squaret").moveCells(key, true);
			if (isMergePossible) {
				return;
			}
		}
	}

    function isMergePossibleFn(){
 		if ($(".square td:contains(\"0\")").length == 0){
			isMergePossible = false;
			simulateFourKeys();

 			if (!isMergePossible){

	 			isGameWonOrLose = true;
		 		$('#overl').css({"z-index": 100});
		 		$('#msg').html(msgLose);
 			}
 		}
 		return isMergePossible;
    }

	function saveData(){	
		localStorage.setItem("bestScore",$("#bestScore").text());

		var squareData = {
			"score" : $("#currentScore").text(), 
		}
		$(".square tr").each(function(){
			var tdValues = [];
			var trclass  = $(this).attr('class')
			$(this).children().each(function () {
				tdValues.push($(this).text());
			});
			squareData[trclass] = tdValues;
		});

		var squareData_json = JSON.stringify(squareData);
		localStorage.setItem("squareData",squareData_json);
	}

	function loadData(){
		var squareData_json = localStorage.getItem("squareData");
		var squareData      = JSON.parse(squareData_json);

		$("#currentScore").text(squareData["score"]);

		$(".square tr").each(function(){
			var trclass  = $(this).attr('class')
			var i = 0;
			$(this).children().each(function () { 
				$(this).text(squareData[trclass][i]);
				$(this).colorCell();
				i++;
			});
		});			
	}

	$.fn.initCSS        = function(){

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
			"border-radius"   : "5px",
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
			"text-align"      : "center"
 		});
 		$(".square th, .square td").css({
 			"border"          : "15px solid #8a8a8a",
 			"font"            : "bold 45px Arial"
 		});
 		$(".square td").css({
 			"border"          : "15px solid #8a8a8a",
			"background"      : "#cdcdcd",
			"color"           : "#cdcdcd",
			"border-radius"   : "10px"
 		});

 		$("#msg").css({
			"font-size"       : "40px",
			"font-weight"     : "bold"
 		});

 		$("#how").css({
 			// be aware, in one line, the line-height is set by default
			"font"            : "18px Arial" 
 		});

 		return this;
 	};

	$.fn.sizeOverlay    = function(){

		var $squarec = $("#squarec");

	 	var top    = $squarec.position().top;
 		var left   = $squarec.position().left;
 		var width  = $squarec.width();
 		var height = $squarec.height();
 		$(this)
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

 	$.fn.colorCell      = function(withFadeIn=false){

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

 	$.fn.initSquareData = function(){

		if( localStorage.getItem("bestScore") != undefined ){
			$("#bestScore").text(localStorage.getItem("bestScore"));
		}

 		if( localStorage.getItem("squareData") != undefined ){
 			loadData();

			if ($(".square td:contains(\"2048\")").length > 0) {


				$(".square td:not(:contains(\"0\"))").css({ 
					"background-color": "#2d2d2d", 
					"color": "#ffffff"
				});
				$(".square td:contains(\"2048\")").css({ 
					"background-color": "#ffffff", 
					"color": "#2d2d2d"
				});
				isGameWonOrLose = true;
				$('#overl').css({"z-index": "100"});
				$('#msg').html(msgWin);
			}
			else {
	 			isMergePossibleFn();				
			}

 		}
 		else {
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
 		}
 		return this;
 	};

 	$.fn.initPage       = function(elmt){

		$(elmt).append(
			$('<div\>', {class: 'contnr'}).append(
				$('<div\>', {id: 'score'})
			)
		);
		$("#score").append(
			$('<table\>', {class: 'scoretab'}).append(
				$('<tr\>').append(
					$('<td\>', {rowspan: '2'}).append(
						$('<button\>', {id: 'newGame', text: 'New Game'})
					    )
					).append(
					$('<td\>', {class: 'score', text: 'Score'})
					).append(
					$('<td\>', {class: 'score', text: 'Best Score'})
				)
			).append(
				$('<tr\>').append(
					$('<td\>', {id: 'currentScore', text: '0'})
					).append(
					$('<td\>', {id: 'bestScore', text: '0'})
				)				
			)
		);

		$(elmt).append(
			$('<div\>', {class: 'contnr'}).append(
				$('<div\>', {id: 'squarec'})
				).append(
				$('<div\>', {id: 'overl'}).append(
					$('<div\>', {id: 'msg'})
				)
			)
		);
		$('#squarec').append(
			$('<table\>', {class: 'square', id: 'squaret'})
		);

		for (i=0; i<4; i++){
			$('#squaret').append(
				$('<tr\>', {class: 'row-' + i}).append(
					$('<td\>', {class: 'col-0', text: '0'})
				).append(
					$('<td\>', {class: 'col-1', text: '0'})
				).append(
					$('<td\>', {class: 'col-2', text: '0'})
				).append(
					$('<td\>', {class: 'col-3', text: '0'})
				)
			);
		};

		$(elmt).append(
			$('<div\>', {class: 'contnr'}).append(
				$('<div\>', {id: 'how', html:
					'<strong>How to play</strong>: Use your arrow keys to ' +
					'move the tiles.<br>When two tiles with the same number' +
					' touch, they <strong>merge into one</strong>! '}
				)
			)
		);
		$(document).initCSS();
		$("#overl").sizeOverlay();
 		$("#squaret").initSquareData();
 		return this;
	};

 	$.fn.moveCells      = function(key, simulate=false){

 		if (isGameWonOrLose) {
 			return this;
 		}

		var initRow  = 0;
		var initCol  = 0;
		var offset   = 0;
		var beginsBy = "";
		var hasOneCellMoved  = false;

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
		
					var $currentCell     = $(".row-" + currentRow + " .col-" + currentCol);
					var currentCellValue = parseInt($currentCell.text());

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
					var $nextCell    = $(".row-" + nextRow    + " .col-" + nextCol);				

		 	    	if ( currentCellValue != 0 ){
						
						var nextCellValue     = parseInt($nextCell.text());
						var isCurrCellMerged  = $currentCell.hasClass("merged");

						var areSameCellValues = (currentCellValue == nextCellValue);

						if ( ( nextCellValue == 0 )     
						||	 ( areSameCellValues && (!isCurrCellMerged))
						   ) {

							// no need to continue further
							if (simulate) {
								isMergePossible = true;
								return this;
							}

							// merge is possible
							if ( areSameCellValues ){

								var $currentScore = $("#currentScore");
								var currentScore  = parseInt($("#currentScore").text());
								currentScore = currentScore + (nextCellValue * 2);
								$currentScore.text(currentScore);

								var $bestScore = $("#bestScore");
								var bestScore  = parseInt($("#bestScore").text());

								if ( bestScore < currentScore ){
									$bestScore.text(currentScore);
								}
								$nextCell.addClass("merged");								
							} 
							else {
								$nextCell.removeClass("merged");
							}

							nextCellValue = currentCellValue + nextCellValue;
							// for test only !!!
							// var index = Math.floor(Math.random() * 6);
							// if (winValue[index] == 2048) {
							// 	nextCellValue = 2048;
							// }
							// for test only !!!
							$nextCell.text(nextCellValue);

							if ( nextCellValue == 2048 ) {

								$(".square td:not(:contains(\"0\"))").css({ 
										"background-color": "#2d2d2d", 
										"color": "#ffffff"
									});
						 		$nextCell.css({ 
						 			"background-color": "#ffffff", 
						 			"color": "#2d2d2d"
						 		});
								isGameWonOrLose = true;
						 		$('#overl').css({"z-index": "100"});
 								$('#msg').html(msgWin);
 								saveData();
								return this;
							}
							else {
								$currentCell.text(0).colorCell();
								$nextCell.colorCell();				
							}
							hasOneCellMoved = true;
		 				} // nextCellValue == 0 or != nextCellValue and 
		 				  // nextCellValue not already merged
		 			} // currentCellValue != 0 

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
		} // all possibles moves or merged done

 		// if it's a simulation, no need to go further
 		if (simulate) {
 			return this;
 		}

 		// if square is full
 		if ($(".square td:contains(\"0\")").length == 0){
			
				isMergePossible = isMergePossibleFn();
	 			if (!isMergePossible){
			 		saveData();
					return this;
	 			}
 		}

 		// a new tile is added, only if a move was done (and the squre is
 		// not full, see previous condition)
 		if (hasOneCellMoved) {
			var pos = randomPosition();

	 		if (pos != null) {
	 			var newValue  = initValue();
				var newCellX  = pos.x;
				var newCellY  = pos.y;

				var $poppedCell  = $(".row-" + newCellX + " .col-" + newCellY);

				$poppedCell.html(newValue)
				           .colorCell(true)
				           .removeClass('merged');

				// if no move or merge are possible after a new tile popped, the 
				// player looses
				isMergePossible = isMergePossibleFn();
	 			if (!isMergePossible){
			 		saveData();
					return this;
	 			}
	 		}
	 		// security (normally, if the square is full and no move is possible
	 		// this code is not reached)
	 		else {
	 			isGameWonOrLose = true;
		 		$('#overl').css({"z-index": 100});
		 		$('#msg').html(msgLose);
	 		}	
 		}		
		saveData();
 		return this;
 	} 

 	$.fn.resetSquare    = function() {

 		localStorage.removeItem("squareData");

 		$(".square td").text(0)
 		               .css({"background-color": "#cdcdcd", 
 							 "color": "#cdcdcd"
 		});
 		$("#currentScore").text(0);
		$("#squaret").initSquareData();
		isGameWonOrLose = false;
		isMergePossible = false;

 		$('#overl').css({"z-index": "-100"});
 		$('#msg').text("");

		saveData();
 		return this;
 	}

 	// $(window).resize(function(){
 	// 	$("#overl").sizeOverlay();
 	// });

 	return this;

}( jQuery ));
