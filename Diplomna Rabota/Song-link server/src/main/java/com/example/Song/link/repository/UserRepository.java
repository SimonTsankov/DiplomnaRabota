package com.example.Song.link.repository;

import com.example.Song.link.model.User;
import com.example.Song.link.model.UsernameAndId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    User findById(long id);
    List<User> findByUsernameContains(String username);
    @Query(value = "select  u.username, u.id from users u where id in(select u2.user_followed from userfollow u2 where u2.user_following = :userId);",
    nativeQuery = true)
    List<UsernameAndId> findFollowedUsers(@Param("userId")Long userId);

    @Query(value = "select u.username, u.id from users u where id not in(select u2.user_followed from userfollow u2 where u2.user_following = :userId )" +
            " and u.username like CONCAT('%',:search,'%');",
    nativeQuery = true)

    List<UsernameAndId> findNonFollowedUsersSearch(@Param("userId")Long userId, @Param("search")String search);

    User findByUsername(String username);
}