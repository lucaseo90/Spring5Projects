package com.github.lucaseo90.worldgdp.repository;

import com.github.lucaseo90.worldgdp.domain.City;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the City entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CityRepository extends JpaRepository<City, Long> {
}
