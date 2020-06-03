package com.incture.datalakequeries;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.incture.datalakeDtos.ZCrmVehMasterDto;
import com.incture.datalakeDtos.ZCrmVehModelDto;
import com.incture.datalakeDtos.ZDbmOrdCrmServiceDto;
import com.incture.datalakeDtos.ZVehSalesHistoryDto;
import com.incture.datalakeDtos.ZaljUcmBpDto;

@Transactional
@Service
public class DatalakeQueries {

	@Autowired
	private DataSource ds;

	public void executeQuery() {

	}

	public ZaljUcmBpDto getProfileByUserID(String client, String bpNumber, String idNumber) throws ClassNotFoundException, SQLException {
		// DatabaseConfiguration config = new DatabaseConfiguration();
		Connection connect = ds.getConnection();
		String sb = "select * from \"ALJ_CRM_ZALJ_UCM_BP_APP_HDI_ALJ_DATALAKE_DEV_1\".\"Test1_TARGET_ZALJ_UCM_BP\" where CLIENT = "
				+ "'" + client + "'" + "and BP_NUMBER = " + "'" + bpNumber + "'" + " and IDNUMBER = " + "'" + idNumber + "'";

		// logger.debug(sb);
		PreparedStatement ps = connect.prepareStatement(sb);
		ps.execute();

		ResultSet resultSet = ps.getResultSet();
		ZaljUcmBpDto customer = null;
		while (resultSet.next()) {
			customer = prepareCustomerFromResultset(resultSet);
		}
		return customer;
	}

	public List<ZCrmVehMasterDto> getAvailableVehiclesByUserID(String ownerId)
			throws ClassNotFoundException, SQLException {

		Connection connect;
		connect = ds.getConnection();
		String sb = "select * from \"ALJ_CRM_ZALJ_UCM_BP_APP_HDI_ALJ_DATALAKE_DEV_1\".\"ZCRM_VEH_MASTER_TARGET\" where OWNER_ID = "
				+ "'" + ownerId + "'";

		// logger.debug(sb);
		PreparedStatement ps;
		ResultSet resultSet;
		ps = connect.prepareStatement(sb);
		ps.execute();
		resultSet = ps.getResultSet();

		List<ZCrmVehMasterDto> vehicleList = new ArrayList<>();
		while (resultSet.next()) {
			ZCrmVehMasterDto customer = prepareVehicleMasterFromResultset(resultSet);
			vehicleList.add(customer);
		}

		return vehicleList;

	}

	public List<ZVehSalesHistoryDto> getUserVehicleHistory(String vin, String customerId)
			throws ClassNotFoundException, SQLException {

		Connection connect;
		connect = ds.getConnection();
		String sb = "select * from \"ALJ_CRM_ZALJ_UCM_BP_APP_HDI_ALJ_DATALAKE_DEV_1\".\"TARGET_ZVEH_SALEHISTORY\" where VIN = "
				+ "'" + vin + "'" + "and CUSTOMER_ID = " + "'" + customerId + "'";

		PreparedStatement ps;
		ResultSet resultSet;
		ps = connect.prepareStatement(sb);
		ps.execute();
		resultSet = ps.getResultSet();

		List<ZVehSalesHistoryDto> vehicleHistory = new ArrayList<>();

		while (resultSet.next()) {
			ZVehSalesHistoryDto customer = prepareVehicleSalesHistoryFromResultset(resultSet);
			vehicleHistory.add(customer);
		}

		return vehicleHistory;

	}

	public Boolean validateMobileNumber(String mobile2)
			throws ClassNotFoundException, SQLException {

		Connection connect;
		connect = ds.getConnection();
		String sb = "select * from \"ALJ_CRM_ZALJ_UCM_BP_APP_HDI_ALJ_DATALAKE_DEV_1\".\"Test1_TARGET_ZALJ_UCM_BP\" where MOBILE2 = " + "'" + "mobile2"
				+ "'";

		// logger.debug(sb);
		PreparedStatement ps;
		ResultSet resultSet;
		ps = connect.prepareStatement(sb);
		ps.execute();
		resultSet = ps.getResultSet();

		ZaljUcmBpDto customer = new ZaljUcmBpDto();
		while (resultSet.next()) {
			customer = prepareCustomerFromResultset(resultSet);
		}

		
			if(customer.getMobile2()!= null && customer.getMobile2().equals(mobile2)){
				return true;
			}
		
		return false;
	}

