import Slide from './slide';
import Mask from './mask';
import Send from './send';

class Common {
  constructor() {
    console.log('>>> Common constructor');

    // Instance imports
    new Slide();
    new Mask();
    new Send();

    // Call methods
    this.scrollToTarget();
    this.fixedI10();
    this.disableZoomGesture();
  }

  scrollToTarget() {
    $('.js-scroll-to').on('click', function(e) {
      e.preventDefault();

      let target = $(this).attr('href');

      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 800);
    });
  }

  fixedI10() {
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      const msViewportStyle = document.createElement('style');
      msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'));
      document.querySelector('head').appendChild(msViewportStyle);
    }
  }

  disableZoomGesture() {
    document.addEventListener('gesturestart', (e) => {
      e.preventDefault();
    });
  }
}

export default Common;
