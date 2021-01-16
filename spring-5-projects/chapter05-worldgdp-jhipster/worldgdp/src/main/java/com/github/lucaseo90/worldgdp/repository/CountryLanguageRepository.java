package com.github.lucaseo90.worldgdp.repository;

import com.github.lucaseo90.worldgdp.domain.CountryLanguage;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CountryLanguage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CountryLanguageRepository extends JpaRepository<CountryLanguage, Long> {
}
