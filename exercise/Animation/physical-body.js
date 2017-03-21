'use strict';

function createPhysicalBody(options) {

    function move() {
        // json - javascript object notation 
        // JSON.parse - copy object
        // var lastCoordinates = JSON.parse(JSON.stringify(this.coordinates));
        var self = this;
        var lastCoordinates = { x: self.coordinates.x, y: self.coordinates.y }

        self.coordinates.x += self.speed.x;
        self.coordinates.y += self.speed.y;

        return lastCoordinates;
    }

    function collideWith(otherPhysicalBody) {
        throw new Error('Not implemented');
    }

    var physicalBody = {
        coordinates: options.coordinates,
        speed: options.speed,
        height: options.height,
        width: options.width,
        move: move,
        collideWith: collideWith
    }

    return physicalBody;
}