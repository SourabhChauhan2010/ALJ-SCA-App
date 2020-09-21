package com.incture.alj.miscellaneous.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.incture.alj.miscellaneous.entities.TipsEntity;

@Repository
public interface TipsRepository extends JpaRepository<TipsEntity, Long> {

	TipsEntity findByTipsId(Long id);
}
