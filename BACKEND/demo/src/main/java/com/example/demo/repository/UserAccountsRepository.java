package com.example.demo.repository;

import com.example.demo.entity.UserAccountsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserAccountsRepository extends JpaRepository<UserAccountsEntity,Long> {
    UserAccountsEntity findByEmailAndPasswordHash(String email, String passwordHash);

    @Query("Select u, a FROM UserAccountsEntity u LEFT JOIN ResidentsEntity a ON u.userId = a.userId WHERE u.userId = :id")
    List<Object[]> selectAllFromUserAndResident(@Param("id") long userId);
    
    @Modifying
    @Query("UPDATE UserAccountsEntity u SET u.email = :email, u.passwordHash = :passwordHash, " +
            "u.access = :access WHERE u.userId = :id")
    void updateData(@Param("id") long userId,
                    @Param("passwordHash") String passwordHash,
                    @Param("email") String email,
                    @Param("access") String access);

    @Modifying
    @Query("UPDATE UserAccountsEntity u SET u.email = :email WHERE u.userId = :id")
    void updateEmail(@Param("id") long userId,
                    @Param("email") String email);
                    
    @Modifying
    @Query("UPDATE UserAccountsEntity u SET u.passwordHash = :passwordHash WHERE u.userId = :id")
    void updatePassword(@Param("id") long userId,
                     @Param("passwordHash") String passwordHash);

}
