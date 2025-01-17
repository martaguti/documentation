/*

Improvements to the Hugo theme:

- Link navigation using the keyboard
- Highlighting improvements

*/

jQuery(document).ready(function () {
  
  jQuery("#sidebar .category-icon").on("click", function () {
    $(this).toggleClass("fa-angle-down fa-angle-right");
    $(this).parent().parent().children("ul").toggle();
    return false;
  });
  
  // allow keyboard control for prev/next links
  jQuery(function () {
    jQuery(".nav-prev").click(function () {
      location.href = jQuery(this).attr("href");
    });
    jQuery(".nav-next").click(function () {
      location.href = jQuery(this).attr("href");
    });
  });

  jQuery("input, textarea").keydown(function (e) {
    //  left and right arrow keys
    if (e.which == "37" || e.which == "39") {
      e.stopPropagation();
    }
  });

  jQuery(document).keydown(function (e) {
    // prev links - left arrow key
    if (e.which == "37") {
      jQuery(".nav.nav-prev").click();
    }

    // next links - right arrow key
    if (e.which == "39") {
      jQuery(".nav.nav-next").click();
    }
  });

  $("#top-bar a:not(:has(img)):not(.btn)").addClass("highlight");
  $('#body-inner a:not(:has(img)):not(.btn):not(a[rel="footnote"])').addClass("highlight");

  var touchsupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
  if (!touchsupport){ // browser doesn't support touch
      $('#toc-menu').hover(function() {
          $('.progress').stop(true, false, true).fadeToggle(100);
      });

      $('.progress').hover(function() {
          $('.progress').stop(true, false, true).fadeToggle(100);
      });
  }
  if (touchsupport){ // browser does support touch
      $('#toc-menu').click(function() {
          $('.progress').stop(true, false, true).fadeToggle(100);
      });
      $('.progress').click(function() {
          $('.progress').stop(true, false, true).fadeToggle(100);
      });
  }

  /**
   * Fix anchor scrolling that hides behind top nav bar
   * Courtesy of https://stackoverflow.com/a/13067009/28106
   *
   * We could use pure css for this if only heading anchors were
   * involved, but this works for any anchor, including footnotes
   **/
  (function (document, history, location) {
    var HISTORY_SUPPORT = !!(history && history.pushState);

    var anchorScrolls = {
      ANCHOR_REGEX: /^#[^ ]+$/,
      OFFSET_HEIGHT_PX: 50,

      /**
       * Establish events, and fix initial scroll position if a hash is provided.
       */
      init: function () {
        this.scrollToCurrent();
        $(window).on("hashchange", $.proxy(this, "scrollToCurrent"));
        $("body").on("click", "a", $.proxy(this, "delegateAnchors"));
      },

      /**
       * Return the offset amount to deduct from the normal scroll position.
       * Modify as appropriate to allow for dynamic calculations
       */
      getFixedOffset: function () {
        return this.OFFSET_HEIGHT_PX;
      },

      /**
       * If the provided href is an anchor which resolves to an element on the
       * page, scroll to it.
       * @param  {String} href
       * @return {Boolean} - Was the href an anchor.
       */
      scrollIfAnchor: function (href, pushToHistory) {
        var match, anchorOffset;

        if (!this.ANCHOR_REGEX.test(href)) {
          return false;
        }

        match = document.getElementById(href.slice(1));

        if (match) {
          anchorOffset = $(match).offset().top - this.getFixedOffset();
          $("html, body").animate({ scrollTop: anchorOffset });

          // Add the state to history as-per normal anchor links
          if (HISTORY_SUPPORT && pushToHistory) {
            history.pushState({}, document.title, location.pathname + href);
          }
        }

        return !!match;
      },

      /**
       * Attempt to scroll to the current location's hash.
       */
      scrollToCurrent: function (e) {
        if (this.scrollIfAnchor(window.location.hash) && e) {
          e.preventDefault();
        }
      },

      /**
       * If the click event's target was an anchor, fix the scroll position.
       */
      delegateAnchors: function (e) {
        var elem = e.target;

        if (this.scrollIfAnchor(elem.getAttribute("href"), true)) {
          e.preventDefault();
        }
      },
    };

    $(document).ready($.proxy(anchorScrolls, "init"));
  })(window.document, window.history, window.location);
});

jQuery(window).on("load", function () {
  // store this page in session
  sessionStorage.setItem(jQuery("body").data("url"), 1);

  // loop through the sessionStorage and see if something should be marked as visited
  for (var url in sessionStorage) {
    if (sessionStorage.getItem(url) == 1)
      jQuery('[data-nav-id="' + url + '"]').addClass("visited");
  }

  $(".highlightable").highlight(sessionStorage.getItem("search-value"), {
    element: "mark",
  });
});

$(function () {
  $('a[rel="lightbox"]').featherlight({
    root: "section#body",
  });
});

jQuery.extend({
  highlight: function (node, re, nodeName, className) {
    if (node.nodeType === 3) {
      var match = node.data.match(re);
      if (match) {
        var highlight = document.createElement(nodeName || "span");
        highlight.className = className || "highlight";
        var wordNode = node.splitText(match.index);
        wordNode.splitText(match[0].length);
        var wordClone = wordNode.cloneNode(true);
        highlight.appendChild(wordClone);
        wordNode.parentNode.replaceChild(highlight, wordNode);
        return 1; // skip added node in parent
      }
    } else if (node.nodeType === 1 && node.childNodes && // only element nodes that have children
              !/(script|style)/i.test(node.tagName) && // ignore script and style nodes
              !(node.tagName === nodeName.toUpperCase() && node.className === className)) { // skip if already highlighted
      for (var i = 0; i < node.childNodes.length; i++) {
        i += jQuery.highlight(node.childNodes[i], re, nodeName, className);
      }
    }
    return 0;
  },
});

jQuery.fn.unhighlight = function (options) {
  var settings = {
    className: "highlight",
    element: "span"
  };
  jQuery.extend(settings, options);

  return this.find(settings.element + "." + settings.className)
    .each(function () {
      var parent = this.parentNode;
      parent.replaceChild(this.firstChild, this);
      parent.normalize();
    })
    .end();
};

jQuery.fn.highlight = function (words, options) {
  var settings = {
    className: "highlight",
    element: "span",
    caseSensitive: false,
    wordsOnly: false
  };
  jQuery.extend(settings, options);

  if (!words) {
    return;
  }

  if (words.constructor === String) {
    words = [words];
  }
  words = jQuery.grep(words, function (word, i) {
    return word != "";
  });
  words = jQuery.map(words, function (word, i) {
    return word.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  });
  if (words.length == 0) {
    return this;
  }
  var flag = settings.caseSensitive ? "" : "i";
  var pattern = "(" + words.join("|") + ")";
  if (settings.wordsOnly) {
    pattern = "\\b" + pattern + "\\b";
  }
  var re = new RegExp(pattern, flag);

  return this.each(function () {
    jQuery.highlight(this, re, settings.element, settings.className);
  });
};
