class Slide {
    constructor() {
        console.log('>>> Slide constructor');
        this.slideInstances = {};
        this.initSlide();
    }

    initSlide() {
        const that = this;
        let slide = $('.js-slide');

        $(slide).each(function(index, element){
            const $container = $(element);
            const settings = {};

            // Set slide settings
            settings.perView        = $container.data('perView') || 1;
            settings.perViewTablet  = $container.data('perViewTablet') || 2;
            settings.perViewMobile  = $container.data('perViewMobile') || 1;
            settings.spaceBetween   = $container.data('spaceBetween') || 0;
            settings.effects        = $container.data('effect') || 'fade';

            // Add class index
            $container.addClass(`slide-${index}`);
            $container.children('.slide-bullets').addClass(`bullets-${index}`);
            $container.children('.slide-pagination').addClass(`pagination-${index}`);

            // If slide has class -slide-only-mobile
            if($container.hasClass('-slide-only-mobile')) {
                if($(window).outerWidth() <= 991) {
                    that.startSlide(index, settings);
                }
                that.startSlideOnResize(index, settings);
            } else {
                that.startSlide(index, settings);
            }
        });
    }

    startSlide(index, settings) {
        const that = this;

        that.slideInstances[index] = new Swiper(`.slide-${index}`, {
            pagination: `.bullets-${index}`,
            nextButton: `.pagination-${index} .slide-next`,
            prevButton: `.pagination-${index} .slide-prev`,
            paginationClickable: true,
            slideClass: 'slide-item',
            wrapperClass: 'slide-wrapper',
            slidesPerView: settings.perView,
            spaceBetween: settings.spaceBetween,
            effect: settings.effect,
            breakpoints: {
                992: {
                    slidesPerView: settings.perViewTablet,
                },
                600: {
                    slidesPerView: settings.perViewMobile
                }
            }
        });
    }

    startSlideOnResize(index, settings) {
        const that = this;

        $(window).resize(function() {
            if( $(window).outerWidth() <= 991 && !that.slideInstances[index] ){
                that.startSlide(index, settings);
            } else if($(window).outerWidth() >= 992) {
                if ( that.slideInstances[index] ){
                    that.slideInstances[index].destroy(false, true);
                    that.slideInstances[index] = undefined;
                }
            }
        });
    }
}

export default Slide;
