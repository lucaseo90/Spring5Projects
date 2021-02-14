package com.example.kongclient.controller;

import com.example.kongclient.model.request.ServiceRequest;
import com.example.kongclient.model.response.ServiceResponse;
import com.example.kongclient.service.KongAdminClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(value = "/services", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
public class ServiceController {

    private final KongAdminClient kongAdminClient;

    @Autowired
    public ServiceController(KongAdminClient kongAdminClient) {
        this.kongAdminClient = kongAdminClient;
    }

    @PostMapping
    public @ResponseBody
    ResponseEntity<ServiceResponse> addService(@RequestBody ServiceRequest serviceRequest) {
        ResponseEntity<ServiceResponse> serviceResponse = kongAdminClient.addService(serviceRequest);
        if (serviceResponse.getStatusCode() != HttpStatus.CREATED) {

        }
        return serviceResponse;
    }

//    @GetMapping("/services")
//    public ResponseEntity<Object> getServices(){
//        return null;
//    }

    @GetMapping("/{serviceId}")
    public ResponseEntity<Object> retrieveService() {
        return null;
    }

    @PatchMapping("/{serviceId}")
    public ResponseEntity<Object> updateService() {
        return null;
    }

    @PutMapping("/{serviceId}")
    public ResponseEntity<Object> updateOrCreateService() {
        return null;
    }

    @DeleteMapping("/{serviceId}")
    public ResponseEntity<Object> deleteService() {
        return null;
    }
}
