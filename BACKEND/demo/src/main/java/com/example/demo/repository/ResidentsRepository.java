package com.example.demo.repository;

import com.example.demo.entity.ResidentsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResidentsRepository extends JpaRepository<ResidentsEntity,Long> {
    ResidentsEntity findByUserId(long userId);

    @Query("SELECT u, a  FROM ResidentsEntity u LEFT JOIN HouseholdInformationEntity a ON u.householdId = a.householdId WHERE u.firstName LIKE %:customSubstring% OR " +
            "u.middleName LIKE %:customSubstring% OR u.lastName LIKE %:customSubstring% OR " +
            "u.dateOfBirth LIKE %:customSubstring% OR u.gender LIKE %:customSubstring% OR " +
            "u.phoneNumber LIKE %:customSubstring% OR u.email LIKE %:customSubstring% OR a.address LIKE %:customSubstring%")
    List<Object[]> searchCustomQuery(@Param("customSubstring") String customSubstring);

    @Modifying
    @Query("UPDATE ResidentsEntity u SET " +
            "u.firstName = :firstName, u.middleName = :middleName, " +
            "u.lastName = :lastName, u.dateOfBirth = :dateOfBirth, " +
            "u.gender = :gender, u.phoneNumber = :phoneNumber, " +
            "u.email = :email, u.householdId = :householdId, " +
            "u.userId = :userId " +
            "WHERE u.residentId = :id")
    void updateData(@Param("id") long residentId,
                    @Param("firstName") String firstName,
                    @Param("middleName") String middleName,
                    @Param("lastName") String lastName,
                    @Param("dateOfBirth") String dateOfBirth,
                    @Param("gender") String gender,
                    @Param("phoneNumber") String phoneNumber,
                    @Param("email") String email,
                    @Param("householdId") long householdId,
                    @Param("userId") long userId);

    void deleteByResidentId(long residentId);

    @Query("Select u, a  FROM ResidentsEntity u LEFT JOIN HouseholdInformationEntity a ON u.householdId = a.householdId ")
    List<Object[]> selectAll();//
}
