sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.MyCars", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.MyCars
		 */
		onInit: function () {
			this.getRouter().attachRoutePatternMatched(function (oEvent) {
				if (oEvent.getParameter("name") === "MyCars") {
					var oAppModel = this.getModel("oAppModel");
					var oAppModelData = oAppModel.getData();
					if (oAppModelData.vehicles.length > 0) {
						this.getVehicleHistory(oAppModelData.vehicles[0]);
					}
					$.ajax({
						type: "GET",
						contentType: "application/json; charset=utf-8",
						url: "/SCA_JAVA/alj/vehicle/owner/INC01314",
						dataType: "json",
						async: true,
						data: null,
						success: function (data) {
							oAppModel.setProperty("/VehicleDetails", data);
							oAppModel.refresh();
						}
					});
					this.doAjax("/SCA_JAVA/alj/vehicle/model/productId/0000017963", "GET", null, function (data) {
						if (data) {
							//
						} else {
							//
						}
					}, function (data) {});
					this.doAjax("/SCA_JAVA/alj/vehicle/model/brand/Z001", "GET", null, function (data) {
						if (data) {
							//
						} else {
							//
						}
					}, function (data) {});
					this.doAjax("/SCA_JAVA/alj/vehicle/model/type/0002", "GET", null, function (data) {
						if (data) {
							//
						} else {
							//
						}
					}, function (data) {});
					this.doAjax("/SCA_JAVA/alj/vehicle/model/modelcode/null", "GET", null, function (data) {
						if (data) {
							//
						} else {
							//
						}
					}, function (data) {});
					this.doAjax("/SCA_JAVA/alj/vehicle/model/fuel_type/01", "GET", null, function (data) {
						if (data) {
							//
						} else {
							//
						}
					}, function (data) {});

				}
			}.bind(this));

		},
		onSelectableItemPress: function (oEvent) {
			var oCarDetails = oEvent.getSource().getBindingContext("oAppModel").getObject();
			var oAppModelData = this.getModel("oAppModel");
			var sUrl = "/SCA_JAVA/alj/vehicle/vin/" + oCarDetails.vin;
			this.doAjax(sUrl, "GET", null, function (oData) {
				if (oEvent) {
					// var aData = oAppModelData.getProperty("/UserInformation");
					// aData[0] = oEvent;
					// oAppModelData.setProperty("/UserInformation", aData);
					oAppModelData.setProperty("/CampaignDetails", oEvent);
				} else {
					// oAppModelData.setProperty("/UserInformation", {});
				}
			}, function (oData) {});
		},
		onMakeDefaultCar: function (oEvent) {
			if (oEvent.getSource().getText() !== "Make") {
				return;
			}
			var sIndex = oEvent.getSource().getBindingContext("oAppModel").getPath().split("/").pop();
			var vehicles = this.getModel("oAppModel").getData().vehicles;
			for (var i = 0; i < vehicles.length; i++) {
				if (i == sIndex) {
					vehicles[i].isDefault = true;
				} else {
					vehicles[i].isDefault = false;
				}
			}
			this.getModel("oAppModel").refresh();
		},

		onAddVehiclePress: function (oEvent) {
			this.getRouter().navTo("AddVehicle");
		},

		onVehicleItemPress: function (oEvent) {
			var oAppModel = this.getModel("oAppModel");
			var aVehicles = oAppModel.getProperty("/vehicles");
			var currObj = oEvent.getSource().getBindingContext("oAppModel").getObject();
			for (var i = 0; i < aVehicles.length; i++) {
				aVehicles[i].isSelected = false;
			}
			this.getVehicleHistory(currObj);
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

			}, function (oData) {});
		},

		onServiceItemPress: function (oEvent) {
			// var currObj = oEvent.getSource().getBindingContext("oAppModel").getObject();
			// currObj.isSelected = !currObj.isSelected;
			// this.getModel("oAppModel").refresh();
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.MyCars
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.MyCars
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf com.sap.alj.sca.ALJ_SCA.view.MyCars
		 */
		//	onExit: function() {
		//
		//	}

	});

});