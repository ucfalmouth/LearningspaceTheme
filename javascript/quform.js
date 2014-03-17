/*!
 * Quform jQuery plugin
 *
 * Copyright (c) 2009 - 2013 ThemeCatcher
 */
;(function($) {
  var Quform = function($form, options) {
    var self = this,
      submitted = false,
      useProp = !!$.fn.prop;

    // Class properties
    self.$form = $form;
    self.options = options;
    self.$container = $(options.container, $form);
    self.$loading = $(options.loading, $form);
    self.$submitButton = $(options.submitButton, $form);

    /**
     * Form reset
     *
     * Resets the form to its original state
     *
     * @param boolean resetValues If true it also resets form values
     */
    self.reset = function (resetValues) {
      // Reload the recaptcha, we can't use it twice
      if (typeof Recaptcha === 'object') {
        try {
          Recaptcha.reload();
        } catch (e) {}
      }

      // Allow the form to be submitted again
      submitted = false;
      self.$submitButton[useProp ? 'prop' : 'attr']('disabled', false);

      // Hide the loading text/gif
      self.$loading.stop(true, true).hide();

      // Remove any previous errors/success messages from the form
            $('.quform-success-message', $form).remove();
            $('.quform-error-message', $form).remove();
            $('.quform-has-error', $form).removeClass('quform-has-error');
            $('.quform-errors-wrap', $form).remove();

            if (options.reset && resetValues) {
              // Reset the form
              $form.resetForm();
      }
    };

    /**
     * Display an error message above the form
     *
     * @param string html The error message HTML
     */
    self.errorMessage = function (html, showTitle) {
      // Display the message
      var $message = $('<div class="quform-error-message"/>');

      if (showTitle !== false) {
          $message.append($('<div class="quform-error-title"/>').html(options.errorTitle));
      }

          $message.append(html)
                  .hide();

          if (options.errorPosition == 'below') {
              $message.insertAfter(self.$container);
          } else {
              $message.insertBefore(self.$container);
          }

          $message.fadeIn('slow');

      self.scrollTo($message);
    };

    /**
     * Scroll to a DOM element if it's not in the current viewport
     *
     * @param object $target The jQuery object to scroll to
     */
    self.scrollTo = function ($target) {
        if (options.scrolling && $target && $target.length && $(window).scrollTop() >= ($target.offset().top - options.scrollThreshold)) {
                $.smoothScroll({
                    offset: options.scrollOffset,
                    scrollTarget: $target,
                    speed: options.scrollSpeed
                });
            }
    };

    // Bind on submit to submit via Ajax
    $form.bind('submit', function (event) {
      // Prevent double submit
      if (submitted) {
        return false;
      } else {
        submitted = true;
        self.$submitButton[useProp ? 'prop' : 'attr']('disabled', true);
      }

      // Prevent the browser submitting the form normally
      event.preventDefault();

      // Show the loading text/gif
      self.$loading.fadeIn('slow');

      // Submit the form
      $form.ajaxSubmit({
        async: false,
        dataType: 'json',
        data: { 'quform_ajax': 1 },
        iframe: true,
        success: function(response) {
          // Check if the form submission was successful
          if (response === null || typeof response === 'undefined') {
            self.reset();
            self.errorMessage(options.errorResponseEmpty);
          } else if (typeof response === 'object') {
            if (response.type === 'success') {
              if (typeof response.redirect === 'string') {
                window.location = response.redirect;
                return;
              }

              // successStart function
              if (typeof options.successStart === 'function') {
                options.successStart.call(self, response);
              }

              // Check for a custom success function
              if (typeof options.success === 'function') {
                options.success.call(self, response);
              } else {
                var success = function () {
                  // Reset the form
                  self.reset(true);

                              // Create a new success message
                              var $successMessage = $('<div class="quform-success-message"/>').html(response.message).hide().insertBefore(self.$container).fadeIn(options.successFadeInSpeed).show(0, function() {
                                    // successEnd function
                                    if (typeof options.successEnd === 'function') {
                                          options.successEnd.call(self, response, $successMessage);
                                    }
                              });

                              // Scroll to the success message if it's not visible
                              self.scrollTo($successMessage);

                              // Fade out the success message after some time
                              if (options.successTimeout > 0) {
                                setTimeout(function () {
                                    $successMessage.fadeOut(options.successFadeOutSpeed).hide(0, function () {
                                      $successMessage.remove();
                                    });
                                }, options.successTimeout);
                              }
                };

                if (options.hideFormSpeed) {
                  self.$container.fadeOut(options.hideFormSpeed).hide(0, function () {
                    success();
                  });
                } else {
                  success();
                }
              }
            } else if (response.type == 'error') {
              // errorStart callback
              if (typeof options.errorStart === 'function') {
                options.errorStart.call(self, response);
              }

              // Check for a custom error function
              if (typeof options.error === 'function') {
                options.error.call(self, response);
              } else {
                  var scrolled = false;
                // Reset the form (keep form values)
                self.reset();

                if (response.error.length) {
                    self.errorMessage(response.error, false);
                    scrolled = true;
                }

                var $firstError;

                // Go through each element containing errors
                $.each(response.elementErrors, function(index, info) {
                  // If there are errors for this element
                  if (typeof info.errors === 'object' && info.errors.length > 0) {
                    // Save a reference to this element
                    var $element = $("[name='" + index + "']", $form);

                    // If the element exists
                    if ($element.length) {
                      // Create a blank error list
                      var $errorList = $('<div class="quform-errors quform-cf"/>'),
                      $errorWrap = $('<div class="quform-errors-wrap"/>').append($errorList);

                      // Append the error
                      $errorList.append('<div class="quform-error">' + info.errors[0] + '</div>');

                      // Add the error list after the element's wrapper
                      $element.parents('.quform-input').append($errorWrap).end().parents('.quform-element').addClass('quform-has-error');

                      // Save the first error so we can scroll to it
                      if (!$firstError) $firstError = $element;
                    } else {
                      alert("Element '" + index + "' does not exist in the HTML but is being validated, you must also remove the element configuration from process.php");
                    }
                  }
                });

                // Fade all errors in
                $('.quform-errors', $form).fadeIn('slow');

                // Scroll to the first error
                if (!scrolled) {
                    self.scrollTo($firstError);
                }

                // errorEnd callback
                if (typeof options.errorEnd === 'function') {
                  options.errorEnd.call(self, response);
                }
              }
            } // response.type == 'error'
          } // typeof response === 'object'
        },
        error: function (response) {
          // Reset the form
          self.reset();

          if (typeof response.responseText === 'string' && response.responseText.length > 0) {
            self.errorMessage('<pre>' + response.responseText + '</pre>');
          } else {
            self.errorMessage(options.errorAjax);
          }
        }
      }); // $form.ajaxSubmit()
    }); // $form.bind('submit')
  }; // var Quform

  $.fn.Quform = function (options) {
    var defaults = {
      container: '.quform-elements',
      loading: '.quform-loading-wrap',
      submitButton: '.quform-submit',
      reset: true,
      hideFormSpeed: false,
      successFadeInSpeed: 'slow',
      successFadeOutSpeed: 'slow',
      successTimeout: 8000,
      scrolling: true,
      scrollSpeed: 400,
      scrollThreshold: 20,
      scrollOffset: -50,
      errorTitle: 'There was a problem',
      errorResponseEmpty: 'An error occurred and the response from the server was empty.',
      errorAjax: 'An Ajax error occurred.',
      errorPosition: 'above'
    },
    settings = $.extend({}, defaults, options);

    if (!$.isFunction($.fn.smoothScroll)) {
      settings.scrolling = false;
    }

    return this.each(function () {
      var $this = $(this);
      if (!$this.data('quform')) {
        $this.data('quform', new Quform($(this), settings));
      }
    });
  }; // End $.fn.Quform
})(jQuery); // End jQuery wrapper

