'use strict';

$('.btn').on('click', function() {
    var $this = $(this);
    var $node = $this.next();
    debugger;
    while ($node.length) {
        $node.toggleClass('hidden');
        $node = $node.next();
    }
});