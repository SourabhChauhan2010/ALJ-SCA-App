sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.Profile", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.Profile
		 */
		onInit: function () {
			this.getRouter().attachRoutePatternMatched(function (oEvent) {
				if (oEvent.getParameter("name") === "Profile") {
					this.setSelectedLanguage(this.getModel("oAppModel").getProperty("/language"), true);
				}
			}.bind(this));
		},

		onChangeLanguage: function (oEvent) {
			// var lang = sap.ui.getCore().getConfiguration().getLanguage();
			// sap.ui.getCore().getConfiguration().setLanguage(lang === "AR"? "EN": "AR");
			var lang = oEvent.getParameter("listItem").getTitle();
			// this.setSelectedLanguage(lang === "Arabic" ? "AR" : "EN");
		},

		setSelectedLanguage: function (slanguage, setSelection) {
			this.getModel("oAppModel").setProperty("/language", slanguage);
			sap.ui.getCore().getConfiguration().setLanguage(slanguage);
			if (setSelection) {
				let oLanguageList = this.byId("idLanguageList");
				let aLangItems = oLanguageList.getItems();
				for (let i = 0; i < aLangItems.length; i++) {
					if (aLangItems[i].getTitle().substr(0,2).toUpperCase() === slanguage) {
						oLanguageList.setSelectedItem(aLangItems[i]);
					}
				}
			}
		},
		
		onPressEdit: function() {
			this.getRouter().navTo("EditProfile");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.Profile
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.Profile
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.Profile
		 */
		//	onExit: function() {
		//
		//	}

	});

});