package com.incture.alj.miscellaneous.services;

import org.springframework.http.ResponseEntity;

import com.incture.alj.miscellaneous.entities.FaqEntity;

public interface FaqService {

	ResponseEntity<?> getAllFAQs();

	ResponseEntity<?> createNewFaqEntry(FaqEntity request);

}
