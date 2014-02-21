// @codekit-prepend  "jquery-10.js";


//----------------------------------------------------------
// tooltip.js
//----------------------------------------------------------
/* ===========================================================
 * bootstrap-tooltip.js v2.3.2
 * http://twbs.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut
        , triggers
        , trigger
        , i

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      triggers = this.options.trigger.split(' ')

      for (i = triggers.length; i--;) {
        trigger = triggers[i]
        if (trigger == 'click') {
          this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
        } else if (trigger != 'manual') {
          eventIn = trigger == 'hover' ? 'mouseenter' : 'focus'
          eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'
          this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
          this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
        }
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, this.$element.data(), options)

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var defaults = $.fn[this.type].defaults
        , options = {}
        , self

      this._options && $.each(this._options, function (key, value) {
        if (defaults[key] != value) options[key] = value
      }, this)

      self = $(e.currentTarget)[this.type](options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp
        , e = $.Event('show')

      if (this.hasContent() && this.enabled) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        $tip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })

        this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

        pos = this.getPosition()

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        this.applyPlacement(tp, placement)
        this.$element.trigger('shown')
      }
    }

  , applyPlacement: function(offset, placement){
      var $tip = this.tip()
        , width = $tip[0].offsetWidth
        , height = $tip[0].offsetHeight
        , actualWidth
        , actualHeight
        , delta
        , replace

      $tip
        .offset(offset)
        .addClass(placement)
        .addClass('in')

      actualWidth = $tip[0].offsetWidth
      actualHeight = $tip[0].offsetHeight

      if (placement == 'top' && actualHeight != height) {
        offset.top = offset.top + height - actualHeight
        replace = true
      }

      if (placement == 'bottom' || placement == 'top') {
        delta = 0

        if (offset.left < 0){
          delta = offset.left * -2
          offset.left = 0
          $tip.offset(offset)
          actualWidth = $tip[0].offsetWidth
          actualHeight = $tip[0].offsetHeight
        }

        this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
      } else {
        this.replaceArrow(actualHeight - height, actualHeight, 'top')
      }

      if (replace) $tip.offset(offset)
    }

  , replaceArrow: function(delta, dimension, position){
      this
        .arrow()
        .css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()
        , e = $.Event('hide')

      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).detach()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.detach()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.detach()

      this.$element.trigger('hidden')

      return this
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function () {
      var el = this.$element[0]
      return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
        width: el.offsetWidth
      , height: el.offsetHeight
      }, this.$element.offset())
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , arrow: function(){
      return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function (e) {
      var self = e ? $(e.currentTarget)[this.type](this._options).data(this.type) : this
      self.tip().hasClass('in') ? self.hide() : self.show()
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  var old = $.fn.tooltip

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }


 /* TOOLTIP NO CONFLICT
  * =================== */

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);

//----------------------------------------------------------
// bs-popover.js
//----------------------------------------------------------
/* ===========================================================
 * bootstrap-popover.js v2.3.2
 * http://twbs.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)
        || $e.attr('data-content')

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


 /* POPOVER NO CONFLICT
  * =================== */

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);


