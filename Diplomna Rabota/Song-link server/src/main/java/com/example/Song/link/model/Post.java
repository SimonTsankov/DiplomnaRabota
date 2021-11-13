package com.example.Song.link.model;

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

    @Column(name = "picByte", length = 10000)
    private byte[] picByte;
}
