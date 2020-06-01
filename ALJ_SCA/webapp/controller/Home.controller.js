sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.Home", {
		onInit: function () {
				this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		},
		onBack:function(evt){
				this.oRouter.navTo("Launchpad");
			
		}
	
	});
});