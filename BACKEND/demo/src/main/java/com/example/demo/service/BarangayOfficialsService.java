package com.example.demo.service;

import com.example.demo.entity.BarangayOfficialsEntity;
import com.example.demo.repository.BarangayOfficialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
@Transactional
public class BarangayOfficialsService {
    @Autowired
    private BarangayOfficialsRepository barangayOfficialsRepository;

    public String saveOfficials(BarangayOfficialsEntity barangayOfficialsEntity){
        try{
            barangayOfficialsRepository.save(barangayOfficialsEntity);
            return "{\"message\": \"Added Successfullyy\"," +
                    "\"icon\": \"success\"}";
        }
        catch (Exception e){
            return "{\"message\": \""+e.getMessage()+"\"," +
                    "\"icon\": \"error\"}";
        }
    }

    public String deleteOfficials(long OfficialId){
        try{
            barangayOfficialsRepository.deleteByOfficialId(OfficialId);
            return "{\"message\": \"Deleted Successfullyy\"," +
                    "\"icon\": \"success\"}";
        }
        catch (Exception e){
            return "{\"message\": \""+e.getMessage()+"\"," +
                    "\"icon\": \"error\"}";
        }
    }
    public String updateOfficials(BarangayOfficialsEntity barangayOfficialsEntity){
        try{
            barangayOfficialsRepository.updateData(
                    barangayOfficialsEntity.getOfficialId(),
                    barangayOfficialsEntity.getResidentId(),
                    barangayOfficialsEntity.getPosition(),
                    barangayOfficialsEntity.getStartDate(),
                    barangayOfficialsEntity.getEndDate(),
                    barangayOfficialsEntity.getElectedOrAppointed()
            );
            return "{\"message\": \"Updated Successfullyy\"," +
                    "\"icon\": \"success\"}";
        }
        catch (Exception e){
            return "{\"message\": \""+e.getMessage()+"\"," +
                    "\"icon\": \"error\"}";
        }
    }
    public ArrayList<BarangayOfficialsEntity> getOfficials(){
        return (ArrayList<BarangayOfficialsEntity>) barangayOfficialsRepository.findAll();
    }
}
