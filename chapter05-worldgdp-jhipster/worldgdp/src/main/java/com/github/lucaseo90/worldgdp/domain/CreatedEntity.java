package com.github.lucaseo90.worldgdp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A CreatedEntity.
 */
@Entity
@Table(name = "created_entity")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CreatedEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "created_field", nullable = false, unique = true)
    private String createdField;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCreatedField() {
        return createdField;
    }

    public CreatedEntity createdField(String createdField) {
        this.createdField = createdField;
        return this;
    }

    public void setCreatedField(String createdField) {
        this.createdField = createdField;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CreatedEntity)) {
            return false;
        }
        return id != null && id.equals(((CreatedEntity) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CreatedEntity{" +
            "id=" + getId() +
            ", createdField='" + getCreatedField() + "'" +
            "}";
    }
}