	public Boolean validateVIN(String vin) throws ClassNotFoundException, SQLException {
		Connection connect;
		connect = ds.getConnection();
		String sb = "select * from \"ALJ_CRM_ZALJ_UCM_BP_APP_HDI_ALJ_DATALAKE_DEV_1\".\"ZCRM_VEH_MASTER_TARGET\" where VIN = "
				+ "'" + vin + "'";

		PreparedStatement ps;
		ResultSet resultSet;
		ps = connect.prepareStatement(sb);
		ps.execute();
		resultSet = ps.getResultSet();

		ZCrmVehMasterDto vehicleMasterDto = new ZCrmVehMasterDto();
		while (resultSet.next()) {
			vehicleMasterDto = prepareVehicleMasterFromResultset(resultSet);
		}

		if (vehicleMasterDto.getVin() != null && vehicleMasterDto.getVin().equals(vin))
			return true;
		return false;

	}

	public Boolean validateNID(String nationalId) throws ClassNotFoundException, SQLException {
		Connection connect;
		connect = ds.getConnection();
		String sb = "select * from \"ALJ_CRM_ZALJ_UCM_BP_APP_HDI_ALJ_DATALAKE_DEV_1\".\"Test1_TARGET_ZALJ_UCM_BP\" where IDNUMBER = " + "'" + nationalId + "'";

		PreparedStatement ps;
		ResultSet resultSet;
		ps = connect.prepareStatement(sb);
		ps.execute();
		resultSet = ps.getResultSet();

		List<ZaljUcmBpDto> customerList = new ArrayList<>();
		while (resultSet.next()) {
			ZaljUcmBpDto customer = prepareCustomerFromResultset(resultSet);
			customerList.add(customer);
		}

		
		if(customerList!= null)
			return true;
		return false;

	}

