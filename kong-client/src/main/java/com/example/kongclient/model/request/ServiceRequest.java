package com.example.kongclient.model.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class ServiceRequest {

    @JsonInclude(Include.NON_NULL)
    private String name;

    @JsonInclude(Include.NON_NULL)
    private Integer retries;

    @NotNull
    private String protocol;

    @NotNull
    private String host;

    @NotNull
    private Short port;

    @JsonInclude(Include.NON_NULL)
    private String path;

    @JsonInclude(Include.NON_NULL)
    @JsonProperty("connect_timeout")
    private Integer connectTimeout;

    @JsonInclude(Include.NON_NULL)
    @JsonProperty("write_timeout")
    private Integer writeTimeout;

    @JsonInclude(Include.NON_NULL)
    @JsonProperty("read_timeout")
    private Integer readTimeout;

    @JsonInclude(Include.NON_NULL)
    private String tags;

    @JsonInclude(Include.NON_NULL)
    @JsonProperty("client_certificate")
    private String clientCertificate;

    @JsonInclude(Include.NON_NULL)
    @JsonProperty("tls_verify")
    private Boolean tlsVerify;

    @JsonInclude(Include.NON_NULL)
    @JsonProperty("tls_verify_depth")
    private String tlsVerifyDepth;

    @JsonInclude(Include.NON_NULL)
    @JsonProperty("ca_certificates")
    private String caCertificates;

    @JsonInclude(Include.NON_NULL)
    private String url;

}
