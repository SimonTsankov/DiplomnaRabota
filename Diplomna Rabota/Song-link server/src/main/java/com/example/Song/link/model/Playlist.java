package com.example.Song.link.model;

import javax.persistence.*;

@Entity
@Table
public class Playlist {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    @OneToOne
    @JoinColumn(name="user_id", unique = true, nullable = false)
    private User user;

    @Column
    private String idSpotify;

    public String getIdSpotify() {
        return idSpotify;
    }

    public void setIdSpotify(String idSpotify) {
        this.idSpotify = idSpotify;
    }

    @Column(length = 50)
    private  String name;

    public Playlist(User user, String name) {
        this.user = user;
        this.name = name;
    }

    public Playlist() { }

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
}
