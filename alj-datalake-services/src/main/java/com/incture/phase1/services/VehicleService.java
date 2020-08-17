package com.incture.phase1.services;

import org.springframework.http.ResponseEntity;

public interface VehicleService {

	ResponseEntity<?> getAllVehicleDetails();

	ResponseEntity<?> getVehicleDetailsByOwnerId(String ownerId);

	ResponseEntity<?> getVehicleDetailsById(String vehicleId);

}
