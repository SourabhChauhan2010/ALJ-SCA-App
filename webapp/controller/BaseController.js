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

		/**
		 * Event handler  for navigating back.
		 * It checks if there is a history entry. If yes, history.go(-1) will happen.
		 * If not, it will replace the current entry of the browser history with the master route.
		 * @public
		 */
		onNavBack: function () {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				// The history contains a previous entry
				history.go(-1);
			} else {
				// Otherwise we go backwards with a forward history
				var bReplace = true;
				this.getRouter().navTo("Home", {}, bReplace);
			}
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
			oAppModel.loadData("model/data.json", null, false);
			this.oAppModel = oAppModel;
		},
		
		/** 
		 * 
		 * @constructor 
		 * @param sMsg
		 */
		_showToastMessage: function (sMsg) {
			MessageToast.show(sMsg, {
				duration: 9000
			});
		},

		/**
		 * Event handler  for doing an HTTP request (Non Odata).
		 * @public 
		 * @params 
		 * sUrl 	- api URL - {string}
		 * sMethod  - the method -GET or POST or PUT or DELETE (PUT,DELETE -be careful about browser compatibility) -{string}
		 * oData - null if method is GET or the Request Body -{object}
		 * rSuccess - Success callback {function}
		 * rErrror - Error callback {function}
		 * @returns {object} the response data receieved through callback
		 */
		doAjax: function (sUrl, sMethod, oData, rSuccess, rError) {
			if (oData) {
				oData = JSON.stringify(oData);
			}
			$.ajax({
				url: sUrl,
				data: oData,
				async: true,
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				error: function (err) {
					rError(err);
				},
				success: function (data) {
					rSuccess(data);
				},
				type: sMethod
			});
		},

		onCloseScreen: function (oEvent) {
			var oAppModelData = this.oAppModel.getData();
			if (oAppModelData.currentScreenTitle === this.getResourceText("Confirmation")) {
				this.getRouter().navTo("Home");
			} else {
				this.onNavBack();
			}
		},
		
		getUserInformation: function () {
			var oAppModelData = this.getModel("oAppModel");
			var sUrl = "/SBA_book_a_service/alj/profile/userId";
			var oPayload = {
				"client": "001",
				"bpNumber": "1000052113",
				"idNumber": "2201739097"
			};
			this.doAjax(sUrl, "POST", oPayload, function (oEvent) {
				if (oEvent) {
					var aData = oAppModelData.getProperty("/UserInformation");
					aData[0] = oEvent;
					oAppModelData.setProperty("/UserInformation", aData);
				} else {
					oAppModelData.setProperty("/UserInformation", {});
				}
			}.bind(this), function (oEvent) {});
		},

		getVehicles: function (ownerId) {
			var oAppModel = this.getModel("oAppModel");
			var sUrl = "/SBA_book_a_service/alj/vehicles";
			var oPayload = {
				"ownerId": "4332"//ownerId
			};
			this.doAjax(sUrl, "POST", oPayload, function (aData) {
				//Success block
				// oAppModel.setProperty("/vehicles", aData);
			}.bind(this), function (oData) {

			});
		},
		
		onPressAddNID: function () {
			var oAppModelData = this.getModel("oAppModel").getData();
			var sNID = oAppModelData.enteredNID;
			if (!sNID) {
				this._showToastMessage("Enter valid NID");
				return;
			}
			var sUrl = "/SBA_book_a_service/alj/validate/nid";
			var oPayload = {
				"natio": sNID
			};
			this.doAjax(sUrl, "POST", oPayload, function (oData) {
				//Success block
				if (oData) {
					this._showToastMessage("National ID verified successfully");
					this.getRouter().navTo("Home");
				} else {
					this._showToastMessage("Enter valid NID");
				}
			}.bind(this), function (oData) {});
		},
		
		onPressAddVehicle: function () {
			var oAppModelData = this.getModel("oAppModel").getData();
			var sVIN = oAppModelData.enteredVIN;
			if (!sVIN) {
				this._showToastMessage("Enter valid VIN");
				return;
			}
			var sUrl = "/SBA_book_a_service/alj/validate/vin";
			var oPayload = {
				"vin": sVIN
			};
			this.doAjax(sUrl, "POST", oPayload, function (oData) {
				//Success block
				if (oData) {
					this._showToastMessage("VIN verified successfully");
				} else {
					this._showToastMessage("Enter valid VIN");
				}
			}.bind(this), function (oData) {});
		},
		
		onConfirmEditProfile: function (oEvent) {
			var oAppModel = this.getModel("oAppModel");
			var sUrl = "/SBA_book_a_service/alj/validate/mobile";
			var oPayload = {
				"mobile2": oAppModel.getProperty("/UserInformation/0/mobile2")
			};
			this.doAjax(sUrl, "POST", oPayload, function (oData) {
				if (oData) {
					this._showToastMessage("Mobile Number verified successfully");
					this.getRouter().navTo("Profile");
				} else {
					this._showToastMessage("Enter valid Mobile Number");
				}
				this.getUserInformation();
			}.bind(this), function (oData) {

			});
		},
		
		getVehicleHistory: function (currObj) {
			var oAppModel = this.getModel("oAppModel");
			currObj.isSelected = true;
			oAppModel.setProperty("/selectedVehicle", currObj);
			oAppModel.refresh();
			var sUrl = "/SBA_book_a_service/alj/vehicle/history";
			var oPayload = {
				"vin": currObj.vin,
				"customerId": currObj.customerId
			};
			this.doAjax(sUrl, "POST", oPayload, function (oData) {
				
			}.bind(this), function (oData) {});
		},

	});
});