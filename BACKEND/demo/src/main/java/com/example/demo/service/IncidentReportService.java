package com.example.demo.service;

import com.example.demo.entity.IncidentReportEntity;
import com.example.demo.model.SearchModel;
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
            return "Success";
        }
        catch (Exception e){
            return e.getMessage();
        }
    }

    public String deleteIncident(IncidentReportEntity incidentReportEntity){
        try{
            incidentReportRepository.deleteByIncidentId(incidentReportEntity.getIncidentId());
            return "Deleted Successfully";
        }
        catch (Exception e){
            return e.getMessage();
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
            return "Updated Successfully";
        }
        catch (Exception e){
            return e.getMessage();
        }
    }
    public ArrayList<IncidentReportEntity> getAllOftheIncident(){
        return (ArrayList<IncidentReportEntity>) incidentReportRepository.findAll();
    }

    public Object showSearchItem(SearchModel searchModel){
        List<IncidentReportEntity> docuser = incidentReportRepository.searchCustomQuery(searchModel.getCustomSubstring(), searchModel.getCustomLong());
        if (!docuser.isEmpty() ) {
            return docuser;
        }else{
            return "{\"message\": \"No Request found\"}";
        }
    }
}
