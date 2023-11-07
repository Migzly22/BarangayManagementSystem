package com.example.demo.controller;

import com.example.demo.entity.UserAccountsEntity;
import com.example.demo.service.UserAccountsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("UserAccount")
public class UserAccountController {
    @Autowired
    private UserAccountsService userAccountsService;

    @PostMapping("addUser")
    public ResponseEntity addUser(@RequestBody UserAccountsEntity userAccountsEntity){
        return new ResponseEntity(userAccountsService.saveUserCredentials(userAccountsEntity), HttpStatus.OK);
    }
    @GetMapping("getUserAuth")
    public ResponseEntity<UserAccountsEntity> getUserAuth(@RequestBody UserAccountsEntity userAccountsEntity) {
        return new ResponseEntity(userAccountsService.gettingCredits1(userAccountsEntity), HttpStatus.OK);
    }
}
