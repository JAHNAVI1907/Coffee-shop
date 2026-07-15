package com.example.coffeeshopproject.Service;

import com.example.coffeeshopproject.Dto.WaiterProfileDto;
import com.example.coffeeshopproject.Entity.Waiter;
import com.example.coffeeshopproject.Repository.WaiterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
public class WaiterServices {

    @Autowired
    private WaiterRepo waiterRepo;

    public String registerWaiter(Waiter waiter) {
        waiter.setPassword(new BCryptPasswordEncoder().encode(waiter.getPassword()));
        waiterRepo.save(waiter);
        return "Waiter registered successfully";
    }

    public boolean loginWaiter(String email, String rawPassword) {
        Optional<Waiter> waiterOpt = waiterRepo.findByEmail(email);
        if (waiterOpt.isPresent()) {
            Waiter waiter = waiterOpt.get();
            return new BCryptPasswordEncoder().matches(rawPassword, waiter.getPassword());
        }
        return false;
    }

    public Waiter getWaiterById(Long id) {
        return waiterRepo.findById(id).orElse(null);
    }

    public String updateWaiterProfile(Long id, WaiterProfileDto dto) {
        Optional<Waiter> waiterOpt = waiterRepo.findById(id);
        if (waiterOpt.isPresent()) {
            Waiter waiter = waiterOpt.get();
            waiter.setName(dto.getName());
            waiter.setEmail(dto.getEmail());
            waiter.setPhone(dto.getPhone());
            waiterRepo.save(waiter);
            return "Waiter profile updated successfully";
        }
        return "Waiter not found";
    }
    public Waiter getWaiterByEmail(String email) {
        return waiterRepo.findByEmail(email).orElse(null);
    }

    public List<Waiter> getAllWaiters() {
        return waiterRepo.findAll();
    }

    public void deleteWaiter(Long id) {
        waiterRepo.deleteById(id);
    }

    public void saveWaiter(Waiter waiter) {
        waiterRepo.save(waiter);
    }

}
