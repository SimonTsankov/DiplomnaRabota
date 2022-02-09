package com.example.Song.link.repository;

import com.example.Song.link.model.Playlist;
import com.example.Song.link.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    List<Playlist> findByUser(User user);
}
