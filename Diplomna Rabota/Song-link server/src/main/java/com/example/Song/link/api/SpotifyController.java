package com.example.Song.link.api;

import com.example.Song.link.model.*;
import com.example.Song.link.repository.NotificationRepository;
import com.example.Song.link.repository.PlaylistRepository;
import com.example.Song.link.repository.SongRepository;
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
    SongRepository songRepository;

    @Autowired
    PlaylistRepository playlistRepository;

    @Autowired
    SpotifyService spotifyService;

    @Autowired
    NotificationRepository notificationRepository;

    @GetMapping("/searchTracks")
    public ResponseEntity<?> findAll(@RequestParam String searchWord) throws IOException, ParseException, SpotifyWebApiException {
            return ResponseEntity.ok().body(spotifyService.searchforTracks(searchWord));
    }
    @GetMapping("/findSongByTrackId")
    public ResponseEntity<?> findSongByTrackId(@RequestParam String trackId) throws IOException, ParseException, SpotifyWebApiException {
        return ResponseEntity.ok().body(spotifyService.findSongByTrackId(trackId));
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
    @PostMapping("/createPlaylist")
    public ResponseEntity<?> createPlaylist(@RequestParam String name, @RequestParam Boolean isPublic, Principal principal) throws IOException, ParseException, SpotifyWebApiException {
        try {
            spotifyService.createPlaylist(principal,name, isPublic);
            return ResponseEntity.ok("Created");
        }catch (Exception e){
            return  ResponseEntity.badRequest().body("Error");
        }
    }
    @PostMapping("/addSong")
    public ResponseEntity<?> addToPlaylist(@RequestParam String playlistId, String songId, Principal principal){
        try{
            User user = userRepository.findByEmail(principal.getName());

                Song song = new Song();
                song.setTrack_id(songId);
//                Song song = songRepository.findByTrack_id(songId);
                spotifyService.addToPlaylist(playlistId, song, user, principal);

            return ResponseEntity.ok("Added to playlist");
        }catch (Exception e){
            return  ResponseEntity.badRequest().body("Error");
        }
    }

    @PostMapping("/sendSong")
    public ResponseEntity<?> sendRecommendation(@RequestBody SongRecTransportM songRecTransport, Principal principal){
        User userFrom = userRepository.findByEmail(principal.getName());
        User userFor = userRepository.findById(songRecTransport.getUser().getId());

        Song song = songRepository.findByTrack_id(songRecTransport.getSong().getTrack_id());
        if(song == null) {
            songRepository.save(songRecTransport.getSong());
            song = songRepository.findByTrack_id(songRecTransport.getSong().getTrack_id());
        }
        Notification notification = new Notification();
        notification.setSong(song);
        notification.setUser(userFor);
        notification.setTitle(userFrom.getUsername() + " sent you a song!");
        notification.setMessage("They recommended you: " + song.getName());
        notificationRepository.save(notification);

        return ResponseEntity.ok("Added successfully");
    }

}
