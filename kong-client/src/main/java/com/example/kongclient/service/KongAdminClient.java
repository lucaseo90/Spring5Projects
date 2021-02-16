package com.example.kongclient.service;

import com.example.kongclient.model.request.ServiceRequest;
import com.example.kongclient.model.response.ServiceResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(value = "kongadmin", url = "localhost:8001/")
public interface KongAdminClient {

    @RequestMapping(method = RequestMethod.POST, value = "/services")
    ResponseEntity<ServiceResponse> addService(ServiceRequest serviceRequest);

    @RequestMapping(method = RequestMethod.GET, value = "/services/{serviceId}")
    ResponseEntity<ServiceResponse> retrieveService(@PathVariable String serviceId);

    //TODO: Invalid HTTP method: PATCH
    @RequestMapping(method = RequestMethod.PATCH, value = "/services/{serviceId}")
    ResponseEntity<ServiceResponse> updateService(@PathVariable String serviceId, ServiceRequest serviceRequest);

    @RequestMapping(method = RequestMethod.PUT, value = "/services/{serviceId}")
    ResponseEntity<ServiceResponse> updateOrCreateService(@PathVariable String serviceId, ServiceRequest serviceRequest);

    @RequestMapping(method = RequestMethod.DELETE, value = "/services/{serviceId}")
    ResponseEntity<ServiceResponse> deleteService(@PathVariable String serviceId);

}