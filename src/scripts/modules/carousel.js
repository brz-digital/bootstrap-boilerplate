class Carousel {
    constructor() {
        console.log('>>> Carousel constructor');
        this.carouselInstances = {};
        this.initCarousel();
    }

    initCarousel() {
        const that = this;
        let carousel = $('.js-carousel');

        $(carousel).each(function(index, element){
            let container = $(this);
            let perView = container.data('perView') | 1;
            let perViewTablet = container.data('perViewTablet') | 2;
            let spaceBetween = container.data('spaceBetween') | 0;
            let effect = container.data('effect') | 'fade';

            // Add class index
            container.addClass(`carousel-${index}`);
            container.children('.carousel-bullets').addClass(`bullets-${index}`);
            container.children('.carousel-pagination').addClass(`pagination-${index}`);

            // If carousel has class -carousel-only-mobile
            if(container.hasClass('-carousel-only-mobile')) {
                if($(window).outerWidth() <= 991) {
                    that.startCarousel(index, perView, perViewTablet, spaceBetween, effect);
                }
                that.startCarouselOnResize(index, perView, perViewTablet, spaceBetween, effect);
            } else {
                that.startCarousel(index, perView, perViewTablet, spaceBetween, effect);
            }
        });
    }

    startCarousel(index, perView, perViewTablet, spaceBetween, effect) {
        const that = this;
        that.carouselInstances[index] = new Swiper(`.carousel-${index}`, {
            pagination: `.bullets-${index}`,
            nextButton: `.pagination-${index} .carousel-next`,
            prevButton: `.pagination-${index} .carousel-prev`,
            paginationClickable: true,
            slideClass: 'carousel-item',
            wrapperClass: 'carousel-wrapper',
            slidesPerView: perView,
            spaceBetween: spaceBetween,
            effect: effect,
            breakpoints: {
                992: {
                    slidesPerView: perViewTablet,
                },
                600: {
                    slidesPerView: 1
                }
            }
        });
    }

    startCarouselOnResize(index, perView, perViewTablet, spaceBetween, effect) {
        const that = this;
        $(window).resize(function() {
            if( $(window).outerWidth() <= 991 && !that.carouselInstances[index] ){
                that.startCarousel(index, perView, perViewTablet, spaceBetween, effect);
            } else if($(window).outerWidth() >= 992) {
                if ( that.carouselInstances[index] ){
                    that.carouselInstances[index].destroy(false, true);
                    that.carouselInstances[index] = undefined;
                }
            }
        });
    }
}

export default Carousel;
