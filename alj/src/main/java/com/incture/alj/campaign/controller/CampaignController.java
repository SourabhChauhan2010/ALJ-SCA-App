package com.incture.alj.campaign.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.incture.alj.campaign.entities.CampaignEntity;
import com.incture.alj.campaign.services.CampaignService;

@RestController
@RequestMapping("alj/campaign")
public class CampaignController {
	
	@Autowired
	CampaignService service;
	
	@GetMapping("/test")
	public String test() {
		return "Campaign is running.";
	}

	@GetMapping("/all")
	public ResponseEntity<?> getAllCampaign() {
		return service.getAllCampaign();
	}
	
	@PostMapping("/save")
	public ResponseEntity<?> saveCampaigns(@RequestBody List<CampaignEntity> request) {
		return service.saveCampaign(request);
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> updateCampaign(@RequestBody CampaignEntity request) {
		return service.updateCampaign(request);
	}
	
	@DeleteMapping("/del")
	public ResponseEntity<?> deleteCampaign() {
		return service.deleteCampaign();
	}
}
