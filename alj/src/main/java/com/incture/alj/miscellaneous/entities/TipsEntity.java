package com.incture.alj.miscellaneous.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "TIPS")
public class TipsEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "TIPS_ID")
	private Long tipsId;
	
	@Column(name = "TITLE", length = 35)
	private String title;
	
	@Column(name = "DESCRIPTION", length = 255)
	private String desc;
	
	@Column(name = "LANGUAGE", length = 2)
	private String language;
	
	@Column(name = "IS_ACTIVE")
	private boolean isActive;

	public Long getId() {
		return tipsId;
	}

	public void setId(Long id) {
		this.tipsId = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	@Override
	public String toString() {
		return "TipsEntity [id=" + tipsId + ", title=" + title + ", desc=" + desc + ", language=" + language + ", isActive="
				+ isActive + "]";
	}
	
}