/*
 * Replace a select menu with a text input field
 */
(function($) {
  $.fn.replaceSelectWithTextInput = function (options) {
    var defaults = {
      onValue: 'Other',
      cancel: 'Cancel'
    };

    options = $.extend({}, defaults, options);

    return this.each(function () {
      var $this = $(this),
      $wrapper = $this.parent(),
      $element = $this.parents('.quform-element').addClass('quform-select-replaced'),
      html = $wrapper.html();

      $wrapper.delegate('select', 'change', function () {
        if ($(this).val() == options.onValue) {
          $wrapper.html('<input type="text" name="' + $this.attr('name') + '" id="' + $this.attr('id') + '" value="" />');
          $element.removeClass('quform-element-select').addClass('quform-element-text');

          $cancel = $('<a>').click(function () {
            $wrapper.html(html);
            $element.removeClass('quform-element-text').addClass('quform-element-select');
            $(this).remove();
            return false;
          }).attr('href', '#').addClass('quform-cancel-button').attr('title', options.cancel);

          $wrapper.append($cancel);
        }
      });

      $this.change();
    });
  };
})(jQuery);

/*
 * Image preloader (Needed for quform)
 *
 * Usage: $.preloadImages([array of paths], 'common path prefix');
 */
(function(b){b.preloadImages=function(d,a){for(var a=a?a:"",f=[],c=0;c<d.length;c++){var e=new Image;e.src=a+d[c];f.push(e)}}})(jQuery);

