package com.example.demo.service;

import com.example.demo.entity.ResidentsEntity;
import com.example.demo.repository.ResidentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ResidentsService {
    @Autowired
    private ResidentsRepository residentsRepository;

    public String addResident(ResidentsEntity residentsEntity){
        try{
            residentsRepository.save(residentsEntity);
            return "Success";
        }
        catch (Exception e){
            return e.getMessage();
        }
    }
    public ArrayList<ResidentsEntity> showAllResidents(){
        return (ArrayList<ResidentsEntity>) residentsRepository.findAll();
    }
}
