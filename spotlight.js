/**
 * CS435
 * Project#4
 * Hampton Brewer
 * This project was to use a spotlight that the user interacts with and places
 * around a room. The 3-D room is used to contain the lights within 5 different places. 
 * The user can also change the perspective of the room within the frame.
 */

var canvas;
var gl;

var numVertices  = 36;

var pointsArray = [];
var normalsArray = [];

var pointsArray2 = [];
var normalsArray2 = [];
var pointsArray3 = [];
var normalsArray3 = [];
var pointsArray4 = [];
var normalsArray4 = [];
var pointsArray5 = [];
var normalsArray5 = [];

var vertices = [
        vec4( -0.5, -0.5,  0.25, 1.0 ),
        vec4( -0.5,  0.0,  0.25, 1.0 ),
        vec4( 0.0,  0.0,  0.25, 1.0 ),
        vec4( 0.0, -0.5,  0.25, 1.0 ),
        vec4( -0.5, -0.5, -0.25, 1.0 ),
        vec4( -0.5,  0.0, -0.25, 1.0 ),
        vec4( 0.0,  0.0, -0.25, 1.0 ),
        vec4( 0.0, -0.5, -0.25, 1.0 )
    ];
var vertices2 = [
                vec4( -0.5, 0.0,  0.25, 1.0 ),
                vec4( -0.5,  0.5,  0.25, 1.0 ),
                vec4( 0.0,  0.5,  0.25, 1.0 ),
                vec4( 0.0, 0.0,  0.25, 1.0 ),
                vec4( -0.5, 0.0, -0.25, 1.0 ),
                vec4( -0.5,  0.5, -0.25, 1.0 ),
                vec4( 0.0,  0.5, -0.25, 1.0 ),
                vec4( 0.0, 0.0, -0.25, 1.0 )
            ];
var vertices3 = [
                 vec4( 0.0, 0.0,  0.25, 1.0 ),
                 vec4( 0.0,  0.5,  0.25, 1.0 ),
                 vec4( 0.5,  0.5,  0.25, 1.0 ),
                 vec4( 0.5, 0.0,  0.25, 1.0 ),
                 vec4( 0.0, 0.0, -0.25, 1.0 ),
                 vec4( 0.0,  0.5, -0.25, 1.0 ),
                 vec4( 0.5,  0.5, -0.25, 1.0 ),
                 vec4( 0.5, 0.0, -0.25, 1.0 )
             ];
var vertices4 = [
                 vec4( 0.5, 0.0,  0.25, 1.0 ),
                 vec4( 0.5,  0.5,  0.25, 1.0 ),
                 vec4( 1.0,  0.5,  0.25, 1.0 ),
                 vec4( 1.0, 0.0,  0.25, 1.0 ),
                 vec4( 0.5, 0.0, -0.25, 1.0 ),
                 vec4( 0.5,  0.5, -0.25, 1.0 ),
                 vec4( 1.0,  0.5, -0.25, 1.0 ),
                 vec4( 1.0, 0.0, -0.25, 1.0 )
             ];
var vertices5 = [
                 vec4( 0.5, -0.5,  0.25, 1.0 ),
                 vec4( 0.5,  0.0,  0.25, 1.0 ),
                 vec4( 1.0,  0.0,  0.25, 1.0 ),
                 vec4( 1.0, -0.5,  0.25, 1.0 ),
                 vec4( 0.5, -0.5, -0.25, 1.0 ),
                 vec4( 0.5,  0.0, -0.25, 1.0 ),
                 vec4( 1.0,  0.0, -0.25, 1.0 ),
                 vec4( 1.0, -0.5, -0.25, 1.0 )
             ];

var currentPosition = 0;

var lightOne = [1.4,1.4];
var lightTwo = [1.4,-1.4];
var lightThree = [-1.4,-1.4];
var lightFour = [-1.4,-1.4];
var lightFive = [-1.4,1.4];

