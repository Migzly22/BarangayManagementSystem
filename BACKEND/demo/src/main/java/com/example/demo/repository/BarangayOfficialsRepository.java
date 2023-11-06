package com.example.demo.repository;

import com.example.demo.entity.BarangayOfficialsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BarangayOfficialsRepository extends JpaRepository<BarangayOfficialsEntity,Long> {
}
