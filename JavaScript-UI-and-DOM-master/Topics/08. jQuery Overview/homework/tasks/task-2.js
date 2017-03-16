/* globals $ */

/*
Create a function that takes a selector and:
* Finds all elements with class `button` or `content` within the provided element
  * Change the content of all `.button` elements with "hide"
* When a `.button` is clicked:
  * Find the topmost `.content` element, that is before another `.button` and:
    * If the `.content` is visible:
      * Hide the `.content`
      * Change the content of the `.button` to "show"
    * If the `.content` is hidden:
      * Show the `.content`
      * Change the content of the `.button` to "hide"
    * If there isn't a `.content` element **after the clicked `.button`** and **before other `.button`**, do nothing
* Throws if:
  * The provided ID is not a **jQuery object** or a `string`

*/

'use strict';

function solve() {
    return function(selector) {
        var VALIDATION = {
            validateHTMLobject: function(element) {
                if (element === null || element.length === 0) {
                    throw new Error('Invalid element;')
                }
            },
            isString: function(str) {
                if (typeof str !== 'string') {
                    throw new Error('Invalid string!');
                }
            }
        }

        // variables
        var element = $(selector),
            buttons, contents;
        // Validation
        VALIDATION.isString(selector);
        VALIDATION.validateHTMLobject(element);
        if (selector instanceof HTMLElement) {
            VALIDATION.validateHTMLobject(selector);
        }
        buttons = $('.button').text('hide');
        contents = $('.content');
        buttons.on('click', function() {
            var btn = $(this);
            var next = btn.next();
            while (next.length) {
                if (next.hasClass('button')) {
                    break;
                }
                if (next.hasClass('content')) {

                    if (next.css('display') === 'none') {
                        next.css('display', '');
                        btn.text('hide');
                    } else {
                        next.css('display', 'none');
                        btn.text('show');
                    }
                }

                next = next.next();
            }
        });



    };
};

// var result = solve();

// function createDummyNode() {
//     var tags = ['a', 'button', 'p', 'div', 'ul', 'li', 'ol', 'input', 'table', 'tr', 'br', 'hr', 'span'];
//     var node = document.createElement(tags[(Math.random * tags.length) | 0]);
//     node.innerHTML = 'Dummy Element: ' + Math.random();
//     return node;
// }
// var container = document.createElement('div'),
//     count = 150,
//     possibleTags = ['a', 'button', 'p', 'div'],
//     i,
//     buttonNode,
//     contentNode,
//     tag;

// container.id = 'root';
// var dymmyObjectChance = 70;
// for (i = 0; i < count; i += 1) {
//     if (Math.random() * 100 < dymmyObjectChance) {
//         container.appendChild(createDummyNode());
//     }
//     tag = possibleTags[(Math.random() * possibleTags.length) | 0];
//     buttonNode = document.createElement(tag);
//     buttonNode.className = 'button';
//     if (i === ((count / 2) | 0)) {
//         buttonNode.id = 'the-button';
//     }
//     container.appendChild(buttonNode);

//     possibleTags[(Math.random() * possibleTags.length) | 0];
//     contentNode = document.createElement(tag);
//     contentNode.className = 'content';

//     if (Math.random() * 100 < dymmyObjectChance) {
//         container.appendChild(createDummyNode());
//     }
//     container.appendChild(contentNode);

//     if (Math.random() * 100 < dymmyObjectChance) {
//         container.appendChild(createDummyNode());
//     }
// }
// document.body.innerHTML = container.outerHTML;

// result('#root');

// var theButton = document.getElementById('the-button');

// var theContent = theButton.nextElementSibling;
// while (theContent && theContent.className.indexOf('content') < 0) {
//     theContent = theContent.nextElementSibling;
// }

// var event = document.createEvent('MouseEvents');
// event.initMouseEvent('click', true, true);
// theButton.dispatchEvent(event);

// console.log(theButton);
// console.log(theContent);
// console.log(theButton.innerHTML) //('show');
// console.log(theContent.style.display) //('none');

// theButton.dispatchEvent(event);
// console.log(theButton.innerHTML); //('hide');
// console.log(theContent.style.display); // ('');


module.exports = solve;