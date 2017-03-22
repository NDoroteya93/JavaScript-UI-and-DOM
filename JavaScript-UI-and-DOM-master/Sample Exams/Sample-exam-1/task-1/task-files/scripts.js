'use strict';

function createCalendar(selector, events) {
    var VALIDATION = {
        isString: function(str) {
            if (typeof str !== 'string') {
                throw new Error('Invalid selector!')
            }
        },

        validateElement: function(el) {
            if (el === null) {
                throw new Error('Invalid selector');
            }
        },
        validateEvents: function(events) {
            if (!Array.isArray(events)) {
                throw new Error('Invalid events array!');
            }
        }
    }


    // variables 
    var WEEKS = 5,
        WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var element, table, td, tr, title, content, df;

    VALIDATION.isString(selector);
    element = document.querySelector(selector);
    df = document.createDocumentFragment();

    // create table 

    table = document.createElement('table');
    df.appendChild(table);

    // data
    tr = document.createElement('tr');
    td = document.createElement('td');

    // title
    title = document.createElement('div');
    title.className = 'header';
    df.appendChild(table);

    // content
    content = document.createElement('div');
    content.className = 'content';

    // count days
    var count = 0;
    for (var i = 0; i < WEEKS; i++) {
        var cloneTr = tr.cloneNode(true);

        for (var j = 0; j < WEEK_DAYS.length; j++) {
            ++count;
            var cloneTd = td.cloneNode(true),
                cloneHeader = title.cloneNode(true),
                cloneContent = content.cloneNode(true);

            cloneHeader.innerHTML = WEEK_DAYS[i] + ' ' + count + ' June 2014';
            cloneTd.appendChild(cloneHeader);
            cloneTd.appendChild(cloneContent);
            cloneTr.appendChild(cloneTd);
        }

        table.appendChild(cloneTr);

    }
}