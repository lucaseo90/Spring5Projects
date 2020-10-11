package com.github.lucaseo90.worldgdp.service.mapper;


import com.github.lucaseo90.worldgdp.domain.*;
import com.github.lucaseo90.worldgdp.service.dto.OwnerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Owner} and its DTO {@link OwnerDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface OwnerMapper extends EntityMapper<OwnerDTO, Owner> {



    default Owner fromId(Long id) {
        if (id == null) {
            return null;
        }
        Owner owner = new Owner();
        owner.setId(id);
        return owner;
    }
}
