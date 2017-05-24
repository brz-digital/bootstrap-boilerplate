class Slide {
    constructor() {
        console.log('>>> Slide constructor');

        this.swiperInstances = {};

        // Call methods
        this.init();
    }

    init() {
        const that = this;
        let swiper = $('.js-swiper');

        $(swiper).each(function(index, element){
            const $container = $(element);
            const settings = {};

            // Set swiper settings
            settings.onlyMobile     = $container.data('onlyMobile') || false;
            settings.autoplay       = $container.data('autoplay') || 0;
            settings.loop           = $container.data('loop') || false;
            settings.perView        = $container.data('perView') || 1;
            settings.perViewMD      = $container.data('perViewMd') || 1;
            settings.perViewSM      = $container.data('perViewSm') || 2;
            settings.perViewXS      = $container.data('perViewXs') || 1;
            settings.spaceBetween   = $container.data('spaceBetween') || 0;
            settings.effect         = $container.data('effect') || 'fade';

            // Add class index
            $container.addClass(`swiper-${index}`);
            $container.children('.bullets').addClass(`bullets-${index}`);
            $container.children('.pagination').addClass(`pagination-${index}`);

            // If onlymobile is true
            if(settings.onlyMobile === true) {
                // Add class swiper-only-mobile
                $container.addClass('swiper-only-mobile');

                // Instance swiper if width <= 1199
                if($(window).outerWidth() <= 1199) {
                    that.startSwiper($container, index, settings);
                }

                // Check swiper on resize, if <= 1199, instance
                that.startSwiperOnResize($container, index, settings);
            } else {
                // Instance swiper
                that.startSwiper($container, index, settings);
            }
        });
    }

    startSwiper(container, index, settings) {
        const that = this;

        container.addClass('swiper');
        container.find('.wrapper').addClass('swiper-wrapper');
        container.find('.slide-item').addClass('swiper-slide');

        that.swiperInstances[index] = new Swiper(`.swiper-${index}`, {
            pagination: `.bullets-${index}`,
            paginationClickable: true,
            nextButton: `.pagination-${index} .swiper-next`,
            prevButton: `.pagination-${index} .swiper-prev`,
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
                992: {
                    slidesPerView: settings.perViewSM,
                },
                600: {
                    slidesPerView: settings.perViewXS
                }
            }
        });
    }

    startSwiperOnResize(container, index, settings) {
        const that = this;

        $(window).resize(function() {
            if( $(window).outerWidth() <= 1199 && !that.swiperInstances[index] ){
                that.startSwiper(container, index, settings);
            } else if($(window).outerWidth() >= 1200) {
                container.removeClass('swiper');
                container.find('.wrapper').removeClass('swiper-wrapper');
                container.find('.slide-item').removeClass('swiper-slide');

                if ( that.swiperInstances[index] ){
                    that.swiperInstances[index].destroy(false, true);
                    that.swiperInstances[index] = undefined;
                }
            }
        });
    }
}

export default Slide;
