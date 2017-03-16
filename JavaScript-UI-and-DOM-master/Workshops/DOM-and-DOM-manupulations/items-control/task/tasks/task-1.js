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
        df.appendChild(listItem);

        // item
        item = document.createElement('li');
        item.className = 'list-item';

        // add item on click
        addButton.addEventListener('click', onClick, false);

        function onClick() {
            var cloneItem = item.cloneNode(true);
            cloneItem.innerHTML = inputAddTxt.value;
            inputAddTxt.value = '';
            listItem.appendChild(cloneItem);
        }


        ////////////////////// Remove Elements /////////////////////////////////
        resultControl = document.createElement('div');
        resultControl.className = 'result-controls';



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
            console.log(allItems);

            for (var i = 0; i < allItems.length; i++) {

                if (!isCaseSensitive) {
                    if (allItems[i].innerHTML.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                        allItems[i].parentElement.style.display = '';
                    } else {
                        allItems[i].parentElement.style.display = 'none';
                    }
                } else {
                    if (allItems[i].innerHTML.indexOf(value) >= 0) {
                        allItems[i].parentElement.style.display = '';
                    } else {
                        allItems[i].parentElement.style.display = 'none';
                    }
                }
                if (value === '') {
                    allItems[i].parentElement.style.display = '';
                }

            }
        }
        df.appendChild(input);




        element.appendChild(df);
    };
}
// var el = document.createElement('div');
// el.className = 'root';
// document.body.appendChild(el);
// var result = solve();
// result('#root', false);
// module.exports = solve;