//----------------------------------------------------------
// bootstrap-dropdown.js
//----------------------------------------------------------
/* ============================================================
 * bootstrap-dropdown.js v2.3.2
 * http://twbs.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        if ('ontouchstart' in document.documentElement) {
          // if mobile we we use a backdrop because click events don't delegate
          $('<div class="dropdown-backdrop"/>').insertBefore($(this)).on('click', clearMenus)
        }
        $parent.toggleClass('open')
      }

      $this.focus()

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) {
        if (e.which == 27) $parent.find(toggle).focus()
        return $this.click()
      }

      $items = $('[role=menu] li:not(.divider):visible a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    $('.dropdown-backdrop').remove()
    $(toggle).each(function () {
      getParent($(this)).removeClass('open')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = selector && $(selector)

    if (!$parent || !$parent.length) $parent = $this.parent()

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


 /* DROPDOWN NO CONFLICT
  * ==================== */

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(document)
    .on('click.dropdown.data-api', clearMenus)
    .on('click.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);


//----------------------------------------------------------
// jquery-sidr.js
//----------------------------------------------------------
/*! Sidr - v1.1.1 - 2013-03-14
 * https://github.com/artberri/sidr
 * Copyright (c) 2013 Alberto Varela; Licensed MIT */
(function (e) {
    var t = !1,
        i = !1,
        o = {
            isUrl: function (e) {
                var t = RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");
                return t.test(e) ? !0 : !1
            },
            loadContent: function (e, t) {
                e.html(t)
            },
            addPrefix: function (e) {
                var t = e.attr("id"),
                    i = e.attr("class");
                "string" == typeof t && "" !== t && e.attr("id", t.replace(/([A-Za-z0-9_.\-]+)/g, "sidr-id-$1")), "string" == typeof i && "" !== i && "sidr-inner" !== i && e.attr("class", i.replace(/([A-Za-z0-9_.\-]+)/g, "sidr-class-$1")), e.removeAttr("style")
            },
            execute: function (o, n, s) {
                "function" == typeof n ? (s = n, n = "sidr") : n || (n = "sidr");
                var a, d, l, c = e("#" + n),
                    f = e(c.data("body")),
                    u = e("html"),
                    p = c.outerWidth(!0),
                    y = c.data("speed"),
                    v = c.data("side");
                if ("open" === o || "toogle" === o && !c.is(":visible")) {
                    if (c.is(":visible") || t) return;
                    if (i !== !1) return r.close(i, function () {
                        r.open(n)
                    }), void 0;
                    t = !0, "left" === v ? (a = {
                        left: p + "px"
                    }, d = {
                        left: "0px"
                    }) : (a = {
                        right: p + "px"
                    }, d = {
                        right: "0px"
                    }), l = u.scrollTop(), u.css("overflow-x", "hidden").scrollTop(l), f.css({
                        width: f.width(),
                        position: "absolute"
                    }).animate(a, y), c.css("display", "block").animate(d, y, function () {
                        t = !1, i = n, "function" == typeof s && s(n)
                    })
                } else {
                    if (!c.is(":visible") || t) return;
                    t = !0, "left" === v ? (a = {
                        left: 0
                    }, d = {
                        left: "-" + p + "px"
                    }) : (a = {
                        right: 0
                    }, d = {
                        right: "-" + p + "px"
                    }), l = u.scrollTop(), u.removeAttr("style").scrollTop(l), f.animate(a, y), c.animate(d, y, function () {
                        c.removeAttr("style"), f.removeAttr("style"), e("html").removeAttr("style"), t = !1, i = !1, "function" == typeof s && s(n)
                    })
                }
            }
        }, r = {
            open: function (e, t) {
                o.execute("open", e, t)
            },
            close: function (e, t) {
                o.execute("close", e, t)
            },
            toogle: function (e, t) {
                o.execute("toogle", e, t)
            }
        };
    e.sidr = function (t) {
        return r[t] ? r[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "function" != typeof t && "string" != typeof t && t ? (e.error("Method " + t + " does not exist on jQuery.sidr"), void 0) : r.toogle.apply(this, arguments)
    }, e.fn.sidr = function (t) {
        var i = e.extend({
            name: "sidr",
            speed: 200,
            side: "left",
            source: null,
            renaming: !0,
            body: "body"
        }, t),
            n = i.name,
            s = e("#" + n);
        if (0 === s.length && (s = e("<div />").attr("id", n).appendTo(e("body"))), s.addClass("sidr").addClass(i.side).data({
            speed: i.speed,
            side: i.side,
            body: i.body
        }), "function" == typeof i.source) {
            var a = i.source(n);
            o.loadContent(s, a)
        } else if ("string" == typeof i.source && o.isUrl(i.source)) e.get(i.source, function (e) {
            o.loadContent(s, e)
        });
        else if ("string" == typeof i.source) {
            var d = "",
                l = i.source.split(",");
            if (e.each(l, function (t, i) {
                d += '<div class="sidr-inner">' + e(i).html() + "</div>"
            }), i.renaming) {
                var c = e("<div />").html(d);
                c.find("*").each(function (t, i) {
                    var r = e(i);
                    o.addPrefix(r)
                }), d = c.html()
            }
            o.loadContent(s, d)
        } else null !== i.source && e.error("Invalid Sidr Source");
        return this.each(function () {
            var t = e(this),
                i = t.data("sidr");
            i || (t.data("sidr", n), t.click(function (e) {
                e.preventDefault(), r.toogle(n)
            }))
        })
    }
})(jQuery);
//----------------------------------------------------------
// Classie.js
//----------------------------------------------------------

/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );

//----------------------------------------------------------
// Placeholder.js
//----------------------------------------------------------
/* Placeholders.js v3.0.2 */
(function(t){"use strict";function e(t,e,r){return t.addEventListener?t.addEventListener(e,r,!1):t.attachEvent?t.attachEvent("on"+e,r):void 0}function r(t,e){var r,n;for(r=0,n=t.length;n>r;r++)if(t[r]===e)return!0;return!1}function n(t,e){var r;t.createTextRange?(r=t.createTextRange(),r.move("character",e),r.select()):t.selectionStart&&(t.focus(),t.setSelectionRange(e,e))}function a(t,e){try{return t.type=e,!0}catch(r){return!1}}t.Placeholders={Utils:{addEventListener:e,inArray:r,moveCaret:n,changeType:a}}})(this),function(t){"use strict";function e(){}function r(){try{return document.activeElement}catch(t){}}function n(t,e){var r,n,a=!!e&&t.value!==e,u=t.value===t.getAttribute(V);return(a||u)&&"true"===t.getAttribute(P)?(t.removeAttribute(P),t.value=t.value.replace(t.getAttribute(V),""),t.className=t.className.replace(R,""),n=t.getAttribute(z),parseInt(n,10)>=0&&(t.setAttribute("maxLength",n),t.removeAttribute(z)),r=t.getAttribute(D),r&&(t.type=r),!0):!1}function a(t){var e,r,n=t.getAttribute(V);return""===t.value&&n?(t.setAttribute(P,"true"),t.value=n,t.className+=" "+I,r=t.getAttribute(z),r||(t.setAttribute(z,t.maxLength),t.removeAttribute("maxLength")),e=t.getAttribute(D),e?t.type="text":"password"===t.type&&K.changeType(t,"text")&&t.setAttribute(D,"password"),!0):!1}function u(t,e){var r,n,a,u,i,l,o;if(t&&t.getAttribute(V))e(t);else for(a=t?t.getElementsByTagName("input"):f,u=t?t.getElementsByTagName("textarea"):h,r=a?a.length:0,n=u?u.length:0,o=0,l=r+n;l>o;o++)i=r>o?a[o]:u[o-r],e(i)}function i(t){u(t,n)}function l(t){u(t,a)}function o(t){return function(){b&&t.value===t.getAttribute(V)&&"true"===t.getAttribute(P)?K.moveCaret(t,0):n(t)}}function c(t){return function(){a(t)}}function s(t){return function(e){return A=t.value,"true"===t.getAttribute(P)&&A===t.getAttribute(V)&&K.inArray(C,e.keyCode)?(e.preventDefault&&e.preventDefault(),!1):void 0}}function d(t){return function(){n(t,A),""===t.value&&(t.blur(),K.moveCaret(t,0))}}function v(t){return function(){t===r()&&t.value===t.getAttribute(V)&&"true"===t.getAttribute(P)&&K.moveCaret(t,0)}}function g(t){return function(){i(t)}}function p(t){t.form&&(T=t.form,"string"==typeof T&&(T=document.getElementById(T)),T.getAttribute(U)||(K.addEventListener(T,"submit",g(T)),T.setAttribute(U,"true"))),K.addEventListener(t,"focus",o(t)),K.addEventListener(t,"blur",c(t)),b&&(K.addEventListener(t,"keydown",s(t)),K.addEventListener(t,"keyup",d(t)),K.addEventListener(t,"click",v(t))),t.setAttribute(j,"true"),t.setAttribute(V,x),(b||t!==r())&&a(t)}var f,h,b,m,A,y,E,x,L,T,S,N,w,B=["text","search","url","tel","email","password","number","textarea"],C=[27,33,34,35,36,37,38,39,40,8,46],k="#ccc",I="placeholdersjs",R=RegExp("(?:^|\\s)"+I+"(?!\\S)"),V="data-placeholder-value",P="data-placeholder-active",D="data-placeholder-type",U="data-placeholder-submit",j="data-placeholder-bound",q="data-placeholder-focus",Q="data-placeholder-live",z="data-placeholder-maxlength",F=document.createElement("input"),G=document.getElementsByTagName("head")[0],H=document.documentElement,J=t.Placeholders,K=J.Utils;if(J.nativeSupport=void 0!==F.placeholder,!J.nativeSupport){for(f=document.getElementsByTagName("input"),h=document.getElementsByTagName("textarea"),b="false"===H.getAttribute(q),m="false"!==H.getAttribute(Q),y=document.createElement("style"),y.type="text/css",E=document.createTextNode("."+I+" { color:"+k+"; }"),y.styleSheet?y.styleSheet.cssText=E.nodeValue:y.appendChild(E),G.insertBefore(y,G.firstChild),w=0,N=f.length+h.length;N>w;w++)S=f.length>w?f[w]:h[w-f.length],x=S.attributes.placeholder,x&&(x=x.nodeValue,x&&K.inArray(B,S.type)&&p(S));L=setInterval(function(){for(w=0,N=f.length+h.length;N>w;w++)S=f.length>w?f[w]:h[w-f.length],x=S.attributes.placeholder,x?(x=x.nodeValue,x&&K.inArray(B,S.type)&&(S.getAttribute(j)||p(S),(x!==S.getAttribute(V)||"password"===S.type&&!S.getAttribute(D))&&("password"===S.type&&!S.getAttribute(D)&&K.changeType(S,"text")&&S.setAttribute(D,"password"),S.value===S.getAttribute(V)&&(S.value=x),S.setAttribute(V,x)))):S.getAttribute(P)&&(n(S),S.removeAttribute(V));m||clearInterval(L)},100)}K.addEventListener(t,"beforeunload",function(){J.disable()}),J.disable=J.nativeSupport?e:i,J.enable=J.nativeSupport?e:l}(this),function(t){"use strict";var e=t.fn.val,r=t.fn.prop;Placeholders.nativeSupport||(t.fn.val=function(t){var r=e.apply(this,arguments),n=this.eq(0).data("placeholder-value");return void 0===t&&this.eq(0).data("placeholder-active")&&r===n?"":r},t.fn.prop=function(t,e){return void 0===e&&this.eq(0).data("placeholder-active")&&"value"===t?"":r.apply(this,arguments)})}(jQuery);


//----------------------------------------------------------
// Inboxtable.js
//----------------------------------------------------------
(function($){
    $.fn.inboxTable = function( uid, displayusi, turnitintool_datatables_strings ) {
        $.fn.dataTableExt.oStdClasses.sSortable = "header sort";
        $.fn.dataTableExt.oStdClasses.sSortableNone = "header nosort";
        $.fn.dataTableExt.oStdClasses.sSortAsc = "header asc";
        $.fn.dataTableExt.oStdClasses.sSortDesc = "header desc";
        $.fn.dataTableExt.oStdClasses.sWrapper = "submissionTable";
        $.fn.dataTableExt.oStdClasses.sStripeOdd = "row r0";
        $.fn.dataTableExt.oStdClasses.sStripeEven = "row r1";
        var oTable = $("#inboxTable").dataTable( {
            "aoColumns": [
                    { "bSearchable": false, "bSortable": true, "bVisible": false }, // [0] Sort ID Column, Unique to preserver sorting when filtering
                    { "bSearchable": true, "bSortable": true, "bVisible": false }, // [1] Sort Display title, is shown in the sort header row
                    { "bSearchable": true, "bSortable": true, "bVisible": true, "aDataSort": [ 1, 2 ] }, // [2] The first column shown, contains the file name, user name, part name, anon button
                    { "bSearchable": true, "bSortable": true, "bVisible": false }, // [3] Column to store the USI (Unique Student Identifier), used with Rosetta Pseudo behaviour
                    { "bSearchable": false, "bSortable": true, "bVisible": displayusi, "iDataSort": [ 3 ] }, // [4] USI field, blank but will store the USI in row header if enabled
                    { "bSearchable": true, "bSortable": true, "sType": "numeric", "bVisible": true }, // [5] Paper ID Column
                    { "bSearchable": false, "bSortable": true, "sType": "date", "bVisible": true }, // [6] The Submitted Date
                    { "bSearchable": false, "bSortable": true, "asSorting": [ "desc" ], "sType": "numeric", "bVisible": false }, // [7] Raw data for the Similarity score
                    { "bSearchable": false, "bSortable": true, "sType": "numeric", "bVisible": true, "iDataSort": [ 7 ] }, // [8] Similarity Display Column, the HTML for the originality report launch
                    { "bSearchable": true, "bSortable": true, "asSorting": [ "desc" ], "bVisible": false }, // [9] Overall Grade Column, Used to sort and to Display above the Grade Display Column
                    { "bSearchable": false, "bSortable": true, "sType": "numeric", "bVisible": false }, // [10] Raw data for the submission grade, Used to sort
                    { "bSearchable": false, "bSortable": true, "sType": "numeric", "bVisible": true, "aDataSort": [ 10 ] }, // [11] Grade Display Column, the HTML for the grademark launch
                    { "bSearchable": false, "bSortable": false, "bVisible": true }, // [12] Student View Indicator column
                    { "bSearchable": false, "bSortable": false, "bVisible": true }, // [13] Comments / Feed Back column
                    { "bSearchable": false, "bSortable": false, "bVisible": true }, // [14] Download Button column
                    { "bSearchable": false, "bSortable": false, "bVisible": true }, // [14] Refresh Row column
                    { "bSearchable": false, "bSortable": false, "bVisible": true } // [15] Delete Button column
                ],
            "fnDrawCallback": function ( oSettings ) {

                if ( typeof oTable == "undefined" ) {
                    return;
                }

                if ( oSettings.aiDisplay.length == 0 ) {
                    return;
                }

                var nTrs = $("#inboxTable tbody tr");
                var sLastGroup = "";
                for ( var i=0 ; i < nTrs.length; i++ ) {
                    
                    colspan = ( displayusi ) ? 13 : 12;
                    studentcol = 2;
                    usicol = ( displayusi ) ? 3 : 99;
                    gradecol = ( displayusi ) ? 7 : 6;
                    idcol = gradecol - 3;
                    datecol = gradecol - 2;
                    similaritycol = gradecol - 1;
                    
                    var iDisplayIndex = oSettings._iDisplayStart + i;
                    var sort = oSettings.aoData[ oSettings.aiDisplay[iDisplayIndex] ]._aData[0];
                    var sort_table = oSettings.aoData[ oSettings.aiDisplay[iDisplayIndex] ]._aData[1];
                    var usi = oSettings.aoData[ oSettings.aiDisplay[iDisplayIndex] ]._aData[3];
                    var paperid = oSettings.aoData[ oSettings.aiDisplay[iDisplayIndex] ]._aData[5];
                    var overallgrade = oSettings.aoData[ oSettings.aiDisplay[iDisplayIndex] ]._aData[9];

                    if ( sort != sLastGroup ) {
                        var nGroup = document.createElement( "tr" );

                        for ( n = 2; n < colspan; n++ ) {
                            var nCell = document.createElement( "td" );
                            switch ( n ) {
                                case studentcol:
                                    // Student / Part Col
                                    nCell.setAttribute ("class", "namecell group" );
                                    nCell.innerHTML = sort_table;
                                    break;
                                case usicol:
                                    // USI col
                                    nCell.setAttribute ("class", "markscell group");
                                    nCell.innerHTML = usi;
                                    break;
                                case idcol:
                                    // Paper ID col
                                    nCell.setAttribute ("class", "markscell group");
                                    nCell.innerHTML = "&nbsp;";
                                    break;
                                case datecol:
                                    // Date col
                                    nCell.setAttribute ("class", "datecell group");
                                    nCell.innerHTML = "&nbsp;";
                                    break;
                                case similaritycol:
                                    // Sililarity col
                                    nCell.setAttribute ("class", "markscell group");
                                    nCell.innerHTML = "&nbsp;";
                                    break;
                                case gradecol:
                                    // Grade col
                                    nCell.setAttribute ("class", "markscell group");
                                    overallgrade = ( overallgrade < 0 ) ? '' : overallgrade; 
                                    nCell.innerHTML = overallgrade;
                                    break;
                                default:
                                    // Default col
                                    nCell.setAttribute ("class", "iconcell group");
                                    nCell.innerHTML = "&nbsp;";
                                    break;
                            }
                            nGroup.appendChild( nCell );
                        }

                        nTrs[i].parentNode.insertBefore( nGroup, nTrs[i] );
                        sLastGroup = sort;
                        
                    }
                    
                    // Hide the emtpy rows
                    if ( paperid == "&nbsp;&nbsp;" ) {
                        nTrs[i].style.display = 'none';
                    }

                }

                $("#turnitintool_style .paginate_disabled_previous").css( "background", "url(pix/prevdisabled.png) no-repeat left center" );
                $("#turnitintool_style .paginate_enabled_previous").css( "background", "url(pix/prevenabled.png) no-repeat left center" );
                $("#turnitintool_style .paginate_disabled_next").css( "background", "url(pix/nextdisabled.png) no-repeat right center" );
                $("#turnitintool_style .paginate_enabled_next").css( "background", "url(pix/nextenabled.png) no-repeat right center" );
                $("#turnitintool_style .dataTables_processing").css( "background", "url(pix/loaderanim.gif) no-repeat center center" );
                $("#inboxTable th.sort").css( "background", "url(pix/sortnone.png) no-repeat right center" );
                $("#inboxTable th.asc").css( "background", "url(pix/sortdown.png) no-repeat right center" );
                $("#inboxTable th.desc").css( "background", "url(pix/sortup.png) no-repeat right center" );
                $("#inboxTable a.fileicon").css( "background", "url(pix/fileicon.gif) no-repeat left center" ).css( "padding", "0px 0px 0px 16px" );

            },
            "aaSorting": [[ 9, "desc" ],[ 7, "desc"],[ 1, "asc" ]],
            "sPaginationType": "full_numbers",
            "sDom": "r<\"top navbar\"lf><\"dt_page\"pi>t<\"bottom\"><\"dt_page\"pi>",
            "oLanguage": turnitintool_datatables_strings,
            "bStateSave": true,
            "fnStateSave": function (oSettings, oData) {
                try {
                    localStorage.setItem( uid+'DataTables', JSON.stringify(oData) );
                } catch ( e ) {
                }
            },
            "fnStateLoad": function (oSettings) {
                try {
                    return JSON.parse( localStorage.getItem(uid+'DataTables') );
                } catch ( e ) {
                }
            }
        } );
        oTable.fnStandingRedraw();
        $("#inboxTable").css( "display", "table" );
        oTable.fnSetFilteringDelay(1000);
        return oTable;
    };

    $('.refreshrow').bind('click', function( ev ) {
        element = $(ev.currentTarget);
        id = element.prop('id').split('-')[1];
        objectid = element.prop('id').split('-')[4];
        jQuery('#inboxNotice').css( 'display', 'block' );
        $.ajax({
            url: 'view.php?do=allsubmissions&reloadrow='+objectid+'&id='+id,
            success: function() {
                window.location.href = 'view.php?do=allsubmissions&id='+id;
            }
        });
    });
    
})(jQuery);

//----------------------------------------------------------
// Datatables.js
//----------------------------------------------------------
/*
 * File:        jquery.dataTables.min.js
 * Version:     1.9.2
 * Author:      Allan Jardine (www.sprymedia.co.uk)
 * Info:        www.datatables.net
 * 
 * Copyright 2008-2012 Allan Jardine, all rights reserved.
 *
 * This source file is free software, under either the GPL v2 license or a
 * BSD style license, available at:
 *   http://datatables.net/license_gpl2
 *   http://datatables.net/license_bsd
 * 
 * This source file is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 */
(function(i,ha,t,p){var l=function(h){function n(a,b){var c=l.defaults.columns,d=a.aoColumns.length;b=i.extend({},l.models.oColumn,c,{sSortingClass:a.oClasses.sSortable,sSortingClassJUI:a.oClasses.sSortJUI,nTh:b?b:t.createElement("th"),sTitle:c.sTitle?c.sTitle:b?b.innerHTML:"",aDataSort:c.aDataSort?c.aDataSort:[d],mDataProp:c.mDataProp?c.oDefaults:d});a.aoColumns.push(b);if(a.aoPreSearchCols[d]===p||a.aoPreSearchCols[d]===null)a.aoPreSearchCols[d]=i.extend({},l.models.oSearch);else{b=a.aoPreSearchCols[d];
if(b.bRegex===p)b.bRegex=true;if(b.bSmart===p)b.bSmart=true;if(b.bCaseInsensitive===p)b.bCaseInsensitive=true}q(a,d,null)}function q(a,b,c){b=a.aoColumns[b];if(c!==p&&c!==null){if(c.sType!==p){b.sType=c.sType;b._bAutoType=false}i.extend(b,c);r(b,c,"sWidth","sWidthOrig");if(c.iDataSort!==p)b.aDataSort=[c.iDataSort];r(b,c,"aDataSort")}b.fnGetData=ia(b.mDataProp);b.fnSetData=Ha(b.mDataProp);if(!a.oFeatures.bSort)b.bSortable=false;if(!b.bSortable||i.inArray("asc",b.asSorting)==-1&&i.inArray("desc",b.asSorting)==
-1){b.sSortingClass=a.oClasses.sSortableNone;b.sSortingClassJUI=""}else if(b.bSortable||i.inArray("asc",b.asSorting)==-1&&i.inArray("desc",b.asSorting)==-1){b.sSortingClass=a.oClasses.sSortable;b.sSortingClassJUI=a.oClasses.sSortJUI}else if(i.inArray("asc",b.asSorting)!=-1&&i.inArray("desc",b.asSorting)==-1){b.sSortingClass=a.oClasses.sSortableAsc;b.sSortingClassJUI=a.oClasses.sSortJUIAscAllowed}else if(i.inArray("asc",b.asSorting)==-1&&i.inArray("desc",b.asSorting)!=-1){b.sSortingClass=a.oClasses.sSortableDesc;
b.sSortingClassJUI=a.oClasses.sSortJUIDescAllowed}}function o(a){if(a.oFeatures.bAutoWidth===false)return false;pa(a);for(var b=0,c=a.aoColumns.length;b<c;b++)a.aoColumns[b].nTh.style.width=a.aoColumns[b].sWidth}function v(a,b){for(var c=-1,d=0;d<a.aoColumns.length;d++){a.aoColumns[d].bVisible===true&&c++;if(c==b)return d}return null}function x(a,b){for(var c=-1,d=0;d<a.aoColumns.length;d++){a.aoColumns[d].bVisible===true&&c++;if(d==b)return a.aoColumns[d].bVisible===true?c:null}return null}function C(a){for(var b=
0,c=0;c<a.aoColumns.length;c++)a.aoColumns[c].bVisible===true&&b++;return b}function D(a){for(var b=l.ext.aTypes,c=b.length,d=0;d<c;d++){var e=b[d](a);if(e!==null)return e}return"string"}function G(a,b){b=b.split(",");for(var c=[],d=0,e=a.aoColumns.length;d<e;d++)for(var f=0;f<e;f++)if(a.aoColumns[d].sName==b[f]){c.push(f);break}return c}function F(a){for(var b="",c=0,d=a.aoColumns.length;c<d;c++)b+=a.aoColumns[c].sName+",";if(b.length==d)return"";return b.slice(0,-1)}function S(a,b,c,d){var e,f,
g,j,m;if(b)for(e=b.length-1;e>=0;e--){var k=b[e].aTargets;i.isArray(k)||M(a,1,"aTargets must be an array of targets, not a "+typeof k);f=0;for(g=k.length;f<g;f++)if(typeof k[f]==="number"&&k[f]>=0){for(;a.aoColumns.length<=k[f];)n(a);d(k[f],b[e])}else if(typeof k[f]==="number"&&k[f]<0)d(a.aoColumns.length+k[f],b[e]);else if(typeof k[f]==="string"){j=0;for(m=a.aoColumns.length;j<m;j++)if(k[f]=="_all"||i(a.aoColumns[j].nTh).hasClass(k[f]))d(j,b[e])}}if(c){e=0;for(a=c.length;e<a;e++)d(e,c[e])}}function P(a,
b){var c;c=i.isArray(b)?b.slice():i.extend(true,{},b);b=a.aoData.length;var d=i.extend(true,{},l.models.oRow);d._aData=c;a.aoData.push(d);var e;d=0;for(var f=a.aoColumns.length;d<f;d++){c=a.aoColumns[d];typeof c.fnRender==="function"&&c.bUseRendered&&c.mDataProp!==null?R(a,b,d,ba(a,b,d)):R(a,b,d,E(a,b,d));if(c._bAutoType&&c.sType!="string"){e=E(a,b,d,"type");if(e!==null&&e!==""){e=D(e);if(c.sType===null)c.sType=e;else if(c.sType!=e&&c.sType!="html")c.sType="string"}}}a.aiDisplayMaster.push(b);a.oFeatures.bDeferRender||
qa(a,b);return b}function ja(a){var b,c,d,e,f,g,j,m,k;if(a.bDeferLoading||a.sAjaxSource===null){j=a.nTBody.childNodes;b=0;for(c=j.length;b<c;b++)if(j[b].nodeName.toUpperCase()=="TR"){m=a.aoData.length;j[b]._DT_RowIndex=m;a.aoData.push(i.extend(true,{},l.models.oRow,{nTr:j[b]}));a.aiDisplayMaster.push(m);g=j[b].childNodes;d=f=0;for(e=g.length;d<e;d++){k=g[d].nodeName.toUpperCase();if(k=="TD"||k=="TH"){R(a,m,f,i.trim(g[d].innerHTML));f++}}}}j=ca(a);g=[];b=0;for(c=j.length;b<c;b++){d=0;for(e=j[b].childNodes.length;d<
e;d++){f=j[b].childNodes[d];k=f.nodeName.toUpperCase();if(k=="TD"||k=="TH")g.push(f)}}e=0;for(j=a.aoColumns.length;e<j;e++){k=a.aoColumns[e];if(k.sTitle===null)k.sTitle=k.nTh.innerHTML;f=k._bAutoType;m=typeof k.fnRender==="function";var y=k.sClass!==null,u=k.bVisible,w,z;if(f||m||y||!u){b=0;for(c=a.aoData.length;b<c;b++){d=a.aoData[b];w=g[b*j+e];if(f&&k.sType!="string"){z=E(a,b,e,"type");if(z!==""){z=D(z);if(k.sType===null)k.sType=z;else if(k.sType!=z&&k.sType!="html")k.sType="string"}}if(typeof k.mDataProp===
"function")w.innerHTML=E(a,b,e,"display");if(m){z=ba(a,b,e);w.innerHTML=z;k.bUseRendered&&R(a,b,e,z)}if(y)w.className+=" "+k.sClass;if(u)d._anHidden[e]=null;else{d._anHidden[e]=w;w.parentNode.removeChild(w)}k.fnCreatedCell&&k.fnCreatedCell.call(a.oInstance,w,E(a,b,e,"display"),d._aData,b,e)}}}if(a.aoRowCreatedCallback.length!==0){b=0;for(c=a.aoData.length;b<c;b++){d=a.aoData[b];L(a,"aoRowCreatedCallback",null,[d.nTr,d._aData,b])}}}function N(a,b){return b._DT_RowIndex!==p?b._DT_RowIndex:null}function ra(a,
b,c){b=T(a,b);var d=0;for(a=a.aoColumns.length;d<a;d++)if(b[d]===c)return d;return-1}function ka(a,b,c){for(var d=[],e=0,f=a.aoColumns.length;e<f;e++)d.push(E(a,b,e,c));return d}function E(a,b,c,d){var e=a.aoColumns[c];if((c=e.fnGetData(a.aoData[b]._aData,d))===p){if(a.iDrawError!=a.iDraw&&e.sDefaultContent===null){M(a,0,"Requested unknown parameter "+(typeof e.mDataProp=="function"?"{mDataprop function}":"'"+e.mDataProp+"'")+" from the data source for row "+b);a.iDrawError=a.iDraw}return e.sDefaultContent}if(c===
null&&e.sDefaultContent!==null)c=e.sDefaultContent;else if(typeof c==="function")return c();if(d=="display"&&c===null)return"";return c}function R(a,b,c,d){a.aoColumns[c].fnSetData(a.aoData[b]._aData,d)}function ia(a){if(a===null)return function(){return null};else if(typeof a==="function")return function(c,d){return a(c,d)};else if(typeof a==="string"&&a.indexOf(".")!=-1){var b=a.split(".");return function(c){for(var d=0,e=b.length;d<e;d++){c=c[b[d]];if(c===p)return p}return c}}else return function(c){return c[a]}}
function Ha(a){if(a===null)return function(){};else if(typeof a==="function")return function(c,d){a(c,"set",d)};else if(typeof a==="string"&&a.indexOf(".")!=-1){var b=a.split(".");return function(c,d){for(var e=0,f=b.length-1;e<f;e++){if(c[b[e]]===p)c[b[e]]={};c=c[b[e]]}c[b[b.length-1]]=d}}else return function(c,d){c[a]=d}}function la(a){for(var b=[],c=a.aoData.length,d=0;d<c;d++)b.push(a.aoData[d]._aData);return b}function sa(a){a.aoData.splice(0,a.aoData.length);a.aiDisplayMaster.splice(0,a.aiDisplayMaster.length);
a.aiDisplay.splice(0,a.aiDisplay.length);J(a)}function ta(a,b){for(var c=-1,d=0,e=a.length;d<e;d++)if(a[d]==b)c=d;else a[d]>b&&a[d]--;c!=-1&&a.splice(c,1)}function ba(a,b,c){var d=a.aoColumns[c];return d.fnRender({iDataRow:b,iDataColumn:c,oSettings:a,aData:a.aoData[b]._aData,mDataProp:d.mDataProp},E(a,b,c,"display"))}function qa(a,b){var c=a.aoData[b],d;if(c.nTr===null){c.nTr=t.createElement("tr");c.nTr._DT_RowIndex=b;if(c._aData.DT_RowId)c.nTr.id=c._aData.DT_RowId;c._aData.DT_RowClass&&i(c.nTr).addClass(c._aData.DT_RowClass);
for(var e=0,f=a.aoColumns.length;e<f;e++){var g=a.aoColumns[e];d=t.createElement(g.sCellType);d.innerHTML=typeof g.fnRender==="function"&&(!g.bUseRendered||g.mDataProp===null)?ba(a,b,e):E(a,b,e,"display");if(g.sClass!==null)d.className=g.sClass;if(g.bVisible){c.nTr.appendChild(d);c._anHidden[e]=null}else c._anHidden[e]=d;g.fnCreatedCell&&g.fnCreatedCell.call(a.oInstance,d,E(a,b,e,"display"),c._aData,b,e)}L(a,"aoRowCreatedCallback",null,[c.nTr,c._aData,b])}}function Ia(a){var b,c,d;if(a.nTHead.getElementsByTagName("th").length!==
0){b=0;for(d=a.aoColumns.length;b<d;b++){c=a.aoColumns[b].nTh;c.setAttribute("role","columnheader");if(a.aoColumns[b].bSortable){c.setAttribute("tabindex",a.iTabIndex);c.setAttribute("aria-controls",a.sTableId)}a.aoColumns[b].sClass!==null&&i(c).addClass(a.aoColumns[b].sClass);if(a.aoColumns[b].sTitle!=c.innerHTML)c.innerHTML=a.aoColumns[b].sTitle}}else{var e=t.createElement("tr");b=0;for(d=a.aoColumns.length;b<d;b++){c=a.aoColumns[b].nTh;c.innerHTML=a.aoColumns[b].sTitle;c.setAttribute("tabindex",
"0");a.aoColumns[b].sClass!==null&&i(c).addClass(a.aoColumns[b].sClass);e.appendChild(c)}i(a.nTHead).html("")[0].appendChild(e);da(a.aoHeader,a.nTHead)}i(a.nTHead).children("tr").attr("role","row");if(a.bJUI){b=0;for(d=a.aoColumns.length;b<d;b++){c=a.aoColumns[b].nTh;e=t.createElement("div");e.className=a.oClasses.sSortJUIWrapper;i(c).contents().appendTo(e);var f=t.createElement("span");f.className=a.oClasses.sSortIcon;e.appendChild(f);c.appendChild(e)}}if(a.oFeatures.bSort)for(b=0;b<a.aoColumns.length;b++)a.aoColumns[b].bSortable!==
false?ua(a,a.aoColumns[b].nTh,b):i(a.aoColumns[b].nTh).addClass(a.oClasses.sSortableNone);a.oClasses.sFooterTH!==""&&i(a.nTFoot).children("tr").children("th").addClass(a.oClasses.sFooterTH);if(a.nTFoot!==null){c=W(a,null,a.aoFooter);b=0;for(d=a.aoColumns.length;b<d;b++)if(c[b]){a.aoColumns[b].nTf=c[b];a.aoColumns[b].sClass&&i(c[b]).addClass(a.aoColumns[b].sClass)}}}function ea(a,b,c){var d,e,f,g=[],j=[],m=a.aoColumns.length,k;if(c===p)c=false;d=0;for(e=b.length;d<e;d++){g[d]=b[d].slice();g[d].nTr=
b[d].nTr;for(f=m-1;f>=0;f--)!a.aoColumns[f].bVisible&&!c&&g[d].splice(f,1);j.push([])}d=0;for(e=g.length;d<e;d++){if(a=g[d].nTr)for(;f=a.firstChild;)a.removeChild(f);f=0;for(b=g[d].length;f<b;f++){k=m=1;if(j[d][f]===p){a.appendChild(g[d][f].cell);for(j[d][f]=1;g[d+m]!==p&&g[d][f].cell==g[d+m][f].cell;){j[d+m][f]=1;m++}for(;g[d][f+k]!==p&&g[d][f].cell==g[d][f+k].cell;){for(c=0;c<m;c++)j[d+c][f+k]=1;k++}g[d][f].cell.rowSpan=m;g[d][f].cell.colSpan=k}}}}function H(a){var b=L(a,"aoPreDrawCallback","preDraw",
[a]);if(i.inArray(false,b)!==-1)O(a,false);else{var c,d;b=[];var e=0,f=a.asStripeClasses.length;c=a.aoOpenRows.length;a.bDrawing=true;if(a.iInitDisplayStart!==p&&a.iInitDisplayStart!=-1){a._iDisplayStart=a.oFeatures.bServerSide?a.iInitDisplayStart:a.iInitDisplayStart>=a.fnRecordsDisplay()?0:a.iInitDisplayStart;a.iInitDisplayStart=-1;J(a)}if(a.bDeferLoading){a.bDeferLoading=false;a.iDraw++}else if(a.oFeatures.bServerSide){if(!a.bDestroying&&!Ja(a))return}else a.iDraw++;if(a.aiDisplay.length!==0){var g=
a._iDisplayStart;d=a._iDisplayEnd;if(a.oFeatures.bServerSide){g=0;d=a.aoData.length}for(g=g;g<d;g++){var j=a.aoData[a.aiDisplay[g]];j.nTr===null&&qa(a,a.aiDisplay[g]);var m=j.nTr;if(f!==0){var k=a.asStripeClasses[e%f];if(j._sRowStripe!=k){i(m).removeClass(j._sRowStripe).addClass(k);j._sRowStripe=k}}L(a,"aoRowCallback",null,[m,a.aoData[a.aiDisplay[g]]._aData,e,g]);b.push(m);e++;if(c!==0)for(j=0;j<c;j++)if(m==a.aoOpenRows[j].nParent){b.push(a.aoOpenRows[j].nTr);break}}}else{b[0]=t.createElement("tr");
if(a.asStripeClasses[0])b[0].className=a.asStripeClasses[0];c=a.oLanguage;f=c.sZeroRecords;if(a.iDraw==1&&a.sAjaxSource!==null&&!a.oFeatures.bServerSide)f=c.sLoadingRecords;else if(c.sEmptyTable&&a.fnRecordsTotal()===0)f=c.sEmptyTable;c=t.createElement("td");c.setAttribute("valign","top");c.colSpan=C(a);c.className=a.oClasses.sRowEmpty;c.innerHTML=va(a,f);b[e].appendChild(c)}L(a,"aoHeaderCallback","header",[i(a.nTHead).children("tr")[0],la(a),a._iDisplayStart,a.fnDisplayEnd(),a.aiDisplay]);L(a,"aoFooterCallback",
"footer",[i(a.nTFoot).children("tr")[0],la(a),a._iDisplayStart,a.fnDisplayEnd(),a.aiDisplay]);e=t.createDocumentFragment();c=t.createDocumentFragment();if(a.nTBody){f=a.nTBody.parentNode;c.appendChild(a.nTBody);if(!a.oScroll.bInfinite||!a._bInitComplete||a.bSorted||a.bFiltered)for(;c=a.nTBody.firstChild;)a.nTBody.removeChild(c);c=0;for(d=b.length;c<d;c++)e.appendChild(b[c]);a.nTBody.appendChild(e);f!==null&&f.appendChild(a.nTBody)}L(a,"aoDrawCallback","draw",[a]);a.bSorted=false;a.bFiltered=false;
a.bDrawing=false;if(a.oFeatures.bServerSide){O(a,false);a._bInitComplete||ma(a)}}}function na(a){if(a.oFeatures.bSort)X(a,a.oPreviousSearch);else if(a.oFeatures.bFilter)U(a,a.oPreviousSearch);else{J(a);H(a)}}function Ka(a){var b=i("<div></div>")[0];a.nTable.parentNode.insertBefore(b,a.nTable);a.nTableWrapper=i('<div id="'+a.sTableId+'_wrapper" class="'+a.oClasses.sWrapper+'" role="grid"></div>')[0];a.nTableReinsertBefore=a.nTable.nextSibling;for(var c=a.nTableWrapper,d=a.sDom.split(""),e,f,g,j,m,
k,y,u=0;u<d.length;u++){f=0;g=d[u];if(g=="<"){j=i("<div></div>")[0];m=d[u+1];if(m=="'"||m=='"'){k="";for(y=2;d[u+y]!=m;){k+=d[u+y];y++}if(k=="H")k=a.oClasses.sJUIHeader;else if(k=="F")k=a.oClasses.sJUIFooter;if(k.indexOf(".")!=-1){m=k.split(".");j.id=m[0].substr(1,m[0].length-1);j.className=m[1]}else if(k.charAt(0)=="#")j.id=k.substr(1,k.length-1);else j.className=k;u+=y}c.appendChild(j);c=j}else if(g==">")c=c.parentNode;else if(g=="l"&&a.oFeatures.bPaginate&&a.oFeatures.bLengthChange){e=La(a);f=
1}else if(g=="f"&&a.oFeatures.bFilter){e=Ma(a);f=1}else if(g=="r"&&a.oFeatures.bProcessing){e=Na(a);f=1}else if(g=="t"){e=Oa(a);f=1}else if(g=="i"&&a.oFeatures.bInfo){e=Pa(a);f=1}else if(g=="p"&&a.oFeatures.bPaginate){e=Qa(a);f=1}else if(l.ext.aoFeatures.length!==0){j=l.ext.aoFeatures;y=0;for(m=j.length;y<m;y++)if(g==j[y].cFeature){if(e=j[y].fnInit(a))f=1;break}}if(f==1&&e!==null){if(typeof a.aanFeatures[g]!=="object")a.aanFeatures[g]=[];a.aanFeatures[g].push(e);c.appendChild(e)}}b.parentNode.replaceChild(a.nTableWrapper,
b)}function da(a,b){b=i(b).children("tr");var c,d,e,f,g,j,m,k,y=function(z,Y,B){for(;z[Y][B];)B++;return B};a.splice(0,a.length);d=0;for(j=b.length;d<j;d++)a.push([]);d=0;for(j=b.length;d<j;d++){e=0;for(m=b[d].childNodes.length;e<m;e++){c=b[d].childNodes[e];if(c.nodeName.toUpperCase()=="TD"||c.nodeName.toUpperCase()=="TH"){var u=c.getAttribute("colspan")*1,w=c.getAttribute("rowspan")*1;u=!u||u===0||u===1?1:u;w=!w||w===0||w===1?1:w;k=y(a,d,0);for(g=0;g<u;g++)for(f=0;f<w;f++){a[d+f][k+g]={cell:c,unique:u==
1?true:false};a[d+f].nTr=b[d]}}}}}function W(a,b,c){var d=[];if(!c){c=a.aoHeader;if(b){c=[];da(c,b)}}b=0;for(var e=c.length;b<e;b++)for(var f=0,g=c[b].length;f<g;f++)if(c[b][f].unique&&(!d[f]||!a.bSortCellsTop))d[f]=c[b][f].cell;return d}function Ja(a){if(a.bAjaxDataGet){a.iDraw++;O(a,true);var b=Ra(a);wa(a,b);a.fnServerData.call(a.oInstance,a.sAjaxSource,b,function(c){Sa(a,c)},a);return false}else return true}function Ra(a){var b=a.aoColumns.length,c=[],d,e,f,g;c.push({name:"sEcho",value:a.iDraw});
c.push({name:"iColumns",value:b});c.push({name:"sColumns",value:F(a)});c.push({name:"iDisplayStart",value:a._iDisplayStart});c.push({name:"iDisplayLength",value:a.oFeatures.bPaginate!==false?a._iDisplayLength:-1});for(f=0;f<b;f++){d=a.aoColumns[f].mDataProp;c.push({name:"mDataProp_"+f,value:typeof d==="function"?"function":d})}if(a.oFeatures.bFilter!==false){c.push({name:"sSearch",value:a.oPreviousSearch.sSearch});c.push({name:"bRegex",value:a.oPreviousSearch.bRegex});for(f=0;f<b;f++){c.push({name:"sSearch_"+
f,value:a.aoPreSearchCols[f].sSearch});c.push({name:"bRegex_"+f,value:a.aoPreSearchCols[f].bRegex});c.push({name:"bSearchable_"+f,value:a.aoColumns[f].bSearchable})}}if(a.oFeatures.bSort!==false){var j=0;d=a.aaSortingFixed!==null?a.aaSortingFixed.concat(a.aaSorting):a.aaSorting.slice();for(f=0;f<d.length;f++){e=a.aoColumns[d[f][0]].aDataSort;for(g=0;g<e.length;g++){c.push({name:"iSortCol_"+j,value:e[g]});c.push({name:"sSortDir_"+j,value:d[f][1]});j++}}c.push({name:"iSortingCols",value:j});for(f=0;f<
b;f++)c.push({name:"bSortable_"+f,value:a.aoColumns[f].bSortable})}return c}function wa(a,b){L(a,"aoServerParams","serverParams",[b])}function Sa(a,b){if(b.sEcho!==p)if(b.sEcho*1<a.iDraw)return;else a.iDraw=b.sEcho*1;if(!a.oScroll.bInfinite||a.oScroll.bInfinite&&(a.bSorted||a.bFiltered))sa(a);a._iRecordsTotal=parseInt(b.iTotalRecords,10);a._iRecordsDisplay=parseInt(b.iTotalDisplayRecords,10);var c=F(a);c=b.sColumns!==p&&c!==""&&b.sColumns!=c;var d;if(c)d=G(a,b.sColumns);b=ia(a.sAjaxDataProp)(b);for(var e=
0,f=b.length;e<f;e++)if(c){for(var g=[],j=0,m=a.aoColumns.length;j<m;j++)g.push(b[e][d[j]]);P(a,g)}else P(a,b[e]);a.aiDisplay=a.aiDisplayMaster.slice();a.bAjaxDataGet=false;H(a);a.bAjaxDataGet=true;O(a,false)}function Ma(a){var b=a.oPreviousSearch,c=a.oLanguage.sSearch;c=c.indexOf("_INPUT_")!==-1?c.replace("_INPUT_",'<input type="text" />'):c===""?'<input type="text" />':c+' <input type="text" />';var d=t.createElement("div");d.className=a.oClasses.sFilter;d.innerHTML="<label>"+c+"</label>";if(!a.aanFeatures.f)d.id=
a.sTableId+"_filter";c=i('input[type="text"]',d);d._DT_Input=c[0];c.val(b.sSearch.replace('"',"&quot;"));c.bind("keyup.DT",function(){for(var e=a.aanFeatures.f,f=this.value===""?"":this.value,g=0,j=e.length;g<j;g++)e[g]!=i(this).parents("div.dataTables_filter")[0]&&i(e[g]._DT_Input).val(f);f!=b.sSearch&&U(a,{sSearch:f,bRegex:b.bRegex,bSmart:b.bSmart,bCaseInsensitive:b.bCaseInsensitive})});c.attr("aria-controls",a.sTableId).bind("keypress.DT",function(e){if(e.keyCode==13)return false});return d}function U(a,
b,c){var d=a.oPreviousSearch,e=a.aoPreSearchCols,f=function(g){d.sSearch=g.sSearch;d.bRegex=g.bRegex;d.bSmart=g.bSmart;d.bCaseInsensitive=g.bCaseInsensitive};if(a.oFeatures.bServerSide)f(b);else{Ta(a,b.sSearch,c,b.bRegex,b.bSmart,b.bCaseInsensitive);f(b);for(b=0;b<a.aoPreSearchCols.length;b++)Ua(a,e[b].sSearch,b,e[b].bRegex,e[b].bSmart,e[b].bCaseInsensitive);Va(a)}a.bFiltered=true;i(a.oInstance).trigger("filter",a);a._iDisplayStart=0;J(a);H(a);xa(a,0)}function Va(a){for(var b=l.ext.afnFiltering,c=
0,d=b.length;c<d;c++)for(var e=0,f=0,g=a.aiDisplay.length;f<g;f++){var j=a.aiDisplay[f-e];if(!b[c](a,ka(a,j,"filter"),j)){a.aiDisplay.splice(f-e,1);e++}}}function Ua(a,b,c,d,e,f){if(b!==""){var g=0;b=ya(b,d,e,f);for(d=a.aiDisplay.length-1;d>=0;d--){e=za(E(a,a.aiDisplay[d],c,"filter"),a.aoColumns[c].sType);if(!b.test(e)){a.aiDisplay.splice(d,1);g++}}}}function Ta(a,b,c,d,e,f){d=ya(b,d,e,f);e=a.oPreviousSearch;c||(c=0);if(l.ext.afnFiltering.length!==0)c=1;if(b.length<=0){a.aiDisplay.splice(0,a.aiDisplay.length);
a.aiDisplay=a.aiDisplayMaster.slice()}else if(a.aiDisplay.length==a.aiDisplayMaster.length||e.sSearch.length>b.length||c==1||b.indexOf(e.sSearch)!==0){a.aiDisplay.splice(0,a.aiDisplay.length);xa(a,1);for(b=0;b<a.aiDisplayMaster.length;b++)d.test(a.asDataSearch[b])&&a.aiDisplay.push(a.aiDisplayMaster[b])}else for(b=c=0;b<a.asDataSearch.length;b++)if(!d.test(a.asDataSearch[b])){a.aiDisplay.splice(b-c,1);c++}}function xa(a,b){if(!a.oFeatures.bServerSide){a.asDataSearch.splice(0,a.asDataSearch.length);
b=b&&b===1?a.aiDisplayMaster:a.aiDisplay;for(var c=0,d=b.length;c<d;c++)a.asDataSearch[c]=Aa(a,ka(a,b[c],"filter"))}}function Aa(a,b){var c="";if(a.__nTmpFilter===p)a.__nTmpFilter=t.createElement("div");for(var d=a.__nTmpFilter,e=0,f=a.aoColumns.length;e<f;e++)if(a.aoColumns[e].bSearchable)c+=za(b[e],a.aoColumns[e].sType)+"  ";if(c.indexOf("&")!==-1){d.innerHTML=c;c=d.textContent?d.textContent:d.innerText;c=c.replace(/\n/g," ").replace(/\r/g,"")}return c}function ya(a,b,c,d){if(c){a=b?a.split(" "):
Ba(a).split(" ");a="^(?=.*?"+a.join(")(?=.*?")+").*$";return new RegExp(a,d?"i":"")}else{a=b?a:Ba(a);return new RegExp(a,d?"i":"")}}function za(a,b){if(typeof l.ext.ofnSearch[b]==="function")return l.ext.ofnSearch[b](a);else if(a===null)return"";else if(b=="html")return a.replace(/[\r\n]/g," ").replace(/<.*?>/g,"");else if(typeof a==="string")return a.replace(/[\r\n]/g," ");return a}function Ba(a){return a.replace(new RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\|\\$|\\^|\\-)","g"),
"\\$1")}function Pa(a){var b=t.createElement("div");b.className=a.oClasses.sInfo;if(!a.aanFeatures.i){a.aoDrawCallback.push({fn:Wa,sName:"information"});b.id=a.sTableId+"_info"}a.nTable.setAttribute("aria-describedby",a.sTableId+"_info");return b}function Wa(a){if(!(!a.oFeatures.bInfo||a.aanFeatures.i.length===0)){var b=a.oLanguage,c=a._iDisplayStart+1,d=a.fnDisplayEnd(),e=a.fnRecordsTotal(),f=a.fnRecordsDisplay(),g;g=f===0&&f==e?b.sInfoEmpty:f===0?b.sInfoEmpty+" "+b.sInfoFiltered:f==e?b.sInfo:b.sInfo+
" "+b.sInfoFiltered;g+=b.sInfoPostFix;g=va(a,g);if(b.fnInfoCallback!==null)g=b.fnInfoCallback.call(a.oInstance,a,c,d,e,f,g);a=a.aanFeatures.i;b=0;for(c=a.length;b<c;b++)i(a[b]).html(g)}}function va(a,b){var c=a.fnFormatNumber(a._iDisplayStart+1),d=a.fnDisplayEnd();d=a.fnFormatNumber(d);var e=a.fnRecordsDisplay();e=a.fnFormatNumber(e);var f=a.fnRecordsTotal();f=a.fnFormatNumber(f);if(a.oScroll.bInfinite)c=a.fnFormatNumber(1);return b.replace("_START_",c).replace("_END_",d).replace("_TOTAL_",e).replace("_MAX_",
f)}function oa(a){var b,c,d=a.iInitDisplayStart;if(a.bInitialised===false)setTimeout(function(){oa(a)},200);else{Ka(a);Ia(a);ea(a,a.aoHeader);a.nTFoot&&ea(a,a.aoFooter);O(a,true);a.oFeatures.bAutoWidth&&pa(a);b=0;for(c=a.aoColumns.length;b<c;b++)if(a.aoColumns[b].sWidth!==null)a.aoColumns[b].nTh.style.width=s(a.aoColumns[b].sWidth);if(a.oFeatures.bSort)X(a);else if(a.oFeatures.bFilter)U(a,a.oPreviousSearch);else{a.aiDisplay=a.aiDisplayMaster.slice();J(a);H(a)}if(a.sAjaxSource!==null&&!a.oFeatures.bServerSide){c=
[];wa(a,c);a.fnServerData.call(a.oInstance,a.sAjaxSource,c,function(e){var f=a.sAjaxDataProp!==""?ia(a.sAjaxDataProp)(e):e;for(b=0;b<f.length;b++)P(a,f[b]);a.iInitDisplayStart=d;if(a.oFeatures.bSort)X(a);else{a.aiDisplay=a.aiDisplayMaster.slice();J(a);H(a)}O(a,false);ma(a,e)},a)}else if(!a.oFeatures.bServerSide){O(a,false);ma(a)}}}function ma(a,b){a._bInitComplete=true;L(a,"aoInitComplete","init",[a,b])}function Ca(a){var b=l.defaults.oLanguage;!a.sEmptyTable&&a.sZeroRecords&&b.sEmptyTable==="No data available in table"&&
r(a,a,"sZeroRecords","sEmptyTable");!a.sLoadingRecords&&a.sZeroRecords&&b.sLoadingRecords==="Loading..."&&r(a,a,"sZeroRecords","sLoadingRecords")}function La(a){if(a.oScroll.bInfinite)return null;var b='<select size="1" '+('name="'+a.sTableId+'_length"')+">",c,d,e=a.aLengthMenu;if(e.length==2&&typeof e[0]==="object"&&typeof e[1]==="object"){c=0;for(d=e[0].length;c<d;c++)b+='<option value="'+e[0][c]+'">'+e[1][c]+"</option>"}else{c=0;for(d=e.length;c<d;c++)b+='<option value="'+e[c]+'">'+e[c]+"</option>"}b+=
"</select>";e=t.createElement("div");if(!a.aanFeatures.l)e.id=a.sTableId+"_length";e.className=a.oClasses.sLength;e.innerHTML="<label>"+a.oLanguage.sLengthMenu.replace("_MENU_",b)+"</label>";i('select option[value="'+a._iDisplayLength+'"]',e).attr("selected",true);i("select",e).bind("change.DT",function(){var f=i(this).val(),g=a.aanFeatures.l;c=0;for(d=g.length;c<d;c++)g[c]!=this.parentNode&&i("select",g[c]).val(f);a._iDisplayLength=parseInt(f,10);J(a);if(a.fnDisplayEnd()==a.fnRecordsDisplay()){a._iDisplayStart=
a.fnDisplayEnd()-a._iDisplayLength;if(a._iDisplayStart<0)a._iDisplayStart=0}if(a._iDisplayLength==-1)a._iDisplayStart=0;H(a)});i("select",e).attr("aria-controls",a.sTableId);return e}function J(a){a._iDisplayEnd=a.oFeatures.bPaginate===false?a.aiDisplay.length:a._iDisplayStart+a._iDisplayLength>a.aiDisplay.length||a._iDisplayLength==-1?a.aiDisplay.length:a._iDisplayStart+a._iDisplayLength}function Qa(a){if(a.oScroll.bInfinite)return null;var b=t.createElement("div");b.className=a.oClasses.sPaging+
a.sPaginationType;l.ext.oPagination[a.sPaginationType].fnInit(a,b,function(c){J(c);H(c)});a.aanFeatures.p||a.aoDrawCallback.push({fn:function(c){l.ext.oPagination[c.sPaginationType].fnUpdate(c,function(d){J(d);H(d)})},sName:"pagination"});return b}function Da(a,b){var c=a._iDisplayStart;if(typeof b==="number"){a._iDisplayStart=b*a._iDisplayLength;if(a._iDisplayStart>a.fnRecordsDisplay())a._iDisplayStart=0}else if(b=="first")a._iDisplayStart=0;else if(b=="previous"){a._iDisplayStart=a._iDisplayLength>=
0?a._iDisplayStart-a._iDisplayLength:0;if(a._iDisplayStart<0)a._iDisplayStart=0}else if(b=="next")if(a._iDisplayLength>=0){if(a._iDisplayStart+a._iDisplayLength<a.fnRecordsDisplay())a._iDisplayStart+=a._iDisplayLength}else a._iDisplayStart=0;else if(b=="last")if(a._iDisplayLength>=0){b=parseInt((a.fnRecordsDisplay()-1)/a._iDisplayLength,10)+1;a._iDisplayStart=(b-1)*a._iDisplayLength}else a._iDisplayStart=0;else M(a,0,"Unknown paging action: "+b);i(a.oInstance).trigger("page",a);return c!=a._iDisplayStart}
function Na(a){var b=t.createElement("div");if(!a.aanFeatures.r)b.id=a.sTableId+"_processing";b.innerHTML=a.oLanguage.sProcessing;b.className=a.oClasses.sProcessing;a.nTable.parentNode.insertBefore(b,a.nTable);return b}function O(a,b){if(a.oFeatures.bProcessing)for(var c=a.aanFeatures.r,d=0,e=c.length;d<e;d++)c[d].style.visibility=b?"visible":"hidden";i(a.oInstance).trigger("processing",[a,b])}function Oa(a){if(a.oScroll.sX===""&&a.oScroll.sY==="")return a.nTable;var b=t.createElement("div"),c=t.createElement("div"),
d=t.createElement("div"),e=t.createElement("div"),f=t.createElement("div"),g=t.createElement("div"),j=a.nTable.cloneNode(false),m=a.nTable.cloneNode(false),k=a.nTable.getElementsByTagName("thead")[0],y=a.nTable.getElementsByTagName("tfoot").length===0?null:a.nTable.getElementsByTagName("tfoot")[0],u=a.oClasses;c.appendChild(d);f.appendChild(g);e.appendChild(a.nTable);b.appendChild(c);b.appendChild(e);d.appendChild(j);j.appendChild(k);if(y!==null){b.appendChild(f);g.appendChild(m);m.appendChild(y)}b.className=
u.sScrollWrapper;c.className=u.sScrollHead;d.className=u.sScrollHeadInner;e.className=u.sScrollBody;f.className=u.sScrollFoot;g.className=u.sScrollFootInner;if(a.oScroll.bAutoCss){c.style.overflow="hidden";c.style.position="relative";f.style.overflow="hidden";e.style.overflow="auto"}c.style.border="0";c.style.width="100%";f.style.border="0";d.style.width=a.oScroll.sXInner!==""?a.oScroll.sXInner:"100%";j.removeAttribute("id");j.style.marginLeft="0";a.nTable.style.marginLeft="0";if(y!==null){m.removeAttribute("id");
m.style.marginLeft="0"}d=i(a.nTable).children("caption");if(d.length>0){d=d[0];if(d._captionSide==="top")j.appendChild(d);else d._captionSide==="bottom"&&y&&m.appendChild(d)}if(a.oScroll.sX!==""){c.style.width=s(a.oScroll.sX);e.style.width=s(a.oScroll.sX);if(y!==null)f.style.width=s(a.oScroll.sX);i(e).scroll(function(){c.scrollLeft=this.scrollLeft;if(y!==null)f.scrollLeft=this.scrollLeft})}if(a.oScroll.sY!=="")e.style.height=s(a.oScroll.sY);a.aoDrawCallback.push({fn:Xa,sName:"scrolling"});a.oScroll.bInfinite&&
i(e).scroll(function(){if(!a.bDrawing&&i(this).scrollTop()!==0)if(i(this).scrollTop()+i(this).height()>i(a.nTable).height()-a.oScroll.iLoadGap)if(a.fnDisplayEnd()<a.fnRecordsDisplay()){Da(a,"next");J(a);H(a)}});a.nScrollHead=c;a.nScrollFoot=f;return b}function Xa(a){var b=a.nScrollHead.getElementsByTagName("div")[0],c=b.getElementsByTagName("table")[0],d=a.nTable.parentNode,e,f,g,j,m,k,y,u,w=[],z=a.nTFoot!==null?a.nScrollFoot.getElementsByTagName("div")[0]:null,Y=a.nTFoot!==null?z.getElementsByTagName("table")[0]:
null,B=i.browser.msie&&i.browser.version<=7;i(a.nTable).children("thead, tfoot").remove();g=i(a.nTHead).clone()[0];a.nTable.insertBefore(g,a.nTable.childNodes[0]);if(a.nTFoot!==null){m=i(a.nTFoot).clone()[0];a.nTable.insertBefore(m,a.nTable.childNodes[1])}if(a.oScroll.sX===""){d.style.width="100%";b.parentNode.style.width="100%"}var fa=W(a,g);e=0;for(f=fa.length;e<f;e++){y=v(a,e);fa[e].style.width=a.aoColumns[y].sWidth}a.nTFoot!==null&&V(function(I){I.style.width=""},m.getElementsByTagName("tr"));
if(a.oScroll.bCollapse&&a.oScroll.sY!=="")d.style.height=d.offsetHeight+a.nTHead.offsetHeight+"px";e=i(a.nTable).outerWidth();if(a.oScroll.sX===""){a.nTable.style.width="100%";if(B&&(i("tbody",d).height()>d.offsetHeight||i(d).css("overflow-y")=="scroll"))a.nTable.style.width=s(i(a.nTable).outerWidth()-a.oScroll.iBarWidth)}else if(a.oScroll.sXInner!=="")a.nTable.style.width=s(a.oScroll.sXInner);else if(e==i(d).width()&&i(d).height()<i(a.nTable).height()){a.nTable.style.width=s(e-a.oScroll.iBarWidth);
if(i(a.nTable).outerWidth()>e-a.oScroll.iBarWidth)a.nTable.style.width=s(e)}else a.nTable.style.width=s(e);e=i(a.nTable).outerWidth();f=a.nTHead.getElementsByTagName("tr");g=g.getElementsByTagName("tr");V(function(I,Q){k=I.style;k.paddingTop="0";k.paddingBottom="0";k.borderTopWidth="0";k.borderBottomWidth="0";k.height=0;u=i(I).width();Q.style.width=s(u);w.push(u)},g,f);i(g).height(0);if(a.nTFoot!==null){j=m.getElementsByTagName("tr");m=a.nTFoot.getElementsByTagName("tr");V(function(I,Q){k=I.style;
k.paddingTop="0";k.paddingBottom="0";k.borderTopWidth="0";k.borderBottomWidth="0";k.height=0;u=i(I).width();Q.style.width=s(u);w.push(u)},j,m);i(j).height(0)}V(function(I){I.innerHTML="";I.style.width=s(w.shift())},g);a.nTFoot!==null&&V(function(I){I.innerHTML="";I.style.width=s(w.shift())},j);if(i(a.nTable).outerWidth()<e){j=d.scrollHeight>d.offsetHeight||i(d).css("overflow-y")=="scroll"?e+a.oScroll.iBarWidth:e;if(B&&(d.scrollHeight>d.offsetHeight||i(d).css("overflow-y")=="scroll"))a.nTable.style.width=
s(j-a.oScroll.iBarWidth);d.style.width=s(j);b.parentNode.style.width=s(j);if(a.nTFoot!==null)z.parentNode.style.width=s(j);if(a.oScroll.sX==="")M(a,1,"The table cannot fit into the current element which will cause column misalignment. The table has been drawn at its minimum possible width.");else a.oScroll.sXInner!==""&&M(a,1,"The table cannot fit into the current element which will cause column misalignment. Increase the sScrollXInner value or remove it to allow automatic calculation")}else{d.style.width=
s("100%");b.parentNode.style.width=s("100%");if(a.nTFoot!==null)z.parentNode.style.width=s("100%")}if(a.oScroll.sY==="")if(B)d.style.height=s(a.nTable.offsetHeight+a.oScroll.iBarWidth);if(a.oScroll.sY!==""&&a.oScroll.bCollapse){d.style.height=s(a.oScroll.sY);B=a.oScroll.sX!==""&&a.nTable.offsetWidth>d.offsetWidth?a.oScroll.iBarWidth:0;if(a.nTable.offsetHeight<d.offsetHeight)d.style.height=s(a.nTable.offsetHeight+B)}B=i(a.nTable).outerWidth();c.style.width=s(B);b.style.width=s(B);c=i(a.nTable).height()>
d.clientHeight||i(d).css("overflow-y")=="scroll";b.style.paddingRight=c?a.oScroll.iBarWidth+"px":"0px";if(a.nTFoot!==null){Y.style.width=s(B);z.style.width=s(B);z.style.paddingRight=c?a.oScroll.iBarWidth+"px":"0px"}i(d).scroll();if(a.bSorted||a.bFiltered)d.scrollTop=0}function V(a,b,c){for(var d=0,e=b.length;d<e;d++)for(var f=0,g=b[d].childNodes.length;f<g;f++)if(b[d].childNodes[f].nodeType==1)c?a(b[d].childNodes[f],c[d].childNodes[f]):a(b[d].childNodes[f])}function Ya(a,b){if(!a||a===null||a==="")return 0;
b||(b=t.getElementsByTagName("body")[0]);var c=t.createElement("div");c.style.width=s(a);b.appendChild(c);a=c.offsetWidth;b.removeChild(c);return a}function pa(a){var b=0,c,d=0,e=a.aoColumns.length,f,g=i("th",a.nTHead),j=a.nTable.getAttribute("width");for(f=0;f<e;f++)if(a.aoColumns[f].bVisible){d++;if(a.aoColumns[f].sWidth!==null){c=Ya(a.aoColumns[f].sWidthOrig,a.nTable.parentNode);if(c!==null)a.aoColumns[f].sWidth=s(c);b++}}if(e==g.length&&b===0&&d==e&&a.oScroll.sX===""&&a.oScroll.sY==="")for(f=
0;f<a.aoColumns.length;f++){c=i(g[f]).width();if(c!==null)a.aoColumns[f].sWidth=s(c)}else{b=a.nTable.cloneNode(false);f=a.nTHead.cloneNode(true);d=t.createElement("tbody");c=t.createElement("tr");b.removeAttribute("id");b.appendChild(f);if(a.nTFoot!==null){b.appendChild(a.nTFoot.cloneNode(true));V(function(k){k.style.width=""},b.getElementsByTagName("tr"))}b.appendChild(d);d.appendChild(c);d=i("thead th",b);if(d.length===0)d=i("tbody tr:eq(0)>td",b);g=W(a,f);for(f=d=0;f<e;f++){var m=a.aoColumns[f];
if(m.bVisible&&m.sWidthOrig!==null&&m.sWidthOrig!=="")g[f-d].style.width=s(m.sWidthOrig);else if(m.bVisible)g[f-d].style.width="";else d++}for(f=0;f<e;f++)if(a.aoColumns[f].bVisible){d=Za(a,f);if(d!==null){d=d.cloneNode(true);if(a.aoColumns[f].sContentPadding!=="")d.innerHTML+=a.aoColumns[f].sContentPadding;c.appendChild(d)}}e=a.nTable.parentNode;e.appendChild(b);if(a.oScroll.sX!==""&&a.oScroll.sXInner!=="")b.style.width=s(a.oScroll.sXInner);else if(a.oScroll.sX!==""){b.style.width="";if(i(b).width()<
e.offsetWidth)b.style.width=s(e.offsetWidth)}else if(a.oScroll.sY!=="")b.style.width=s(e.offsetWidth);else if(j)b.style.width=s(j);b.style.visibility="hidden";$a(a,b);e=i("tbody tr:eq(0)",b).children();if(e.length===0)e=W(a,i("thead",b)[0]);if(a.oScroll.sX!==""){for(f=d=c=0;f<a.aoColumns.length;f++)if(a.aoColumns[f].bVisible){c+=a.aoColumns[f].sWidthOrig===null?i(e[d]).outerWidth():parseInt(a.aoColumns[f].sWidth.replace("px",""),10)+(i(e[d]).outerWidth()-i(e[d]).width());d++}b.style.width=s(c);a.nTable.style.width=
s(c)}for(f=d=0;f<a.aoColumns.length;f++)if(a.aoColumns[f].bVisible){c=i(e[d]).width();if(c!==null&&c>0)a.aoColumns[f].sWidth=s(c);d++}e=i(b).css("width");a.nTable.style.width=e.indexOf("%")!==-1?e:s(i(b).outerWidth());b.parentNode.removeChild(b)}if(j)a.nTable.style.width=s(j)}function $a(a,b){if(a.oScroll.sX===""&&a.oScroll.sY!==""){i(b).width();b.style.width=s(i(b).outerWidth()-a.oScroll.iBarWidth)}else if(a.oScroll.sX!=="")b.style.width=s(i(b).outerWidth())}function Za(a,b){var c=ab(a,b);if(c<0)return null;
if(a.aoData[c].nTr===null){var d=t.createElement("td");d.innerHTML=E(a,c,b,"");return d}return T(a,c)[b]}function ab(a,b){for(var c=-1,d=-1,e=0;e<a.aoData.length;e++){var f=E(a,e,b,"display")+"";f=f.replace(/<.*?>/g,"");if(f.length>c){c=f.length;d=e}}return d}function s(a){if(a===null)return"0px";if(typeof a=="number"){if(a<0)return"0px";return a+"px"}var b=a.charCodeAt(a.length-1);if(b<48||b>57)return a;return a+"px"}function bb(){var a=t.createElement("p"),b=a.style;b.width="100%";b.height="200px";
b.padding="0px";var c=t.createElement("div");b=c.style;b.position="absolute";b.top="0px";b.left="0px";b.visibility="hidden";b.width="200px";b.height="150px";b.padding="0px";b.overflow="hidden";c.appendChild(a);t.body.appendChild(c);b=a.offsetWidth;c.style.overflow="scroll";a=a.offsetWidth;if(b==a)a=c.clientWidth;t.body.removeChild(c);return b-a}function X(a,b){var c,d,e,f,g,j,m=[],k=[],y=l.ext.oSort,u=a.aoData,w=a.aoColumns,z=a.oLanguage.oAria;if(!a.oFeatures.bServerSide&&(a.aaSorting.length!==0||
a.aaSortingFixed!==null)){m=a.aaSortingFixed!==null?a.aaSortingFixed.concat(a.aaSorting):a.aaSorting.slice();for(c=0;c<m.length;c++){d=m[c][0];e=x(a,d);f=a.aoColumns[d].sSortDataType;if(l.ext.afnSortData[f]){g=l.ext.afnSortData[f].call(a.oInstance,a,d,e);if(g.length===u.length){e=0;for(f=u.length;e<f;e++)R(a,e,d,g[e])}else M(a,0,"Returned data sort array (col "+d+") is the wrong length")}}c=0;for(d=a.aiDisplayMaster.length;c<d;c++)k[a.aiDisplayMaster[c]]=c;var Y=m.length,B;c=0;for(d=u.length;c<d;c++)for(e=
0;e<Y;e++){B=w[m[e][0]].aDataSort;g=0;for(j=B.length;g<j;g++){f=w[B[g]].sType;f=y[(f?f:"string")+"-pre"];u[c]._aSortData[B[g]]=f?f(E(a,c,B[g],"sort")):E(a,c,B[g],"sort")}}a.aiDisplayMaster.sort(function(fa,I){var Q,Z,cb,$,ga;for(Q=0;Q<Y;Q++){ga=w[m[Q][0]].aDataSort;Z=0;for(cb=ga.length;Z<cb;Z++){$=w[ga[Z]].sType;$=y[($?$:"string")+"-"+m[Q][1]](u[fa]._aSortData[ga[Z]],u[I]._aSortData[ga[Z]]);if($!==0)return $}}return y["numeric-asc"](k[fa],k[I])})}if((b===p||b)&&!a.oFeatures.bDeferRender)aa(a);c=0;
for(d=a.aoColumns.length;c<d;c++){e=w[c].sTitle.replace(/<.*?>/g,"");b=w[c].nTh;b.removeAttribute("aria-sort");b.removeAttribute("aria-label");if(w[c].bSortable)if(m.length>0&&m[0][0]==c){b.setAttribute("aria-sort",m[0][1]=="asc"?"ascending":"descending");b.setAttribute("aria-label",e+((w[c].asSorting[m[0][2]+1]?w[c].asSorting[m[0][2]+1]:w[c].asSorting[0])=="asc"?z.sSortAscending:z.sSortDescending))}else b.setAttribute("aria-label",e+(w[c].asSorting[0]=="asc"?z.sSortAscending:z.sSortDescending));
else b.setAttribute("aria-label",e)}a.bSorted=true;i(a.oInstance).trigger("sort",a);if(a.oFeatures.bFilter)U(a,a.oPreviousSearch,1);else{a.aiDisplay=a.aiDisplayMaster.slice();a._iDisplayStart=0;J(a);H(a)}}function ua(a,b,c,d){db(b,{},function(e){if(a.aoColumns[c].bSortable!==false){var f=function(){var g,j;if(e.shiftKey){for(var m=false,k=0;k<a.aaSorting.length;k++)if(a.aaSorting[k][0]==c){m=true;g=a.aaSorting[k][0];j=a.aaSorting[k][2]+1;if(a.aoColumns[g].asSorting[j]){a.aaSorting[k][1]=a.aoColumns[g].asSorting[j];
a.aaSorting[k][2]=j}else a.aaSorting.splice(k,1);break}m===false&&a.aaSorting.push([c,a.aoColumns[c].asSorting[0],0])}else if(a.aaSorting.length==1&&a.aaSorting[0][0]==c){g=a.aaSorting[0][0];j=a.aaSorting[0][2]+1;a.aoColumns[g].asSorting[j]||(j=0);a.aaSorting[0][1]=a.aoColumns[g].asSorting[j];a.aaSorting[0][2]=j}else{a.aaSorting.splice(0,a.aaSorting.length);a.aaSorting.push([c,a.aoColumns[c].asSorting[0],0])}X(a)};if(a.oFeatures.bProcessing){O(a,true);setTimeout(function(){f();a.oFeatures.bServerSide||
O(a,false)},0)}else f();typeof d=="function"&&d(a)}})}function aa(a){var b,c,d,e,f,g=a.aoColumns.length,j=a.oClasses;for(b=0;b<g;b++)a.aoColumns[b].bSortable&&i(a.aoColumns[b].nTh).removeClass(j.sSortAsc+" "+j.sSortDesc+" "+a.aoColumns[b].sSortingClass);e=a.aaSortingFixed!==null?a.aaSortingFixed.concat(a.aaSorting):a.aaSorting.slice();for(b=0;b<a.aoColumns.length;b++)if(a.aoColumns[b].bSortable){f=a.aoColumns[b].sSortingClass;d=-1;for(c=0;c<e.length;c++)if(e[c][0]==b){f=e[c][1]=="asc"?j.sSortAsc:
j.sSortDesc;d=c;break}i(a.aoColumns[b].nTh).addClass(f);if(a.bJUI){c=i("span."+j.sSortIcon,a.aoColumns[b].nTh);c.removeClass(j.sSortJUIAsc+" "+j.sSortJUIDesc+" "+j.sSortJUI+" "+j.sSortJUIAscAllowed+" "+j.sSortJUIDescAllowed);c.addClass(d==-1?a.aoColumns[b].sSortingClassJUI:e[d][1]=="asc"?j.sSortJUIAsc:j.sSortJUIDesc)}}else i(a.aoColumns[b].nTh).addClass(a.aoColumns[b].sSortingClass);f=j.sSortColumn;if(a.oFeatures.bSort&&a.oFeatures.bSortClasses){d=T(a);if(a.oFeatures.bDeferRender)i(d).removeClass(f+
"1 "+f+"2 "+f+"3");else if(d.length>=g)for(b=0;b<g;b++)if(d[b].className.indexOf(f+"1")!=-1){c=0;for(a=d.length/g;c<a;c++)d[g*c+b].className=i.trim(d[g*c+b].className.replace(f+"1",""))}else if(d[b].className.indexOf(f+"2")!=-1){c=0;for(a=d.length/g;c<a;c++)d[g*c+b].className=i.trim(d[g*c+b].className.replace(f+"2",""))}else if(d[b].className.indexOf(f+"3")!=-1){c=0;for(a=d.length/g;c<a;c++)d[g*c+b].className=i.trim(d[g*c+b].className.replace(" "+f+"3",""))}j=1;var m;for(b=0;b<e.length;b++){m=parseInt(e[b][0],
10);c=0;for(a=d.length/g;c<a;c++)d[g*c+m].className+=" "+f+j;j<3&&j++}}}function Ea(a){if(!(!a.oFeatures.bStateSave||a.bDestroying)){var b,c;b=a.oScroll.bInfinite;var d={iCreate:(new Date).getTime(),iStart:b?0:a._iDisplayStart,iEnd:b?a._iDisplayLength:a._iDisplayEnd,iLength:a._iDisplayLength,aaSorting:i.extend(true,[],a.aaSorting),oSearch:i.extend(true,{},a.oPreviousSearch),aoSearchCols:i.extend(true,[],a.aoPreSearchCols),abVisCols:[]};b=0;for(c=a.aoColumns.length;b<c;b++)d.abVisCols.push(a.aoColumns[b].bVisible);
L(a,"aoStateSaveParams","stateSaveParams",[a,d]);a.fnStateSave.call(a.oInstance,a,d)}}function eb(a,b){if(a.oFeatures.bStateSave){var c=a.fnStateLoad.call(a.oInstance,a);if(c){var d=L(a,"aoStateLoadParams","stateLoadParams",[a,c]);if(i.inArray(false,d)===-1){a.oLoadedState=i.extend(true,{},c);a._iDisplayStart=c.iStart;a.iInitDisplayStart=c.iStart;a._iDisplayEnd=c.iEnd;a._iDisplayLength=c.iLength;a.aaSorting=c.aaSorting.slice();a.saved_aaSorting=c.aaSorting.slice();i.extend(a.oPreviousSearch,c.oSearch);
i.extend(true,a.aoPreSearchCols,c.aoSearchCols);b.saved_aoColumns=[];for(d=0;d<c.abVisCols.length;d++){b.saved_aoColumns[d]={};b.saved_aoColumns[d].bVisible=c.abVisCols[d]}L(a,"aoStateLoaded","stateLoaded",[a,c])}}}}function jb(a,b,c,d,e){var f=new Date;f.setTime(f.getTime()+c*1E3);c=ha.location.pathname.split("/");a=a+"_"+c.pop().replace(/[\/:]/g,"").toLowerCase();var g;if(e!==null){g=typeof i.parseJSON==="function"?i.parseJSON(b):eval("("+b+")");b=e(a,g,f.toGMTString(),c.join("/")+"/")}else b=a+
"="+encodeURIComponent(b)+"; expires="+f.toGMTString()+"; path="+c.join("/")+"/";e="";f=9999999999999;if((fb(a)!==null?t.cookie.length:b.length+t.cookie.length)+10>4096){a=t.cookie.split(";");for(var j=0,m=a.length;j<m;j++)if(a[j].indexOf(d)!=-1){var k=a[j].split("=");try{g=eval("("+decodeURIComponent(k[1])+")")}catch(y){continue}if(g.iCreate&&g.iCreate<f){e=k[0];f=g.iCreate}}if(e!=="")t.cookie=e+"=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path="+c.join("/")+"/"}t.cookie=b}function fb(a){var b=ha.location.pathname.split("/");
a=a+"_"+b[b.length-1].replace(/[\/:]/g,"").toLowerCase()+"=";b=t.cookie.split(";");for(var c=0;c<b.length;c++){for(var d=b[c];d.charAt(0)==" ";)d=d.substring(1,d.length);if(d.indexOf(a)===0)return decodeURIComponent(d.substring(a.length,d.length))}return null}function A(a){for(var b=0;b<l.settings.length;b++)if(l.settings[b].nTable===a)return l.settings[b];return null}function ca(a){var b=[];a=a.aoData;for(var c=0,d=a.length;c<d;c++)a[c].nTr!==null&&b.push(a[c].nTr);return b}function T(a,b){var c=
[],d,e,f,g,j;e=0;var m=a.aoData.length;if(b!==p){e=b;m=b+1}for(e=e;e<m;e++){j=a.aoData[e];if(j.nTr!==null){b=[];f=0;for(g=j.nTr.childNodes.length;f<g;f++){d=j.nTr.childNodes[f].nodeName.toLowerCase();if(d=="td"||d=="th")b.push(j.nTr.childNodes[f])}f=d=0;for(g=a.aoColumns.length;f<g;f++)if(a.aoColumns[f].bVisible)c.push(b[f-d]);else{c.push(j._anHidden[f]);d++}}}return c}function M(a,b,c){a=a===null?"DataTables warning: "+c:"DataTables warning (table id = '"+a.sTableId+"'): "+c;if(b===0)if(l.ext.sErrMode==
"alert")alert(a);else throw new Error(a);else ha.console&&console.log&&console.log(a)}function r(a,b,c,d){if(d===p)d=c;if(b[c]!==p)a[d]=b[c]}function gb(a,b){for(var c in b)if(b.hasOwnProperty(c))if(typeof h[c]==="object"&&i.isArray(b[c])===false)i.extend(true,a[c],b[c]);else a[c]=b[c];return a}function db(a,b,c){i(a).bind("click.DT",b,function(d){a.blur();c(d)}).bind("keypress.DT",b,function(d){d.which===13&&c(d)}).bind("selectstart.DT",function(){return false})}function K(a,b,c,d){c&&a[b].push({fn:c,
sName:d})}function L(a,b,c,d){b=a[b];for(var e=[],f=b.length-1;f>=0;f--)e.push(b[f].fn.apply(a.oInstance,d));c!==null&&i(a.oInstance).trigger(c,d);return e}function hb(a){return function(){var b=[A(this[l.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));return l.ext.oApi[a].apply(this,b)}}var ib=ha.JSON?JSON.stringify:function(a){var b=typeof a;if(b!=="object"||a===null){if(b==="string")a='"'+a+'"';return a+""}var c,d,e=[],f=i.isArray(a);for(c in a){d=a[c];b=typeof d;if(b==="string")d=
'"'+d+'"';else if(b==="object"&&d!==null)d=ib(d);e.push((f?"":'"'+c+'":')+d)}return(f?"[":"{")+e+(f?"]":"}")};this.$=function(a,b){var c,d=[],e;c=A(this[l.ext.iApiIndex]);var f=c.aoData,g=c.aiDisplay,j=c.aiDisplayMaster;b||(b={});b=i.extend({},{filter:"none",order:"current",page:"all"},b);if(b.page=="current"){b=c._iDisplayStart;for(c=c.fnDisplayEnd();b<c;b++)(e=f[g[b]].nTr)&&d.push(e)}else if(b.order=="current"&&b.filter=="none"){b=0;for(c=j.length;b<c;b++)(e=f[j[b]].nTr)&&d.push(e)}else if(b.order==
"current"&&b.filter=="applied"){b=0;for(c=g.length;b<c;b++)(e=f[g[b]].nTr)&&d.push(e)}else if(b.order=="original"&&b.filter=="none"){b=0;for(c=f.length;b<c;b++)(e=f[b].nTr)&&d.push(e)}else if(b.order=="original"&&b.filter=="applied"){b=0;for(c=f.length;b<c;b++){e=f[b].nTr;i.inArray(b,g)!==-1&&e&&d.push(e)}}else M(c,1,"Unknown selection options");f=i(d);d=f.filter(a);a=f.find(a);return i([].concat(i.makeArray(d),i.makeArray(a)))};this._=function(a,b){var c=[],d=this.$(a,b);a=0;for(b=d.length;a<b;a++)c.push(this.fnGetData(d[a]));
return c};this.fnAddData=function(a,b){if(a.length===0)return[];var c=[],d,e=A(this[l.ext.iApiIndex]);if(typeof a[0]==="object"&&a[0]!==null)for(var f=0;f<a.length;f++){d=P(e,a[f]);if(d==-1)return c;c.push(d)}else{d=P(e,a);if(d==-1)return c;c.push(d)}e.aiDisplay=e.aiDisplayMaster.slice();if(b===p||b)na(e);return c};this.fnAdjustColumnSizing=function(a){var b=A(this[l.ext.iApiIndex]);o(b);if(a===p||a)this.fnDraw(false);else if(b.oScroll.sX!==""||b.oScroll.sY!=="")this.oApi._fnScrollDraw(b)};this.fnClearTable=
function(a){var b=A(this[l.ext.iApiIndex]);sa(b);if(a===p||a)H(b)};this.fnClose=function(a){for(var b=A(this[l.ext.iApiIndex]),c=0;c<b.aoOpenRows.length;c++)if(b.aoOpenRows[c].nParent==a){(a=b.aoOpenRows[c].nTr.parentNode)&&a.removeChild(b.aoOpenRows[c].nTr);b.aoOpenRows.splice(c,1);return 0}return 1};this.fnDeleteRow=function(a,b,c){var d=A(this[l.ext.iApiIndex]),e,f;a=typeof a==="object"?N(d,a):a;var g=d.aoData.splice(a,1);e=0;for(f=d.aoData.length;e<f;e++)if(d.aoData[e].nTr!==null)d.aoData[e].nTr._DT_RowIndex=
e;e=i.inArray(a,d.aiDisplay);d.asDataSearch.splice(e,1);ta(d.aiDisplayMaster,a);ta(d.aiDisplay,a);typeof b==="function"&&b.call(this,d,g);if(d._iDisplayStart>=d.fnRecordsDisplay()){d._iDisplayStart-=d._iDisplayLength;if(d._iDisplayStart<0)d._iDisplayStart=0}if(c===p||c){J(d);H(d)}return g};this.fnDestroy=function(a){var b=A(this[l.ext.iApiIndex]),c=b.nTableWrapper.parentNode,d=b.nTBody,e,f;a=a===p?false:true;b.bDestroying=true;L(b,"aoDestroyCallback","destroy",[b]);e=0;for(f=b.aoColumns.length;e<
f;e++)b.aoColumns[e].bVisible===false&&this.fnSetColumnVis(e,true);i(b.nTableWrapper).find("*").andSelf().unbind(".DT");i("tbody>tr>td."+b.oClasses.sRowEmpty,b.nTable).parent().remove();if(b.nTable!=b.nTHead.parentNode){i(b.nTable).children("thead").remove();b.nTable.appendChild(b.nTHead)}if(b.nTFoot&&b.nTable!=b.nTFoot.parentNode){i(b.nTable).children("tfoot").remove();b.nTable.appendChild(b.nTFoot)}b.nTable.parentNode.removeChild(b.nTable);i(b.nTableWrapper).remove();b.aaSorting=[];b.aaSortingFixed=
[];aa(b);i(ca(b)).removeClass(b.asStripeClasses.join(" "));i("th, td",b.nTHead).removeClass([b.oClasses.sSortable,b.oClasses.sSortableAsc,b.oClasses.sSortableDesc,b.oClasses.sSortableNone].join(" "));if(b.bJUI){i("th span."+b.oClasses.sSortIcon+", td span."+b.oClasses.sSortIcon,b.nTHead).remove();i("th, td",b.nTHead).each(function(){var g=i("div."+b.oClasses.sSortJUIWrapper,this),j=g.contents();i(this).append(j);g.remove()})}if(!a&&b.nTableReinsertBefore)c.insertBefore(b.nTable,b.nTableReinsertBefore);
else a||c.appendChild(b.nTable);e=0;for(f=b.aoData.length;e<f;e++)b.aoData[e].nTr!==null&&d.appendChild(b.aoData[e].nTr);if(b.oFeatures.bAutoWidth===true)b.nTable.style.width=s(b.sDestroyWidth);i(d).children("tr:even").addClass(b.asDestroyStripes[0]);i(d).children("tr:odd").addClass(b.asDestroyStripes[1]);e=0;for(f=l.settings.length;e<f;e++)l.settings[e]==b&&l.settings.splice(e,1);b=null};this.fnDraw=function(a){var b=A(this[l.ext.iApiIndex]);if(a===false){J(b);H(b)}else na(b)};this.fnFilter=function(a,
b,c,d,e,f){var g=A(this[l.ext.iApiIndex]);if(g.oFeatures.bFilter){if(c===p||c===null)c=false;if(d===p||d===null)d=true;if(e===p||e===null)e=true;if(f===p||f===null)f=true;if(b===p||b===null){U(g,{sSearch:a+"",bRegex:c,bSmart:d,bCaseInsensitive:f},1);if(e&&g.aanFeatures.f){b=g.aanFeatures.f;c=0;for(d=b.length;c<d;c++)i(b[c]._DT_Input).val(a)}}else{i.extend(g.aoPreSearchCols[b],{sSearch:a+"",bRegex:c,bSmart:d,bCaseInsensitive:f});U(g,g.oPreviousSearch,1)}}};this.fnGetData=function(a,b){var c=A(this[l.ext.iApiIndex]);
if(a!==p){var d=a;if(typeof a==="object"){var e=a.nodeName.toLowerCase();if(e==="tr")d=N(c,a);else if(e==="td"){d=N(c,a.parentNode);b=ra(c,d,a)}}if(b!==p)return E(c,d,b,"");return c.aoData[d]!==p?c.aoData[d]._aData:null}return la(c)};this.fnGetNodes=function(a){var b=A(this[l.ext.iApiIndex]);if(a!==p)return b.aoData[a]!==p?b.aoData[a].nTr:null;return ca(b)};this.fnGetPosition=function(a){var b=A(this[l.ext.iApiIndex]),c=a.nodeName.toUpperCase();if(c=="TR")return N(b,a);else if(c=="TD"||c=="TH"){c=
N(b,a.parentNode);a=ra(b,c,a);return[c,x(b,a),a]}return null};this.fnIsOpen=function(a){for(var b=A(this[l.ext.iApiIndex]),c=0;c<b.aoOpenRows.length;c++)if(b.aoOpenRows[c].nParent==a)return true;return false};this.fnOpen=function(a,b,c){var d=A(this[l.ext.iApiIndex]),e=ca(d);if(i.inArray(a,e)!==-1){this.fnClose(a);e=t.createElement("tr");var f=t.createElement("td");e.appendChild(f);f.className=c;f.colSpan=C(d);if(typeof b==="string")f.innerHTML=b;else i(f).html(b);b=i("tr",d.nTBody);i.inArray(a,b)!=
-1&&i(e).insertAfter(a);d.aoOpenRows.push({nTr:e,nParent:a});return e}};this.fnPageChange=function(a,b){var c=A(this[l.ext.iApiIndex]);Da(c,a);J(c);if(b===p||b)H(c)};this.fnSetColumnVis=function(a,b,c){var d=A(this[l.ext.iApiIndex]),e,f,g=d.aoColumns,j=d.aoData,m,k;if(g[a].bVisible!=b){if(b){for(e=f=0;e<a;e++)g[e].bVisible&&f++;k=f>=C(d);if(!k)for(e=a;e<g.length;e++)if(g[e].bVisible){m=e;break}e=0;for(f=j.length;e<f;e++)if(j[e].nTr!==null)k?j[e].nTr.appendChild(j[e]._anHidden[a]):j[e].nTr.insertBefore(j[e]._anHidden[a],
T(d,e)[m])}else{e=0;for(f=j.length;e<f;e++)if(j[e].nTr!==null){m=T(d,e)[a];j[e]._anHidden[a]=m;m.parentNode.removeChild(m)}}g[a].bVisible=b;ea(d,d.aoHeader);d.nTFoot&&ea(d,d.aoFooter);e=0;for(f=d.aoOpenRows.length;e<f;e++)d.aoOpenRows[e].nTr.colSpan=C(d);if(c===p||c){o(d);H(d)}Ea(d)}};this.fnSettings=function(){return A(this[l.ext.iApiIndex])};this.fnSort=function(a){var b=A(this[l.ext.iApiIndex]);b.aaSorting=a;X(b)};this.fnSortListener=function(a,b,c){ua(A(this[l.ext.iApiIndex]),a,b,c)};this.fnUpdate=
function(a,b,c,d,e){var f=A(this[l.ext.iApiIndex]);b=typeof b==="object"?N(f,b):b;if(f.__fnUpdateDeep===p&&i.isArray(a)&&typeof a==="object"){f.aoData[b]._aData=a.slice();f.__fnUpdateDeep=true;for(c=0;c<f.aoColumns.length;c++)this.fnUpdate(E(f,b,c),b,c,false,false);f.__fnUpdateDeep=p}else if(f.__fnUpdateDeep===p&&a!==null&&typeof a==="object"){f.aoData[b]._aData=i.extend(true,{},a);f.__fnUpdateDeep=true;for(c=0;c<f.aoColumns.length;c++)this.fnUpdate(E(f,b,c),b,c,false,false);f.__fnUpdateDeep=p}else{R(f,
b,c,a);a=E(f,b,c,"display");var g=f.aoColumns[c];if(g.fnRender!==null){a=ba(f,b,c);g.bUseRendered&&R(f,b,c,a)}if(f.aoData[b].nTr!==null)T(f,b)[c].innerHTML=a}c=i.inArray(b,f.aiDisplay);f.asDataSearch[c]=Aa(f,ka(f,b,"filter"));if(e===p||e)o(f);if(d===p||d)na(f);return 0};this.fnVersionCheck=l.ext.fnVersionCheck;this.oApi={_fnExternApiFunc:hb,_fnInitialise:oa,_fnInitComplete:ma,_fnLanguageCompat:Ca,_fnAddColumn:n,_fnColumnOptions:q,_fnAddData:P,_fnCreateTr:qa,_fnGatherData:ja,_fnBuildHead:Ia,_fnDrawHead:ea,
_fnDraw:H,_fnReDraw:na,_fnAjaxUpdate:Ja,_fnAjaxParameters:Ra,_fnAjaxUpdateDraw:Sa,_fnServerParams:wa,_fnAddOptionsHtml:Ka,_fnFeatureHtmlTable:Oa,_fnScrollDraw:Xa,_fnAdjustColumnSizing:o,_fnFeatureHtmlFilter:Ma,_fnFilterComplete:U,_fnFilterCustom:Va,_fnFilterColumn:Ua,_fnFilter:Ta,_fnBuildSearchArray:xa,_fnBuildSearchRow:Aa,_fnFilterCreateSearch:ya,_fnDataToSearch:za,_fnSort:X,_fnSortAttachListener:ua,_fnSortingClasses:aa,_fnFeatureHtmlPaginate:Qa,_fnPageChange:Da,_fnFeatureHtmlInfo:Pa,_fnUpdateInfo:Wa,
_fnFeatureHtmlLength:La,_fnFeatureHtmlProcessing:Na,_fnProcessingDisplay:O,_fnVisibleToColumnIndex:v,_fnColumnIndexToVisible:x,_fnNodeToDataIndex:N,_fnVisbleColumns:C,_fnCalculateEnd:J,_fnConvertToWidth:Ya,_fnCalculateColumnWidths:pa,_fnScrollingWidthAdjust:$a,_fnGetWidestNode:Za,_fnGetMaxLenString:ab,_fnStringToCss:s,_fnDetectType:D,_fnSettingsFromNode:A,_fnGetDataMaster:la,_fnGetTrNodes:ca,_fnGetTdNodes:T,_fnEscapeRegex:Ba,_fnDeleteIndex:ta,_fnReOrderIndex:G,_fnColumnOrdering:F,_fnLog:M,_fnClearTable:sa,
_fnSaveState:Ea,_fnLoadState:eb,_fnCreateCookie:jb,_fnReadCookie:fb,_fnDetectHeader:da,_fnGetUniqueThs:W,_fnScrollBarWidth:bb,_fnApplyToChildren:V,_fnMap:r,_fnGetRowData:ka,_fnGetCellData:E,_fnSetCellData:R,_fnGetObjectDataFn:ia,_fnSetObjectDataFn:Ha,_fnApplyColumnDefs:S,_fnBindAction:db,_fnExtend:gb,_fnCallbackReg:K,_fnCallbackFire:L,_fnJsonString:ib,_fnRender:ba,_fnNodeToColumnIndex:ra,_fnInfoMacros:va};i.extend(l.ext.oApi,this.oApi);for(var Fa in l.ext.oApi)if(Fa)this[Fa]=hb(Fa);var Ga=this;return this.each(function(){var a=
0,b,c,d;c=this.getAttribute("id");var e=false,f=false;if(this.nodeName.toLowerCase()!="table")M(null,0,"Attempted to initialise DataTables on a node which is not a table: "+this.nodeName);else{a=0;for(b=l.settings.length;a<b;a++){if(l.settings[a].nTable==this)if(h===p||h.bRetrieve)return l.settings[a].oInstance;else if(h.bDestroy){l.settings[a].oInstance.fnDestroy();break}else{M(l.settings[a],0,"Cannot reinitialise DataTable.\n\nTo retrieve the DataTables object for this table, pass no arguments or see the docs for bRetrieve and bDestroy");
return}if(l.settings[a].sTableId==this.id){l.settings.splice(a,1);break}}if(c===null||c==="")this.id=c="DataTables_Table_"+l.ext._oExternConfig.iNextUnique++;var g=i.extend(true,{},l.models.oSettings,{nTable:this,oApi:Ga.oApi,oInit:h,sDestroyWidth:i(this).width(),sInstance:c,sTableId:c});l.settings.push(g);g.oInstance=Ga.length===1?Ga:i(this).dataTable();h||(h={});h.oLanguage&&Ca(h.oLanguage);h=gb(i.extend(true,{},l.defaults),h);r(g.oFeatures,h,"bPaginate");r(g.oFeatures,h,"bLengthChange");r(g.oFeatures,
h,"bFilter");r(g.oFeatures,h,"bSort");r(g.oFeatures,h,"bInfo");r(g.oFeatures,h,"bProcessing");r(g.oFeatures,h,"bAutoWidth");r(g.oFeatures,h,"bSortClasses");r(g.oFeatures,h,"bServerSide");r(g.oFeatures,h,"bDeferRender");r(g.oScroll,h,"sScrollX","sX");r(g.oScroll,h,"sScrollXInner","sXInner");r(g.oScroll,h,"sScrollY","sY");r(g.oScroll,h,"bScrollCollapse","bCollapse");r(g.oScroll,h,"bScrollInfinite","bInfinite");r(g.oScroll,h,"iScrollLoadGap","iLoadGap");r(g.oScroll,h,"bScrollAutoCss","bAutoCss");r(g,
h,"asStripeClasses");r(g,h,"asStripClasses","asStripeClasses");r(g,h,"fnServerData");r(g,h,"fnFormatNumber");r(g,h,"sServerMethod");r(g,h,"aaSorting");r(g,h,"aaSortingFixed");r(g,h,"aLengthMenu");r(g,h,"sPaginationType");r(g,h,"sAjaxSource");r(g,h,"sAjaxDataProp");r(g,h,"iCookieDuration");r(g,h,"sCookiePrefix");r(g,h,"sDom");r(g,h,"bSortCellsTop");r(g,h,"iTabIndex");r(g,h,"oSearch","oPreviousSearch");r(g,h,"aoSearchCols","aoPreSearchCols");r(g,h,"iDisplayLength","_iDisplayLength");r(g,h,"bJQueryUI",
"bJUI");r(g,h,"fnCookieCallback");r(g,h,"fnStateLoad");r(g,h,"fnStateSave");r(g.oLanguage,h,"fnInfoCallback");K(g,"aoDrawCallback",h.fnDrawCallback,"user");K(g,"aoServerParams",h.fnServerParams,"user");K(g,"aoStateSaveParams",h.fnStateSaveParams,"user");K(g,"aoStateLoadParams",h.fnStateLoadParams,"user");K(g,"aoStateLoaded",h.fnStateLoaded,"user");K(g,"aoRowCallback",h.fnRowCallback,"user");K(g,"aoRowCreatedCallback",h.fnCreatedRow,"user");K(g,"aoHeaderCallback",h.fnHeaderCallback,"user");K(g,"aoFooterCallback",
h.fnFooterCallback,"user");K(g,"aoInitComplete",h.fnInitComplete,"user");K(g,"aoPreDrawCallback",h.fnPreDrawCallback,"user");if(g.oFeatures.bServerSide&&g.oFeatures.bSort&&g.oFeatures.bSortClasses)K(g,"aoDrawCallback",aa,"server_side_sort_classes");else g.oFeatures.bDeferRender&&K(g,"aoDrawCallback",aa,"defer_sort_classes");if(h.bJQueryUI){i.extend(g.oClasses,l.ext.oJUIClasses);if(h.sDom===l.defaults.sDom&&l.defaults.sDom==="lfrtip")g.sDom='<"H"lfr>t<"F"ip>'}else i.extend(g.oClasses,l.ext.oStdClasses);
i(this).addClass(g.oClasses.sTable);if(g.oScroll.sX!==""||g.oScroll.sY!=="")g.oScroll.iBarWidth=bb();if(g.iInitDisplayStart===p){g.iInitDisplayStart=h.iDisplayStart;g._iDisplayStart=h.iDisplayStart}if(h.bStateSave){g.oFeatures.bStateSave=true;eb(g,h);K(g,"aoDrawCallback",Ea,"state_save")}if(h.iDeferLoading!==null){g.bDeferLoading=true;a=i.isArray(h.iDeferLoading);g._iRecordsDisplay=a?h.iDeferLoading[0]:h.iDeferLoading;g._iRecordsTotal=a?h.iDeferLoading[1]:h.iDeferLoading}if(h.aaData!==null)f=true;
if(h.oLanguage.sUrl!==""){g.oLanguage.sUrl=h.oLanguage.sUrl;i.getJSON(g.oLanguage.sUrl,null,function(m){Ca(m);i.extend(true,g.oLanguage,h.oLanguage,m);oa(g)});e=true}else i.extend(true,g.oLanguage,h.oLanguage);if(h.asStripeClasses===null)g.asStripeClasses=[g.oClasses.sStripeOdd,g.oClasses.sStripeEven];c=false;d=i(this).children("tbody").children("tr");a=0;for(b=g.asStripeClasses.length;a<b;a++)if(d.filter(":lt(2)").hasClass(g.asStripeClasses[a])){c=true;break}if(c){g.asDestroyStripes=["",""];if(i(d[0]).hasClass(g.oClasses.sStripeOdd))g.asDestroyStripes[0]+=
g.oClasses.sStripeOdd+" ";if(i(d[0]).hasClass(g.oClasses.sStripeEven))g.asDestroyStripes[0]+=g.oClasses.sStripeEven;if(i(d[1]).hasClass(g.oClasses.sStripeOdd))g.asDestroyStripes[1]+=g.oClasses.sStripeOdd+" ";if(i(d[1]).hasClass(g.oClasses.sStripeEven))g.asDestroyStripes[1]+=g.oClasses.sStripeEven;d.removeClass(g.asStripeClasses.join(" "))}c=[];a=this.getElementsByTagName("thead");if(a.length!==0){da(g.aoHeader,a[0]);c=W(g)}if(h.aoColumns===null){d=[];a=0;for(b=c.length;a<b;a++)d.push(null)}else d=
h.aoColumns;a=0;for(b=d.length;a<b;a++){if(h.saved_aoColumns!==p&&h.saved_aoColumns.length==b){if(d[a]===null)d[a]={};d[a].bVisible=h.saved_aoColumns[a].bVisible}n(g,c?c[a]:null)}S(g,h.aoColumnDefs,d,function(m,k){q(g,m,k)});a=0;for(b=g.aaSorting.length;a<b;a++){if(g.aaSorting[a][0]>=g.aoColumns.length)g.aaSorting[a][0]=0;var j=g.aoColumns[g.aaSorting[a][0]];if(g.aaSorting[a][2]===p)g.aaSorting[a][2]=0;if(h.aaSorting===p&&g.saved_aaSorting===p)g.aaSorting[a][1]=j.asSorting[0];c=0;for(d=j.asSorting.length;c<
d;c++)if(g.aaSorting[a][1]==j.asSorting[c]){g.aaSorting[a][2]=c;break}}aa(g);a=i(this).children("caption").each(function(){this._captionSide=i(this).css("caption-side")});b=i(this).children("thead");if(b.length===0){b=[t.createElement("thead")];this.appendChild(b[0])}g.nTHead=b[0];b=i(this).children("tbody");if(b.length===0){b=[t.createElement("tbody")];this.appendChild(b[0])}g.nTBody=b[0];g.nTBody.setAttribute("role","alert");g.nTBody.setAttribute("aria-live","polite");g.nTBody.setAttribute("aria-relevant",
"all");b=i(this).children("tfoot");if(b.length===0&&a.length>0&&(g.oScroll.sX!==""||g.oScroll.sY!=="")){b=[t.createElement("tfoot")];this.appendChild(b[0])}if(b.length>0){g.nTFoot=b[0];da(g.aoFooter,g.nTFoot)}if(f)for(a=0;a<h.aaData.length;a++)P(g,h.aaData[a]);else ja(g);g.aiDisplay=g.aiDisplayMaster.slice();g.bInitialised=true;e===false&&oa(g)}})};l.fnVersionCheck=function(h){var n=function(D,G){for(;D.length<G;)D+="0";return D},q=l.ext.sVersion.split(".");h=h.split(".");for(var o="",v="",x=0,C=
h.length;x<C;x++){o+=n(q[x],3);v+=n(h[x],3)}return parseInt(o,10)>=parseInt(v,10)};l.fnIsDataTable=function(h){for(var n=l.settings,q=0;q<n.length;q++)if(n[q].nTable===h||n[q].nScrollHead===h||n[q].nScrollFoot===h)return true;return false};l.fnTables=function(h){var n=[];jQuery.each(l.settings,function(q,o){if(!h||h===true&&i(o.nTable).is(":visible"))n.push(o.nTable)});return n};l.version="1.9.2";l.settings=[];l.models={};l.models.ext={afnFiltering:[],afnSortData:[],aoFeatures:[],aTypes:[],fnVersionCheck:l.fnVersionCheck,
iApiIndex:0,ofnSearch:{},oApi:{},oStdClasses:{},oJUIClasses:{},oPagination:{},oSort:{},sVersion:l.version,sErrMode:"alert",_oExternConfig:{iNextUnique:0}};l.models.oSearch={bCaseInsensitive:true,sSearch:"",bRegex:false,bSmart:true};l.models.oRow={nTr:null,_aData:[],_aSortData:[],_anHidden:[],_sRowStripe:""};l.models.oColumn={aDataSort:null,asSorting:null,bSearchable:null,bSortable:null,bUseRendered:null,bVisible:null,_bAutoType:true,fnCreatedCell:null,fnGetData:null,fnRender:null,fnSetData:null,mDataProp:null,
nTh:null,nTf:null,sClass:null,sContentPadding:null,sDefaultContent:null,sName:null,sSortDataType:"std",sSortingClass:null,sSortingClassJUI:null,sTitle:null,sType:null,sWidth:null,sWidthOrig:null};l.defaults={aaData:null,aaSorting:[[0,"asc"]],aaSortingFixed:null,aLengthMenu:[10,25,50,100],aoColumns:null,aoColumnDefs:null,aoSearchCols:[],asStripeClasses:null,bAutoWidth:true,bDeferRender:false,bDestroy:false,bFilter:true,bInfo:true,bJQueryUI:false,bLengthChange:true,bPaginate:true,bProcessing:false,
bRetrieve:false,bScrollAutoCss:true,bScrollCollapse:false,bScrollInfinite:false,bServerSide:false,bSort:true,bSortCellsTop:false,bSortClasses:true,bStateSave:false,fnCookieCallback:null,fnCreatedRow:null,fnDrawCallback:null,fnFooterCallback:null,fnFormatNumber:function(h){if(h<1E3)return h;var n=h+"";h=n.split("");var q="";n=n.length;for(var o=0;o<n;o++){if(o%3===0&&o!==0)q=this.oLanguage.sInfoThousands+q;q=h[n-o-1]+q}return q},fnHeaderCallback:null,fnInfoCallback:null,fnInitComplete:null,fnPreDrawCallback:null,
fnRowCallback:null,fnServerData:function(h,n,q,o){o.jqXHR=i.ajax({url:h,data:n,success:function(v){i(o.oInstance).trigger("xhr",o);q(v)},dataType:"json",cache:false,type:o.sServerMethod,error:function(v,x){x=="parsererror"&&o.oApi._fnLog(o,0,"DataTables warning: JSON data from server could not be parsed. This is caused by a JSON formatting error.")}})},fnServerParams:null,fnStateLoad:function(h){h=this.oApi._fnReadCookie(h.sCookiePrefix+h.sInstance);var n;try{n=typeof i.parseJSON==="function"?i.parseJSON(h):
eval("("+h+")")}catch(q){n=null}return n},fnStateLoadParams:null,fnStateLoaded:null,fnStateSave:function(h,n){this.oApi._fnCreateCookie(h.sCookiePrefix+h.sInstance,this.oApi._fnJsonString(n),h.iCookieDuration,h.sCookiePrefix,h.fnCookieCallback)},fnStateSaveParams:null,iCookieDuration:7200,iDeferLoading:null,iDisplayLength:10,iDisplayStart:0,iScrollLoadGap:100,iTabIndex:0,oLanguage:{oAria:{sSortAscending:": activate to sort column ascending",sSortDescending:": activate to sort column descending"},
oPaginate:{sFirst:"First",sLast:"Last",sNext:"Next",sPrevious:"Previous"},sEmptyTable:"No data available in table",sInfo:"Showing _START_ to _END_ of _TOTAL_ entries",sInfoEmpty:"Showing 0 to 0 of 0 entries",sInfoFiltered:"(filtered from _MAX_ total entries)",sInfoPostFix:"",sInfoThousands:",",sLengthMenu:"Show _MENU_ entries",sLoadingRecords:"Loading...",sProcessing:"Processing...",sSearch:"Search:",sUrl:"",sZeroRecords:"No matching records found"},oSearch:i.extend({},l.models.oSearch),sAjaxDataProp:"aaData",
sAjaxSource:null,sCookiePrefix:"SpryMedia_DataTables_",sDom:"lfrtip",sPaginationType:"two_button",sScrollX:"",sScrollXInner:"",sScrollY:"",sServerMethod:"GET"};l.defaults.columns={aDataSort:null,asSorting:["asc","desc"],bSearchable:true,bSortable:true,bUseRendered:true,bVisible:true,fnCreatedCell:null,fnRender:null,iDataSort:-1,mDataProp:null,sCellType:"td",sClass:"",sContentPadding:"",sDefaultContent:null,sName:"",sSortDataType:"std",sTitle:null,sType:null,sWidth:null};l.models.oSettings={oFeatures:{bAutoWidth:null,
bDeferRender:null,bFilter:null,bInfo:null,bLengthChange:null,bPaginate:null,bProcessing:null,bServerSide:null,bSort:null,bSortClasses:null,bStateSave:null},oScroll:{bAutoCss:null,bCollapse:null,bInfinite:null,iBarWidth:0,iLoadGap:null,sX:null,sXInner:null,sY:null},oLanguage:{fnInfoCallback:null},aanFeatures:[],aoData:[],aiDisplay:[],aiDisplayMaster:[],aoColumns:[],aoHeader:[],aoFooter:[],asDataSearch:[],oPreviousSearch:{},aoPreSearchCols:[],aaSorting:null,aaSortingFixed:null,asStripeClasses:null,
asDestroyStripes:[],sDestroyWidth:0,aoRowCallback:[],aoHeaderCallback:[],aoFooterCallback:[],aoDrawCallback:[],aoRowCreatedCallback:[],aoPreDrawCallback:[],aoInitComplete:[],aoStateSaveParams:[],aoStateLoadParams:[],aoStateLoaded:[],sTableId:"",nTable:null,nTHead:null,nTFoot:null,nTBody:null,nTableWrapper:null,bDeferLoading:false,bInitialised:false,aoOpenRows:[],sDom:null,sPaginationType:"two_button",iCookieDuration:0,sCookiePrefix:"",fnCookieCallback:null,aoStateSave:[],aoStateLoad:[],oLoadedState:null,
sAjaxSource:null,sAjaxDataProp:null,bAjaxDataGet:true,jqXHR:null,fnServerData:null,aoServerParams:[],sServerMethod:null,fnFormatNumber:null,aLengthMenu:null,iDraw:0,bDrawing:false,iDrawError:-1,_iDisplayLength:10,_iDisplayStart:0,_iDisplayEnd:10,_iRecordsTotal:0,_iRecordsDisplay:0,bJUI:null,oClasses:{},bFiltered:false,bSorted:false,bSortCellsTop:null,oInit:null,aoDestroyCallback:[],fnRecordsTotal:function(){return this.oFeatures.bServerSide?parseInt(this._iRecordsTotal,10):this.aiDisplayMaster.length},
fnRecordsDisplay:function(){return this.oFeatures.bServerSide?parseInt(this._iRecordsDisplay,10):this.aiDisplay.length},fnDisplayEnd:function(){return this.oFeatures.bServerSide?this.oFeatures.bPaginate===false||this._iDisplayLength==-1?this._iDisplayStart+this.aiDisplay.length:Math.min(this._iDisplayStart+this._iDisplayLength,this._iRecordsDisplay):this._iDisplayEnd},oInstance:null,sInstance:null,iTabIndex:0,nScrollHead:null,nScrollFoot:null};l.ext=i.extend(true,{},l.models.ext);i.extend(l.ext.oStdClasses,
{sTable:"dataTable",sPagePrevEnabled:"paginate_enabled_previous",sPagePrevDisabled:"paginate_disabled_previous",sPageNextEnabled:"paginate_enabled_next",sPageNextDisabled:"paginate_disabled_next",sPageJUINext:"",sPageJUIPrev:"",sPageButton:"paginate_button",sPageButtonActive:"paginate_active",sPageButtonStaticDisabled:"paginate_button paginate_button_disabled",sPageFirst:"first",sPagePrevious:"previous",sPageNext:"next",sPageLast:"last",sStripeOdd:"odd",sStripeEven:"even",sRowEmpty:"dataTables_empty",
sWrapper:"dataTables_wrapper",sFilter:"dataTables_filter",sInfo:"dataTables_info",sPaging:"dataTables_paginate paging_",sLength:"dataTables_length",sProcessing:"dataTables_processing",sSortAsc:"sorting_asc",sSortDesc:"sorting_desc",sSortable:"sorting",sSortableAsc:"sorting_asc_disabled",sSortableDesc:"sorting_desc_disabled",sSortableNone:"sorting_disabled",sSortColumn:"sorting_",sSortJUIAsc:"",sSortJUIDesc:"",sSortJUI:"",sSortJUIAscAllowed:"",sSortJUIDescAllowed:"",sSortJUIWrapper:"",sSortIcon:"",
sScrollWrapper:"dataTables_scroll",sScrollHead:"dataTables_scrollHead",sScrollHeadInner:"dataTables_scrollHeadInner",sScrollBody:"dataTables_scrollBody",sScrollFoot:"dataTables_scrollFoot",sScrollFootInner:"dataTables_scrollFootInner",sFooterTH:"",sJUIHeader:"",sJUIFooter:""});i.extend(l.ext.oJUIClasses,l.ext.oStdClasses,{sPagePrevEnabled:"fg-button ui-button ui-state-default ui-corner-left",sPagePrevDisabled:"fg-button ui-button ui-state-default ui-corner-left ui-state-disabled",sPageNextEnabled:"fg-button ui-button ui-state-default ui-corner-right",
sPageNextDisabled:"fg-button ui-button ui-state-default ui-corner-right ui-state-disabled",sPageJUINext:"ui-icon ui-icon-circle-arrow-e",sPageJUIPrev:"ui-icon ui-icon-circle-arrow-w",sPageButton:"fg-button ui-button ui-state-default",sPageButtonActive:"fg-button ui-button ui-state-default ui-state-disabled",sPageButtonStaticDisabled:"fg-button ui-button ui-state-default ui-state-disabled",sPageFirst:"first ui-corner-tl ui-corner-bl",sPageLast:"last ui-corner-tr ui-corner-br",sPaging:"dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_",
sSortAsc:"ui-state-default",sSortDesc:"ui-state-default",sSortable:"ui-state-default",sSortableAsc:"ui-state-default",sSortableDesc:"ui-state-default",sSortableNone:"ui-state-default",sSortJUIAsc:"css_right ui-icon ui-icon-triangle-1-n",sSortJUIDesc:"css_right ui-icon ui-icon-triangle-1-s",sSortJUI:"css_right ui-icon ui-icon-carat-2-n-s",sSortJUIAscAllowed:"css_right ui-icon ui-icon-carat-1-n",sSortJUIDescAllowed:"css_right ui-icon ui-icon-carat-1-s",sSortJUIWrapper:"DataTables_sort_wrapper",sSortIcon:"DataTables_sort_icon",
sScrollHead:"dataTables_scrollHead ui-state-default",sScrollFoot:"dataTables_scrollFoot ui-state-default",sFooterTH:"ui-state-default",sJUIHeader:"fg-toolbar ui-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix",sJUIFooter:"fg-toolbar ui-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix"});i.extend(l.ext.oPagination,{two_button:{fnInit:function(h,n,q){var o=h.oLanguage.oPaginate,v=function(C){h.oApi._fnPageChange(h,C.data.action)&&q(h)};o=!h.bJUI?'<a class="'+
h.oClasses.sPagePrevDisabled+'" tabindex="'+h.iTabIndex+'" role="button">'+o.sPrevious+'</a><a class="'+h.oClasses.sPageNextDisabled+'" tabindex="'+h.iTabIndex+'" role="button">'+o.sNext+"</a>":'<a class="'+h.oClasses.sPagePrevDisabled+'" tabindex="'+h.iTabIndex+'" role="button"><span class="'+h.oClasses.sPageJUIPrev+'"></span></a><a class="'+h.oClasses.sPageNextDisabled+'" tabindex="'+h.iTabIndex+'" role="button"><span class="'+h.oClasses.sPageJUINext+'"></span></a>';i(n).append(o);var x=i("a",n);
o=x[0];x=x[1];h.oApi._fnBindAction(o,{action:"previous"},v);h.oApi._fnBindAction(x,{action:"next"},v);if(!h.aanFeatures.p){n.id=h.sTableId+"_paginate";o.id=h.sTableId+"_previous";x.id=h.sTableId+"_next";o.setAttribute("aria-controls",h.sTableId);x.setAttribute("aria-controls",h.sTableId)}},fnUpdate:function(h){if(h.aanFeatures.p)for(var n=h.oClasses,q=h.aanFeatures.p,o=0,v=q.length;o<v;o++)if(q[o].childNodes.length!==0){q[o].childNodes[0].className=h._iDisplayStart===0?n.sPagePrevDisabled:n.sPagePrevEnabled;
q[o].childNodes[1].className=h.fnDisplayEnd()==h.fnRecordsDisplay()?n.sPageNextDisabled:n.sPageNextEnabled}}},iFullNumbersShowPages:5,full_numbers:{fnInit:function(h,n,q){var o=h.oLanguage.oPaginate,v=h.oClasses,x=function(G){h.oApi._fnPageChange(h,G.data.action)&&q(h)};i(n).append('<a  tabindex="'+h.iTabIndex+'" class="'+v.sPageButton+" "+v.sPageFirst+'">'+o.sFirst+'</a><a  tabindex="'+h.iTabIndex+'" class="'+v.sPageButton+" "+v.sPagePrevious+'">'+o.sPrevious+'</a><span></span><a tabindex="'+h.iTabIndex+
'" class="'+v.sPageButton+" "+v.sPageNext+'">'+o.sNext+'</a><a tabindex="'+h.iTabIndex+'" class="'+v.sPageButton+" "+v.sPageLast+'">'+o.sLast+"</a>");var C=i("a",n);o=C[0];v=C[1];var D=C[2];C=C[3];h.oApi._fnBindAction(o,{action:"first"},x);h.oApi._fnBindAction(v,{action:"previous"},x);h.oApi._fnBindAction(D,{action:"next"},x);h.oApi._fnBindAction(C,{action:"last"},x);if(!h.aanFeatures.p){n.id=h.sTableId+"_paginate";o.id=h.sTableId+"_first";v.id=h.sTableId+"_previous";D.id=h.sTableId+"_next";C.id=
h.sTableId+"_last"}},fnUpdate:function(h,n){if(h.aanFeatures.p){var q=l.ext.oPagination.iFullNumbersShowPages,o=Math.floor(q/2),v=Math.ceil(h.fnRecordsDisplay()/h._iDisplayLength),x=Math.ceil(h._iDisplayStart/h._iDisplayLength)+1,C="",D,G=h.oClasses,F,S=h.aanFeatures.p,P=function(ja){h.oApi._fnBindAction(this,{page:ja+D-1},function(N){h.oApi._fnPageChange(h,N.data.page);n(h);N.preventDefault()})};if(h._iDisplayLength===-1)x=o=D=1;else if(v<q){D=1;o=v}else if(x<=o){D=1;o=q}else if(x>=v-o){D=v-q+1;
o=v}else{D=x-Math.ceil(q/2)+1;o=D+q-1}for(q=D;q<=o;q++)C+=x!==q?'<a tabindex="'+h.iTabIndex+'" class="'+G.sPageButton+'">'+h.fnFormatNumber(q)+"</a>":'<a tabindex="'+h.iTabIndex+'" class="'+G.sPageButtonActive+'">'+h.fnFormatNumber(q)+"</a>";q=0;for(o=S.length;q<o;q++)if(S[q].childNodes.length!==0){i("span:eq(0)",S[q]).html(C).children("a").each(P);F=S[q].getElementsByTagName("a");F=[F[0],F[1],F[F.length-2],F[F.length-1]];i(F).removeClass(G.sPageButton+" "+G.sPageButtonActive+" "+G.sPageButtonStaticDisabled);
i([F[0],F[1]]).addClass(x==1?G.sPageButtonStaticDisabled:G.sPageButton);i([F[2],F[3]]).addClass(v===0||x===v||h._iDisplayLength===-1?G.sPageButtonStaticDisabled:G.sPageButton)}}}}});i.extend(l.ext.oSort,{"string-pre":function(h){if(typeof h!="string")h=h!==null&&h.toString?h.toString():"";return h.toLowerCase()},"string-asc":function(h,n){return h<n?-1:h>n?1:0},"string-desc":function(h,n){return h<n?1:h>n?-1:0},"html-pre":function(h){return h.replace(/<.*?>/g,"").toLowerCase()},"html-asc":function(h,
n){return h<n?-1:h>n?1:0},"html-desc":function(h,n){return h<n?1:h>n?-1:0},"date-pre":function(h){h=Date.parse(h);if(isNaN(h)||h==="")h=Date.parse("01/01/1970 00:00:00");return h},"date-asc":function(h,n){return h-n},"date-desc":function(h,n){return n-h},"numeric-pre":function(h){return h=="-"||h===""?0:h*1},"numeric-asc":function(h,n){return h-n},"numeric-desc":function(h,n){return n-h}});i.extend(l.ext.aTypes,[function(h){if(typeof h==="number")return"numeric";else if(typeof h!=="string")return null;
var n,q=false;n=h.charAt(0);if("0123456789-".indexOf(n)==-1)return null;for(var o=1;o<h.length;o++){n=h.charAt(o);if("0123456789.".indexOf(n)==-1)return null;if(n=="."){if(q)return null;q=true}}return"numeric"},function(h){var n=Date.parse(h);if(n!==null&&!isNaN(n)||typeof h==="string"&&h.length===0)return"date";return null},function(h){if(typeof h==="string"&&h.indexOf("<")!=-1&&h.indexOf(">")!=-1)return"html";return null}]);i.fn.DataTable=l;i.fn.dataTable=l;i.fn.dataTableSettings=l.settings;i.fn.dataTableExt=
l.ext})(jQuery,window,document,undefined);



//----------------------------------------------------------
// Datatables-plugins.js
//----------------------------------------------------------
jQuery.fn.dataTableExt.oApi.fnSetFilteringDelay = function ( oSettings, iDelay ) {
    var _that = this;
 
    if ( iDelay === undefined ) {
        iDelay = 250;
    }
      
    this.each( function ( i ) {
        $.fn.dataTableExt.iApiIndex = i;
        var
            $this = this,
            oTimerId = null,
            sPreviousSearch = null,
            anControl = $( 'input', _that.fnSettings().aanFeatures.f );
          
            anControl.unbind( 'keyup' ).bind( 'keyup', function() {
            var $$this = $this;
  
            if (sPreviousSearch === null || sPreviousSearch != anControl.val()) {
                window.clearTimeout(oTimerId);
                sPreviousSearch = anControl.val(); 
                oTimerId = window.setTimeout(function() {
                    $.fn.dataTableExt.iApiIndex = i;
                    _that.fnFilter( anControl.val() );
                }, iDelay);
            }
        });
          
        return this;
    } );
    return this;
};
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "date-euro-pre": function ( a ) {
        if ($.trim(a) != '') {
            var frDatea = $.trim(a).split(' ');
            var frTimea = frDatea[1].split(':');
            var frDatea2 = frDatea[0].split('/');
            var x = (frDatea2[2] + frDatea2[1] + frDatea2[0] + frTimea[0] + frTimea[1] + frTimea[2]) * 1;
        } else {
            var x = 10000000000000; // = l'an 1000 ...
        }
         
        return x;
    },
 
    "date-euro-asc": function ( a, b ) {
        return a - b;
    },
 
    "date-euro-desc": function ( a, b ) {
        return b - a;
    }
} );
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
    "percent-pre": function ( a ) {
        var x = (a == "-") ? 0 : a.replace( /%/, "" );
        return parseFloat( x );
    },
 
    "percent-asc": function ( a, b ) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },
 
    "percent-desc": function ( a, b ) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
} );
jQuery.fn.dataTableExt.aTypes.unshift(
    function ( sData )
    {
        if (sData !== null && sData.match(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20|21)\d\d$/))
        {
            return 'date-euro';
        }
        return null;
    }
);
$.fn.dataTableExt.oApi.fnStandingRedraw = function(oSettings) {
    if(oSettings.oFeatures.bServerSide === false){
        var before = oSettings._iDisplayStart;
 
        oSettings.oApi._fnReDraw(oSettings);
 
        // iDisplayStart has been reset to zero - so lets change it back
        oSettings._iDisplayStart = before;
        oSettings.oApi._fnCalculateEnd(oSettings);
    }
      
    // draw the 'current' page
    oSettings.oApi._fnDraw(oSettings);
};


