package com.github.lucaseo90.worldgdp.domain.enumeration.converter;

import com.github.lucaseo90.worldgdp.domain.enumeration.Continent;
import javax.persistence.AttributeConverter;

public class ContinentEnumConvertor implements AttributeConverter<Continent, String> {

    @Override
    public String convertToDatabaseColumn(Continent continent) {
        return continent.getName();
    }

    @Override
    public Continent convertToEntityAttribute(String continentValue) {
        return Continent.getContinent(continentValue);
    }

}
