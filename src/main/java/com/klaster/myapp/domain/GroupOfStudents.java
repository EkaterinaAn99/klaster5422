package com.klaster.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A GroupOfStudents.
 */
@Entity
@Table(name = "group_of_students")
public class GroupOfStudents implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name_of_students")
    private String nameOfStudents;

    @OneToMany(mappedBy = "groupOfStudents")
    private Set<Programs> programs = new HashSet<>();

    @OneToMany(mappedBy = "groupOfStudents")
    private Set<Students> students = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "groupofstudents", allowSetters = true)
    private Teachers teachers;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNameOfStudents() {
        return nameOfStudents;
    }

    public GroupOfStudents nameOfStudents(String nameOfStudents) {
        this.nameOfStudents = nameOfStudents;
        return this;
    }

    public void setNameOfStudents(String nameOfStudents) {
        this.nameOfStudents = nameOfStudents;
    }

    public Set<Programs> getPrograms() {
        return programs;
    }

    public GroupOfStudents programs(Set<Programs> programs) {
        this.programs = programs;
        return this;
    }

    public GroupOfStudents addPrograms(Programs programs) {
        this.programs.add(programs);
        programs.setGroupOfStudents(this);
        return this;
    }

    public GroupOfStudents removePrograms(Programs programs) {
        this.programs.remove(programs);
        programs.setGroupOfStudents(null);
        return this;
    }

    public void setPrograms(Set<Programs> programs) {
        this.programs = programs;
    }

    public Set<Students> getStudents() {
        return students;
    }

    public GroupOfStudents students(Set<Students> students) {
        this.students = students;
        return this;
    }

    public GroupOfStudents addStudents(Students students) {
        this.students.add(students);
        students.setGroupOfStudents(this);
        return this;
    }

    public GroupOfStudents removeStudents(Students students) {
        this.students.remove(students);
        students.setGroupOfStudents(null);
        return this;
    }

    public void setStudents(Set<Students> students) {
        this.students = students;
    }

    public Teachers getTeachers() {
        return teachers;
    }

    public GroupOfStudents teachers(Teachers teachers) {
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
        if (!(o instanceof GroupOfStudents)) {
            return false;
        }
        return id != null && id.equals(((GroupOfStudents) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "GroupOfStudents{" +
            "id=" + getId() +
            ", nameOfStudents='" + getNameOfStudents() + "'" +
            "}";
    }
}
