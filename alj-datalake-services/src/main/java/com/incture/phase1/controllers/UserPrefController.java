package com.incture.phase1.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.incture.phase1.entities.UserPrefEntity;
import com.incture.phase1.services.UserPrefService;

@RestController
@RequestMapping("/pref")
public class UserPrefController {

	@Autowired
	UserPrefService prefService;
	
	@GetMapping
	public ResponseEntity<?> getUserPreferences(String ownerId) {
		return prefService.getUserPreferences(ownerId);
	}
	
	@PutMapping
	public ResponseEntity<?> updateUserPreference(UserPrefEntity request) {
		return prefService.updateUserPreference(request);
	}
}
