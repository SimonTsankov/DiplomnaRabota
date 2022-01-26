package com.example.Song.link.api;

import com.example.Song.link.mailModel.RecipientConfirmation;
import com.example.Song.link.model.*;
import com.example.Song.link.repository.*;
import com.example.Song.link.security.JwtProvider;
import com.example.Song.link.service.EmailService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;
import java.security.Principal;
import java.util.*;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private EmailVerificationRepository emailVerificationRepository;

    @Autowired
    private PasswordResetRepository passwordResetRepository;

    @Autowired
    private UserFollowRepository userFollowRepository;

    @Autowired
    private JwtProvider jwtProvider;
    //TODO
    @Autowired
    private EmailService emailService;

    @Value("${vwp.email.template.confirmation}")
    private String emailVerificationTemplate;
//region Register

    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody User user) throws Exception {
        if (userRepository.findByEmail(user.getEmail()) == null && user.getId() == 0) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setEmailVerification(true);//TODO CHANGE TO FALSE
            userRepository.save(user);

            setDefUserRole(user);// gives a registered user role of User
            String hash = jwtProvider.generateEmailVerificationHash();
            saveEmailVerification(hash, user);

            RecipientConfirmation recepient = getRecipient(hash, user.getEmail(), "Confirm your email at Sl", "bonus text!");

            emailService.sendConfirmationMail(recepient, emailVerificationTemplate);


            return ResponseEntity.ok("user has been created");
        } else {
            throw new Exception("User exists");
            //  throw new UserAlreadyExists("User with this email already exists!");
        }
    }

    private RecipientConfirmation getRecipient(String hash, String email, String subject, String bonusText) {
        RecipientConfirmation recipient = new RecipientConfirmation();
        recipient.setEmail(email);
        recipient.setHash(hash);
        recipient.setSubject(subject);
        recipient.setText(bonusText);
        return recipient;
    }

    private void saveEmailVerification(String hash, User user) {
        EmailVerification emailVerification = new EmailVerification();
        emailVerification.setHash(hash);
        emailVerification.setUser(user);
        emailVerificationRepository.save(emailVerification);
    }

    private void setDefUserRole(User user) {
        UserRole userRole = new UserRole();
        userRole.setUser(user.getId());
        userRole.setRole(roleRepository.findByName("User").getId());
        userRoleRepository.save(userRole);
    }

//endregion

    @RequestMapping(value = "/save", method = {RequestMethod.POST, RequestMethod.PUT})
    @PreAuthorize("hasAnyAuthority('Admin')")
    public ResponseEntity<?> save(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        if (user.getId() == 0) {
            return ResponseEntity.ok("user has been created");
        } else {
            return ResponseEntity.ok("user has been updated");
        }
    }

    @PostMapping(value = "/saveFollow")
    public ResponseEntity<?> saveFollow(@RequestParam Long id, Principal principal) {
        UserFollow userFollow = new UserFollow();
        userFollow.setUserFollowed(id);
        userFollow.setUserFollowing(userRepository.findByEmail(principal.getName()).getId());
        userFollowRepository.save(userFollow);

        return ResponseEntity.ok("Followed user succesfully");
    }

    @Transactional
    @DeleteMapping(value = "/unfollow")
    public ResponseEntity<?> unfollow(@RequestParam Long id, Principal principal) {
        userFollowRepository.deleteAllByUserFollowedAndAndUserFollowing(id, userRepository.findByEmail(principal.getName()).getId());
        return ResponseEntity.ok("OK");
    }

    @GetMapping(value = "/getFollowed")
    public ResponseEntity<?> getFollowed(Principal principal) {
        List<UsernameAndId> users= userRepository.findFollowedUsers(userRepository.findByEmail(principal.getName()).getId());
        return ResponseEntity.ok().body(users);
    }

    @GetMapping(value = "/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                Map<String, String> tokens = jwtProvider.generateFromRefreshToken(authorizationHeader, request.getRequestURI().toString(), userRepository);
                response.setContentType(APPLICATION_JSON_VALUE);

                new ObjectMapper().writeValue(response.getOutputStream(), tokens);

            } catch (Exception exception) {

                response.setHeader("ERROR", exception.getMessage());
                //response.sendError(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", exception.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            throw new RuntimeException("Refresh token is missing");
        }
    }


}
