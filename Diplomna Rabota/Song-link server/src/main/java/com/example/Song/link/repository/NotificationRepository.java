package com.example.Song.link.repository;

import com.example.Song.link.model.Notification;
import com.example.Song.link.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findAllByUser(User user);
    List<Notification> findAllByUserAndId(User user, long id);
}
