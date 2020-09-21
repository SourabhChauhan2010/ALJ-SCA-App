package com.incture.alj.campaign.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "CAMPAIGN")//, schema = "ALJ-SCA-CUSTOM-SCHEMA")
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

	public String getCampaignId() {
		return campaignId;
	}

	public void setCampaignId(String campaignId) {
		this.campaignId = campaignId;
	}

	public String getCampaignTitle() {
		return campaignTitle;
	}

	public void setCampaignTitle(String campaignTitle) {
		this.campaignTitle = campaignTitle;
	}

	public String getCampaignDesc() {
		return campaignDesc;
	}

	public void setCampaignDesc(String campaignDesc) {
		this.campaignDesc = campaignDesc;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	@Override
	public String toString() {
		return "CampaignEntity [campaignId=" + campaignId + ", campaignTitle=" + campaignTitle + ", campaignDesc="
				+ campaignDesc + ", imageUrl=" + imageUrl + ", startDate=" + startDate + ", endDate=" + endDate
				+ ", isActive=" + isActive + "]";
	}
	
	
}
