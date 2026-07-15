package com.example.coffeeshopproject.Controller;

import com.example.coffeeshopproject.Dto.MenuItemDto;
import com.example.coffeeshopproject.Entity.MenuItem;
import com.example.coffeeshopproject.Repository.MenuItemRepo;
import com.example.coffeeshopproject.Service.MenuItemServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/menu")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminMenuController {

    @Autowired
    private MenuItemRepo menuItemRepository;

    @Autowired
    private MenuItemServices service;

    // ✅ GET: Return clean DTO list
    @GetMapping
    public List<MenuItemDto> getAllMenuItems() {
        return service.getAll()
                .stream()
                .map(item -> new MenuItemDto(
                        item.getId(),
                        item.getName(),
                        item.getDescription(),
                        item.getPrice(),
                        item.getCategory(),
                        item.getImageUrl()
                ))
                .collect(Collectors.toList());
    }

    // ✅ POST: Add item using DTO

    @PostMapping("/add-dto")
    public ResponseEntity<?> addMenuItem(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("category") String category,
            @RequestParam(value = "imageFile", required = false) MultipartFile imageFile) {

        String imageUrl = null;
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                Path uploadPath = Paths.get("uploads");
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                String filename = UUID.randomUUID() + "-" + imageFile.getOriginalFilename();
                Path filePath = uploadPath.resolve(filename);
                Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                imageUrl = "/uploads/" + filename;
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to save image");
            }
        }

        MenuItem item = new MenuItem();
        item.setName(name);
        item.setDescription(description);
        item.setPrice(price);
        item.setCategory(category);
        item.setImageUrl(imageUrl);

        menuItemRepository.save(item);
        return ResponseEntity.ok("Item added successfully");
    }




    // ✅ PUT: Update item by ID
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMenuItem(@PathVariable Long id, @RequestBody MenuItemDto itemDto) {
        MenuItem item = service.getById(id);
        if (item == null) {
            return ResponseEntity.notFound().build();
        }

        item.setName(itemDto.getName());
        item.setDescription(itemDto.getDescription());
        item.setPrice(itemDto.getPrice());
        item.setCategory(itemDto.getCategory());
        item.setImageUrl(itemDto.getImageUrl());

        menuItemRepository.save(item);
        return ResponseEntity.ok("Item updated successfully");
    }

    // ✅ DELETE: Remove item by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMenuItem(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok("Item deleted successfully");
    }

}
