package com.example.demo.controller;

import com.example.demo.entity.IncidentReportEntity;
import com.example.demo.service.IncidentReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("IncidentReport")
public class IncidentReportController {

    @Autowired
    private IncidentReportService incidentReportService;

    @PostMapping("addReport")
    public ResponseEntity addReport(@RequestBody IncidentReportEntity incidentReportEntity){
        return new ResponseEntity(incidentReportService.addNewIncident(incidentReportEntity), HttpStatus.OK);
    }

    @GetMapping("showIncidentReports")
    public ResponseEntity showIncidentReports(@RequestBody IncidentReportEntity incidentReportEntity){
        return new ResponseEntity(incidentReportService.getAllOftheIncident(), HttpStatus.OK);
    }
}