package com.example.Song.link.model;

import javax.persistence.*;

@Entity
@Table(name="userfollow")
public class UserFollow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "user_following")
    private long userFollowing;
    @Column(name = "user_followed")
    private long userFollowed;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUserFollowing() {
        return userFollowing;
    }

    public void setUserFollowing(long userFollowing) {
        this.userFollowing = userFollowing;
    }

    public long getUserFollowed() {
        return userFollowed;
    }

    public void setUserFollowed(long userFollowed) {
        this.userFollowed = userFollowed;
    }
}

