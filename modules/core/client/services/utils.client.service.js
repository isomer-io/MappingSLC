'use strict';

angular.module('core').service('UtilsService', ['$http', '$window',
  function($http, $window) {


    //logic for css on the contact form

    this.cssLayout = function () {
      [].slice.call(document.querySelectorAll('input.input_field'))

        .forEach(function (inputEl) {
          // in case the input is already filled
          if (inputEl.value.trim() !== '') {
            classie.add(inputEl.parentNode, 'input-filled');
          }
          // events
          inputEl.addEventListener('focus', onInputFocus);
          inputEl.addEventListener('blur', onInputBlur);
        });

      function onInputFocus(ev) {
        classie.add(ev.target.parentNode, 'input-filled');
      }

      function onInputBlur(ev) {
        if (ev.target.value.trim() === '') {
          classie.remove(ev.target.parentNode, 'input-filled');
        }
      }
    };


  }
]);
