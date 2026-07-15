package com.example.coffeeshopproject.Service;

import com.example.coffeeshopproject.Dto.ChefProfileDto;
import com.example.coffeeshopproject.Entity.Chef;
import com.example.coffeeshopproject.Repository.ChefRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
public class ChefServices {

    @Autowired
    private ChefRepo chefRepo;

    public String registerChef(Chef chef) {
        chef.setPassword(new BCryptPasswordEncoder().encode(chef.getPassword()));
        chefRepo.save(chef);
        return "Chef registered successfully";
    }

    public boolean loginChef(String email, String rawPassword) {
        Optional<Chef> chefOpt = chefRepo.findByEmail(email);
        if (chefOpt.isPresent()) {
            Chef chef = chefOpt.get();
            return new BCryptPasswordEncoder().matches(rawPassword, chef.getPassword());
        }
        return false;
    }

    public Chef getChefById(Long id) {
        return chefRepo.findById(id).orElse(null);
    }

    public String updateChefProfile(Long id, ChefProfileDto dto) {
        Optional<Chef> chefOpt = chefRepo.findById(id);
        if (chefOpt.isPresent()) {
            Chef chef = chefOpt.get();
            chef.setName(dto.getName());
            chef.setEmail(dto.getEmail());
            chef.setPhone(dto.getPhone());
            chefRepo.save(chef);
            return "Chef profile updated successfully";
        }
        return "Chef not found";
    }
    public Chef getChefByEmail(String email) {
        return chefRepo.findByEmail(email).orElse(null);
    }

    public List<Chef> getAllChefs() {
        return chefRepo.findAll();
    }

    public void deleteChef(Long id) {
        chefRepo.deleteById(id);
    }

    public void saveChef(Chef chef) {
        chefRepo.save(chef);
    }

}
