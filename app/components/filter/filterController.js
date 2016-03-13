myApp.controller('filterController', function($scope, $mdDialog, $http, $window, $q, $mdToast, $location) {
  $scope.types = [
    "Standard",
    "Handicap",
    "Small Car"
  ];
});