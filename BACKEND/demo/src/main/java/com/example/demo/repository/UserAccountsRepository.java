package com.example.demo.repository;

import com.example.demo.entity.UserAccountsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAccountsRepository extends JpaRepository<UserAccountsEntity,Long> {
    UserAccountsEntity findByEmailAndPasswordHash(String email, String passwordHash);

    @Modifying
    @Query("UPDATE UserAccountsEntity u SET u.email = :email, u.passwordHash = :passwordHash, " +
            "u.access = :access WHERE u.userId = :id")
    void updateData(@Param("id") long userId,
                    @Param("passwordHash") String passwordHash,
                    @Param("email") String email,
                    @Param("access") String access);

}
