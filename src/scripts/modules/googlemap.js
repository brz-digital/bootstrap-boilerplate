/**
 * GoogleMap Module
 */

class GoogleMap {
  constructor() {
    const script = document.createElement('script');
    const apiKey = 'AIzaSyDoRN5VSDPYUXTNu1Lflg6Bmqd8GY2MJQ0';

    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${apiKey}&callback=window.modules.GoogleMap.loadMap`;

    document.body.appendChild(script);
  }

  loadMap() {
    $('.js-gmaps').gmaps({
      styles: [
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f7f1df"
            }
          ]
        },
        {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [
            {
            "color": "#d0e3b4"
            }
          ]
        },
        {
          "featureType": "landscape.natural.terrain",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.business",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi.medical",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#fbd3da"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#bde6ab"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#ffe15f"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
            {
              "color": "#efd151"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "black"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit.station.airport",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#cfb2db"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#a2daf2"
            }
          ]
        }
      ]
    });
  }
}

export default GoogleMap;

