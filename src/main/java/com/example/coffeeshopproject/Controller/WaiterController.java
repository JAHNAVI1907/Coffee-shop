package com.example.coffeeshopproject.Controller;

import com.example.coffeeshopproject.Dto.WaiterProfileDto;
import com.example.coffeeshopproject.Entity.Order;
import com.example.coffeeshopproject.Entity.Waiter;
import com.example.coffeeshopproject.Enum.OrderStatus;
import com.example.coffeeshopproject.Service.OrderServices;
import com.example.coffeeshopproject.Service.WaiterServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/waiter")
public class WaiterController {

    @Autowired
    private WaiterServices waiterService;

    @Autowired
    private OrderServices orderService;


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Waiter waiter) {
        String message = waiterService.registerWaiter(waiter);
        return ResponseEntity.ok(message);
    }

    /*@PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Waiter waiter) {
        boolean success = waiterService.loginWaiter(waiter.getEmail(), waiter.getPassword());
        if (success) {
            return ResponseEntity.ok("Waiter login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }*/

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Waiter waiter) {
        boolean success = waiterService.loginWaiter(waiter.getEmail(), waiter.getPassword());
        if (success) {
            Waiter fullWaiter = waiterService.getWaiterByEmail(waiter.getEmail());
            return ResponseEntity.ok(fullWaiter); // ✅ Send full object
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }


    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getProfile(@PathVariable Long id) {
        Waiter waiter = waiterService.getWaiterById(id);
        if (waiter != null) {
            return ResponseEntity.ok(waiter);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Waiter not found");
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody WaiterProfileDto dto) {
        String message = waiterService.updateWaiterProfile(id, dto);
        return ResponseEntity.ok(message);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteWaiter(@PathVariable Long id) {
        waiterService.deleteWaiter(id);
        return ResponseEntity.ok("Waiter deleted");
    }

    @GetMapping("/orders")
    public List<Order> getFinishedOrders() {
        return orderService.getOrdersByStatus(OrderStatus.FINISHED);
    }

}
