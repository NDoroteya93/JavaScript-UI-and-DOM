'use strict';

$.fn.tabs = function() {
    let $this = $(this);
    $this.addClass('tabs-container');

    $('.tab-item').on('click', tabEvent);

    function tabEvent(e) {
        $('.tab-item-title').css({ 'background-color': '', 'border-bottom': '', 'border-left': '', 'font-style': '' });
        let tabBtn = $(this),
            title = tabBtn.find('.tab-item-title'),
            tabContent = tabBtn.find('.tab-item-content');
        title.css({ 'background-color': '#ccc', 'border-bottom': '0', 'border-left': '0', 'font-style': 'italic' });

        $(".tab-item-content").css('display', 'none');
        tabContent.css('display', '');


    }


};