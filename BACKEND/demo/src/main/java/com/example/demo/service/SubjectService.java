package com.example.demo.service;

import com.example.demo.entity.SubjectEntity;
import com.example.demo.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    public String saveSubject(SubjectEntity subjectEntity){
        try{
            subjectRepository.save(subjectEntity);
            return "Success";
        }
        catch (Exception e){
            return e.getMessage();
        }
    }

    public ArrayList<SubjectEntity> getSubject(){
        return (ArrayList<SubjectEntity>) subjectRepository.findAll();
    }


}
