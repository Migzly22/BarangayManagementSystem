package com.example.demo.controller;

import com.example.demo.entity.DocumentsEntity;
import com.example.demo.service.DocumentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("Documents")
public class DocumentsController {
    @Autowired
    private DocumentsService documentsService;

    @PostMapping("addRequestDocument")
    public ResponseEntity addUser(@RequestBody DocumentsEntity documentsEntity){
        return new ResponseEntity(documentsService.saveRequestDocuments(documentsEntity), HttpStatus.OK);
    }

    @DeleteMapping("deleteRequestDocument")
    public ResponseEntity deleteFunction(@RequestParam(required = true) long documentId){
        return new ResponseEntity(documentsService.deleteRequestDocuments(documentId), HttpStatus.OK);
    }

    @PatchMapping("updateRequestDocument")
    public ResponseEntity updateRequestDocument(@RequestBody DocumentsEntity documentsEntity){
        return new ResponseEntity(documentsService.updateRequestDocuments(documentsEntity), HttpStatus.OK);
    }


    @GetMapping("getUserRequestDocuments")
    public ResponseEntity<DocumentsEntity> getUserAuth(@RequestParam(required = true) long residentId) {
        return new ResponseEntity(documentsService.getAllRequestDocuments1(residentId), HttpStatus.OK);
    }

    @GetMapping("getAllRequestDocuments")
    public ResponseEntity<DocumentsEntity> getAllRequest() {
        return new ResponseEntity(documentsService.getAllRequestDocuments(), HttpStatus.OK);
    }
    @GetMapping("showSearchedItem")
    public ResponseEntity<DocumentsEntity> getSearchItem(@RequestParam(required = false) String customSubstring) {
        return new ResponseEntity(documentsService.showSearchItem(customSubstring), HttpStatus.OK);
    }
}
