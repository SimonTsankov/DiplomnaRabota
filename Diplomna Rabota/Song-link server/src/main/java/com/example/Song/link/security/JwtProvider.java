package com.example.Song.link.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.Song.link.model.Role;
import com.example.Song.link.repository.EmailVerificationRepository;
import com.example.Song.link.repository.PasswordResetRepository;
import com.example.Song.link.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.istack.NotNull;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Service
public class JwtProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtProvider.class);

    @Value("${vwp.token.jwtSecret}")
    private String jwtSecret;

    @Value("${vwp.token.jwtExpiration.access}")
    private long jwtExpirationAccess;

    @Value("${vwp.token.jwtExpiration.refresh}")
    private int jwtRefreshTokenExpiration;

    @Value("${vwp.token.jwtExpirationEmail}")
    private long jwtExpirationEmail;

    @Value("${vwp.token.jwtExpirationPasswordReset}")
    private int jwtExpirationPasswordReset;

    @Value("${vwp.security.skip.filter}")
    public boolean skipFilter;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private EmailVerificationRepository emailVerificationRepository;

    @Autowired
    private PasswordResetRepository passwordResetRepository;

    public JwtProvider() {
    }

    //TODO EXPIRATION DATE
    public String generateEmailVerificationHash() {
        String hash = UUID.randomUUID().toString();
        if (emailVerificationRepository.findByHash(hash) == null && passwordResetRepository.findByHash(hash) == null) {
            System.out.println(hash);
            return hash;
        } else {
            generateEmailVerificationHash();
        }
        return "";
    }

    public String generatePasswordResetToken(String userId) {
        String token = Jwts.builder()
                .setSubject(userId)
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationPasswordReset * 1000))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

        return token;
    }

    public void validateToken(HttpServletResponse response, HttpServletRequest request, FilterChain filterChain) throws IOException, ServletException, ServletException, IOException {
        Algorithm algorithm = Algorithm.HMAC256(jwtSecret.getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {
                String token = authorizationHeader.substring("Bearer ".length());
                DecodedJWT decodedJWT = verifier.verify(token);
                String email = decodedJWT.getSubject();
                String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
                Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
                stream(roles).forEach(role -> {
                    authorities.add(new SimpleGrantedAuthority(role));
                });
                UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(email, null, authorities);

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                filterChain.doFilter(request, response);

            } catch (Exception exception) {
                logger.error("Error logging in: {}", exception);
                response.setHeader("error", exception.getMessage());
                response.setStatus(FORBIDDEN.value());
                Map<String, String> error = new HashMap<>();
                error.put("error_message", exception.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), error);
            }
        } else {
            filterChain.doFilter(request, response);
        }
    }


    public Map<String, String> generateTokens(User user, String requestURI) {
        Map<String, String> tokens = new HashMap<>();

        //TODO FIX IT (put a debug point in isVerified() method to see it does not even go there)
//        if(!userDetailsService.isVerified(user.getUsername())){
//            return tokens;
//        }

        String access_token = generateAccessToken(user, requestURI);
        String refresh_token = generateRefreshToken(user, requestURI);
        tokens.put("access_token", access_token);
        tokens.put("refresh_token", refresh_token);
        return tokens;
    }


    public String generateAccessToken(User user, String requestURI) {
        Algorithm algorithm = Algorithm.HMAC256(jwtSecret.getBytes());
        String access_token = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtExpirationAccess))
                .withIssuer(requestURI)
                .withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);

        return access_token;
    }

    public String generateAccessToken(com.example.Song.link.model.User user, String requestURI) {
        Algorithm algorithm = Algorithm.HMAC256(jwtSecret.getBytes());
        String access_token = JWT.create()
                .withSubject(user.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtExpirationAccess))
                .withIssuer(requestURI)
                .withClaim("roles", userDetailsService.getRoles(user).stream().map(Role::getName).collect(Collectors.toList()))
                .sign(algorithm);

        return access_token;
    }

    public String generateRefreshToken(User user, String RequestURI) {
        Algorithm algorithm = Algorithm.HMAC256(jwtSecret.getBytes());
        String refresh_token = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + jwtRefreshTokenExpiration))
                .withIssuer(RequestURI)
                .sign(algorithm);
        return refresh_token;
    }

    public Map generateFromRefreshToken(String authorizationHeader, String requestURI, UserRepository userRepository) {
        String refresh_token = authorizationHeader.substring("Bearer ".length());
        Algorithm algorithm = Algorithm.HMAC256(jwtSecret.getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(refresh_token);
        String email = decodedJWT.getSubject();
        com.example.Song.link.model.User user = userRepository.findByEmail(email);

        String access_token = generateAccessToken(user, requestURI);

        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", access_token);
        tokens.put("refresh_token", refresh_token);

        return tokens;

    }
}
