package com.example.demo.service;

import com.example.demo.entity.DocumentsEntity;
import com.example.demo.repository.DocumentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

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
                    documentsEntity.getDateReleased(),
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


    public List<Object[]> getAllRequestDocuments(){
        List<Object[]> docuser = documentsRepository.selectAll();
        if (!docuser.isEmpty()) {
            return docuser;
        } else {
            return Collections.singletonList(new Object[]{"{\"data\": null}"});
        }
    }


    /* *
        public ArrayList<DocumentsEntity> getAllRequestDocuments(){
            return (ArrayList<DocumentsEntity>) documentsRepository.findAll();
        }
        public Object getAllRequestDocuments1(long residentId){
            List<DocumentsEntity> docuser = documentsRepository.findByResidentId(residentId);
            if (!docuser.isEmpty() ) {
                return docuser;
            }else{
                return "{\"data\": null}";
            }
        }
    */

    public List<Object[]> getAllRequestDocuments1(long residentId){
        List<Object[]> docuser = documentsRepository.selectAll2(residentId);
        if (!docuser.isEmpty()) {
            return docuser;
        } else {
            // Return a JSON string representing an object with a "message" property
            return Collections.singletonList(new Object[]{"{\"data\": null}"});
        }
    }
    public List<Object[]> showSearchItem(String customSubstring){
        List<Object[]> docuser = documentsRepository.searchCustomQuery(customSubstring);
        if (!docuser.isEmpty()) {
            return docuser;
        } else {
            // Return a JSON string representing an object with a "message" property
            return Collections.singletonList(new Object[]{"{\"data\": null}"});
        }
    }


}
