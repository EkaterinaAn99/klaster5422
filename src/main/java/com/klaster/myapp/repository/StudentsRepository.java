package com.klaster.myapp.repository;

import com.klaster.myapp.domain.Students;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Students entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentsRepository extends JpaRepository<Students, Long> {
}
