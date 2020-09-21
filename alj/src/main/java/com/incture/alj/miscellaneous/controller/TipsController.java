package com.incture.alj.miscellaneous.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.incture.alj.miscellaneous.entities.TipsEntity;
import com.incture.alj.miscellaneous.services.TipsService;

@RestController
@RequestMapping("alj/misc")
public class TipsController {

	@Autowired
	TipsService service;
	
	@GetMapping("/tips/test")
	public String test() {
		return "Tips service is running.";
	}
	
	@GetMapping("/tips")
	public ResponseEntity<?> getAllTips() {
		return service.getAllTips();
	}
	
	@PostMapping("/tips")
	public ResponseEntity<?> addTips(@RequestBody List<TipsEntity> request) {
		return service.addTips(request);
	}
	
	@PutMapping("/tips")
	public ResponseEntity<?> updateTips(TipsEntity request) {
		return service.updateTips(request);
	}
	 
	@DeleteMapping("/tips")
	public ResponseEntity<?> deleteTips() {
		return null;
	}
}
