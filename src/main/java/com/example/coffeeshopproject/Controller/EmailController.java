package com.example.coffeeshopproject.Controller;

import com.example.coffeeshopproject.Service.EmailServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    private EmailServices emailService;

    @PostMapping("/send")
    public String sendEmail(@RequestParam String to) {
        emailService.sendEmail(to, "Coffee Coop Test", "Hello! This is a test email from Coffee Coop.");
        return "Email sent successfully to " + to;
    }
}
