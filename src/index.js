function initMap() {
  let laboratoria = {lat: -12.1191427, lng: -77.0349046};
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: laboratoria
  });

  let image = 'http://www.iconninja.com/files/225/655/659/bike-icon.png';

  let markerLaboratoria = new google.maps.Marker({
    position: laboratoria,
    map: map,
    icon: image,
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


let options = {
  enableHighAccuracy: true,
  timeout: 6000,
  maximumAge: 0
};

function search() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( success, error)
  }
}

let latitude; 
let longitude;

let success = function(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  let myLocation = new google.maps.Marker({
    position: {lat: latitude, lng: longitude},
    map: map
  });

  map.setZoom(18);
  map.setCenter({lat: latitude, lng: longitude});
}

let error = function (error) {
  alert('Tenemos un problema con encontrar tu ubicación');
}

document.getElementById('gtLocation').addEventListener('click', search);

let inputStartPoint = document.getElementById('startPoint');
let inputDestinationPoint = document.getElementById('destinationPoint');

new google.maps.places.Autocomplete(inputStartPoint);
new google.maps.places.Autocomplete(inputDestinationPoint);

let directionsService = new google.maps.DirectionsService; 
let directionsDisplay = new google.maps.DirectionsRenderer; 

let calculateAndDisplayRoute = function(directionsService, directionsDisplay) {
  directionsService.route({
    origin: inputStartPoint.value,
    destination: inputDestinationPoint.value,
    travelMode: 'DRIVING'
  }, function(response, status){
    if ( status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert("No encontramos una ruta");
    }
  })
}

directionsDisplay.setMap(map);

let trace_Route = function() {
  calculateAndDisplayRoute(directionsService, directionsDisplay)
}

document.getElementById('traceRoute').addEventListener('click', trace_Route);

}


