package com.github.hsseo0501.worldgdp.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class Country {
    private String code;
    private String name;
    private String continent;
    private String region;
    private String surfaceArea;
    private Short indepYear;
    private Long population;
    private Double lifeExpectancy;
    private Double gnp;
    private String localName;
    private String governmentForm;
    private String headOfState;
    private City capital;
    private String code2;
}
