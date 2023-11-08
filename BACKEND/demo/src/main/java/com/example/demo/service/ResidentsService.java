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

    //Admin side
    public ArrayList<ResidentsEntity> showAllResidents(){
        return (ArrayList<ResidentsEntity>) residentsRepository.findAll();
    }

    //Per User side
    public Object showSpecificUser(ResidentsEntity residentsEntity){
        ResidentsEntity user = residentsRepository.findByUserId(residentsEntity.getUserId());
        if (user != null) {
            return user;
        }else{
            return "{\"message\": \"User not found\"}";
        }
    }
}
