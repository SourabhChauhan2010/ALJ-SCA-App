package com.incture.alj.miscellaneous.services;

import org.springframework.http.ResponseEntity;

import com.incture.alj.miscellaneous.entities.UserPrefEntity;

public interface UserPrefService {

	ResponseEntity<?> getUserPreferences(String ownerId);

	ResponseEntity<?> updateUserPreference(UserPrefEntity request);

	ResponseEntity<?> saveUserPreference(UserPrefEntity request);

}
