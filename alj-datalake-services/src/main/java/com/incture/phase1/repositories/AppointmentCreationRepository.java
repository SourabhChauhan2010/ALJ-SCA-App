package com.incture.phase1.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.incture.phase1.entities.AppointmentEntity;

@Repository
public interface AppointmentCreationRepository extends JpaRepository<AppointmentEntity, Long> {

//	List<AppointmentEntity> findByCustomerEmail(String email);

//	List<AppointmentEntity> findByCustomerEmailAndVehicleIdNumber(String emailId, String vechileId);

	List<AppointmentEntity> findByCustomerNumber(String customerNumber);

	List<AppointmentEntity> findByCustomerNumberAndVehicleIdNumber(String customerNumber, String vechileId);
}