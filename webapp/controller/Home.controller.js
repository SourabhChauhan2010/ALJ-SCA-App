sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.Home", {
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);

			var jsonModel = new sap.ui.model.json.JSONModel();
			var oPayload = {
				"plant": "Bangalore",
				"screenStatus": "CALIBRATION",
				"identifier": "38"
			};
			var oHeader = {
				"Content-Type": "application/json;charset=utf-8"
			};
			var sUrl = "/SBA_book_a_service/alj/profile/userId/001/1000052113/2201739097";
			jsonModel.loadData(sUrl, null, true, "GET", false, false, oHeader);

			jsonModel.attachRequestCompleted(function (oData) {
				sap.m.MessageToast.show("Success");
			});

			jsonModel.attachRequestFailed(function (oResponse) {
				sap.m.MessageToast.show("Error");
			});

		},
		onAfterRendering: function () {
			/*	this.byId("idVBServiceListItems").attachBrowserEvent("click", function(oEvent) {
					this.NavtoServices();
				});*/
		},
		onBack: function (evt) {
			this.oRouter.navTo("Launchpad");

		},
		NavtoServices: function (evt) {
			var index = evt.getSource().getId().slice(41);
			if (index === "0") {
				this.oRouter.navTo("BookAService");
			} else if (index === "1") {
				this.oRouter.navTo("MyServices");
			}
		},

		onBookService: function () {
			this.oRouter.navTo("BookAService");
		}

	});
});