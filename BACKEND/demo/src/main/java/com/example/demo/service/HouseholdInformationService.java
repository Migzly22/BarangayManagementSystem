package com.example.demo.service;

import com.example.demo.entity.HouseholdInformationEntity;
import com.example.demo.repository.HouseholdInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class HouseholdInformationService {
    @Autowired
    private HouseholdInformationRepository householdInformationRepository;

    public String addNewHousehold(HouseholdInformationEntity householdInformationEntity){
        try{
            householdInformationRepository.save(householdInformationEntity);
            return "Success";
        }
        catch (Exception e){
            return e.getMessage();
        }
    }
    public ArrayList<HouseholdInformationEntity> getAllHousehold(){
        return (ArrayList<HouseholdInformationEntity>) householdInformationRepository.findAll();
    }
}
