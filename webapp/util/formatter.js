jQuery.sap.declare("com.sap.alj.sca.ALJ_SCA.util.formatter");

com.sap.alj.sca.ALJ_SCA.util.formatter = {

	highlightSelectedItem: function (oIsSelected) {
		this.removeStyleClass("aljSelectedItemStyle");
		if (oIsSelected) {
			this.addStyleClass("aljSelectedItemStyle");
		}
		return true;
	},

	setFooterStyle: function (key, currentPage) {
		this.removeStyleClass("aljFooterSelectedStyle");
		if (key === currentPage) {
			this.addStyleClass("aljFooterSelectedStyle");
		}
		return true;
	},

	showFooter: function (currentPage) {
		if (this.getModel("device").getProperty("/system/desktop")) {
			return false;
		}
		// var aScreensNoFooter = ["BookAService", "MyServices", "AddVehicle", "Profile", "ServiceStatus", "SafetyTips", "ProductDetail", "AddNID", "EditProfile", "Notification"];
		// if (aScreensNoFooter.find(item => item === currentPage)) {
		// 	return false;
		// }
		return true;
	},
	
	showSubHeader: function (currentPage) {
		if (!this.getModel("device").getProperty("/system/desktop")) {
			return false;
		}
		// var aScreensNoFooter = ["BookAService", "MyServices", "AddVehicle", "Profile", "ServiceStatus", "SafetyTips", "ProductDetail", "AddNID", "EditProfile", "Notification"];
		// if (aScreensNoFooter.find(item => item === currentPage)) {
		// 	return false;
		// }
		return true;
	},
};