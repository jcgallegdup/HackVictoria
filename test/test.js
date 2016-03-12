$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "../assets/CSV/ParkingSpaces.csv",
        dataType: "text",
        success: function(data) {Papa.parse(data, {
	    complete: function(results) {
	        alert("Finished:", results.data);
	        console.log(results);
		    }
		});
    }
    });
});



