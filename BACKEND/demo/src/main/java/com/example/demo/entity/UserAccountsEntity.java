package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "UserAccounts")
public class UserAccountsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userId;

    private String passwordHash;
    private String email;
    private String access;

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAccess() {
        return access;
    }

    public void setAccess(String access) {
        this.access = access;
    }
}
