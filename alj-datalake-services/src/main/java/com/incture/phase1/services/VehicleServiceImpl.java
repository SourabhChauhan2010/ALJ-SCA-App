package com.incture.phase1.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.incture.phase1.entities.VehicleMasterEntity;
import com.incture.phase1.repositories.VehicleMasterRepository;

@Service
public class VehicleServiceImpl implements VehicleService {
	
	@Autowired
	VehicleMasterRepository repository;

	@Override
	public ResponseEntity<?> getAllVehicleDetails() {
		// TODO Auto-generated method stub
		List<VehicleMasterEntity> response = repository.findAll();
		
		if (response.size() == 0) {
			return new ResponseEntity<>("No record found", HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> getVehicleDetailsByOwnerId(String ownerId) {
		List<VehicleMasterEntity> response = repository.findByOwnerId(ownerId);
		
		if (response.size() == 0) {
			return new ResponseEntity<>("No record found", HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> getVehicleDetailsById(String vehicleId) {
		VehicleMasterEntity response = repository.findByVehicleId(vehicleId);

		if (response == null) {
			return new ResponseEntity<>("No record found", HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
