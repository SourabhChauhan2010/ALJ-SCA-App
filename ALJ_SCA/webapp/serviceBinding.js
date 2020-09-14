function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZGW_SRW_SAA_APP_001_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}