package com.klaster.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.klaster.myapp.web.rest.TestUtil;

public class ProgramsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Programs.class);
        Programs programs1 = new Programs();
        programs1.setId(1L);
        Programs programs2 = new Programs();
        programs2.setId(programs1.getId());
        assertThat(programs1).isEqualTo(programs2);
        programs2.setId(2L);
        assertThat(programs1).isNotEqualTo(programs2);
        programs1.setId(null);
        assertThat(programs1).isNotEqualTo(programs2);
    }
}
