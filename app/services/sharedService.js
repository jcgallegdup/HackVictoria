myApp.service('sharedService', function() {
    var myList = [];
    var id = -1;
    
    var type = "";
    var time = new Date();
    var parkingSpots = [];
    var cost = 0;
    var recentSearches = [];
    var timeRemaining = 0;
    var carLoc = {};
    
    var setType = function(type) {
        this.type = type;
    }
    var getType = function() {
        return type;
    }
    
    var setTime = function(time) {
        this.time = time;
    }
    var getTime = function() {
        return time;
    }
    
    var setParkingSpots = function(parkingSpots) {
        this.parkingSpots = parkingSpots
    }
    var getParkingSpots = function() {
        return parkingSpots;
    }
    
    var setCost = function(cost) {
        this.cost = cost;
    }
    var getCost = function() {
        return cost;
    }
    
    var setRecentSearches = function(input) {
        recentSearches.push(input);
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
    
    var setTimeRemaining = function(timeRemaining) {
        this.timeRemaining = timeRemaining;
    }
    var getTimeRemaining = function() {
        return timeRemaining;
    }
    
    var setCarLoc = function(lat, long) {
        this.carLoc = {lat: lat, long: long};
    }
    var getCarLoc = function() {
        return carLoc;
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
        getCarLoc: getCarLoc
    };
});