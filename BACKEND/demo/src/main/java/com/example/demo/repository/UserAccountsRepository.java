package com.example.demo.repository;

import com.example.demo.entity.UserAccountsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAccountsRepository extends JpaRepository<UserAccountsEntity,Long> {
    UserAccountsEntity findByEmailAndPasswordHash(String email, String passwordHash);
}
