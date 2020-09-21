package com.incture.alj.miscellaneous.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.incture.alj.miscellaneous.entities.TipsEntity;

public interface TipsService {

	ResponseEntity<?> getAllTips();

	ResponseEntity<?> addTips(List<TipsEntity> request);

	ResponseEntity<?> updateTips(TipsEntity request);

}
