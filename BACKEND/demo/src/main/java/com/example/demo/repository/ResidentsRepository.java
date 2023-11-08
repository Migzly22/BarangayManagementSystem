package com.example.demo.repository;

import com.example.demo.entity.ResidentsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResidentsRepository extends JpaRepository<ResidentsEntity,Long> {
    ResidentsEntity findByUserId(long userId);

    @Query("SELECT u FROM ResidentsEntity u WHERE u.firstName LIKE %:customSubstring% OR " +
            "u.middleName LIKE %:customSubstring% OR u.lastName LIKE %:customSubstring% OR " +
            "u.dateOfBirth LIKE %:customSubstring% OR u.gender LIKE %:customSubstring% OR " +
            "u.phoneNumber LIKE %:customSubstring% OR u.email LIKE %:customSubstring% OR " +
            "u.householdId = :customLong OR u.userId = :customLong")
    List<ResidentsEntity> searchCustomQuery(@Param("customSubstring") String customSubstring, @Param("customLong") Long customLong);

}
