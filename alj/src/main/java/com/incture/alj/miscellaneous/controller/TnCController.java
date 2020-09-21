package com.incture.alj.miscellaneous.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.incture.alj.utils.MiscConstants;

@RestController
@RequestMapping("alj/misc/tnc")
public class TnCController {

	@GetMapping
	public String getTnC() {
		return MiscConstants.TNC;
	}
}
