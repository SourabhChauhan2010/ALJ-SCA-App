sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.Home", {
		onInit: function () {
				this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		},
		onAfterRendering:function(){
		/*	this.byId("idVBServiceListItems").attachBrowserEvent("click", function(oEvent) {
				this.NavtoServices();
			});*/
		},
		onBack:function(evt){
				this.oRouter.navTo("Launchpad");
			
		},
		NavtoServices:function(evt){
		var index=evt.getSource().getId().slice(42,43);
		if(index==0){
			this.oRouter.navTo("BookAService");	
		}
		}
	
	});
});