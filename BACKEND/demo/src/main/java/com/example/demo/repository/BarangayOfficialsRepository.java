package com.example.demo.repository;

import com.example.demo.entity.BarangayOfficialsEntity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BarangayOfficialsRepository extends JpaRepository<BarangayOfficialsEntity,Long> {
    @Modifying
    @Query("UPDATE BarangayOfficialsEntity u SET " +
            "u.residentId = :residentId, u.position = :position, " +
            "u.startDate = :startDate, u.endDate = :endDate, " +
            "u.electedOrAppointed = :electedOrAppointed " +
            "WHERE u.officialId = :id")
    void updateData(@Param("id") long officialId,
                    @Param("residentId") long residentId,
                    @Param("position") String position,
                    @Param("startDate") String startDate,
                    @Param("endDate") String endDate,
                    @Param("electedOrAppointed") String electedOrAppointed);
    void deleteByOfficialId(long officialId);


    @Query("Select u, a FROM BarangayOfficialsEntity u LEFT JOIN ResidentsEntity a ON u.residentId = a.residentId")
    List<Object[]> showAllOfficials();
}
