sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (BaseController, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.Products", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.Products
		 */
		onInit: function () {
			var oAppModel = this.getOwnerComponent().getModel("oAppModel");
			this.getView().setModel(oAppModel, "oAppModel");
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oAppModel.setProperty("/ProductMainView", true);

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
		},
		onServiceItemPress: function (oEvent) {
			var oAppModel = this.getModel("oAppModel");
			var currObj = oEvent.getSource().getBindingContext("oAppModel").getObject();
			oAppModel.setProperty("/ProductMainView", false);
			oAppModel.setProperty("/SelectedProd", currObj);

			// currObj.isSelected = !currObj.isSelected;
			this.getModel("oAppModel").refresh();
		},

		onProdCategoryPress: function (oEvent) {
			var oAppModel = this.getModel("oAppModel");
			var currObj = oEvent.getSource().getBindingContext("oAppModel").getObject();
			var aProdCategories = oAppModel.getProperty("/productCategory");
			for (var counter = 0; counter < aProdCategories.length; counter++) {
				aProdCategories[counter].isSelected = false;
			}

			currObj.isSelected = !currObj.isSelected;
			this.getModel("oAppModel").refresh();
		},

		onBack: function () {
			var oAppModel = this.getModel("oAppModel");
			oAppModel.setProperty("/ProductMainView", true);
			this.getModel("oAppModel").refresh();
		},

		onProdSearch: function (oEvent) {
			var sSearchItem = oEvent.getSource().getValue();
			var aFilter = [];
			var sQuery = sSearchItem;
			var oList = this.getView().byId("productList");
			var oBinding = oList.getBinding("content");

			if (sQuery) {
				aFilter = [];
				aFilter.push(new Filter("serviceType", FilterOperator.Contains, sQuery));
				// aFilter.push(new Filter("firstName", FilterOperator.Contains, sQuery));
				// sQuery = this.getModel("oTripsDataModel").setProperty("/city", "");
				oBinding.filter(aFilter);
			} else {
				aFilter = [];
				oBinding.filter(aFilter);
			}
		},

		onContinueBooking: function () {
			this.getRouter().navTo("BookAService");
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