class Share {
  constructor() {
    this.providers = {
      'facebook' : 'https://www.facebook.com/sharer/sharer.php?u={refer}',
      'whatsapp' : 'https://api.whatsapp.com/send?text={title} {refer}',
      'google'   : 'https://plus.google.com/share?url={refer}',
      'twitter'  : 'https://twitter.com/intent/tweet?url={refer}&text={title}&wrap_links=true',
      'linkedin' : 'https://www.linkedin.com/shareArticle?mini=true&url={refer}&title={title}'
    };

    let classname = document.getElementsByClassName('js-share');

    Array.from(classname).forEach((el) => {
      el.addEventListener('click', (evt) => {
        evt.preventDefault();
        this.handleOnClick(evt);
      });
    });
  }

  handleOnClick(evt) {
    let el = event.target,
        params = {
          provider    : el.dataset.provider || undefined,
          title       : encodeURIComponent(el.dataset.title) || null,
          description : encodeURIComponent(el.dataset.description) || null,
          refer       : encodeURIComponent(el.dataset.refer) || window.location.href
        };

    this.makeShareUrl(params);
  }

  getProviderTemplate(provider) {
    return this.providers[provider];
  }

  makeShareUrl(params) {
    let provider = this.getProviderTemplate(params.provider);

    if (provider == null) throw new TypeError(`Invalid provider "${params.provider}"`);

    return window.open(
      provider.replace(/\{([^}]+)}/g, function(m, key) {
        return params ? params[key] : '';
      })
    );
  }
}

export default Share;
