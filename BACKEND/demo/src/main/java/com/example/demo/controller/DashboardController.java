package com.example.demo.controller;

import com.example.demo.entity.DocumentsEntity;
import com.example.demo.service.DashboardService;
import com.example.demo.service.DocumentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("Dashboard")
public class DashboardController {
    @Autowired
    private DashboardService dashboardService;

    @GetMapping("request")
    public ResponseEntity<DocumentsEntity> request() {
        return new ResponseEntity(dashboardService.getdocument(), HttpStatus.OK);
    }
    @GetMapping("incident")
    public ResponseEntity<DocumentsEntity> incident() {
        return new ResponseEntity(dashboardService.getincident(), HttpStatus.OK);
    }
    @GetMapping("residents")
    public ResponseEntity<DocumentsEntity> residents() {
        return new ResponseEntity(dashboardService.getresidents(), HttpStatus.OK);
    }
    @GetMapping("getAllRequestDocuments")
    public ResponseEntity<DocumentsEntity> getAllRequest() {
        return new ResponseEntity(dashboardService.getAllRequestDocuments(), HttpStatus.OK);
    }
}