	private ZaljUcmBpDto prepareCustomerFromResultset(ResultSet resultSet) throws SQLException {
		ZaljUcmBpDto customer = new ZaljUcmBpDto();

		customer.setAccountAsgnGrp(resultSet.getString("ACCOUNT_ASGNGRP"));
		customer.setArNameFirst(resultSet.getString("AR_NAME_FIRST"));
		customer.setArNameLast(resultSet.getString("AR_NAME_LAST"));
		customer.setArNameMiddle(resultSet.getString("AR_NAME_MIDDLE"));
		customer.setArNickName(resultSet.getString("AR_NICK_NAME"));
		customer.setBirthDt(resultSet.getString("BIRTHDT"));
		customer.setBirthPl(resultSet.getString("BIRTHPL"));
		customer.setBpExt(resultSet.getString("BPEXT"));
		customer.setBpNumber(resultSet.getString("BP_NUMBER"));
		customer.setBpRole(resultSet.getString("BP_ROLE"));
		customer.setBuilding(resultSet.getString("BUILDING"));
		customer.setChangedAt(resultSet.getString("CHANGED_AT"));
		customer.setChannel(resultSet.getString("CHANNEL"));
		customer.setChangedBy(resultSet.getString("CHANGED_BY"));
		customer.setCity1(resultSet.getString("CITY1"));
		customer.setCity2(resultSet.getString("CITY2"));
		customer.setClient(resultSet.getString("CLIENT"));
		customer.setCountry(resultSet.getString("COUNTRY"));
		customer.setCreatedAt(resultSet.getString("CREATED_AT"));
		customer.setCreatedBy(resultSet.getString("CREATED_BY"));
		customer.setCustomerGroup(resultSet.getString("CUSTOMER_GROUP"));
		customer.setCustomerGroup1(resultSet.getString("CUSTOMER_GROUP1"));
		customer.setCustomerGroup2(resultSet.getString("CUSTOMER_GROUP2"));
		customer.setCustomerGroup3(resultSet.getString("CUSTOMER_GROUP3"));
		customer.setCustomerGroup4(resultSet.getString("CUSTOMER_GROUP4"));
		customer.setCustomerGroup5(resultSet.getString("CUSTOMER_GROUP5"));
		customer.setCustPricProc(resultSet.getString("CUST_PRIC_PROC"));
		customer.setCurrency(resultSet.getString("CURRENCY"));
		customer.setDefltComm(resultSet.getString("DEFLT_COMM"));
		customer.setDivision(resultSet.getString("DIVISION"));
		customer.setEmail1(resultSet.getString("EMAIL1"));
		customer.setEmail2(resultSet.getString("EMAIL2"));
		customer.setEmplo(resultSet.getString("EMPLO"));
		customer.setEmployee(resultSet.getString("EMPLOYEE"));
		customer.setGender(resultSet.getString("GENDER"));
		customer.setHomePhone(resultSet.getString("HOME_PHONE"));
		customer.setIdNumber(resultSet.getString("IDNUMBER"));
		customer.setIncoTerms1(resultSet.getString("INCOTERMS1"));
		customer.setJobgr(resultSet.getString("JOBGR"));
		customer.setLangucorr(resultSet.getString("LANGUCORR"));
		customer.setLocation(resultSet.getString("LOCATION"));
		customer.setMarst(resultSet.getString("MARST"));
		customer.setMobile1(resultSet.getString("MOBILE1"));
		customer.setMobile2(resultSet.getString("MOBILE2"));
		customer.setMoNetInc(resultSet.getString("MO_NET_INC"));
		customer.setNameFirst(resultSet.getString("NAME_FIRST"));
		customer.setNameLast(resultSet.getString("NAME_LAST"));
		customer.setNameMiddle(resultSet.getString("NAME_MIDDLE"));
		customer.setNatio(resultSet.getString("NATIO"));
		customer.setNatpers(resultSet.getString("NATPERS"));
		customer.setNetIncome(resultSet.getString("NET_INCOME"));
		customer.setNickName(resultSet.getString("NICK_NAME"));
		customer.setNumberOfDependents(resultSet.getString("NUMBER_OF_DEPENDENTS"));
		customer.setPaymentTerms(resultSet.getString("PAYMENT_TERMS"));
		customer.setPoBox(resultSet.getString("PO_BOX"));
		customer.setVip(resultSet.getString("VIP"));
		customer.setPostCode1(resultSet.getString("POST_CODE1"));
		customer.setPostCode2(resultSet.getString("POST_CODE2"));
		customer.setProvince(resultSet.getString("PROVINCE"));
		customer.setRebateRelevant(resultSet.getString("REBATE_RELEVANT"));
		customer.setRegion(resultSet.getString("REGION"));
		customer.setRoomnumber(resultSet.getString("ROOMNUMBER"));
		customer.setSalesOffice(resultSet.getString("SALES_OFFICE"));
		customer.setSalesOrg(resultSet.getString("SALES_ORG"));
		customer.setShippingCond(resultSet.getString("SHIPPING_COND"));
		customer.setStatus(resultSet.getString("STATUS"));
		customer.setStreet(resultSet.getString("STREET"));
		customer.setTax_Type(resultSet.getString("TAX_TYPE"));
		customer.setTaxCty(resultSet.getString("TAX_CTY"));
		customer.setTaxGroup(resultSet.getString("TAX_GROUP"));
		customer.setTaxNum(resultSet.getString("TAXNUM"));
		customer.setTaxReg(resultSet.getString("TAX_REG"));
		customer.setTaxType(resultSet.getString("TAX_TYPE"));
		customer.setTelExtens(resultSet.getString("TEL_EXTENS"));
		customer.setTittleMedi(resultSet.getString("TITLE_MEDI"));
		customer.setType(resultSet.getString("TYPE"));
		customer.setValidDatefrom(resultSet.getString("VALID_DATE_FROM"));
		customer.setValidDateTo(resultSet.getString("VALID_DATE_TO"));
		customer.setWorkPhone(resultSet.getString("WORK_PHONE"));

		return customer;

	}

