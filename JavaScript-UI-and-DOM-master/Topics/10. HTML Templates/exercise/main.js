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

var hbTemplate = `
<ul>
{{#students}}
    <li>{{name}} is {{age}} old</li>
{{/students}}
</ul>
`;

var template = Handlebars.compile(hbTemplate);

var data = {
    students: [
        { name: 'Cuki', age: 21 },
        { name: 'Doncho', age: 25 },
        { name: 'Pesho', age: 31 },
        { name: 'Gosho', age: 37 }
    ]
}

var container = document.getElementById('hb-template');
container.innerHTML = template(data);