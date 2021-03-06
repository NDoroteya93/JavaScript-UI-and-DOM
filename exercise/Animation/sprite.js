'use strict';

function createSprite(options) {

    var clearOffSet = 5;

    function render(drawCoordinates, clearCoordinates) {
        var self = this;
        self.context.clearRect(
            clearCoordinates.x,
            clearCoordinates.y,
            self.width,
            self.height
        );

        self.context.drawImage(
            self.spritesheet,
            self.frameIndex * self.width,
            0,
            self.width,
            self.height,
            drawCoordinates.x,
            drawCoordinates.y,
            self.width,
            self.height
        );

        return self;
    }

    function update() {
        var self = this;
        self.loopTicksCount += 1;

        if (self.loopTicksCount >= self.loopTicksPerFrame) {
            self.loopTicksCount = 0;
            self.frameIndex += 1;
        }

        if (self.frameIndex >= self.numberOfFrames) {
            self.frameIndex = 0;
        }

        return self;
    }
    var sprite = {
        spritesheet: options.spritesheet,
        context: options.context, // drawing context
        width: options.width, // width of a single sprite
        height: options.height, // height of a single sprite
        numberOfFrames: options.numberOfFrames,
        loopTicksPerFrame: options.loopTicksPerFrame,
        render: render,
        update: update,
        frameIndex: 0,
        loopTicksCount: 0

    };

    return sprite;
}