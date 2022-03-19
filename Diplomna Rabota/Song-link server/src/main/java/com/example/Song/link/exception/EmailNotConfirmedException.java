package com.example.Song.link.exception;

import org.springframework.security.core.AuthenticationException;

public class EmailNotConfirmedException extends AuthenticationException {
    public EmailNotConfirmedException(String message) {
        super(message);
    }
}
