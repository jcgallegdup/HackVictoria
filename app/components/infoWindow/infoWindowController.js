// create the controller and inject Angular's $scope
myApp.controller('infoWindowController', function($scope, $mdDialog, $http, $window, $q, sharedService) {
    $scope.time = sharedService.getTime();
    
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
    
    $scope.park = function() {
        sharedService.setTime(timeToNum());
        
        $mdDialog.show({
            controller: 'timeLeftController',
            templateUrl: 'app/components/timeLeft/timeLeftView.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        })
        .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    }
    
    function timeToNum() {
        var t = $scope.time;
        if (t == 0) {
            return 0.5;
        } else if (t == 1) {
            return 1;
        } else if (t == 2) {
            return 1.5;
        } else if (t == 3) {
            return 2;   
        } else if (t == 4) {
            return 3;
        } else {
            return 4;
        }
    }
    
    $scope.getCost = function() {
        return timeToNum() * data.rate;
    }
    
    $scope.timeToString = function() {
        var t = $scope.time;
        
        if (t == 0) {
            return "30 Minutes";
        } else if (t == 1) {
            return "1 Hour"
        } else if (t == 2) {
            return "1.5 Hours";
        } else if (t == 3) {
            return "2 Hours";
        } else if (t == 4) {
            return "3 Hours";
        } else {
            return "4 Hours";
        }
    }
    
    console.log(sharedService.getId());
    $scope.data = sharedService.getParkingSpots()[sharedService.getId()];
    
    
});