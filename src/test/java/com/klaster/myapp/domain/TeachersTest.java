package com.klaster.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.klaster.myapp.web.rest.TestUtil;

public class TeachersTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Teachers.class);
        Teachers teachers1 = new Teachers();
        teachers1.setId(1L);
        Teachers teachers2 = new Teachers();
        teachers2.setId(teachers1.getId());
        assertThat(teachers1).isEqualTo(teachers2);
        teachers2.setId(2L);
        assertThat(teachers1).isNotEqualTo(teachers2);
        teachers1.setId(null);
        assertThat(teachers1).isNotEqualTo(teachers2);
    }
}
