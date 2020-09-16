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
		var aScreensNoFooter = ["SplashScreen"];
		if (aScreensNoFooter.find(item => item === currentPage)) {
			return false;
		}
		return true;
	},

	showSubHeader: function (currentPage) {
		if (!this.getModel("device").getProperty("/system/desktop")) {
			return false;
		}
		var aScreensNoFooter = ["SplashScreen"];
		if (aScreensNoFooter.find(item => item === currentPage)) {
			return false;
		}
		return true;
	},

	setStatusImage: function (status, currServiceStatus) {
		if (status) {
			this.removeStyleClass("aljSSIGreenStyle");
			this.addStyleClass("aljSSIRedStyle");
			if (status === "Order Created" || status === "Car Received") {
				this.addStyleClass("aljSSIGreenStyle");
				this.removeStyleClass("aljSSIRedStyle");
			}
		}
		return true;
	},

	setStatusCarPosition: function (currServiceStatus) {
		if (currServiceStatus) {
			// debugger;
		}
		return true;
	},
	
	getDefaultVBtnText: function(isDefault) {
		this.removeStyleClass("aljRedBtnStyleRev");
		this.removeStyleClass("aljRedBtnStyle");
		if (isDefault) {
			this.addStyleClass("aljRedBtnStyle");
			return "Primary Car";
		} else {
			this.addStyleClass("aljRedBtnStyleRev");
			return "Make";
		}
	},
	
	setDefaultVehicleStyle: function(isDefault) {
		this.removeStyleClass("VehicleListVBRedCSS");
		if (isDefault) {
			this.addStyleClass("VehicleListVBRedCSS");
		} 
		return true;
	}
};