var lightPosition = vec4(1.4, 1.4, 0.0, 0.0 );
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse = vec4( 0.5, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.5, 1.5, 1.0, 1.0 );

var materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0);
var materialSpecular = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialShininess = 100.0;

var ctm;
var ambientColor, diffuseColor, specularColor;
var modelView, projection;
var viewerPos;
var program;

var xAxis = 1;
var yAxis = 1;
var zAxis = 2;
var axis = 0;
var theta =[0, 0, 0];

var thetaLoc;

var flag = false;

//functions for creating the rooms shape
function quad(a, b, c, d) {

     var t1 = subtract(vertices[b], vertices[a]);
     var t2 = subtract(vertices[c], vertices[b]);
     var normal = cross(t1, t2);
     var normal = vec3(normal);


     pointsArray.push(vertices[a]); 
     normalsArray.push(normal); 
     pointsArray.push(vertices[b]); 
     normalsArray.push(normal); 
     pointsArray.push(vertices[c]); 
     normalsArray.push(normal);   
     pointsArray.push(vertices[a]);  
     normalsArray.push(normal); 
     pointsArray.push(vertices[c]); 
     normalsArray.push(normal); 
     pointsArray.push(vertices[d]); 
     normalsArray.push(normal);    
}
function quad2(a, b, c, d) {

    var t1 = subtract(vertices2[b], vertices2[a]);
    var t2 = subtract(vertices2[c], vertices2[b]);
    var normal = cross(t1, t2);
    var normal = vec3(normal);


    pointsArray2.push(vertices2[a]); 
    normalsArray2.push(normal); 
    pointsArray2.push(vertices2[b]); 
    normalsArray2.push(normal); 
    pointsArray2.push(vertices2[c]); 
    normalsArray2.push(normal);   
    pointsArray2.push(vertices2[a]);  
    normalsArray2.push(normal); 
    pointsArray2.push(vertices2[c]); 
    normalsArray2.push(normal); 
    pointsArray2.push(vertices2[d]); 
    normalsArray2.push(normal);    
}
function quad3(a, b, c, d) {

    var t1 = subtract(vertices3[b], vertices3[a]);
    var t2 = subtract(vertices3[c], vertices3[b]);
    var normal = cross(t1, t2);
    var normal = vec3(normal);


    pointsArray3.push(vertices3[a]); 
    normalsArray3.push(normal); 
    pointsArray3.push(vertices3[b]); 
    normalsArray3.push(normal); 
    pointsArray3.push(vertices3[c]); 
    normalsArray3.push(normal);   
    pointsArray3.push(vertices3[a]);  
    normalsArray3.push(normal); 
    pointsArray3.push(vertices3[c]); 
    normalsArray3.push(normal); 
    pointsArray3.push(vertices3[d]); 
    normalsArray3.push(normal);    
}
function quad4(a, b, c, d) {

    var t1 = subtract(vertices4[b], vertices4[a]);
    var t2 = subtract(vertices4[c], vertices4[b]);
    var normal = cross(t1, t2);
    var normal = vec3(normal);


    pointsArray4.push(vertices4[a]); 
    normalsArray4.push(normal); 
    pointsArray4.push(vertices4[b]); 
    normalsArray4.push(normal); 
    pointsArray4.push(vertices4[c]); 
    normalsArray4.push(normal);   
    pointsArray4.push(vertices4[a]);  
    normalsArray4.push(normal); 
    pointsArray4.push(vertices4[c]); 
    normalsArray4.push(normal); 
    pointsArray4.push(vertices4[d]); 
    normalsArray4.push(normal);    
}
function quad5(a, b, c, d) {

    var t1 = subtract(vertices5[b], vertices5[a]);
    var t2 = subtract(vertices5[c], vertices5[b]);
    var normal = cross(t1, t2);
    var normal = vec3(normal);


    pointsArray5.push(vertices5[a]); 
    normalsArray5.push(normal); 
    pointsArray5.push(vertices5[b]); 
    normalsArray5.push(normal); 
    pointsArray5.push(vertices5[c]); 
    normalsArray5.push(normal);   
    pointsArray5.push(vertices5[a]);  
    normalsArray5.push(normal); 
    pointsArray5.push(vertices5[c]); 
    normalsArray5.push(normal); 
    pointsArray5.push(vertices5[d]); 
    normalsArray5.push(normal);    
}