	private ZVehSalesHistoryDto prepareVehicleSalesHistoryFromResultset(ResultSet resultSet) throws SQLException {
		ZVehSalesHistoryDto history = new ZVehSalesHistoryDto();

		history.setAljSuffix(resultSet.getString("ALJ_SUFFIX"));
		history.setCentre(resultSet.getString("CENTRE"));
		history.setChangedOn(resultSet.getString("CHANGED_ON"));
		history.setColor(resultSet.getString("COLOR"));
		history.setCreatedAt(resultSet.getString("CREATED_AT"));
		history.setCurrency(resultSet.getString("CURRENCY"));
		history.setCustomerBp(resultSet.getString("CUSTOMER_BP"));
		history.setCustomerDeliveryDate(resultSet.getString("CUSTOMER_DELIVERY_DATE"));
		history.setCustomerId(resultSet.getString("CUSTOMER_ID"));
		history.setDescription(resultSet.getString("DESCRIPTION"));
		history.setInvoiceCustomer(resultSet.getString("INVOICE_CUSTOMER"));
		history.setInvoiceNo(resultSet.getString("INVOICE_NO"));
		history.setMandt(resultSet.getString("MANDT"));
		history.setModelYear(resultSet.getString("MODEL_YEAR"));
		history.setNetPrice(resultSet.getString("NET_PRICE"));
		history.setOdometerReading(resultSet.getString("ODOMETER_READING"));
		history.setOrderNo(resultSet.getString("ORDER_NO"));
		history.setOrderType(resultSet.getString("ORDER_TYPE"));
		history.setPaymentTerms(resultSet.getString("PAYMENT_TERMS"));
		history.setPlantName(resultSet.getString("PLANT_NAME"));
		history.setPlateNo(resultSet.getString("PLATE_NO"));
		history.setProductId(resultSet.getString("PRODUCT_ID"));
		history.setShiptoBp(resultSet.getString("SHIPTO_BP"));
		history.setShiptoId(resultSet.getString("SHIPTO_ID"));
		history.setSoItemNumber(resultSet.getString("SO_ITEM_NUMBER"));
		history.setStatus(resultSet.getString("STATUS"));
		history.setVehicleFullDesription(resultSet.getString("VEHICLE_FULL_DESCRIPTION"));
		history.setVehicleType(resultSet.getString("VEHICLE_TYPE"));
		history.setVin(resultSet.getString("VIN"));
		history.setVinBrand(resultSet.getString("VIN_BRAND"));

		return history;
	}

