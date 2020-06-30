sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.EditProfile", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.EditProfile
		 */
		onInit: function () {

		},

		onConfirmEditProfile: function (oEvent) {
			var oAppModel = this.getModel("oAppModel");
			var sUrl = "/SBA_book_a_service/alj/validate/mobile";
			var oPayload = {
				"mobile2": oAppModel.getProperty("/UserInformation/0/mobile2")
			};
			this.doAjax(sUrl, "POST", oPayload, function (oData) {
				if (oData) {
					this._showToastMessage("Mobile Number verified successfully");
					this.getRouter().navTo("Profile");
				} else {
					this._showToastMessage("Enter valid Mobile Number");
				}
				this.getUserInformation();
			}.bind(this), function (oData) {

			});
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.EditProfile
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.EditProfile
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.EditProfile
		 */
		//	onExit: function() {
		//
		//	}

	});

});