//----------------------------------------------------------
// FitVids.js
//----------------------------------------------------------
/*global jQuery */
/*! 
* FitVids 1.0
*
* Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

(function( $ ){

  $.fn.fitVids = function() {
    var div = document.createElement('div'),
        ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];
        
    div.className = 'fit-vids-style';
    div.innerHTML = '&shy;<style>         \
      .fluid-width-video-wrapper {        \
         width: 100%;                     \
         position: relative;              \
         padding: 0;                      \
      }                                   \
                                          \
      .fluid-width-video-wrapper iframe,  \
      .fluid-width-video-wrapper object,  \
      .fluid-width-video-wrapper embed {  \
         position: absolute;              \
         top: 0;                          \
         left: 0;                         \
         width: 100%;                     \
         height: 100%;                    \
      }                                   \
    </style>';
                      
    ref.parentNode.insertBefore(div,ref);
  
    return this.each(function(){
      var selectors = [
        "iframe[src^='http://player.vimeo.com']", 
        "iframe[src^='http://www.youtube.com']", 
        "iframe[src^='http://www.kickstarter.com']", 
        "object", 
        "embed"
      ];
 
      var $allVideos = $(this).find(selectors.join(','));
      
      $allVideos.each(function(){
        var $this = $(this), 
            height = this.tagName == 'OBJECT' ? $this.attr('height') : $this.height(),
            aspectRatio = height / $this.width();
        $this.wrap('<div class="fluid-width-video-wrapper" />').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  
  }
})( jQuery );

// @codekit-append "touchscroll.js";
