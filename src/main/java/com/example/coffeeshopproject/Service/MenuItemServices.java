package com.example.coffeeshopproject.Service;

import com.example.coffeeshopproject.Entity.MenuItem;
import com.example.coffeeshopproject.Repository.MenuItemRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuItemServices{

    @Autowired
    private MenuItemRepo repo;

    public List<MenuItem> getAll() {
        return repo.findAll();
    }

    public MenuItem add(MenuItem item) {
        return repo.save(item);
    }

    public MenuItem update(Long id, MenuItem updated) {
        MenuItem item = repo.findById(id).orElseThrow();
        item.setName(updated.getName());
        item.setDescription(updated.getDescription());
        item.setPrice(updated.getPrice());
        item.setCategory(updated.getCategory());
        item.setImageUrl(updated.getImageUrl());
        return repo.save(item);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }

    public List<MenuItem> getByCategoryName(String category) {
        return repo.findByCategory(category);
    }

    public MenuItem getById(Long id) {
        return repo.findById(id).orElse(null);
    }

}
