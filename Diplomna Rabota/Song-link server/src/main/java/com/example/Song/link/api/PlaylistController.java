package com.example.Song.link.api;

import com.example.Song.link.model.Playlist;
import com.example.Song.link.model.User;
import com.example.Song.link.repository.PlaylistRepository;
import com.example.Song.link.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/playlist")
public class PlaylistController {
    @Autowired
    PlaylistRepository playlistRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("findAll")
    public ResponseEntity<?> findAll(Principal principal){
        User user = userRepository.findByEmail(principal.getName());
        List<Playlist> playlistList = playlistRepository.findByUser(user);
        return ResponseEntity.ok().body(playlistList);
    }


}
