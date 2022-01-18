package com.example.Song.link.api;

import com.example.Song.link.exception.CustomException;
import com.example.Song.link.model.User;
import com.example.Song.link.repository.PasswordResetRepository;
import com.example.Song.link.repository.UserRepository;
import com.example.Song.link.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.LinkedList;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user-info")
public class UserInfoController {

//    @Value("${vwp.email.template.password.reset}")
//    private String passwordResetTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private PasswordResetRepository passwordResetRepository;
//
//    @Autowired
//    private EmailService emailService;

    @GetMapping(value = "get")
    public ResponseEntity<?> getUserInfo(Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        user.setPassword("");
        return ResponseEntity.ok().body(user);
    }

    @GetMapping(value = "getUsers")
    public ResponseEntity<?> getSearchedUsers(@RequestParam String searchWord) {
        List<User> users = userRepository.findByUsernameContains(searchWord);
        for (User user : users) {
            user.setPassword("");
            user.setEmail("");
        }

        return ResponseEntity.ok().body(users);
    }

    @RequestMapping(value = "/updateUserInfo", method = {RequestMethod.POST, RequestMethod.PUT})
    public ResponseEntity<?> updateUserInfo(Principal principal, @RequestBody User user) throws CustomException {
        User userTosave = userRepository.findByEmail(principal.getName());
        if (userTosave == null) throw new CustomException("No such user exists");

        userTosave.setUsername(user.getUsername());
        userRepository.save(userTosave);
        return ResponseEntity.ok().body("Info updated");
    }

}
