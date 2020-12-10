package com.klaster.myapp.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Teachers.
 */
@Entity
@Table(name = "teachers")
public class Teachers implements Serializable {

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

    @Column(name = "type")
    private String type;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    @OneToMany(mappedBy = "teachers")
    private Set<Programs> programs = new HashSet<>();

    @OneToMany(mappedBy = "teachers")
    private Set<Students> students = new HashSet<>();

    @OneToMany(mappedBy = "teachers")
    private Set<GroupOfStudents> groupofstudents = new HashSet<>();

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

    public Teachers name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public Teachers surname(String surname) {
        this.surname = surname;
        return this;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getMiddleName() {
        return middleName;
    }

    public Teachers middleName(String middleName) {
        this.middleName = middleName;
        return this;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getType() {
        return type;
    }

    public Teachers type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public User getUser() {
        return user;
    }

    public Teachers user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Programs> getPrograms() {
        return programs;
    }

    public Teachers programs(Set<Programs> programs) {
        this.programs = programs;
        return this;
    }

    public Teachers addPrograms(Programs programs) {
        this.programs.add(programs);
        programs.setTeachers(this);
        return this;
    }

    public Teachers removePrograms(Programs programs) {
        this.programs.remove(programs);
        programs.setTeachers(null);
        return this;
    }

    public void setPrograms(Set<Programs> programs) {
        this.programs = programs;
    }

    public Set<Students> getStudents() {
        return students;
    }

    public Teachers students(Set<Students> students) {
        this.students = students;
        return this;
    }

    public Teachers addStudents(Students students) {
        this.students.add(students);
        students.setTeachers(this);
        return this;
    }

    public Teachers removeStudents(Students students) {
        this.students.remove(students);
        students.setTeachers(null);
        return this;
    }

    public void setStudents(Set<Students> students) {
        this.students = students;
    }

    public Set<GroupOfStudents> getGroupofstudents() {
        return groupofstudents;
    }

    public Teachers groupofstudents(Set<GroupOfStudents> groupOfStudents) {
        this.groupofstudents = groupOfStudents;
        return this;
    }

    public Teachers addGroupofstudents(GroupOfStudents groupOfStudents) {
        this.groupofstudents.add(groupOfStudents);
        groupOfStudents.setTeachers(this);
        return this;
    }

    public Teachers removeGroupofstudents(GroupOfStudents groupOfStudents) {
        this.groupofstudents.remove(groupOfStudents);
        groupOfStudents.setTeachers(null);
        return this;
    }

    public void setGroupofstudents(Set<GroupOfStudents> groupOfStudents) {
        this.groupofstudents = groupOfStudents;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Teachers)) {
            return false;
        }
        return id != null && id.equals(((Teachers) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Teachers{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", surname='" + getSurname() + "'" +
            ", middleName='" + getMiddleName() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
