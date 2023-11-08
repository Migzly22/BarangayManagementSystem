package com.example.demo.controller;

import com.example.demo.entity.DocumentsEntity;
import com.example.demo.service.DocumentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("Documents")
public class DocumentsController {
    @Autowired
    private DocumentsService documentsService;

    @PostMapping("addRequestDocument")
    public ResponseEntity addUser(@RequestBody DocumentsEntity documentsEntity){
        return new ResponseEntity(documentsService.saveRequestDocuments(documentsEntity), HttpStatus.OK);
    }
    @GetMapping("getUserRequestDocuments")
    public ResponseEntity<DocumentsEntity> getUserAuth(@RequestBody DocumentsEntity documentsEntity) {
        return new ResponseEntity(documentsService.getAllRequestDocuments1(documentsEntity), HttpStatus.OK);
    }

    @GetMapping("getAllRequestDocuments")
    public ResponseEntity<DocumentsEntity> getAllRequest(@RequestBody DocumentsEntity documentsEntity) {
        return new ResponseEntity(documentsService.getAllRequestDocuments(), HttpStatus.OK);
    }
}
