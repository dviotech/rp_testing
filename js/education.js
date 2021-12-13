    function de() {
        var e = $(this).addClass("active"),
            t = e.data("content"),
            n = e.data("id");
            e.siblings().filter(".active").removeClass("active"),
            t && le(t),
            n &&
                (function (e) {
                    $(e).addClass("active").siblings().removeClass("active");
                })(n);
    }
    $(".faqs-tab-title.nomob").click(function (e) {
        de.call(this);
    })
    $(".faqs-tab-title.mob").click(function (e) {
        $(this).hasClass("active") ? $(this).removeClass("active") : de.call(this);
    })
$(document).ready(function() {
  $(".testimonial-carousel").slick({
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: false,
  infinite: false,
  arrows: true,
  prevArrow: $(".testimonial-carousel-controls .prev"),
  nextArrow: $(".testimonial-carousel-controls .next"),
  responsive: [
  {
  breakpoint: 1200,
  settings: {
  slidesToShow: 2,
  slidesToScroll: 1
  }
  },
  {
  breakpoint: 1008,
  settings: {
  slidesToShow: 1,
  slidesToScroll: 1
  }
  },
  {
  breakpoint: 800,
  settings: {
  slidesToShow: 1,
  slidesToScroll: 1
  }
  }
  ]
  });
  
  // Add smooth scrolling to all links
  $(".box1 a").on('click', function(event) {
          event.preventDefault();
          $("html, body").animate({
              scrollTop: $($(this).attr("href")).offset().top
            }, 500);
  });
  $(".buttons a").on('click', function(event) {
          event.preventDefault();
          $("html, body").animate({
              scrollTop: $($(this).attr("href")).offset().top
            }, 500);
  });
});