package com.github.lucaseo90.worldgdp.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;

/**
 * A DTO for the {@link com.github.lucaseo90.worldgdp.domain.CreatedEntity} entity.
 */
public class CreatedEntityDTO implements Serializable {
    
    private Long id;

    @NotNull
    private String createdField;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCreatedField() {
        return createdField;
    }

    public void setCreatedField(String createdField) {
        this.createdField = createdField;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CreatedEntityDTO)) {
            return false;
        }

        return id != null && id.equals(((CreatedEntityDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CreatedEntityDTO{" +
            "id=" + getId() +
            ", createdField='" + getCreatedField() + "'" +
            "}";
    }
}
