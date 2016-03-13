myApp.controller('mapController', function($scope, $mdDialog, $http, $window, $q, $mdToast, $location) {
  
    $scope.searchText = "";
    var predictions = [{description: "item1"},{description: "item2"},{description: "item3"},{description: "item4"}];
    var self = this;
    // list of `state` value/display objects
    self.predictions = predictions;
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    
    function searchTextChange(text) {
        console.log('Text changed to ' + text);
    }
    function selectedItemChange(item) {
        console.log('Item changed to ' + JSON.stringify(item));
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

  var input = document.getElementById('searchTextField');

  var searchBox = new google.maps.places.SearchBox(input, {
    bounds: defaultBounds
  });
  
  var service = new google.maps.places.AutocompleteService();
  
});