package com.incture.phase1.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.incture.phase1.entities.VehicleMasterEntity;

@Repository
public interface VehicleMasterRepository extends JpaRepository<VehicleMasterEntity, String> {

	List<VehicleMasterEntity> findByOwnerId(String ownerId);

	VehicleMasterEntity findByVehicleId(String vehicleId);

}
