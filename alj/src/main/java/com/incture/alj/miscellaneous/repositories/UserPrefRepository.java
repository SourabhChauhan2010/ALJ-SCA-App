package com.incture.alj.miscellaneous.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.incture.alj.miscellaneous.entities.UserPrefEntity;


@Repository
public interface UserPrefRepository extends JpaRepository<UserPrefEntity, Long> {
	UserPrefEntity findByOwnerId(String ownerId);
}
