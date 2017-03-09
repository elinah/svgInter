
var svg = document.getElementById("vimage");
var clear = document.getElementById("clear");
var move = document.getElementById("move");
var rid; 

var change = function(e){
    if (this.getAttribute("fill") == "purple"){
	this.setAttribute("fill", "green");
	e.stopPropagation();
    }
    else {
	svg.removeChild(this); 
	e.stopPropagation();
	var randX = Math.floor(Math.random() * 500);
	var randY = Math.floor(Math.random() * 500);
	var circle = drawCircle(randX,randY);
	svg.appendChild(circle);
    }

};

var drawCircle = function(x, y){
	var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
	circle.setAttribute("cx", x);
	circle.setAttribute("cy", y);
	circle.setAttribute("r", "25");
	circle.setAttribute("fill", "purple");

	circle.addEventListener("click", change);
	return circle;
}

var createCircle = function(e){
	var circle = drawCircle(e.offsetX, e.offsetY);
	svg.appendChild(circle);
}


//var animateCircle = function 


var clear = function(e){
    while (svg.lastChild)
	svg.removeChild(svg.lastChild);
};


svg.addEventListener("click", createCircle);
clear.addEventListener("click", clear);
move.addEventListener("click", animate);
