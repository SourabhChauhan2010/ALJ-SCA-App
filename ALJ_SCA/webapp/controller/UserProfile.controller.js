sap.ui.define([
"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.UserProfile", {

		onInit: function () {
			this.getRouter().attachRoutePatternMatched(function (oEvent) {
				if (oEvent.getParameter("name") === "Profile") {
					this.setSelectedLanguage(this.getModel("oAppModel").getProperty("/language"), true);
				}
			}.bind(this));
		},
        onNavBack: function(){
       	this.getRouter().navTo("More");  	
        },
		onChangeLanguage: function (oEvent) {
			// var lang = sap.ui.getCore().getConfiguration().getLanguage();
			// sap.ui.getCore().getConfiguration().setLanguage(lang === "AR"? "EN": "AR");
			var lang = oEvent.getParameter("listItem").getTitle();
			// this.setSelectedLanguage(lang === "Arabic" ? "AR" : "EN");
		},

		setSelectedLanguage: function (slanguage, setSelection) {/*
			this.getModel("oAppModel").setProperty("/language", slanguage);
			sap.ui.getCore().getConfiguration().setLanguage(slanguage);
			if (setSelection) {
				let oLanguageList = this.byId("idLanguageList");
				let aLangItems = oLanguageList.getItems();
				for (let i = 0; i < aLangItems.length; i++) {
					if (aLangItems[i].getTitle().substr(0,2).toUpperCase() === slanguage) {
						oLanguageList.setSelectedItem(aLangItems[i]);
					}
				}
			}
		*/},
		
		editProfile: function() {
			var oAppModel = this.getModel("oAppModel");
			oAppModel.setProperty("/oldProfileInfo", JSON.parse(JSON.stringify(oAppModel.getProperty("/UserInformation"))));
			this.getRouter().navTo("EditProfile");
		}

	});

});