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
			this.getUserInformation();
			this.getVehicles();
			this.getRouter().attachRoutePatternMatched(function (oEvent) {
				this.setScreenDetails(oEvent.getParameter("name"));
				if (oEvent.getParameter("name") === "App") {

				}
			}.bind(this));
		},

		setScreenDetails: function (name) {
			var oAppModelData = this.oAppModel.getData();
			// if (oAppModelData.currentScreen && (oAppModelData.currentScreen === "BookAService" && name === "ServiceStatus")) {
			// 	oAppModelData.currentScreenTitle = this.getResourceText("Confirmation");
			// } else {
			oAppModelData.currentScreenTitle = this.getResourceText(name);
			// }
			oAppModelData.currentScreen = name;
			this.oAppModel.refresh();
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
			var selectedKey;
			// if (this.getModel("device").getProperty("/system/desktop")) {
			// 	selectedKey = oEvent.getSource().getSelectedKey();
			// } else {
			selectedKey = oEvent.getSource().getBindingContext("oAppModel").getObject().key;
			// }
			this.getRouter().navTo(selectedKey);
		},

		onOpenProfile: function () {
			this.getRouter().navTo("Profile");
		},

		openNotification: function () {
			this.getRouter().navTo("Notification");
		},

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