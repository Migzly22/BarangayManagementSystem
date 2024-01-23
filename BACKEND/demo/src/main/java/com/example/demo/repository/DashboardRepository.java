package com.example.demo.repository;

import com.example.demo.entity.DocumentsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DashboardRepository extends JpaRepository<DocumentsEntity,Long> {

    @Query("SELECT COUNT(u.incidentId) as Data FROM IncidentReportEntity u ")
    List<Object[]> incident();//

    @Query("SELECT COUNT(u.documentId) as Data FROM DocumentsEntity u ")
    List<Object[]> document();//

    @Query("SELECT COUNT(u.residentId) as Data FROM ResidentsEntity u ")
    List<Object[]> residents();//

    @Query("SELECT u, a, i FROM DocumentsEntity u LEFT JOIN ResidentsEntity a ON u.residentId = a.residentId LEFT JOIN HouseholdInformationEntity i ON a.householdId = i.householdId "  +
            "where u.status = 'Pending'")
    List<Object[]> selectAll();//

}
