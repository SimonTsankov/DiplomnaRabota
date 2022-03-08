package com.example.Song.link.repository;

import com.example.Song.link.model.Playlist;
import com.example.Song.link.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    List<Playlist> findByUser(User user);
    Playlist findByIdSpotify(String idSpotify);
}
