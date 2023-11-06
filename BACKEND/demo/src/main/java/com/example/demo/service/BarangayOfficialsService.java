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
    public ArrayList<BarangayOfficialsEntity> getOfficials(){
        return (ArrayList<BarangayOfficialsEntity>) barangayOfficialsRepository.findAll();
    }
}
