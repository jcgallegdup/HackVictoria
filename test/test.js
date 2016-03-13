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

function useData(results){
    var data = results.data;
    var parkingSpaces = [];

    for(var i = 1; i < data.length; i++){
        if(data[i][1] == "HANDICAP"){
            parkingSpaces.push(new PSpot("handicap", data[i][LAT], data[i][LONG], data[i][METER], data[i][RATE_PER_HR], data[i][MAX_TIME]));
        }else if(data[i][1].length == 0){
            parkingSpaces.push(new PSpot("regular", data[i][LAT], data[i][LONG], data[i][METER], data[i][RATE_PER_HR], data[i][MAX_TIME]));
        }
    }
}

const PSpot = function(type, latitutde, longitude, meter, rate, maxTime){
    return {
        type : type,
        latitude : latitutde,
        longitude : longitude,
        meter : meter,
        rate : rate, 
        maxTime : maxTime,
    }
}