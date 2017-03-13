var svg = document.getElementById("vimage");
var width = svg.getAttribute("width");
var height = svg.getAttribute("height");

var clear = document.getElementById("clear");
var move = document.getElementById("move");
var stop = document.getElementById("stop");
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
	var circle = drawCircle(randX,randY, 32);
	svg.appendChild(circle);
    }
    
};

var drawCircle = function(x, y, r){
    var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", r);
    circle.setAttribute("fill", "purple");
    circle.xvol = 1;
    circle.yvol = 1;
    circle.addEventListener("click", change);
    return circle;
};

var createCircle = function(e){
    var circle = drawCircle(e.offsetX, e.offsetY, 32);
    svg.appendChild(circle);
};


var animateCircle = function(e){
    window.cancelAnimationFrame(rid);
    
    var animate = function() {
	//console.log(rid)
	
	var len = svg.children.length;

	for (var i = 0; i < len; i++){
	    var dot = svg.children[i];
	    var x = parseInt(dot.getAttribute("cx"));
	    var y = parseInt(dot.getAttribute("cy"));
	    var r = parseInt(dot.getAttribute("r"));
	    if (x == width / 2) {
		split(dot);
	    };

	    
	    if (x>=width - r ) { dot.xvol = -1; }
	    if (y>=height - r) { dot.yvol = -1; }
	    if (x<=r) { dot.xvol = 1; }
	    if (y<=r) { dot.yvol = 1; }
	    
	    x += parseInt(dot.xvol);
	    y += parseInt(dot.yvol);
	    
	    dot.setAttribute("cx", x); 
	    dot.setAttribute("cy", y); 
	    //console.log(x);
	}
	
	rid = window.requestAnimationFrame( animate );
    }

    animate()
};

var split = function(circle){

    var xcor = parseInt(circle.getAttribute("cx"));
    var ycor = parseInt(circle.getAttribute("cy"));
    var r = parseInt(circle.getAttribute("r"));

    var currentCircle = drawCircle(xcor + 1,ycor,r/2);

    currentCircle.setAttribute("fill",circle.getAttribute("fill"));

    var newCircle = drawCircle(xcor - 1 ,ycor,r/2);

    
    newCircle.xvol = parseInt(circle.xvol) * -1;
    newCircle.yvol = parseInt(circle.yvol) * -1;

    removeThis(circle);

    svg.appendChild(newCircle);
    svg.appendChild(currentCircle);

};

var removeThis = function(circle){
    circle.parentNode.removeChild(circle);

}

var clearAll = function(e){
    while (svg.lastChild) {
	svg.removeChild(svg.lastChild)
    }
};

var stopAll = function(){
    window.cancelAnimationFrame(rid);
};


svg.addEventListener("click", createCircle);
clear.addEventListener("click", clearAll);
move.addEventListener("click", animateCircle);
stop.addEventListener("click",stopAll);