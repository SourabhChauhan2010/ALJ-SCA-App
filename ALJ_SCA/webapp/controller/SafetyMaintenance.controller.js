sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.SafetyMaintenance", {

		onInit: function () {
         sap.ui.core.UIComponent.getRouterFor(this).attachRoutePatternMatched(this._onRouteMatched, this);

		},
		
       _onRouteMatched: function(){
       	var oHtml1 = this.getView().byId("idSafetyVideo1");
       	var oHtml2 = this.getView().byId("idSafetyVideo2");
       	oHtml1.setContent("<div id=\"ytv\"><iframe type=\"text/html\" width=300 height=150 src=\"https://www.youtube.com/embed/3Vw9jKz5SrA\"frameborder=\"0\"></iframe></div>");
       	oHtml2.setContent("<div id=\"ytv\"><iframe type=\"text/html\" width=300 height=150 src=\"https://www.youtube.com/embed/3Vw9jKz5SrA\"frameborder=\"0\"></iframe></div>");
       },
       
       onNavBack: function(){
       	this.getRouter().navTo("More");  		
       }

	});

});