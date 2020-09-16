sap.ui.define([
"com/sap/alj/sca/ALJ_SCA/controller/BaseController",
"sap/ui/model/json/JSONModel"
], function (BaseController,JSONModel) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.FAQ", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.FAQ
		 */
		onInit: function () {
        var x =0;	
		},
        onNavBack: function(){
       	this.getRouter().navTo("More");  	
        },
        onFaqBtnOpenPress: function(oEvent){
       	var oAppModel = oEvent.getSource().getParent()._getBindingContext("oAppModel");
       	oAppModel.getObject().expand = false;
       oAppModel.getObject().expandedTxtVisible = true;
       oAppModel.getObject().collapse = true;
       this.getView().getModel("oAppModel").refresh(true);
     
       
        },
        onFaqBtnClsPress:  function(oEvent){
       var oAppModel = oEvent.getSource().getParent()._getBindingContext("oAppModel");
       	oAppModel.getObject().expand = true;
       oAppModel.getObject().expandedTxtVisible = false;
       oAppModel.getObject().collapse = false;
       this.getView().getModel("oAppModel").refresh(true);
        }
	

	});

});