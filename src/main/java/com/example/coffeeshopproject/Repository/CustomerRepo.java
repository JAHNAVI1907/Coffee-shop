package com.example.coffeeshopproject.Repository;

import com.example.coffeeshopproject.Entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepo extends JpaRepository<Customer, Long> {
    Optional<Customer> findByEmail(String email);

}


