/*global QUnit*/

sap.ui.define([
	"com/sap/alj/sca/ALJ_SCA/controller/Launchpad.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Launchpad Controller");

	QUnit.test("I should test the Launchpad controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});