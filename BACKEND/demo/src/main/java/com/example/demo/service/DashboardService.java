package com.example.demo.service;

import com.example.demo.entity.DocumentsEntity;
import com.example.demo.repository.DashboardRepository;
import com.example.demo.repository.DocumentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class DashboardService {
    @Autowired
    private DashboardRepository dashboardRepository;

    public List<Object[]> getresidents(){
        List<Object[]> docuser = dashboardRepository.residents();
        if (!docuser.isEmpty()) {
            return docuser;
        } else {
            return Collections.singletonList(new Object[]{"{\"data\": null}"});
        }
    }
    public List<Object[]> getdocument(){
        List<Object[]> docuser = dashboardRepository.document();
        if (!docuser.isEmpty()) {
            return docuser;
        } else {
            return Collections.singletonList(new Object[]{"{\"data\": null}"});
        }
    }
    public List<Object[]> getincident(){
        List<Object[]> docuser = dashboardRepository.incident();
        if (!docuser.isEmpty()) {
            return docuser;
        } else {
            return Collections.singletonList(new Object[]{"{\"data\": null}"});
        }
    }
    public List<Object[]> getAllRequestDocuments(){
        List<Object[]> docuser = dashboardRepository.selectAll();
        if (!docuser.isEmpty()) {
            return docuser;
        } else {
            return Collections.singletonList(new Object[]{"{\"data\": null}"});
        }
    }


}
