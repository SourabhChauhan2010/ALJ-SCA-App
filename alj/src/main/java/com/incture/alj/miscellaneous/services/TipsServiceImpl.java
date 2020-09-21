package com.incture.alj.miscellaneous.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.incture.alj.miscellaneous.entities.TipsEntity;
import com.incture.alj.miscellaneous.repositories.TipsRepository;

@Service
public class TipsServiceImpl implements TipsService {

	@Autowired
	TipsRepository repository;
	
	@Override
	public ResponseEntity<?> getAllTips() {
		
		List<TipsEntity> response = repository.findAll();
		if (response.size() == 0 || response == null) return new ResponseEntity<>("No record found", HttpStatus.NO_CONTENT);
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> addTips(List<TipsEntity> request) {
		List<TipsEntity> savedRecord = repository.saveAll(request);
		
		if(savedRecord.size() == 0 || savedRecord == null) {
			return new ResponseEntity<>("Something went wrong.", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<>(savedRecord, HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<?> updateTips(TipsEntity request) {
		TipsEntity existingRecord = repository.findByTipsId(request.getId());

		if(existingRecord == null) {
			return new ResponseEntity<>("No record found", HttpStatus.NO_CONTENT);
		} else {
			existingRecord.setTitle(request.getTitle());
			existingRecord.setDesc(request.getDesc());
			existingRecord.setLanguage(request.getLanguage());
			existingRecord.setActive(request.isActive());
		}
		
		TipsEntity savedRecord = repository.save(existingRecord);
		
		if (savedRecord == null)new ResponseEntity<>("Something went wrong.", HttpStatus.NOT_MODIFIED);
		
		return new ResponseEntity<>(savedRecord, HttpStatus.OK);
	}

}
