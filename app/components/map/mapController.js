myApp.controller('mapController', function($scope, $mdDialog, $http, $window, $q, $mdToast, $location) {
  if (navigator.geolocaion) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } 
  $scope.map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(48.407326, -123.329773),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true
  });
  
  var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-33.8902, 151.1759),
    new google.maps.LatLng(-33.8474, 151.2631)
  );

  var input = document.getElementById('searchTextField');

  var searchBox = new google.maps.places.SearchBox(input, {
    bounds: defaultBounds
});
});