package com.example.demo.controller;

import com.example.demo.entity.SubjectEntity;
import com.example.demo.service.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("subject")
public class qwe {

    @Autowired
    private SubjectService subjectService;

    @PostMapping("save")
    public ResponseEntity save(@RequestBody SubjectEntity subjectEntity){
        return new ResponseEntity(subjectService.saveSubject(subjectEntity), HttpStatus.OK);
    }

    @GetMapping("save")
    public ResponseEntity getting(@RequestBody SubjectEntity subjectEntity){
        return new ResponseEntity(subjectService.getSubject(), HttpStatus.OK);
    }
}
