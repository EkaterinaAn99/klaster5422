package com.klaster.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Students.
 */
@Entity
@Table(name = "students")
public class Students implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "middle_name")
    private String middleName;

    @Column(name = "jhi_group")
    private String group;

    @Column(name = "type")
    private String type;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "students")
    private Set<Programs> progams = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "students", allowSetters = true)
    private Teachers teachers;

    @ManyToOne
    @JsonIgnoreProperties(value = "students", allowSetters = true)
    private GroupOfStudents groupOfStudents;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Students name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public Students surname(String surname) {
        this.surname = surname;
        return this;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getMiddleName() {
        return middleName;
    }

    public Students middleName(String middleName) {
        this.middleName = middleName;
        return this;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getGroup() {
        return group;
    }

    public Students group(String group) {
        this.group = group;
        return this;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public String getType() {
        return type;
    }

    public Students type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public User getUser() {
        return user;
    }

    public Students user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Programs> getProgams() {
        return progams;
    }

    public Students progams(Set<Programs> programs) {
        this.progams = programs;
        return this;
    }

    public Students addProgams(Programs programs) {
        this.progams.add(programs);
        programs.setStudents(this);
        return this;
    }

    public Students removeProgams(Programs programs) {
        this.progams.remove(programs);
        programs.setStudents(null);
        return this;
    }

    public void setProgams(Set<Programs> programs) {
        this.progams = programs;
    }

    public Teachers getTeachers() {
        return teachers;
    }

    public Students teachers(Teachers teachers) {
        this.teachers = teachers;
        return this;
    }

    public void setTeachers(Teachers teachers) {
        this.teachers = teachers;
    }

    public GroupOfStudents getGroupOfStudents() {
        return groupOfStudents;
    }

    public Students groupOfStudents(GroupOfStudents groupOfStudents) {
        this.groupOfStudents = groupOfStudents;
        return this;
    }

    public void setGroupOfStudents(GroupOfStudents groupOfStudents) {
        this.groupOfStudents = groupOfStudents;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Students)) {
            return false;
        }
        return id != null && id.equals(((Students) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Students{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", surname='" + getSurname() + "'" +
            ", middleName='" + getMiddleName() + "'" +
            ", group='" + getGroup() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
