var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

myApp.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('green', {
            'default': '500'
        })
        .accentPalette('orange');
});