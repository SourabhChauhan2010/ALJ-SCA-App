sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.EditProfile", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.EditProfile
		 */
		onInit: function () {
			this.getRouter().attachRoutePatternMatched(function (oEvent) {
				if (oEvent.getParameter("name") === "EditProfile") {
					this.getModel("oAppModel").setProperty("/editProfileInvalidFields", {});
				}
			}.bind(this));
		},

		validateEmail: function (evt) {
			var oAppModel = this.getModel("oAppModel");
			var value = oAppModel.getProperty("/UserInformation/email");
			var rexMail = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/;
			if (!value.match(rexMail)) {
				// sap.m.MessageToast.show("is not a valid e-mail address");
				oAppModel.setProperty("/editProfileInvalidFields/email", true);
				// value.setValue("");
			} else {
				oAppModel.setProperty("/editProfileInvalidFields/email", false);
			}
		},

		validateMobile: function (oEvent) {
			var oAppModel = this.getModel("oAppModel");
			var mobile = oAppModel.getProperty("/UserInformation/mobile2");
			if (!mobile) {
				return;
			}
			var sUrl = "/SBA_book_a_service/alj/validate/mobile";
			var oPayload = {
				"mobile2": mobile
			};
			this.doAjax(sUrl, "POST", oPayload, function (oData) {
				if (oData) {
					// this._showToastMessage("Mobile Number verified successfully");
					oAppModel.setProperty("/editProfileInvalidFields/mobile", false);
				} else {
					// this._showToastMessage("Enter valid Mobile Number");
					oAppModel.setProperty("/editProfileInvalidFields/mobile", true);
				}
				this.getUserInformation();
			}.bind(this), function (oData) {

			}, true);
		},

		validateNID: function () {
			var oAppModel = this.getModel("oAppModel");
			var sNID = oAppModel.getProperty("/UserInformation/NID");
			if (!sNID) {
				// this._showToastMessage("Enter valid NID");
				return;
			}
			var sUrl = "/SBA_book_a_service/alj/validate/nid";
			var oPayload = {
				"natio": sNID
			};
			this.doAjax(sUrl, "POST", oPayload, function (oData) {
				//Success block
				if (oData) {
					// this._showToastMessage("National ID verified successfully");
					oAppModel.setProperty("/editProfileInvalidFields/NID", false);
				} else {
					// this._showToastMessage("Enter valid NID");
					oAppModel.setProperty("/editProfileInvalidFields/NID", true);
				}
			}.bind(this), function (oData) {}, true);
		},

		onSavePress: function () {
			var oAppModel = this.getModel("oAppModel");
			var editProfileInvalidFields = oAppModel.getProperty("/editProfileInvalidFields");
			var UserInformation = oAppModel.getProperty("/UserInformation");
			var errorMsg = "",
				emptyFields = [];
			this.validateEmail();
			this.validateMobile();
			this.validateNID();
			if (JSON.stringify(oAppModel.getData().UserInformation) !== JSON.stringify(oAppModel.getData().oldProfileInfo)) {
				if (!UserInformation.nameFirst) {
					emptyFields.push("First Name");
				}
				if (!UserInformation.nameLast) {
					emptyFields.push("Last Name");
				}
				if (!UserInformation.NID) {
					emptyFields.push("National ID");
				} else if (editProfileInvalidFields.NID) {
					errorMsg += "\nNational ID could not be found in the database.";
				}
				if (!UserInformation.email) {
					emptyFields.push("Email ID");
				} else if (editProfileInvalidFields.email) {
					errorMsg += "\nEmail ID is not valid.";
				}
				if (!UserInformation.mobile2) {
					emptyFields.push("Mobile Number");
				} else if (editProfileInvalidFields.mobile) {
					errorMsg += "\nMobile Number could not be found in the database.";
				}
				// if (UserInformation.EnterPassword != UserInformation.ReenterPassword) {
				// 	errorMsg += "\nPasswords should match";
				// }
			}
			if (!errorMsg && emptyFields.length === 0) {
				oAppModel.setProperty("/editProfileInvalidFields", {});
				oAppModel.setProperty("/oldProfileInfo", JSON.parse(JSON.stringify(oAppModel.getProperty("/UserInformation"))));
				this._createConfirmationMessage(this.getResourceText("SuccessEditProfileSave"), "OK", "Close", true, function (oEvent) {
					this.getRouter().navTo("Profile");
				}.bind(this));
			} else {
				if (emptyFields.length) {
					errorMsg = "The following fields cannot be empty.\n" + emptyFields.join(", ") + errorMsg;
				}
				this._createConfirmationMessage(errorMsg, "", "OK", false, function (oEvent) {
					// this.getRouter().navTo("Profile");
				}.bind(this));
			}

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.EditProfile
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.EditProfile
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.EditProfile
		 */
		//	onExit: function() {
		//
		//	}

	});

});