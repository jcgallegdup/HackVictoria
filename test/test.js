const LAT = 11;
const LONG = 10;
const MAX_TIME = 9;
const RATE_PER_HR = 8;
const METER = 7;

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "../assets/CSV/ParkingSpaces.csv",
        dataType: "text",
        success: function(data) {Papa.parse(data, {
	    complete: function(results) {
	        alert("Finished:", results.data);
	        useData(results);
		    }
		});
    }
    });
});

var parkingSpaces = [];
var maxLongitude, maxLatitude, minLongitude, minLatitude;

function useData(results){
    var data = results.data;
    
    for(var i = 1; i < data.length; i++){
        if(data[i][1] == "HANDICAP"){
            type = "handicap";
        }else if(data[i][1] == undefined){
            type = "regular";
        }else if(data[i][1] == "SMALL VEHICLE"){
            type = "small vehicle";
        }else{
            continue;
        }
        parkingSpaces.push(new PSpot(type, data[i][LAT], data[i][LONG], data[i][METER], data[i][RATE_PER_HR], data[i][MAX_TIME]));
        if(maxLatitude < data[i][LAT]){
            maxLatitude = data[i][LAT];
        } else if(minLatitude > data[i][LAT]){
            minLatitude = data[i][LAT];
        }
        if(maxLongitude < data[i][LONG]){
            maxLongitude = data[i][LONG];
        } else if(maxLongitude > data[i][LONG]){
            minLongitude = data[i][LONG];
        }
    }

}

function getBounds(){
    return [maxLongitude, maxLatitude, minLongitude, minLatitude];
}

// filter is a JSON object with attributes:
// type, hrs (that the user will park), & price (max the user wants to spend)
function displayMapData(filter){
    var result = [];
    for(var i in parkingSpaces){
        var temp = parkingSpaces[i];
        var d = new Date();             // filter.curtime is temporary, pending change for final version
        if((d.getDay() == 0) || (filter.curtime >= 18)){
            temp.rate = 0;
        }
        if(filter.curtime + filter.hrs > 18){
            filter.hrs = 18 - filter.curtime;
        }
        if(temp.type == filter.type && (temp.rate * filter.hrs) <= filter.price){
            result.push(temp);
        }
    }
    return result;
}

const PSpot = function(type, latitutde, longitude, meter, rate, maxTime){
    return {
        type : type,
        latitude : latitutde,
        longitude : longitude,
        meter : meter,
        rate : rate, 
        maxTime : maxTime,
    };
}