# 2048 plugin - README

JQuery plugin for clone of the famous game [2048](http://gabrielecirulli.github.io/2048/) by Gabriele Cerulli.

## How to play
Use your arrow keys to move the tiles. When two tiles with the same number touch, they merge into one! 
The game stopped when :
- 2048 tile is reached,
- the square is full and no more tile can merged

## How to use
### Pre-requisites
* JQuery

### HTML structure
Add a div with an id and the following lines in a javascript script:

```javascript
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
```

This version is not responsive (minimum width: 1030px).

