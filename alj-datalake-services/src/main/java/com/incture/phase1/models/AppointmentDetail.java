package com.incture.phase1.models;

import java.util.Date;

import lombok.Data;

@Data
public class AppointmentDetail {
	private String idNumber;
	private String vin;
	private String appointmentType;
	private String region;
	private String center;
	private String jobType;
	private Date appointmentDate;
	private String slot;
	private boolean pickup;
	private Date pickupDate;
	private String pickupSlot;
	private String pickupAddress;
}
