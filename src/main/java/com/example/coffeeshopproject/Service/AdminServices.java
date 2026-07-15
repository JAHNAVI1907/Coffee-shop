package com.example.coffeeshopproject.Service;

import com.example.coffeeshopproject.Entity.Admin;
import com.example.coffeeshopproject.Repository.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminServices {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;  // ✅ inject encoder bean

    public PasswordEncoder getPasswordEncoder() {   // ✅ expose for controller
        return passwordEncoder;
    }

    public boolean loginAdmin(String email, String password) {
        Optional<Admin> adminOpt = adminRepo.findByEmail(email);
        return adminOpt.map(admin -> admin.getPassword().equals(password)).orElse(false);
    }

    public List<Admin> getAllUsers() {
        return adminRepo.findAll();
    }

    public Admin findByEmailAndPassword(String email, String password) {
        return adminRepo.findByEmailAndPassword(email, password).orElse(null);
    }


}
