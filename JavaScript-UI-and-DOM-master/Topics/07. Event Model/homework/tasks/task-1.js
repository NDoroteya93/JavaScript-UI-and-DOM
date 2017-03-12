/* globals $ */

/* 

Create a function that takes an id or DOM element and:
  

*/


function solve() {

    return function(selector) {
        // Validations
        var VALIDATION = {
            domElementExis: function(x) {
                if (x === null) {
                    throw new Error('The Dom element no exist!')
                }
            },
            validateId: function(id) {
                if (typeof id !== 'string') {
                    throw new Error('Invalid id!');
                }

            }
        }

        // VARIABLES
        var idSelector = selector,
            domElement,
            allButtonElements;

        // Chek validations
        VALIDATION.domElementExis(selector);
        VALIDATION.validateId(selector);

        if (selector instanceof HTMLElement) {
            idSelector = selector.id;
        }

        domElement = document.getElementById(idSelector);

        VALIDATION.domElementExis(domElement);

        allButtonElements = document.querySelectorAll('.button');

        for (var i = allButtonElements.length - 1; i >= 0; i -= 1) {
            allButtonElements[i].innerHTML = 'hide';
        }

        var root = document.getElementById('root');
        root.addEventListener('click', toggleClick, false);

        // toggle click
        function toggleClick(ev) {
            if (ev.target.className === 'button') {
                var target = ev.target;
                var next = target;

                while (next) {
                    if (next.className === 'content') {
                        break;
                    }
                    next = next.nextElementSibling;
                }

                if (next.style.display === '') {
                    target.innerHTML = 'show';
                    next.style.display = 'none';
                } else if (next.style.display === 'none') {
                    target.innerHTML = 'hide';
                    next.style.display = '';
                }
            }
        }
    };
}
module.exports = solve;