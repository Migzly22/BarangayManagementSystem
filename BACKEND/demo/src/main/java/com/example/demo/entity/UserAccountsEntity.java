package com.example.demo.entity;

import jakarta.persistence.*;
import java.security.*;

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

    public static String generateMD5Hash(String input) {
        try {
            // Get the MD5 MessageDigest instance
            MessageDigest md = MessageDigest.getInstance("MD5");
            
            // Update the message digest with the input string
            md.update(input.getBytes());
            
            // Generate the MD5 hash
            byte[] hash = md.digest();
            
            // Convert the byte array to a hexadecimal representation
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                hexString.append(String.format("%02x", b));
            }
            
            // Return the MD5 hash as a string
            return hexString.toString();
            
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }
    public void setPasswordHash(String passwordHash) {
        this.passwordHash = generateMD5Hash(passwordHash);
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
