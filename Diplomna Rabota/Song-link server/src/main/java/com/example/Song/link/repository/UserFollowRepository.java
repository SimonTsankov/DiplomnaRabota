package com.example.Song.link.repository;

import com.example.Song.link.model.UserFollow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFollowRepository  extends JpaRepository<UserFollow, Long> {
}
