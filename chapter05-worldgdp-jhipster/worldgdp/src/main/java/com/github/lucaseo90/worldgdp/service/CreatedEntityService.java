package com.github.lucaseo90.worldgdp.service;

import com.github.lucaseo90.worldgdp.service.dto.CreatedEntityDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link com.github.lucaseo90.worldgdp.domain.CreatedEntity}.
 */
public interface CreatedEntityService {

    /**
     * Save a createdEntity.
     *
     * @param createdEntityDTO the entity to save.
     * @return the persisted entity.
     */
    CreatedEntityDTO save(CreatedEntityDTO createdEntityDTO);

    /**
     * Get all the createdEntities.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CreatedEntityDTO> findAll(Pageable pageable);


    /**
     * Get the "id" createdEntity.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CreatedEntityDTO> findOne(Long id);

    /**
     * Delete the "id" createdEntity.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
