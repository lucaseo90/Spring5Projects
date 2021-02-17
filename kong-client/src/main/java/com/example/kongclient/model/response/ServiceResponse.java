package com.example.kongclient.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.sql.Timestamp;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ServiceResponse {

    private String id;

    @JsonProperty("created_at")
    private Long createdAt;

    @JsonProperty("updated_at")
    private Long updatedAt;

    private String name;

    private Integer retries;

    private String protocol;

    private String host;

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

}
