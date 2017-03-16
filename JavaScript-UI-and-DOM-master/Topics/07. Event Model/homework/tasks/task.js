'use strict';
let input = ['@*@*@*xxx', '1 -1 1 -1 2 1 1 1 1 1 1'];


function solve(args) {
    const EMPTYFIELD = 0;

    // get postions 

    let getPositionOfSFD = args[0].split(''),
        getPath = args[1].split(' ').map(Number),
        collection = { souls: 0, food: 0, deadlock: 0 },
        kitty = 0,
        jumpCount = 0,
        output = '';

    for (let i = 0; i <= getPath.length; i++) {


        // check souls
        if (getPositionOfSFD[kitty] === '@') {
            collection.souls += 1;
            getPositionOfSFD[kitty] = EMPTYFIELD;
        }

        // check foods
        if (getPositionOfSFD[kitty] === '*') {
            collection.food += 1;
            getPositionOfSFD[kitty] = EMPTYFIELD;
        }

        // check deadlocks
        if (getPositionOfSFD[kitty] === 'x') {
            collection.deadlock += 1;
            getPositionOfSFD[kitty] = EMPTYFIELD;

            // even
            if (kitty % 2 == 0) {
                if (collection.souls === 0) {
                    let output = 'You are deadlocked, you greedy kitty! \n Jumps before deadlock: ' + jumpCount;
                    return output;
                } else {
                    collection.souls -= 1;
                    getPositionOfSFD[kitty] = EMPTYFIELD;
                }

                // odd
            } else {
                if (collection.food === 0) {
                    output = 'You are deadlocked, you greedy kitty! \n Jumps before deadlock: ' + jumpCount;
                    return output;
                } else {
                    collection.food -= 1;
                    getPositionOfSFD[kitty] = EMPTYFIELD;
                }
            }
        }
        jumpCount += Math.abs(getPath[i]);
        kitty += getPath[i];
        if (kitty > getPositionOfSFD.length) {
            kitty = kitty - getPositionOfSFD.length;
        } else if (kitty < 0) {
            kitty = getPositionOfSFD.length + kitty;
        }
    }
    output = 'Coder souls collected: ' + collection.souls + '\nFood collected: ' + collection.food + '\nDeadlocks: ' + collection.deadlock;
    return output
}

console.log(solve(input));