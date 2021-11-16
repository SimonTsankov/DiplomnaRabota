package com.example.Song.link.api;

import com.example.Song.link.model.ImageModel;
import com.example.Song.link.model.Post;
import com.example.Song.link.model.TestModel;
import com.example.Song.link.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    PostRepository postRepository;

    @RequestMapping(value = "/save", method = {RequestMethod.POST, RequestMethod.PUT})
    public ResponseEntity<?> save(@RequestParam MultipartFile file, @RequestParam String name, @RequestParam String content) throws IOException {
        Post post= new Post();
        post.setPicByte(file.getBytes());
        post.setName(name);
        post.setContent(content);

        if (post.getId() == 0) {
            postRepository.save(post);
            return ResponseEntity.ok().body("Added");
        }else{
            postRepository.save(post);
            return ResponseEntity.ok().body("Updated");
        }


    }
}
