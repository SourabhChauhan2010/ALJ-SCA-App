sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.Home", {
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if (!sap.ui.Device.support.touch) {
				this.getView().byId("idVboxHomeView").addStyleClass("sapUiMediumMarginBeginEnd");
			} else {
				this.getView().byId("idVboxHomeView").removeStyleClass("sapUiMediumMarginBeginEnd");
			}
			this.getCampaigns();
			this.fnSvaeCampaigns();
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
		},

		onServiceOfferPress: function (oEvent) {
			var currOffer = oEvent.getSource().getBindingContext("oAppModel").getObject();
			this._showToastMessage(this.getResourceText("ServiceOfferPressed"));
		},

		onServiceItemPress: function (oEvent) {
			var currService = oEvent.getSource().getBindingContext("oAppModel").getObject();
			this.getModel("oAppModel").setProperty("/oProductDetails", currService);
			this.oRouter.navTo("ProductDetail");
		},

		onPressMyServices: function () {
			this.oRouter.navTo("MyServices");
		},

		getCampaigns: function () {
			var oAppModelData = this.getModel("oAppModel");
			var sUrl = "/Java_service/alj/campaign/all";
			this.doAjax(sUrl, "GET", null, function (oEvent) {
				if (oEvent) {
					// var aData = oAppModelData.getProperty("/UserInformation");
					// aData[0] = oEvent;
					// oAppModelData.setProperty("/UserInformation", aData);
					oAppModelData.setProperty("/CampaignDetails", oEvent);
				} else {
					// oAppModelData.setProperty("/UserInformation", {});
				}
			}.bind(this), function (oEvent) {});
		},

		fnSvaeCampaigns: function () {
			var oAppModelData = this.getModel("oAppModel");
			var sUrl = "/Java_service/alj/campaign/save";
			var oPayload = [{
				"campaignId": "camp test 2",
				"campaignTitle": "camp test title2",
				"campaignDesc": "camp test desc2",
				"imageUrl": "test url2",
				"startDate": "2020-08-28T04:45:57.246+00:00",
				"endDate": "2020-08-30T04:45:57.246+00:00",
				"active": true
			}];
			this.doAjax(sUrl, "POST", oPayload, function (oEvent) {
				if (oEvent) {
					// var aData = oAppModelData.getProperty("/UserInformation");
					// aData[0] = oEvent;
					// oAppModelData.setProperty("/UserInformation", aData);
					oAppModelData.setProperty("/CampaignDetails", oEvent);
				} else {
					// oAppModelData.setProperty("/UserInformation", {});
				}
			}.bind(this), function (oEvent) {});
		},

	});
});