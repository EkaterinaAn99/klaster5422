package com.klaster.myapp.web.rest;

import com.klaster.myapp.Klaster5422App;
import com.klaster.myapp.domain.GroupOfStudents;
import com.klaster.myapp.repository.GroupOfStudentsRepository;

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
 * Integration tests for the {@link GroupOfStudentsResource} REST controller.
 */
@SpringBootTest(classes = Klaster5422App.class)
@AutoConfigureMockMvc
@WithMockUser
public class GroupOfStudentsResourceIT {

    private static final String DEFAULT_NAME_OF_STUDENTS = "AAAAAAAAAA";
    private static final String UPDATED_NAME_OF_STUDENTS = "BBBBBBBBBB";

    @Autowired
    private GroupOfStudentsRepository groupOfStudentsRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGroupOfStudentsMockMvc;

    private GroupOfStudents groupOfStudents;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GroupOfStudents createEntity(EntityManager em) {
        GroupOfStudents groupOfStudents = new GroupOfStudents()
            .nameOfStudents(DEFAULT_NAME_OF_STUDENTS);
        return groupOfStudents;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GroupOfStudents createUpdatedEntity(EntityManager em) {
        GroupOfStudents groupOfStudents = new GroupOfStudents()
            .nameOfStudents(UPDATED_NAME_OF_STUDENTS);
        return groupOfStudents;
    }

    @BeforeEach
    public void initTest() {
        groupOfStudents = createEntity(em);
    }

    @Test
    @Transactional
    public void createGroupOfStudents() throws Exception {
        int databaseSizeBeforeCreate = groupOfStudentsRepository.findAll().size();
        // Create the GroupOfStudents
        restGroupOfStudentsMockMvc.perform(post("/api/group-of-students")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(groupOfStudents)))
            .andExpect(status().isCreated());

        // Validate the GroupOfStudents in the database
        List<GroupOfStudents> groupOfStudentsList = groupOfStudentsRepository.findAll();
        assertThat(groupOfStudentsList).hasSize(databaseSizeBeforeCreate + 1);
        GroupOfStudents testGroupOfStudents = groupOfStudentsList.get(groupOfStudentsList.size() - 1);
        assertThat(testGroupOfStudents.getNameOfStudents()).isEqualTo(DEFAULT_NAME_OF_STUDENTS);
    }

    @Test
    @Transactional
    public void createGroupOfStudentsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = groupOfStudentsRepository.findAll().size();

        // Create the GroupOfStudents with an existing ID
        groupOfStudents.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGroupOfStudentsMockMvc.perform(post("/api/group-of-students")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(groupOfStudents)))
            .andExpect(status().isBadRequest());

        // Validate the GroupOfStudents in the database
        List<GroupOfStudents> groupOfStudentsList = groupOfStudentsRepository.findAll();
        assertThat(groupOfStudentsList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGroupOfStudents() throws Exception {
        // Initialize the database
        groupOfStudentsRepository.saveAndFlush(groupOfStudents);

        // Get all the groupOfStudentsList
        restGroupOfStudentsMockMvc.perform(get("/api/group-of-students?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(groupOfStudents.getId().intValue())))
            .andExpect(jsonPath("$.[*].nameOfStudents").value(hasItem(DEFAULT_NAME_OF_STUDENTS)));
    }
    
    @Test
    @Transactional
    public void getGroupOfStudents() throws Exception {
        // Initialize the database
        groupOfStudentsRepository.saveAndFlush(groupOfStudents);

        // Get the groupOfStudents
        restGroupOfStudentsMockMvc.perform(get("/api/group-of-students/{id}", groupOfStudents.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(groupOfStudents.getId().intValue()))
            .andExpect(jsonPath("$.nameOfStudents").value(DEFAULT_NAME_OF_STUDENTS));
    }
    @Test
    @Transactional
    public void getNonExistingGroupOfStudents() throws Exception {
        // Get the groupOfStudents
        restGroupOfStudentsMockMvc.perform(get("/api/group-of-students/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGroupOfStudents() throws Exception {
        // Initialize the database
        groupOfStudentsRepository.saveAndFlush(groupOfStudents);

        int databaseSizeBeforeUpdate = groupOfStudentsRepository.findAll().size();

        // Update the groupOfStudents
        GroupOfStudents updatedGroupOfStudents = groupOfStudentsRepository.findById(groupOfStudents.getId()).get();
        // Disconnect from session so that the updates on updatedGroupOfStudents are not directly saved in db
        em.detach(updatedGroupOfStudents);
        updatedGroupOfStudents
            .nameOfStudents(UPDATED_NAME_OF_STUDENTS);

        restGroupOfStudentsMockMvc.perform(put("/api/group-of-students")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGroupOfStudents)))
            .andExpect(status().isOk());

        // Validate the GroupOfStudents in the database
        List<GroupOfStudents> groupOfStudentsList = groupOfStudentsRepository.findAll();
        assertThat(groupOfStudentsList).hasSize(databaseSizeBeforeUpdate);
        GroupOfStudents testGroupOfStudents = groupOfStudentsList.get(groupOfStudentsList.size() - 1);
        assertThat(testGroupOfStudents.getNameOfStudents()).isEqualTo(UPDATED_NAME_OF_STUDENTS);
    }

    @Test
    @Transactional
    public void updateNonExistingGroupOfStudents() throws Exception {
        int databaseSizeBeforeUpdate = groupOfStudentsRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGroupOfStudentsMockMvc.perform(put("/api/group-of-students")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(groupOfStudents)))
            .andExpect(status().isBadRequest());

        // Validate the GroupOfStudents in the database
        List<GroupOfStudents> groupOfStudentsList = groupOfStudentsRepository.findAll();
        assertThat(groupOfStudentsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGroupOfStudents() throws Exception {
        // Initialize the database
        groupOfStudentsRepository.saveAndFlush(groupOfStudents);

        int databaseSizeBeforeDelete = groupOfStudentsRepository.findAll().size();

        // Delete the groupOfStudents
        restGroupOfStudentsMockMvc.perform(delete("/api/group-of-students/{id}", groupOfStudents.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GroupOfStudents> groupOfStudentsList = groupOfStudentsRepository.findAll();
        assertThat(groupOfStudentsList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
