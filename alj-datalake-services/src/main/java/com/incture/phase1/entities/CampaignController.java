package com.incture.phase1.entities;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.incture.phase1.services.CampaignService;

@RestController
@RequestMapping("/campaign")
public class CampaignController {
	
	@Autowired
	CampaignService service;
	
	@GetMapping
	public ResponseEntity<?> getCampaigns() {
		return service.getCampaigns();
	}
}
