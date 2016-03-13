myApp.controller('filterController', function($scope, $mdDialog, $http, $window, $q, $mdToast, $location, sharedService) {
  $scope.types = [
    "Standard",
    "Handicap",
    "Small Car"
  ];
  
    $scope.data = {type: sharedService.getType(), time: sharedService.getTime(), cost: sharedService.getCost()};
    
  $scope.changeView = function(person) {
      sharedService.setType($scope.data.type);
      sharedService.setTime($scope.data.time);
      sharedService.setCost($scope.data.cost);
      $location.path('/map');
  }
});