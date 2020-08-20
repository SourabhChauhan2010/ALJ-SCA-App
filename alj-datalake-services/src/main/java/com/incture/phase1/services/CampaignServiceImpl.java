package com.incture.phase1.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.incture.phase1.entities.CampaignEntity;
import com.incture.phase1.repositories.CampaignRepository;

@Service
public class CampaignServiceImpl implements CampaignService {

	@Autowired
	CampaignRepository repository;
	
	@Override
	public ResponseEntity<?> getCampaigns() {
		List<CampaignEntity> response =  repository.findByIsActive(true);
		
		if(response.size() > 0) {
			return new ResponseEntity<>("No record found", HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

}
