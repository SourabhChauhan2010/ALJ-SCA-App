sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController",
	"sap/ui/model/Filter"
], function (BaseController, Filter) {
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
			this.getServiceType();
		},

		onBeforeRendering: function () {
			var oAppModelData = this.getModel("oAppModel").getData();
		},

		createAppointment: function (evt) {
			//do mandatory checks

			var sUrl = "/App_booking_CreationSet";
			var oERPDataModel = this.getModel("oERPDataModel");
			var oPayload = {
				"Vhvin": "RKLBB9HE9K5228306",
				"Kunnr": "1000634340",
				"Werks": "7030",
				"Vkorg": "1700",
				"Vtweg": "03",
				"AppTs": "002",
				"AppDate": "20201001",
				"Labval": " ",
				"Descr1": " ",
				"Aufart": "ZS01",
				"AngeUser": " ",
				"Bstnk": " ",
				"NoVehicle": " ",
				"Spart": "",
				"ZappMcode": " ",
				"ZappPcode": " ",
				"ZappMyear": " ",
				"ZappLicpl": " ",
				"ZzpickUp": "X",
				"ZzpickDate": "20201001",
				"ZzpickTime": "120000",
				"Zzdelivery": "X",
				"ZzonlnPay": "X",
				"Zzcampaign": " ",
				"Advisor": " ",
				"AppType": "ZAP",
				"ZzCarwash": "X",
				"Zodo": "10",
				"App_booking_Creation_jobsSet": [{
					"Kunnr": "1000634340",
					"Labval": "420091",
					"Descr1": "PMS005A054_Sample",
					"PackageId": "PMS005A054",
					"ZzPmCode": " "
				}],
				"App_booking_Creation_ResultSet": [{
					"MessageType": " ",
					"MessageValue": " ",
					"MessageValue1": " ",
					"MessageValue2": " "
				}]
			};
			var oAppModel = this.getModel("oAppModel");
			oERPDataModel.create(sUrl, oPayload, {
				success: function (oData) {
					// oAppModel.setProperty("/serviceTypeSet", oData.results);
				},
				error: function (oData) {}
			});

			this.oRouter.navTo("ServiceStatus");

		},

		getServiceType: function () {
			var sUrl = "/Plant_and_Service_typeSet";
			var oERPDataModel = this.getModel("oERPDataModel");
			var oAppModel = this.getModel("oAppModel");
			var oFilter = [];
			oFilter.push(new Filter("SrvType", "EQ", 'MC'));
			oFilter.push(new Filter("Werks", "EQ", '7030'));
			oERPDataModel.read(sUrl, {
				filters: oFilter,
				success: function (oData) {
					oAppModel.setProperty("/serviceTypeSet", oData.results);
				},
				error: function (oData) {}
			});
		}

	});
});