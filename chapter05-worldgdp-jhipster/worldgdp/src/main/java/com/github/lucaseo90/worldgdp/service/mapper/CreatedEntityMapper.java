package com.github.lucaseo90.worldgdp.service.mapper;


import com.github.lucaseo90.worldgdp.domain.*;
import com.github.lucaseo90.worldgdp.service.dto.CreatedEntityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link CreatedEntity} and its DTO {@link CreatedEntityDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CreatedEntityMapper extends EntityMapper<CreatedEntityDTO, CreatedEntity> {



    default CreatedEntity fromId(Long id) {
        if (id == null) {
            return null;
        }
        CreatedEntity createdEntity = new CreatedEntity();
        createdEntity.setId(id);
        return createdEntity;
    }
}
