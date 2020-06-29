package com.incture.alj.controller;

import java.sql.SQLException;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
/*
import org.springframework.messaging.Message;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.statemachine.StateMachine;*/
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.incture.datalakeDtos.ZCrmVehMasterDto;
import com.incture.datalakeDtos.ZVehSalesHistoryDto;
import com.incture.datalakeDtos.ZaljUcmBpDto;
import com.incture.datalakequeries.DatalakeQueries;

@RestController
@RequestMapping("/alj")

public class DatalakeController {

	@Autowired
	private DatalakeQueries query;
	private Logger log = LoggerFactory.getLogger(DatalakeController.class);

	@GetMapping(path = "profile/userId/{client}/{bpnumber}/{idnumber}")
	public ResponseEntity<?> getProfileByUserId(@PathVariable("client") String client,
			@PathVariable("bpnumber") String bpnumber, @PathVariable("idnumber") String idnumber) {

		try {
			return ResponseEntity.ok(query.getProfileByUserID(client, bpnumber, idnumber));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@GetMapping(path = "vehicles/{ownerId}")
	public ResponseEntity<?> getAvailableVehiclesByUserID(@PathVariable("ownerId") String ownerId) {

		try {
			return ResponseEntity.ok(query.getAvailableVehiclesByUserID(ownerId));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@GetMapping(path = "vehicle/history/{vin}/{customerId}")
	public ResponseEntity<?> getUserVehicleHistory(@PathVariable("vin") String vin,
			@PathVariable("customerId") String customerId) {

		try {
			return ResponseEntity.ok(query.getUserVehicleHistory(vin, customerId));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

	}

	@GetMapping(path = "validate/mobile/{mobile2}")
	public ResponseEntity<?> validateMobileNumber(@PathVariable("mobile2") String mobile2) {

		try {
			return ResponseEntity.ok(query.validateMobileNumber(mobile2));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	@GetMapping(path = "validate/vin/{vin}")
	public ResponseEntity<?> validateVIN(@PathVariable("vin") String vin) {

		try {
			return ResponseEntity.ok(query.validateVIN(vin));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

	}

	@GetMapping(path = "validate/nid/{nationalId}")
	public ResponseEntity<?> validateNID(@PathVariable("nationalId") String nationalId) {

		try {
			return ResponseEntity.ok(query.validateNID(nationalId));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}

	//Send param in request body instead of sending in Url - GetMapping to PostMapping

	@PostMapping("/profile/userId")
	public ResponseEntity<?> getProfileByUserId(@RequestBody ZaljUcmBpDto zaljUcmbpDto) {
		log .info("enter in getProfileByUserId::::" + zaljUcmbpDto);
		try {
			return ResponseEntity.ok(query.getProfileByUserID(zaljUcmbpDto.getClient(), zaljUcmbpDto.getBpNumber(),
					zaljUcmbpDto.getIdNumber()));
		} catch (ClassNotFoundException | SQLException e) {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
	}
	@PostMapping("vehicles")
	public ResponseEntity<?> getAvailableVehiclesByUserID(@RequestBody ZCrmVehMasterDto zcrmvehmasterdto ){

		ResponseEntity<List<ZCrmVehMasterDto>> resp = null;

		try {

			resp = ResponseEntity.ok(query.getAvailableVehiclesByUserID(zcrmvehmasterdto.getOwnerId()));
		} 
		catch (ClassNotFoundException | SQLException e) {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}

		return resp;
	}

	@PostMapping("vehicle/history")
	public ResponseEntity<?> getUserVehicleHistory(@RequestBody ZVehSalesHistoryDto zvehsaleshistorydto ){

		ResponseEntity<List<ZVehSalesHistoryDto>> response = null;

		try {
			response = ResponseEntity.ok(query.getUserVehicleHistory(zvehsaleshistorydto.getVin(),zvehsaleshistorydto.getCustomerId()));
		}
		catch (ClassNotFoundException | SQLException e) {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		return 	response;	
	}

	@PostMapping("validate/mobile")
	public ResponseEntity<?> validateMobileNumber(@RequestBody ZaljUcmBpDto zaljucmbpdto) {
		ResponseEntity<Boolean> resp  = null;
		try {
			resp =  ResponseEntity.ok(query.validateMobileNumber(zaljucmbpdto.getMobile2()));
		} catch (ClassNotFoundException | SQLException e) {

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		return resp;

	}

}
