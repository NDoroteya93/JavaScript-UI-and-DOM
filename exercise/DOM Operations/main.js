// Array.from(document.getElementsByTagName('img'))
//     .forEach((el, i) => el.addEventListener('click', function() {
//         alert('Clicked ' + i);
//     }));


// var el = document.getElementsByTagName('img')[0];

// el.addEventListener('click', function() {
//     el.style.display = 'none';
// })

// var el2 = document.getElementById('input');

// el2.addEventListener('keypress', function(е) {
//     var keynum;

//     if (window.event) { // IE                    
//         keynum = e.keyCode;
//     } else if (e.which) { // Netscape/Firefox/Opera                   
//         keynum = e.which;
//     }


//     alert(String.fromCharCode(keynum));
// });

// var df = document.createDocumentFragment();

// for (var i = 0; i < 32; i++) {
//     var li = document.createElement('li');
//     li.innerHTML = i;

//     df.appendChild(li);
// }



// var ul = document.getElementsByTagName('ul')[0];

// ul.appendChild(df);

// ul.addEventListener('click', function(e) {
//     if (e.target.tagName !== 'LI') {
//         return;
//     }

//     e.target.innerHTML += '000';
// });
// Array.from(document.getElementsByTagName('li'))
//     .forEach(li => li.addEventListener('click', function() {
//         li.innerHTML += '@@@#$$';
//     }));



////// CHAIN Method ////////////////////////////
// Bubling -  and Capturingg
Array.from(document.getElementsByTagName('div'))
    .forEach(x => x.addEventListener('click', function(e) {
        console.log(x.id);
    }, true))