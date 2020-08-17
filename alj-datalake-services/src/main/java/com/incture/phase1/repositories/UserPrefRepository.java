package com.incture.phase1.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.incture.phase1.entities.UserPrefEntity;

@Repository
public interface UserPrefRepository extends JpaRepository<UserPrefEntity, Long> {
	UserPrefEntity findByOwnerId(String ownerId);
}
