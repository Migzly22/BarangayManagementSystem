package com.example.demo.repository;

import com.example.demo.entity.IncidentReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncidentReportRepository extends JpaRepository<IncidentReportEntity,Long> {
}
