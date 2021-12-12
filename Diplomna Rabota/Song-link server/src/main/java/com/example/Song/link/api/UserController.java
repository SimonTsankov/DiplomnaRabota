package com.example.Song.link.api;

import com.example.Song.link.mailModel.EmailConfirmationModel;
import com.example.Song.link.model.EmailVerification;
import com.example.Song.link.model.User;
import com.example.Song.link.model.UserRole;
import com.example.Song.link.repository.*;
import com.example.Song.link.security.JwtProvider;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import java.io.IOException;

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
    private JwtProvider jwtProvider;
//TODO
    //    @Autowired
    //    private EmailService emailService;

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

            EmailConfirmationModel recepient = getRecipient(hash, user.getEmail(), "Confirm your email at VWP", "bonus text!");
           //TODO  emailService.sendConfirmationMail(recepient, emailVerificationTemplate);

            return ResponseEntity.ok("user has been created");
        } else {
            throw new Exception("User exists");
          //  throw new UserAlreadyExists("User with this email already exists!");
        }
    }
    private EmailConfirmationModel getRecipient(String hash, String email, String subject, String bonusText) {
        EmailConfirmationModel recipient = new EmailConfirmationModel();
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
}
