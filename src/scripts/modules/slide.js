class Slide {
  constructor() {
    console.log('>>> Slide constructor');

    this.swiperInstances = {};

    // Call methods
    this.init();
  }

  init() {
    const that = this;

    $('.js-swiper').each((index, element) => {
      const $container = $(element);

      // Set swiper settings
      const settings = {
        onlyMobile:   $container.data('onlyMobile')   || false,
        autoplay:     $container.data('autoplay')     || false,
        loop:         $container.data('loop')         || false,
        perView:      $container.data('perView')      || 1,
        perViewMD:    $container.data('perViewMd')    || 1,
        perViewSM:    $container.data('perViewSm')    || 1,
        perViewXS:    $container.data('perViewXs')    || 1,
        spaceBetween: $container.data('spaceBetween') || 0,
        effect:       $container.data('effect')       || 'fade',
        pagination:   $container.data('pagination')   || 'bullets'
      };

      // Add class index
      $container.addClass(`swiper-${index}`);
      $container.find('.slide-counter').addClass(`pagination-counter-${index}`);
      $container.find('.slide-pagination').addClass(`pagination-${index}`);

      // If onlymobile is true
      if (settings.onlyMobile === true) {
        // Add class swiper-only-mobile
        $container.addClass('swiper-only-mobile');

        // Instance swiper if width <= settings.mobileBreakpoint
        if ($(window).outerWidth() <= 991) {
          that.startSwiper($container, index, settings);
        }

        // Check swiper on resize, if <= settings.mobileBreakpoint, instance
        that.startSwiperOnResize($container, index, settings);
      } else {
        // Instance swiper
        that.startSwiper($container, index, settings);
      }
    });
  }

  startSwiper(container, index, settings) {
    const that = this;

    container.addClass('swiper slide');
    container.find('.wrapper').addClass('swiper-wrapper');
    container.find('.slide-item').addClass('swiper-slide');

    that.swiperInstances[index] = new Swiper(`.swiper-${index}`, {
      pagination: {
        el: `.pagination-counter-${index}`,
        clickable: true,
        type: settings.pagination,
      },
      navigation: {
        nextEl: `.pagination-${index} .swiper-button-next`,
        prevEl: `.pagination-${index} .swiper-button-prev`,
      },
      loop: settings.loop,
      autoplay: settings.autoplay,
      slideClass: 'swiper-slide',
      wrapperClass: 'swiper-wrapper',
      slidesPerView: settings.perView,
      spaceBetween: settings.spaceBetween,
      effect: settings.effect,
      breakpoints: {
        1199: {
          slidesPerView: settings.perViewMD,
        },
        991: {
          slidesPerView: settings.perViewSM,
        },
        767: {
          slidesPerView: settings.perViewXS,
        },
      },
    });
  }

  startSwiperOnResize(container, index, settings) {
    const that = this;

    $(window).resize(() => {
      if ($(window).outerWidth() <= 991 && !that.swiperInstances[index]) {
        that.startSwiper(container, index, settings);
      } else if ($(window).outerWidth() >= 992) {
        container.removeClass('swiper');
        container.find('.wrapper').removeClass('swiper-wrapper');
        container.find('.slide-item').removeClass('swiper-slide');

        if (that.swiperInstances[index]) {
          that.swiperInstances[index].destroy(false, true);
          that.swiperInstances[index] = undefined;
        }
      }
    });
  }
}

export default Slide;
