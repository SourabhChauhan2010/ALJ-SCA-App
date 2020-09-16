sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.sap.alj.sca.ALJ_SCA.controller.Share", {

		onInit: function () {

		},

	    onNavBack: function(){
       	this.getRouter().navTo("More");  	
        }
        
       /* onSharePress: function(){
       var Intent = new Intent(android.content.Intent.Action_SEND);
         
        }*/
	});

});