	private ZCrmVehModelDto prepareVehicleModelFromResultset(ResultSet resultSet) throws SQLException {

		ZCrmVehModelDto vehicleModel = new ZCrmVehModelDto();

		// vehicleModel.setAedat(resultSet.getString(columnIndex));
		vehicleModel.setAljSuffix(resultSet.getString("ALJ_SUFFIX"));
		vehicleModel.setBody(resultSet.getString("BODY"));
		vehicleModel.setBrand(resultSet.getString("BRAND"));
		vehicleModel.setChangedAt(resultSet.getString("CHANGED_AT"));
		vehicleModel.setChangedDate(resultSet.getString("CHANGED_DATE"));
		vehicleModel.setClient(resultSet.getString("CLIENT"));
		vehicleModel.setCreatedAt(resultSet.getString("CREATED_AT"));
		// vehicleModel.setCreatedAtTmtsp(resultSet.getString(createdAtTmtsp);
		vehicleModel.setCubicCap(resultSet.getDouble("CUBIC_CAP"));
		vehicleModel.setCubicCapU(resultSet.getString("CUBIC_CAP_U"));
		vehicleModel.setCylinders(resultSet.getString("CYLINDERS"));
		vehicleModel.setDescription(resultSet.getString("DESCRIPTION"));
		vehicleModel.setDescriptionAr(resultSet.getString("DESCRIPTION_AR"));
		vehicleModel.setDoors(resultSet.getString("DOORS"));
		vehicleModel.setEmmission(resultSet.getDouble("EMMISSION"));
		vehicleModel.setEmmissionU(resultSet.getString("EMMISSION_U"));
		// vehicleModel.setErdat(resultSet.getString(erdat);
		vehicleModel.setExtColDesc(resultSet.getString("EXT_COL_DESC"));
		vehicleModel.setExtColour(resultSet.getString("EXT_COLOUR"));
		vehicleModel.setExtColourAr(resultSet.getString("EXT_COLOUR_AR"));
		vehicleModel.setFcCity(resultSet.getDouble("FC_CITY"));
		vehicleModel.setFcCityU(resultSet.getString("FC_CITY_U"));
		vehicleModel.setFcComb(resultSet.getDouble("FC_COMB"));
		vehicleModel.setFcCombU(resultSet.getString("FC_COMB_U"));
		vehicleModel.setFcRoad(resultSet.getDouble("FC_ROAD"));
		vehicleModel.setFcRoadU(resultSet.getString("FC_ROAD_U"));
		vehicleModel.setFuelType(resultSet.getString("FUEL_TYPE"));
		vehicleModel.setIntColDesc(resultSet.getString("INT_COL_DESC"));
		vehicleModel.setIntColorAr(resultSet.getString("INT_COLOUR_AR"));
		vehicleModel.setIntColour(resultSet.getString("INT_COLOUR"));
		vehicleModel.setLabvalTy(resultSet.getString("LABVAL_TY"));
		vehicleModel.setMaktx(resultSet.getString("MAKTX"));
		vehicleModel.setModelLine(resultSet.getString("MODEL_LINE"));
		vehicleModel.setModelYear(resultSet.getString("MODEL_YEAR"));
		vehicleModel.setPassengers(resultSet.getString("PASSENGERS"));
		// vehicleModel.setPerform(resultSet.getObject("PERFORM", );//check
		vehicleModel.setPerformU(resultSet.getString("PERFORM_U"));
		vehicleModel.setPowertrain(resultSet.getString("POWERTRAIN"));
		vehicleModel.setPrice(resultSet.getDouble("PRICE"));
		vehicleModel.setPriceC(resultSet.getString("PRICE_C"));
		vehicleModel.setProductId(resultSet.getString("PRODUCT_ID"));
		vehicleModel.setPurchasePrice(resultSet.getDouble("PURCHASE_PRICE"));
		vehicleModel.setRecStatus(resultSet.getString("REC_STATUS"));
		vehicleModel.setSubproduct(resultSet.getString("SUBPRODUCT"));
		vehicleModel.setTank(resultSet.getDouble("TANK"));
		vehicleModel.setTankU(resultSet.getString("TANK_U"));
		vehicleModel.setTrans(resultSet.getString("TRANS"));
		vehicleModel.setType(resultSet.getString("TYPE"));
		vehicleModel.setUsed(resultSet.getString("USED"));
		vehicleModel.setWeight(resultSet.getDouble("WEIGHT"));
		vehicleModel.setWeightMax(resultSet.getDouble("WEIGHT_MAX"));
		vehicleModel.setWeightMaxU(resultSet.getString("WEIGHT_U"));
		vehicleModel.setWeightU(resultSet.getString("WEIGHT_U"));
		vehicleModel.setZmodelHybrisId(resultSet.getString("ZMODEL_HYBRIS_ID"));
		vehicleModel.setZzcvSegmenet(resultSet.getString("ZZCV_SEGMENET"));
		// vehicleModel.setZzengineTech(resultSet.getString(zzengineTech);
		vehicleModel.setZzvcBrand(resultSet.getString("ZZVC_BRAND"));
		vehicleModel.setZzvcBrandAr(resultSet.getString("ZZVC_BRAND_AR"));
		vehicleModel.setZzvcBrandstyle(resultSet.getString("ZZVC_BRANDSTYLE"));
		vehicleModel.setZzvcBrandstyleAr(resultSet.getString("ZZVC_BRANDSTYLE_AR"));
		vehicleModel.setZzvcCountryOfOrigin(resultSet.getString("ZZCV_COUNTRY_OF_ORIGIN"));
		vehicleModel.setZzvcCountryOfOriginEn(resultSet.getString("ZZCV_COUNTRY_OF_ORIGIN_EN"));
		vehicleModel.setZzvcEngineSize(resultSet.getString("ZZVC_ENGINE_SIZE"));
		vehicleModel.setZzvcFueltype(resultSet.getString("ZZVC_FUELTYPE"));
		vehicleModel.setZzvcFueltypeAr(resultSet.getString("ZZVC_FUELTYPE_AR"));
		vehicleModel.setZzvcGrade(resultSet.getString("ZZVC_GRADE"));
		vehicleModel.setZzvcGradeAr(resultSet.getString("ZZVC_GRADE_AR"));
		vehicleModel.setZzvcModelCode(resultSet.getString("ZZVC_MODEL_CODE"));
		vehicleModel.setZzvcPowertrain(resultSet.getString("ZZVC_POWERTRAIN"));
		vehicleModel.setZzvcPowertrainAr(resultSet.getString("ZZVC_POWERTRAIN_AR"));
		vehicleModel.setZzvcProduct(resultSet.getString("ZZVC_PRODUCT"));
		vehicleModel.setZzvcProductAr(resultSet.getString("ZZVC_PRODUCT_AR"));
		vehicleModel.setZzvcSegmenetAr(resultSet.getString("ZZCV_SEGMENET_AR"));
		vehicleModel.setZzvcTransmission(resultSet.getString("ZZVC_TRANSMISSION"));
		vehicleModel.setZzvcTransmissionAr(resultSet.getString("ZZVC_TRANSMISSION_AR"));
		vehicleModel.setZzcvCountryOfOriginAr(resultSet.getString("ZZCV_COUNTRY_OF_ORIGIN_AR"));

		return vehicleModel;

	}

