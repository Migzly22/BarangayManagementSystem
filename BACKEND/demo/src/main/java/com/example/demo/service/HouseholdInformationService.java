package com.example.demo.service;

import com.example.demo.entity.HouseholdInformationEntity;
import com.example.demo.repository.HouseholdInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class HouseholdInformationService {
    @Autowired
    private HouseholdInformationRepository householdInformationRepository;

    public String addNewHousehold(HouseholdInformationEntity householdInformationEntity){
        try{
            householdInformationRepository.save(householdInformationEntity);
            return "{\"message\": \"Added Successfullyy\"," +
                    "\"icon\": \"success\"," +
                    "\"id\": \""+householdInformationEntity.getHouseholdId()+"\"}";
        }
        catch (Exception e){
            return "{\"message\": \""+e.getMessage()+"\"," +
                    "\"icon\": \"error\"}";
        }
    }

    public String deleteHousehold(long householdId){
        try{
            householdInformationRepository.deleteByHouseholdId(householdId);
            return "{\"message\": \"Deleted Successfullyy\"," +
                    "\"icon\": \"success\"}";
        }
        catch (Exception e){
            return "{\"message\": \""+e.getMessage()+"\"," +
                    "\"icon\": \"error\"}";
        }
    }
    public String updateHousehold(HouseholdInformationEntity householdInformationEntity){
        try{
            householdInformationRepository.updateData(
                    householdInformationEntity.getHouseholdId(),
                    householdInformationEntity.getAddress(),
                    householdInformationEntity.getHouseholdHeadId(),
                    householdInformationEntity.getTotalResidents(),
                    householdInformationEntity.getStreets()
            );
            return "{\"message\": \"Updated Successfullyy\"," +
                    "\"icon\": \"success\"}";

        }
        catch (Exception e){
            return "{\"message\": \""+e.getMessage()+"\"," +
                    "\"icon\": \"error\"}";
        }
    }
    public ArrayList<HouseholdInformationEntity> getAllHousehold(){
        return (ArrayList<HouseholdInformationEntity>) householdInformationRepository.findAll();
    }

    public Object showSearchItem(String customSubstring, long customLong){
        List<HouseholdInformationEntity> docuser = householdInformationRepository.searchCustomQuery(customSubstring,customLong);
        if (!docuser.isEmpty() ) {
            return docuser;
        }else{
            return "{\"message\": \"No Request found\"}";
        }
    }
}
