package com.example.Song.link.model;

import org.hibernate.annotations.SQLInsert;

import javax.persistence.*;

@Entity
@Table

public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 128)
    private String name;

    public Role(String name) {
        this.name=name;
    }

    public Role() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
