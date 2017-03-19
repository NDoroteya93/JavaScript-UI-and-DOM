// $(function() {
//     $.fn.dropdownList = function() {
//         var select = $(this);
//     }
// });

function solve() {
    return function(selector) {

        // selector
        var $selector = $(selector)
            .css('display', 'none');
        var $h1 = $('body');
        var $options = $selector.find('option');

        // dropdown list
        var $dropDownList = $('<div/>')
            .addClass('dropdown-list')
            .append($selector);
        $h1.append($dropDownList);
        // current option
        var $currentOption = $('<div/>')
            .addClass('current')
            .attr('data-value', '')
            .html('Option 1')
            .appendTo($dropDownList);

        // option container
        var $optionContainer = $('<div/>')
            .addClass('options-container')
            .css({ 'position': 'absolute', 'display': 'none' })
            .appendTo($dropDownList);

        for (var i = 0; i < $options.length; i++) {

            var $dropdownItem = $('<div />');
            $dropdownItem
                .addClass('dropdown-item')
                .attr({ 'data-value': $options[i].value, 'data-index': $options[i].index })
                .html($options[i].innerHTML)
                .appendTo($optionContainer);
        }

        var $dropdownItems = $('.dropdown-item');
        // click event 
        $currentOption.on('click', function() {
            var $this = $(this);
            if ($optionContainer.css('display') === 'none') {
                $optionContainer.css('display', '');
                $this.html('Select');
            } else {
                $optionContainer.css('display', 'none');
            }
        });

        $dropdownItems.on('click', function() {

            var $currentItem = $(this),
                $data = $currentItem.attr('data-value'),
                $text = $currentItem.html();
            $currentOption
                .attr('data-value', $data)
                .html($text);
            $optionContainer.css('display', 'none');
            $selector.val($data);
        });

    };
}
// var result = solve();
// var id = 'the-select',
//     select = document.createElement('select'),
//     count = 5;
// select.id = id;

// for (var i = 0; i < count; i += 1) {
//     var option = document.createElement('option');
//     option.innerHTML = 'Option #' + (i + 1);
//     option.value = (i + 1) + '';
//     select.appendChild(option);
// }

// document.body.innerHTML = select.outerHTML;

// result('#' + id);

// var clickEvent = document.createEvent('MouseEvents');
// clickEvent.initMouseEvent('click', true, true);

// var $dropdown = $('.dropdown-list');

// var $current = $dropdown.find('.current');
// $current.get(0).dispatchEvent(clickEvent);

// debugger;
// var clickedOption = $dropdown.find('.dropdown-item').get(Math.floor(count / 2));
// clickedOption.dispatchEvent(clickEvent);

// console.log($('#' + id).val()) //
// console.log(clickedOption.getAttribute('data-value'));

// var $options = $dropdown.find('.dropdown-item');

// $options.each(function(index, option) {
//     var $option = $(option);
//     var $node = $option;
//     while (!($node.hasClass('dropdown-list')) && $node.css('display') !== 'none') {
//         $node = $node.parent();
//     }

//     console.log($node.hasClass('dropdown-list')) //not.to.be.true;
// });

module.exports = solve;