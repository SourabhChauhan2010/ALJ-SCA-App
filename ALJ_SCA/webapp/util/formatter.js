jQuery.sap.declare("com.sap.alj.sca.ALJ_SCA.util.formatter");

com.sap.alj.sca.ALJ_SCA.util.formatter = {
	
	highlightSelectedItem: function(oIsSelected) {
		this.removeStyleClass("aljSelectedItemStyle");
		if (oIsSelected) {
			this.addStyleClass("aljSelectedItemStyle");
		}
		return true;
	}
};