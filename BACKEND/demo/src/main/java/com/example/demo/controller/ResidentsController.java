package com.example.demo.controller;

import com.example.demo.entity.BarangayOfficialsEntity;
import com.example.demo.entity.ResidentsEntity;
import com.example.demo.service.BarangayOfficialsService;
import com.example.demo.service.ResidentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("Residents")
public class ResidentsController {

    @Autowired
    private ResidentsService residentsService;

    @PostMapping("addResidents")
    public ResponseEntity addhousehold(@RequestBody ResidentsEntity residentsEntity){
        return new ResponseEntity(residentsService.addResident(residentsEntity), HttpStatus.OK);
    }

    @GetMapping("showAllResidents")
    public ResponseEntity getallhousehold(@RequestBody ResidentsEntity residentsEntity){
        return new ResponseEntity(residentsService.showAllResidents(), HttpStatus.OK);
    }
}
