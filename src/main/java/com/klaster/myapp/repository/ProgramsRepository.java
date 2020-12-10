package com.klaster.myapp.repository;

import com.klaster.myapp.domain.Programs;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Programs entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProgramsRepository extends JpaRepository<Programs, Long> {
}
