package com.example.Song.link.model;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;

public class PostTransportModel {
    byte[] picByte;

    public byte[] getPicByte() {
        return picByte;
    }

    public void setPicByte(byte[] picByte) {
        this.picByte = picByte;
    }

    private String name;
    private String content;



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
}
