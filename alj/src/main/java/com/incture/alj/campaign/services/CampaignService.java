package com.incture.alj.campaign.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.incture.alj.campaign.entities.CampaignEntity;

public interface CampaignService {

	ResponseEntity<?> getAllCampaign();

	ResponseEntity<?> saveCampaign(List<CampaignEntity> request);

	ResponseEntity<?> updateCampaign(CampaignEntity request);

	ResponseEntity<?> deleteCampaign();

}
