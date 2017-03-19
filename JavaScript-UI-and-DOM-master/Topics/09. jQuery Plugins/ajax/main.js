// $(function() {
//     $('#tb-filter').on('keyup', function() {
//         var value = $(this).val().toLowerCase();
//         if (value.length < 3) {
//             $('#countries').html('');
//             return;
//         }

//         $.get('http://restcountries.eu/rest/v1/name' + value)
//         .success(function(respCountries){
//             var $countriesList = createCountriesList(respCountries){}
//         })
//     });
// })

// $(function($) {
//     $.fn.alertMe = function() {
//         $(this).on('click', function() {
//             alert('alert');
//         })
//     }
// })(jQuery)

// PrintIn

jQuery.fn.printIn = function() {
    // Joinall the arguments into a space-separate string
    var msg = Array.prototype.join.call(arguments, ' ');

    // Loop through each element in the jQuery object
    this.each(function() {
        // For each one, append the string as plain text, then appendd a ,/br
        jQuery(this).append(document.createTextNode(msg)).append('</br>');
    });

    // Return the unmodifed jQuert objext for method chaining
    return this;
}