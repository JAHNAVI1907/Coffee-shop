package com.example.coffeeshopproject.Repository;

import com.example.coffeeshopproject.Entity.MenuItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MenuItemRepo extends JpaRepository<MenuItem, Long> {
    List<MenuItem> findByCategory(String category);
}
