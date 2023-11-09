package com.example.demo.repository;

import com.example.demo.entity.DocumentsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentsRepository extends JpaRepository<DocumentsEntity,Long> {
    List<DocumentsEntity> findByResidentId(long residentId);

    @Query("SELECT u FROM DocumentsEntity u WHERE u.documentType LIKE %:customSubstring% OR " +
            "u.documentName LIKE %:customSubstring% OR u.dateRequested LIKE %:customSubstring% OR " +
            "u.dateReleased LIKE %:customSubstring% OR u.status LIKE %:customSubstring% OR " +
            "u.residentId = :customLong")
    List<DocumentsEntity> searchCustomQuery(@Param("customSubstring") String customSubstring, @Param("customLong") Long customLong);

    void deleteByDocumentId(long documentId);
}
