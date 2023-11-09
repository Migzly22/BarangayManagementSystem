package com.example.demo.repository;

import com.example.demo.entity.IncidentReportEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IncidentReportRepository extends JpaRepository<IncidentReportEntity,Long> {
    @Query("SELECT u FROM IncidentReportEntity u WHERE u.description LIKE %:customSubstring% OR " +
            "u.dateTimeOccured LIKE %:customSubstring% OR u.dateReported LIKE %:customSubstring% OR " +
            "u.status LIKE %:customSubstring% OR " +
            "u.residentId = :customLong")
    List<IncidentReportEntity> searchCustomQuery(@Param("customSubstring") String customSubstring, @Param("customLong") Long customLong);

    void deleteByIncidentId(long incidentId);
}
