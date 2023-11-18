package com.example.demo.service;

import com.example.demo.entity.DocumentsEntity;
import com.example.demo.repository.DocumentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
@Service
@Transactional
public class DocumentsService {
    @Autowired
    private DocumentsRepository documentsRepository;

    public String saveRequestDocuments(DocumentsEntity documentsEntity){
        try{
            documentsRepository.save(documentsEntity);
            return "{\"message\": \"Added Successfullyy\"," +
                    "\"icon\": \"success\"}";
        }
        catch (Exception e){
            return "{\"message\": \""+e.getMessage()+"\"," +
                    "\"icon\": \"error\"}";
        }
    }

    public String deleteRequestDocuments(long documentId){
        try{
            documentsRepository.deleteByDocumentId(documentId);
            return "{\"message\": \"Deleted Successfullyy\"," +
                    "\"icon\": \"success\"}";
        }
        catch (Exception e){
            return "{\"message\": \""+e.getMessage()+"\"," +
                    "\"icon\": \"error\"}";
        }
    }

    public String updateRequestDocuments(DocumentsEntity documentsEntity){
        try{
            documentsRepository.updateData(
                    documentsEntity.getDocumentId(),
                    documentsEntity.getDocumentType(),
                    documentsEntity.getDocumentName(),
                    documentsEntity.getDateRequested(),
                    documentsEntity.getDateReleased(),
                    documentsEntity.getResidentId(),
                    documentsEntity.getStatus()
            );
            return "{\"message\": \"Updated Successfullyy\"," +
                    "\"icon\": \"success\"}";
        }
        catch (Exception e){
            return "{\"message\": \""+e.getMessage()+"\"," +
                    "\"icon\": \"error\"}";
        }
    }


    public ArrayList<DocumentsEntity> getAllRequestDocuments(){
        return (ArrayList<DocumentsEntity>) documentsRepository.findAll();
    }

    public Object getAllRequestDocuments1(long residentId){
        List<DocumentsEntity> docuser = documentsRepository.findByResidentId(residentId);
        if (!docuser.isEmpty() ) {
            return docuser;
        }else{
            return "{\"message\": \"No Request found\"}";
        }
    }

    public Object showSearchItem(String customSubstring, long customLong){
        List<DocumentsEntity> docuser = documentsRepository.searchCustomQuery( customSubstring, customLong);
        if (!docuser.isEmpty() ) {
            return docuser;
        }else{
            return "{\"message\": \"No Request found\"}";
        }
    }


}
