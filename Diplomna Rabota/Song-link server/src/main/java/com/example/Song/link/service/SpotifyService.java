package com.example.Song.link.service;

import com.example.Song.link.model.Song;
import org.apache.hc.core5.http.ParseException;
import org.springframework.stereotype.Service;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.ClientCredentials;
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;
import se.michaelthelin.spotify.requests.data.search.simplified.SearchTracksRequest;

import java.io.IOException;
import java.util.LinkedList;

@Service
public class SpotifyService {

    public LinkedList<Song> searchforTracks(String searchWord) throws IOException, ParseException, SpotifyWebApiException {

        SpotifyApi spotifyApi = new SpotifyApi.Builder().setClientId("7f6acf63bdf84024b45401b30df8baeb")
                .setClientSecret("8c393690bea3451f991253452658213c").build();

        ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials()
                .build();

        ClientCredentials clientCredentials = clientCredentialsRequest.execute();

        spotifyApi.setAccessToken(clientCredentials.getAccessToken());

        SearchTracksRequest searchTracksRequest = spotifyApi.searchTracks(searchWord).limit(10).build();
        try {
            final Paging<Track> trackPaging = searchTracksRequest.execute();
            LinkedList<Song> songs = new LinkedList<>();

            for (Track track : trackPaging.getItems()) {
                Song song = new Song();
                song.setName(track.getName());
                song.setArtist(track.getArtists()[0].getName());
                song.setImgUrl(track.getAlbum().getImages()[0].getUrl());
                songs.add(song);
            }
            return songs;
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
            throw e;
        }
        }
    }

