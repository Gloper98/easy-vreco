'use strict';

function initMap() {
  var laboratoria = { lat: -12.1191427, lng: -77.0349046 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: laboratoria
  });

  var image = 'http://www.iconninja.com/files/225/655/659/bike-icon.png';

  var markerLaboratoria = new google.maps.Marker({
    position: laboratoria,
    map: map,
    icon: image
    // animation: google.maps.Animation.DROP
  });

  // markerLaboratoria.addEventListener('click', toggleBounce);

  // function toggleBounce() {
  //   if (markerLaboratoria.getAnimation() !== null) {
  //     markerLaboratoria.setAnimation(null);
  //   } else {
  //     markerLaboratoria.setAnimation(google.maps.Animation.BOUNCE);
  //   }
  // }


  var options = {
    enableHighAccuracy: true,
    timeout: 6000,
    maximumAge: 0
  };

  function search() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  var latitude;
  var longitude;

  var success = function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    var myLocation = new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map: map
    });

    map.setZoom(18);
    map.setCenter({ lat: latitude, lng: longitude });
  };

  var error = function error(_error) {
    alert('Tenemos un problema con encontrar tu ubicación');
  };

  document.getElementById('gtLocation').addEventListener('click', search);

  var inputStartPoint = document.getElementById('startPoint');
  var inputDestinationPoint = document.getElementById('destinationPoint');

  new google.maps.places.Autocomplete(inputStartPoint);
  new google.maps.places.Autocomplete(inputDestinationPoint);

  var directionsService = new google.maps.DirectionsService();
  var directionsDisplay = new google.maps.DirectionsRenderer();

  var calculateAndDisplayRoute = function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
      origin: inputStartPoint.value,
      destination: inputDestinationPoint.value,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert("No encontramos una ruta");
      }
    });
  };

  directionsDisplay.setMap(map);

  var trace_Route = function trace_Route() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };

  document.getElementById('traceRoute').addEventListener('click', trace_Route);
}