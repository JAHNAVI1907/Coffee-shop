package com.example.coffeeshopproject.Controller;

import com.example.coffeeshopproject.Dto.ChefProfileDto;
import com.example.coffeeshopproject.Entity.Chef;
import com.example.coffeeshopproject.Service.ChefServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chef")
public class ChefController {

    @Autowired
    private ChefServices chefService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Chef chef) {
        String message = chefService.registerChef(chef);
        return ResponseEntity.ok(message);
    }

    /*@PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Chef chef) {
        boolean success = chefService.loginChef(chef.getEmail(), chef.getPassword());
        if (success) {
            return ResponseEntity.ok("Chef login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }*/

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Chef chef) {
        boolean success = chefService.loginChef(chef.getEmail(), chef.getPassword());
        if (success) {
            Chef fullChef = chefService.getChefByEmail(chef.getEmail());
            return ResponseEntity.ok(fullChef); // ✅ Send full object
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }


    /*@GetMapping("/profile/{id}")
    public ResponseEntity<?> getProfile(@PathVariable Long id) {
        Chef chef = chefService.getChefById(id);
        if (chef != null) {
            return ResponseEntity.ok(chef);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chef not found");
        }
    }*/

    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getChefProfile(@PathVariable Long id) {
        Chef chef = chefService.getChefById(id);
        if (chef != null) {
            return ResponseEntity.ok(chef);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Chef not found");
        }
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody ChefProfileDto dto) {
        String message = chefService.updateChefProfile(id, dto);
        return ResponseEntity.ok(message);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteChef(@PathVariable Long id) {
        chefService.deleteChef(id);
        return ResponseEntity.ok("Chef deleted");
    }
}
