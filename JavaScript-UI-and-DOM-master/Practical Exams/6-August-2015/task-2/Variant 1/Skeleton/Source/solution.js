'use strict';

function solve() {
    $.fn.datepicker = function() {
        var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var WEEK_DAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        Date.prototype.getMonthName = function() {
            return MONTH_NAMES[this.getMonth()];
        };

        Date.prototype.getDayName = function() {
            return WEEK_DAY_NAMES[this.getDay()];
        };

        // you are welcome :)
        var date = new Date();
        console.log(date.getDay());
        console.log(date.getDayName());
        console.log(date.getMonthName());

        ///////////////////// INIT /////////////////////////////
        // datepicker wrapper 
        let $input = $(this);
        $input.addClass('datepicker');
        let $parrent = $input.parent();
        let $wrapper = $('<div></div>')
            .addClass('datepicker-wrapper')
            .appendTo($parrent)
            .append($input);
        // init calendar

        // create calendar 

        // picker
        let $picker = $('<div></div>')
            .addClass('picker')
            .appendTo($wrapper);

        // controls header 
        let $controls = $('<div></div>')
            .addClass('controls')
            .appendTo($picker);

        // previous btn
        let $prevBtn = $('<button></button>')
            .addClass('btn btn-previous')
            .html('<')
            .appendTo($controls);

        // current month
        let $currentMonth = $('<div></div>')
            .addClass('current-month')
            .appendTo($controls);

        // next btn
        let $nextBtn = $('<button></button>')
            .addClass('btn btn-next')
            .html('>')
            .appendTo($controls);

        // table calendar
        let $calendar = $('<table></table>')
            .addClass('calendar')
            .appendTo($picker);

        // curent date - footer

        let $getCurrentDay = date.getDate() + ' ' + date.getMonthName() + ' ' + date.getFullYear();
        let $currentDate = $('<div></div>')
            .addClass('current-date')
            .appendTo($picker);

        let $currentDateLink = $('<a></a>')
            .addClass('current-date-link')
            .html($getCurrentDay)
            .appendTo($currentDate)


        // current, prev, next months
        let currentMonth = date.getMonth(),
            prevMonth = date.getMonth() - 1,
            nextMonth = date.getMonth() + 1,
            currentYear = date.getFullYear(),
            prevYear = date.getFullYear(),
            nextYear = date.getFullYear();

        createCalendar(currentMonth, prevMonth, nextMonth, currentYear, prevYear, nextYear);



        //////////////////////////////// EVENTS ///////////////////////////////
        // on focus
        $input.on('click', function(e) {
            e.stopPropagation();
            $('.datepicker-wrapper .picker').addClass('picker-visible');
        });

        // prev btn
        $('.btn-previous').on('click', function(e) {
            debugger;
            e.stopPropagation();
            currentMonth--;
            prevMonth = currentMonth - 1;
            nextMonth = currentMonth + 1;

            if (currentMonth === -1) {
                currentMonth = 11;
                currentYear--;
            }

            if (prevMonth === -1) {
                prevMonth = 11;
                prevYear--;
            }

            if (nextMonth === -1) {
                nextMonth = 11;
                nextYear--;
            }

            //  nexr
            if (currentMonth === 12) {
                currentMonth = 0;
                currentYear++;
            }

            //  nexr
            if (prevMonth === 12) {
                prevMonth = 0;
                prevYear++;
            }

            //  nexr
            if (nextMonth === 12) {
                nextMonth = 0;
                nextYear++;
            }

            createCalendar(currentMonth, prevMonth, nextMonth, currentYear, prevYear, nextYear)
        });

        // next btn
        $('.btn-next').on('click', function(e) {

            e.stopPropagation();
            currentMonth++;
            prevMonth = currentMonth - 1;
            nextMonth = currentMonth + 1;

            if (currentMonth === -1) {
                currentMonth = 11;
                currentYear--;
            }

            if (prevMonth === -1) {
                prevMonth = 11;
                prevYear--;
            }

            if (nextMonth === -1) {
                nextMonth = 11;
                nextYear--;
            }

            //  nexr
            if (currentMonth === 12) {
                currentMonth = 0;
                currentYear++;
            }

            //  nexr
            if (prevMonth === 12) {
                prevMonth = 0;
                prevYear++;
            }

            //  nexr
            if (nextMonth === 12) {
                nextMonth = 0;
                nextYear++;
            }
            createCalendar(currentMonth, prevMonth, nextMonth, currentYear, prevYear, nextYear);
        });


        $(window).on('click', function() {
            //Hide the menus if visible
            $('.datepicker-wrapper .picker').removeClass('picker-visible');
        });

        // get day
        $('td').on('click', function() {
            let $this = $(this),
                $val = $this.html();
            let $getDate = $val + '/' + currentMonth + '/' + currentYear;
            $input.val($getDate);
            $picker.removeClass('picker-visible');
        });

        $('.current-date-link').on('click', function(e) {
            e.stopPropagation();
            $getDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
            $input.val($getDate);
        })



        function createCalendar(currentMonth, previousMonth, nextMonth, currentYear, prevYear, nextYear) {
            // row
            let $thRow = $('<tr></tr>')
                .appendTo('table');
            // Clean table 
            $('table').empty();

            // days of week in table header
            for (let i = 0; i < WEEK_DAY_NAMES.length; i++) {
                let $th = $('<th></th>')
                    .appendTo($thRow)
                    .html(WEEK_DAY_NAMES[i]);
            }

            // days of current month months 
            let $getCurrentDays = getDaysInMonth(currentMonth, currentYear),
                $getPrevDays = getDaysInMonth(previousMonth, prevYear),
                $getNextDays = getDaysInMonth(nextMonth, nextYear);

            // create UI tables
            let calendarData = fillCalendar($getPrevDays, $getCurrentDays, $getNextDays);
            // weeks
            for (let i = 0; i < calendarData.length; i++) {
                let $row = $('<tr></tr>').appendTo('table');
                // days
                for (let j = 0; j < calendarData[i].length; j++) {
                    let $col = $('<td></td>')
                        .addClass(calendarData[i][j].state)
                        .html(calendarData[i][j].day)
                        .appendTo($row);
                }
            }

        }

        // create calendar data 
        function fillCalendar(prevMonth, currentMonth, nextMonth) {

            const WEEKS = 6,
                DAYS = 7;
            let calendar = new Array(WEEKS);
            calendar.fill(0);
            // create table array 
            for (let i = 0; i < calendar.length; i++) {
                calendar[i] = new Array(DAYS);
                calendar[i].fill(0);
            }

            let week = 0,
                day = 0;

            // UI current month
            $('.current-month').html(currentMonth[0].getMonthName() + ' ' + currentMonth[0].getFullYear())
                // check first days
            let firstDay = currentMonth[0].getDay();

            // get prev month
            if (firstDay !== 1) {
                for (let i = firstDay; i > 0; i--) {
                    let col = {};
                    col.day = prevMonth[prevMonth.length - i].getDate();
                    col.state = 'another-month';
                    calendar[week][day] = col;
                    ++day;
                }
            }

            // get current month
            for (let i = 0; i < currentMonth.length; i++) {
                let col = {};
                col.day = currentMonth[i].getDate();
                col.state = 'current-month';
                calendar[week][day] = col;
                ++day;

                // start new week
                if (day > 6) {
                    day = 0;
                    ++week;
                }
            }

            // next month 
            for (let i = 0; i < nextMonth.length; i++) {
                let col = {};
                col.day = nextMonth[i].getDate();
                col.state = 'another-month';
                calendar[week][day] = col;

                ++day;
                // start new week
                if (day > 6) {
                    day = 0;
                    ++week;
                }
                if (calendar.length <= week) {
                    break;
                }
            }

            return calendar;
        }


        // get days in month
        function getDaysInMonth(month, year) {
            // Since no month has fewer than 28 days
            // prev
            if (month === -1) {
                month = 11;
                year--;
            }

            //  nexr
            if (month === 12) {
                month = 0;
                year++;
            }
            let date = new Date(year, month, 1);
            let days = [];
            while (date.getMonth() === month) {
                days.push(new Date(date));
                date.setDate(date.getDate() + 1);
            }
            return days;
        }

        return this;
    };
};