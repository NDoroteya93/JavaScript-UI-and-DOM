'use strict';

function solve() {

    return function(selector, defaultLeft, defaultRight) {
        var VALIDATION = {
            isString: function(str) {
                if (typeof str !== 'string') {
                    throw new Error('Invalid string!');
                }
            },
            existElement: function(el) {
                if (el === null) {
                    throw new Error('Invalid element');
                }
            },
            isArray: function(arr) {
                if (!Array.isArray(arr)) {
                    throw new Error('Invalid array!')
                }
            }
        }

        // elements
        var element = document.querySelector(selector),
            columnContainer, column1, column2, button, input, select1, select2, selectLeftColumn, selectRightColumnn, labelRightSelect, labelLeftSelect, olLeft, olRight, li, imgDelete, deleteBtn;
        var df1 = document.createDocumentFragment();
        var df2 = document.createDocumentFragment();

        // validation 
        VALIDATION.isString(selector);
        VALIDATION.existElement(element);

        // check if default exis 
        if (defaultLeft !== undefined) {
            VALIDATION.isArray(defaultLeft);
            defaultLeft.forEach(x => VALIDATION.isString(x));
        }

        // check if default exis 
        if (defaultRight !== undefined) {
            VALIDATION.isArray(defaultRight);
            defaultRight.forEach(x => VALIDATION.isString(x));
        }

        // Column structure

        // container 
        columnContainer = document.createElement('div');
        columnContainer.className = 'column-container';
        element.appendChild(columnContainer);

        // col1
        column1 = document.createElement('div');
        column1.className = 'column';
        columnContainer.appendChild(column1);

        // col2
        column2 = document.createElement('div');
        column2.className = 'column';
        columnContainer.appendChild(column2);

        // input 
        input = document.createElement('input');
        input.setAttribute('size', '40');
        input.setAttribute('autofocus', '');
        element.appendChild(input);

        // button
        button = document.createElement('button');
        button.innerHTML = 'Add';
        element.appendChild(button);

        // select left 
        select1 = document.createElement('div');
        select1.className = 'select';
        column1.appendChild(select1);

        // right select
        select2 = select1.cloneNode(true);
        column2.appendChild(select2);

        // input radio
        selectLeftColumn = document.createElement('input');
        selectLeftColumn.type = 'radio';
        selectLeftColumn.name = 'column-select';
        selectLeftColumn.id = 'select-left-column';
        selectLeftColumn.checked = true;
        select1.appendChild(selectLeftColumn);

        selectRightColumnn = document.createElement('input');
        selectRightColumnn.type = 'radio';
        selectRightColumnn.name = 'column-select';
        selectRightColumnn.id = 'select-right-column';
        select2.appendChild(selectRightColumnn);

        // label select
        labelLeftSelect = document.createElement('label');
        labelLeftSelect.htmlFor = 'select-left-column';
        labelLeftSelect.innerHTML = 'Add here';
        select1.appendChild(labelLeftSelect);

        labelRightSelect = document.createElement('label');
        labelRightSelect.htmlFor = 'select-right-column';
        labelRightSelect.innerHTML = 'Add here';
        select2.appendChild(labelRightSelect);

        // add items left column
        li = document.createElement('li');
        li.className = 'entry';
        olLeft = document.createElement('ol');
        column1.appendChild(olLeft);

        // img 
        imgDelete = document.createElement('img');
        imgDelete.className = 'delete';
        imgDelete.src = './imgs/Remove-icon.png';

        // items 
        if (defaultLeft !== undefined) {
            for (var i = 0; i < defaultLeft.length; i++) {
                var cloneLi = li.cloneNode(true),
                    cloneImg = imgDelete.cloneNode(true);
                cloneLi.innerHTML = defaultLeft[i];
                cloneLi.appendChild(cloneImg);
                df1.appendChild(cloneLi);
            }

            olLeft.appendChild(df1);
        }

        // add items right
        olRight = document.createElement('ol');
        column2.appendChild(olRight);

        //  items
        if (defaultRight !== undefined) {
            for (var i = 0; i < defaultRight.length; i++) {
                var cloneLi = li.cloneNode(true),
                    cloneImg = imgDelete.cloneNode(true);
                cloneLi.innerHTML = defaultRight[i];
                cloneLi.appendChild(cloneImg);
                df2.appendChild(cloneLi);
            }

            olRight.appendChild(df2);
        }

        // adding items 
        button.addEventListener('click', addItem, false);

        function addItem() {
            var val = input.value.trim();
            var cloneLi = li.cloneNode(true),
                cloneImg = imgDelete.cloneNode(true);
            // if is empty
            if (val !== '') {
                if (selectLeftColumn.checked) {
                    cloneLi.innerHTML = val;
                    cloneLi.appendChild(cloneImg);
                    olLeft.appendChild(cloneLi);
                } else if (selectRightColumnn.checked) {
                    cloneLi.innerHTML = val;
                    cloneLi.appendChild(cloneImg);
                    olRight.appendChild(cloneLi);
                }
            }

            input.value = '';
        }

        // all images 

        deleteBtn = document.querySelectorAll('.delete');

        for (var i = 0; i < deleteBtn.length; i++) {
            deleteBtn[i].addEventListener('click', remove, false);
        }

        function remove(e) {
            var target = event.target;
            var parent = target.parentElement;

            // get text
            var text = parent.childNodes[0].data;
            input.value = text;

            parent.parentElement.removeChild(parent);
        }
    };
}

// SUBMIT THE CODE ABOVE THIS LINE

if (typeof module !== 'undefined') {
    module.exports = solve;
}