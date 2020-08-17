package com.incture.phase1.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "USER_PREFERENCES")
@Data
public class UserPrefEntity {
	/*@Id
	@Column(name = "SL_NO")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long slNo;
	*/
	@Id
	@Column(name = "OWNER_ID", length = 50)
	private String ownerId;
	
	@Column(name = "LANGUAGE", length = 50)
	private String prefLanguage;
	
	@Column(name = "VIN", length = 35)
	private String prefVehicle;
	
	@Column(name = "SERVICE_CENTER", length = 50)
	private String prefServiceCenter;
}
