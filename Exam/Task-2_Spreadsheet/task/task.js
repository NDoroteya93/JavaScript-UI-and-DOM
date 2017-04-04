'use strict';

function solve() {

    return function(selector, rows, columns) {
        var VALIDATION = {
            isString: function(str) {
                if (typeof str !== 'string') {
                    throw new Error('Invalid string!');
                }
            },
            existElement: function(el) {
                if (el.length === 0) {
                    throw new Error('Invalid element');
                }
            },
            isInteger: function(n) {
                if (typeof n !== 'number' || isNaN(n) || n !== parseInt(n, 10) || n < 0) {
                    throw new Error('Invalid rows or columns');
                }
            }
        }

        var uppercase = 'abcdefghijklmnopqrstuvwxyz'.split('').map(x => x.toUpperCase());
        var df = $('<div></div>');
        var count = 1;

        VALIDATION.isString(selector);
        var element = $(selector);
        VALIDATION.existElement(element);
        VALIDATION.isInteger(rows);
        VALIDATION.isInteger(columns);

        //  rows

        if (columns <= 26) {
            for (var i = 0; i <= rows; i++) {
                // cols
                var row = $('<tr></tr>')
                    .attr('data-row', i)
                    .appendTo(df);
                for (var j = 0; j <= columns; j++) {
                    if (i === 0) {
                        var th = $('<th></th>')
                            .attr('data-col', j)
                            .addClass('spreadsheet-header spreadsheet-item')
                            .appendTo(row);
                        if (j === 0) {
                            th
                                .attr('data-col', '')
                                .html('');
                        } else {
                            th.html(uppercase[j - 1]);
                        }
                    } else {
                        if (j === 0) {
                            var th = $('<th></th>')
                                .attr('data-col', j)
                                .addClass('spreadsheet-header spreadsheet-item')
                                .html(count)
                                .appendTo(row);
                            ++count;
                        } else {
                            var td = $('<td></td>')
                                .attr('data-col', j)
                                .addClass('spreadsheet-cell spreadsheet-item')
                                .appendTo(row);
                            $('<input/>').appendTo(td);
                            $('<span></span>').appendTo(td);
                        }
                    }
                }
            }
        }
        // create table 
        $('<table></table>')
            .addClass('spreadsheet-table')
            .append(df.html())
            .appendTo(element);

        var isDown = false;
        var firstEl, lastEl;

        // TODO
        $(document).mousedown(function() {
                isDown = true; // When mouse goes down, set isDown to true
            })
            .mouseup(function() {
                isDown = false; // When mouse goes up, set isDown to false
            });

        $(".spreadsheet-item").mouseover(function() {
            if (isDown) { // Only change css if mouse is down
                $(this).addClass('selected');
            }
        });

        $(".spreadsheet-item").mousedown(selection);


        function selection() {
            // TODO
            var $this = $(this);
            var $col = $this.parent().children().index($this);
            var $row = $this.parent().parent().children().index($this.parent());

            // clean STYLE 
            $('.spreadsheet-item').removeClass('selected');
            var $parent = $this.parents('tr');

            // select all 
            if ($col === 0 && $row === 0) {
                $('.spreadsheet-item').addClass('selected');
            }
            // select cell
            if ($this.hasClass('spreadsheet-cell')) {
                $this.addClass('selected');
                $parent.find('.spreadsheet-header').addClass('selected');
                $('table tr').eq(0).find('th').eq($col).addClass('selected');
            }

            // select row
            if ($row > 0 && $col === 0) {
                $parent.find('.spreadsheet-item').addClass('selected');
            }

            // select col
            if ($row === 0 && $col > 0) {

                $this.addClass('selected');
                $("tr").each(function(index, element) {
                    $(element).find('.spreadsheet-item').eq($col).addClass('selected');
                });
            }
        }


        // TODO
        function dragging(element, start, last) {

            var $this = $(element);
            var $col = $this.parent().children().index($this);
            var $row = $this.parent().parent().children().index($this.parent());


        }


    };
}

// SUBMIT THE CODE ABOVE THIS LINE

if (typeof module !== 'undefined') {
    module.exports = solve;
}