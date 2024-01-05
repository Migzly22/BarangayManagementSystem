package com.example.demo.controller;

import com.example.demo.entity.UserAccountsEntity;
import com.example.demo.service.UserAccountsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("UserAccount")
public class UserAccountController {
    @Autowired
    private UserAccountsService userAccountsService;

    @PostMapping("addUser")
    public ResponseEntity addUser(@RequestBody UserAccountsEntity userAccountsEntity){
        return new ResponseEntity(userAccountsService.saveUserCredentials(userAccountsEntity), HttpStatus.OK);
    }

    @PatchMapping("updateUser")
    public ResponseEntity updateUser(@RequestBody UserAccountsEntity userAccountsEntity){
        return new ResponseEntity(userAccountsService.updateUserCredentials(userAccountsEntity), HttpStatus.OK);
    }
    @PatchMapping("updateEmail")
    public ResponseEntity updateEmail(@RequestBody UserAccountsEntity userAccountsEntity){
        return new ResponseEntity(userAccountsService.updateEmail(userAccountsEntity), HttpStatus.OK);
    }
    @PatchMapping("updatePassword")
    public ResponseEntity updatePassword(@RequestBody UserAccountsEntity userAccountsEntity){
        return new ResponseEntity(userAccountsService.updatePassword(userAccountsEntity), HttpStatus.OK);
    }

    @GetMapping("showAllUser")
    public ResponseEntity getallUser(){
        return new ResponseEntity(userAccountsService.showAllUser(), HttpStatus.OK);
    }

    @PostMapping("getUserAuth")
    public ResponseEntity<UserAccountsEntity> getUserAuth(@RequestBody UserAccountsEntity userAccountsEntity) {
        return new ResponseEntity(userAccountsService.gettingCredits1(userAccountsEntity), HttpStatus.OK);
    }

    @PostMapping("getUserAuth2")
    public ResponseEntity<UserAccountsEntity> getUserAuth2(@RequestBody UserAccountsEntity userAccountsEntity) {
        return new ResponseEntity(userAccountsService.getAllUserAndResidentData(userAccountsEntity), HttpStatus.OK);
    }
}
