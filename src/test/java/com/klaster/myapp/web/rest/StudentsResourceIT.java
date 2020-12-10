package com.klaster.myapp.web.rest;

import com.klaster.myapp.Klaster5422App;
import com.klaster.myapp.domain.Students;
import com.klaster.myapp.repository.StudentsRepository;

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
 * Integration tests for the {@link StudentsResource} REST controller.
 */
@SpringBootTest(classes = Klaster5422App.class)
@AutoConfigureMockMvc
@WithMockUser
public class StudentsResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SURNAME = "AAAAAAAAAA";
    private static final String UPDATED_SURNAME = "BBBBBBBBBB";

    private static final String DEFAULT_MIDDLE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_MIDDLE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_GROUP = "AAAAAAAAAA";
    private static final String UPDATED_GROUP = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    @Autowired
    private StudentsRepository studentsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restStudentsMockMvc;

    private Students students;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Students createEntity(EntityManager em) {
        Students students = new Students()
            .name(DEFAULT_NAME)
            .surname(DEFAULT_SURNAME)
            .middleName(DEFAULT_MIDDLE_NAME)
            .group(DEFAULT_GROUP)
            .type(DEFAULT_TYPE);
        return students;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Students createUpdatedEntity(EntityManager em) {
        Students students = new Students()
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .group(UPDATED_GROUP)
            .type(UPDATED_TYPE);
        return students;
    }

    @BeforeEach
    public void initTest() {
        students = createEntity(em);
    }

    @Test
    @Transactional
    public void createStudents() throws Exception {
        int databaseSizeBeforeCreate = studentsRepository.findAll().size();
        // Create the Students
        restStudentsMockMvc.perform(post("/api/students")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(students)))
            .andExpect(status().isCreated());

        // Validate the Students in the database
        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeCreate + 1);
        Students testStudents = studentsList.get(studentsList.size() - 1);
        assertThat(testStudents.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testStudents.getSurname()).isEqualTo(DEFAULT_SURNAME);
        assertThat(testStudents.getMiddleName()).isEqualTo(DEFAULT_MIDDLE_NAME);
        assertThat(testStudents.getGroup()).isEqualTo(DEFAULT_GROUP);
        assertThat(testStudents.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createStudentsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = studentsRepository.findAll().size();

        // Create the Students with an existing ID
        students.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStudentsMockMvc.perform(post("/api/students")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(students)))
            .andExpect(status().isBadRequest());

        // Validate the Students in the database
        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllStudents() throws Exception {
        // Initialize the database
        studentsRepository.saveAndFlush(students);

        // Get all the studentsList
        restStudentsMockMvc.perform(get("/api/students?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(students.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME)))
            .andExpect(jsonPath("$.[*].middleName").value(hasItem(DEFAULT_MIDDLE_NAME)))
            .andExpect(jsonPath("$.[*].group").value(hasItem(DEFAULT_GROUP)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE)));
    }
    
    @Test
    @Transactional
    public void getStudents() throws Exception {
        // Initialize the database
        studentsRepository.saveAndFlush(students);

        // Get the students
        restStudentsMockMvc.perform(get("/api/students/{id}", students.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(students.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.surname").value(DEFAULT_SURNAME))
            .andExpect(jsonPath("$.middleName").value(DEFAULT_MIDDLE_NAME))
            .andExpect(jsonPath("$.group").value(DEFAULT_GROUP))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE));
    }
    @Test
    @Transactional
    public void getNonExistingStudents() throws Exception {
        // Get the students
        restStudentsMockMvc.perform(get("/api/students/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStudents() throws Exception {
        // Initialize the database
        studentsRepository.saveAndFlush(students);

        int databaseSizeBeforeUpdate = studentsRepository.findAll().size();

        // Update the students
        Students updatedStudents = studentsRepository.findById(students.getId()).get();
        // Disconnect from session so that the updates on updatedStudents are not directly saved in db
        em.detach(updatedStudents);
        updatedStudents
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .middleName(UPDATED_MIDDLE_NAME)
            .group(UPDATED_GROUP)
            .type(UPDATED_TYPE);

        restStudentsMockMvc.perform(put("/api/students")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedStudents)))
            .andExpect(status().isOk());

        // Validate the Students in the database
        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeUpdate);
        Students testStudents = studentsList.get(studentsList.size() - 1);
        assertThat(testStudents.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testStudents.getSurname()).isEqualTo(UPDATED_SURNAME);
        assertThat(testStudents.getMiddleName()).isEqualTo(UPDATED_MIDDLE_NAME);
        assertThat(testStudents.getGroup()).isEqualTo(UPDATED_GROUP);
        assertThat(testStudents.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingStudents() throws Exception {
        int databaseSizeBeforeUpdate = studentsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStudentsMockMvc.perform(put("/api/students")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(students)))
            .andExpect(status().isBadRequest());

        // Validate the Students in the database
        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStudents() throws Exception {
        // Initialize the database
        studentsRepository.saveAndFlush(students);

        int databaseSizeBeforeDelete = studentsRepository.findAll().size();

        // Delete the students
        restStudentsMockMvc.perform(delete("/api/students/{id}", students.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Students> studentsList = studentsRepository.findAll();
        assertThat(studentsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
