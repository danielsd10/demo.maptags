
// constantes para modo navegación/edición
var MAP_MODE_NAV = 0, MAP_MODE_EDIT = 1;

// activar la mejora visual
google.maps.visualRefresh = true;

$(document).ready(function(){

	// posición inicial del mapa
	var startLatLng = new google.maps.LatLng(-16.38980, -71.53568);
	// iniciar mapa
	$("#gmap").gmap({
		'center': startLatLng,
		'zoom': 17
	}).bind('init', function(event, map) {
		$(map).click( Map.Click );
	});

	// tooltips
	$("#toolbar button").tooltip({placement: "bottom"});

	// eventos de botones de toolbar
	$("#addLocation").click(addLocation_Click);
	$("#addPicture").click(addPicture_Click);
	$("#addGift").click(addGift_Click);
	$("#addMeeting").click(addMeeting_Click);
	$("#addDangerZone").click(addDangerZone_Click);

});

// objeto que permite controlar el mapa
var Map = {
	obj: $("#gmap"),
	state: MAP_MODE_NAV,
	MarkerBegin: function() {
		console.log($(Map.obj));
		$("#gmap").gmap('option', 'draggableCursor', 'crosshair');
		Map.state = MAP_MODE_EDIT;
	},
	MarkerEnd: function(lat, lng) {
		var pos = new google.maps.LatLng(lat, lng);
		$("#gmap").gmap('addMarker', {'position': pos} );
		$("#gmap").gmap('option', 'draggableCursor', 'url(http://maps.google.com/mapfiles/openhand.cur), move');
		Map.state = MAP_MODE_NAV;
	},

	Click: function(e) {
		//console.log(e);
		if (Map.state == MAP_MODE_EDIT) {
			Map.MarkerEnd(e.latLng.lat(), e.latLng.lng());
		}
	}
};

addLocation_Click = function() {
	Map.MarkerBegin();
};

addPicture_Click = function() {
	$('#dialog').modal();
};

addGift_Click = function() {

};

addMeeting_Click = function() {

};

addDangerZone_Click = function() {

};

map_SetMarkerBegin = function() {

};
