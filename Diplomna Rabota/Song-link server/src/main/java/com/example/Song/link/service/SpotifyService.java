package com.example.Song.link.service;

import com.example.Song.link.model.Song;
import org.apache.hc.core5.http.ParseException;
import org.springframework.stereotype.Service;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.SpotifyHttpManager;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.ClientCredentials;
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;
import se.michaelthelin.spotify.requests.data.search.simplified.SearchTracksRequest;

import java.io.IOException;
import java.net.URI;
import java.util.LinkedList;

@Service
public class SpotifyService {
    private static final URI redirectUri = SpotifyHttpManager.makeUri("http://localhost:4200/spotify-redirect");

    public SpotifyApi setUpSpotApi() throws IOException, ParseException, SpotifyWebApiException {
        SpotifyApi spotifyApi = new SpotifyApi.Builder().setClientId("7f6acf63bdf84024b45401b30df8baeb")
                .setClientSecret("8c393690bea3451f991253452658213c").setRedirectUri(redirectUri).build();

        ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials()
                .build();

        ClientCredentials clientCredentials = clientCredentialsRequest.execute();

        spotifyApi.setAccessToken(clientCredentials.getAccessToken());

        return spotifyApi;
    }
    public String getRedirectUrl() throws IOException, ParseException, SpotifyWebApiException {
        SpotifyApi spotifyApi = setUpSpotApi();
        AuthorizationCodeUriRequest authorizationCodeUriRequest = spotifyApi.authorizationCodeUri()
                .scope("playlist-modify-private")
                .scope("playlist-modify-public").build();

        return authorizationCodeUriRequest.execute().toString();
    }
    public LinkedList<Song> searchforTracks(String searchWord) throws IOException, ParseException, SpotifyWebApiException {

        SpotifyApi spotifyApi = setUpSpotApi();

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

