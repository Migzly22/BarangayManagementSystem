package com.example.demo.service;

import com.example.demo.entity.IncidentReportEntity;
import com.example.demo.repository.IncidentReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class IncidentReportService {
    @Autowired
    private IncidentReportRepository incidentReportRepository;

    public String addNewIncident(IncidentReportEntity incidentReportEntity){
        try{
            incidentReportRepository.save(incidentReportEntity);
            return "Success";
        }
        catch (Exception e){
            return e.getMessage();
        }
    }
    public ArrayList<IncidentReportEntity> getAllOftheIncident(){
        return (ArrayList<IncidentReportEntity>) incidentReportRepository.findAll();
    }
}
