'use strict';
window.addEventListener('load', function() {
    var WIDTH = 768,
        HEIGHT = WIDTH / 2;
    var playerCanavas = document.getElementById('player-canvas'),
        playerContext = playerCanavas.getContext('2d'),
        playerImg = document.getElementById('pikachu-sprite');

    playerCanavas.width = WIDTH;
    playerCanavas.height = HEIGHT;

    var frameIndex = 0,
        framesCount = 4;

    var loopTicksPerFrame = 3,
        loopTicksCount = 0;

    var pickachuX = 0,
        pickachuY = 0,
        lastX = pickachuX,
        lastY = pickachuY,
        speedX = 5;


    var pickachuSprite = createSprite({
        spritesheet: playerImg,
        width: playerImg.width / 4,
        height: playerImg.height,
        context: playerContext,
        numberOfFrames: 4,
        loopTicksPerFrame: 5

    });

    var pokeballImg = document.getElementById('pokeball-sprite');
    var pockeballSprite = createSprite({
        spritesheet: pokeballImg,
        width: pokeballImg.width / 18,
        height: pokeballImg.height,
        context: playerContext,
        numberOfFrames: 18,
        loopTicksPerFrame: 5
    });

    var pickachuBody = createPhysicalBody({
        coordinates: { x: 0, y: 0 },
        speed: { x: 0, y: 0 },
        height: pickachuSprite.height,
        width: pickachuSprite.width
    });

    var speed = 2;
    window.addEventListener('keydown', function(event) {
        console.log(event.which);

        if (event.keyCode < 37 || 40 < event.keyCode) {
            return;
        }

        switch (event.keyCode) {
            case 37:
                pickachuBody.speed.x = -speed;
                break
            case 38:

                pickachuBody.speed.y = -speed;
                break;
            case 39:
                pickachuBody.speed.x = speed;
                break;
            case 40:
                pickachuBody.speed.y = speed;
                break;
            default:
                break;
        }
    });

    function apllyGravity(physicalBody, gravity) {
        if (physicalBody.coordinates.y === (HEIGHT - physicalBody.height)) {
            return;
        }
        if (physicalBody.coordinates.y > (HEIGHT - physicalBody.height)) {
            physicalBody.coordinates.y = HEIGHT - physicalBody.height;
            physicalBody.speed.y = 0;
            return;
        }
        physicalBody.speed.y += gravity;
    }

    function gameLoop() {

        apllyGravity(pickachuBody, 1);

        var lastPickachuCoordinates = pickachuBody.move();

        pickachuSprite
            .render(pickachuBody.coordinates, lastPickachuCoordinates)
            .update();

        pockeballSprite
            .render({ x: 50, y: 60 }, { x: 50, y: 60 })
            .update();
        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
});