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
        var element, addElement, addButton, listItem, item, removeElement, searchElement, input, inputAddTxt, resultControl, allItems, df, addElementLabel, searchLabel;


        if (isCaseSensitive === undefined) {
            isCaseSensitive = false;
        }

        // validation
        VALIDATION.isString(selector);
        VALIDATION.validateCaseSensitive(isCaseSensitive);

        element = document.querySelector(selector);
        element.className = 'items-control';
        df = document.createDocumentFragment();

        // style element

        element.style.width = '400px';
        element.style.margin = '0 auto';
        element.style.padding = '0.5em';
        element.style.border = '1px solid black';

        VALIDATION.elementIsExist(element);

        ////////////////////// Adding Elements /////////////////////////////////
        // content
        addElement = document.createElement('div');
        addElement.className = 'add-controls';
        df.appendChild(addElement);

        // label
        addElementLabel = document.createElement('label');
        addElementLabel.innerHTML = 'Enter text';
        addElement.appendChild(addElementLabel);

        // input
        inputAddTxt = document.createElement('input');
        inputAddTxt.type = 'text';
        addElement.appendChild(inputAddTxt);

        // button to add
        addButton = document.createElement('button');
        addButton.className = 'button';
        addButton.innerHTML = 'Add';
        addElement.appendChild(addButton);

        // Style add-controls
        addElement.style.borderBottom = '1px solid black';
        addElement.style.padding = '1em';
        addElement.style.textAlign = 'center';

        inputAddTxt.style.width = '70%';
        inputAddTxt.style.margin = '1em 0.5em';

        addButton.style.width = '90%';
        addButton.style.padding = '0.5em';
        addButton.style.borderRadius = '5px';
        addButton.style.margin = '0 0.5em';
        addButton.style.border = '1px solid #222';


        //create list
        listItem = document.createElement('ul');
        listItem.className = 'items-list';

        // style listItem 
        listItem.style.padding = '0.5em';
        listItem.style.listStyle = 'none';

        // item
        item = document.createElement('li');
        item.className = 'list-item';

        // item style
        item.style.textAlign = 'center';
        item.style.fontSize = '18px';
        item.style.fontWeight = 'bold';
        item.style.borderBottom = '1px solid black';
        item.style.padding = '0.5em 0';


        // add item on click
        addButton.addEventListener('click', onClick, false);

        function onClick() {
            var cloneItem = item.cloneNode(true);
            var cloneButton = addButton.cloneNode(true);

            // stytle 
            cloneButton.style.width = '10%';

            cloneItem.innerHTML = inputAddTxt.value;
            cloneButton.innerHTML = 'X';
            inputAddTxt.value = '';

            cloneItem.appendChild(cloneButton);
            listItem.appendChild(cloneItem);
            removeElement = document.getElementsByClassName('button');

        }

        ////////////////////// Search Elements /////////////////////////////////

        // serch
        searchElement = document.createElement('div');
        searchElement.className = 'search-controls';
        df.appendChild(searchElement);

        // serach label 
        searchLabel = document.createElement('label');
        searchLabel.innerHTML = 'Search:'
        searchElement.appendChild(searchLabel);

        // input
        input = document.createElement('input');
        input.addEventListener('input', search, false);

        // style search
        searchElement.style.padding = '0.5em';
        searchElement.style.borderBottom = '1px solid black';
        input.style.width = '70%';
        input.style.margin = '1em 0.5em';


        // search
        function search(pattern) {
            var value = pattern.target.value;
            allItems = document.getElementsByClassName('list-item');


            for (var i = 0; i < allItems.length; i++) {

                var text = allItems[i].innerText || allItems[i].textContent;

                if (!isCaseSensitive) {
                    if (text.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                        allItems[i].style.display = '';
                    } else {
                        allItems[i].style.display = 'none';
                    }
                } else {
                    if (text.indexOf(value) >= 0) {
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
        searchElement.appendChild(input);

        ////////////////////// Remove Elements /////////////////////////////////

        resultControl = document.createElement('div');
        resultControl.className = 'result-controls';
        resultControl.appendChild(listItem);
        df.appendChild(resultControl);


        removeElement = document.getElementsByClassName('button');
        listItem.addEventListener('click', remove, false);

        function remove(ev) {
            debugger;
            var item = ev.target;
            var next = item;

            if (item && item.parentElement.className === 'list-item') {
                item.parentElement.parentElement.removeChild(item.parentElement);
            }

        }

        element.appendChild(df);
    };
}

// var result = solve();
// document.body.innerHTML = '<div id="root"></div>';

// result('#root');
// var $root = $('#root');
// var $addControls = $root.find('.add-controls');
// var $tbAdd = $addControls.find('input');
// var $btnAdd = $addControls.find('.button');
// var clickEvent = document.createEvent('MouseEvents');

// clickEvent.initMouseEvent('click', true, true);
// var count = 10,
//     values = ['Test A', 'A Test'],
//     value;

// while (values.length < count) {
//     value = 'NEW ' + Math.random();
//     values.push(value);
// }
// for (var i = 0; i < count; i += 1) {
//     value = values[i];
//     $tbAdd.val(value);
//     $btnAdd.get(0).dispatchEvent(clickEvent);
// }
// debugger;

// var $searchControls = $root.find('.search-controls');
// var $tbSearch = $searchControls.find('input');
// console.log($tbSearch); //.to.has.length(1);

// var $listItems = $root.find('.result-controls .items-list .list-item');
// var pattern = 'a';

// $tbSearch.val(pattern);

// var inputEvent = document.createEvent('MouseEvents');
// inputEvent.initUIEvent('input', true, true);

// var changeEvent = document.createEvent('MouseEvents');
// changeEvent.initUIEvent('change', true, true);

// $tbSearch.get(0).dispatchEvent(inputEvent);
// $tbSearch.get(0).dispatchEvent(changeEvent);

// var expectedLength = values.filter(function(val) {
//     return val.toLocaleLowerCase().indexOf(pattern.toLowerCase()) >= 0;
// }).length;
// var actualLength = 0;

// $listItems.each(function(index, listItem) {
//     var $listItem = $(listItem);
//     var innerHTML = $listItem.text().toLowerCase();
//     var indexOf = innerHTML.indexOf(pattern);
//     var isFound = indexOf >= 0;
//     if (isFound) {
//         actualLength += 1;
//         console.log($listItem.css('display'));
//     } else {
//         console.log($listItem.css('display'));
//     }
// });
// console.log(actualLength) // 0;
module.exports = solve;