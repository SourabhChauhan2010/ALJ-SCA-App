package com.incture.alj;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("alj/test")
public class TestController {

	@Autowired
	TestRepository repo;

	@GetMapping("/appStatus")
	public String test() {
		return "App is running.";
	}

	@PostMapping("/save")
	public TestEntity saveData(@RequestBody TestEntity request) {
		TestEntity savedData = repo.save(request);
		return savedData;
	}

}
