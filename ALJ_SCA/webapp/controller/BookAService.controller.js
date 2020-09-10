sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/BaseController",
	"sap/ui/model/Filter"
], function (BaseController, Filter) {
	"use strict";

	return BaseController.extend("com.sap.alj.sca.ALJ_SCA.controller.BookAService", {
		onInit: function () {
			var oAppModel = this.getOwnerComponent().getModel("oAppModel");
			this.getView().setModel(oAppModel, "oAppModel");
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.fnTimeSlot();
		},

		onAfterRendering: function () {
			this.servicelist = [];
			this.getFridays();
		},

		//Vehicle selection code
		onVehicleItemPress: function (oEvent) {
			var oAppModel = this.getModel("oAppModel");
			var aVehicles = oAppModel.getProperty("/vehicles");
			var currObj = oEvent.getSource().getBindingContext("oAppModel").getObject();
			for (var i = 0; i < aVehicles.length; i++) {
				aVehicles[i].isSelected = false;
			}
			currObj.isSelected = true; //!isSelected
			oAppModel.setProperty("/selectedVehicle", currObj); //isSelected ? false : currObj
			oAppModel.refresh();

			//setting text in the receipt fragment
			this.getView().getContent()[8].getItems()[0].getItems()[0].getItems()[1].setText(currObj.model + " " + currObj.year);

			//changes to vehicle panel
			this.getView().byId("idPnVehInfo").setExpanded(false);
			this.getView().byId("idPnHeaderVehInfo").setVisible(true);
			this.getView().byId("idPnHeaderVehInfo").setText(currObj.model + " " + currObj.year);
			this.getView().byId("idBtnAddVeh").setVisible(false);

		},

		onExpVehiclePanel: function () {
			this.getView().byId("idPnHeaderVehInfo").setText("");
			this.getView().byId("idBtnAddVeh").setVisible(true);
			this.getView().byId("idPnHeaderVehInfo").setVisible(false);
		},

		onPressAddWVehicle: function () {
			this.getView().getContent()[8].getItems()[0].getItems()[0].getItems()[1].setText(this.getView().getModel("i18n").getResourceBundle()
				.getText("noVehicleSelection"));
			this.getView().byId("idPnVehInfo").setExpanded(false);
			this.getView().byId("idPnHeaderVehInfo").setVisible(true);
			this.getView().byId("idPnHeaderVehInfo").setText(this.getView().getModel("i18n").getResourceBundle().getText("noVehicleSelection"));
			this.getView().byId("idBtnAddVeh").setVisible(false);
		},

		onAddVehiclePress: function () {

			this.getRouter().navTo("AddVehicle");

		},

		//Service Type Selection
		onServiceItemPress: function (oEvent) {
			var currObj = oEvent.getSource().getBindingContext("oAppModel").getObject();
			//setting text in the receipt fragment

			this.servicelist.push(currObj.serviceType);
			this.getView().getContent()[8].getItems()[0].getItems()[1].getItems()[1].setText(this.servicelist);
			this.getServiceType();
			this.getBookingSlot();
			this.getServiceLocations();
		},

		onBeforeRendering: function () {
			var oAppModelData = this.getModel("oAppModel").getData();
		},

		createAppointment: function (evt) {
			//do mandatory checks

			var sUrl = "/App_booking_CreationSet";
			var oERPDataModel = this.getModel("oERPDataModel");
			var oPayload = {
				"Vhvin": "RKLBB9HE9K5228306",
				"Kunnr": "1000634340",
				"Werks": "7030",
				"Vkorg": "1700",
				"Vtweg": "03",
				"AppTs": "002",
				"AppDate": "20201001",
				"Labval": " ",
				"Descr1": " ",
				"Aufart": "ZS01",
				"AngeUser": " ",
				"Bstnk": " ",
				"NoVehicle": " ",
				"Spart": "",
				"ZappMcode": " ",
				"ZappPcode": " ",
				"ZappMyear": " ",
				"ZappLicpl": " ",
				"ZzpickUp": "X",
				"ZzpickDate": "20201001",
				"ZzpickTime": "120000",
				"Zzdelivery": "X",
				"ZzonlnPay": "X",
				"Zzcampaign": " ",
				"Advisor": " ",
				"AppType": "ZAP",
				"ZzCarwash": "X",
				"Zodo": "10",
				"App_booking_Creation_jobsSet": [{
					"Kunnr": "1000634340",
					"Labval": "420091",
					"Descr1": "PMS005A054_Sample",
					"PackageId": "PMS005A054",
					"ZzPmCode": " "
				}],
				"App_booking_Creation_ResultSet": [{
					"MessageType": " ",
					"MessageValue": " ",
					"MessageValue1": " ",
					"MessageValue2": " "
				}]
			};
			var oAppModel = this.getModel("oAppModel");
			oERPDataModel.create(sUrl, oPayload, {
				success: function (oData) {
					// oAppModel.setProperty("/serviceTypeSet", oData.results);
					this._showToastMessage("App_booking_CreationSet Success");
				}.bind(this),
				error: function (oData) {}
			});

			if (!this.Calendar) {
				this.Calendar = sap.ui.xmlfragment("com.sap.alj.sca.ALJ_SCA.fragment.Calendar", this);
				this.getView().addDependent(this.Calendar);
			}
			this.Calendar.open();

			// this.oRouter.navTo("ServiceStatus");

		},

		getServiceType: function () {
			var sUrl = "/Plant_and_Service_typeSet";
			var oERPDataModel = this.getModel("oERPDataModel");
			var oAppModel = this.getModel("oAppModel");
			var oFilter = [];
			oFilter.push(new Filter("Werks", "EQ", '7030'));
			oERPDataModel.read(sUrl, {
				filters: oFilter,
				success: function (oData) {
					oAppModel.setProperty("/serviceTypeSet", oData.results);
					this._showToastMessage("Plant_and_Service_typeSet Werks Success");
				}.bind(this),
				error: function (oData) {}
			});
		},

		getServiceLocations: function () {
			var sUrl = "/Plant_and_Service_typeSet";
			var oERPDataModel = this.getModel("oERPDataModel");
			var oAppModel = this.getModel("oAppModel");
			var oFilter = [];
			oFilter.push(new Filter("SrvType", "EQ", 'MC'));
			oERPDataModel.read(sUrl, {
				filters: oFilter,
				success: function (oData) {
					// oAppModel.setProperty("/serviceTypeSet", oData.results);
					this._showToastMessage("Plant_and_Service_typeSet SrvType Success");
				}.bind(this),
				error: function (oData) {}
			});
		},

		getBookingSlot: function (sDate) {
			var sUrl = "/Location_and_Slot_MasterSet";
			var oERPDataModel = this.getModel("oERPDataModel");
			var oAppModel = this.getModel("oAppModel");
			var aTimeSlots = oAppModel.getProperty("/TimeSlot");
			var oFilter = [];
			oFilter.push(new Filter("Zday", "EQ", sDate));
			oFilter.push(new Filter("Werks", "EQ", '7030'));
			oERPDataModel.read(sUrl, {
				filters: oFilter,
				success: function (oData) {
					var aSlots = oData.results;
					for (var counter = 0; counter < aSlots.length; counter++) {
						for (var iSlotCount = 0; iSlotCount < aTimeSlots.length; iSlotCount++) {
							aSlots[counter].TimeFrom.trim();
							var time = aTimeSlots[iSlotCount].time;
							if (aSlots[counter].TimeFrom === time && aTimeSlots[iSlotCount].available === false) {
								aTimeSlots[iSlotCount].available = true;
							}
							// else {
							// 	aTimeSlots[iSlotCount].available = false;
							// }
						}
					}
					oAppModel.refresh();
					this._showToastMessage("Location_and_Slot_MasterSet Success");
				}.bind(this),
				error: function (oData) {}
			});
		},

		handleCalendarSelect: function (oEvent) {
			var oAppModel = this.getModel("oAppModel");
			var dSelectedDate = oEvent.getSource().getSelectedDates()[0].getStartDate();
			var sDate = "" + dSelectedDate.getDate();
			if (sDate.length !== 2) {
				sDate = "0" + sDate;
			}
			var sYear = dSelectedDate.getFullYear();
			var sMonth = "" + dSelectedDate.getMonth() + 1;
			if (sMonth.length !== 2) {
				sMonth = "0" + sMonth;
			}
			var sFullDate = "" + sYear + sMonth + sDate;
			// var oData = oEvent;
			this.getFridays();
			this.getBookingSlot(sFullDate);

		},

		getFridays: function () {
			var oAppModel = this.getModel("oAppModel");
			var arr = [];
			var x = new Date();

			//set the financial year starting date
			x.setFullYear(x.getFullYear(), 3, 1);

			//set the next financial year starting date
			var y = new Date();
			y.setFullYear(y.getFullYear() + 3, 3, 1);
			var j = 1;
			var count = 0;

			//getting the all fridays in a financial year
			for (var i = 0; x < y; i += j) {
				if (x.getDay() == 5) {
					x = new Date(x.getTime() + (7 * 24 * 60 * 60 * 1000));
					var a = {
						date: x
					}
					arr.push(a);
					j = 7;
					count++;
				} else {
					j = 1;
					x = new Date(x.getTime() + (24 * 60 * 60 * 1000));
				}
			}
			oAppModel.setProperty("/Fridays", arr);
		},
		fnTimeSlot: function () {
			var oAppModel = this.getModel("oAppModel");
			var timeSlot = [{
				text: "08:00 AM",
				time: "08:00",
				available: false
			}, {
				text: "08:30 AM",
				time: "08:30",
				available: false
			}, {
				text: "09:00 AM",
				time: "09:00",
				available: false
			}, {
				text: "09:30 AM",
				time: "09:30",
				available: false
			}, {
				text: "10:00 AM",
				time: "10:00",
				available: false
			}, {
				text: "10:30 AM",
				time: "10:30",
				available: false
			}, {
				text: "11:00 AM",
				time: "11:00",
				available: false
			}, {
				text: "11:30 AM",
				time: "11:30",
				available: false
			}, {
				text: "12:00 PM",
				time: "12:00",
				available: false
			}, {
				text: "12:30 PM",
				time: "12:30",
				available: false
			}, {
				text: "01:00 PM",
				time: "13:00",
				available: false
			}, {
				text: "01:30 PM",
				time: "13:30",
				available: false
			}, {
				text: "02:00 PM",
				time: "14:00",
				available: false
			}, {
				text: "02:30 PM",
				time: "14:30",
				available: false
			}, {
				text: "03: 00 PM",
				time: "15:00",
				available: false
			}, {
				text: "03:30 PM",
				time: "15:30",
				available: false
			}, {
				text: "04:00 PM",
				time: "16:00",
				available: false
			}, {
				text: "04:30 PM",
				time: "16:30",
				available: false
			}, {
				text: "05:00 PM",
				time: "17:00",
				available: false
			}, {
				text: "05:30 PM",
				time: "17:30",
				available: false
			}, {
				text: "06:00 PM",
				time: "18:00",
				available: false
			}, {
				text: "06:30 PM",
				time: "18:30",
				available: false
			}, {
				text: "07:00 PM",
				time: "19:00",
				available: false
			}, {
				text: "07:30 PM",
				time: "19:30",
				available: false
			}, {
				text: "08:00 PM",
				time: "20:00",
				available: false
			}, {
				text: "08:30 PM",
				time: "20:30",
				available: false
			}, {
				text: "09:00 PM",
				time: "21:00",
				available: false
			}];
			oAppModel.setProperty("/TimeSlot", timeSlot);
		}

	});
});