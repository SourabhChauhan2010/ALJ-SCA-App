sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.BookAService", {
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			
		},
		onBeforeRendering:function(){
			var oAppModelData = this.getModel("oAppModel").getData();	
		},
		createAppointment:function(evt){
			//do mandatory checks
			this.oRouter.navTo("ServiceStatus");
			
		}

	});
});