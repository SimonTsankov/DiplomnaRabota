package com.example.Song.link.repository;

import com.example.Song.link.model.Post;
import com.example.Song.link.model.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(value = "SELECT u FROM Post u WHERE user_id= ?1")
    List<Post> findByUserCustom(Long user_id);
}
