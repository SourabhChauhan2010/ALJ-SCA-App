sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.MyCars", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.MyCars
		 */
		onInit: function () {

		},

		onAddVehiclePress: function (oEvent) {
			this.getRouter().navTo("AddVehicle");
		},

		onVehicleItemPress: function (oEvent) {
			var oAppModel = this.getModel("oAppModel");
			var aVehicles = oAppModel.getProperty("/vehicles");
			var currObj = oEvent.getSource().getBindingContext("oAppModel").getObject();
			var isSelected = currObj.isSelected;
			for (var i = 0; i < aVehicles.length; i++) {
				aVehicles[i].isSelected = false;
			}
			currObj.isSelected = !isSelected;
			oAppModel.setProperty("/selectedVehicle", isSelected ? false: currObj);
			oAppModel.refresh();
		},
		
		onServiceItemPress: function (oEvent) {
			// var currObj = oEvent.getSource().getBindingContext("oAppModel").getObject();
			// currObj.isSelected = !currObj.isSelected;
			// this.getModel("oAppModel").refresh();
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.MyCars
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.MyCars
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.MyCars
		 */
		//	onExit: function() {
		//
		//	}

	});

});