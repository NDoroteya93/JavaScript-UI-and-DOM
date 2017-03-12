// var el = document.getElementById('paragraph');

// el.innerHTML = 'Pesho was here!';

// var el2 = document.getElementById('div2')

// console.log(el2.children);
// console.log(el.id);
// console.log(el.style);
// console.log(el.className);

/////////////////////////////////////// TRAVERSING THE DOM ///////////////////////////////////////

/////////////////////////////////////// Recursion ///////////////////////////////////////
// function traverseElement(el, indent) {
//     console.log(indent + '<' + el.tagName.toLowerCase() + '>');

//     var children = [].slice.apply(el.children);
//     // children = Array.from(el.children); // es6, better 

//     children.forEach(child => traverseElement(child, indent + '  '));

//     console.log(indent + '</' + el.tagName.toLowerCase() + '>');
// }

// traverseElement(document.body);


function traverseBody() {
    var el = document.body;
    var indent = '';
    while (el !== null) {
        console.log('<' + el.tagName.toLowerCase() + '>');

        if (el.firstElementChild !== null) {
            el = el.firstElementChild;
            indent += '  ';
        } else {
            while (el.nextElementSibling === null) {
                console.log('</' + el.tagName.toLowerCase() + '>');
                indent = indent.substr(2);
                el = el.parentElement;
                if (el === document.body) {
                    console.log('</body>');

                    break;
                }
            }
            el = el.nextElementSibling;
        }
    }
}

traverseBody();