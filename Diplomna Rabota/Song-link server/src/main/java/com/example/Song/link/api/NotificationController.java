package com.example.Song.link.api;

import com.example.Song.link.model.Notification;
import com.example.Song.link.model.User;
import com.example.Song.link.repository.NotificationRepository;
import com.example.Song.link.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import se.michaelthelin.spotify.exceptions.detailed.BadRequestException;

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
    @Transactional
    @GetMapping(value = "/findAll")
    public ResponseEntity<?> findAll(Principal principal) {
        List<Notification> notifications = notificationRepository.findAllByUserOrderByDateCreatedDesc(userRepository.findByEmail(principal.getName()));
        return ResponseEntity.ok().body(notifications);
    }

    @PutMapping(value = "/read")
    public ResponseEntity<?> readNotification(Principal principal, @RequestParam Long id) throws Exception {
//        Notification notification = (Notification) notificationRepository.findAllByUserAndId(userRepository.findByEmail(principal.getName()),id);
        Notification notification = notificationRepository.getById(id);
        User user = userRepository.findByEmail(principal.getName());
        if(user.getId()==notification.getUser().getId()) {
            notification.setSeen(true);

            notificationRepository.save(notification);
            return ResponseEntity.ok().body("Succesfuly updated");
        }else {
            throw new BadRequestException("Bad request");
        }
    }

}
