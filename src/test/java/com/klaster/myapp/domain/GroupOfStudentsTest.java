package com.klaster.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.klaster.myapp.web.rest.TestUtil;

public class GroupOfStudentsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GroupOfStudents.class);
        GroupOfStudents groupOfStudents1 = new GroupOfStudents();
        groupOfStudents1.setId(1L);
        GroupOfStudents groupOfStudents2 = new GroupOfStudents();
        groupOfStudents2.setId(groupOfStudents1.getId());
        assertThat(groupOfStudents1).isEqualTo(groupOfStudents2);
        groupOfStudents2.setId(2L);
        assertThat(groupOfStudents1).isNotEqualTo(groupOfStudents2);
        groupOfStudents1.setId(null);
        assertThat(groupOfStudents1).isNotEqualTo(groupOfStudents2);
    }
}