	private ZCrmVehMasterDto prepareVehicleMasterFromResultset(ResultSet resultSet) throws SQLException {

		ZCrmVehMasterDto vehicleMaster = new ZCrmVehMasterDto();

		vehicleMaster.setAcceDate(resultSet.getString("ACCE_DATE"));
		vehicleMaster.setAcceValue(resultSet.getString("ACCE_VALUE"));
		vehicleMaster.setAedat(resultSet.getString("AEDAT"));
		vehicleMaster.setArrivedatndcdate(resultSet.getString("ARRIVEDATNDCDATE"));
		vehicleMaster.setBody(resultSet.getString("BODY"));
		vehicleMaster.setBrand(resultSet.getString("BRAND"));
		vehicleMaster.setCaseNo(resultSet.getString("CASE_NO"));
		vehicleMaster.setCentre(resultSet.getString("CENTRE"));
		vehicleMaster.setChangedAt(resultSet.getString("CHANGED_AT"));
		vehicleMaster.setChangedDate(resultSet.getString("CHANGED_DATE"));
		vehicleMaster.setChassisNo(resultSet.getString("CHASSIS_NO"));
		vehicleMaster.setClient(resultSet.getString("CLIENT"));
		vehicleMaster.setCmpre(resultSet.getDouble("CMPRE"));
		vehicleMaster.setComment1(resultSet.getString("COMMENT1"));
		vehicleMaster.setCompanyId(resultSet.getString("COMPANY_ID"));
		vehicleMaster.setCreatedAt(resultSet.getString("CREATED_AT"));
		vehicleMaster.setCubicCap(resultSet.getDouble("CUBIC_CAP"));
		vehicleMaster.setCubicCapU(resultSet.getString("CUBIC_CAP_U"));
		vehicleMaster.setCylinders(resultSet.getString("CYLINDERS"));
		vehicleMaster.setDescription(resultSet.getString("DESCRIPTION"));
		vehicleMaster.setDescriptionAr(resultSet.getString("DESCRIPTION_AR"));
		vehicleMaster.setDoors(resultSet.getString("DOORS"));
		vehicleMaster.setDriver(resultSet.getString("DRIVER"));
		vehicleMaster.setDriverId(resultSet.getString("DRIVER_ID"));
		vehicleMaster.setEmmission(resultSet.getDouble("EMMISSION"));
		vehicleMaster.setEmmissionU(resultSet.getString("EMMISSION_U"));
		vehicleMaster.setEngineNo(resultSet.getString("ENGINE_NO"));
		vehicleMaster.setEuInvNo(resultSet.getString("EU_INV_NO"));
		vehicleMaster.setEuinvoicedate(resultSet.getString("EUINVOICEDATE"));
		vehicleMaster.setExtColour(resultSet.getString("EXT_COLOUR"));
		vehicleMaster.setExtNo(resultSet.getString("EXT_NO"));
		vehicleMaster.setExtColourCode(resultSet.getString("EXT_COLOUR_CODE"));
		vehicleMaster.setFcCity(resultSet.getDouble("FC_CITY"));
		vehicleMaster.setFcCityU(resultSet.getString("FC_CITY_U"));
		vehicleMaster.setFcComb(resultSet.getDouble("FC_COMB"));
		vehicleMaster.setFcRoad(resultSet.getDouble("FC_ROAD"));
		vehicleMaster.setFcCombU(resultSet.getString("FC_COMB_U"));
		vehicleMaster.setFcRoadU(resultSet.getString("FC_ROAD_U"));
		vehicleMaster.setFuelType(resultSet.getString("FUEL_TYPE"));
		vehicleMaster.setGrade(resultSet.getString("GRADE"));
		vehicleMaster.setGtlocation(resultSet.getString("GTLOCATION"));
		vehicleMaster.setGtnumber(resultSet.getString("GTNUMBER"));
		vehicleMaster.setGtp(resultSet.getString("GTP"));
		vehicleMaster.setInsStart(resultSet.getString("INS_START"));
		vehicleMaster.setIntColour(resultSet.getString("INT_COLOUR"));
		vehicleMaster.setIntColourCode(resultSet.getString("INT_COLOUR_CODE"));
		vehicleMaster.setIsavailableforsale(resultSet.getString("ISAVAILABLEFORSALE"));
		vehicleMaster.setIsdamaged(resultSet.getString("ISDAMAGED"));
		vehicleMaster.setIsinvoiced(resultSet.getString("ISINVOICED"));
		vehicleMaster.setLandedCost(resultSet.getString("LANDED_COST"));
		vehicleMaster.setLocation(resultSet.getString("LOCATION"));
		vehicleMaster.setLpcolour(resultSet.getString("LPCOLOUR"));
		vehicleMaster.setLpcountr(resultSet.getString("LPCOUNTR"));
		vehicleMaster.setLpno(resultSet.getString("LPNO"));
		vehicleMaster.setLpregion(resultSet.getString("LPREGION"));
		vehicleMaster.setMmsta(resultSet.getString("MMSTA"));
		vehicleMaster.setModelLine(resultSet.getString("MODEL_LINE"));
		vehicleMaster.setModelYear(resultSet.getString(""));
		vehicleMaster.setNdcdispatchdate(resultSet.getString("NDCDISPATCHDATE"));
		vehicleMaster.setNdcInvNo(resultSet.getString("NDC_INV_NO"));
		vehicleMaster.setNdcinvoicedate(resultSet.getString("NDCINVOICEDATE"));
		vehicleMaster.setOdometer(resultSet.getDouble("ODOMETER"));
		vehicleMaster.setOwner(resultSet.getString("OWNER"));
		vehicleMaster.setOwnerId(resultSet.getString("OWNER_ID"));
		vehicleMaster.setOwnerLoc(resultSet.getString("OWNER_LOC"));
		vehicleMaster.setPassengers(resultSet.getString("PASSENGERS"));
		vehicleMaster.setPerform(resultSet.getDouble("PERFORM"));
		vehicleMaster.setPerformU(resultSet.getString("PERFORM_U"));
		vehicleMaster.setPowertrain(resultSet.getString("POWERTRAIN"));
		vehicleMaster.setPrice(resultSet.getString("PRICE"));
		vehicleMaster.setPriceC(resultSet.getString("PRICE_C"));
		vehicleMaster.setPriceRetail(resultSet.getString("PRICE_RETAIL"));
		vehicleMaster.setPriceWholesale(resultSet.getString("PRICE_WHOLESALE"));
		vehicleMaster.setProductId(resultSet.getString("PRODUCT_ID"));
		vehicleMaster.setRecStatus(resultSet.getString("REC_STATUS"));
		vehicleMaster.setRefProduct(resultSet.getString("REF_PRODUCT"));
		vehicleMaster.setRegdate(resultSet.getString("REGDATE"));
		vehicleMaster.setRegionId(resultSet.getString("REGION_ID"));
		vehicleMaster.setRegType(resultSet.getString("REG_TYPE"));
		vehicleMaster.setSdsta(resultSet.getString("SDSTA"));
		vehicleMaster.setStatus(resultSet.getString("STATUS"));
		vehicleMaster.setTank(resultSet.getDouble("TANK"));
		vehicleMaster.setTankU(resultSet.getString("TANK_U"));
		vehicleMaster.setTrans(resultSet.getString("TRANS"));
		vehicleMaster.setType(resultSet.getString("TYPE"));
		vehicleMaster.setUsed(resultSet.getString("USED"));
		vehicleMaster.setVehUsage(resultSet.getString("VEH_USAGE"));
		vehicleMaster.setVin(resultSet.getString("VIN"));
		vehicleMaster.setWaers(resultSet.getString("WAERS"));
		vehicleMaster.setWarCat(resultSet.getString("WAR_CAT"));
		vehicleMaster.setWarEnt(resultSet.getString("WAR_ENT"));
		vehicleMaster.setWarPeriod(resultSet.getDouble("WAR_PERIOD"));
		vehicleMaster.setWarPeriodU(resultSet.getString("WAR_PERIOD_U"));
		vehicleMaster.setWarStart(resultSet.getString("WAR_START"));
		vehicleMaster.setWaxDate(resultSet.getString("WAX_DATE"));
		vehicleMaster.setWeight(resultSet.getDouble("WEIGHT"));
		vehicleMaster.setWeightMax(resultSet.getDouble("WEIGHT_MAX"));
		vehicleMaster.setWeightMaxU(resultSet.getString("WEIGHT_MAX_U"));
		vehicleMaster.setWeightU(resultSet.getString("WEIGHT_U"));
		vehicleMaster.setZzvcTrim(resultSet.getString("ZZVC_TRIM"));

		return vehicleMaster;
	}

