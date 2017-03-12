/////////////////////////////////////// MANIPULATING DOM ///////////////////////////////////////

// var imgEl = document.createElement('img');
// imgEl.src = './cat.jpg';
// imgEl.style.width = '500px';
// imgEl.className = 'img-class';

// var el = document.getElementById('div3');
// // after
// // el.appendChild(imgEl);

// // insertBefore
// el.insertBefore(imgEl, el.children[1]);

// // remove

// setTimeout(function() {

//     // el.parentElement.removeChild(el);
//     // imgEl.outerHTML = '';
// }, 1000)

// document.getElementsByTagName('p')[0].style.fontSize = '45px';
// document.getElementsByTagName('p')[0].style.borderSize = '2px';
// document.getElementsByTagName('p')[0].style.borderStyle = 'solid';
// document.getElementsByTagName('p')[0].style.borderColor = 'black';

var ul = document.createDocumentFragment('ul');
var li = document.createElement('li');
li.style.color = 'red';


for (var i = 1; i < 1000; i++) {
    var newLi = li.cloneNode(true);
    newLi.innerHTML = i
    ul.appendChild(newLi);

}


document.body.appendChild(ul);

// for (var i = 1; i < 1000; i++) {
//     var li = document.createElement('li');
//     if (i === 453) {
//         li.style.zIndex = 100;
//     }
//     li.innerHTML = i;
//     ul.appendChild(li);
// }