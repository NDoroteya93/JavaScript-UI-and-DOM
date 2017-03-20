'use strict';

// var hbTemplate = `
// <h1> {{message}}</h1>
// <h2>{{greeting}}</h2>
// `;

// var template = Handlebars.compile(hbTemplate);
// var data = { message: "Hello", greeting: 'Dory' }
// var container = document.getElementById('hb-template');
// container.innerHTML = template(data);


// Block expressions

var hbTemplate = document.getElementById('hb-template-container').innerHTML;

// Create helper
Handlebars.registerHelper('displayPerson', function(person) {
    var result = `<span class="red">${person.name}</span> is ${person.age}-years-old`
    return Handlebars.Utils.escapeExpression(result);
})

var template = Handlebars.compile(hbTemplate);

var data = {
    schoolData: {
        thisYearData: {
            students: [
                { name: 'Cuki', age: 21 },
                { name: 'Doncho', age: 25 },
                { name: 'Pesho', age: 31 },
                { name: 'Gosho', age: 37 }
            ]
        }
    },
    obj: {
        value: 42,
        name: 'Penka',
        color: 'red',
        enabled: false
    }
}

var container = document.getElementById('hb-template');
container.innerHTML = template(data);

/// Exam for BgCoder
// function solve() {
//     return function() {
//         return `
//           <ul>
//             {{#if students.length}}
//             <p>First Student is {{students.[0].name}}</p>
//             {{#students}}
//             <li>{{name}} is {{age}} old</li>
//             {{/students}}
//         </ul>
//         {{else}}
//         <p>No Students</p>
//         {{/if}}
//         `
//     }
// }