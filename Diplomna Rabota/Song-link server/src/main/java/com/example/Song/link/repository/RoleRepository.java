package com.example.Song.link.repository;

import com.example.Song.link.model.Role;
import com.example.Song.link.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role ,Long> {
    List<UserRole> findByUser(long userId);
}
