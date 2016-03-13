myApp.controller('mapController', function($scope, $mdDialog, $http, $window, $q, $mdToast, $location, sharedService, $interval) {
  
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
              //alert("Finished:", results.data);
              useData(results);
              locations = displayMapData();
              sharedService.setParkingSpots(parkingSpaces);
              addMarkers();
              }
          });
      }
      });
  });
  
  var parkingSpaces = [];
  var maxLongitude, maxLatitude, minLongitude, minLatitude;
  
  // locations that match the criteria
  var locations = [];
    
  function useData(results) {
      var data = results.data;

      for(var i = 1; i < data.length; i++){
          if(data[i][1] == "HANDICAP") {
              type = "handicap";
          } else if(data[i][1] == undefined || data[i][1] == " ") {
              type = "standard";
          } else if(data[i][1] == "SMALL VEHICLE") {
              type = "small vehicle";
          } else {
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
  function displayMapData() {
      var filter = {type: sharedService.getType(), hrs: sharedService.getTime(), price: sharedService.getCost()};
       
      var result = [];
      for (var i = 0; i < parkingSpaces.length; i++){
          var temp = parkingSpaces[i];

          var d = new Date();             // d is temporary, pending change for final version
          
          /*if((d.getDay() == 0) || (d.getHours() >= 18)){
              temp.rate = 0;
          }
          if(d.getHours() + filter.hrs > 18){
              filter.hrs = 18 - d.getHours();
          }*/
          
          var str1 = temp.type;
          var str2 = filter.type.toLowerCase();
          
          if(angular.equals(str1,str2) && (parseFloat(temp.rate) * filter.hrs) <= filter.price){
              result.push(temp);
          }
      }
      console.log(result);
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
                place.formatted_address + '</div>');
              infowindow.open($scope.map, this);
            });

              //console.log(place.geometry.location.lat());
              $scope.map.setZoom(16);
              $scope.map.setCenter(new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng()));
          }
        });
    }
    
    $scope.centerView = function() {
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Unable to use location info");
            $scope.map.setZoom(16);
            $scope.map.setCenter(new google.maps.LatLng(48.407326, -123.329773));
        }
        
        
    }
    
    function showPosition(position) {
        var d = {lat: position.coords.latitude, lng: position.coords.longitude}; 
        
        $scope.map.setZoom(16);
        $scope.map.setCenter(new google.maps.LatLng(d.lat,d.lng));
        
        return d;
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
  
  $scope.map = new google.maps.Map(document.getElementById('map'), {
    center: new google.maps.LatLng(48.407326, -123.329773),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
  });
  
    var bounds = getBounds();
    
  var defaultBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(bounds[1], bounds[2]),
    new google.maps.LatLng(bounds[3], bounds[0])
  );
    
    var markers = [];
    function addMarkers() {        
        for (var i = 0; i < locations.length; i++) {
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i].latitude, locations[i].longitude),
                map: $scope.map
            });
            
            marker.addListener('click', function(ev) {
                for (var i = 0; i < markers.length; i++) {
                    if (marker.getPosition().lat() == markers[i].internalPosition.lat() && marker.getPosition().lng() == markers[i].internalPosition.lng()) {
                        sharedService.setId(i);
                        console.log(i);
                        break;
                    }
                }
                $mdDialog.show({
                    controller: 'infoWindowController',
                    templateUrl: 'app/components/infoWindow/infoWindowView.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
            });
            
            markers.push(marker);
        }
    }
    
    function removeMarkers() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
    }
    
    var data = {type: sharedService.getType(), hrs: sharedService.getTime(), price: sharedService.getCost()};
    function updateMarkers() {
        if (sharedService.getType() != data.type || sharedService.getTime() != data.hrs || sharedService.getCost() != data.price) {
            locations = displayMapData();
            removeMarkers();
            markers = [];
            addMarkers();
        }
    }
    
    
    var updateFilters = $interval(updateMarkers, 1000);
});