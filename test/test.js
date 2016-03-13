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

function useData(results){
    var data = results.data;
    
    for(var i = 1; i < data.length; i++){
        if(data[i][1] == "HANDICAP"){
            parkingSpaces.push(new PSpot("handicap", data[i][LAT], data[i][LONG], data[i][METER], data[i][RATE_PER_HR], data[i][MAX_TIME]));
        }else if(data[i][1] == undefined){
            parkingSpaces.push(new PSpot("regular", data[i][LAT], data[i][LONG], data[i][METER], data[i][RATE_PER_HR], data[i][MAX_TIME]));
        }else if(data[i][1] == "SMALL VEHICLE"){
            parkingSpaces.push(new PSpot("small vehicle", data[i][LAT], data[i][LONG], data[i][METER], data[i][RATE_PER_HR], data[i][MAX_TIME]));
        }
    }
}

// filter is a JSON object with attributes:
// type, hrs (that the user will park), & price (max the user wants to spend)
function displayMapData(filter){
    var result = [];
    for(var i in parkingSpaces){
        var temp = parkingSpaces[i];
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