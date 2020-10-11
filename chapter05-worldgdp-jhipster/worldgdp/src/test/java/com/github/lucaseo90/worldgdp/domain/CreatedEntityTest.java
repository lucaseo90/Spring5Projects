package com.github.lucaseo90.worldgdp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.github.lucaseo90.worldgdp.web.rest.TestUtil;

public class CreatedEntityTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CreatedEntity.class);
        CreatedEntity createdEntity1 = new CreatedEntity();
        createdEntity1.setId(1L);
        CreatedEntity createdEntity2 = new CreatedEntity();
        createdEntity2.setId(createdEntity1.getId());
        assertThat(createdEntity1).isEqualTo(createdEntity2);
        createdEntity2.setId(2L);
        assertThat(createdEntity1).isNotEqualTo(createdEntity2);
        createdEntity1.setId(null);
        assertThat(createdEntity1).isNotEqualTo(createdEntity2);
    }
}
