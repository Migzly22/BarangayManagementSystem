package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "BarangayOfficials")
public class BarangayOfficialsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long officialId;

    private long residentId;
    private String position;
    private String startDate;
    private String endDate;
    private String electedOrAppointed;

    public long getOfficialId() {
        return officialId;
    }

    public void setOfficialId(long officialId) {
        this.officialId = officialId;
    }

    public long getResidentId() {
        return residentId;
    }

    public void setResidentId(long residentId) {
        this.residentId = residentId;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getElectedOrAppointed() {
        return electedOrAppointed;
    }

    public void setElectedOrAppointed(String electedOrAppointed) {
        this.electedOrAppointed = electedOrAppointed;
    }
}
