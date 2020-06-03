package com.incture.datalakeDtos;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import software.amazon.ion.Decimal;

//Model

@Getter
@Setter
@ToString
public class ZCrmVehModelDto {

	private String client;
	private String productId;
	private String description;
	private String brand;
	private String type;
	private String body;
	private String doors;
	private String passengers;
	private String fuelType;
	private double cubicCap;
	private String cubicCapU;
	private Decimal perform;
	private String performU;
	private double emmission;
	private String emmissionU;
	private String cylinders;
	private String modelLine;
	private String modelYear;
	private double fcComb;
	private String fcCombU;
	private double fcCity;
	private String fcCityU;
	private double fcRoad;
	private String fcRoadU;
	private double tank;
	private String tankU;
	private double weight;
	private String weightU;
	private double weightMax;
	private String weightMaxU;
	private String trans;
	private String powertrain;
	private double price;
	private String priceC;
	private String used;
	private String descriptionAr;
	private String extColour;
	private String intColour;
	private double purchasePrice;
	private String changedAt;
	private String extColDesc;
	private String intColDesc;
	private String changedDate;
	private String recStatus;
	private String zzvcModelCode;
	private String zzvcBrand;
	private String zzvcBrandAr;
	private String zzvcProduct;
	private String zzvcProductAr;
	private String zzvcBrandstyle;
	private String zzvcBrandstyleAr;
	private String zzvcFueltype;
	private String zzvcFueltypeAr;
	private String zzvcPowertrain;
	private String zzvcPowertrainAr;
	private String zzvcGrade;
	private String zzvcGradeAr;
	private String zzvcTransmission;
	private String zzvcEngineSize;
	private String subproduct;
	private String labvalTy;
	private String AljSuffix;
	private String maktx;
	private String zmodelHybrisId;
	private String zzcvSegmenet;
	private String zzvcSegmenetAr;
	private String extColourAr;
	private String intColorAr;
	private String zzvcTransmissionAr;
	private String zzvcCountryOfOrigin;
	private String zzvcCountryOfOriginEn;
	private String zzcvCountryOfOriginAr;
	private String erdat;
	private String aedat;
	private String createdAt;
	private String createdAtTmtsp;
	private String zzengineTech;


}
