'use strict';

// get list of elements
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// do coll things with the context 
// text
context.font = '40px Calibri';
context.fillStyle = 'blue';
context.fillText('Hello World!', 150, 100);

// line
context.beginPath();
context.moveTo(100, 150);
context.lineTo(450, 50);
context.stroke();

// figure
canvas = document.getElementById('square'); // get canvas element
context = canvas.getContext('2d'); // get 2d drawing context
context.fillStyle = '#f00'; // set fill color to red
context.fillRect(0, 0, 10, 10); // fill a square

canvas = document.getElementById('circle'); /// get other canvas element
context = canvas.getContext('2d');
context.beginPath(); // begin new beginPath
context.arc(5, 5, 5, 0, 2 * Math.PI, true); // add a circle to the beginPath
context.fillStyle = 'blue'; // set blue color
context.fill(); // fill the path