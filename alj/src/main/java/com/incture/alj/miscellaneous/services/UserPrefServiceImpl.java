package com.incture.alj.miscellaneous.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.incture.alj.miscellaneous.entities.UserPrefEntity;
import com.incture.alj.miscellaneous.repositories.UserPrefRepository;

@Service
public class UserPrefServiceImpl implements UserPrefService {

	@Autowired
	UserPrefRepository userRepo;
	
	@Override
	public ResponseEntity<?> getUserPreferences(String ownerId) {

		System.err.println("> getUserPreferences method is called.");
		
		if(ownerId == null || ownerId.isEmpty()) {
			return new ResponseEntity<>("Invalid owner id.", HttpStatus.BAD_REQUEST);
		}
		
//		List<UserPrefEntity> response = userRepo.findByOwnerId(ownerId);
		UserPrefEntity response = userRepo.findByOwnerId(ownerId);

		System.err.println("> getUserPreferences method response : " + response);
		
		if (response == null) {
			return new ResponseEntity<>("No record found", HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> updateUserPreference(UserPrefEntity request) {
		UserPrefEntity existingData = userRepo.findByOwnerId(request.getOwnerId());
	
		if(existingData == null) {
			return new ResponseEntity<>("No record found", HttpStatus.NO_CONTENT);
		}
		
		existingData.setPrefLanguage(request.getPrefLanguage() != null ? request.getPrefLanguage() : "");
		existingData.setPrefServiceCenter(request.getPrefServiceCenter() != null ? request.getPrefServiceCenter() : "");
		existingData.setPrefVehicle(request.getPrefVehicle() != null ? request.getPrefVehicle() : "");
		
		UserPrefEntity updatedData = userRepo.save(existingData);
		
		return new ResponseEntity<>(updatedData, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> saveUserPreference(UserPrefEntity request) {
		UserPrefEntity existingData = userRepo.findByOwnerId(request.getOwnerId());
		
		if(existingData != null) {
			return new ResponseEntity<>("Record already exist.", HttpStatus.CONFLICT);
		}
		
		UserPrefEntity savedEntity = userRepo.save(request);
		
		return new ResponseEntity<>(savedEntity, HttpStatus.CREATED);
	}

}
