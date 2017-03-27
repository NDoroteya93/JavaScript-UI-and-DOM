/* globals document, window, console */
"use strict";

function solve() {
    return function(selector, initialSuggestions) {
        const VALIDATION = {
            isString: function(str) {
                if (typeof str !== 'string') {
                    throw new Error('Invalid string!');
                }
            },
            existElement: function(element) {
                if (element === null) {
                    throw new Error('Invalid selector!')
                }
            },
            isArray: function(arr) {
                if (!Array.isArray(arr)) {
                    throw new Error('Invalid Array!');
                }
            }
        }
        let element = document.querySelector(selector),
            suggestionsList = document.querySelector('.suggestions-list'),
            df = document.createDocumentFragment();

        VALIDATION.isString(selector);
        VALIDATION.existElement(element);
        // if exist
        if (initialSuggestions.length > 0) {
            VALIDATION.isArray(initialSuggestions);
            initialSuggestions.forEach(x => VALIDATION.isString(x));
        }

        // create li 
        let suggestion = document.createElement('li');
        suggestion.className = 'suggestion';
        suggestion.style.display = 'none';

        // suggestion link 
        let suggestionLink = document.createElement('a');
        suggestionLink.setAttribute('href', '#');
        suggestionLink.className = 'suggestion-link';

        // create list
        for (let i = 0; i < initialSuggestions.length; i++) {
            let cloneSuggestion = suggestion.cloneNode(true);
            let cloneSugestionLink = suggestionLink.cloneNode(true);
            cloneSuggestion.setAttribute('data-value', initialSuggestions[i]);
            cloneSugestionLink.innerHTML = initialSuggestions[i];
            cloneSuggestion.appendChild(cloneSugestionLink);

            df.appendChild(cloneSuggestion);
        }
        suggestionsList.appendChild(df);


        let allSuggestions = document.querySelectorAll('.suggestion');
        let allLinks = document.querySelectorAll('.suggestion-link');
        // serach

        let input = document.querySelector('.tb-pattern');
        input.addEventListener('input', search, false);

        // add button 

        let addBtn = document.querySelector('.btn-add');
        addBtn.addEventListener('click', onClick, false);

        // select

        for (var i = 0; i < allLinks.length; i++) {
            allLinks[i].addEventListener('click', select, false);
        }

        function search(pattern) {

            var value = pattern.target.value;
            for (var i = 0; i < allSuggestions.length; i++) {
                if (allSuggestions[i].getAttribute('data-value').toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                    allSuggestions[i].style.display = '';
                } else {
                    allSuggestions[i].style.display = 'none';
                }
                if (value === '') {
                    allSuggestions[i].style.display = 'none';
                }

            }
        }

        function select(e) {
            let selectElement = e.target.innerHTML;
            input.value = selectElement;
        }

        function onClick(el) {
            debugger;
            let value = input.value,
                isAdded = false;
            for (var i = 0; i < allSuggestions.length; i++) {
                if (allSuggestions[i].getAttribute('data-value') === value) {
                    isAdded = true;
                }
            }

            if (!isAdded) {
                let cloneSuggestion = suggestion.cloneNode(true);
                let cloneSugestionLink = suggestionLink.cloneNode(true);
                cloneSuggestion.setAttribute('data-value', value);
                cloneSugestionLink.innerHTML = value;
                cloneSuggestion.appendChild(cloneSugestionLink);

                suggestionsList.appendChild(cloneSuggestion);
            }

            allSuggestions = document.querySelectorAll('.suggestion');
            allLinks = document.querySelectorAll('.suggestion-link');

            input.value = '';
        }


    };
}

module.exports = solve;