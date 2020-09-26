package com.github.hsseo0501.worldgdp.test.external;

import com.github.hsseo0501.worldgdp.external.WorldBankApiClient;
import com.github.hsseo0501.worldgdp.model.CountryGDP;
import org.json.simple.parser.ParseException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringJUnitConfig(classes = {WorldBankApiClient.class})
public class WorldBankApiClientTest {

    @Autowired
    private WorldBankApiClient worldBankApiClient;

    @Test
    public void testGetGDP() throws ParseException {
        List<CountryGDP> gdpData = worldBankApiClient.getGDP("IN");
        assertThat(gdpData).hasSize(50);
        CountryGDP gdp = gdpData.get(0);
        assertThat(gdp.getYear()).isEqualTo(Short.valueOf("2020"));
        gdp = gdpData.get(10);
        assertThat(gdp.getYear()).isEqualTo(Short.valueOf("2010"));
    }
}
