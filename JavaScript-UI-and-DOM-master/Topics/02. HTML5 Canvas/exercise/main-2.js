var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');

// drawin lines and filling pollygons

// defining path

// c.beginPath(); // Start a new path
// c.moveTo(100, 100); // Begin a subpath at(100, 100) //  open
// c.lineTo(200, 200); // Add a line from (100, 100) to (200, 200)
// c.lineTo(100, 200); // Add a line from (100, 100) to (100, 200)
// // c.closePath();
// c.lineTo(100, 100); // end or close Path
// c.fillStyle = 'gray';
// c.fill(); // Fill a triangular area
// c.stroke(); // stroke two sides of the triangle

// Regular POlygons with moveTo(), lineTo() and closePath()

// Define  a regular polygon with n sides, centered aat (x, y) with radius r
// the vertices are equally spaced along the circumference of a circle 
// put the first vertex straight up or at the specified triangle
// rotate clockwise, unless the last argument is true

// function polygon(c, n, x, y, r, angle, counterClockwise) {
//     debugger;
//     angle = angle || 0;
//     counterClockwise = counterClockwise || false;
//     c.moveTo(x + r * Math.sin(angle), // Begin a new subpath at the first vertex 
//         y - Math.cos(angle)); // use trigonometry to compute position
//     var delta = 2 * Math.PI / n; // Angular distance between vertices
//     for (var i = 1; i < n; i++) {
//         angle += counterClockwise ? -delta : delta; // Adjust angle
//         c.lineTo(x + r * Math.sin(angle), // Add line to next vertex
//             y - r * Math.cos(angle));
//     }
//     c.closePat // Connect last vertex back to the first
// }

// c.beginPath();

// polygon(c, 3, 50, 70, 50); // triangle
// polygon(c, 4, 150, 60, 50); // square
// polygon(c, 5, 255, 55, 50); // pentaghon
// polygon(c, 6, 365, 53, 50, Math.PI / 60); // Hexagon
// polygon(c, 4, 365, 53, 20, Math.PI / 4, true); // Small square inside the Hexagon

// // Set some properties that control how to graphics will look 
// c.fillStyle = 'pink';
// c.strokeStyle = 'purple'; // outlined with purple
// c.lineWidth = 5; // 5px wide

// c.fill(); // fill the shapes
// c.stroke(); // end stroke their outlines


/// Lineaar gradient 
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {

    stroke = stroke || true;


    radius = radius || 5;

    if (typeof radius === 'number') {
        radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
        var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
        for (var side in defaultRadius) {
            radius[side] = radius[side] || defaultRadius[side];
        }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
        ctx.fill();
    }
    if (stroke) {
        ctx.stroke();
    }

}
var grd = c.createLinearGradient(0, 0, 300, 0);
grd.addColorStop(0, "red");
grd.addColorStop("0.2", "red");
grd.addColorStop("0.4", "yellow");
grd.addColorStop("0.6", "green");
grd.addColorStop("0.7", "blue");
grd.addColorStop("0.8", "magenta");
grd.addColorStop(1, "red");

c.strokeStyle = 'transparent';
c.lineWidth = 0;
c.shadowBlur = 10
c.shadowColor = 'black';
c.shadowOffsetX = 0;
c.shadowOffsetY = 0;

c.fillStyle = grd;
roundRect(c, 100, 5, 200, 200, 40, true);