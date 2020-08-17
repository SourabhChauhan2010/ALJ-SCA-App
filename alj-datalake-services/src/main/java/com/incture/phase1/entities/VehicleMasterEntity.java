package com.incture.phase1.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "VEHICLE_MASTER")
public class VehicleMasterEntity {

	@Id
	@Column(name = "VIN", length = 35)
	private String vehicleId;
	
	@Column(name = "LP_NO", length = 15)
	private String licencePlateNo;
	
	@Column(name = "ZZVC_MODEL_CODE", length = 30)
	private String modelCode;
	
	@Column(name = "MODEL_YEAR", length = 4)
	private Integer modelYear;
	
	@Column(name = "MODEL_LINE", length = 20)
	private String modelLine;
	
	@Column(name = "DIVISION", length = 5)
	private String division;
	
	@Column(name = "OWNER_ID", length = 50)
	private String ownerId;
	
	@Column(name = "ODOMETER", length = 7)
	private String odometerReading;
	
	@Column(name = "VEHICLE_WARRANTY", length = 15)
	private String vehicleWarranty;
}