function colorCube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
    
    quad2( 1, 0, 3, 2 );
    quad2( 2, 3, 7, 6 );
    quad2( 3, 0, 4, 7 );
    quad2( 6, 5, 1, 2 );
    quad2( 4, 5, 6, 7 );
    quad2( 5, 4, 0, 1 );
    
    quad3( 1, 0, 3, 2 );
    quad3( 2, 3, 7, 6 );
    quad3( 3, 0, 4, 7 );
    quad3( 6, 5, 1, 2 );
    quad3( 4, 5, 6, 7 );
    quad3( 5, 4, 0, 1 );
    
    quad4( 1, 0, 3, 2 );
    quad4( 2, 3, 7, 6 );
    quad4( 3, 0, 4, 7 );
    quad4( 6, 5, 1, 2 );
    quad4( 4, 5, 6, 7 );
    quad4( 5, 4, 0, 1 );
    
    quad5( 1, 0, 3, 2 );
    quad5( 2, 3, 7, 6 );
    quad5( 3, 0, 4, 7 );
    quad5( 6, 5, 1, 2 );
    quad5( 4, 5, 6, 7 );
    quad5( 5, 4, 0, 1 );
}

//used for transitions of arrow keys and enter presses
window.onkeyup = function(e) {
	   var key = e.keyCode ? e.keyCode : e.which;
	   if (key == 13) {
		   enterKeyPressed();
	   }
	   //change direction of the light
	   if(key == 38){ //up arrow
		   
	   }
	   if(key == 40){ //down arrow
				   
	   }
	   if(key == 37){ //left arrow
			   
	   }
	   if(key == 39){ //right arrow
			   
	   }
	}

//Changes the perspective the viewer has of the room
function enterKeyPressed(){
	if(currentPosition >= 5){currentPosition = -1;}
	currentPosition++;
	switch(currentPosition){
	case 0: projection = ortho(-1, 1, -1, 1, -100, 100); break;
	case 1: projection = ortho(-1.5, .5, -1.25, .75, -100, 100); break;
	case 2: projection = ortho(-1.5, .5, -.75, 1.25, -100, 100); break; 
	case 3: projection = ortho(-1, 1, -.75, 1.25, -100, 100); break; 
	case 4: projection = ortho(-.5, 1.5, -.75, 1.25, -100, 100); break;
	case 5: projection = ortho(-.5, 1.5, -1.25, .75, -100, 100); break;
	}
}

//Called to change the current rendering of the light for specific point location
function lightFunction(){
	var x = document.getElementById("lightPos").value;
	//alert(x);
	if(x == 1){
		lightPosition = vec4(lightOne[0], lightOne[1], 0.0, 0.0 );
	}if(x == 2){
		lightPosition = vec4(lightTwo[0], lightTwo[1], 0.0, 0.0 );
	}if(x == 3){
		lightPosition = vec4(lightThree[0], lightThree[1], 0.0, 0.0 ); 
	}if(x == 4){
		lightPosition = vec4(lightFour[0], lightFour[1], 0.0, 0.0 ); 
	}if(x == 5){
		lightPosition = vec4(lightFive[0], lightFive[1], 0.0, 0.0 );
	}
	gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),flatten(lightPosition) );
}

