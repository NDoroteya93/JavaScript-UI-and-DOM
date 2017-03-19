$.fn.colorpicker = function() {

    var $this = $(this);

    // create button
    var $showBtn = $('<a/>');
    $showBtn.attr({ 'href': '#' });
    $showBtn.addClass('showBtn');
    $this.append($showBtn);

    // create div 
    var $div = $('<div/>');
    $div.addClass('colorpicker-container')
        .addClass('hidden');
    $this.append($div);

    // close button
    var $closeBtn = $('<div>')
        .addClass('closeBtn')
        .appendTo($div);

    // create canvas 
    $('<canvas>').attr({
        id: 'canvas'
    }).css({
        width: '300px',
        height: '300px'
    }).appendTo($div);

    // onload
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var img = document.getElementById("colorpickerImg");

    make_base();

    // create image
    function make_base() {
        base_image = new Image();
        base_image.src = './imgs/color-picker.png';
        base_image.onload = function() {
            context.drawImage(base_image, 0, 0, 300, 150);
            base_image.style.display = 'none';
        }
    }
    $('<div>')
        .attr({ 'id': 'color' })
        .appendTo($div);
    // create input container
    var $inputContainer = $('<div>')
        .addClass('input-container')
        .appendTo($div);
    // create input HEX
    var $hexInput = $('<input>')
        .attr({ 'type': 'text', 'placeholder': 'HEX' })
        .addClass('hex-input')
        .appendTo($inputContainer);

    // create input rgb
    var $rgbInput = $('<input>')
        .attr({ 'type': 'text', 'placeholder': 'RGB' })
        .addClass('rgb-input')
        .appendTo($inputContainer);

    // create color-container
    var $colorContainer = $('<div>')
        .addClass('color-container')
        .appendTo($inputContainer);

    var color = document.getElementById('color');

    function findPos(obj) {
        var current_left = 0,
            current_top = 0;
        if (obj.offsetParent) {
            do {
                current_left += obj.offsetLeft;
                current_top += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return { x: current_left, y: current_top };
        }
        return undefined;
    }

    function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }


    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    // Events

    $showBtn.on('click', function() {
        debugger;
        if ($div.hasClass('hidden')) {
            $div.removeClass('hidden');
        } else {
            $div.addClass('hidden');
        }
    });

    // close btn 
    $closeBtn.on('click', function() {
        $div.addClass('hidden');
    })

    // change cursor
    $("canvas").css('cursor', 'url(./imgs/cursor.png),auto');

    // get color on click
    $div.on('click', '#canvas', function(e) {
        var pos = findPos(this);
        var x = e.pageX - pos.x;
        var y = e.pageY - pos.y;
        var coord = "x=" + x + ", y=" + y;
        var c = this.getContext('2d');
        var p = c.getImageData(x, y, 1, 1).data;
        var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
        $colorContainer.css('background', hex);
        $hexInput.val(hex);
        $rgbInput.val(p[0] + ',' + p[1] + ',' + p[2]);
    });

    $div.on('input', $hexInput, function(e) {
        debugger;
        var $val = $(this).val();
        $colorContainer.css('background', $val);
        $rgbInput.val(hexToRgb($val))
    });


}