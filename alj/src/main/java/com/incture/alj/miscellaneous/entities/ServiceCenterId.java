package com.incture.alj.miscellaneous.entities;

import java.io.Serializable;

public class ServiceCenterId implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String region;
	private String city;
	private String physicalB;
	
	public ServiceCenterId() {
		
	}

	public ServiceCenterId(String region, String city, String physicalB) {
		super();
		this.region = region;
		this.city = city;
		this.physicalB = physicalB;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((city == null) ? 0 : city.hashCode());
		result = prime * result + ((physicalB == null) ? 0 : physicalB.hashCode());
		result = prime * result + ((region == null) ? 0 : region.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ServiceCenterId other = (ServiceCenterId) obj;
		if (city == null) {
			if (other.city != null)
				return false;
		} else if (!city.equals(other.city))
			return false;
		if (physicalB == null) {
			if (other.physicalB != null)
				return false;
		} else if (!physicalB.equals(other.physicalB))
			return false;
		if (region == null) {
			if (other.region != null)
				return false;
		} else if (!region.equals(other.region))
			return false;
		return true;
	}
	
	
}
