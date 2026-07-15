package com.example.coffeeshopproject.Controller;

import com.example.coffeeshopproject.Service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public ResponseEntity<String> chat(@RequestBody ChatRequest request) {
        String reply = chatService.askBot(request.getMessage());
        return ResponseEntity.ok(reply);
    }
}

// DTO
class ChatRequest {
    private String message;
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
