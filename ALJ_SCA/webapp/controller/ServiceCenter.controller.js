sap.ui.define([
"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";
     	var oModel;
	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.ServiceCenter", {

	
		onInit : function () 
		{
	      
		 },
		 
		 onSelectionChange : function (oEvt) 
		 {
		 	 oModel =  this.getModel("oAppModel");
			var oList = oEvt.getSource();
			var aItems = oList.getSelectedItem();
			for(var j=0;j<8; j++){// loop over first 3 locations in Data.json
				var locJson = oModel.getProperty("/Spots/"+j+"/tooltip"); // location from Data.json
				var flagScaled = false;
			// loop over all selected locations
				var locList = oList.getSelectedKey();
					if(locList == locJson){
						if(oModel.getProperty("/Spots/"+j+"/scale") == "1;1;1"){
							oModel.setProperty("/Spots/"+j+"/scale","1.5;1.5;1.5");
							flagScaled=true;
						}
						else if(oModel.getProperty("/Spots/"+j+"/scale") == "1.5;1.5;1.5"){
							flagScaled = false;
						}
					}
					continue;
				
				if(!flagScaled){
					if(oModel.getProperty("/Spots/"+j+"/scale") == "1.5;1.5;1.5"){
						oModel.setProperty("/Spots/"+j+"/scale","1;1;1");
					}
				}
			}
		},

         
         onCityChange: function (oEvt) 
		 {
		 	 oModel =  this.getModel("oAppModel");
			var oList = oEvt.getSource();
		//	var aItems = oList.getSelectedItem();
			for(var j=0;j<8; j++){// loop over first 3 locations in Data.json
				var locJson = oModel.getProperty("/Spots/"+j+"/tooltip"); // location from Data.json
				var flagScaled = false;
			// loop over all selected locations
				var locList = oList.getSelectedKey();
					if(locList == locJson){
						if(oModel.getProperty("/Spots/"+j+"/scale") == "1;1;1"){
							oModel.setProperty("/Spots/"+j+"/scale","1.5;1.5;1.5");
							flagScaled=true;
						}
						else if(oModel.getProperty("/Spots/"+j+"/scale") == "1.5;1.5;1.5"){
							flagScaled=true;
						}
					}
					continue;
				
				if(!flagScaled){
					if(oModel.getProperty("/Spots/"+j+"/scale") == "1.5;1.5;1.5"){
						oModel.setProperty("/Spots/"+j+"/scale","1;1;1");
					}
				}
			}
		},

         
         
		  onNavBack: function(){
       	this.getRouter().navTo("More");  	
        }
       
	
	});

});