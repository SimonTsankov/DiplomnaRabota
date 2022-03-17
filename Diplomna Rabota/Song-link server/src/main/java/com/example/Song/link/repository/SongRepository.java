package com.example.Song.link.repository;

import com.example.Song.link.model.Post;
import com.example.Song.link.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SongRepository extends JpaRepository<Song, Long> {
    @Query(value = "select * from song s where track_id = :track_Id limit 1",
    nativeQuery = true)
    Song findByTrack_id(String track_Id);
}
