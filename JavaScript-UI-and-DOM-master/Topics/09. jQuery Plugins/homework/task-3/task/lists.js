'use strict';

$.fn.lists = function(lists) {

    ///////////////////// Create DOM /////////////////////////
    // main
    var $mainContainer = $(this);
    // section
    var $listWrapper = $('<section>')
        .addClass('lists-wrapper')
        .appendTo($mainContainer);

    for (var i = 0; i < lists.length; i++) {
        // article
        var $itemSection = $('<article>')
            .addClass('items-section')
            .appendTo($listWrapper);

        ///////////////////////// container for input /////////////////////////

        // create div
        var $addItemWrapper = $('<div/>')
            .addClass('add-item-wrapper');

        // create button
        var $addBtn = $('<a></a>')
            .addClass('add-btn visible')
            .attr('href', '#')
            .appendTo($addItemWrapper);

        // create input
        var $addInput = $('<input>')
            .addClass('add-input')
            .attr('type', 'text')
            .appendTo($addItemWrapper);

        // create list
        var $list = $('<ul></ul>');

        for (var j = 0; j < lists[i].length; j++) {
            var $item = $('<li/>');
            var $searchBtn = $('<a/>')
                .attr('target', '_blank')
                .appendTo($item);

            if (j === 0) {
                $('<strong>')
                    .html(lists[i][j])
                    .appendTo($itemSection);
            } else {
                // create list
                $itemSection.append($addItemWrapper);
                $searchBtn.html(lists[i][j])
                    .attr('href', 'https://www.google.com/search?q=' + lists[i][j]);
                $list.append($item);
            }
        }

        $list.appendTo($itemSection);
    }

    /// Events

    $('.add-item-wrapper').on('click', '.add-btn', function() {
        var $this = $(this);
        var $parent = $this.parent();
        if ($this.hasClass('visible')) {
            $this.removeClass('visible');
            $parent.find('.add-input').addClass('visible');
        } else {
            $this.addClass('visible');
            $parent.find('.add-input').removeClass('visible');
        }
    });

    $('.add-item-wrapper').on('keypress', '.add-input', function(e) {
        var $this = $(this),
            $parent = $this.parents('.items-section'),
            $ul = $parent.find('ul'),
            $val = $this.val();
        if (e.which === 13) {
            var $item = $('<li/>').appendTo($ul);
            var $searchBtn = $('<a/>')
                .html($val)
                .attr({ 'href': 'https://www.google.com/search?q=' + $val, 'target': '_blank' })
                .appendTo($item);


            $this.removeClass('visible');
            $parent
                .find('.add-btn')
                .addClass('visible');
            $this.val('');

        }
    });
    // $(function() {

    //     var isDragging = false;
    //     $("li")
    //         .mousedown(function() {
    //             isDragging = false;
    //         })
    //         .mousemove(function() {
    //             isDragging = true;
    //         })
    //         .mouseup(function() {
    //             var wasDragging = isDragging;
    //             isDragging = false;
    //             if (!wasDragging) {
    //                 $("#throbble").toggle();
    //             }
    //         });

    //     $("ul").sortable();
    // });
}