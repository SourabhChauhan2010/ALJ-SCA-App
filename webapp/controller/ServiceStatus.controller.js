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
			// this.initiateMap();
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
		
		onCopyToCal: function () {
			var oModelData = this.getModel("oAppModel").getData().appointmentDetails;
			var startDate = new Date(oModelData.pickupDateTime);
			var endDate = new Date(oModelData.pickupDateTime);
			var title = oModelData.vehicle + " service";
			var mylocation = oModelData.location;
			var notes = "Pickup " + oModelData.vehicle + " for service on " + oModelData.serviceDateTime;
			var success = function (message) {
				sap.m.MessageToast.show("Event Created Successfully!");
			};
			var error = function (message) {
				sap.m.MessageToast.show("Something went wrong!");
			};

			window.plugins.calendar.createEvent(title, mylocation, notes, startDate, endDate, success, error);
		},
		
		cancelBooking: function () {
			var sUrl = "/App_booking_cancellationSet(Vbeln='3000010715',Abgru='A1')";
			var oERPDataModel = this.getModel("oERPDataModel");
			var oAppModel = this.getModel("oAppModel");
			oERPDataModel.read(sUrl, {
				success: function (oData) {
					this._showToastMessage("App_booking_cancellationSet Success");
				}.bind(this),
				error: function (oData) {}
			});
		},
		
		rescheduleBooking: function () {
			var sUrl = "/App_booking_ReschedulingSet(Vbeln='3000010715',AppTs='001',AppDate='20201408',AppType='ZAP')";
			var oERPDataModel = this.getModel("oERPDataModel");
			var oAppModel = this.getModel("oAppModel");
			oERPDataModel.read(sUrl, {
				success: function (oData) {
					this._showToastMessage("App_booking_ReschedulingSet Success");
				}.bind(this),
				error: function (oData) {}
			});
		}

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