//when the increase button is hit this increases the light, x is current point
function lightInc(x){
	if(x == 1 && lightOne[0] > .9){
		lightOne[0] = lightOne[0] - .1;
		lightOne[1] = lightOne[1] - .1;
	}
	if(x == 2 && lightTwo[0] > .9){
		lightTwo[0] = lightTwo[0] - .1;
		lightTwo[1] = lightTwo[1] + .1;
	}
	if(x == 3 && lightThree[0] < -.9){
		lightThree[0] = lightThree[0] + .1;
		lightThree[1] = lightThree[1] + .1;
	}
	if(x == 4 && lightFour[0] < -.9){
		lightFour[0] = lightFour[0] + .1;
		lightFour[1] = lightFour[1] + .1;
	}
	if(x == 5 && lightFive[1] > .9){
		lightFive[0] = lightFive[0] + .1;
		lightFive[1] = lightFive[1] - .1;
	}
	lightFunction();
}

//when decrease button is hit, this decreases the light x is the current point
function lightDec(x){
	if(x == 1 && lightOne[0] < 1.9){
		lightOne[0] = lightOne[0] + .1;
		lightOne[1] = lightOne[1] + .1;
	}
	if(x == 2 && lightTwo[0] < 1.9){
		lightTwo[0] = lightTwo[0] + .1;
		lightTwo[1] = lightTwo[1] - .1;
	}
	if(x == 3 && lightThree[0] > -1.9){
		lightThree[0] = lightThree[0] - .1;
		lightThree[1] = lightThree[1] - .1;
	}
	if(x == 4 && lightFour[0] > -1.9){
		lightFour[0] = lightFour[0] - .1;
		lightFour[1] = lightFour[1] - .1;
	}
	if(x == 5 && lightFive[1] < 1.9){
		lightFive[0] = lightFive[0] - .1;
		lightFive[1] = lightFive[1] + .1;
	}
	lightFunction();
}

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    colorCube();

    var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );
    
    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    thetaLoc = gl.getUniformLocation(program, "theta"); 
    
    viewerPos = vec3(0.0, 0.0, -20.0 );

    projection = ortho(-1, 1, -1, 1, -100, 100);
    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);
    
    //calls functions for button increase and decrease
    document.getElementById("ButtonInc").onclick = function(){
    	var x = document.getElementById("lightPos").value;
    	lightInc(x);
    };
    document.getElementById("ButtonDec").onclick = function(){
    	var x = document.getElementById("lightPos").value;
    	lightDec(x);
    };
    
    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
       flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
       flatten(diffuseProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"), 
       flatten(specularProduct) );	
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"), 
       flatten(lightPosition) );
       
    gl.uniform1f(gl.getUniformLocation(program, 
       "shininess"),materialShininess);
    
    gl.uniformMatrix4fv( gl.getUniformLocation(program, "projectionMatrix"),
       false, flatten(projection));
    
    render();
}

var render = function(){
            
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            
    if(flag) theta[axis] += 2.0;
            
    modelView = mat4();
    modelView = mult(modelView, rotate(theta[xAxis], [1, 0, 0] ));
    modelView = mult(modelView, rotate(theta[yAxis], [0, 1, 0] ));
    modelView = mult(modelView, rotate(theta[zAxis], [0, 0, 1] ));
    
    gl.uniformMatrix4fv( gl.getUniformLocation(program, "projectionMatrix"),
    	       false, flatten(projection));
    
    gl.uniformMatrix4fv( gl.getUniformLocation(program,
            "modelViewMatrix"), false, flatten(modelView) );
    
    //Draws and displays all of the room
    
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW );
    gl.drawArrays( gl.TRIANGLES, 0, numVertices );
    
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray2), gl.STATIC_DRAW );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray2), gl.STATIC_DRAW );
    gl.drawArrays( gl.TRIANGLES, 0, numVertices );
    
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray3), gl.STATIC_DRAW );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray3), gl.STATIC_DRAW );
    gl.drawArrays( gl.TRIANGLES, 0, numVertices );
    
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray4), gl.STATIC_DRAW );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray4), gl.STATIC_DRAW );
    gl.drawArrays( gl.TRIANGLES, 0, numVertices );
    
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray5), gl.STATIC_DRAW );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(pointsArray5), gl.STATIC_DRAW );
    gl.drawArrays( gl.TRIANGLES, 0, numVertices );
    requestAnimFrame(render);
}
