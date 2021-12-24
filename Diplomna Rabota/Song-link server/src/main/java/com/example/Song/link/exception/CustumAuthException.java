package com.example.Song.link.exception;

import org.springframework.security.core.AuthenticationException;

public class CustumAuthException extends AuthenticationException {

    public CustumAuthException(String msg, Throwable cause) {
        super(msg, cause);
    }

    public CustumAuthException(String msg) {
        super(msg);
    }
}
