/* globals module, document, HTMLElement, console */
'use strict';

function solve() {
    return function(selector, isCaseSensitive) {

        // validation
        var VALIDATION = {
                isString: function(str) {
                    if (typeof str !== 'string') {
                        throw new Error('Invalid selector!')
                    }
                },
                elementIsExist: function(el) {
                    if (el === null || el.length === 0) {
                        throw new Error('Invalid element');
                    }
                },
                validateCaseSensitive: function(x) {
                    if (typeof(x) !== "boolean") {
                        throw new Error('Ivalid caseSenstive!')
                    }
                }
            }
            // parameters
        var element, addElement, addButton, listItem, item, removeElement, searchElement, input, inputAddTxt, resultControl, allItems, df;


        if (isCaseSensitive === undefined) {
            isCaseSensitive = false;
        }

        // validation
        VALIDATION.isString(selector);
        VALIDATION.validateCaseSensitive(isCaseSensitive);

        element = document.querySelector(selector);
        df = document.createDocumentFragment();

        VALIDATION.elementIsExist(element);

        ////////////////////// Adding Elements /////////////////////////////////
        // content
        addElement = document.createElement('div');
        addElement.className = 'add-controls';
        addElement.innerHTML = 'Enter text';
        df.appendChild(addElement);
        // input
        inputAddTxt = document.createElement('input');
        df.appendChild(inputAddTxt);

        // button to add
        addButton = document.createElement('button');
        addButton.className = 'button';
        addButton.innerHTML = 'Add';
        df.appendChild(addButton);

        //create list
        listItem = document.createElement('ul');
        listItem.className = 'items-list';

        // item
        item = document.createElement('li');
        item.className = 'list-item';

        // add item on click
        addButton.addEventListener('click', onClick, false);

        function onClick() {
            var cloneItem = item.cloneNode(true);
            var cloneButton = addButton.cloneNode(true);
            cloneItem.innerHTML = inputAddTxt.value;
            cloneButton.innerHTML = 'X';
            inputAddTxt.value = '';

            listItem.appendChild(cloneButton);
            listItem.appendChild(cloneItem);
            removeElement = document.getElementsByClassName('button');
            console.log(removeElement);
        }

        ////////////////////// Search Elements /////////////////////////////////

        // serch
        searchElement = document.createElement('div');
        searchElement.className = 'search-controls';
        searchElement.innerHTML = 'Search';
        df.appendChild(searchElement);

        // input
        input = document.createElement('input');
        input.addEventListener('input', search, false);

        // search
        function search(pattern) {
            var value = pattern.target.value;
            allItems = document.getElementsByClassName('list-item');


            for (var i = 0; i < allItems.length; i++) {

                if (!isCaseSensitive) {
                    if (allItems[i].innerHTML.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                        allItems[i].style.display = '';
                    } else {
                        allItems[i].style.display = 'none';
                    }
                } else {
                    if (allItems[i].innerHTML.indexOf(value) >= 0) {
                        allItems[i].style.display = '';
                    } else {
                        allItems[i].style.display = 'none';
                    }
                }
                if (value === '') {
                    allItems[i].style.display = '';
                }

            }
        }
        df.appendChild(input);

        ////////////////////// Remove Elements /////////////////////////////////
        resultControl = document.createElement('div');
        resultControl.className = 'result-controls';
        resultControl.appendChild(listItem);
        df.appendChild(resultControl);


        removeElement = document.getElementsByClassName('button');
        // console.log('GO' + removeElement);
        // for (var i = 0; i < removeElement.length; i++) {
        //     debugger;
        listItem.addEventListener('click', remove, false);
        // }
        // remove
        function remove(ev) {
            debugger;
            var item = ev.target;
            var next = item;
            console.log(item && item.parentElement.className === 'list-item');
            if (item && item.parentElement) {
                item.removeChild(item.parentElement);
            }

        }





        element.appendChild(df);
    };
}
// var el = document.createElement('div');
// el.className = 'root';
// document.body.appendChild(el);
// var result = solve();
// result('#root', false);
// module.exports = solve;