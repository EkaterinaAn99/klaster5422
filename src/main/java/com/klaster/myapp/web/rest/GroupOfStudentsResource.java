package com.klaster.myapp.web.rest;

import com.klaster.myapp.domain.GroupOfStudents;
import com.klaster.myapp.repository.GroupOfStudentsRepository;
import com.klaster.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.klaster.myapp.domain.GroupOfStudents}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GroupOfStudentsResource {

    private final Logger log = LoggerFactory.getLogger(GroupOfStudentsResource.class);

    private static final String ENTITY_NAME = "groupOfStudents";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GroupOfStudentsRepository groupOfStudentsRepository;

    public GroupOfStudentsResource(GroupOfStudentsRepository groupOfStudentsRepository) {
        this.groupOfStudentsRepository = groupOfStudentsRepository;
    }

    /**
     * {@code POST  /group-of-students} : Create a new groupOfStudents.
     *
     * @param groupOfStudents the groupOfStudents to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new groupOfStudents, or with status {@code 400 (Bad Request)} if the groupOfStudents has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/group-of-students")
    public ResponseEntity<GroupOfStudents> createGroupOfStudents(@RequestBody GroupOfStudents groupOfStudents) throws URISyntaxException {
        log.debug("REST request to save GroupOfStudents : {}", groupOfStudents);
        if (groupOfStudents.getId() != null) {
            throw new BadRequestAlertException("A new groupOfStudents cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GroupOfStudents result = groupOfStudentsRepository.save(groupOfStudents);
        return ResponseEntity.created(new URI("/api/group-of-students/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /group-of-students} : Updates an existing groupOfStudents.
     *
     * @param groupOfStudents the groupOfStudents to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated groupOfStudents,
     * or with status {@code 400 (Bad Request)} if the groupOfStudents is not valid,
     * or with status {@code 500 (Internal Server Error)} if the groupOfStudents couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/group-of-students")
    public ResponseEntity<GroupOfStudents> updateGroupOfStudents(@RequestBody GroupOfStudents groupOfStudents) throws URISyntaxException {
        log.debug("REST request to update GroupOfStudents : {}", groupOfStudents);
        if (groupOfStudents.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GroupOfStudents result = groupOfStudentsRepository.save(groupOfStudents);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, groupOfStudents.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /group-of-students} : get all the groupOfStudents.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of groupOfStudents in body.
     */
    @GetMapping("/group-of-students")
    public List<GroupOfStudents> getAllGroupOfStudents() {
        log.debug("REST request to get all GroupOfStudents");
        return groupOfStudentsRepository.findAll();
    }

    /**
     * {@code GET  /group-of-students/:id} : get the "id" groupOfStudents.
     *
     * @param id the id of the groupOfStudents to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the groupOfStudents, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/group-of-students/{id}")
    public ResponseEntity<GroupOfStudents> getGroupOfStudents(@PathVariable Long id) {
        log.debug("REST request to get GroupOfStudents : {}", id);
        Optional<GroupOfStudents> groupOfStudents = groupOfStudentsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(groupOfStudents);
    }

    /**
     * {@code DELETE  /group-of-students/:id} : delete the "id" groupOfStudents.
     *
     * @param id the id of the groupOfStudents to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/group-of-students/{id}")
    public ResponseEntity<Void> deleteGroupOfStudents(@PathVariable Long id) {
        log.debug("REST request to delete GroupOfStudents : {}", id);
        groupOfStudentsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
