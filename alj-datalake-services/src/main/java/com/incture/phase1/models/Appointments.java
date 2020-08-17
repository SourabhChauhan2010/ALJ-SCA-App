package com.incture.phase1.models;

import java.io.Serializable;
import java.util.Date;

import lombok.Data;

@Data
public class Appointments implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private String vehicleIdNumber;
	private String customerNumber;
	private String plant;
	private String salesOrg;
	private String distributionChannel;
	private String appointmentTimeSlotId;
	private Date appointmentDate;
	private String orderType;
	private String acceptedByUser;
	private String withoutVehicleData;
	private String division;
	private String pickupRequired;
	private Date pickupDate;
	private String pickupTime;
	private String deliveryRequired;
	private String onlinePayment;
	private String campaign;
	private String personnelNum;
	private String appointmentJobs;
	private String appointmentType;
	private String carWash;
	private String odometerReading;
}
