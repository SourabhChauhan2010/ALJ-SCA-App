package com.incture.alj.miscellaneous.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.incture.alj.miscellaneous.services.ServiceCenterService;

@RestController
@RequestMapping("alj/service")
public class ServiceCenterController {
	
	@Autowired
	ServiceCenterService service;

	@GetMapping("/center/test")
	public String test() {
		return "Service center api is running.";
	}
	
	@GetMapping("/center/regions")
	public ResponseEntity<?> getAllRegions() {
		return service.getAllRegions();
	}
	
	@GetMapping("/center/region/{region}")
	public ResponseEntity<?> getServiceCentersByRegion(@PathVariable String region) {
		return service.getServiceCentersByRegion(region);
	}
}
