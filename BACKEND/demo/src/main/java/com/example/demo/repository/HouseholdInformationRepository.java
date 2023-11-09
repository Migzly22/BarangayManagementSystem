package com.example.demo.repository;

import com.example.demo.entity.HouseholdInformationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
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

    void deleteByHouseholdId(long householdId);
}
