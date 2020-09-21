package com.incture.alj.miscellaneous.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@Table(name = "SERVICE_CENTER")
@IdClass(ServiceCenterId.class)
public class ServiceCenter {
	
	@Id
	@Column(name = "REGION", length = 35)
	private String region;
	
	@Id
	@Column(name = "CITY", length = 35)
	private String city;
	
	@Id
	@Column(name = "PHYSICAL_B", length = 5)
	private String physicalB;
	
	@Column(name = "CENTER_NAME", length = 35)
	private String centerName;
	
	@Column(name = "TYPE", length = 10)
	private String type;
	
	@Column(name = "TYPE_2", length = 10)
	private String type2;
	
	@Column(name = "LATITUDE")
	private Double latitude;
	
	@Column(name = "LONGITUDE")
	private Double longitude;
	
	@Column(name = "DMS_LATITUDE")
	private String dmsLatitude;
	
	@Column(name = "DMS_LONGITUTE")
	private String dmsLongitute;

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getPhysicalB() {
		return physicalB;
	}

	public void setPhysicalB(String physicalB) {
		this.physicalB = physicalB;
	}

	public String getCenterName() {
		return centerName;
	}

	public void setCenterName(String centerName) {
		this.centerName = centerName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getType2() {
		return type2;
	}

	public void setType2(String type2) {
		this.type2 = type2;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public String getDmsLatitude() {
		return dmsLatitude;
	}

	public void setDmsLatitude(String dmsLatitude) {
		this.dmsLatitude = dmsLatitude;
	}

	public String getDmsLongitute() {
		return dmsLongitute;
	}

	public void setDmsLongitute(String dmsLongitute) {
		this.dmsLongitute = dmsLongitute;
	}

	@Override
	public String toString() {
		return "ServiceCenter [region=" + region + ", city=" + city + ", physicalB=" + physicalB + ", centerName="
				+ centerName + ", type=" + type + ", type2=" + type2 + ", latitude=" + latitude + ", longitude="
				+ longitude + ", dmsLatitude=" + dmsLatitude + ", dmsLongitute=" + dmsLongitute + "]";
	}
		
}
