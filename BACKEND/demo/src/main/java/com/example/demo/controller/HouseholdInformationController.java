package com.example.demo.controller;

import com.example.demo.entity.HouseholdInformationEntity;
import com.example.demo.model.SearchModel;
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
    public ResponseEntity deleteFunction(@RequestBody HouseholdInformationEntity householdInformationEntity){
        return new ResponseEntity(householdInformationService.deleteHousehold(householdInformationEntity), HttpStatus.OK);
    }

    @PatchMapping("updateHousehold")
    public ResponseEntity updateHousehold(@RequestBody HouseholdInformationEntity householdInformationEntity){
        return new ResponseEntity(householdInformationService.updateHousehold(householdInformationEntity), HttpStatus.OK);
    }

    @GetMapping("showAllHousehold")
    public ResponseEntity getallhousehold(){
        return new ResponseEntity(householdInformationService.getAllHousehold(), HttpStatus.OK);
    }

    @PostMapping("showSearchedItem")
    public ResponseEntity<HouseholdInformationEntity> getSearchItem(@RequestBody SearchModel searchModel) {
        return new ResponseEntity(householdInformationService.showSearchItem(searchModel), HttpStatus.OK);
    }
}
