package com.example.demo.repository;

import com.example.demo.entity.DocumentsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentsRepository extends JpaRepository<DocumentsEntity,Long> {
    List<DocumentsEntity> findByResidentId(long residentId);
}
