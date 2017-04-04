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
        var arrayTable = new Array(rows + 1);
        arrayTable.fill(0);

        for (var i = 0; i < arrayTable.length; i++) {
            arrayTable[i] = new Array(columns + 1);
            arrayTable[i].fill(0);
        }

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
                            th.html('');

                        } else {
                            th.html(uppercase[j - 1]);
                            arrayTable[i][j] = uppercase[j - 1];
                        }
                    } else {
                        if (j === 0) {
                            var th = $('<th></th>')
                                .addClass('spreadsheet-header spreadsheet-item')
                                .html(count)
                                .appendTo(row);
                            arrayTable[i][j] = count;
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

        $('.spreadsheet-item').on('click', selectCells)

        function selectCells() {
            var col = $(this).parent().children().index($(this));
            var row = $(this).parent().parent().children().index($(this).parent());
            var $this = $(this);
            var $parent = $this.parent();
            var $firstRow = $(this).closest('table').children('tr:first');
            // clean style
            $('.spreadsheet-item').removeClass('selected');

            // left angle
            if (col === 0 && row === 0) {
                $('.spreadsheet-item').addClass('selected');
            }

            // select row
            if (row > 0 && col === 0) {
                $parent.find('.spreadsheet-item').addClass('selected');
                // first row 
                $firstRow.children('.spreadsheet-item:not(:eq(0))').addClass('selected');
            }

            // select columns
            if (row === 0 && col > 0) {
                for (var i = 0; i <= rows; i++) {
                    if (i > 0) {
                        $('table tr').eq(i).find('.spreadsheet-item').eq(0).addClass('selected');
                    }
                    $('table tr').eq(i).find('.spreadsheet-item').eq(col).addClass('selected');
                }
            }

            // select cell
            if (row > 0 && col > 0) {
                $firstRow.find('.spreadsheet-item').eq(col).addClass('selected');
                $('table tr').eq(row).find('.spreadsheet-item').eq(0).addClass('selected');
                $('table tr').eq(row).find('.spreadsheet-item').eq(col).addClass('selected');
            }
        }

        // dragging 
        // here is how you can detect dragging in all four directions
        var isDragging = false;
        $(".spreadsheet-item").mousedown(function(e) {
            var previous_x_position = e.pageX;
            var previous_y_position = e.pageY;

            $(window).mousemove(function(event) {
                isDragging = true;
                var x_position = event.pageX;
                var y_position = event.pageY;

                if (previous_x_position < x_position) {
                    alert('moving right');
                } else {
                    alert('moving left');
                }
                if (previous_y_position < y_position) {
                    alert('moving down');
                } else {
                    alert('moving up');
                }
                $(window).unbind("mousemove");
            });
        }).mouseup(function() {
            var wasDragging = isDragging;
            isDragging = false;
            $(window).unbind("mousemove");
        });



    };
}

// SUBMIT THE CODE ABOVE THIS LINE

if (typeof module !== 'undefined') {
    module.exports = solve;
}