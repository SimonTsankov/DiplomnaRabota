package com.example.Song.link.security.filter;


import com.example.Song.link.security.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CustomAuthorizationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtProvider jwtProvider;// = new JwtProvider();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (jwtProvider.skipFilter)
            filterChain.doFilter(request, response);

        if(request.getServletPath().equals("/login") || request.getServletPath().equals("/api/user/token/refresh")){
            filterChain.doFilter(request, response);
        }else {
            jwtProvider.validateToken(response, request, filterChain);
        }
    }
}
