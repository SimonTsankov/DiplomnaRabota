package com.example.Song.link.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;
@Entity
@Table
public class FriendRequest {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    @Column(name = "user_sending_id")
    private long userSending;

    @Column(name = "user_reciever_id")
    private long userReciever;

    @JsonIgnore
    @Column(name = "datecreated", insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime dateCreated;

    @Column
    private Boolean accepted;



    public FriendRequest(long userSending, long userReciever, LocalDateTime dateCreated, Boolean accepted) {
        this.userSending = userSending;
        this.userReciever = userReciever;
        this.dateCreated = dateCreated;
        this.accepted = accepted;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUserSending() {
        return userSending;
    }

    public void setUserSending(long userSending) {
        this.userSending = userSending;
    }

    public long getUserReciever() {
        return userReciever;
    }

    public void setUserReciever(long userReciever) {
        this.userReciever = userReciever;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Boolean getAccepted() {
        return accepted;
    }

    public void setAccepted(Boolean accepted) {
        this.accepted = accepted;
    }
}
