/* globals module */
'use strict';

function solve() {
    return function(selector, items) {
        // Const
        var VALIDATION = {
            validateSelector: function(x) {
                if (typeof x !== 'string') {
                    throw new Error('Invalid selector!')
                }
            },
            validateNode: function(node) {
                if (node === null) {
                    throw new Error('Invalid Selector!');
                }
            },
            validateItems: function(items) {
                if (!Array.isArray(items)) {
                    throw new Error('Invalid items parameter!');
                }
                items.forEach(function(item) {
                    if (!item.hasOwnProperty('title') || !item.hasOwnProperty('url')) {
                        throw new Error('Invalid item properties!');
                    }
                })

            }
        };

        // Variables
        var getSelector,
            id = selector,
            root,
            img,
            df, div, title,
            allDivs,
            allImages, allTitles, imgPreview, listImg;

        VALIDATION.validateSelector(id);
        VALIDATION.validateItems(items);

        if (selector instanceof HTMLElement) {
            id = selector.id;
        }

        root = document.querySelector(id);

        // Validate if exist
        VALIDATION.validateNode(root);

        // create fragment
        df = document.createDocumentFragment();

        // create div
        div = document.createElement('div');

        // styl
        div.style.position = 'relative';
        div.style.width = '35%';
        div.style.height = '35%';
        div.style.display = 'block';
        div.style.borderRadius = '26px'


        // create title
        title = document.createElement('h3');

        // style
        title.style.textAlign = 'center';

        //create image node
        img = document.createElement('img');

        // style
        img.style.width = '50%';
        img.style.height = '50%';
        img.style.borderRadius = '25px';
        img.style.margin = '0 auto';

        // create listImg
        listImg = document.createElement('div');
        listImg.className = 'list-image';

        // Get Items Properties
        for (var i = 0; i < items.length; i++) {
            var cloneImg = img.cloneNode(true),
                cloneDiv = div.cloneNode(true),
                cloneTitle = title.cloneNode(true);

            cloneImg.src = items[i].url;
            cloneImg.alt = items[i].title;
            cloneTitle.innerHTML = items[i].title;

            cloneDiv.appendChild(cloneTitle);
            cloneDiv.appendChild(cloneImg);

            if (i === 0) {
                cloneDiv.className = 'image-preview';
                df.appendChild(cloneDiv);
            } else {
                listImg.appendChild(cloneDiv);
                df.appendChild(listImg);
            }
        }

        root.appendChild(df);

        // Style image-preview
        imgPreview = document.getElementsByClassName('image-preview');

        console.log(imgPreview[0]);

        imgPreview[0].style.width = '65%';
        imgPreview[0].style.height = '65%';

    };
}

// module.exports = solve;