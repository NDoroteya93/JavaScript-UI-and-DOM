'use strict';
window.addEventListener('load', function() {
    var WIDTH = 512,
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


    var pickachuBody = createPhysicalBody({
        defaultAcceleration: { x: 5, y: 20 },
        coordinates: { x: 10, y: HEIGHT - pickachuSprite.height },
        speed: { x: 0, y: 0 },
        height: pickachuSprite.height,
        width: pickachuSprite.width
    });

    window.addEventListener('keydown', function(event) {
        var speed = 3;

        if (event.keyCode < 37 || 40 < event.keyCode) {
            return;
        }

        switch (event.keyCode) {
            case 37:
                if (pickachuBody.speed.x < 0) {
                    return;
                }
                pickachuBody.accelerate('x', -1);
                break
            case 38:

                // jumping
                if (pickachuBody.coordinates.y < (HEIGHT - pickachuBody.height)) {
                    return;
                }
                pickachuBody.accelerate('y', -1);
                break;
            case 39:
                pickachuBody.accelerate('x', 1);
                break;
            case 40:
                pickachuBody.speed.y = speed;
                break;
            default:
                break;
        }
    });

    window.addEventListener('keyup', function(event) {

        if ((event.keyCode !== 37) && (event.keyCode !== 39)) {
            return;
        }
        pickachuBody.speed.x = 0;
    })

    function removeAccelerationHorizontal(physicalBody, gravity) {
        if (physicalBody.speed.x > 0) {
            physicalBody.speed.x -= gravity;

            if (physicalBody.speed.x < 0) {
                physicalBody.speed.x = 0;
            }
        }
    }

    function apllyGravityVertical(physicalBody, gravity) {
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

    var pokeballCanvas = document.getElementById('pokeball-canvas'),
        pokeballContext = pokeballCanvas.getContext('2d'),
        pokeballImg = document.getElementById('pokeball-sprite');

    pokeballCanvas.width = WIDTH;
    pokeballCanvas.height = HEIGHT;

    function createPokeball(offsetX) {
        var pockeballSprite = createSprite({
            spritesheet: pokeballImg,
            width: pokeballImg.width / 18,
            height: pokeballImg.height,
            context: pokeballContext,
            numberOfFrames: 18,
            loopTicksPerFrame: 5
        });

        var pockeballBody = createPhysicalBody({
            defaultAcceleration: { x: 5, y: 0 },
            coordinates: { x: offsetX, y: HEIGHT - pockeballSprite.height },
            speed: { x: -5, y: 0 },
            width: pockeballSprite.width,
            height: pockeballSprite.height
        });

        return {
            sprite: pockeballSprite,
            body: pockeballBody
        }
    };

    var pokeballs = [];

    function spawnPokeball() {

        var spawnChance = 0.02,
            spawnOffsetX = 100;
        // spawn pokeballs
        if (Math.random() < spawnChance) {
            if (pokeballs.length) {
                var lastPokeballX = pokeballs[pokeballs.length - 1];
                var starting = Math.max(lastPokeballX.body.coordinates.x + lastPokeballX.body.width + spawnOffsetX)
                var newPokeball = createPokeball(starting);
                pokeballs.push(newPokeball);
            } else {

                pokeballs.push(createPokeball(WIDTH));
            }
        }
    }

    var background = createBackground({
        width: WIDTH,
        height: HEIGHT
    });

    function gameLoop() {
        var lastPokeballCoordinates, lastPickachuCoordinates, i;

        apllyGravityVertical(pickachuBody, 2);

        lastPickachuCoordinates = pickachuBody.move();

        pickachuSprite
            .render(pickachuBody.coordinates, lastPickachuCoordinates)
            .update();

        // update, draw, move all pokeballs
        for (i = 0; i < pokeballs.length; i++) {

            var pokeball = pokeballs[i];


            // if out of gamefield, remove pokeball
            if (pokeball.body.coordinates.x < -pokeball.body.width) {
                pokeballs.splice(i, 1);
                i -= 1;
                continue;
            }
            if (pickachuBody.collideWith(pokeball.body)) {
                // endgame logic
                playerContext.drawImage(
                    document.getElementById('dead-player'),
                    0,
                    0
                )
            }
            lastPokeballCoordinates = pokeball.body.move();

            pokeball.sprite
                .render(pokeball.body.coordinates, lastPokeballCoordinates)
                .update();
        }

        spawnPokeball();

        background.render();
        background.update();

        window.requestAnimationFrame(gameLoop);
    }

    gameLoop();
});