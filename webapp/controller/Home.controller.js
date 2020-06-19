sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.Home", {
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);

		},
		onAfterRendering: function () {
			var jsonModel = new sap.ui.model.json.JSONModel();
			var oAppModelData = this.getModel("oAppModel");
			/*var oHeader = {
				"Content-Type": "application/json;charset=utf-8"
			};
			var sUrl = "/SBA_book_a_service/alj/profile/userId/001/1000052113/2201739097";
			jsonModel.loadData(sUrl, null, true, "GET", false, false, oHeader);

			jsonModel.attachRequestCompleted(function (oData) {
				var userdata = oData.getSource().getData();
				var aData = oAppModelData.getProperty("/UserInformation");
				aData[0] = userdata;
				oAppModelData.setProperty("/UserInformation", aData);
				//	this._showToastMessage("Success");
			});

			jsonModel.attachRequestFailed(function (oResponse) {
				//	this._showToastMessage("Error");
			});*/

			var sUrl = "/SBA_book_a_service/alj/profile/userId/001/1000052113/2201739097";
			this.doAjax(sUrl, "GET", null, function (oEvent) {
				//Success block
				if (oEvent) {

					var aData = oAppModelData.getProperty("/UserInformation");
					aData[0] = oEvent;
					oAppModelData.setProperty("/UserInformation", aData);
				} else {
					oAppModelData.setProperty("/UserInformation", {});
				}
			}.bind(this), function (oEvent) {});

		},
		onBack: function (evt) {
			this.oRouter.navTo("Launchpad");

		},
		NavtoServices: function (evt) {
			var index = evt.getSource().getId().slice(41);
			if (index === "0") {
				this.oRouter.navTo("BookAService");
			} else if (index === "1") {
				this.oRouter.navTo("MyServices");
			}
		},

		onBookService: function () {
			this.oRouter.navTo("BookAService");
		},

		onClickServiceStatus: function () {
			this.oRouter.navTo("ServiceStatus");
		}

	});
});