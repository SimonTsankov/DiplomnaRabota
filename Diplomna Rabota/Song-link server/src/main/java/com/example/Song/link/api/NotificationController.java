package com.example.Song.link.api;

import com.example.Song.link.model.Notification;
import com.example.Song.link.repository.NotificationRepository;
import com.example.Song.link.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    NotificationRepository notificationRepository;
    @Autowired
    UserRepository userRepository;

    @GetMapping(value = "/findAll")
    public ResponseEntity<?> findAll(Principal principal) {
        List<Notification> notifications = notificationRepository.findAllByUser(userRepository.findByEmail(principal.getName()));
        return ResponseEntity.ok().body(notifications);
    }

    @PutMapping(value = "/read")
    public ResponseEntity<?> readNotification(Principal principal, @RequestParam Long id) {
        Notification notification = (Notification) notificationRepository.findAllByUserAndId(userRepository.findByEmail(principal.getName()),id);
        notification.setSeen(true);
        return ResponseEntity.ok().body("Succesfuly updated");
    }

}
