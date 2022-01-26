package com.example.Song.link.repository;

import com.example.Song.link.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    List<User> findByUsernameContains(String username);
    @Query(value = "select * from users u where id in(select u2.user_followed from userfollow u2 where u2.user_following = :userId);",
    nativeQuery = true)
    List<User> findFollowedUsers(@Param("userId")Long userId);
}