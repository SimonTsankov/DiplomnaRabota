package com.example.Song.link.repository;

import com.example.Song.link.model.Post;
import com.example.Song.link.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SongRepository extends JpaRepository<Song, Long> {

}
