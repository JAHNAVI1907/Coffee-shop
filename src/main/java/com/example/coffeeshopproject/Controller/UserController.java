package com.example.coffeeshopproject.Controller;

import com.example.coffeeshopproject.Dto.LoginRequest;
import com.example.coffeeshopproject.Service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Object user = loginService.login(request.getEmail(), request.getPassword());

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
