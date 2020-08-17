package com.incture.phase1.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.incture.phase1.entities.AppointmentEntity;
import com.incture.phase1.repositories.AppointmentCreationRepository;

import javassist.tools.web.BadHttpRequest;

@Service
public class AppointmentServiceImpl implements AppointmentService {
	
	@Autowired
	AppointmentCreationRepository appointmentRepo;

	@Override
	public ResponseEntity<?> getAppointmentList(String customerNumber) throws BadHttpRequest {

		if (customerNumber == null || customerNumber.isEmpty()) { // || !ValidationUtils.isValidEmail(email)) {
			return new ResponseEntity<>("Invalid email", HttpStatus.BAD_REQUEST);
		}
		
		List<AppointmentEntity> response = appointmentRepo.findByCustomerNumber(customerNumber);
		if (response.size() == 0) {
			return new ResponseEntity<>("No record found", HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> getAppointmentDetailsByVehicleId(String customerNumber, String vechileId) {
		
		if (customerNumber == null || customerNumber.isEmpty()) { // || !ValidationUtils.isValidEmail(emailId)) {
			return new ResponseEntity<>("Invalid email", HttpStatus.BAD_REQUEST);
		}
		
		if (vechileId == null || vechileId.isEmpty()) {
			return new ResponseEntity<>("Vehicle Id is mandatory", HttpStatus.BAD_REQUEST);
		}
		
		List<AppointmentEntity> response = appointmentRepo.findByCustomerNumberAndVehicleIdNumber(customerNumber, vechileId);
		if (response.size() == 0) {
			return new ResponseEntity<>("No record found", HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

}
