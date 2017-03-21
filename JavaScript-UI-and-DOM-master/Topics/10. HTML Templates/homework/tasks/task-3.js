'use strict';


function solve() {
    return function() {
        $.fn.listview = function(data) {
            var $this = $(this),
                $id = $this.attr('data-template'),
                $template = $('#' + $id).html();

            var compilerTemplate = handlebars.compile($template);

            for (var i = 0; i < data.length; i++) {
                $this.append(compilerTemplate(data[i]));
            }

            return this;
        };
    };
}

var result = solve();
var data = [],
    count = 5,
    id = 'list-view';

document.body.innerHTML = '<ul id="' + id + '" data-template="item-template"></ul>' +
    '<script id="item-template" type="text/handlebars-template"><li>{{this}}</li></script>';
result();
var count = 5,
    data = Array.apply(null, { length: count })
    .map(Number.call, Number)


$('#' + id).listview(data);

var $listview = $('#' + id);

var $items = $listview.find('li');
console.log($items);

$items.each(function(index, item) {
    console.log(item.innerHTML);
    console.log(data[index].toString());
});
// module.exports = solve;