/*! Smooth Scroll - v1.4.9 - 2013-01-21
* https://github.com/kswedberg/jquery-smooth-scroll
* Copyright (c) 2013 Karl Swedberg; Licensed MIT
*
* Modified by ThemeCatcher to be compatible with jQuery Tools Scrollable
* The following code was removed from the original file:
*
*   scrollable: function(dir) {
*     var scrl = getScrollable.call(this, {dir: dir});
*     return this.pushStack(scrl);
*   },
*/
(function(b){function m(b){return b.replace(/(:|\.)/g,"\\$1")}b.fn.extend({firstScrollable:function(e){var c=[],a=!1,f=e&&"left"==e?"scrollLeft":"scrollTop";this.each(function(){if(!(this==document||this==window)){var d=b(this);0<d[f]()?c.push(this):(d[f](1),(a=0<d[f]())&&c.push(this),d[f](0))}});c.length||this.each(function(){"BODY"===this.nodeName&&(c=[this])});1<c.length&&(c=[c[0]]);return this.pushStack(c)},smoothScroll:function(e){e=e||{};var c=b.extend({},b.fn.smoothScroll.defaults,e),a=b.smoothScroll.filterPath(location.pathname); this.unbind("click.smoothscroll").bind("click.smoothscroll",function(e){var d=b(this),g=c.exclude,j=c.excludeWithin,h=0,k=0,l=!0,n={},q=location.hostname===this.hostname||!this.hostname,r=c.scrollTarget||(b.smoothScroll.filterPath(this.pathname)||a)===a,p=m(this.hash);if(!c.scrollTarget&&(!q||!r||!p))l=!1;else{for(;l&&h<g.length;)d.is(m(g[h++]))&&(l=!1);for(;l&&k<j.length;)d.closest(j[k++]).length&&(l=!1)}l&&(e.preventDefault(),b.extend(n,c,{scrollTarget:c.scrollTarget||p,link:this}),b.smoothScroll(n))}); return this}});b.smoothScroll=function(e,c){var a,f,d,g;g=0;var j="offset",h="scrollTop",k={};d={};"number"===typeof e?(a=b.fn.smoothScroll.defaults,d=e):(a=b.extend({},b.fn.smoothScroll.defaults,e||{}),a.scrollElement&&(j="position","static"==a.scrollElement.css("position")&&a.scrollElement.css("position","relative")));a=b.extend({link:null},a);h="left"==a.direction?"scrollLeft":h;a.scrollElement?(f=a.scrollElement,g=f[h]()):f=b("html, body").firstScrollable();a.beforeScroll.call(f,a);d="number"=== typeof e?e:c||b(a.scrollTarget)[j]()&&b(a.scrollTarget)[j]()[a.direction]||0;k[h]=d+g+a.offset;g=a.speed;"auto"===g&&(g=k[h]||f.scrollTop(),g/=a.autoCoefficent);d={duration:g,easing:a.easing,complete:function(){a.afterScroll.call(a.link,a)}};a.step&&(d.step=a.step);f.length?f.stop().animate(k,d):a.afterScroll.call(a.link,a)};b.smoothScroll.version="1.4.9";b.smoothScroll.filterPath=function(b){return b.replace(/^\//,"").replace(/(index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")};b.fn.smoothScroll.defaults= {exclude:[],excludeWithin:[],offset:0,direction:"top",scrollElement:null,scrollTarget:null,beforeScroll:function(){},afterScroll:function(){},easing:"swing",speed:400,autoCoefficent:2}})(jQuery);