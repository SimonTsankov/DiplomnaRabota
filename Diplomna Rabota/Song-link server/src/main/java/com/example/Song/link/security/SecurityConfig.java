package com.example.Song.link.security;

import com.example.Song.link.security.filter.CustomAuthenticationFilter;
import com.example.Song.link.security.filter.CustomAuthorizationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.hierarchicalroles.RoleHierarchy;
import org.springframework.security.access.hierarchicalroles.RoleHierarchyImpl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import java.util.ArrayList;
import java.util.List;
import org.springframework.security.core.userdetails.UserDetailsService;
//import static jdk.nashorn.internal.runtime.PropertyDescriptor.GET;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Qualifier("userDetailsServiceImpl")
    @Autowired
    private UserDetailsService userDetailsService;

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CustomAuthorizationFilter customAuthorizationFilter() {
        return new CustomAuthorizationFilter();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.cors().configurationSource(request -> {
            List<String> origins = new ArrayList<>();
            origins.add("http://localhost:4200");
            List<String> methods = new ArrayList<>();
            methods.add("GET");
            methods.add("PUT");
            methods.add("POST");
            methods.add("DELETE");
            methods.add("OPTIONS");

            List<String> headers = new ArrayList<>();
            headers.add("*");
            origins.add("http://localhost:4200");
            CorsConfiguration cors = new CorsConfiguration();
            cors.setAllowedOrigins(origins);
            cors.setAllowedMethods(methods);
            cors.setAllowedHeaders(headers);
            return cors;
        });
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.authorizeRequests().antMatchers("/exception/*", "/api/login/**", "/api/user/token/refresh/**",
                "/api/user/register/**", "/api/user/verify/**", "/api/user/send-password-reset/**",
                "/api/user/reset-password-request/**","/api/post/findAll","/api/spotify/searchTracks/**","/api/spotify/getReddirectUrl").permitAll();
        http.authorizeRequests().anyRequest().hasAnyAuthority("Admin","User");
        http.addFilter(new CustomAuthenticationFilter(authenticationManagerBean(), getApplicationContext()));
        http.addFilterBefore(customAuthorizationFilter(), CustomAuthenticationFilter.class);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
