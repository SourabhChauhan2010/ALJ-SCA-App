sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.More", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.More
		 */
		onInit: function () {

		},
		
		openSafetyMaintenance: function() {
			this.getRouter().navTo("SafetyTips");
		},
		
		onAcoountListPress: function() {
			this.getRouter().navTo("UserProfile");
		},
		
		onContactUsPress: function() {
			this.getRouter().navTo("ContactUs");
		},
		
		onFaqPress: function() {
			this.getRouter().navTo("FAQ");
		},
		onPrivacyPress: function() {
			this.getRouter().navTo("Privacy");
		},
        onTermsPress: function() {
			this.getRouter().navTo("TermsOfUse");
		},
		onLanguagePress: function() {
			this.getRouter().navTo("Language");
		},
		onPrefServCntrPress: function() {
			this.getRouter().navTo("ServiceCenter");
		},
		onSafetyPress: function() {
			this.getRouter().navTo("SafetyMaintenance");
		},
		onSharePress: function() {
			this.getRouter().navTo("Share");
		}


	});

});