  /* globals $ */

  /* 

  Create a function that takes an id or DOM element and an array of contents

  * if an id is provided, select the element
  * Add divs to the element
    * Each div's content must be one of the items from the contents array
  * The function must remove all previous content from the DOM element provided
  * Throws if:
    * The provided first parameter is neither string or existing DOM element
    * The provided id does not select anything (there is no element that has such an id)
    * Any of the function params is missing
    * Any of the function params is not as described
    * Any of the contents is neight `string` or `number`
      * In that case, the content of the element **must not be** changed   
  */


  module.exports = function() {
      var VALIDATION = {
          validateElement: function(el) {
              if (typeof el !== 'string' && el.tagName === false) {
                  throw new Error('Invalid element parameter!');
              }
          },
          idExist: function(id) {
              if (id === null) {
                  throw new Error('No element that has such an Id');
              }
          },
          missingParams: function(func) {
              if (func.length !== 2) {
                  throw new Error('Missing params!');
              }
          },
          validateContents: function(content) {
              content.forEach(function(x) {

                  if (typeof x !== 'string' && typeof x !== 'number') {
                      throw new Error('Invalid content');
                  }
              })
          },

      };

      return function(element, contents) {
          // VALIDATIONs
          VALIDATION.validateElement(element);
          VALIDATION.missingParams(arguments);
          VALIDATION.validateContents(contents);

          // create elements
          var getElement = '',
              el = document.createDocumentFragment(),
              div = document.createElement('div');

          // check element
          if (element.tagName) {
              getElement = element;
          } else {
              getElement = document.getElementById(element);
              VALIDATION.idExist(el);
          }

          // Remove all elements 
          while (getElement.firstChild) {
              getElement.removeChild(getElement.firstChild);
          }

          // create elements
          for (var i = 0; i < contents.length; i++) {
              var newDiv = div.cloneNode(true);
              newDiv.innerHTML = contents[i];
              el.appendChild(newDiv);
          }

          getElement.appendChild(el);
      }
  };