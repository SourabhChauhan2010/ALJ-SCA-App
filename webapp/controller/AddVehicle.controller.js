sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.AddVehicle", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.AddVehicle
		 */
		onInit: function () {

		},

		onPressAddVehicle: function () {
			var oAppModelData = this.getModel("oAppModel").getData();
			var sVIN = oAppModelData.enteredVIN;
			if (!sVIN) {
				this._createConfirmationMessage(this.getResourceText("ErrorEnterVIN"), "", "OK", false, function (oEvent) {});
				return;
			}
			var sUrl = "/SBA_book_a_service/alj/validate/vin";
			var oPayload = {
				"vin": sVIN
			};
			this.doAjax(sUrl, "POST", oPayload, function (oData) {
				//Success block
				if (oData) {
					this._showToastMessage("VIN verified successfully");
				} else {
					this._createConfirmationMessage(this.getResourceText("ErrorFindingVIN"), "Yes", "Cancel", true, function (oEvent) {
						//What to do if yes?
					});
				}

			}.bind(this), function (oData) {});
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.AddVehicle
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.AddVehicle
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.AddVehicle
		 */
		//	onExit: function() {
		//
		//	}

	});

});