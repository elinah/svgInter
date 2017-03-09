var v = document.getElementById("vimage");

var change = function(e){
	console.log("circle");
	this.setAttribute("fill", "green");
	e.stopPropagation();
}

var createCircle = function(x, y){
	var circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
	circle.setAttribute("cx", x);
	circle.setAttribute("cy", y);
	circle.setAttribute("r", "25");
	circle.setAttribute("fill", "purple");

	circle.addEventListener("click", change);
	return circle;
}

var drawCircle = function(e){
	var circle = createCircle(e.offsetX, e.offsetY);
	v.appendChild(circle);
}

v.addEventListener("click", drawCircle);

var clear = document.getElementById("clear");
clear.addEventListener("click", function(e){
	while (v.lastChild)
		v.removeChild(v.lastChild);
});
