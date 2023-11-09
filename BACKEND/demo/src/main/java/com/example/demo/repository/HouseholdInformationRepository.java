package com.example.demo.repository;

import com.example.demo.entity.HouseholdInformationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HouseholdInformationRepository extends JpaRepository<HouseholdInformationEntity,Long> {

    @Query("SELECT u FROM HouseholdInformationEntity u WHERE u.address LIKE %:customSubstring% OR " +
            "u.householdHeadId LIKE %:customSubstring% OR u.streets LIKE %:customSubstring% OR " +
            "u.totalResidents = :customLong")
    List<HouseholdInformationEntity> searchCustomQuery(@Param("customSubstring") String customSubstring, @Param("customLong") Long customLong);

    @Modifying
    @Query("UPDATE HouseholdInformationEntity u SET u.address = :address, u.householdHeadId = :householdHeadId, " +
            "u.totalResidents = :totalResidents, u.streets = :streets WHERE u.householdId = :id")
    void updateData(@Param("id") long householdId,
                    @Param("address") String address,
                    @Param("householdHeadId") String householdHeadId,
                    @Param("totalResidents") long totalResidents,
                    @Param("streets") String streets);
    void deleteByHouseholdId(long householdId);
}
