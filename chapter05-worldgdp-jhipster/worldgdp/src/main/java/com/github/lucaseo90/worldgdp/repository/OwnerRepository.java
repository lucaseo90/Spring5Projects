package com.github.lucaseo90.worldgdp.repository;

import com.github.lucaseo90.worldgdp.domain.Owner;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Owner entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OwnerRepository extends JpaRepository<Owner, Long> {
}
