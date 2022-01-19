package com.example.Song.link.repository;

import com.example.Song.link.model.UserFollow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface UserFollowRepository  extends JpaRepository<UserFollow, Long> {
    @Transactional
    void deleteAllByUserFollowedAndAndUserFollowing(Long userFollowed, Long userFollowing);
}
