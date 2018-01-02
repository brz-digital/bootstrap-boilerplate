class Share {
  constructor() {
    console.log('>>> Share constructor');

    $('.js-share').on('click', function(e) {
      e.preventDefault();

      let shareButton = $(this),
          shareType = shareButton.data('type'),
          shareTitle = encodeURIComponent(shareButton.data('title')),
          shareUrl = encodeURIComponent(shareButton.data('url'));

      let refers = {
        'facebook' : `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
        'whatsapp' : `whatsapp://send?text=${shareTitle}+${shareUrl}`,
        'google'   : `https://plus.google.com/share?url=${shareUrl}`,
        'twitter'  : `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}&wrap_links=true`,
        'linkedin' : `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`
      };

      if(typeof refers[shareType] !== 'undefined'){
        window.open(refers[shareType]);
      } else {
        console.log('>>> Share: undefined type');
      }
    });
  }
}

export default Share;
