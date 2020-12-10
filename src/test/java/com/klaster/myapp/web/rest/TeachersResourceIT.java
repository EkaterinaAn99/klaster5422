package com.klaster.myapp.web.rest;

import com.klaster.myapp.Klaster5422App;
import com.klaster.myapp.domain.Teachers;
import com.klaster.myapp.repository.TeachersRepository;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TeachersResource} REST controller.
 */
@SpringBootTest(classes = Klaster5422App.class)
@AutoConfigureMockMvc
@WithMockUser
public class TeachersResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SURNAME = "AAAAAAAAAA";
    private static final String UPDATED_SURNAME = "BBBBBBBBBB";

    private static final String DEFAULT_MIDDLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MIDDLE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    @Autowired
    private TeachersRepository teachersRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTeachersMockMvc;

    private Teachers teachers;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Teachers createEntity(EntityManager em) {
        Teachers teachers = new Teachers()
            .name(DEFAULT_NAME)
            .surname(DEFAULT_SURNAME)
            .middleName(DEFAULT_MIDDLE_NAME)
            .type(DEFAULT_TYPE);
        return teachers;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Teachers createUpdatedEntity(EntityManager em) {
        Teachers teachers = new Teachers()
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .type(UPDATED_TYPE);
        return teachers;
    }

    @BeforeEach
    public void initTest() {
        teachers = createEntity(em);
    }

    @Test
    @Transactional
    public void createTeachers() throws Exception {
        int databaseSizeBeforeCreate = teachersRepository.findAll().size();
        // Create the Teachers
        restTeachersMockMvc.perform(post("/api/teachers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(teachers)))
            .andExpect(status().isCreated());

        // Validate the Teachers in the database
        List<Teachers> teachersList = teachersRepository.findAll();
        assertThat(teachersList).hasSize(databaseSizeBeforeCreate + 1);
        Teachers testTeachers = teachersList.get(teachersList.size() - 1);
        assertThat(testTeachers.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testTeachers.getSurname()).isEqualTo(DEFAULT_SURNAME);
        assertThat(testTeachers.getMiddleName()).isEqualTo(DEFAULT_MIDDLE_NAME);
        assertThat(testTeachers.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createTeachersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = teachersRepository.findAll().size();

        // Create the Teachers with an existing ID
        teachers.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTeachersMockMvc.perform(post("/api/teachers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(teachers)))
            .andExpect(status().isBadRequest());

        // Validate the Teachers in the database
        List<Teachers> teachersList = teachersRepository.findAll();
        assertThat(teachersList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTeachers() throws Exception {
        // Initialize the database
        teachersRepository.saveAndFlush(teachers);

        // Get all the teachersList
        restTeachersMockMvc.perform(get("/api/teachers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(teachers.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME)))
            .andExpect(jsonPath("$.[*].middleName").value(hasItem(DEFAULT_MIDDLE_NAME)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)));
    }
    
    @Test
    @Transactional
    public void getTeachers() throws Exception {
        // Initialize the database
        teachersRepository.saveAndFlush(teachers);

        // Get the teachers
        restTeachersMockMvc.perform(get("/api/teachers/{id}", teachers.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(teachers.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.surname").value(DEFAULT_SURNAME))
            .andExpect(jsonPath("$.middleName").value(DEFAULT_MIDDLE_NAME))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE));
    }
    @Test
    @Transactional
    public void getNonExistingTeachers() throws Exception {
        // Get the teachers
        restTeachersMockMvc.perform(get("/api/teachers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTeachers() throws Exception {
        // Initialize the database
        teachersRepository.saveAndFlush(teachers);

        int databaseSizeBeforeUpdate = teachersRepository.findAll().size();

        // Update the teachers
        Teachers updatedTeachers = teachersRepository.findById(teachers.getId()).get();
        // Disconnect from session so that the updates on updatedTeachers are not directly saved in db
        em.detach(updatedTeachers);
        updatedTeachers
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .type(UPDATED_TYPE);

        restTeachersMockMvc.perform(put("/api/teachers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTeachers)))
            .andExpect(status().isOk());

        // Validate the Teachers in the database
        List<Teachers> teachersList = teachersRepository.findAll();
        assertThat(teachersList).hasSize(databaseSizeBeforeUpdate);
        Teachers testTeachers = teachersList.get(teachersList.size() - 1);
        assertThat(testTeachers.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testTeachers.getSurname()).isEqualTo(UPDATED_SURNAME);
        assertThat(testTeachers.getMiddleName()).isEqualTo(UPDATED_MIDDLE_NAME);
        assertThat(testTeachers.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingTeachers() throws Exception {
        int databaseSizeBeforeUpdate = teachersRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTeachersMockMvc.perform(put("/api/teachers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(teachers)))
            .andExpect(status().isBadRequest());

        // Validate the Teachers in the database
        List<Teachers> teachersList = teachersRepository.findAll();
        assertThat(teachersList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTeachers() throws Exception {
        // Initialize the database
        teachersRepository.saveAndFlush(teachers);

        int databaseSizeBeforeDelete = teachersRepository.findAll().size();

        // Delete the teachers
        restTeachersMockMvc.perform(delete("/api/teachers/{id}", teachers.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Teachers> teachersList = teachersRepository.findAll();
        assertThat(teachersList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
