package com.github.lucaseo90.worldgdp.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class CreatedEntityMapperTest {

    private CreatedEntityMapper createdEntityMapper;

    @BeforeEach
    public void setUp() {
        createdEntityMapper = new CreatedEntityMapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(createdEntityMapper.fromId(id).getId()).isEqualTo(id);
        assertThat(createdEntityMapper.fromId(null)).isNull();
    }
}
