package com.example.demo.controller;

import com.example.demo.entity.HouseholdInformationEntity;
import com.example.demo.service.HouseholdInformationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("Household")
public class HouseholdInformationController {

    @Autowired
    private HouseholdInformationService householdInformationService;

    @PostMapping("addHousehold")
    public ResponseEntity addhousehold(@RequestBody HouseholdInformationEntity householdInformationEntity){
        return new ResponseEntity(householdInformationService.addNewHousehold(householdInformationEntity), HttpStatus.OK);
    }

    @DeleteMapping("deleteHousehold")
    public ResponseEntity deleteFunction(@RequestParam(required = true) long householdId){
        return new ResponseEntity(householdInformationService.deleteHousehold(householdId), HttpStatus.OK);
    }

    @PatchMapping("updateHousehold")
    public ResponseEntity updateHousehold(@RequestBody HouseholdInformationEntity householdInformationEntity){
        return new ResponseEntity(householdInformationService.updateHousehold(householdInformationEntity), HttpStatus.OK);
    }

    @GetMapping("showAllHousehold")
    public ResponseEntity getallhousehold(){
        return new ResponseEntity(householdInformationService.getAllHousehold(), HttpStatus.OK);
    }

    @GetMapping("showSearchedItem")
    public ResponseEntity<HouseholdInformationEntity> getSearchItem(@RequestParam(required = false) String customSubstring,@RequestParam(required = false) long customLong) {
        return new ResponseEntity(householdInformationService.showSearchItem(customSubstring,customLong), HttpStatus.OK);
    }
}
