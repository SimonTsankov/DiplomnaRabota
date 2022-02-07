package com.example.Song.link.api;

import com.example.Song.link.model.Post;
import com.example.Song.link.model.Song;
import com.example.Song.link.model.User;
import com.example.Song.link.repository.UserRepository;
import com.example.Song.link.service.SpotifyService;
import org.apache.hc.core5.http.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.ClientCredentials;
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;
import se.michaelthelin.spotify.requests.data.search.simplified.SearchTracksRequest;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.security.Principal;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/spotify")
public class SpotifyController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    SpotifyService spotifyService;

    @GetMapping("/searchTracks")
    public ResponseEntity<?> findAll(@RequestParam String searchWord) throws IOException, ParseException, SpotifyWebApiException {

            return ResponseEntity.ok().body(spotifyService.searchforTracks(searchWord));
    }
    @GetMapping("/getReddirectUrl")
    public ResponseEntity<?> getReddirectUrl() throws IOException, ParseException, SpotifyWebApiException {
        return  ResponseEntity.ok().body(spotifyService.getRedirectUrl());
    }

    @PostMapping("/saveRefreshToken")
    public ResponseEntity<?> saveRefreshToken(@RequestParam String code, Principal principal) throws IOException, ParseException, SpotifyWebApiException {
        User user = userRepository.findByEmail(principal.getName());
        spotifyService.saveTokens(code, user);
        return ResponseEntity.ok("Logged in to spotify successfully!");
    }

}
