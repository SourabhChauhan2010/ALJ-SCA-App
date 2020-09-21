package com.incture.alj.miscellaneous.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.incture.alj.miscellaneous.entities.FaqEntity;
import com.incture.alj.miscellaneous.repositories.FaqRepository;


@Service
public class FaqServiceImpl implements FaqService {

	@Autowired
	FaqRepository repository;

	@Override
	public ResponseEntity<?> getAllFAQs() {
		List<FaqEntity> response = repository.findAll();

		if (response.size() == 0 || response == null)
			return new ResponseEntity<>("No record found", HttpStatus.NO_CONTENT);

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> createNewFaqEntry(FaqEntity request) {

		if (request == null) return new ResponseEntity<>("Incorrect input provided.", HttpStatus.BAD_REQUEST);   
		
//		Timestamp timestamp = new Timestamp(System.currentTimeMillis());		
		request.setLastUpdatedOn(System.currentTimeMillis());
		
		FaqEntity savedRecord = repository.save(request);
		
		return new ResponseEntity<>(savedRecord, HttpStatus.CREATED);
	}

}
