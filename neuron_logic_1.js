var svgW = 600,
	svgH = 300,
// 	somaX = 30,
// 	somaY = 50,
// 	somaR = 50,
// 	axonX = 130,
// 	axonY = 85,
// 	axonW = 200,
// 	axonH = 30,
	keyW = 120,
// 	keyH = 82,
	keyH = 107,
	ionR = 3,
	membraneT = 30,
	initV = 0
	initT = 310,
	initConOut = 0.4,
	initConIn = 3,
// 	conOutMultiplier = 100,
// 	conInMultiplier = 125,
	conMultiplier = 50,
	initNumOut = initConOut*conMultiplier,
	initNumIn = initConIn*conMultiplier,
	numberPassedIn = 0,
	currentV = initV,
// 	constantR = 8.314,
// 	constantz = 1,
// 	constantF = 96485,
	constantCalculated = 5,
	randSpeed = 15,
	ionGateSpacing = 80
	ionGateW = 2; // also update mod 0, 1, 2, 3 and other stuff(not implemented yet)

// Prepare data for x,y locations and speeds
var particleState = [];
for (var i = 0; i < initNumOut; i++) {
	particleState.push([Math.random()*svgW, Math.random()*(svgH/2-membraneT/2), (Math.random()-0.5)*randSpeed, (Math.random()-0.5)*randSpeed]);
}
for (var i = 0; i < initNumIn; i++) {
	particleState.push([Math.random()*svgW, Math.random()*(svgH/2-membraneT/2)+svgH/2+membraneT/2, (Math.random()-0.5)*randSpeed, (Math.random()-0.5)*randSpeed]);
}

var svg = d3.select("svg")
	.attr("width", svgW)
	.attr("height", svgH)
// 	.attr("fill", "none")
// 	.call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom));

var neuronBox = svg.append("rect")
	.attr("width", svgW)
	.attr("height", svgH)
	.attr("fill", "none")
	.attr("stroke", "black")
	.attr("stroke-width", "4");

for(var i = 0; i < svgW/ionGateSpacing; i++) {
	svg.append("rect")
		.attr("transform", "translate(" + (ionGateSpacing*i+4) + ", " + (svgH/2 - membraneT/2) + ")")
		.attr("width", ionGateSpacing-5)
		.attr("height", membraneT)
		.attr("fill", "none")
		.attr("stroke", "green")
		.attr("stroke-width", "2");
}

// var key = svg.append("rect")
// 	.attr("width", 100)
// 	.attr("height", 50)
// 	.attr("fill", "none")
// 	.attr("stroke", "black")
// 	.attr("stroke-width", "4")
// 	.append(
	
var neuronKey = d3.select("#divForKey").append("svg")
	.attr("width", keyW)
	.attr("height", keyH)
   .append("g")
   
neuronKey.append("rect")
	.attr("width", keyW-2)
	.attr("height", keyH-2)
	.attr("fill", "lightgray")
	.attr("stroke", "black")
	.attr("stroke-width", "4");
	
neuronKey.append("text")
	.attr("transform", "translate(10, 20)")
	.text("[ion]in = ");
neuronKey.append("text")
	.attr("transform", "translate(10, 45)")
	.text("[ion]out = ");
neuronKey.append("text")
	.attr("transform", "translate(10, 70)")
	.text("Voltage = ");
neuronKey.append("text")
	.attr("transform", "translate(10, 95)")
	.text("numIn = ");
	
var keyTextIn = neuronKey.append("text")
	.attr("transform", "translate(82, 20)")
	.text(initConIn);
var keyTextOut = neuronKey.append("text")
	.attr("transform", "translate(82, 45)")
	.text(initConOut);
var keyTextV = neuronKey.append("text")
	.attr("transform", "translate(82, 70)")
	.text(currentV);
var keyTextNum = neuronKey.append("text")
	.attr("transform", "translate(82, 95)")
	.text(numberPassedIn);


   

// var neuronKey = d3.select("body").append("div")
// 	.attr("position", "relative")
// 	.attr("top", "-500px")
// 	.attr("left", "700px")
// 	.attr("width", keyW)
// 	.attr("height", keyH)
//    .append("svg")
// 	.attr("width", keyW)
// 	.attr("height", keyH)
//    .append("g");
// var neuronKey = d3.select("#divForKey").append("svg")
// 	.attr("width", keyW)
// 	.attr("height", keyH)
//    .append("g");
// 
// var keyRect = neuronKey.append("rect")
// 	.attr("width", keyW)
// 	.attr("height", keyH)
// 	.attr("fill", "none")
// 	.attr("stroke", "black")
// 	.attr("stroke-width", "4");
// 
// var keyText1 = neuronKey.append("text")
// 	.attr("transform", "translate(10, 20)")
// 	.text("Membrane");
// 
// var keyText2 = neuronKey.append("text")
// 	.attr("transform", "translate(10, 40)")
// 	.text("Na+ ions");
// 
// var keyDot2 = neuronKey.append("ellipse")
// 	.attr("cx", "100")
// 	.attr("cy", "35")
// 	.attr("rx", "6")
// 	.attr("ry", "6")
// 	.attr("stroke", "black")
// 	.attr("fill", "yellow");
// 
// var keyText3 = neuronKey.append("text")
// 	.attr("transform", "translate(10, 60)")
// 	.attr("stroke", "lilac")
// 	.text("K+ ions");
// 
// var keyDot3 = neuronKey.append("ellipse")
// 	.attr("cx", "90")
// 	.attr("cy", "55")
// 	.attr("rx", "6")
// 	.attr("ry", "6")
// 	.attr("stroke", "black")
// 	.attr("fill", "#C8A2C8");
	
