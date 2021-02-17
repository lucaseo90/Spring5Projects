package com.example.kongclient.model.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@JsonInclude(Include.NON_NULL)
public class ServiceRequest {

    private String name;

    private Integer retries;

    @NotNull
    private String protocol;

    @NotNull
    private String host;

    @NotNull
    private Short port;

    private String path;

    @JsonProperty("connect_timeout")
    private Integer connectTimeout;

    @JsonProperty("write_timeout")
    private Integer writeTimeout;

    @JsonProperty("read_timeout")
    private Integer readTimeout;

    private String tags;

    @JsonProperty("client_certificate")
    private String clientCertificate;

    @JsonProperty("tls_verify")
    private Boolean tlsVerify;

    @JsonProperty("tls_verify_depth")
    private String tlsVerifyDepth;

    @JsonProperty("ca_certificates")
    private String caCertificates;

    private String url;

}
