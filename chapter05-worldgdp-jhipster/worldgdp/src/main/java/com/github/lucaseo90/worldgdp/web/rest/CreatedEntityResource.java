package com.github.lucaseo90.worldgdp.web.rest;

import com.github.lucaseo90.worldgdp.service.CreatedEntityService;
import com.github.lucaseo90.worldgdp.web.rest.errors.BadRequestAlertException;
import com.github.lucaseo90.worldgdp.service.dto.CreatedEntityDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.github.lucaseo90.worldgdp.domain.CreatedEntity}.
 */
@RestController
@RequestMapping("/api")
public class CreatedEntityResource {

    private final Logger log = LoggerFactory.getLogger(CreatedEntityResource.class);

    private static final String ENTITY_NAME = "createdEntity";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CreatedEntityService createdEntityService;

    public CreatedEntityResource(CreatedEntityService createdEntityService) {
        this.createdEntityService = createdEntityService;
    }

    /**
     * {@code POST  /created-entities} : Create a new createdEntity.
     *
     * @param createdEntityDTO the createdEntityDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new createdEntityDTO, or with status {@code 400 (Bad Request)} if the createdEntity has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/created-entities")
    public ResponseEntity<CreatedEntityDTO> createCreatedEntity(@Valid @RequestBody CreatedEntityDTO createdEntityDTO) throws URISyntaxException {
        log.debug("REST request to save CreatedEntity : {}", createdEntityDTO);
        if (createdEntityDTO.getId() != null) {
            throw new BadRequestAlertException("A new createdEntity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CreatedEntityDTO result = createdEntityService.save(createdEntityDTO);
        return ResponseEntity.created(new URI("/api/created-entities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /created-entities} : Updates an existing createdEntity.
     *
     * @param createdEntityDTO the createdEntityDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated createdEntityDTO,
     * or with status {@code 400 (Bad Request)} if the createdEntityDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the createdEntityDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/created-entities")
    public ResponseEntity<CreatedEntityDTO> updateCreatedEntity(@Valid @RequestBody CreatedEntityDTO createdEntityDTO) throws URISyntaxException {
        log.debug("REST request to update CreatedEntity : {}", createdEntityDTO);
        if (createdEntityDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CreatedEntityDTO result = createdEntityService.save(createdEntityDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, createdEntityDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /created-entities} : get all the createdEntities.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of createdEntities in body.
     */
    @GetMapping("/created-entities")
    public ResponseEntity<List<CreatedEntityDTO>> getAllCreatedEntities(Pageable pageable) {
        log.debug("REST request to get a page of CreatedEntities");
        Page<CreatedEntityDTO> page = createdEntityService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /created-entities/:id} : get the "id" createdEntity.
     *
     * @param id the id of the createdEntityDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the createdEntityDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/created-entities/{id}")
    public ResponseEntity<CreatedEntityDTO> getCreatedEntity(@PathVariable Long id) {
        log.debug("REST request to get CreatedEntity : {}", id);
        Optional<CreatedEntityDTO> createdEntityDTO = createdEntityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(createdEntityDTO);
    }

    /**
     * {@code DELETE  /created-entities/:id} : delete the "id" createdEntity.
     *
     * @param id the id of the createdEntityDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/created-entities/{id}")
    public ResponseEntity<Void> deleteCreatedEntity(@PathVariable Long id) {
        log.debug("REST request to delete CreatedEntity : {}", id);
        createdEntityService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
