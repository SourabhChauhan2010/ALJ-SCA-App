var _gmaps = (function () {
	var map;
	var markers = [];
	var directionsService;
	var directionsRenderer;
	var directionsDisplay;
	return {
		/*	
			Important:
			1) must call 'loadApi()' function in onInit() function so api file will load before map Initilize 
			2) must call 'init()' function in onAfterRendering() function 
			3) must use setTimeout for 'init()' method so it will load properlly
				Example:
					var that = this;
					setTimeout(function () {
						var oOptions = {
							"lat": -6.121435,
							"lgn": 106.774124,
							"maptype": "ROADMAP",
							"zoom": 8
						}
						_gmaps.init(that, "map_canvas", oOptions);
					}, 1000);
		*/

		/** 
		 * Function for initilize google API
		 * Please read my guide to know how to fix error ‘For development purposes only’ on google map visit given link:
		 * @see {@link http://plugins.g5plus.net/ere/knowledge-base/google-maps-shows-error-for-development-purposes-only/} - Google Maps is no longer free
		 * @param googleApi {String} - google Api URL
		 */
		loadApi: function (googleApi) {
			if (googleApi) {
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = googleApi;
				document.body.appendChild(script);
			}
		},

		/** 
		 * Function for initilize google map on view
		 * @param that {pointer} - this refrence of the controller
		 * @param domId {domElementID} - Document Element Id Where Map Will Load
		 * @param options {Object} - 
		 * Example:
		 *		oOptions = {
					"lat": -6.121435,
					"lgn": 106.774124,
					"maptype": "ROADMAP",
					"zoom": 8
				}
		 */
		loadMap: function (that, domId, options) {
			var latlng = new google.maps.LatLng(options.lat, options.lng);
			var mapType;
			switch (options.maptype) {
			case "ROADMAP":
				mapType = google.maps.MapTypeId.ROADMAP
				break;
			case "SATELLITE":
				mapType = google.maps.MapTypeId.SATELLITE
				break;
			default:
				mapType = google.maps.MapTypeId.ROADMAP
			}
			var mapOptions = {
				center: latlng,
				zoom: options.zoom,
				mapTypeControl: false,
				// mapTypeId: mapType,
				// mapTypeControlOptions: {
				// 	style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				// 	position: google.maps.ControlPosition.LEFT_BOTTOM
				// },
				streetViewControl: false,
				fullscreenControl: true
			};
			map = new google.maps.Map(sap.ui.getCore().byId(domId).getDomRef(),
				mapOptions);
		},
		/** 
		 * Function to add a marker on map
		 * @param that {pointer} - This refrence of the controller
		 * @param oOptions {Object} - 
		 * Example : 
		 *		oOptions = {
						"lat": -6.121435,
						"lgn": 106.774124,
						"id": 123,
						"title": "Mumbai"
					};
		 * @returns {Array} - Gives array of marker objects ploted on the map 
		 */
		addMarker: function (that, oOptions, info) {
			if (oOptions.lat && oOptions.lng) {
				var location = {
					lat: oOptions.lat,
					lng: oOptions.lng
				};
				// Icon 
				// var icon = {
				// 	url: "./css/media/Tracking.png", // url
				// 	scaledSize: new google.maps.Size(30, 30), // scaled size
				// 	origin: new google.maps.Point(0, 0), // origin
				// 	anchor: new google.maps.Point(0, 0) // anchor
				// };
				// Plot Marker In Map
				var oPosMarker = new google.maps.Marker({
					id: oOptions.id,
					position: location,
					title: oOptions.title,
					// animation: google.maps.Animation.BOUNCE,
					// title: 'You are here.',
					// icon: icon,
					// zIndex	 : 10,
					map: map
				});
				if (info) {
					var sTrackDiv;
					// if (info.track) {
					// 	sTrackDiv = '<div class="iw-title" width="100%"> <div with="50%">' + info.id + '</div>' +
					// 		'<div with="50%"> <button id="TrackShip"> Track </button> </div> </div>';
					// } else {
					sTrackDiv = '<div class="iw-title">' + info.id + '</div>';
					var shipIdiv;
					if (info.shipId) {
						shipIdiv = '<div class="iw-subTitle">Shipment Id - ' + info.shipId + '</div>';
					} else {
						shipIdiv = "";
					}
					// }
					var contentString = '<div id="iw-container">' +
						sTrackDiv +
						// '<div class="iw-title">' + info.id + '</div>' +
						'<div class="iw-content">' +
						shipIdiv +
						'<div class="iw-subTitle">Driver Details</div>' +
						'<img src="./css/media/truck.png" alt="Image" height="115" width="115">' +
						'<p class="podMapMarkerText"> Driver Name: ' + info.name + ' </p>' +
						'<p class="podMapMarkerText"> Location: ' + info.location + '</p>' +
						'<div class="iw-subTitle">Contacts</div>' +
						'<p class="podMapMarkerText">' +
						'Phone. ' + info.phone + '<br>e-mail: ' + info.email + '<br></p>' +
						'</div>' +
						'<div class="iw-bottom-gradient"></div>' +
						'</div>';

					var infowindow = new google.maps.InfoWindow({
						content: contentString
					});
					oPosMarker.addListener('mouseover', function () {
						// infowindow.open(map, oPosMarker);
					});
					oPosMarker.addListener('click', function (oDate) {
						if (info.shipId) {
							// that.TrackShipment(oPosMarker);
						}
					});
				}

				markers.push(oPosMarker);

				// Set Bounds To Show All Marker Visible 
				if (!that._oCrtTripLatLngBounds) {
					that._oCrtTripLatLngBounds = new google.maps.LatLngBounds();
				}
				that._oCrtTripLatLngBounds.extend(new google.maps.LatLng(location.lat, location.lng));
				map.setCenter(that._oCrtTripLatLngBounds.getCenter());
				map.fitBounds(that._oCrtTripLatLngBounds);
				google.maps.event.addListenerOnce(map, 'bounds_changed', function (event) {
					if (map.getZoom() > 15) {
						map.setZoom(14);
					}
					if (map.getZoom() < 2) {
						map.setZoom(4);
					}
				});
				return markers;
			}
		},

		/** 
		 * Function for remove marker from map
		 * @param that {pointer} - This refrence of the controller.
		 * @param oMarker {object} - Marker Object which return by 'addMarker' function.
		 * @see {@link addMarker} - object return by 'addMarker' function.
		 */
		removeMarker: function (that, oMarker) {

			if (oMarker instanceof google.maps.Marker) {
				oMarker.setMap(null);
			}
			markers = markers.filter(function (obj) {
				return obj.id !== oMarker.id;
			})

			if (!that._oCrtTripLatLngBounds) {
				that._oCrtTripLatLngBounds = new google.maps.LatLngBounds();
				map.fitBounds(that._oCrtTripLatLngBounds);
			}
			if (!that._oCrtTripLatLngBounds.isEmpty()) {
				map.setCenter(that._oCrtTripLatLngBounds.getCenter());
				map.fitBounds(that._oCrtTripLatLngBounds);
			}
			google.maps.event.addListenerOnce(map, 'bounds_changed', function (event) {
				if (map.getZoom() > 15) {
					map.setZoom(14);
				}
				if (map.getZoom() < 2) {
					map.setZoom(4);
				}
			});

		},
		getMap: function () {
			return map;
		},

		getMapRoute: function (sStartLoc, sEndLoc, that) {

			directionsService = new google.maps.DirectionsService();
			/*google.maps.event.addDomListener(window, 'load', function () {
				directionsDisplay = new google.maps.DirectionsRenderer({
					'draggable': true
				});
			});*/
			directionsDisplay = new google.maps.DirectionsRenderer({
				'draggable': false,
				'preserveViewport': true

			});
			var map = _gmaps.getMap();
			directionsDisplay.setMap(map);
			var source = sStartLoc;
			var destination = sEndLoc;

			var request = {
				origin: source,
				destination: destination,
				travelMode: google.maps.TravelMode.DRIVING
			};

			directionsRenderer = new google.maps.DirectionsRenderer({
				map: map,
				suppressMarkers: true
			});

			// Start/Finish icons
			// var icons = {
			// 	start: new google.maps.MarkerImage(
			// 		// URL
			// 		'./css/gicon.png',
			// 		// (width,height)
			// 		new google.maps.Size(50, 50),
			// 		// The origin point (x,y)
			// 		new google.maps.Point(0, 0),
			// 		// The anchor point (x,y)
			// 		new google.maps.Point(22, 32)
			// 	),
			// 	end: new google.maps.MarkerImage(
			// 		// URL
			// 		'./css/gicon.png',
			// 		// (width,height)
			// 		new google.maps.Size(50, 50),
			// 		// The origin point (x,y)
			// 		new google.maps.Point(0, 0),
			// 		// The anchor point (x,y)
			// 		new google.maps.Point(22, 32)
			// 	)
			// };

			var iconStart = {
				url: "./css/media/diverLoc.png", // url
				scaledSize: new google.maps.Size(25, 35), // scaled size
				origin: new google.maps.Point(0, 0), // origin
				anchor: new google.maps.Point(0, 24) // anchor
			};

			var iconEnd = {
				url: "./css/media/shipLoc.png", // url
				scaledSize: new google.maps.Size(25, 35), // scaled size
				origin: new google.maps.Point(0, 0), // origin
				anchor: new google.maps.Point(0, 24) // anchor
			};

			/*	var movingIcon = new google.maps.MarkerImage('./css/car.png');
				var startIcon = new google.maps.MarkerImage('./css/desti.png');*/

			directionsService.route(request, function (response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsRenderer.setDirections(response);
					// var aEnroutTrip = oShipmentDataModel.setProperty("/ActiveShipments", aEnroutTrip);
					var contentString = "City";
					// directionsDisplay.setDirections(response);
					// var contentString = '<div id="iw-container">' +
					// 	'<div class="iw-title">' + 'Shipment Id-' + aEnroutTrip.shipmentId + '</div>' +
					// 	'<div class="iw-content">' +
					// 	'<div class="iw-subTitle">Driver Details</div>' +
					// 	'<img src="./css/media/truck.png" alt="Image" height="115" width="115">' +
					// 	'<p class="podMapMarkerText"> Driver Name: ' + aEnroutTrip.user.firstname + ' </p>' +
					// 	'<p class="podMapMarkerText"> Location: ' + aEnroutTrip.soldToAddress + '</p>' +
					// 	'<div class="iw-subTitle">Contacts</div>' +
					// 	'<p class="podMapMarkerText">' +
					// 	'Phone. ' + info.phone + '<br>e-mail: ' + aEnroutTrip.email + '<br></p>' +
					// 	'</div>' +
					// 	'<div class="iw-bottom-gradient"></div>' +
					// 	'</div>';

					var leg = response.routes[0].legs[0];
					that.sDriverLocation = this.makeMarker(leg.start_location, iconStart, contentString);
					that.sOrigiDLocation = this.makeMarker(leg.end_location, iconEnd, contentString);
				}
			}.bind(this));

			// directionsService.route({
			// 	origin: source,
			// 	destination: destination
			// }, function (response, status) {
			// 	if (status == google.maps.DirectionsStatus.OK) {
			// 		directionsDisplay.setDirections(response);
			// 		var leg = response.routes[0].legs[0];
			// 		that.makeMarker(leg.start_location, icons.start, "title");
			// 		that.makeMarker(leg.end_location, icons.end, 'title');
			// 	}
			// });

			//*********DISTANCE AND DURATION**********************//
			var service = new google.maps.DistanceMatrixService();
			service.getDistanceMatrix({
				origins: [source],
				destinations: [destination],
				travelMode: google.maps.TravelMode.DRIVING,
				unitSystem: google.maps.UnitSystem.METRIC,
				avoidHighways: false,
				avoidTolls: false
			}, function (response, status) {
				// if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
				// var distance = response.rows[0].elements[0].distance.text;
				var duration = response.rows[0].elements[0].duration.text;
				// that.getView().byId("time").setText("Duration:" + duration);
				/* dvDistance.innerHTML += "Distance: " + distance + "<br />";
				 dvDistance.innerHTML += "Duration:" + duration;*/

				// } else {
				// 	alert("Unable to find the distance via road.");
				// }
			});
			// setInterval(function () {
			// 	this.fnUpdateLocation();
			// }.bind(this), 10000);
		},

		drawPath: function (sStartLoc, sEndLoc, that) {

			// directionsDisplay = new google.maps.DirectionsRenderer({
			// 	'draggable': false,

			// });

			directionsDisplay.setMap(map);
			var source = sStartLoc;
			var destination = sEndLoc;

			var request = {
				origin: source,
				destination: destination,
				travelMode: google.maps.TravelMode.DRIVING
			};
			directionsService.route(request, function (response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsRenderer.setDirections(response);
					var contentString = "City";
					map.setZoom(17);
					map.panTo(that.sDriverLocation.position);
					// directionsDisplay.setDirections(response);
					// var contentString = '<div id="iw-container">' +
					// 	'<div class="iw-title">' + 'Shipment Id-' + aEnroutTrip.shipmentId + '</div>' +
					// 	'<div class="iw-content">' +
					// 	'<div class="iw-subTitle">Driver Details</div>' +
					// 	'<img src="./css/media/truck.png" alt="Image" height="115" width="115">' +
					// 	'<p class="podMapMarkerText"> Driver Name: ' + aEnroutTrip.user.firstname + ' </p>' +
					// 	'<p class="podMapMarkerText"> Location: ' + aEnroutTrip.soldToAddress + '</p>' +
					// 	'<div class="iw-subTitle">Contacts</div>' +
					// 	'<p class="podMapMarkerText">' +
					// 	'Phone. ' + info.phone + '<br>e-mail: ' + aEnroutTrip.email + '<br></p>' +
					// 	'</div>' +
					// 	'<div class="iw-bottom-gradient"></div>' +
					// 	'</div>';

					// var leg = response.routes[0].legs[0];
					// that.sDriverLocation = that.makeMarker(leg.start_location, iconStart, contentString);
					// that.sOrigiDLocation = that.makeMarker(leg.end_location, iconEnd, contentString);
				}
			}.bind(this));
		},

		makeMarker: function (position, icon, title) {
			var marker = new google.maps.Marker({
				position: position,
				map: map,
				icon: icon,
			});
			return marker;
			// var infowindow = new google.maps.InfoWindow({
			// 	content: contentString
			// });
			// google.maps.event.addListener(marker, 'click', function () {
			// 	infowindow.open(map, marker);
			// });
		},
	};
})();