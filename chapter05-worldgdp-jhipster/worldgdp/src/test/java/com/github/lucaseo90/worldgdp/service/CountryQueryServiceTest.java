package com.github.lucaseo90.worldgdp.service;

import com.github.lucaseo90.worldgdp.domain.Country;
import com.github.lucaseo90.worldgdp.domain.enumeration.Continent;
import com.github.lucaseo90.worldgdp.repository.CountryRepository;
import com.github.lucaseo90.worldgdp.service.dto.CountryCriteria;
import com.github.lucaseo90.worldgdp.service.dto.CountryCriteria.ContinentFilter;
import com.github.lucaseo90.worldgdp.service.dto.CountryDTO;
import com.github.lucaseo90.worldgdp.service.mapper.CountryMapper;
import io.github.jhipster.service.filter.StringFilter;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import org.junit.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class CountryQueryServiceTest {

    @Autowired
    private CountryQueryService countryQueryService;

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private EntityManager em;

    private List<Country> countries;

    private List<Country> createEntities() {
        List<Country> entities = new ArrayList<>();
        entities.add(new Country().code("ABW").name("Aruba").continent(Continent.NORTH_AMERICA).region("Caribbean").surfaceArea(193.0F).population(103000).lifeExpectancy(78.4F).localName("Aruba").governmentForm("Nonmetropolitan Territory of The Netherlands"));
        entities.add(new Country().code("AFG").name("Afghanistan").continent(Continent.ASIA).region("Southern and Central Asia").surfaceArea(652090.0F).population(22720000).lifeExpectancy(45.9F).localName("Afganistan/Afqanestan").governmentForm("Islamic Emirate"));
        entities.add(new Country().code("AGO").name("Angola").continent(Continent.AFRICA).region("Central Africa").surfaceArea(1246700.0F).population(12878000).lifeExpectancy(38.3F).localName("Angola").governmentForm("Republic"));
        entities.add(new Country().code("AIA").name("Anguilla").continent(Continent.NORTH_AMERICA).region("Caribbean").surfaceArea(96.0F).population(8000).lifeExpectancy(76.1F).localName("Anguilla").governmentForm("Dependent Territory of the UK"));
        entities.add(new Country().code("ALB").name("Albania").continent(Continent.EUROPE).region("Southern Europe").surfaceArea(28748.0F).population(3401200).lifeExpectancy(71.6F).localName("ShqipÃ").governmentForm("Republic"));

        entities.add(new Country().code("AND").name("Andorra").continent(Continent.EUROPE).region("Southern Europe").surfaceArea(468.0F).population(78000).lifeExpectancy(83.5F).localName("Andorra").governmentForm("Parliamentary Coprincipality"));
        entities.add(new Country().code("ANT").name("Netherlands").continent(Continent.NORTH_AMERICA).region("Caribbean").surfaceArea(800.0F).population(217000).lifeExpectancy(74.7F).localName("Nederlandse Antillen").governmentForm("Nonmetropolitan Territory of The Netherlands"));
        entities.add(new Country().code("ARE").name("United Arab Emirates").continent(Continent.ASIA).region("Middle East").surfaceArea(83600.0F).population(2441000).lifeExpectancy(74.1F).localName("Al-Imarat al-Â´Arabiya al-Muttahida").governmentForm("Emirate Federation"));
        entities.add(new Country().code("ARG").name("Argentina").continent(Continent.SOUTH_AMERICA).region("South America").surfaceArea(2780400.0F).population(37032000).lifeExpectancy(75.1F).localName("Argentina").governmentForm("Federal Republic"));
        entities.add(new Country().code("ARM").name("Armenia").continent(Continent.ASIA).region("Middle East").surfaceArea(29800.0F).population(3520000).lifeExpectancy(66.4F).localName("Hajastan").governmentForm("Republic"));
        return entities;
    }

    @BeforeEach
    public void initTest() {
        countries = createEntities();
        // Create the Country
        for (int i = 0; i < countries.size(); i++) {
            countryRepository.save(countries.get(i));
        }
    }

    @Test
    public void getAllCountries() {
        CountryCriteria countryCriteria = new CountryCriteria();
        List<CountryDTO> countries = countryQueryService.findByCriteria(countryCriteria);
        Assert.assertEquals(10, countries.size());
    }

    @Test
    public void getAsiaCountries() {
        ContinentFilter continentFilter = new ContinentFilter();
        continentFilter.setEquals(Continent.ASIA);

        CountryCriteria countryCriteria = new CountryCriteria();
        countryCriteria.setContinent(continentFilter);

        List<CountryDTO> countries = countryQueryService.findByCriteria(countryCriteria);
        Assert.assertEquals(3, countries.size());
    }

    @Test
    public void getAsiaCountriesWithAfghanistanKeyword() {
        ContinentFilter continentFilter = new ContinentFilter();
        continentFilter.setEquals(Continent.ASIA);
        StringFilter stringFilter = new StringFilter();
        stringFilter.setContains("Afghanistan");

        CountryCriteria countryCriteria = new CountryCriteria();
        countryCriteria.setContinent(continentFilter);
        countryCriteria.setName(stringFilter);

        List<CountryDTO> countries = countryQueryService.findByCriteria(countryCriteria);
        Assert.assertEquals(1, countries.size());
    }

}
