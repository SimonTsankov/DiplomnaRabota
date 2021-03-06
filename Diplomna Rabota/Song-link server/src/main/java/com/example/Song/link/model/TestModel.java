package com.example.Song.link.model;

import javax.persistence.*;

@Entity
@Table(name="testTable")
public class TestModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(length = 300)
    private String name;

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
    public TestModel(String name) {
        this.name = name;
    }

    public TestModel() {

    }
}
