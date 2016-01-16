var map;
var initialLocation;
var browserSupportFlag =  new Boolean();
var seattle = new google.maps.LatLng(47.6097, -122.3331); 
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
 $(function(){
 	$('#fromLocate').hide();
 	$('#locations').hide();

	
function initMap() {
	directionsDisplay = new google.maps.DirectionsRenderer();
	var mapBegin = {
		mapTypeControl: false,
		zoomControl: false,
		mapTypeControlsOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			position: google.maps.ControlPosition.TOP_LEFT
		},
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(document.getElementById('mapContainer'), mapBegin);
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById('directions'));
	var GeoMarker = new GeolocationMarker(map);

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
};

	$('#outSet').on('change', function(){
 			var $outSet = $('#outSet').val();
 			if ($outSet === "customLocation"){
 				$('#fromLocate').show();
 			} else {
 				$('#fromLocate').hide();
 			}
 		});

  	$('#mirror').on('click', function(){
  		$('#mirrorBox').addClass('mirrored');
  		$('#directions').addClass('mirroredDirections');
  	});

  	$('#normal').on('click', function(){
  		$('#mirrorBox').removeClass('mirrored');
  		$('#directions').removeClass('mirroredDirections');
  	});

  	$('#submit').on('click', function(){
  		if ($('#outSet').val() === 'nothing' || $('#toLocate').val().length < 1){
  			alert('Please fill out all fields')
  		} else {
  		calcRoute();
  		$('#locations').hide();
  		}
  	})

  	$('#center').on('click', function(){
  		map.setZoom(17);
  		map.setCenter(initialLocation);
  	})

  	$('#getDirections').on('click', function(){
  		$('#locations').show();
  		$(window).scrollTop($('#locations')[0].scrollHeight);
  	})

  	$('#exit').on('click', function(){
  		$('#locations').hide()
  	})



	google.maps.event.addDomListener(window, 'load', initMap());


});






 






