sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";
	var oModel;
	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.ServiceCenter", {

		onInit: function () {
			sap.ui.core.UIComponent.getRouterFor(this).attachRoutePatternMatched(this._onRouteMatched, this);
		},
		_onRouteMatched: function (oEvt) {
			oModel = this.getModel("oAppModel");
			oModel.setProperty("/Spots/" + 4 + "/scale", "1.5;1.5;1.5");
			var selectedCityModel = new JSONModel();
			selectedCityModel.setData({
				"selCity": "Jedah"
			});
			var selectedCenterModel = new JSONModel();
			this.getView().setModel(selectedCityModel, "selectedCityModel");
			this.getView().setModel(selectedCenterModel, "selectedCenterModel");
		},
		onSelectionChange: function (oEvt) {
			oModel = this.getModel("oAppModel");
			var oList = oEvt.getSource();

			for (var j = 0; j < 8; j++) { // loop over first 3 locations in Data.json
				var locJson = oModel.getProperty("/Spots/" + j + "/tooltip"); // location from Data.json
				var flagScaled = false;
				// loop over all selected locations
				var locList = oList.getSelectedKey();
				if (locList == locJson) {
					if (oModel.getProperty("/Spots/" + j + "/scale") == "1;1;1") {
						oModel.setProperty("/Spots/" + j + "/scale", "1.5;1.5;1.5");
						flagScaled = true;
					} else if (oModel.getProperty("/Spots/" + j + "/scale") == "1.5;1.5;1.5") {
						flagScaled = false;
					}
				} else {
					oModel.setProperty("/Spots/" + j + "/scale", "1;1;1");
				}
				continue;

				if (!flagScaled) {
					if (oModel.getProperty("/Spots/" + j + "/scale") == "1.5;1.5;1.5") {
						oModel.setProperty("/Spots/" + j + "/scale", "1;1;1");
					}
				}
			}
		},

		onCityChange: function (oEvt) {
			oModel = this.getModel("oAppModel");
			var oList = oEvt.getSource();
			//	var aItems = oList.getSelectedItem();
			for (var j = 0; j < 8; j++) { // loop over first 3 locations in Data.json
				var locJson = oModel.getProperty("/Spots/" + j + "/tooltip"); // location from Data.json
				var flagScaled = false;
				// loop over all selected locations
				var locList = oList.getSelectedKey();
				if (locList === locJson) {
					if (oModel.getProperty("/Spots/" + j + "/scale") === "1;1;1") {
						oModel.setProperty("/Spots/" + j + "/scale", "1.5;1.5;1.5");
						flagScaled = true;
					} else if (oModel.getProperty("/Spots/" + j + "/scale") === "1.5;1.5;1.5") {
						flagScaled = true;
					}
				}
				continue;

				if (!flagScaled) {
					if (oModel.getProperty("/Spots/" + j + "/scale") === "1.5;1.5;1.5") {
						oModel.setProperty("/Spots/" + j + "/scale", "1;1;1");
					}
				}
			}
		},

		HandlePinLocationSelect: function (oEvt) {
			var pressedLocObj = oEvt.getSource().getBindingContext("oAppModel").getObject();
			var centerModel = this.getView().getModel("selectedCenterModel");
			pressedLocObj.scale = "1.5;1.5;1.5";
			var key = pressedLocObj.key;
			centerModel.setData({
				"selCenter": key
			});
			var mapData = oEvt.getSource().getBindingContext("oAppModel").getModel().getData().Spots;
			for (var i = 0; i < mapData.length; i++) {
				if (mapData[i].key !== key) {
					mapData[i].scale = "1;1;1";

				}
			}
			centerModel.refresh(true);
			this.getView().getModel("oAppModel").refresh();
		},

		onNavBack: function () {
			this.getRouter().navTo("More");
		}

	});

});