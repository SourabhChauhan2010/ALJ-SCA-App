sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.Home", {
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            if (!sap.ui.Device.support.touch) {
            this.getView().byId("idVboxHomeView").addStyleClass("sapUiMediumMarginBeginEnd");
            this.getView().byId("idRecommedCusList").addStyleClass("aljReccListStyleDesktop");
            this.getView().byId("idHomeWcomeTxt").addStyleClass("aljWelcomeTextCSSDesktop");
            this.getView().byId("idMohMdTxt").addStyleClass("aljHomeNameTextCSSDesktop");
            this.getView().byId("idLandCruiseTxt").addStyleClass("aljHomeCarModelTextCSSdesktop");
            this.getView().byId("idKmTxt").addStyleClass("aljHomeTextCSSDesktop");
            
            this.getView().byId("idSwtchCar").addStyleClass("underLineClsDTop");
            this.getView().byId("idBtnBookAServ").addStyleClass("aljServiceBtnStyleDTop");
            this.getView().byId("idBtnMyServ").addStyleClass("aljServiceBtnStyleDTop");
            this.getView().byId("idRecomdForTxt").addStyleClass("aljModelTextStyleDTop","sapUiTinyMarginTop");
           
            
            }
            else{
            this.getView().byId("idVboxHomeView").removeStyleClass("sapUiMediumMarginBeginEnd");
            this.getView().byId("idRecommedCusList").addStyleClass("aljReccListStyle");
            this.getView().byId("idHomeWcomeTxt").addStyleClass("aljWelcomeTextCSS");
            this.getView().byId("idMohMdTxt").addStyleClass("aljHomeNameTextCSS");
            this.getView().byId("idLandCruiseTxt").addStyleClass("aljHomeCarModelTextCSS");
            this.getView().byId("idKmTxt").addStyleClass("aljHomeTextCSS");
            
            this.getView().byId("idSwtchCar").addStyleClass("underLineCls");
            this.getView().byId("idBtnBookAServ").addStyleClass("aljServiceBtnStyle");
            this.getView().byId("idBtnMyServ").addStyleClass("aljServiceBtnStyleDTop");
            this.getView().byId("idRecomdForTxt").addStyleClass("aljModelTextStyle","sapUiTinyMarginTop");
            
            
            }
            
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