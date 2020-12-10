package com.klaster.myapp.repository;

import com.klaster.myapp.domain.GroupOfStudents;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the GroupOfStudents entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GroupOfStudentsRepository extends JpaRepository<GroupOfStudents, Long> {
}
