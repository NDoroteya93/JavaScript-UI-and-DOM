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
        var id = selector,
            root,
            img,
            df, div, title,
            allImages, imgPreview, imgPreviewContent, listImg, input, label;

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
        div.className = 'image-container';
        // style
        div.style.position = 'relative';
        div.style.width = '70%';
        div.style.display = 'block';
        div.style.margin = '0 auto';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';


        // create title
        title = document.createElement('h3');

        // style
        title.style.textAlign = 'center';

        //create image node
        img = document.createElement('img');

        // create input
        input = document.createElement('input');
        input.id = 'input';
        input.style.display = 'block';
        input.style.width = '70%';
        input.style.margin = '10px auto';

        // create label
        label = document.createElement('label');
        label.setAttribute("for", 'input');
        label.style.display = 'block';
        label.style.textAlign = 'center';
        label.innerHTML = 'Filter';

        // style
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.borderRadius = '5px';

        // create listImg
        listImg = document.createElement('div');
        listImg.appendChild(label);
        listImg.appendChild(input);
        // style
        listImg.className = 'list-image';
        listImg.style.width = '30%';
        listImg.style.float = 'right';

        // image preview
        imgPreviewContent = document.createElement('div');
        imgPreviewContent.className = 'image-preview';

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
                var cloneFirstImage = cloneImg.cloneNode(true);
                var cloneFirstTitle = cloneTitle.cloneNode(true);
                imgPreviewContent.appendChild(cloneFirstTitle);
                imgPreviewContent.appendChild(cloneFirstImage);
            }
            listImg.appendChild(cloneDiv);
            df.appendChild(listImg);
            df.appendChild(imgPreviewContent);

        }

        root.appendChild(df);

        // Style image-preview
        imgPreview = document.getElementsByClassName('image-preview');

        imgPreview[0].style.width = '42%';
        imgPreview[0].style.float = 'left';
        imgPreview[0].style.padding = '5% 14%';
        imgPreview[0].style.fontSize = '40px';


        // Events
        allImages = document.querySelectorAll('.list-image img');
        for (var i = 0; i < allImages.length; i++) {
            allImages[i].addEventListener('mouseover', onHover, false);
            allImages[i].addEventListener('mouseout', unHover, false);
            allImages[i].addEventListener('click', onClick, false);
        }

        input.addEventListener('input', search, false);
        //  hovered
        function onHover(el) {
            el.target.parentElement.style.backgroundColor = '#ffb0cb';
        }

        // unhovered
        function unHover(el) {
            el.target.parentElement.style.backgroundColor = '';
        }

        // onclick
        function onClick(el) {
            var getEl = el.target;
            var alt = imgPreview[0].children[1].alt;
            var src = imgPreview[0].children[1].src;

            imgPreview[0].children[0].innerHTML = getEl.alt;
            imgPreview[0].children[1].alt = getEl.alt;
            imgPreview[0].children[1].src = getEl.src;

        }

        // search
        function search(pattern) {
            var value = pattern.target.value;

            for (var i = 0; i < allImages.length; i++) {
                if (allImages[i].alt.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                    allImages[i].parentElement.style.display = 'block';
                } else {
                    allImages[i].parentElement.style.display = 'none';
                }
                if (value === '') {
                    allImages[i].parentElement.style.display = 'block';
                }

            }
        }

    };
}
// var result = solve();
// var items = [],
//     count = 5,
//     i,
//     id = 'root';
// for (i = 0; i < count; i += 1) {
//     items.push({
//         title: `Image #${i}`,
//         url: `http://test-url-${i}.com`
//     });
// }
// document.body.innerHTML = `<div id="${id}"></div>`;
// var fakejQuery = $;
// $ = undefined;
// result('#' + id, items);
// $ = fakejQuery;

// var $root = $('#' + id);

// var $imageContainers = $root.find('.image-container');

// var foundContents = 0;

// $imageContainers.each(function(index, imageContainer) {
//     var isFound = false;
//     $(imageContainer).find('*')
//         .each(function(i, node) {
//             if (isFound) {
//                 return;
//             }
//             if ($(node).html() === items[index].title) {
//                 foundContents += 1;
//                 isFound = true;
//             }
//         });
// });

// console.log(foundContents) //(count);
module.exports = solve;