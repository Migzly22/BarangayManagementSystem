package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "IncidentReport")
public class IncidentReportEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long incidentId;
    private String description;
    private String dateTimeOccured;
    private String dateReported;
    private long residentId;
    private String status;

    public long getIncidentId() {
        return incidentId;
    }

    public void setIncidentId(long incidentId) {
        this.incidentId = incidentId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDateTimeOccured() {
        return dateTimeOccured;
    }

    public void setDateTimeOccured(String dateTimeOccured) {
        this.dateTimeOccured = dateTimeOccured;
    }

    public String getDateReported() {
        return dateReported;
    }

    public void setDateReported(String dateReported) {
        this.dateReported = dateReported;
    }

    public long getResidentId() {
        return residentId;
    }

    public void setResidentId(long residentId) {
        this.residentId = residentId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
