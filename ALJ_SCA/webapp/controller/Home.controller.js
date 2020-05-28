sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.sap.alj.sca.ALJ_SCA.controller.Home", {
		onInit: function () {
				this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		},
		onBack:function(evt){
				this.oRouter.navTo("Launchpad");
			
		}
	
	});
});