package com.example.demo.controller;

import com.example.demo.entity.UserAccountsEntity;
import com.example.demo.repository.UserAccountsRepository;
import com.example.demo.service.UserAccountsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("testing1")
public class UserAccountController {
    @Autowired
    private UserAccountsService userAccountsService;
    @Autowired
    private UserAccountsRepository userAccountsRepository;

    @PostMapping("addUser")
    public ResponseEntity save(@RequestBody UserAccountsEntity userAccountsEntity){
        return new ResponseEntity(userAccountsService.saveUserCredentials(userAccountsEntity), HttpStatus.OK);
    }
    @GetMapping("getUserAuth")
    public ResponseEntity<UserAccountsEntity> gettingAuth(@RequestBody UserAccountsEntity userAccountsEntity) {
        return new ResponseEntity(userAccountsService.gettingCredits1(userAccountsEntity), HttpStatus.OK);
    }
}
