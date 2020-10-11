package com.github.lucaseo90.worldgdp.web.rest;

import com.github.lucaseo90.worldgdp.WorldgdpApp;
import com.github.lucaseo90.worldgdp.domain.CreatedEntity;
import com.github.lucaseo90.worldgdp.repository.CreatedEntityRepository;
import com.github.lucaseo90.worldgdp.service.CreatedEntityService;
import com.github.lucaseo90.worldgdp.service.dto.CreatedEntityDTO;
import com.github.lucaseo90.worldgdp.service.mapper.CreatedEntityMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CreatedEntityResource} REST controller.
 */
@SpringBootTest(classes = WorldgdpApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CreatedEntityResourceIT {

    private static final String DEFAULT_CREATED_FIELD = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_FIELD = "BBBBBBBBBB";

    @Autowired
    private CreatedEntityRepository createdEntityRepository;

    @Autowired
    private CreatedEntityMapper createdEntityMapper;

    @Autowired
    private CreatedEntityService createdEntityService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCreatedEntityMockMvc;

    private CreatedEntity createdEntity;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CreatedEntity createEntity(EntityManager em) {
        CreatedEntity createdEntity = new CreatedEntity()
            .createdField(DEFAULT_CREATED_FIELD);
        return createdEntity;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CreatedEntity createUpdatedEntity(EntityManager em) {
        CreatedEntity createdEntity = new CreatedEntity()
            .createdField(UPDATED_CREATED_FIELD);
        return createdEntity;
    }

    @BeforeEach
    public void initTest() {
        createdEntity = createEntity(em);
    }

    @Test
    @Transactional
    public void createCreatedEntity() throws Exception {
        int databaseSizeBeforeCreate = createdEntityRepository.findAll().size();
        // Create the CreatedEntity
        CreatedEntityDTO createdEntityDTO = createdEntityMapper.toDto(createdEntity);
        restCreatedEntityMockMvc.perform(post("/api/created-entities").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(createdEntityDTO)))
            .andExpect(status().isCreated());

        // Validate the CreatedEntity in the database
        List<CreatedEntity> createdEntityList = createdEntityRepository.findAll();
        assertThat(createdEntityList).hasSize(databaseSizeBeforeCreate + 1);
        CreatedEntity testCreatedEntity = createdEntityList.get(createdEntityList.size() - 1);
        assertThat(testCreatedEntity.getCreatedField()).isEqualTo(DEFAULT_CREATED_FIELD);
    }

    @Test
    @Transactional
    public void createCreatedEntityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = createdEntityRepository.findAll().size();

        // Create the CreatedEntity with an existing ID
        createdEntity.setId(1L);
        CreatedEntityDTO createdEntityDTO = createdEntityMapper.toDto(createdEntity);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCreatedEntityMockMvc.perform(post("/api/created-entities").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(createdEntityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CreatedEntity in the database
        List<CreatedEntity> createdEntityList = createdEntityRepository.findAll();
        assertThat(createdEntityList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkCreatedFieldIsRequired() throws Exception {
        int databaseSizeBeforeTest = createdEntityRepository.findAll().size();
        // set the field null
        createdEntity.setCreatedField(null);

        // Create the CreatedEntity, which fails.
        CreatedEntityDTO createdEntityDTO = createdEntityMapper.toDto(createdEntity);


        restCreatedEntityMockMvc.perform(post("/api/created-entities").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(createdEntityDTO)))
            .andExpect(status().isBadRequest());

        List<CreatedEntity> createdEntityList = createdEntityRepository.findAll();
        assertThat(createdEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCreatedEntities() throws Exception {
        // Initialize the database
        createdEntityRepository.saveAndFlush(createdEntity);

        // Get all the createdEntityList
        restCreatedEntityMockMvc.perform(get("/api/created-entities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(createdEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].createdField").value(hasItem(DEFAULT_CREATED_FIELD)));
    }
    
    @Test
    @Transactional
    public void getCreatedEntity() throws Exception {
        // Initialize the database
        createdEntityRepository.saveAndFlush(createdEntity);

        // Get the createdEntity
        restCreatedEntityMockMvc.perform(get("/api/created-entities/{id}", createdEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(createdEntity.getId().intValue()))
            .andExpect(jsonPath("$.createdField").value(DEFAULT_CREATED_FIELD));
    }
    @Test
    @Transactional
    public void getNonExistingCreatedEntity() throws Exception {
        // Get the createdEntity
        restCreatedEntityMockMvc.perform(get("/api/created-entities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCreatedEntity() throws Exception {
        // Initialize the database
        createdEntityRepository.saveAndFlush(createdEntity);

        int databaseSizeBeforeUpdate = createdEntityRepository.findAll().size();

        // Update the createdEntity
        CreatedEntity updatedCreatedEntity = createdEntityRepository.findById(createdEntity.getId()).get();
        // Disconnect from session so that the updates on updatedCreatedEntity are not directly saved in db
        em.detach(updatedCreatedEntity);
        updatedCreatedEntity
            .createdField(UPDATED_CREATED_FIELD);
        CreatedEntityDTO createdEntityDTO = createdEntityMapper.toDto(updatedCreatedEntity);

        restCreatedEntityMockMvc.perform(put("/api/created-entities").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(createdEntityDTO)))
            .andExpect(status().isOk());

        // Validate the CreatedEntity in the database
        List<CreatedEntity> createdEntityList = createdEntityRepository.findAll();
        assertThat(createdEntityList).hasSize(databaseSizeBeforeUpdate);
        CreatedEntity testCreatedEntity = createdEntityList.get(createdEntityList.size() - 1);
        assertThat(testCreatedEntity.getCreatedField()).isEqualTo(UPDATED_CREATED_FIELD);
    }

    @Test
    @Transactional
    public void updateNonExistingCreatedEntity() throws Exception {
        int databaseSizeBeforeUpdate = createdEntityRepository.findAll().size();

        // Create the CreatedEntity
        CreatedEntityDTO createdEntityDTO = createdEntityMapper.toDto(createdEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCreatedEntityMockMvc.perform(put("/api/created-entities").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(createdEntityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the CreatedEntity in the database
        List<CreatedEntity> createdEntityList = createdEntityRepository.findAll();
        assertThat(createdEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCreatedEntity() throws Exception {
        // Initialize the database
        createdEntityRepository.saveAndFlush(createdEntity);

        int databaseSizeBeforeDelete = createdEntityRepository.findAll().size();

        // Delete the createdEntity
        restCreatedEntityMockMvc.perform(delete("/api/created-entities/{id}", createdEntity.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CreatedEntity> createdEntityList = createdEntityRepository.findAll();
        assertThat(createdEntityList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
