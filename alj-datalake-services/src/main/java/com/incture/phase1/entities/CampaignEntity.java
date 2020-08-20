package com.incture.phase1.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "CAMPAIGN")
public class CampaignEntity {

	@Id
	@Column(name = "CAMPAIGN_ID", length = 35)
	private String campaignId;

	@Column(name = "TITLE", length = 100)
	private String campaignTitle;

	@Column(name = "DESCRIPTION")
	private String campaignDesc;

	@Column(name = "IMAGE_URL")
	private String imageUrl;

	@Column(name = "START_DATE")
	private Date startDate;

	@Column(name = "END_DATE")
	private Date endDate;

	@Column(name = "IS_ACTIVE")
	private boolean isActive;
}
