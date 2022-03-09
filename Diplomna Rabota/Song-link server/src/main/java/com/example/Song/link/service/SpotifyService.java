package com.example.Song.link.service;

import com.example.Song.link.model.Song;
import com.example.Song.link.model.User;
import com.example.Song.link.repository.PlaylistRepository;
import com.example.Song.link.repository.UserRepository;
import org.apache.hc.core5.http.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import se.michaelthelin.spotify.SpotifyApi;
import se.michaelthelin.spotify.SpotifyHttpManager;
import se.michaelthelin.spotify.exceptions.SpotifyWebApiException;
import se.michaelthelin.spotify.model_objects.credentials.AuthorizationCodeCredentials;
import se.michaelthelin.spotify.model_objects.credentials.ClientCredentials;
import se.michaelthelin.spotify.model_objects.special.SnapshotResult;
import se.michaelthelin.spotify.model_objects.specification.Paging;
import se.michaelthelin.spotify.model_objects.specification.Playlist;
import se.michaelthelin.spotify.model_objects.specification.Track;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRefreshRequest;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeRequest;
import se.michaelthelin.spotify.requests.authorization.authorization_code.AuthorizationCodeUriRequest;
import se.michaelthelin.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;
import se.michaelthelin.spotify.requests.data.player.AddItemToUsersPlaybackQueueRequest;
import se.michaelthelin.spotify.requests.data.playlists.AddItemsToPlaylistRequest;
import se.michaelthelin.spotify.requests.data.playlists.CreatePlaylistRequest;
import se.michaelthelin.spotify.requests.data.search.simplified.SearchTracksRequest;
import se.michaelthelin.spotify.requests.data.tracks.GetTrackRequest;
import se.michaelthelin.spotify.requests.data.users_profile.GetCurrentUsersProfileRequest;

import java.io.IOException;
import java.net.URI;
import java.security.Principal;
import java.util.LinkedList;

@Service
public class SpotifyService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PlaylistRepository playlistRepository;

    private static final String clientId = "7f6acf63bdf84024b45401b30df8baeb";
    private static final String clientSecret = "8c393690bea3451f991253452658213c";
    private static final URI redirectUri = SpotifyHttpManager.makeUri("http://localhost:4200/spotify-redirect");

    public SpotifyApi setUpSpotApi() throws IOException, ParseException, SpotifyWebApiException {
        SpotifyApi spotifyApi = new SpotifyApi.Builder().setClientId(clientId)
                .setClientSecret(clientSecret).setRedirectUri(redirectUri).build();

        ClientCredentialsRequest clientCredentialsRequest = spotifyApi.clientCredentials()
                .build();

        ClientCredentials clientCredentials = clientCredentialsRequest.execute();

        spotifyApi.setAccessToken(clientCredentials.getAccessToken());

        return spotifyApi;
    }

    public void refreshToken(Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        SpotifyApi spotifyApi = new SpotifyApi.Builder()
                .setClientId(clientId)
                .setClientSecret(clientSecret)
                .setRefreshToken(user.getSpotifyRefreshToken())
                .build();

        AuthorizationCodeRefreshRequest authorizationCodeRefreshRequest = spotifyApi.authorizationCodeRefresh()
                .build();

        try {
            final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRefreshRequest.execute();

            spotifyApi.setAccessToken(authorizationCodeCredentials.getAccessToken());

            user.setSpotifyAccessToken(authorizationCodeCredentials.getAccessToken());
            System.out.println(authorizationCodeCredentials.getRefreshToken());

            userRepository.save(user);
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    public void createPlaylist(Principal principal, String name, Boolean isPublic) throws IOException, ParseException, SpotifyWebApiException {
        User user = userRepository.findByEmail(principal.getName());
        refreshToken(principal);
        SpotifyApi spotifyApi = new SpotifyApi.Builder().setAccessToken(user.getSpotifyAccessToken()).build();

        CreatePlaylistRequest createPlaylistRequest = spotifyApi.createPlaylist(getCurrentUsersProfile_Sync(spotifyApi), name)
                .public_(isPublic)
                .description("Playlist created from SongLink.com")
                .build();

        Playlist playlist = createPlaylistRequest.execute();
        com.example.Song.link.model.Playlist playlist1 = new com.example.Song.link.model.Playlist();
        playlist1.setIdSpotify(playlist.getId());
        playlist1.setUser(user);
        playlist1.setName(name);

        playlistRepository.save(playlist1);
    }

    public void addToPlaylist(String playlistId, Song song, User user, Principal principal){
        refreshToken(principal);

        SpotifyApi spotifyApi = new SpotifyApi.Builder().setAccessToken(user.getSpotifyAccessToken()).build();
        AddItemsToPlaylistRequest addItemsToPlaylistRequest = spotifyApi.addItemsToPlaylist(
                playlistId,
                new String[]{"spotify:track:"+song.getTrack_id()}
        ).build();
        try {
            final SnapshotResult snapshotResult = addItemsToPlaylistRequest.execute();

            System.out.println("Snapshot ID: " + snapshotResult.getSnapshotId());
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }


    public static String getCurrentUsersProfile_Sync(SpotifyApi spotifyApi) {

        GetCurrentUsersProfileRequest getCurrentUsersProfileRequest = spotifyApi.getCurrentUsersProfile()
                .build();
        try {
            final se.michaelthelin.spotify.model_objects.specification.User user = getCurrentUsersProfileRequest.execute();

            return user.getId();
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            System.out.println("Error: " + e.getMessage());
        }
        return null;
    }

    public void saveTokens(String code, User user) throws IOException, ParseException, SpotifyWebApiException {
        SpotifyApi spotifyApi = setUpSpotApi();
        AuthorizationCodeRequest authorizationCodeRequest = spotifyApi.authorizationCode(code)
                .build();
        final AuthorizationCodeCredentials authorizationCodeCredentials = authorizationCodeRequest.execute();
        user.setSpotifyAccessToken(authorizationCodeCredentials.getAccessToken());
        user.setSpotifyRefreshToken(authorizationCodeCredentials.getRefreshToken());

        userRepository.save(user);
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
                song.setTrack_id(track.getId());
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

    public Song findSongByTrackId(String trackId) throws IOException, ParseException, SpotifyWebApiException {
        Song song = new Song();
        SpotifyApi spotifyApi = setUpSpotApi();
        GetTrackRequest getTrackRequest  = spotifyApi.getTrack(trackId).build();
        try {
            final Track track = getTrackRequest.execute();
            song.setName(track.getName());
            song.setTrack_id(trackId);
            song.setArtist(track.getArtists()[0].getName());
            song.setImgUrl(track.getAlbum().getImages()[0].getUrl());
        } catch (IOException | SpotifyWebApiException | ParseException e) {
            throw new SpotifyWebApiException("Error");
        }

        return  song;
    }
}

