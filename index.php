<!DOCTYPE HTML>
<html ng-app="myApp">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"/>
  
  <!-- DEPENDENCIES -->
  
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular-animate.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular-aria.min.js"></script>
  <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/1.0.3/angular-material.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/angular_material/1.0.3/angular-material.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.4/angular-route.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/angular-material-icons/0.6.0/angular-material-icons.min.js"></script>
  
  <!-- FONTS -->
  
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">

  <!-- app files -->
  <script src="app/app.module.js"></script>
  <script src="app/app.routes.js"></script>
  <!-- load papa parse via CDN -->
  
  <!-- Controllers -->
  <script src="app/components/filter/filterController.js"></script>
  <script src="app/components/infoWindow/infoWindowController.js"></script>
  <script src="app/components/loading/loadingController.js"></script>
  <script src="app/components/map/mapController.js"></script>
  <script src="app/components/timeAdd/timeAddController.js"></script>
  <script src="app/components/timeLeft/timeLeftController.js"></script>
  
  <!-- LIBS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.1.2/papaparse.min.js"></script>
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDTUJS4ZDzQs6_Jq3zplk7hriJH0Y4OemQ&callback=angular.noop"></script>
  
</head>

<body>

  <div id="main" layout-fill layout="column">
    <md-content md-scroll-y flex>
      <div ng-view>

      </div>
    </md-content> 
  </div>

</body>

</html>
