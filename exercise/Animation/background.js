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
        context.drawImage(
            this.image,
            this.image.width - Math.abs(this.coordinates.x),
            0
        );
    }


    function update() {
        this.coordinates.x -= options.speedX;

        if (Math.abs(this.coordinates.x) > this.image.width) {
            this.coordinates.x = 0;
        }
    }

    var background = {
        image: backgroundImg,
        speedX: options.speedX,
        coordinates: { x: 0, y: 0 },
        render: render,
        update: update,
    };

    return background;
}