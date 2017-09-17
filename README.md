# 2048-clone

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/0b87708277c84235a97fc99e44ca9758)](https://www.codacy.com/app/SamR1/2048-clone)  

a clone of [2048](https://gabrielecirulli.github.io/2048/) (realized during the [CodingAcademy](http://www.coding-academy.fr/en/) training, as JQuery plugin)

![Snapshot](doc/win.png)  

## How to play
Clone the repository.  
Use your arrow keys to move the tiles. When two tiles with the same number touch, they merge into one. 
The game stopped when :  
- 2048 tile is reached,  
- the square is full and no more tile can merged.  

## How to use (plugin)
### Pre-requisites
* JQuery

### HTML structure
Add a div with **"squareLocation"** id where you want to append the square.
```html
<div id="squareLocation"></div>
```

This version is not responsive (minimum width: 1030px).