package com.incture.alj.miscellaneous.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.incture.alj.miscellaneous.entities.ServiceCenter;
import com.incture.alj.miscellaneous.repositories.ServiceCenterRepository;

@Service
public class ServiceCenterServiceImpl implements ServiceCenterService {

	@Autowired
	ServiceCenterRepository repository;

	@Override
	public ResponseEntity<?> getAllRegions() {
		List<String> response = repository.findDistinctRegion();

		if (response.size() == 0 || response == null)
			return new ResponseEntity<>("No record found", HttpStatus.NO_CONTENT);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> getServiceCentersByRegion(String region) {

		List<ServiceCenter> response = repository.findByRegion(region);

		if (response.size() == 0 || response == null)
			return new ResponseEntity<>("No record found", HttpStatus.NO_CONTENT);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

}
