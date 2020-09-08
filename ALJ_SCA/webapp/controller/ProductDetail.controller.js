sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.ProductDetail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.Profile
		 */
		onInit: function () {
			this.getRouter().attachRoutePatternMatched(function (oEvent) {
				if (oEvent.getParameter("name") === "ProductDetail") {
					//
				}
			}.bind(this));
		}

	});

});