package com.example.demo.service;

import com.example.demo.entity.HouseholdInformationEntity;
import com.example.demo.model.SearchModel;
import com.example.demo.repository.HouseholdInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

    public String deleteHousehold(HouseholdInformationEntity householdInformationEntity){
        try{
            householdInformationRepository.deleteByHouseholdId(householdInformationEntity.getHouseholdId());
            return "Deleted Successfully";
        }
        catch (Exception e){
            return e.getMessage();
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
            return "Updated Successfully";
        }
        catch (Exception e){
            return e.getMessage();
        }
    }
    public ArrayList<HouseholdInformationEntity> getAllHousehold(){
        return (ArrayList<HouseholdInformationEntity>) householdInformationRepository.findAll();
    }

    public Object showSearchItem(SearchModel searchModel){
        List<HouseholdInformationEntity> docuser = householdInformationRepository.searchCustomQuery(searchModel.getCustomSubstring(), searchModel.getCustomLong());
        if (!docuser.isEmpty() ) {
            return docuser;
        }else{
            return "{\"message\": \"No Request found\"}";
        }
    }
}
