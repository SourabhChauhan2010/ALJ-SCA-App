package com.incture.alj.miscellaneous.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.incture.alj.miscellaneous.entities.UserPrefEntity;
import com.incture.alj.miscellaneous.services.UserPrefService;

@RestController
@RequestMapping("alj/misc")
public class UserPrefController {

	@Autowired
	UserPrefService prefService;
	
	@GetMapping("/pref/test")
	public String test() {
		return "Running perfectly...";
	}
	
	@GetMapping("/pref/{ownerId}")
	public ResponseEntity<?> getUserPreferences(@PathVariable String ownerId) {
		return prefService.getUserPreferences(ownerId);
	}
	
	@PostMapping("/pref")
	public ResponseEntity<?> saveUserPreference(@RequestBody UserPrefEntity request) {
		return prefService.saveUserPreference(request);
	}
	
	@PutMapping("/pref")
	public ResponseEntity<?> updateUserPreference(@RequestBody UserPrefEntity request) {
		return prefService.updateUserPreference(request);
	}
}
