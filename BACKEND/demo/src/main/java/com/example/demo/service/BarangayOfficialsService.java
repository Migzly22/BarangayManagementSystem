package com.example.demo.service;

import com.example.demo.entity.BarangayOfficialsEntity;
import com.example.demo.repository.BarangayOfficialsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class BarangayOfficialsService {
    @Autowired
    private BarangayOfficialsRepository barangayOfficialsRepository;

    public String saveOfficials(BarangayOfficialsEntity barangayOfficialsEntity){
        try{
            barangayOfficialsRepository.save(barangayOfficialsEntity);
            return "Success";
        }
        catch (Exception e){
            return e.getMessage();
        }
    }

    public String deleteOfficials(BarangayOfficialsEntity barangayOfficialsEntity){
        try{
            barangayOfficialsRepository.deleteByOfficialId(barangayOfficialsEntity.getOfficialId());
            return "Deleted Successfully";
        }
        catch (Exception e){
            return e.getMessage();
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
            return "Updated Successfully";
        }
        catch (Exception e){
            return e.getMessage();
        }
    }
    public ArrayList<BarangayOfficialsEntity> getOfficials(){
        return (ArrayList<BarangayOfficialsEntity>) barangayOfficialsRepository.findAll();
    }
}
