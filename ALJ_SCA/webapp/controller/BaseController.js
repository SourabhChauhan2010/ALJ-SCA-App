sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/format/DateFormat",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/m/BusyDialog",
	"sap/ui/core/routing/History",
	"sap/ui/model/Filter",
	"sap/m/MessageToast"
], function (Controller, DateFormat, JSONModel, MessageBox, BusyDialog, History, Filter, MessageToast) {
	"use strict";

	return Controller.extend("com.sap.alj.sca.ALJ_SCA.controller.BaseController", {

		/**
		 * Convenience method for accessing the router in every controller of the application.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */

		/** 
		 * To get the router component
		 * @returns
		 */
		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},

		/** 
		 * To get the text from i18n properties
		 * @param text 
		 * @returns
		 */
		getResourceText: function (text) {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(text);
		},
		
		getModel: function (oModel) {
			return this.getView().getModel(oModel);
		},

		//Function to initalize the application 
		fnInitApp: function () {
			this.busy = new BusyDialog();
			this.MessageBox = MessageBox;
			this.DateFormat = DateFormat.getDateTimeInstance({
				pattern: "yyyy-MM-dd HH:mm:ss"
			});
			this.oHeader = {
				"Accept": "application/json",
				"Content-Type": "application/json"
			};

			//General model
			var oAppModel = this.getOwnerComponent().getModel("oAppModel");
			oAppModel.loadData("model/data.json");
			this.oAppModel = oAppModel;
		},
		
		onSelectableItemPress: function(oEvent) {
			var currObj = oEvent.getSource().getBindingContext("oAppModel").getObject();
			currObj.isSelected = !currObj.isSelected;
			this.getModel("oAppModel").refresh();
		}
		

	});
});