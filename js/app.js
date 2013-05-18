
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
		'zoom': 15
	}).bind('init', function(event, map) {
		// carga de marcas
		$.post('backend/load.php', null, function(data){
			console.log(data);
			for(i=0; i < data.length; i++) {
				Map.DrawMarker( data[i] );
			}
		}, 'json');

		// evento click de mapa
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

	// eventos modal
	$("#dialog").on('hidden', function(){
		$(this).find("input, textarea").val("");
	});

});

// objeto que permite controlar el mapa
var Map = {
	//obj: $("#gmap"),
	state: MAP_MODE_NAV,
	MarkerBegin: function() {
		//console.log($(Map.obj));
		$("#gmap").gmap('option', 'draggableCursor', 'crosshair');
		Map.state = MAP_MODE_EDIT;
	},
	MarkerEnd: function(lat, lng) {
		var pos = new google.maps.LatLng(lat, lng);
		$("#gmap").gmap('addMarker', {'position': pos} );
		$("#gmap").gmap('option', 'draggableCursor', 'url(http://maps.google.com/mapfiles/openhand.cur), move');
		Map.state = MAP_MODE_NAV;
	},

	DrawMarker: function(obj) {
		//console.log(obj);
		var pos = new google.maps.LatLng(obj.pos.lat, obj.pos.lng);
		var image = 'img/' + obj.type + '.png';
		switch(obj.type) {
			case 'gift':
				break;
			case 'picture':
				break;
			case 'meeting':
				break;
			case 'danger-zone':
				break;
			default:
		}
		$("#gmap").gmap('addMarker', {
			//'id': c.id,
			//'name': c.nomb,
			'position': pos,
			'icon': image
			//'radius': parseFloat(cerca.rad),
			//'editable': false
		});
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
	$('#dialog fieldset').hide();
	$('#dialog fieldset.all').show();
	$('#dialog').modal();
};

addPicture_Click = function() {
	$('#dialog fieldset').hide();
	$('#dialog fieldset.all, #dialog fieldset.picture').show();
	$('#dialog').modal();
};

addGift_Click = function() {
	$('#dialog fieldset').hide();
	$('#dialog fieldset.all, #dialog fieldset.gift').show();
	$('#dialog').modal();
};

addMeeting_Click = function() {
	$('#dialog fieldset').hide();
	$('#dialog fieldset.all, #dialog fieldset.meeting').show();
	$('#dialog').modal();
};

addDangerZone_Click = function() {
	$('#dialog fieldset').hide();
	$('#dialog fieldset.all').show();
	$('#dialog').modal();
};

map_SetMarkerBegin = function() {

};