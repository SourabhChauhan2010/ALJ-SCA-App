package com.incture.alj.miscellaneous.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.incture.alj.miscellaneous.entities.FaqEntity;

@Repository
public interface FaqRepository extends JpaRepository<FaqEntity, Long>{

}