	private ZDbmOrdCrmServiceDto prepareServiceFromResultset(ResultSet resultSet) throws SQLException {

		ZDbmOrdCrmServiceDto service = new ZDbmOrdCrmServiceDto();

		service.setAction(resultSet.getString("ACTION"));
		service.setAppdte(resultSet.getString("APPDTE"));
		service.setAudat(resultSet.getString("AUDAT"));
		service.setAufart(resultSet.getString("AUFART"));
		service.setAugru(resultSet.getString("AUGRU"));
		service.setAugruShd(resultSet.getString("AUGRU_SHD"));
		service.setBezei(resultSet.getString("BEZEI"));
		service.setBrtwr(resultSet.getString("BRTWR"));
		service.setCarwshstat(resultSet.getString("CARWSHSTAT"));
		service.setChangedAt(resultSet.getString("CHANGED_AT"));
		service.setCheckinid(resultSet.getString("CHECKINID"));
		service.setCheckinidno(resultSet.getString("CHECKINIDNO"));
		service.setChieftech(resultSet.getString("CHIEFTECH"));
		service.setChieftechidno(resultSet.getString("CHIEFTECHIDNO"));
		service.setCntarvdte(resultSet.getString("CNTARVDTE"));
		service.setContpers(resultSet.getString("CONTPERS"));
		service.setContpersidno(resultSet.getString("CONTPERSIDNO"));
		service.setContritm(resultSet.getString("CONTRITM"));
		service.setContrno(resultSet.getString("CONTRNO"));
		service.setCreatedAt(resultSet.getString("CREATED_AT"));
		service.setCstdeldte(resultSet.getString("CSTDELDTE"));
		service.setDispatchdte(resultSet.getString("DISPATCHDTE"));
		service.setHstat(resultSet.getString("HSTAT"));
		service.setInvdte(resultSet.getString("INVDTE"));
		service.setInvoiceno(resultSet.getString("INVOICENO"));
		service.setJob(resultSet.getString("JOB"));
		service.setJobcardno(resultSet.getString("JOBCARDNO"));
		service.setKunnr(resultSet.getString("KUNNR"));
		service.setKunwe(resultSet.getString("KUNWE"));
		service.setLabcost(resultSet.getString("LABCOST"));
		service.setLcdisc(resultSet.getString("LCDISC"));
		service.setLdisc(resultSet.getString("LDISC"));
		service.setLicpl(resultSet.getString("LICPL"));
		service.setLogsys(resultSet.getString("LOGSYS"));
		service.setLretpr(resultSet.getString("LRETPR"));
		service.setLwtyclm(resultSet.getString("LWTYCLM"));
		service.setMandt(resultSet.getString("MANDT"));
		service.setMileage(resultSet.getString("MILEAGE"));
		service.setMileageUom(resultSet.getString("MILEAGE_UOM"));
		service.setMobileno(resultSet.getString("MOBILENO"));
		service.setName1(resultSet.getString("NAME1"));
		service.setOcdisc(resultSet.getString("OCDISC"));
		service.setOdisc(resultSet.getString("ODISC"));
		service.setOlcdisc(resultSet.getString("OLCDISC"));
		service.setOldisc(resultSet.getString("OLDISC"));
		service.setOlretpr(resultSet.getString("OLRETPR"));
		service.setOlwtyclm(resultSet.getString("OWTYCLM"));
		service.setOretpr(resultSet.getString("ORETPR"));
		service.setOwtyclm(resultSet.getString("OLWTYCLM"));
		service.setPartscost(resultSet.getString("PARTSCOST"));
		service.setPcdisc(resultSet.getString("PCDISC"));
		service.setPdisc(resultSet.getString("PDISC"));
		service.setPlcompldte(resultSet.getString("PLCOMPLDTE"));
		service.setPretpr(resultSet.getString("PRETPR"));
		service.setPwtyclm(resultSet.getString("PWTYCLM"));
		service.setSchwin(resultSet.getString("SCHWIN"));
		service.setServadv(resultSet.getString("SERVADV"));
		service.setServadvidno(resultSet.getString("SERVADVIDNO"));
		service.setShiptoid(resultSet.getString("SHIPTOID"));
		service.setTech(resultSet.getString("TECH"));
		service.setTechidno(resultSet.getString("TECHIDNO"));
		service.setUnderwty(resultSet.getString("UNDERWTY"));
		service.setVbeln(resultSet.getString("VBELN"));
		service.setVehloc(resultSet.getString("VEHLOC"));
		service.setVhvin(resultSet.getString("VHVIN"));
		service.setVkorg(resultSet.getString("VKORG"));
		service.setWaerk(resultSet.getString("WAERK"));
		service.setWarranty(resultSet.getString("WARRANTY"));
		service.setWerks(resultSet.getString("WERKS"));
		service.setWshoptext(resultSet.getString("WSHOPTEXT"));
		service.setZterm(resultSet.getString("ZTERM"));

		return service;
	}
}
