
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
		'zoom': 15,
		'mapTypeId': google.maps.MapTypeId.ROADMAP
	}).bind('init', function(event, map) {
		// carga de marcas
		$.get('backend/load.php', null, function(data){
			for(i=0; i < data.length; i++) {
				Map.DrawMarker( data[i] );
			}
		}, 'json');

		// evento click de mapa
		$(map).click( Map.Click );
	});
	//console.log($("#gmap").gmap('get','map'));
	// tooltips
	$("#toolbar button").tooltip({placement: "bottom"});

	// eventos de botones de toolbar
	$("#addLocation").click(addLocation_Click);
	$("#addPicture").click(addPicture_Click);
	$("#addGift").click(addGift_Click);
	$("#addMeeting").click(addMeeting_Click);
	$("#addDangerZone").click(addDangerZone_Click);

	// eventos modal
	$("#dialog").on('hidden', Dialog.Clear);
	$("#dialog button[data-dismiss='modal']").click( Dialog.Cancel );
	$("#dialog button[data-action='save']").click( Dialog.Save );

});

// objeto que permite controlar el mapa
var Map = {
	//obj: $("#gmap"),
	state: MAP_MODE_NAV,
	newMarker: null,

	MarkerBegin: function(type) {
		//console.log($(Map.obj));
		// crear objeto marcador con valores iniciales
		Map.newMarker = new google.maps.Marker({
			id: 1,
      		type: type,
      		icon: 'img/' + type + '.png'
  		});
  		// visualizar modo de edición
		$("#gmap").gmap('option', 'draggableCursor', 'crosshair');
		Map.state = MAP_MODE_EDIT;
	},
	MarkerEnd: function(lat, lng) {
		// cargar coordenadas a marcador nuevo
		var pos = new google.maps.LatLng(lat, lng);
		Map.newMarker.position = pos;
		// crear marcador en mapa
		//Map.newMarker.map = $("#gmap").gmap('get','map');
		$("#gmap").gmap('addMarker', Map.newMarker );
		// cargar modal para ingresar datos
		Dialog.ShowNew(Map.newMarker.type);
		// restablecer a modo de navegación
		$("#gmap").gmap('option', 'draggableCursor', 'url(http://maps.google.com/mapfiles/openhand.cur), move');
		Map.state = MAP_MODE_NAV;
	},

	DrawMarker: function(obj) {
		//console.log(obj);
		var pos = new google.maps.LatLng(obj.pos.lat, obj.pos.lng);
		var icon = 'img/' + obj.type + '.png';
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
			'id': obj._id.$id,
			'position': pos,
			'icon': icon
		});
	},

	Click: function(e) {
		//console.log(e);
		if (Map.state == MAP_MODE_EDIT) {
			Map.MarkerEnd(e.latLng.lat(), e.latLng.lng());
		}
	}
};

var Dialog = {
	ShowNew: function(type) {
		$('#dialog fieldset').hide();
		$('#dialog fieldset.all, #dialog fieldset.' + type).show();
		$('#dialog').modal();
	},

	Save: function() {
		var formData = {
			type: Map.newMarker.type,
			pos: {lat: Map.newMarker.position.lat(), lng: Map.newMarker.position.lng()},
			title: $("#titulo").val(),
			descr: $("#descr").val()
		};
		switch (formData.type) {
			case 'gift':
				formData.price = $("#precio").val();
				break;
			case 'meeting':
				formData.when = $("#fecha").val();
				formData.asist = [];
				$("input[name='asist']").each(function(){
					if ($(this).val() != "") { formData.asist.push( $(this).val() ); }
				});
				break;
		}
		$.post('backend/save.php', formData, function(data){
			console.log(data);
			if (data.ok) { alert('Marcador Guardado!'); } else { alert('error!!'); }
		}, 'json');
		$("#dialog").modal('hide');
	},

	Cancel: function() {
		/*$('#gmap').gmap('findMarker', 'id', 1, function(found, marker) {
			alert(found);
        	//if (found) marker.setVisible(false);
		});*/
		console.log($('#gmap').gmap);
		var circles = $('#gmap').gmap('get', 'overlays');
		$(circles).each( function() {
			console.log( this.get('id') );
			/*if (this.get('id') == cerca.id) {
				this.setMap(null);
			}*/
		});
		//Map.newMarker.setMap = null;
	},

	Clear: function() {
		$("#dialog").find("input, textarea").val("");
	}
};

addLocation_Click = function() {
	Map.MarkerBegin('location');
};

addPicture_Click = function() {
	Map.MarkerBegin('picture');
};

addGift_Click = function() {
	Map.MarkerBegin('gift');
};

addMeeting_Click = function() {
	Map.MarkerBegin('meeting');
};

addDangerZone_Click = function() {
	Map.MarkerBegin('danger-zone');
};
