var map;
var initialLocation;
var browserSupportFlag =  new Boolean();
var seattle = new google.maps.LatLng(47.6097, -122.3331); 
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
 $(function(){
 	$('#fromLocate').hide();

	
function initMap() {
	directionsDisplay = new google.maps.DirectionsRenderer();
	var mapBegin = {
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById('mapContainer'), mapBegin);
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById('locations'));

	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			map.setCenter(initialLocation);
		});
	}
}

function calcRoute(){
	var start;
	
	if ($('#outSet').val() === 'customLocation'){
		start = $('#fromLocate').val();
	} else if ($('#outSet').val() === 'myLocation'){
		start = initialLocation;
	}

	var end = document.getElementById('toLocate').value;
	var request = {
		origin: start,
		destination:end,
		travelMode: google.maps.DirectionsTravelMode.DRIVING
	};
	directionsService.route(request, function(response, status){
		if (status == google.maps.DirectionsStatus.OK){
			directionsDisplay.setDirections(response);
		}
	});
	console.log('click')
};

	$('#outSet').on('change', function(){
 			var $outSet = $('#outSet').val();
 			if ($outSet === "customLocation"){
 				$('#fromLocate').show();
 			}
 		});

  	$('#mirror').on('click', function(){
  		$('#mirrorBox').addClass('mirrored');
  		$('#directions').addClass('mirrored');
  	});

  	$('#normal').on('click', function(){
  		$('#mirrorBox').removeClass('mirrored');
  		$('#directions').removeClass('mirrored');
  	});

  	$('#submit').on('click', function(){
  		calcRoute();
  	})

	google.maps.event.addDomListener(window, 'load', initMap());


});






 






