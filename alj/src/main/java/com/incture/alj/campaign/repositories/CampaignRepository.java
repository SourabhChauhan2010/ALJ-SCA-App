package com.incture.alj.campaign.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.incture.alj.campaign.entities.CampaignEntity;

@Repository
public interface CampaignRepository extends JpaRepository<CampaignEntity, String>{
	List<CampaignEntity> findByIsActive(boolean flag);
}
