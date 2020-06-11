sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.Products", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.Products
		 */
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);

		},
		onBookService: function () {
			this.oRouter.navTo("BookAService");
		},
		onAddVehiclePress: function (oEvent) {
			this.getRouter().navTo("AddVehicle");
		},
		onProdCatPress: function (oEvent) {

			var sSelectedCatelog = oEvent.getSource().getAggregation("content")[0].getAggregation("items")[1].getProperty("text");
			this.getModel("oAppModel").setProperty("/sSelectedCatelog", sSelectedCatelog);

		},
		onProductDetail: function (oEvent) {
			var oAppModel = this.getModel("oAppModel");
			var sSelectedProdService = oEvent.getSource().getAggregation("content")[0].getAggregation("items")[0].getProperty("text");
			var aServices = oAppModel.getProperty("/aRecommendationsHome");
			var oProductDetails = {};
			for (var i = 0; i < aServices.length; i++) {
				if (aServices[i].serviceType === sSelectedProdService) {
					oProductDetails = aServices[i];
					break;
				}
			}
			oAppModel.setProperty("/oProductDetails", oProductDetails);

			this.getRouter().navTo("ProductDetail");
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.Products
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.Products
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.Products
		 */
		//	onExit: function() {
		//
		//	}

	});

});