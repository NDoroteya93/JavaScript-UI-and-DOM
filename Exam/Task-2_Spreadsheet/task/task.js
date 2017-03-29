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

        // $('.spreadsheet-item').on('click', function() {
        //     // TODO
        //     // clean STYLE 
        //     $('.spreadsheet-item').removeClass('selected');
        //     var $parent = $(this).parents('tr');
        //     var $this = $(this);
        //     var dataRow = $parent.attr('data-row');
        //     var dataCol = $this.attr('data-col');
        //     if ($this.hasClass('spreadsheet-header')) {

        //         // check if is header
        //         if ($parent.is(':first-child')) {
        //             if ($this.is(':empty')) {
        //                 $('.spreadsheet-item').addClass('selected');
        //             } else {
        //                 $('[data-col=' + dataCol + ']').addClass('selected');
        //                 $('[data-col=0]').addClass('selected');
        //             }

        //         }
        //     }
        //     // cells
        //     if ($this.hasClass('spreadsheet-cell')) {
        //         $parent.find('.spreadsheet-header').addClass('selected');
        //         $('tr[data-row=0] th[data-col=' + dataCol + ']').addClass('selected');
        //         $this.addClass('selected');
        //     }
        // });

        // clicking
        $('.spreadsheet-cell').on('dblclick', function() {
            var $this = $(this);
            $this.find('input').css('display', '');
        });


    };
}

// SUBMIT THE CODE ABOVE THIS LINE

if (typeof module !== 'undefined') {
    module.exports = solve;
}