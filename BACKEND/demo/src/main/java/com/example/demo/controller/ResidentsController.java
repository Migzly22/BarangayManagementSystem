package com.example.demo.controller;

import com.example.demo.entity.ResidentsEntity;
import com.example.demo.service.ResidentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("Residents")
public class ResidentsController {

    @Autowired
    private ResidentsService residentsService;

    @PostMapping("addResidents")
    public ResponseEntity addhousehold(@RequestBody ResidentsEntity residentsEntity){
        return new ResponseEntity(residentsService.addResident(residentsEntity), HttpStatus.OK);
    }

    @DeleteMapping("deleteResident")
    public ResponseEntity deleteResidents(@RequestParam(required = true) long residentId){
        return new ResponseEntity(residentsService.deleteResident(residentId), HttpStatus.OK);
    }
    @PatchMapping("updateResident")
    public ResponseEntity updateResident(@RequestBody ResidentsEntity residentsEntity){
        return new ResponseEntity(residentsService.updateResident(residentsEntity), HttpStatus.OK);
    }


    @GetMapping("showAllResidents")
    public ResponseEntity getallhousehold(){
        return new ResponseEntity(residentsService.showAllResidents(), HttpStatus.OK);
    }

    @GetMapping("showSpecificUser")
    public ResponseEntity<ResidentsEntity> getSpecificUser(@RequestParam(required = true) long userId) {
        return new ResponseEntity(residentsService.showSpecificUser(userId), HttpStatus.OK);
    }


    @GetMapping("showSearchedItem")
    public ResponseEntity<ResidentsEntity> getSearchItem(@RequestParam(required = true) String customSubstring) {
        return new ResponseEntity(residentsService.showSearchItem(customSubstring), HttpStatus.OK);
    }

    @GetMapping("showSearchedItem2")
    public ResponseEntity<ResidentsEntity> getSearchItemV2(@RequestParam(required = true) String customSubstring) {
        return new ResponseEntity(residentsService.showSearchItem2(customSubstring), HttpStatus.OK);
    }

}
