package com.incture.phase1.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.incture.phase1.services.VehicleService;

@RestController
@RequestMapping("/vehicle")
public class VehicleController {
	
	@Autowired
	VehicleService vehicleService;
	
	public ResponseEntity<?> getAllVehicleDetails() {
		return vehicleService.getAllVehicleDetails();
	}
	
	public ResponseEntity<?> getVehicleDetailsById(String vehicleId) {
		return vehicleService.getVehicleDetailsById(vehicleId);
	}
	
	public ResponseEntity<?> getVehicleDetailsByOwnerId(String ownerId) {
		return vehicleService.getVehicleDetailsByOwnerId(ownerId);
	}
}
