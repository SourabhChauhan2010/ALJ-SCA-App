sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.BookAService", {
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		},
		onAfterRendering: function () {
			this.servicelist = [];
		},
		//Vehicle selection code
		onVehicleItemPress: function (oEvent) {
			var oAppModel = this.getModel("oAppModel");
			var aVehicles = oAppModel.getProperty("/vehicles");
			var currObj = oEvent.getSource().getBindingContext("oAppModel").getObject();
			for (var i = 0; i < aVehicles.length; i++) {
				aVehicles[i].isSelected = false;
			}
			currObj.isSelected = true; //!isSelected
			oAppModel.setProperty("/selectedVehicle", currObj); //isSelected ? false : currObj
			oAppModel.refresh();

			//setting text in the receipt fragment
			this.getView().getContent()[8].getItems()[0].getItems()[0].getItems()[1].setText(currObj.model + " " + currObj.year);

			//changes to vehicle panel
			this.getView().byId("idPnVehInfo").setExpanded(false);
			this.getView().byId("idPnHeaderVehInfo").setVisible(true);
			this.getView().byId("idPnHeaderVehInfo").setText(currObj.model + " " + currObj.year);
			this.getView().byId("idBtnAddVeh").setVisible(false);

		},
		onExpVehiclePanel: function () {
			this.getView().byId("idPnHeaderVehInfo").setText("");
			this.getView().byId("idBtnAddVeh").setVisible(true);
			this.getView().byId("idPnHeaderVehInfo").setVisible(false);
		},
		onPressAddWVehicle: function () {
			this.getView().getContent()[8].getItems()[0].getItems()[0].getItems()[1].setText(this.getView().getModel("i18n").getResourceBundle()
				.getText("noVehicleSelection"));
			this.getView().byId("idPnVehInfo").setExpanded(false);
			this.getView().byId("idPnHeaderVehInfo").setVisible(true);
			this.getView().byId("idPnHeaderVehInfo").setText(this.getView().getModel("i18n").getResourceBundle().getText("noVehicleSelection"));
			this.getView().byId("idBtnAddVeh").setVisible(false);
		},
		onAddVehiclePress: function () {

			this.getRouter().navTo("AddVehicle");

		},

		//Service Type Selection
		onServiceItemPress: function (oEvent) {
			var currObj = oEvent.getSource().getBindingContext("oAppModel").getObject();
			//setting text in the receipt fragment

			this.servicelist.push(currObj.serviceType);
			this.getView().getContent()[8].getItems()[0].getItems()[1].getItems()[1].setText(this.servicelist);

		},
		onBeforeRendering: function () {
			var oAppModelData = this.getModel("oAppModel").getData();
		},
		createAppointment: function (evt) {
			//do mandatory checks
			this.oRouter.navTo("ServiceStatus");

		}

	});
});