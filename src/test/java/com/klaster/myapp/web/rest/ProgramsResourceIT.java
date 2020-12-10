package com.klaster.myapp.web.rest;

import com.klaster.myapp.Klaster5422App;
import com.klaster.myapp.domain.Programs;
import com.klaster.myapp.repository.ProgramsRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.klaster.myapp.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProgramsResource} REST controller.
 */
@SpringBootTest(classes = Klaster5422App.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProgramsResourceIT {

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_WHO_ADD = "AAAAAAAAAA";
    private static final String UPDATED_WHO_ADD = "BBBBBBBBBB";

    private static final String DEFAULT_GROUP = "AAAAAAAAAA";
    private static final String UPDATED_GROUP = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADRESS = "BBBBBBBBBB";

    @Autowired
    private ProgramsRepository programsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProgramsMockMvc;

    private Programs programs;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Programs createEntity(EntityManager em) {
        Programs programs = new Programs()
            .date(DEFAULT_DATE)
            .whoAdd(DEFAULT_WHO_ADD)
            .group(DEFAULT_GROUP)
            .adress(DEFAULT_ADRESS);
        return programs;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Programs createUpdatedEntity(EntityManager em) {
        Programs programs = new Programs()
            .date(UPDATED_DATE)
            .whoAdd(UPDATED_WHO_ADD)
            .group(UPDATED_GROUP)
            .adress(UPDATED_ADRESS);
        return programs;
    }

    @BeforeEach
    public void initTest() {
        programs = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrograms() throws Exception {
        int databaseSizeBeforeCreate = programsRepository.findAll().size();
        // Create the Programs
        restProgramsMockMvc.perform(post("/api/programs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(programs)))
            .andExpect(status().isCreated());

        // Validate the Programs in the database
        List<Programs> programsList = programsRepository.findAll();
        assertThat(programsList).hasSize(databaseSizeBeforeCreate + 1);
        Programs testPrograms = programsList.get(programsList.size() - 1);
        assertThat(testPrograms.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testPrograms.getWhoAdd()).isEqualTo(DEFAULT_WHO_ADD);
        assertThat(testPrograms.getGroup()).isEqualTo(DEFAULT_GROUP);
        assertThat(testPrograms.getAdress()).isEqualTo(DEFAULT_ADRESS);
    }

    @Test
    @Transactional
    public void createProgramsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = programsRepository.findAll().size();

        // Create the Programs with an existing ID
        programs.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProgramsMockMvc.perform(post("/api/programs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(programs)))
            .andExpect(status().isBadRequest());

        // Validate the Programs in the database
        List<Programs> programsList = programsRepository.findAll();
        assertThat(programsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPrograms() throws Exception {
        // Initialize the database
        programsRepository.saveAndFlush(programs);

        // Get all the programsList
        restProgramsMockMvc.perform(get("/api/programs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(programs.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))))
            .andExpect(jsonPath("$.[*].whoAdd").value(hasItem(DEFAULT_WHO_ADD)))
            .andExpect(jsonPath("$.[*].group").value(hasItem(DEFAULT_GROUP)))
            .andExpect(jsonPath("$.[*].adress").value(hasItem(DEFAULT_ADRESS)));
    }
    
    @Test
    @Transactional
    public void getPrograms() throws Exception {
        // Initialize the database
        programsRepository.saveAndFlush(programs);

        // Get the programs
        restProgramsMockMvc.perform(get("/api/programs/{id}", programs.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(programs.getId().intValue()))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)))
            .andExpect(jsonPath("$.whoAdd").value(DEFAULT_WHO_ADD))
            .andExpect(jsonPath("$.group").value(DEFAULT_GROUP))
            .andExpect(jsonPath("$.adress").value(DEFAULT_ADRESS));
    }
    @Test
    @Transactional
    public void getNonExistingPrograms() throws Exception {
        // Get the programs
        restProgramsMockMvc.perform(get("/api/programs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrograms() throws Exception {
        // Initialize the database
        programsRepository.saveAndFlush(programs);

        int databaseSizeBeforeUpdate = programsRepository.findAll().size();

        // Update the programs
        Programs updatedPrograms = programsRepository.findById(programs.getId()).get();
        // Disconnect from session so that the updates on updatedPrograms are not directly saved in db
        em.detach(updatedPrograms);
        updatedPrograms
            .date(UPDATED_DATE)
            .whoAdd(UPDATED_WHO_ADD)
            .group(UPDATED_GROUP)
            .adress(UPDATED_ADRESS);

        restProgramsMockMvc.perform(put("/api/programs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrograms)))
            .andExpect(status().isOk());

        // Validate the Programs in the database
        List<Programs> programsList = programsRepository.findAll();
        assertThat(programsList).hasSize(databaseSizeBeforeUpdate);
        Programs testPrograms = programsList.get(programsList.size() - 1);
        assertThat(testPrograms.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testPrograms.getWhoAdd()).isEqualTo(UPDATED_WHO_ADD);
        assertThat(testPrograms.getGroup()).isEqualTo(UPDATED_GROUP);
        assertThat(testPrograms.getAdress()).isEqualTo(UPDATED_ADRESS);
    }

    @Test
    @Transactional
    public void updateNonExistingPrograms() throws Exception {
        int databaseSizeBeforeUpdate = programsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProgramsMockMvc.perform(put("/api/programs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(programs)))
            .andExpect(status().isBadRequest());

        // Validate the Programs in the database
        List<Programs> programsList = programsRepository.findAll();
        assertThat(programsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePrograms() throws Exception {
        // Initialize the database
        programsRepository.saveAndFlush(programs);

        int databaseSizeBeforeDelete = programsRepository.findAll().size();

        // Delete the programs
        restProgramsMockMvc.perform(delete("/api/programs/{id}", programs.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Programs> programsList = programsRepository.findAll();
        assertThat(programsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
