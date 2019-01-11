(function ($) {

  $.fn.gmaps = function(options) {

  return this.each(function() {
    var $el = $(this);
    var params = {};

    // Set params
    params.api              = $el.data('api') || null;
    params.zoom             = $el.data('zoom') || 21;
    params.scroll           = $el.data('scroll') || false;
    params.lat              = $el.data('lat') || null;
    params.lng              = $el.data('lng') || null;
    params.title            = $el.data('title') || null;
    params.address          = $el.data('address') || null;
    params.image            = $el.data('image') || null;
    params.marker           = $el.data('marker') || null;
    params.defaultPosition  = $el.data('defaultPosition') || '-7.097340, -34.833240';

    var defaultPosition = params.defaultPosition.split(',');

    var settings = $.extend({
      zoom: params.zoom,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      scaleControl: false,
      streetViewControl: false,
      scrollwheel: params.scroll,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      panControl: false,
      mapTypeControl: false,
      center: new google.maps.LatLng(defaultPosition[0], defaultPosition[1])
    }, options);

    var map = new google.maps.Map(this, settings);
    var markerInfo = {};
    var caption;
    var openCard = [];

    // If not exists api endpoint
    if(params.api === null) {
      caption = normalizeData(params);

      // Set marker in map
      pushToMap(map, params, caption);
    } else {
      $.getJSON(params.api, function(resp) {
        $.each(resp.data, function (index, result) {
          caption = normalizeData(result);

          // Set marker in map
          pushToMap(map, params, caption);
        });
      });
    }

    function pushToMap(map, params, caption) {
      if(params.marker !== null) {
        markerInfo['icon'] = new google.maps.MarkerImage(
          params.marker,
          null,
          null,
          null,
          new google.maps.Size(32, 32)
        );
      }

      markerInfo['position'] = new google.maps.LatLng(caption.lat, caption.lng);
      markerInfo['content'] = setCard(caption);

      var markerSettings = $.extend({
        map: map
      }, markerInfo);

      var marker = new google.maps.Marker(markerSettings);

      markerClick(marker, markerInfo['content']);
    }

    function markerClick(marker, content) {
      var infoCard = new google.maps.InfoWindow({
        content: content
      });

      google.maps.event.addListener(marker, 'click', function() {
        if (openCard.length)
          openCard[0].close();

        openCard.pop();
        infoCard.open(map, marker);
        openCard.push(infoCard);
      });
    }

    function setCard(data) {
      var card;

      if(data.image !== undefined) {
        card = '<div class="map-card -with-image"><div class="map-figure"><div class="map-image bg-cover" style="background-image: url('+ caption.image +')"></div>';
      } else {
        card = '<div class="map-card">';
      }

      card += '<div class="map-caption"><span class="map-title">' + data.title + '</span><span class="map-address">' + data.address + '</span></div></div>';

      return card;
    }

    function normalizeData(data) {
      return {
        title: data.title,
        address: data.address,
        lat: data.lat,
        lng: data.lng,
        image: data.image
      };
    }

  });

};

}(jQuery));
