/* globals $ */
'use strict';

function solve() {

    return function(selector) {
        var hbTemplate = `
        <div class='container'>
          <h1>Animals</h1>
            <ul class="animals-list">
              {{#if animals.length}}
                {{#each animals}}
                  <li>
                    {{#if url.length}}
                      <a href='{{this.url}}'>See a {{this.name}}</a>
                      {{else}}
                      <a href='http://cdn.playbuzz.com/cdn/3170bee8-985c-47bc-bbb5-2bcb41e85fe9/d8aa4750-deef-44ac-83a1-f2b5e6ee029a.jpg'>No link for {{this.name}}, here is Batman!</a>
                    {{/if}}
                  </li>
                {{/each}}
              {{/if}}
            </ul>
        </div>
        `;
        /* insert the template here as a string
               example:
               var template =
                 '<ul>' +
                   '{{#students}}' +
                   '<li>' +
                     '{{name}}' +
                   '</li>' +
                   '{{/students}}' +
                 '</ul>';
           */


        var data = {
            animals: [{
                name: 'Lion',
                url: 'https://susanmcmovies.files.wordpress.com/2014/12/the-lion-king-wallpaper-the-lion-king-2-simbas-pride-4685023-1024-768.jpg'
            }, {
                name: 'Turtle',
                url: 'http://www.enkivillage.com/s/upload/images/a231e4349b9e3f28c740d802d4565eaf.jpg'
            }, {
                name: 'Dog'
            }, {
                name: 'Cat',
                url: 'http://i.imgur.com/Ruuef.jpg'
            }, {
                name: 'Dog Again'
            }]
        };

        var template = Handlebars.compile(hbTemplate);
        console.log(template);
        $(selector).html(template(data));
    };
};

// module.exports = solve;