package com.example.demo.service;

import com.example.demo.entity.DocumentsEntity;
import com.example.demo.repository.DocumentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service
public class DocumentsService {
    @Autowired
    private DocumentsRepository documentsRepository;

    public String saveRequestDocuments(DocumentsEntity documentsEntity){
        try{
            documentsRepository.save(documentsEntity);
            return "Success";
        }
        catch (Exception e){
            return e.getMessage();
        }
    }
    public ArrayList<DocumentsEntity> getAllRequestDocuments(){
        return (ArrayList<DocumentsEntity>) documentsRepository.findAll();
    }

    public Object getAllRequestDocuments1(DocumentsEntity documentsEntity){
        List<DocumentsEntity> docuser = documentsRepository.findByResidentId(documentsEntity.getResidentId());
        if (!docuser.isEmpty() ) {
            return docuser;
        }else{
            return "{\"message\": \"No Request found\"}";
        }
    }

}
