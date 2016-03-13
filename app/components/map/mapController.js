myApp.controller('mapController', function($scope, $mdDialog, $http, $window, $q, $mdToast, $location, sharedService) {
  
  const LAT = 11;
  const LONG = 10;
  const MAX_TIME = 9;
  const RATE_PER_HR = 8;
  const METER = 7;

  $(document).ready(function() {
      $.ajax({
          type: "GET",
          url: "assets/CSV/ParkingSpaces.csv",
          dataType: "text",
          success: function(data) {Papa.parse(data, {
          complete: function(results) {
              alert("Finished:", results.data);
              useData(results);
              }
          });
      }
      });
  });
  
  var parkingSpaces = [];
  var maxLongitude, maxLatitude, minLongitude, minLatitude;

  function useData(results){
      var data = results.data;

      for(var i = 1; i < data.length; i++){
          if(data[i][1] == "HANDICAP"){
              type = "handicap";
          }else if(data[i][1] == undefined){
              type = "regular";
          }else if(data[i][1] == "SMALL VEHICLE"){
              type = "small vehicle";
          }else{
              continue;
          }
          parkingSpaces.push(new PSpot(type, data[i][LAT], data[i][LONG], data[i][METER], data[i][RATE_PER_HR], data[i][MAX_TIME]));
          if(maxLatitude < data[i][LAT]){
              maxLatitude = data[i][LAT];
          } else if(minLatitude > data[i][LAT]){
              minLatitude = data[i][LAT];
          }
          if(maxLongitude < data[i][LONG]){
              maxLongitude = data[i][LONG];
          } else if(maxLongitude > data[i][LONG]){
              minLongitude = data[i][LONG];
          }
      }

  }

  function getBounds(){
      return [maxLongitude, maxLatitude, minLongitude, minLatitude];
  }

  // filter is a JSON object with attributes:
  // type, hrs (that the user will park), & price (max the user wants to spend)
  function displayMapData(filter){
      var result = [];
      for(var i in parkingSpaces){
          var temp = parkingSpaces[i];
          var d = new Date();             // d is temporary, pending change for final version
          if((d.getDay() == 0) || (d.getHours() >= 18)){
              temp.rate = 0;
          }
          if(d.getHours() + filter.hrs > 18){
              filter.hrs = 18 - d.getHours();
          }
          if(temp.type == filter.type && (temp.rate * filter.hrs) <= filter.price){
              result.push(temp);
          }
      }
      return result;
  }

  const PSpot = function(type, latitutde, longitude, meter, rate, maxTime){
      return {
          type : type,
          latitude : latitutde,
          longitude : longitude,
          meter : meter,
          rate : rate, 
          maxTime : maxTime,
      };
  }
  
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
  $scope.changeView = function(person){
      var filterViewPath = '/filter';
      $location.path(filterViewPath);
  }
  
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
              $scope.map.setZoom(16);
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
    disableDefaultUI: true,
  });
  
  var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-33.8902, 151.1759),
    new google.maps.LatLng(-33.8474, 151.2631)
  );
  
  
  var locations = displayMapData()
    
    
});