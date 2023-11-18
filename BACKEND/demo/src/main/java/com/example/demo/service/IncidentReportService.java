package com.example.demo.service;

import com.example.demo.entity.IncidentReportEntity;
import com.example.demo.repository.IncidentReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class IncidentReportService {
    @Autowired
    private IncidentReportRepository incidentReportRepository;

    public String addNewIncident(IncidentReportEntity incidentReportEntity){
        try{
            incidentReportRepository.save(incidentReportEntity);
            return "{\"message\": \"Added Successfullyy\"," +
                    "\"icon\": \"success\"}";
        }
        catch (Exception e){
            return "{\"message\": \""+e.getMessage()+"\"," +
                    "\"icon\": \"error\"}";
        }
    }

    public String deleteIncident(long incidentId){
        try{
            incidentReportRepository.deleteByIncidentId(incidentId);
            return "{\"message\": \"Added Successfullyy\"," +
                    "\"icon\": \"success\"}";
        }
        catch (Exception e){
            return "{\"message\": \""+e.getMessage()+"\"," +
                    "\"icon\": \"error\"}";
        }
    }

    public String updateIncident(IncidentReportEntity incidentReportEntity){
        try{
            incidentReportRepository.updateData(
                    incidentReportEntity.getIncidentId(),
                    incidentReportEntity.getDescription(),
                    incidentReportEntity.getDateTimeOccured(),
                    incidentReportEntity.getDateReported(),
                    incidentReportEntity.getResidentId(),
                    incidentReportEntity.getStatus()
            );
            return "{\"message\": \"Updated Successfullyy\"," +
                    "\"icon\": \"success\"}";
        }
        catch (Exception e){
            return "{\"message\": \""+e.getMessage()+"\"," +
                    "\"icon\": \"error\"}";
        }
    }
    public ArrayList<IncidentReportEntity> getAllOftheIncident(){
        return (ArrayList<IncidentReportEntity>) incidentReportRepository.findAll();
    }

    public Object showSearchItem(String customSubstring, long customLong){
        List<IncidentReportEntity> docuser = incidentReportRepository.searchCustomQuery(customSubstring, customLong);
        if (!docuser.isEmpty() ) {
            return docuser;
        }else{
            return "{\"message\": \"No Request found\"}";
        }
    }
}
