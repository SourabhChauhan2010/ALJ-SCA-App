package com.incture.phase1.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.incture.phase1.entities.PackageMasterEntity;
import com.incture.phase1.models.ServiceTypeResponse;

@Repository
public interface PackageMasterRepository extends JpaRepository<PackageMasterEntity, Long> {

	@Query(value = "Select DISTINCT (p.packageId), p.packageType FROM PackageMasterEntity p")
	List<ServiceTypeResponse> getServiceType();		// ? on field email. email is not available
}
