package com.example.coffeeshopproject.Repository;

import com.example.coffeeshopproject.Entity.Chef;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChefRepo extends JpaRepository<Chef, Long> {
    Optional<Chef> findByEmail(String email);



}
