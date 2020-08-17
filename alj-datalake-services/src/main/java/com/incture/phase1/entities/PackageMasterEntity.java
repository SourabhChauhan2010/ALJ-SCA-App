package com.incture.phase1.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "PACKAGE_MASTER")
@Data
public class PackageMasterEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long slNo;
	
	@Column(name = "ZPACKAGE_ID", length = 20)
	private String packageId;
	
	@Column(name = "ZPACKAGE_TYPE", length = 2)
	private String packageType;
	
	@Column(name = "ZPACKAGE_DESC_EN", length = 60)
	private String packageDescEng;
	
	@Column(name = "ZPACKAGE_DESC_AR", length = 60)
	private String packageDescAr;
	
	@Column(name = "ZPACKAGE_VALIDITY", length = 15)
	private String packageValidity;
	
	@Column(name = "ZPACKAGE_PRICE")
	private Double packagePrice;
	
	@Column(name = "ZPACKAGE_NOPRICE", length = 80)
	private String packageBlockedFlag;
	
	@Column(name = "ZPACKAGE_NOTSHOW", length = 80)
	private String packageExclusionFlag;
	
	@Column(name = "ZPACK_FREECARWASH")
	private String freeCarwash;
	
	@Column(name = "ZPACKAGE_VEHMODEL", length = 15)
	private String packageLvmt;
	
	@Column(name = "ZPACKAGE_CHAR1", length = 30)
	private String packageChar1;
	
	@Column(name = "ZPACKAGE_CHAR2", length = 30)
	private String packageChar2;
	
	@Column(name = "ZPACKAGE_CHAR3", length = 30)
	private String packageChar3;
	
	@Column(name = "ZPACKAGE_CHAR4", length = 30)
	private String packageChar4;
	
	@Column(name = "ZPACKAGE_CHAR5", length = 30)
	private String packageChar5;
	
	@Column(name = "ZPACKAGE_CHAR6", length = 30)
	private String packageChar6;
	
	@Column(name = "ZPACKAGE_CHAR7", length = 30)
	private String packageChar7;
	
	@Column(name = "ZPACKAGE_ITEMCAT", length = 4)
	private String itemCategory;
	
	@Column(name = "ZPACKAGE_PARTNO", length = 18)
	private String partNumber;
	
	@Column(name = "ZPACKAGE_PARTDESCEN", length = 40)
	private String partDescEng;
	
	@Column(name = "ZPACKAGE_PARTDESCAR", length = 40)
	private String partDescAr;
	
	@Column(name = "ZPACKAGE_PARTQTY")
	private int partQty;
	
	@Column(name = "ZPACKAGE_LABORID", length = 35)
	private String laborValueId;
	
	@Column(name = "ZPACKAGE_LABDESCEN", length = 40)
	private String laborValueDescEng;
	
	@Column(name = "ZPACKAGE_LABDESCAR", length = 40)
	private String laborValueDescAr;
	
	@Column(name = "ZPACKAGE_LABTIME", length = 13)
	private String labourValueTargetTime;
}