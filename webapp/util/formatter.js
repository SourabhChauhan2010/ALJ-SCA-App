jQuery.sap.declare("com.sap.alj.sca.ALJ_SCA.util.formatter");

com.sap.alj.sca.ALJ_SCA.util.formatter = {

	highlightSelectedItem: function (oIsSelected) {
		this.removeStyleClass("aljSelectedItemStyle");
		if (oIsSelected) {
			this.addStyleClass("aljSelectedItemStyle");
		}
		return true;
	},

	getSVGSource: function (file) {
		var result = "";
		// if (file) {
		// 	var rawFile = new XMLHttpRequest();
		// 	rawFile.open("GET", file, false);
		// 	rawFile.onreadystatechange = function () {
		// 		if (rawFile.readyState === 4) {
		// 			if (rawFile.status === 200 || rawFile.status === 0) {
		// 				var allText = rawFile.responseText;
		// 				result = allText;
		// 			}
		// 		}
		// 	};
		// 	rawFile.send(null);
		// }
		// if (file.includes("Products")) {
		// 	this.addStyleClass("aljProductsStyle");
		// }
		return result;
	},
	
	setFooterStyle: function(key, currentPage) {
		this.removeStyleClass("aljFooterSelectedStyle");
		if (key === currentPage) {
			this.addStyleClass("aljFooterSelectedStyle");
		}
		return true;
	}
};