/* global $, jQuery */

$(function() {

  var pyne2014 = window.pyne2014 || {};

  pyne2014.init = function() {
    this.HEADER_HEIGHT = 67;
    this.scrollHandler();
    this.initializeJqueryFilters();
    this.parallaxHandler();

    window.pyne2014 = pyne2014;
  };

  pyne2014.initializeJqueryFilters = function() {
    (function($) {
      $.expr[':'].appearing = function(elem) {
        var $window = $(window),
            windowViewTop = $window.scrollTop(),
            windowViewBottom = windowViewTop + $window.height(),
            elemTop = $(elem).offset().top,
            elemBottom = elemTop + $(elem).height(),

            isAppearingFully = ((elemTop >= windowViewTop) && (elemBottom <= windowViewBottom)),
            isAppearingBottom = ((windowViewTop > elemTop) && (windowViewTop < elemBottom)),
            isAppearingTop = ((windowViewBottom > elemTop) && (windowViewTop < elemBottom));

        return isAppearingFully || isAppearingBottom || isAppearingTop;
      };
    })(jQuery);
  };

  pyne2014.scrollPage = function(articleToGo){
    var _this = this,
        articleOffset = $('.' + articleToGo).offset();

    if (!articleOffset) {
      return;
    }

    $('body').stop().animate({
      scrollTop : articleOffset.top - _this.HEADER_HEIGHT
    }, 1000, function(){
    document.location.hash = articleToGo;
    $('a', '.navbar-nav').removeClass('active');
    $('a[data-article='+ articleToGo + ']').addClass('active');
    });
  };

  pyne2014.scrollHandler = function() {
    var _this = this;

    var hash = document.location.hash.substring(1);
    if(hash !== ""){
      $(window).load(function() {
        setTimeout(function(){
          _this.scrollPage(hash);
        }, 100);
      });
    }

    $('.navbar-nav').on('click', 'a, img', function(e) {
      var articleToGo = $(this).data('article');
      if (articleToGo) {
        e.preventDefault();
        _this.scrollPage(articleToGo);
      }
    });
  };

  pyne2014.parallaxHandler = function() {
    var $window = $(window);
    $window.scroll(function(){
      $('.full-bg').each(function(){
        var $this = $(this);
        if ($this.is(':appearing')) {
          var elemOffset = $this.offset(),
              scrolled = $window.scrollTop() - elemOffset.top;
          $this.css('backgroundPosition', '0 ' + scrolled * ($this.data('speed') || 0.7) + 'px');
        }
      });
    });
  };


  pyne2014.init();
});
