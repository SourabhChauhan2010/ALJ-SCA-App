package com.incture.phase1.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.incture.phase1.services.AppointmentService;

@RestController
@RequestMapping("/alj/appointment")
public class AppointmentController {
	
	@Autowired
	AppointmentService appointmentService;
	
	public ResponseEntity<?> getAppointmentList(String customerNumber) throws Exception {
		return appointmentService.getAppointmentList(customerNumber);
	}
	
	public ResponseEntity<?> getAppointmentDetailsByVehicleId(String customerNumber, String vechileId) {
		return appointmentService.getAppointmentDetailsByVehicleId(customerNumber, vechileId);
	}
	
	public void getServiceType(String email) {
		
	}
	
	public void getSubServiceTypeWithDetails(String email, String serviceTypeId) {
		
	}
	
	public void getUserPreferences(String email) {
		
	}

}
