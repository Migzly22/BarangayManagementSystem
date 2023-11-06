package com.example.demo.service;

import com.example.demo.entity.UserAccountsEntity;
import com.example.demo.repository.UserAccountsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserAccountsService {
    @Autowired
    private UserAccountsRepository userAccountsRepository;

    public String saveUserCredentials(UserAccountsEntity userAccountsEntity){
        try{
            userAccountsRepository.save(userAccountsEntity);
            return "Success";
        }
        catch (Exception e){
            return e.getMessage();
        }
    }
    public Object gettingCredits1(UserAccountsEntity userAccountsEntity){
        UserAccountsEntity user = userAccountsRepository.findByEmailAndPasswordHash(userAccountsEntity.getEmail(), userAccountsEntity.getPasswordHash());
        if (user != null) {
            return user;
        }else{
            return "{\"message\": \"User not found\"}";
        }
    }


}
