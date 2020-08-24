sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.Home", {
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);

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
		
		onPressMyServices: function() {
			this.oRouter.navTo("MyServices");
		}

	});
});