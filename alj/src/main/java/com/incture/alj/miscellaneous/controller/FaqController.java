package com.incture.alj.miscellaneous.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.incture.alj.miscellaneous.entities.FaqEntity;
import com.incture.alj.miscellaneous.services.FaqService;


@RestController
@RequestMapping("alj/misc/faq")
public class FaqController {

	@Autowired
	FaqService service;
	
	@GetMapping("/test")
	public String test() {
		return "FAQ is running perfectly.";
	}
	
	@GetMapping("/all")
	public ResponseEntity<?> getAllFAQs() {
		return service.getAllFAQs();
	}
	
	@PostMapping("/create")
	public ResponseEntity<?> createNewFaqEntry(@RequestBody FaqEntity request) {
		return service.createNewFaqEntry(request);
	}
}
