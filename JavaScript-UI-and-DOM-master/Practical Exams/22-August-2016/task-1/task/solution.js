'use strict';

function solve() {
    return function(selector, tabs) {
        let VALIDATION = {
            isString: function(str) {
                if (typeof str !== 'string') {
                    throw new Error('Invalid string selector');
                }
            },
            validateSelector: function(el) {
                if (el === null || el.length === 0) {
                    throw new Error('Invalid element!')
                }
            },
            validateTabs: function(tabs) {
                if (!tabs.hasOwnProperty('title') || !tabs.hasOwnProperty('content')) {
                    throw new Error('Invalid tabs properties!');
                }

                this.isString(tabs.title);
                this.isString(tabs.content);
            }
        }
        let element = $(selector);
        // validate
        VALIDATION.isString(selector);
        tabs.forEach(x => VALIDATION.validateTabs(x));
        VALIDATION.validateSelector(element);

        // create Nav tabs
        let $tabsNav = $('<ul></ul>')
            .addClass('tabs-nav')
            .appendTo(element);

        // create tabs content
        let $tabsContent = $('<ul></u>')
            .addClass('tabs-content')
            .appendTo(element);

        for (let i = 0; i < tabs.length; i++) {
            // nav
            let $liNav = $('<li></li>')
                .appendTo($tabsNav);
            let $anchor = $('<a></a>')
                .addClass('tab-link')
                .html(tabs[i].title)
                .appendTo($liNav);

            // content
            let $liContent = $('<li></li>')
                .addClass('tab-content')
                .attr('data-title', tabs[i].title)
                .appendTo($tabsContent);
            // first li
            if (i === 0) {
                $liContent.addClass('visible');
            }

            let $p = $('<p></p>')
                .html(tabs[i].content)
                .appendTo($liContent);
            let $btn = $('<button></button>')
                .addClass('btn-edit')
                .html('Edit')
                .appendTo($liContent);
        }

        $('.tab-link').on('click', function() {

            let $this = $(this),
                $title = $this.text();
            $('.tab-content').removeClass('visible');
            $("li[data-title='" + $title + "']")
                .addClass('visible');
        });

        $('.btn-edit').on('click', function() {
            let $this = $(this);
            let $parent = $this.parents('li.tab-content');
            let $content = $parent.find('p')
            if ($this.html() === 'Edit') {
                $this.html('Save');
                let $val = $content.html();
                let $textarea = $('<textarea></textarea>')
                    .addClass('edit-content')
                    .html($val)
                    .appendTo($parent);
            } else if ($this.html() === 'Save') {
                debugger;
                let $getValue = $parent.find('.edit-content');
                $content.html($getValue.val());
                $getValue.remove();
                $this.html('Edit');
            }

        })



    }
}
module.exports = solve;