package com.example.coffeeshopproject.Controller;

import com.example.coffeeshopproject.Dto.MenuItemDto;
import com.example.coffeeshopproject.Entity.MenuItem;
import com.example.coffeeshopproject.Service.MenuItemServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:3000")
public class MenuItemController {

    @Autowired
    private MenuItemServices menuItemServices;

    // ✅ Return clean DTOs to avoid nested orderItems
    @GetMapping
    public List<MenuItemDto> getAllItems() {
        return menuItemServices.getAll()
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

    // ✅ Add a new menu item (still accepts entity)
    @PostMapping("/add")
    public MenuItem addItem(@RequestBody MenuItem item) {
        return menuItemServices.add(item);
    }

    // ✅ Get items by category (return DTOs here too)
    @GetMapping("/category/{category}")
    public List<MenuItemDto> getByCategory(@PathVariable String category) {
        return menuItemServices.getByCategoryName(category)
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
}
