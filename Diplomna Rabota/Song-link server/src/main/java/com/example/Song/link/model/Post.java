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

    @Column
    private String content;

    @Column(name = "picByte", length = 100000)
    @Type(type = "org.hibernate.type.BinaryType")
    private byte[] picByte;

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
