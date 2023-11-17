package com.example.demo.service;

import com.example.demo.entity.ResidentsEntity;
import com.example.demo.model.SearchModel;
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
            return "Added Successfully";
        }
        catch (Exception e){
            return e.getMessage();
        }
    }

    public String deleteResident(ResidentsEntity residentsEntity){
        try{
            residentsRepository.deleteByResidentId(residentsEntity.getResidentId());
            return "Deleted Successfully";
        }
        catch (Exception e){
            return e.getMessage();
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
            return "Updated Successfully";
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

    public Object showSearchItem(String customSubstring, long customLong){
        List<ResidentsEntity> seachedItem = residentsRepository.searchCustomQuery(customSubstring,customLong);
        if (!seachedItem.isEmpty()) {
            return seachedItem;
        }else{
            return "{\"message\": \"Data not found\"}";
        }
    }


}
