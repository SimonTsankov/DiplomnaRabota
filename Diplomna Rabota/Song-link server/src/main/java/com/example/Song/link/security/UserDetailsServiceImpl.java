
package com.example.Song.link.security;

import com.example.Song.link.model.Role;
import com.example.Song.link.model.User;
import com.example.Song.link.model.UserRole;
import com.example.Song.link.repository.RoleRepository;
import com.example.Song.link.repository.UserRepository;
import com.example.Song.link.repository.UserRoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

import static java.util.Objects.isNull;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Override()
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            logger.error("User not found!");
            throw new UsernameNotFoundException("User not found!");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();

        getRoles(user).forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }

    public Collection<Role> getRoles(User user) {
        Collection<Role> roles = new ArrayList<>();
        Collection<UserRole> userRoles = new ArrayList<>();

        userRoles = userRoleRepository.findByUser(user.getId());
        //userRoles = userRoleRepository.findAll();

        for (UserRole userRole : userRoles) {
            roles.add(roleRepository.findById(userRole.getRole()).orElse(null));
        }
        return roles;
    }

    public boolean isVerified(String email) {
        User user = userRepository.findByEmail(email);
        if (isNull(user.getEmailVerification()))
            return false;

        return user.getEmailVerification();
    }

}
