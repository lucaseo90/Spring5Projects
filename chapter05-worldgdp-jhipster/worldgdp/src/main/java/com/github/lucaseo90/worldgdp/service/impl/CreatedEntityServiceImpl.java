package com.github.lucaseo90.worldgdp.service.impl;

import com.github.lucaseo90.worldgdp.service.CreatedEntityService;
import com.github.lucaseo90.worldgdp.domain.CreatedEntity;
import com.github.lucaseo90.worldgdp.repository.CreatedEntityRepository;
import com.github.lucaseo90.worldgdp.service.dto.CreatedEntityDTO;
import com.github.lucaseo90.worldgdp.service.mapper.CreatedEntityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link CreatedEntity}.
 */
@Service
@Transactional
public class CreatedEntityServiceImpl implements CreatedEntityService {

    private final Logger log = LoggerFactory.getLogger(CreatedEntityServiceImpl.class);

    private final CreatedEntityRepository createdEntityRepository;

    private final CreatedEntityMapper createdEntityMapper;

    public CreatedEntityServiceImpl(CreatedEntityRepository createdEntityRepository, CreatedEntityMapper createdEntityMapper) {
        this.createdEntityRepository = createdEntityRepository;
        this.createdEntityMapper = createdEntityMapper;
    }

    @Override
    public CreatedEntityDTO save(CreatedEntityDTO createdEntityDTO) {
        log.debug("Request to save CreatedEntity : {}", createdEntityDTO);
        CreatedEntity createdEntity = createdEntityMapper.toEntity(createdEntityDTO);
        createdEntity = createdEntityRepository.save(createdEntity);
        return createdEntityMapper.toDto(createdEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CreatedEntityDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CreatedEntities");
        return createdEntityRepository.findAll(pageable)
            .map(createdEntityMapper::toDto);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<CreatedEntityDTO> findOne(Long id) {
        log.debug("Request to get CreatedEntity : {}", id);
        return createdEntityRepository.findById(id)
            .map(createdEntityMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CreatedEntity : {}", id);
        createdEntityRepository.deleteById(id);
    }
}
