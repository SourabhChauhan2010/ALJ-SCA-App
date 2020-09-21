package com.incture.alj.miscellaneous.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "USER_PREFERENCES")
public class UserPrefEntity {
	
	@Id
	@Column(name = "OWNER_ID", length = 50)
	private String ownerId;
	
	@Column(name = "LANGUAGE", length = 50)
	private String prefLanguage;
	
	@Column(name = "VIN", length = 35)
	private String prefVehicle;
	
	@Column(name = "SERVICE_CENTER", length = 50)
	private String prefServiceCenter;

	public String getOwnerId() {
		return ownerId;
	}

	public void setOwnerId(String ownerId) {
		this.ownerId = ownerId;
	}

	public String getPrefLanguage() {
		return prefLanguage;
	}

	public void setPrefLanguage(String prefLanguage) {
		this.prefLanguage = prefLanguage;
	}

	public String getPrefVehicle() {
		return prefVehicle;
	}

	public void setPrefVehicle(String prefVehicle) {
		this.prefVehicle = prefVehicle;
	}

	public String getPrefServiceCenter() {
		return prefServiceCenter;
	}

	public void setPrefServiceCenter(String prefServiceCenter) {
		this.prefServiceCenter = prefServiceCenter;
	}

	@Override
	public String toString() {
		return "UserPrefEntity [ownerId=" + ownerId + ", prefLanguage=" + prefLanguage + ", prefVehicle=" + prefVehicle
				+ ", prefServiceCenter=" + prefServiceCenter + "]";
	}
	
	
}
