package com.example.coffeeshopproject.Repository;

import com.example.coffeeshopproject.Entity.Waiter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WaiterRepo extends JpaRepository<Waiter, Long> {
    Optional<Waiter> findByEmail(String email);
}
