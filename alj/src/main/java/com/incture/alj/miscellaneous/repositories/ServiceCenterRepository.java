package com.incture.alj.miscellaneous.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.incture.alj.miscellaneous.entities.ServiceCenter;
import com.incture.alj.miscellaneous.entities.ServiceCenterId;

@Repository
public interface ServiceCenterRepository extends JpaRepository<ServiceCenter, ServiceCenterId> {

	@Query("SELECT DISTINCT p.region FROM ServiceCenter p ORDER BY p.region ASC")
	List<String> findDistinctRegion();
	
	List<ServiceCenter> findByRegion(String region);	
}
