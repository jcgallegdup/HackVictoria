myApp.service('sharedService', function() {
    var id = -1;
    
    var type = "Standard";
    var time = 2;
    var parkingSpots = [];
    var cost = 30.00;
    var recentSearches = [];
    var timeRemaining = 0;
    var carLoc = {};
    
    var setType = function(IN) {
        type = IN;
    }
    var getType = function() {
        return type;
    }
    
    var setTime = function(IN) {
        time = IN;
    }
    var getTime = function() {
        return time;
    }
    
    var setParkingSpots = function(IN) {
        parkingSpots = IN
    }
    var getParkingSpots = function() {
        return parkingSpots;
    }
    
    var setCost = function(IN) {
        cost = IN;
    }
    var getCost = function() {
        return cost;
    }
    
    var setRecentSearches = function(IN) {
        recentSearches.push(IN);
        if (recentSearches.length > 4) {
            recentSearches.pop();
        }
    }
    var getRecentSearches = function() {
        return recentSearches
    }
    var resetRecentSearches = function() {
        recentSearches = [];
    }
    
    var setTimeRemaining = function(IN) {
        timeRemaining = IN;
    }
    var getTimeRemaining = function() {
        return timeRemaining;
    }
    
    var setCarLoc = function(lat, long) {
        carLoc = {lat: lat, long: long};
    }
    var getCarLoc = function() {
        return carLoc;
    }

    var getId = function() {
	   return id;
    }

    var setId = function(IN) {
    	id = IN;
    }

    return {
        getType: getType,
        setType: setType,
        
        getTime: getTime,
        setTime: setTime,
        
        setParkingSpots: setParkingSpots,
        getParkingSpots: getParkingSpots,
        
        setCost: setCost,
        getCost: getCost,
        
        setRecentSearches: setRecentSearches,
        getRecentSearches: getRecentSearches,
        resetRecentSearches: resetRecentSearches,
        
        setTimeRemaining: setTimeRemaining,
        getTimeRemaining: getTimeRemaining,
        
        setCarLoc: setCarLoc,
        getCarLoc: getCarLoc,

	   setId: setId,
        getId: getId
    };
});