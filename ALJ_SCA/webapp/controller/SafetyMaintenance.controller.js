sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.SafetyMaintenance", {

		onInit: function () {
       

		},
		
   
       
       onNavBack: function(){
       	this.getRouter().navTo("More");  		
       }

	});

});