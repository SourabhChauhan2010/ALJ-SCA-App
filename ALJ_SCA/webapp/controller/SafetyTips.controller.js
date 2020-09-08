sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.SafetyTips", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.SafetyTips
		 */
		onInit: function () {
			
			
			var oAppModelData = this.getModel("oAppModel");
		//	var sUrl = "https://alj-services-new.cfapps.eu10.hana.ondemand.com/alj/campaign/all";
		var sUrl="/Java_Service/alj/misc/tips";
		var data=[{
				"tipsId":1234,
				"title":"test title",
				"desc":"desc",
				"language":"AR",
				"isActive":true
		}];
			this.doAjax(sUrl, "POST", data, function (oEvent) {
				if (oEvent) {
					// var aData = oAppModelData.getProperty("/UserInformation");
					// aData[0] = oEvent;
					// oAppModelData.setProperty("/UserInformation", aData);
				//	oAppModelData.setProperty("/CampaignDetails", oEvent);
				} else {
					// oAppModelData.setProperty("/UserInformation", {});
				}
			}.bind(this), function (oEvent) {});
		
		

		},
		getSafetyTips:function(){},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.SafetyTips
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.SafetyTips
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.SafetyTips
		 */
		//	onExit: function() {
		//
		//	}

	});

});