'use strict';

var playerCanavas = document.getElementById('player-canvas'),
    playerContext = playerCanavas.getContext('2d'),
    playerImg = document.getElementById('pikachu-sprite');


var frameIndex = 0,
    framesCount = 4;

var loopTicksPerFrame = 3,
    loopTicksCount = 0;

var pickachuX = 0,
    pickachuY = 0,
    lastX = pickachuX,
    lastY = pickachuY,
    speedX = 10;

function gameLoop() {
    // do stuff


    // clear preveious frame
    playerContext.clearRect(
        lastX,
        lastY,
        playerImg.width / 4,
        playerImg.height
    );

    // drawImage(image, dx, dy);
    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight )
    playerContext.drawImage(
        playerImg, // img to draw
        frameIndex * playerImg.width / 4, // source x
        0, // source y
        playerImg.width / 4, // source width
        playerImg.height, // source height
        pickachuX, // destination x
        pickachuY, // destination y
        playerImg.width / 4, // destination width
        playerImg.height // destination height
    );

    lastX = pickachuX;
    lastY = pickachuY;

    pickachuX += speedX;

    if (pickachuX >= playerCanavas.x) {
        speedX = -speedX;
    }

    ++loopTicksCount;

    if (loopTicksCount >= loopTicksPerFrame) {
        // draw next frame
        loopTicksCount = 0;
        ++frameIndex;

        if (frameIndex >= framesCount) {
            frameIndex = 0;
        }
    }


    window.requestAnimationFrame(gameLoop);
}

gameLoop();