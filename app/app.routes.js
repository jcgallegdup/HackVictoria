// configure our routes
myApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/map', {
            templateUrl : 'app/components/map/mapView.html',
            controller  : 'mapController'
        })
    
        .when('/timeLeft', {
            templateUrl : 'app/components/timeLeft/timeLeftView.html',
            controller  : 'timeLeftController'
        })
    
        .when('/filter', {
            templateUrl : 'app/components/filter/filterView.html',
            controller  : 'filterController'
        })
    
        .when('/', {
            templateUrl : 'app/components/loading/loadingView.html',
            controller  : 'loadingController'
        })
    
        .otherwise({
            resolve: {
              redirectTo: "/"
            }
        })
    
});
