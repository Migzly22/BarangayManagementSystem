package com.example.demo.repository;

import com.example.demo.entity.ResidentsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResidentsRepository extends JpaRepository<ResidentsEntity,Long> {
}
