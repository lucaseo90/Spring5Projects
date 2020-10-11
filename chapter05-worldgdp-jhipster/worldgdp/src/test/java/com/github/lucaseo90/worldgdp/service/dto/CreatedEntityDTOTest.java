package com.github.lucaseo90.worldgdp.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.github.lucaseo90.worldgdp.web.rest.TestUtil;

public class CreatedEntityDTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CreatedEntityDTO.class);
        CreatedEntityDTO createdEntityDTO1 = new CreatedEntityDTO();
        createdEntityDTO1.setId(1L);
        CreatedEntityDTO createdEntityDTO2 = new CreatedEntityDTO();
        assertThat(createdEntityDTO1).isNotEqualTo(createdEntityDTO2);
        createdEntityDTO2.setId(createdEntityDTO1.getId());
        assertThat(createdEntityDTO1).isEqualTo(createdEntityDTO2);
        createdEntityDTO2.setId(2L);
        assertThat(createdEntityDTO1).isNotEqualTo(createdEntityDTO2);
        createdEntityDTO1.setId(null);
        assertThat(createdEntityDTO1).isNotEqualTo(createdEntityDTO2);
    }
}
