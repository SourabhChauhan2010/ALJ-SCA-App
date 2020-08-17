
package com.incture.phase1.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "APPOINTMENT_BOOKING_CREATION")
public class AppointmentEntity {
	
	@Id
	@Column(name = "SL_NO")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long slNo;
	
	@Column(name = "VHVIN", length = 35)
	private String vehicleIdNumber;

	@Column(name = "KUNNR", length = 10)
	private String customerNumber;
	 /*
	@Column(name = "EMAIL")
	@Email
	private String customerEmail;
*/
	@Column(name = "WERKS", length = 4)
	private String plant;

	@Column(name = "VKORG", length = 4)
	private String salesOrg;

	@Column(name = "VTWEG", length = 2)
	private String distributionChannel;

	@Column(name = "APP_TS", length = 3)
	private String appointmentTimeSlotId;

	@Column(name = "APP_DATE")
	private Date appointmentDate;

	@Column(name = "AUFART", length = 4)
	private String orderType;

	@Column(name = "ANGE_USER", length = 12)
	private String acceptedByUser;

	@Column(name = "NO_VEHICLE", length = 1)
	private String withoutVehicleData;

	@Column(name = "SPART", length = 2)
	private String division;
		 
	@Column(name = "ZZPICK_UP", length = 1)
	private String pickupRequired;

	@Column(name = "ZZPICK_DATE")
	private Date pickupDate;

	@Column(name = "ZZPICK_TIME", length = 6)
	private String pickupTime;

	@Column(name = "ZZDELIVERY", length = 1)
	private String deliveryRequired;
		 	 
	@Column(name = "ZZONLN_PAY", length = 1)
	private String onlinePayment;

	@Column(name = "ZZCAMPAIGN", length = 24)
	private String campaign;

	@Column(name = "ADVISOR", length = 8)
	private String personnelNum;

	@Column(name = "ZAPP_JOBS")
	private String appointmentJobs;

	@Column(name = "APP_TYPE", length = 3)
	private String appointmentType;

	@Column(name = "ZZ_CARWASH", length = 1)
	private String carWash;

	@Column(name = "ZODO")
	private String odometerReading;
}
