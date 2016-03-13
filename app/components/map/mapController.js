myApp.controller('mapController', function($scope, $mdDialog, $http, $window, $q, $mdToast, $location) {
  
    var input = document.getElementById('searchTextField');

  var searchBox = new google.maps.places.SearchBox(input);
  
  var service = new google.maps.places.AutocompleteService();
  var infowindow = new google.maps.InfoWindow();
    
    
    
    $scope.searchText = "";
    var predictions = [{description: "item1"},{description: "item2"},{description: "item3"},{description: "item4"}];
    var self = this;
    // list of `state` value/display objects
    self.predictions = predictions;
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    
    function searchTextChange(text) {
        //console.log('Text changed to ' + text);
    }
    function selectedItemChange(item) {
        console.log(item);
        
        var infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService($scope.map);

          service.getDetails({
            placeId: item.place_id
          }, function(place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              var marker = new google.maps.Marker({
                map: $scope.map,
                position: place.geometry.location
              });
                
              google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                  'Place ID: ' + place.place_id + '<br>' +
                  place.formatted_address + '</div>');
                infowindow.open($scope.map, this);
              });
                
                console.log(place.geometry.location.lat());
                $scope.map.setZoom(8);
                $scope.map.setCenter(new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng()));
            }
          });
        
        
    }
  
    function querySearch(query) {
        //console.log("querying!");
        service.getQueryPredictions({ input: query }, displaySuggestions);
        return predictions;
    }
  
    function displaySuggestions(PRE, status){
      
        if (status != google.maps.places.PlacesServiceStatus.OK) {
            alert(status);
            return;
        } else {
            predictions = PRE;
        }
        //return predictions;
    }
  
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

  
    
    
});