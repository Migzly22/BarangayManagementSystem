package com.example.demo.controller;

import com.example.demo.entity.BarangayOfficialsEntity;
import com.example.demo.service.BarangayOfficialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("Officials")
public class BarangayOfficialsController {

    @Autowired
    private BarangayOfficialsService barangayOfficialsService;

    @PostMapping("addOfficials")
    public ResponseEntity addOfficials(@RequestBody BarangayOfficialsEntity barangayOfficialsEntity){
        return new ResponseEntity(barangayOfficialsService.saveOfficials(barangayOfficialsEntity), HttpStatus.OK);
    }

    @GetMapping("showAllOfficials")
    public ResponseEntity showAllOfficials(@RequestBody BarangayOfficialsEntity barangayOfficialsEntity){
        return new ResponseEntity(barangayOfficialsService.getOfficials(), HttpStatus.OK);
    }
}
