sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.ServiceStatus", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.ServiceStatus
		 */
		onInit: function () {
			this.initiateMap();
		},

		initiateMap: function () {
			var apiKey = "AIzaSyA1Nf0APVaaIp1o5lTJLEQ88ki5mVJT6ls"; //POD's
			// var apiKey = "AIzaSyBagLydOrvYMN9R7LB9r4TGQyHtsmN3REQ"; //Kiru's
			var googleApi =
				"https://maps.googleapis.com/maps/api/js?key=" + apiKey + "&avoid=TOLLS&libraries=places&callback=initMap";
			_gmaps.loadApi(googleApi);
			var oMapLocations = new sap.ui.model.json.JSONModel();
			oMapLocations.loadData("model/mapLocations.json");
			this.getView().setModel(oMapLocations, "oMapLocations");
			this.marker = [];
		},

		makeCall: function (oEvent) {
			sap.m.URLHelper.triggerTel(oEvent.getSource().getBindingContext("oAppModel").getObject().contact);
		},

		showGMaps: function (oEvent) {
			var location = oEvent.getSource().getBindingContext("oAppModel").getObject().location;
			this.home = {
				"lat": 9.947050,
				"lng": 78.132690,
				"maptype": "ROADMAP",
				"zoom": 8,
				"id": 0,
				"title": "Tamilnadu",
			};
			if (!this.gMaps) {
				this.gMaps = sap.ui.xmlfragment("com.sap.alj.sca.ALJ_SCA.fragment.GMaps", this);
				this.getView().addDependent(this.gMaps);
			}
			this.gMaps.open();
			this.loadMap();
		},
		
		onCloseGMaps: function(){
			this.gMaps.close();
		},

		loadMap: function () {
			var that = this;
			// this.googleMap();
			setTimeout(function () {
				var oOptions = that.home;
				_gmaps.loadMap(that, "map_canvas", oOptions);
				setTimeout(function () {
					var info = "Current Location";
					that.marker = _gmaps.addMarker(that, oOptions, info);
				}, 1000);
			}, 1000);

			// this.generateMap();
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.ServiceStatus
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.ServiceStatus
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.ServiceStatus
		 */
		//	onExit: function() {
		//
		//	}

	});

});