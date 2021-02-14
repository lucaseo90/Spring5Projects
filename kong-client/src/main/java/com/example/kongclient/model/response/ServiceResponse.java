package com.example.kongclient.model.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class ServiceResponse {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String id;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("created_at")
    private Long createdAt;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("updated_at")
    private Long updatedAt;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String name;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer retries;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String protocol;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String host;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Short port;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String path;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("connect_timeout")
    private Integer connectTimeout;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("write_timeout")
    private Integer writeTimeout;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("read_timeout")
    private Integer readTimeout;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String tags;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("client_certificate")
    private String clientCertificate;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("tls_verify")
    private Boolean tlsVerify;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("tls_verify_depth")
    private String tlsVerifyDepth;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JsonProperty("ca_certificates")
    private String caCertificates;

}
