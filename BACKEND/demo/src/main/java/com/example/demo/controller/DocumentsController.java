package com.example.demo.controller;

import com.example.demo.entity.DocumentsEntity;
import com.example.demo.model.SearchModel;
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

    @DeleteMapping("deleteRequestDocument")
    public ResponseEntity deleteFunction(@RequestBody DocumentsEntity documentsEntity){
        return new ResponseEntity(documentsService.deleteRequestDocuments(documentsEntity), HttpStatus.OK);
    }

    @PatchMapping("updateRequestDocument")
    public ResponseEntity updateRequestDocument(@RequestBody DocumentsEntity documentsEntity){
        return new ResponseEntity(documentsService.updateRequestDocuments(documentsEntity), HttpStatus.OK);
    }
    @GetMapping("getUserRequestDocuments")
    public ResponseEntity<DocumentsEntity> getUserAuth(@RequestBody DocumentsEntity documentsEntity) {
        return new ResponseEntity(documentsService.getAllRequestDocuments1(documentsEntity), HttpStatus.OK);
    }

    @GetMapping("getAllRequestDocuments")
    public ResponseEntity<DocumentsEntity> getAllRequest() {
        return new ResponseEntity(documentsService.getAllRequestDocuments(), HttpStatus.OK);
    }
    @PostMapping("showSearchedItem")
    public ResponseEntity<DocumentsEntity> getSearchItem(@RequestBody SearchModel searchModel) {
        return new ResponseEntity(documentsService.showSearchItem(searchModel), HttpStatus.OK);
    }
}
