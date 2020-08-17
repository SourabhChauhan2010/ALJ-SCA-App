package com.incture.phase1.services;

import org.springframework.http.ResponseEntity;

import javassist.tools.web.BadHttpRequest;

public interface AppointmentService {

	ResponseEntity<?> getAppointmentList(String customerNumber) throws BadHttpRequest;

	ResponseEntity<?> getAppointmentDetailsByVehicleId(String customerNumber, String vechileId);

}
