/* globals $ */

/*

Create a function that takes a selector and COUNT, then generates inside a UL with COUNT LIs:
  * The UL must have a class `items-list`
  * Each of the LIs must:
    * have a class `list-item`
    * content "List item #INDEX"
      * The indices are zero-based
  * If the provided selector does not selects anything, do nothing
  * Throws if
    * COUNT is a `Number`, but is less than 1
    * COUNT is **missing**, or **not convertible** to `Number`
      * _Example:_
        * Valid COUNT values:
          * 1, 2, 3, '1', '4', '1123'
        * Invalid COUNT values:
          * '123px' 'John', {}, []
*/
'use strict';

function solve() {
    return function(selector, count) {
        var VALIDATION = {
            validCount: function(count) {
                if ((typeof count !== 'number' && typeof count !== "string") || isNaN(count)) {

                    throw new Error('Is Not Valid Count!');
                }

                if (+count < 1) {
                    throw new Error('Is Not Valid Count!');
                }
            },
            validateSelector: function(str) {
                if (typeof str !== 'string' || str === null || str === undefined) {
                    throw new Error('Invalid selector');
                }
            }
        };

        // validate
        VALIDATION.validCount(count);
        VALIDATION.validateSelector(selector);


        var element = $(selector);
        if (element.length) {
            // create ul
            $('<ul class="items-list"></ul>').appendTo(selector);
            var len = Number(count);
            for (var i = 0; i < len; i++) {
                $('.items-list').append('<li class="list-item">List item #' + i + '</li>');
            }

        }
    };
};


module.exports = solve;