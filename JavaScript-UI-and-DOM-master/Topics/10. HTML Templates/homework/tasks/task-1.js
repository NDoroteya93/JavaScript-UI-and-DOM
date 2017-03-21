/* globals $ */

'use strict';

function solve() {

    return function(selector) {
        var template = `
                <table class='items-table'>
                  <thead>
                    <tr>
                      <th>#</th>
                      {{#if headers.length}}
                        {{#each headers}}
                        <th>{{this}}</th>
                        {{/each}}
                      {{else}}
                        <p>No Headers</p>
                      {{/if}}
                      </tr>
                    </thead>
                    <tbody>
                        {{#if items.length}}
                        {{#each items}}
                          <tr>
                            <td>{{@index}}</td>
                            <td>{{this.col1}}</td>
                            <td>{{this.col2}}</td>
                            <td>{{this.col3}}</td>
                          </tr>
                        {{/each}}
                        {{/if}}
                    </tbody>
                  </table>
    `;

        // var template = Handlebars.compile(hbTemplate);
        // var headers = ['Title', 'Date #1', 'Duration'];
        // var items = [],
        //     count = 10;

        // var data = {
        //     headers: ['Title', 'Date #1', 'Duration'],
        //     items: []
        // };
        // for (var i = 0; i < count; i += 1) {
        //     data.items.push({ col1: 'Title #' + i, col2: new Date() + '', col3: i });
        // }
        $(selector).html(template);
    };
};

module.exports = solve;