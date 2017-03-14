'use strict';

let d = 4;

function solve(d) {
    let N = 0;
    while (d !== 0) {
        N++;
        let digits = N.toString().length;
        d -= temp;
    }
    return N;
}

console.log(solve(d));