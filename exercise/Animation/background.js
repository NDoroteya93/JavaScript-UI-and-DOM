'use strict';

function createBackground(options) {
    var backgroundCanvas = document.getElementById('background-canvas'),
        context = backgroundCanvas.getContext('2d'),
        backgroundImg = document.getElementById('background');

    backgroundCanvas.width = options.width;
    backgroundCanvas.height = options.height;



    function render() {
        context.drawImage(
            this.image,
            this.coordinates.x,
            0
        );
    }

    function update() {
        this.coordinates.x -= 5;

        if (this.coordinates.x < -this.image.width + backgroundCanvas.width) {
            this.coordinates.x = options.width;
        }
    }

    var background = {
        image: backgroundImg,
        coordinates: { x: 0, y: 0 },
        render: render,
        update: update
    };

    return background;
}