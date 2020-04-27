/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"com/sap/alj/sca/ALJ_SCA/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});