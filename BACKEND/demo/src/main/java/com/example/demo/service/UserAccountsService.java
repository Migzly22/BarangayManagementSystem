package com.example.demo.service;


import com.example.demo.entity.UserAccountsEntity;
import com.example.demo.repository.UserAccountsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
public class UserAccountsService {
    @Autowired
    private UserAccountsRepository userAccountsRepository;

    public String saveUserCredentials(UserAccountsEntity userAccountsEntity){
        try{
            userAccountsRepository.save(userAccountsEntity);
            return "{\"message\": \"Added Successfullyy\"," +
                    "\"icon\": \"success\"," +
                    "\"id\": \""+userAccountsEntity.getUserId()+"\"}";
        }
        catch (Exception e){
            return "{\"message\": \""+e.getMessage()+"\"," +
                    "\"icon\": \"error\"}";
        }
    }

    public String updateUserCredentials(UserAccountsEntity userAccountsEntity){
        try{
            userAccountsRepository.updateData(
                    userAccountsEntity.getUserId(),
                    userAccountsEntity.getPasswordHash(),
                    userAccountsEntity.getEmail(),
                    userAccountsEntity.getAccess()
            );
            return "{\"message\": \"Updated Successfullyy\"," +
                    "\"icon\": \"success\"}";
        }
        catch (Exception e){
            return "{\"message\": \""+e.getMessage()+"\"," +
                    "\"icon\": \"error\"}";
        }
    }
    public String updateEmail(UserAccountsEntity userAccountsEntity){
        try{
            userAccountsRepository.updateEmail(
                    userAccountsEntity.getUserId(),
                    userAccountsEntity.getEmail()
            );
            return "{\"message\": \"Updated Successfullyy\"," +
                    "\"icon\": \"success\"}";
        }
        catch (Exception e){
            return "{\"message\": \""+e.getMessage()+"\"," +
                    "\"icon\": \"error\"}";
        }
    }
    public String updatePassword(UserAccountsEntity userAccountsEntity){
        try{
            userAccountsRepository.updatePassword(
                    userAccountsEntity.getUserId(),
                    userAccountsEntity.getPasswordHash()
            );
            return "{\"message\": \"Updated Successfullyy\"," +
                    "\"icon\": \"success\"}";
        }
        catch (Exception e){
            return "{\"message\": \""+e.getMessage()+"\"," +
                    "\"icon\": \"error\"}";
        }
    }
    public ArrayList<UserAccountsEntity> showAllUser(){
        return (ArrayList<UserAccountsEntity>) userAccountsRepository.findAll();
    }

    public Object gettingCredits1(UserAccountsEntity userAccountsEntity){
        UserAccountsEntity user = userAccountsRepository.findByEmailAndPasswordHash(userAccountsEntity.getEmail(), userAccountsEntity.getPasswordHash());
        if (user != null) {
            return user;
        }else{
            return "{\"message\": \"User not found\"}";
        }
    }

    public List<Object[]> getAllUserAndResidentData(UserAccountsEntity userAccountsEntity) {
        return userAccountsRepository.selectAllFromUserAndResident(userAccountsEntity.getUserId());
    }
}
