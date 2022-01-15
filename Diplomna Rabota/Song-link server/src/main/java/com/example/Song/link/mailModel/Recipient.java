package com.example.Song.link.mailModel;

import com.example.Song.link.model.User;

import javax.persistence.*;


public class Recipient {

    private String email;

    private String subject;

    private String text;

    private User user;

    public String getEmail() {
        return email;
    }


    public String getText() {
        return text;
    }

    public String getSubject() {
        return subject;
    }

    public User getUser() {
        return user;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setText(String bonusText) {
        this.text = bonusText;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
