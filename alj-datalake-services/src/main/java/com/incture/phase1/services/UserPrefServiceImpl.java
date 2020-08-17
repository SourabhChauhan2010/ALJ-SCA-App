package com.incture.phase1.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.incture.phase1.entities.UserPrefEntity;
import com.incture.phase1.repositories.UserPrefRepository;

@Service
public class UserPrefServiceImpl implements UserPrefService {

	@Autowired
	UserPrefRepository userRepo;
	
	@Override
	public ResponseEntity<?> getUserPreferences(String ownerId) {

		if(ownerId == null || ownerId.isEmpty()) {
			return new ResponseEntity<>("Invalid owner id.", HttpStatus.BAD_REQUEST);
		}
		
//		List<UserPrefEntity> response = userRepo.findByOwnerId(ownerId);
		UserPrefEntity response = userRepo.findByOwnerId(ownerId);

		if (response == null) {
			return new ResponseEntity<>("No record found", HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> updateUserPreference(UserPrefEntity request) {
		UserPrefEntity existingData = userRepo.findByOwnerId(request.getOwnerId());
	
		if(existingData == null) {
			
		}
		return null;
	}

}
