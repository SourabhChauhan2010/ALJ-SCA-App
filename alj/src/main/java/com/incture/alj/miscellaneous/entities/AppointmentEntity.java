
package com.incture.alj.miscellaneous.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


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

	public long getSlNo() {
		return slNo;
	}

	public void setSlNo(long slNo) {
		this.slNo = slNo;
	}

	public String getVehicleIdNumber() {
		return vehicleIdNumber;
	}

	public void setVehicleIdNumber(String vehicleIdNumber) {
		this.vehicleIdNumber = vehicleIdNumber;
	}

	public String getCustomerNumber() {
		return customerNumber;
	}

	public void setCustomerNumber(String customerNumber) {
		this.customerNumber = customerNumber;
	}

	public String getPlant() {
		return plant;
	}

	public void setPlant(String plant) {
		this.plant = plant;
	}

	public String getSalesOrg() {
		return salesOrg;
	}

	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

	public String getDistributionChannel() {
		return distributionChannel;
	}

	public void setDistributionChannel(String distributionChannel) {
		this.distributionChannel = distributionChannel;
	}

	public String getAppointmentTimeSlotId() {
		return appointmentTimeSlotId;
	}

	public void setAppointmentTimeSlotId(String appointmentTimeSlotId) {
		this.appointmentTimeSlotId = appointmentTimeSlotId;
	}

	public Date getAppointmentDate() {
		return appointmentDate;
	}

	public void setAppointmentDate(Date appointmentDate) {
		this.appointmentDate = appointmentDate;
	}

	public String getOrderType() {
		return orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	public String getAcceptedByUser() {
		return acceptedByUser;
	}

	public void setAcceptedByUser(String acceptedByUser) {
		this.acceptedByUser = acceptedByUser;
	}

	public String getWithoutVehicleData() {
		return withoutVehicleData;
	}

	public void setWithoutVehicleData(String withoutVehicleData) {
		this.withoutVehicleData = withoutVehicleData;
	}

	public String getDivision() {
		return division;
	}

	public void setDivision(String division) {
		this.division = division;
	}

	public String getPickupRequired() {
		return pickupRequired;
	}

	public void setPickupRequired(String pickupRequired) {
		this.pickupRequired = pickupRequired;
	}

	public Date getPickupDate() {
		return pickupDate;
	}

	public void setPickupDate(Date pickupDate) {
		this.pickupDate = pickupDate;
	}

	public String getPickupTime() {
		return pickupTime;
	}

	public void setPickupTime(String pickupTime) {
		this.pickupTime = pickupTime;
	}

	public String getDeliveryRequired() {
		return deliveryRequired;
	}

	public void setDeliveryRequired(String deliveryRequired) {
		this.deliveryRequired = deliveryRequired;
	}

	public String getOnlinePayment() {
		return onlinePayment;
	}

	public void setOnlinePayment(String onlinePayment) {
		this.onlinePayment = onlinePayment;
	}

	public String getCampaign() {
		return campaign;
	}

	public void setCampaign(String campaign) {
		this.campaign = campaign;
	}

	public String getPersonnelNum() {
		return personnelNum;
	}

	public void setPersonnelNum(String personnelNum) {
		this.personnelNum = personnelNum;
	}

	public String getAppointmentJobs() {
		return appointmentJobs;
	}

	public void setAppointmentJobs(String appointmentJobs) {
		this.appointmentJobs = appointmentJobs;
	}

	public String getAppointmentType() {
		return appointmentType;
	}

	public void setAppointmentType(String appointmentType) {
		this.appointmentType = appointmentType;
	}

	public String getCarWash() {
		return carWash;
	}

	public void setCarWash(String carWash) {
		this.carWash = carWash;
	}

	public String getOdometerReading() {
		return odometerReading;
	}

	public void setOdometerReading(String odometerReading) {
		this.odometerReading = odometerReading;
	}

	@Override
	public String toString() {
		return "AppointmentEntity [slNo=" + slNo + ", vehicleIdNumber=" + vehicleIdNumber + ", customerNumber="
				+ customerNumber + ", plant=" + plant + ", salesOrg=" + salesOrg + ", distributionChannel="
				+ distributionChannel + ", appointmentTimeSlotId=" + appointmentTimeSlotId + ", appointmentDate="
				+ appointmentDate + ", orderType=" + orderType + ", acceptedByUser=" + acceptedByUser
				+ ", withoutVehicleData=" + withoutVehicleData + ", division=" + division + ", pickupRequired="
				+ pickupRequired + ", pickupDate=" + pickupDate + ", pickupTime=" + pickupTime + ", deliveryRequired="
				+ deliveryRequired + ", onlinePayment=" + onlinePayment + ", campaign=" + campaign + ", personnelNum="
				+ personnelNum + ", appointmentJobs=" + appointmentJobs + ", appointmentType=" + appointmentType
				+ ", carWash=" + carWash + ", odometerReading=" + odometerReading + "]";
	}
	
	
}
