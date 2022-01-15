package com.example.Song.link.api;

import com.example.Song.link.model.Post;
import com.example.Song.link.model.Song;
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
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/spotify")
public class SpotifyController {

    private static SpotifyApi spotifyApi = new SpotifyApi.Builder().setClientId("7f6acf63bdf84024b45401b30df8baeb")
            .setClientSecret("8c393690bea3451f991253452658213c").build();
    private static final ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials()
            .build();
    final ClientCredentials clientCredentials = clientCredentialsRequest.execute();

    public SpotifyController() throws IOException, ParseException, SpotifyWebApiException {
    }

    @GetMapping("/searchTracks")
    public ResponseEntity<?> findAll(@RequestParam String searchWord) throws IOException, ParseException, SpotifyWebApiException {
        spotifyApi.setAccessToken(clientCredentials.getAccessToken());

        SearchTracksRequest searchTracksRequest = spotifyApi.searchTracks(searchWord).build();
        try {
            final Paging<Track> trackPaging = searchTracksRequest.execute();
            System.out.println("Total: " + trackPaging.getTotal());
            LinkedList<Song> songs = new LinkedList<>();

            for (Track track : trackPaging.getItems()) {
                Song song = new Song();
                song.setName(track.getName());
                song.setArtist(track.getArtists()[0].getName());
                song.setImgUrl(track.getAlbum().getImages()[0].getUrl());
                songs.add(song);
            }
//
            return ResponseEntity.ok().body(songs);

        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
            throw e;
        }

    }

}
