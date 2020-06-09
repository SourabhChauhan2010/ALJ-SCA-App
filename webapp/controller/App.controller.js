sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.App", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.App
		 */
		onInit: function () {
			this.fnInitApp();
			this.setSVGContents();
			this.getRouter().attachRoutePatternMatched(function (oEvent) {
				var oAppModelData = this.oAppModel.getData();
				oAppModelData.currentScreen = oEvent.getParameter("name");
				oAppModelData.currentScreenTitle = this.getResourceText(oEvent.getParameter("name"));
				this.oAppModel.refresh();
				if (oEvent.getParameter("name") === "App") {

				}
			}.bind(this));
		},

		setSVGContents: function () {
			var aMainScreens = this.oAppModel.getData().mainScreens;
			for (var i = 0; i < aMainScreens.length; i++) {
				var file = aMainScreens[i].svg,
					result = "";
				if (file) {
					var rawFile = new XMLHttpRequest();
					rawFile.open("GET", file, false);
					rawFile.onreadystatechange = function () {
						if (rawFile.readyState === 4) {
							if (rawFile.status === 200 || rawFile.status === 0) {
								var allText = rawFile.responseText;
								result = allText;
							}
						}
					};
					rawFile.send(null);
				}
				aMainScreens[i].svgContent = result;
			}
			this.oAppModel.refresh();
		},

		onChangeScreen: function (oEvent) {
			// var selectedKey = oEvent.getSource().getSelectedKey();
			var selectedKey = oEvent.getSource().getBindingContext("oAppModel").getObject().key;
			this.getRouter().navTo(selectedKey);
		},
		
		onOpenProfile: function() {
			this.getRouter().navTo("Profile");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.App
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.App
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.App
		 */
		//	onExit: function() {
		//
		//	}

	});

});