var ionG1 = d3.select("svg").append("g").selectAll("circle")
	.data(particleState)
	.enter().append("circle")
	.attr("stroke", "black")
	.attr("fill", "gray")
	.attr("r", ionR)
	.attr("cx", function(d) {
		return d[0];
		})
	.attr("cy", function(d) {
		return d[1];
		});

// function zoom() {
// 	console.log("zooming");
// 	svg.select("g")
// 		.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale*0.45 + ")");
// }

function move() {
// 	console.log('moving');
	for(var i = 0; i < particleState.length; i++) {
		var pState = particleState[i];
		
		// move in the x-direction or bounce off walls
		// change this so it doesn't bounce
		if(pState[0]>0-ionR && pState[0]<svgW+ionR) {
			pState[0] = pState[0]+pState[2];
		} else {
			pState[0] = pState[0]-pState[2];
			pState[2] = -pState[2];
		}
		
		// deal with y-speed
		// first, test if the ion should shoot through an ion channel
		if((Math.floor(pState[0])%ionGateSpacing == 0 || Math.floor(pState[0])%ionGateSpacing == 1)
			 && pState[1]>=svgH/2 - membraneT/2-5 && pState[1]<=svgH/2 + membraneT/2 +5){
			//pState[1] = (membraneT/2+7)*pState[3]/Math.abs(pState[3]) + svgH/2;
			if(pState[3]<0){
				pState[1] = svgH/2 - (membraneT/2+7);
				numberPassedIn -= 1;
			} else {
				pState[1] = svgH/2 + (membraneT/2+7);
				numberPassedIn += 1;
			}
		// next, test if the ion should bounce off the wall of the membrane
		} else if(pState[1]+ionR>=svgH/2 - membraneT/2 && pState[1]-ionR<=svgH/2 + membraneT/2){
			if(pState[3]<0){
				pState[1] = svgH/2 + (membraneT/2+1) + ionR;
			} else {
				pState[1] = svgH/2 - (membraneT/2+1) - ionR;
			}
			pState[3] *= -1;
		// next, check if the ball stays in the area.
		} else if(pState[1]>0-ionR && pState[1]<svgH/2 - membraneT/2 || pState[1]>svgH/2 + membraneT/2 && pState[1]<svgH+ionR) {
// 			if(i == 0){
// 				console.log(pState[0]+ ', ' +pState[1]);
// 				console.log(pState[3]);
// 				console.log(currentV);
// 				console.log(currentV/ Math.pow(pState[1]-svgH/2, 2));
// 				}
			pState[3] += currentV / Math.pow(pState[1]-svgH/2, 2); // *********** change this.  also, don't bounce off walls.  have things come in at the correct temperature.
// 			pState[3] += currentV / ((pState[1]-svgH/2)^2) // *********** change this.  also, don't bounce off walls.  have things come in at the correct temperature.
			pState[1] = pState[1]+pState[3];
		// next, make throw in a new ion if this one went out of bounds
		} else {
			pState[1] = pState[1]-pState[3];
// 			pState[3] = -pState[3];
			pState[0] = Math.random()*svgW;
			pState[3] = -pState[3]/Math.abs(pState[3])*Math.random()*randSpeed/2;
		}
		
		// V = Q/C
		// V = qe/C
		// \delta V = \delta q * e/C
		currentV = -constantCalculated*initT*Math.log(initConOut/initConIn*(initNumIn+numberPassedIn)/(initNumOut-numberPassedIn)) + initV;
		//console.log(currentV);
		particleState[i] = pState;
	}
	var circles = ionG1
		.data(particleState);
	
	var enter = circles.enter().append("circle")
		.attr("stroke", "black")
		.attr("r", ionR)
		.attr("cx", function(d) {
			return d[0];
			})
		.attr("cy", function(d) {
			return d[1];
			});

	circles.transition()
		.duration(300)
		.ease("linear")
		.attr("cx", function(d) {
			return d[0];
			})
		.attr("cy", function(d) {
			return d[1];
			});
			
// 	circles.attr("cx", function(d) {
// 			return d[0];
// 			})
// 		.attr("cy", function(d) {
// 			return d[1];
// 			});


	circles.exit().remove();
	
	keyTextIn.text((initNumIn+numberPassedIn)/conMultiplier);
	keyTextOut.text((initNumOut-numberPassedIn)/conMultiplier);
	keyTextV.text(currentV*10);
	keyTextNum.text(numberPassedIn);
	
}

console.log("asdf");

// var svg = d3.select("body").append("svg:svg")
//     .attr("width", svgW)
//     .attr("height", svgH)
//   .append("svg:g")
//     .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")scale(.6)");
// 
// var soma = d3.select("svg").append("g")