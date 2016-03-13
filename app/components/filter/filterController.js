myApp.controller('filterController', function($scope, $mdDialog, $http, $window, $q, $mdToast, $location, sharedService) {
  $scope.types = [
    "Standard",
    "Handicap",
    "Small Car"
  ];
  
  $scope.changeView = function(person){
      var mapViewPath = '/map';
      $location.path(mapViewPath);
  }
});