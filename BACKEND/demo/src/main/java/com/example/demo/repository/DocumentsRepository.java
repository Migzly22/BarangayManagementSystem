package com.example.demo.repository;

import com.example.demo.entity.DocumentsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentsRepository extends JpaRepository<DocumentsEntity,Long> {
    List<DocumentsEntity> findByResidentId(long residentId);

    @Query("SELECT u, a FROM DocumentsEntity u LEFT JOIN ResidentsEntity a ON u.residentId = a.residentId WHERE u.documentType LIKE %:customSubstring% OR " +
            "u.documentName LIKE %:customSubstring% OR u.dateRequested LIKE %:customSubstring% OR " +
            "u.dateReleased LIKE %:customSubstring% OR u.status LIKE %:customSubstring% " +
            "OR a.firstName LIKE %:customSubstring% OR a.lastName LIKE %:customSubstring% OR a.middleName LIKE %:customSubstring%")
        List<Object[]> searchCustomQuery(@Param("customSubstring") String customSubstring);

    @Modifying
    @Query("UPDATE DocumentsEntity u SET " +
           " u.dateReleased = :dateReleased, u.status = :status " +
            "WHERE u.documentId = :id")
    void updateData(@Param("id") long documentId,
                    @Param("dateReleased") String dateReleased,
                    @Param("status") String status);
    void deleteByDocumentId(long documentId);


    @Query("SELECT u, a, i FROM DocumentsEntity u LEFT JOIN ResidentsEntity a ON u.residentId = a.residentId LEFT JOIN HouseholdInformationEntity i ON a.householdId = i.householdId")
    List<Object[]> selectAll();//

    @Query("SELECT u, a FROM DocumentsEntity u LEFT JOIN ResidentsEntity a ON u.residentId = a.residentId WHERE u.residentId = :customSubstring ")
    List<Object[]> selectAll2(@Param("customSubstring") long customSubstring);//
}
