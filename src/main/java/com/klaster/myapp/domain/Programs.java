package com.klaster.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Programs.
 */
@Entity
@Table(name = "programs")
public class Programs implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "date")
    private ZonedDateTime date;

    @Column(name = "who_add")
    private String whoAdd;

    @Column(name = "jhi_group")
    private String group;

    @Column(name = "adress")
    private String adress;

    @ManyToOne
    @JsonIgnoreProperties(value = "progams", allowSetters = true)
    private Students students;

    @ManyToOne
    @JsonIgnoreProperties(value = "programs", allowSetters = true)
    private GroupOfStudents groupOfStudents;

    @ManyToOne
    @JsonIgnoreProperties(value = "programs", allowSetters = true)
    private Teachers teachers;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Programs date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public String getWhoAdd() {
        return whoAdd;
    }

    public Programs whoAdd(String whoAdd) {
        this.whoAdd = whoAdd;
        return this;
    }

    public void setWhoAdd(String whoAdd) {
        this.whoAdd = whoAdd;
    }

    public String getGroup() {
        return group;
    }

    public Programs group(String group) {
        this.group = group;
        return this;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public String getAdress() {
        return adress;
    }

    public Programs adress(String adress) {
        this.adress = adress;
        return this;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public Students getStudents() {
        return students;
    }

    public Programs students(Students students) {
        this.students = students;
        return this;
    }

    public void setStudents(Students students) {
        this.students = students;
    }

    public GroupOfStudents getGroupOfStudents() {
        return groupOfStudents;
    }

    public Programs groupOfStudents(GroupOfStudents groupOfStudents) {
        this.groupOfStudents = groupOfStudents;
        return this;
    }

    public void setGroupOfStudents(GroupOfStudents groupOfStudents) {
        this.groupOfStudents = groupOfStudents;
    }

    public Teachers getTeachers() {
        return teachers;
    }

    public Programs teachers(Teachers teachers) {
        this.teachers = teachers;
        return this;
    }

    public void setTeachers(Teachers teachers) {
        this.teachers = teachers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Programs)) {
            return false;
        }
        return id != null && id.equals(((Programs) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Programs{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", whoAdd='" + getWhoAdd() + "'" +
            ", group='" + getGroup() + "'" +
            ", adress='" + getAdress() + "'" +
            "}";
    }
}
