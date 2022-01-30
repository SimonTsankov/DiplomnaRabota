package com.example.Song.link.api;

import com.example.Song.link.model.*;
import com.example.Song.link.repository.PostRepository;
import com.example.Song.link.repository.UserRepository;
import com.example.Song.link.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.print.PrinterIOException;
import java.io.IOException;
import java.nio.file.Files;
import java.security.Principal;
import java.util.Collection;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/post")
public class PostController {

    @Autowired
    PostRepository postRepository;
    @Autowired
    UserRepository userRepository;

    @RequestMapping(value = "/save", method = {RequestMethod.POST, RequestMethod.PUT})
    public ResponseEntity<?> save(Principal principal, @RequestParam MultipartFile file, @RequestParam String name, @RequestParam String content) throws IOException {
        Post post = new Post();
        post.setUser(userRepository.findByEmail(principal.getName()));
        post.setPicByte(file.getBytes());
        post.setName(name);
        post.setContent(content);

        if (post.getId() == 0) {
            postRepository.save(post);
            return ResponseEntity.ok().body("Added");
        } else {
            postRepository.save(post);
            return ResponseEntity.ok().body("Updated");
        }
    }

    @Transactional
    @DeleteMapping(value = "/delete")
    public ResponseEntity<?> deleteById(@RequestParam Long id, Principal principal) {
        Post post = postRepository.getById(id);
        Collection<SimpleGrantedAuthority> authorities = (Collection<SimpleGrantedAuthority>) SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        if (authorities.contains(new SimpleGrantedAuthority("Admin"))) {
            System.out.println("IS ADMIN");
            postRepository.delete(post);
        } else {

            User user = userRepository.findByEmail(principal.getName());
            if (user.getId() == post.getUser().getId())
                postRepository.delete(post);
            else
                return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        return ResponseEntity.ok().body("Deleted succesfully");
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll() {
        List<Post> postsList = postRepository.findAll();
        return ResponseEntity.ok().body(postsList);
    }

    @Transactional
    @GetMapping("/findByUser")
    public ResponseEntity<?> findByUser(Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        List<Post> postsList = postRepository.findByUserCustom(user.getId());
        return ResponseEntity.ok().body(postsList);
    }
}
