package com.example.Song.link.model;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.awt.*;
import java.io.File;
@Entity
@Table
public class Post {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    @Column
    private String name;
    @Lob
    @Column
    private String content;

    @Column(name = "picByte", length = 100000)
    @Type(type = "org.hibernate.type.BinaryType")
    private byte[] picByte;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }
    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public byte[] getPicByte() {
        return picByte;
    }

    public void setPicByte(byte[] picByte) {
        this.picByte = picByte;
    }
}
