package com.klaster.myapp.web.rest;

import com.klaster.myapp.domain.Programs;
import com.klaster.myapp.repository.ProgramsRepository;
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
 * REST controller for managing {@link com.klaster.myapp.domain.Programs}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProgramsResource {

    private final Logger log = LoggerFactory.getLogger(ProgramsResource.class);

    private static final String ENTITY_NAME = "programs";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProgramsRepository programsRepository;

    public ProgramsResource(ProgramsRepository programsRepository) {
        this.programsRepository = programsRepository;
    }

    /**
     * {@code POST  /programs} : Create a new programs.
     *
     * @param programs the programs to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new programs, or with status {@code 400 (Bad Request)} if the programs has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/programs")
    public ResponseEntity<Programs> createPrograms(@RequestBody Programs programs) throws URISyntaxException {
        log.debug("REST request to save Programs : {}", programs);
        if (programs.getId() != null) {
            throw new BadRequestAlertException("A new programs cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Programs result = programsRepository.save(programs);
        return ResponseEntity.created(new URI("/api/programs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /programs} : Updates an existing programs.
     *
     * @param programs the programs to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated programs,
     * or with status {@code 400 (Bad Request)} if the programs is not valid,
     * or with status {@code 500 (Internal Server Error)} if the programs couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/programs")
    public ResponseEntity<Programs> updatePrograms(@RequestBody Programs programs) throws URISyntaxException {
        log.debug("REST request to update Programs : {}", programs);
        if (programs.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Programs result = programsRepository.save(programs);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, programs.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /programs} : get all the programs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of programs in body.
     */
    @GetMapping("/programs")
    public List<Programs> getAllPrograms() {
        log.debug("REST request to get all Programs");
        return programsRepository.findAll();
    }

    /**
     * {@code GET  /programs/:id} : get the "id" programs.
     *
     * @param id the id of the programs to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the programs, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/programs/{id}")
    public ResponseEntity<Programs> getPrograms(@PathVariable Long id) {
        log.debug("REST request to get Programs : {}", id);
        Optional<Programs> programs = programsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(programs);
    }

    /**
     * {@code DELETE  /programs/:id} : delete the "id" programs.
     *
     * @param id the id of the programs to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/programs/{id}")
    public ResponseEntity<Void> deletePrograms(@PathVariable Long id) {
        log.debug("REST request to delete Programs : {}", id);
        programsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
