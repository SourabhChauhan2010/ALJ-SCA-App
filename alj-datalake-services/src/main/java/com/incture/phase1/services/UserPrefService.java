package com.incture.phase1.services;

import org.springframework.http.ResponseEntity;

import com.incture.phase1.entities.UserPrefEntity;

public interface UserPrefService {

	ResponseEntity<?> getUserPreferences(String ownerId);

	ResponseEntity<?> updateUserPreference(UserPrefEntity request);

}
