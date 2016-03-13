// create the controller and inject Angular's $scope
myApp.controller('timeAddController', function($scope, $mdDialog, $http, $window, $q, $mdToast) {
    
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
});