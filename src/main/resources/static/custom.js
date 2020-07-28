function doGeocode() {
	var address = document.getElementById("address");
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({
		'address': address.value
	}, function (results, status) {
		if (status != google.maps.GeocoderStatus.OK) {
			alert("Address invalid. Enter a valid address.")
		}
	});
}

var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: coords,
        zoom: 15,
        scrollwheel: false
    });
    
    var userMarker = new google.maps.Marker({
        position: coords,
        map: map
    });
    
    var image = {url: '/bus.png', 
    	    scaledSize: new google.maps.Size(40, 40)};
     
    var infowindow = new google.maps.InfoWindow();
    
    
    
    for (i=0; i<busLocations.length; i++){
        var marker = new google.maps.Marker({
            position: { lat: parseFloat(busLocations[i].LATITUDE), lng: parseFloat(busLocations[i].LONGITUDE) },
            map: map,
            icon: image
        });
        
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
        	return function() {
        		infowindow.setContent('Bus Route: ' + busLocations[i].ROUTE);
        		infowindow.open(map,marker);
        	}
        })(marker, i));
    }
}