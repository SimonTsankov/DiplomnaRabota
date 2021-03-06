package com.example.Song.link.repository;

import com.example.Song.link.model.PasswordReset;
import com.example.Song.link.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PasswordResetRepository extends JpaRepository<PasswordReset, Long> {

    PasswordReset findByHash(String hash);

    PasswordReset findByUser(User user);
}
