package com.example.kongclient.controller;

import com.example.kongclient.model.request.ServiceRequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ServiceController {

    @PostMapping(name = "/services")
    public ResponseEntity<Object> addService(@RequestBody ServiceRequestBody serviceRequestBody){
        return null;
    }

//    @GetMapping(name = "/services")
//    public ResponseEntity<Object> getServices(){
//        return null;
//    }

    @GetMapping(name = "/services/{serviceId}")
    public ResponseEntity<Object> retrieveService(){
        return null;
    }

    @PatchMapping(name = "/services/{serviceId}")
    public ResponseEntity<Object> updateService(){
        return null;
    }

    @PutMapping(name = "/services/{serviceId}")
    public ResponseEntity<Object> updateOrCreateService(){
        return null;
    }

    @DeleteMapping(name = "/services/{serviceId}")
    public ResponseEntity<Object> deleteService(){
        return null;
    }
}
