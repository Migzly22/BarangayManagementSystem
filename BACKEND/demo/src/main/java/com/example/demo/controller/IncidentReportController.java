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

    @DeleteMapping("deleteReport")
    public ResponseEntity deleteFunction(@RequestParam(required = true) long incidentId){
        return new ResponseEntity(incidentReportService.deleteIncident(incidentId), HttpStatus.OK);
    }
    @PatchMapping("updateReport")
    public ResponseEntity updateReport(@RequestBody IncidentReportEntity incidentReportEntity){
        return new ResponseEntity(incidentReportService.updateIncident(incidentReportEntity), HttpStatus.OK);
    }

    @GetMapping("showIncidentReports")
    public ResponseEntity showIncidentReports(){
        return new ResponseEntity(incidentReportService.getAllOftheIncident(), HttpStatus.OK);
    }

    @GetMapping("showSearchedItem")
    public ResponseEntity<IncidentReportEntity> getSearchItem(@RequestParam(required = false) String customSubstring,@RequestParam(required = false) long customLong) {
        return new ResponseEntity(incidentReportService.showSearchItem(customSubstring, customLong), HttpStatus.OK);
    }
}
