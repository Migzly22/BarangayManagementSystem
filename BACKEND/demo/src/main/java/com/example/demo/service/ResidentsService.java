package com.example.demo.service;

import com.example.demo.entity.ResidentsEntity;
import com.example.demo.repository.ResidentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class ResidentsService {
    @Autowired
    private ResidentsRepository residentsRepository;

    public String addResident(ResidentsEntity residentsEntity){
        try{
            residentsRepository.save(residentsEntity);
            return "{\"message\": \"Added Successfullyy\"," +
                    "\"icon\": \"success\"}";
        }
        catch (Exception e){
            return "{\"message\": \""+e.getMessage()+"\"," +
                    "\"icon\": \"error\"}";
        }
    }

    public String deleteResident(long residentId){
        try{
            residentsRepository.deleteByResidentId(residentId);
            return "{\"message\": \"Deleted Successfullyy\"," +
                    "\"icon\": \"success\"}";
        }
        catch (Exception e){
            return "{\"message\": \""+e.getMessage()+"\"," +
                    "\"icon\": \"error\"}";
        }
    }
    public String updateResident(ResidentsEntity residentsEntity){
        try{
            residentsRepository.updateData(
                    residentsEntity.getResidentId(),
                    residentsEntity.getFirstName(),
                    residentsEntity.getMiddleName(),
                    residentsEntity.getLastName(),
                    residentsEntity.getDateOfBirth(),
                    residentsEntity.getGender(),
                    residentsEntity.getPhoneNumber(),
                    residentsEntity.getEmail(),
                    residentsEntity.getHouseholdId(),
                    residentsEntity.getUserId()
            );
            return "{\"message\": \"Updated Successfullyy\"," +
                    "\"icon\": \"success\"}";
        }
        catch (Exception e){
            return "{\"message\": \""+e.getMessage()+"\"," +
                    "\"icon\": \"error\"}";
        }
    }

    //Admin side
    public ArrayList<ResidentsEntity> showAllResidents(){
        return (ArrayList<ResidentsEntity>) residentsRepository.findAll();
    }

    //Per User side
    public Object showSpecificUser(long userId){
        ResidentsEntity user = residentsRepository.findByUserId(userId);
        if (user != null) {
            return user;
        }else{
            return "{\"message\": \"User not found\"}";
        }
    }

    public Object showSearchItem(String customSubstring, long customLong){
        List<ResidentsEntity> seachedItem = residentsRepository.searchCustomQuery(customSubstring,customLong);
        if (!seachedItem.isEmpty()) {
            return seachedItem;
        }else{
            return "{\"message\": \"Data not found\"}";
        }
    }


}
