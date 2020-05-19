sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.sap.alj.sca.ALJ_SCA.controller.Launchpad", {
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		},
		pressTile:function(evt){
		//	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		
			if(evt.getSource().getId().includes("SCA_tile1")){
				//navigate to home page
					this.oRouter.navTo("Home");
			}
		}
	});
});