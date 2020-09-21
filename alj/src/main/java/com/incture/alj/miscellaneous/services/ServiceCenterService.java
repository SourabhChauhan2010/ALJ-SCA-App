package com.incture.alj.miscellaneous.services;

import org.springframework.http.ResponseEntity;

public interface ServiceCenterService {

	ResponseEntity<?> getAllRegions();

	ResponseEntity<?> getServiceCentersByRegion(String region);

}
