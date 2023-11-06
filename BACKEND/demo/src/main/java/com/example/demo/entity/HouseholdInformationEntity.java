package com.example.demo.entity;


import jakarta.persistence.*;

@Entity
@Table(name = "HouseholdInformation")
public class HouseholdInformationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long householdId;
    private String address;
    private String householdHeadId;
    private long totalResidents;
    private String purok;

    public long getHouseholdId() {
        return householdId;
    }

    public void setHouseholdId(long householdId) {
        this.householdId = householdId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getHouseholdHeadId() {
        return householdHeadId;
    }

    public void setHouseholdHeadId(String householdHeadId) {
        this.householdHeadId = householdHeadId;
    }

    public long getTotalResidents() {
        return totalResidents;
    }

    public void setTotalResidents(long totalResidents) {
        this.totalResidents = totalResidents;
    }

    public String getPurok() {
        return purok;
    }

    public void setPurok(String purok) {
        this.purok = purok;
    }
}
