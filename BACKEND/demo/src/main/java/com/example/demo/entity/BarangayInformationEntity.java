package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "BarangayInformation")
public class BarangayInformationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long barangayId;

    private String barangayName;
    private String location;
    private String barangayPhone;
    private String barangayEmail;
    private String currentBarangayCaptain;

    public long getBarangayId() {
        return barangayId;
    }

    public void setBarangayId(long barangayId) {
        this.barangayId = barangayId;
    }

    public String getBarangayName() {
        return barangayName;
    }

    public void setBarangayName(String barangayName) {
        this.barangayName = barangayName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getBarangayPhone() {
        return barangayPhone;
    }

    public void setBarangayPhone(String barangayPhone) {
        this.barangayPhone = barangayPhone;
    }

    public String getBarangayEmail() {
        return barangayEmail;
    }

    public void setBarangayEmail(String barangayEmail) {
        this.barangayEmail = barangayEmail;
    }

    public String getCurrentBarangayCaptain() {
        return currentBarangayCaptain;
    }

    public void setCurrentBarangayCaptain(String currentBarangayCaptain) {
        this.currentBarangayCaptain = currentBarangayCaptain;
    }
}
