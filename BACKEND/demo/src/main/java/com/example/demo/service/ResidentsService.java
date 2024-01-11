package com.example.demo.service;

import com.example.demo.entity.ResidentsEntity;
import com.example.demo.repository.ResidentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class ResidentsService {
    @Autowired
    private ResidentsRepository residentsRepository;

    public String addResident(ResidentsEntity residentsEntity) {
        try {
            residentsRepository.save(residentsEntity);
            return "{\"message\": \"Added Successfullyy\"," +
                    "\"icon\": \"success\"}";
        } catch (Exception e) {
            return "{\"message\": \"" + e.getMessage() + "\"," +
                    "\"icon\": \"error\"}";
        }
    }

    public String deleteResident(long residentId) {
        try {
            residentsRepository.deleteByResidentId(residentId);
            return "{\"message\": \"Deleted Successfullyy\"," +
                    "\"icon\": \"success\"}";
        } catch (Exception e) {
            return "{\"message\": \"" + e.getMessage() + "\"," +
                    "\"icon\": \"error\"}";
        }
    }

    public String updateResident(ResidentsEntity residentsEntity) {
        try {
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
                    residentsEntity.getUserId());
            return "{\"message\": \"Updated Successfullyy\"," +
                    "\"icon\": \"success\"}";
        } catch (Exception e) {
            return "{\"message\": \"" + e.getMessage() + "\"," +
                    "\"icon\": \"error\"}";
        }
    }

    // Admin side
    public ArrayList<ResidentsEntity> showAllResidents1() {
        return (ArrayList<ResidentsEntity>) residentsRepository.findAll();
    }

    public List<Object[]> showAllResidents() {
        return residentsRepository.selectAll();
    }

    public Map<String, Object> testing123() {
        Map<String, Object> data = new HashMap<>();
        List<ResidentsEntity> datarespo = residentsRepository.findAll();
        data.put("data", "Success");
        data.put("data", datarespo);
        return data;
    }

    // Per User side
    public Object showSpecificUser(long userId) {
        ResidentsEntity user = residentsRepository.findByUserId(userId);
        if (user != null) {
            return user;
        } else {
            return "{\"message\": \"User not found\"}";
        }
    }

    public List<Object[]> showSearchItem(String customSubstring) {
        List<Object[]> seachedItem = residentsRepository.searchCustomQuery(customSubstring);
        if (!seachedItem.isEmpty()) {
            return seachedItem;
        } else {
            // Return a JSON string representing an object with a "message" property
            return Collections.singletonList(new Object[]{"{\"data\": null}"});
        }
    }

    public List<Object[]> showSearchItem2(String customSubstring) {
        List<Object[]> seachedItem = residentsRepository.searchCustomQuery2(customSubstring);
        if (!seachedItem.isEmpty()) {
            return seachedItem;
        } else {
            // Return a JSON string representing an object with a "message" property
            return Collections.singletonList(new Object[]{"{\"data\": null}"});
        }
    }

}
