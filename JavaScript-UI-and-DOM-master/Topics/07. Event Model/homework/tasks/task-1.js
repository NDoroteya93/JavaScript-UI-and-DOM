/* globals $ */

/* 

Create a function that takes an id or DOM element and:
  

*/

function solve() {
    var VALIDATION = {
        domElementExis: function(x) {
            if (x === null) {
                throw new Error('The Dom element no exist!')
            }
        },
        validateId: function(id) {
            if (typeof id !== 'string' || id === null || id === undefined) {
                throw new Error('Invalid id!');
            }

        }
    }

    return function(selector) {
        // create variables
        var getElement = '',
            buttonEl = Array.from(document.getElementsByClassName('button')),
            contentEl = Array.from(document.getElementsByClassName('content'));

        // VALIDATION selector 
        if (selector instanceof HTMLElement) {
            selector = selector.id;
        }
        VALIDATION.domElementExis(selector);
        VALIDATION.validateId(selector);

        getElement = document.getElementById(selector);
        // change button text
        buttonEl.forEach(x => x.innerText = 'hide');

        console.log('button ' + buttonEl);


        // Clicked Button
        buttonEl.forEach(x => x.addEventListener('click', toggleClick));

        function toggleClick(el) {
            var next = el.target;
            while (next) {

                if (next.className === 'content') {
                    break;
                }
                next = next.nextElementSibling;
            }

            if (next.style.display !== 'none') {
                next.style.display = 'none';
                el.target.innerText = 'hide';
            } else if (next.style.display === 'none') {
                next.style.display = 'block';
                el.target.innerText = 'show';
            }
        }

    };
};

var container = document.createElement('div'),
    count = 15,
    possibleTags = ['a', 'button', 'p', 'div'],
    i,
    len,
    buttonNode,
    contentNode,
    tag;

container.id = 'root';
for (i = 0; i < count; i += 1) {
    tag = possibleTags[(Math.random() * possibleTags.length) | 0];
    buttonNode = document.createElement(tag);
    buttonNode.className = 'button';
    container.appendChild(buttonNode);

    tag = possibleTags[(Math.random() * possibleTags.length) | 0];
    contentNode = document.createElement(tag);
    contentNode.className = 'content';
    container.appendChild(contentNode);
}
document.body.innerHTML = container.outerHTML;

solve('root');
var btns = document.getElementsByClassName('button');
console.log(btns.length) // length(15);
for (i = 0, len = btns.length; i < len; i += 1) {
    console.log(btns[i].innerHTML) //('hide');
}
// var getElement = document.getElementById('root');

// solve(getElement);

// module.exports = solve;