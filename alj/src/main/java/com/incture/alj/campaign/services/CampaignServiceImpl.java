package com.incture.alj.campaign.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.incture.alj.campaign.entities.CampaignEntity;
import com.incture.alj.campaign.repositories.CampaignRepository;

@Service
public class CampaignServiceImpl implements CampaignService {

	@Autowired
	CampaignRepository repository;
	
	@Override
	public ResponseEntity<?> getAllCampaign() {
		List<CampaignEntity> response = repository.findAll();
		
		if(response.size() == 0) {
			return new ResponseEntity<>("No record found", HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> saveCampaign(List<CampaignEntity> request) {
		
		System.err.println("> Campaign Request Body : " + request);
		
		List<CampaignEntity> savedRecord = repository.saveAll(request);
		
		if(savedRecord.size() == 0) {
			return new ResponseEntity<>("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<>(savedRecord, HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<?> updateCampaign(CampaignEntity request) {
//		CampaignEntity existingR
		return null;
	}

	@Override
	public ResponseEntity<?> deleteCampaign() {
		// TODO Auto-generated method stub
		return null;
	}

}
