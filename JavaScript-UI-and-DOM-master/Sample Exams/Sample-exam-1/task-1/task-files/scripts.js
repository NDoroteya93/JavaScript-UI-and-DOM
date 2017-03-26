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
        },

        validateEventObject: function(obj) {

            if (typeof obj !== 'object') {
                throw new Error('Invalid event object');
            }
            if (!(obj.hasOwnProperty('title')) || !(obj.hasOwnProperty('date')) || !(obj.hasOwnProperty('hour')) || !(obj.hasOwnProperty('duration'))) {
                throw new Error('Invalid event-object structure');
            }

            // title
            this.isString(obj.title);

            // date
            if (isNaN(obj.date) || Number(obj.date) < 1 || Number(obj.date) > 30) {
                throw new Error('Invalid date object');
            }

            // time
            this.isString(obj.hour);
            if (!(/^([01]?\d|2[0-3]):?([0-5]\d)$/.test(obj.hour))) {
                throw new Error('Invalid time format!')
            }

            if (isNaN(obj.duration) || Number(obj.duration) < 0 || Number(obj.duration) > 1440) {
                throw new Error('Invalid duration obect');
            }
        }
    }



    // variables 
    const DAYS = 30,
        WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var element, root, table, td, tr, title, content, df, allDate;

    VALIDATION.isString(selector);
    element = document.querySelector(selector);
    root = document.getElementById('root');
    df = document.createDocumentFragment();

    // VALIDATION

    VALIDATION.validateElement(element);
    VALIDATION.validateEvents(events);

    events.forEach(x => VALIDATION.validateEventObject(x));
    // create table 

    table = document.createElement('table');
    df.appendChild(table);

    // style table 
    table.style.width = '90%';
    table.style.margin = '10px auto';
    table.style.borderCollapse = 'collapse';

    // data
    tr = document.createElement('tr');
    td = document.createElement('td');

    // stle td, tr
    td.style.border = '1px solid black';

    // title
    title = document.createElement('div');
    title.className = 'header';

    // style title
    title.style.borderBottom = '1px solid black';
    title.style.textAlign = 'center';
    title.style.fontWeight = 'bold';
    title.style.background = '#cac5c5';
    df.appendChild(table);

    // content
    content = document.createElement('div');
    content.className = 'content';

    // style content 
    content.style.height = '100px';

    // count days
    var count = 0,
        cloneTr = tr.cloneNode(true);

    for (var i = 1; i <= DAYS; i++) {
        // row

        if (count >= 7) {
            cloneTr = tr.cloneNode(true);
            count = 0;
        }
        // col
        var cloneTd = td.cloneNode(true),
            cloneHeader = title.cloneNode(true),
            cloneContent = content.cloneNode(true);

        cloneHeader.innerHTML = WEEK_DAYS[count] + ' ' + i + ' June 2014';

        for (var j = 0; j < events.length; j++) {
            if (Number(events[j].date) === i) {
                cloneContent.innerHTML = events[j].hour + ' - ' + events[j].title;
            }
        }

        cloneTd.appendChild(cloneHeader);
        cloneTd.appendChild(cloneContent);
        cloneTr.appendChild(cloneTd);

        table.appendChild(cloneTr);
        ++count;

    }

    element.appendChild(df);

    // events
    allDate = document.querySelectorAll('td');

    for (var i = 0; i < allDate.length; i++) {
        allDate[i].addEventListener('mouseover', onHover, false);
        allDate[i].addEventListener('mouseout', unHover, false);
        allDate[i].addEventListener('click', onClick, false);
    }

    function onHover(e) {

        if (e.target.tagName === 'TD') {
            e.target.childNodes[0].style.background = '#ffb0cb';
        }

        if (e.target.className === 'content') {
            e.target.previousElementSibling.style.background = '#ffb0cb';
        }
        if (e.target.className === 'header') {
            e.target.style.background = '#ffb0cb';
        }
    }

    function unHover(e) {

        if (e.target.tagName === 'TD') {
            e.target.childNodes[0].style.background = '#cac5c5';
        }

        if (e.target.className === 'content') {
            e.target.previousElementSibling.style.background = '#cac5c5';
        }
        if (e.target.className === 'header') {
            e.target.style.background = '#cac5c5';
        }
    }

    function onClick(e) {

        // clear previous style
        for (var i = 0; i < allDate.length; i++) {
            allDate[i].childNodes[1].style.background = ''
        }

        // Check click target
        if (e.target.tagName === 'TD') {
            e.target.childNodes[1].style.background = 'rgba(74, 131, 239, 0.41)';
        }

        if (e.target.className === 'content') {
            e.target.style.background = 'rgba(74, 131, 239, 0.41)';
        }
        if (e.target.className === 'header') {
            e.target.nextElementSibling.style.background = 'rgba(74, 131, 239, 0.41)';
        }
    }
}
var events = [{
    title: '22 Exam',
    date: 17,
    hour: '23:00',
    duration: '60'
}, {
    title: '9 Exam',
    date: '9',
    hour: '10:00',
    duration: '60'
}];

createCalendar('div', events);