package com.example.Song.link.api;

import com.example.Song.link.exception.CustomException;
import com.example.Song.link.mailModel.PasswordRequestModel;
import com.example.Song.link.mailModel.RecipientConfirmation;
import com.example.Song.link.model.*;
import com.example.Song.link.repository.*;
import com.example.Song.link.security.JwtProvider;
import com.example.Song.link.service.EmailService;
import com.fasterxml.jackson.databind.ObjectMapper;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.*;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Value("${vwp.email.template.password.reset}")
    private String passwordResetTemplate;

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
            if(userRepository.findByUsername(user.getUsername()) !=null && user.getId() !=0){
                throw new CustomException("Username already taken!");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setEmailVerification(false);//TODO CHANGE TO FALSE
            user.setUsername(user.getUsername());
            userRepository.save(user);

            setDefUserRole(user);// gives a registered user role of User
            String hash = jwtProvider.generateEmailVerificationHash();
            saveEmailVerification(hash, user);

            RecipientConfirmation recepient = getRecipient(hash, user.getEmail(), "Confirm your email at Sl", "bonus text!");

            emailService.sendConfirmationMail(recepient, emailVerificationTemplate);


            return ResponseEntity.ok("user has been created");
        } else {
            throw new CustomException("User exists");
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

    //send email for password reset
    @PostMapping(value = "/send-password-reset")
    public ResponseEntity<?> sendPasswordReset(@RequestBody String email) throws MessagingException, IOException, TemplateException, CustomException, CustomException {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            if(passwordResetRepository.findByUser(user)!=null){
                passwordResetRepository.delete(passwordResetRepository.findByUser(user));
            }
            String hash = jwtProvider.generateHash();

            savePasswordReset(hash, user);//saves password reset hash with the user's id in the db

            RecipientConfirmation recipient = getRecipient(hash, user.getEmail(), "Reset your password at VWP", "bonus text");

            emailService.sendConfirmationMail(recipient, passwordResetTemplate);

            return ResponseEntity.ok("email send");
        } else {
            throw new CustomException("No such email is registered!");
        }
    }

    public void savePasswordReset(String hash, User user) {
        PasswordReset passwordReset = new PasswordReset();
        passwordReset.setHash(hash);
        passwordReset.setUser(user);
        passwordResetRepository.save(passwordReset);
    }

    @PostMapping(value = "/reset-password-request")
    public ResponseEntity<?> passwordReset(@RequestBody PasswordRequestModel passwordRequestModel) throws Exception {
        String hash = passwordRequestModel.getHash();
        PasswordReset passwordReset = passwordResetRepository.findByHash(hash);
        if (passwordReset == null)
            throw new CustomException("Does not found request for reset password. Please request new password reset");

        LocalDateTime date = passwordReset.getDateCreated();

        if (date.plusMinutes(30L).isBefore(LocalDateTime.now())) {
            passwordResetRepository.delete(passwordReset);
            throw new CustomException("Link has expired. Please request new password reset");
        }
        String password = passwordRequestModel.getPassword();

        User user = passwordReset.getUser();
        user.setPassword(passwordEncoder.encode(password));

        passwordResetRepository.delete(passwordReset);

        return ResponseEntity.ok("Password changed");

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
    @PostMapping(value = "/verify")
    public ResponseEntity<?> verify(@RequestParam(value = "hash") String hash) throws CustomException, MessagingException, TemplateException, IOException {

        EmailVerification emailVerification = emailVerificationRepository.findByHash(hash);

        if (emailVerification != null) {
            User user = emailVerification.getUser();
            LocalDateTime date = emailVerification.getDateCreated();
            final Calendar cal = Calendar.getInstance();

            if (date.plusMinutes(30L).isBefore(LocalDateTime.now())) {
                emailVerificationRepository.delete(emailVerification);
                saveEmailVerification(hash, user);//New email verification

                RecipientConfirmation recepient = getRecipient(hash, user.getEmail(), "Confirm your email at Sl", "bonus text!");
                emailService.sendConfirmationMail(recepient, emailVerificationTemplate);

                throw new CustomException("Expired, try again");
            }

            user.setEmailVerification(true);// verify user

            emailVerificationRepository.delete(emailVerification);

            return ResponseEntity.ok("user validated");
        }
        throw new CustomException("Already confirmed or wrong url");
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
        List<UsernameAndId> users = userRepository.findFollowedUsers(userRepository.findByEmail(principal.getName()).getId());
        return ResponseEntity.ok().body(users);
    }

    @GetMapping(value = "/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException, CustomException {

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
            throw new CustomException("Refresh token is missing");
        }
    }


}
