package com.github.lucaseo90.worldgdp.repository;

import com.github.lucaseo90.worldgdp.domain.CreatedEntity;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CreatedEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CreatedEntityRepository extends JpaRepository<CreatedEntity, Long> {
}
