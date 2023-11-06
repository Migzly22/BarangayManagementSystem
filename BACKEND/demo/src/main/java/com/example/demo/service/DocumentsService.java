package com.example.demo.service;

import com.example.demo.entity.DocumentsEntity;
import com.example.demo.repository.DocumentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class DocumentsService {
    @Autowired
    private DocumentsRepository documentsRepository;

    public String saveOfficials(DocumentsEntity documentsEntity){
        try{
            documentsRepository.save(documentsEntity);
            return "Success";
        }
        catch (Exception e){
            return e.getMessage();
        }
    }
    public ArrayList<DocumentsEntity> getOfficials(){
        return (ArrayList<DocumentsEntity>) documentsRepository.findAll();
    }
}
