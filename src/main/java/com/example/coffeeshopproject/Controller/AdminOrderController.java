package com.example.coffeeshopproject.Controller;

import com.example.coffeeshopproject.Entity.Chef;
import com.example.coffeeshopproject.Entity.Order;
import com.example.coffeeshopproject.Enum.OrderStatus;
import com.example.coffeeshopproject.Repository.ChefRepo;
import com.example.coffeeshopproject.Repository.OrderRepo;
import com.example.coffeeshopproject.Service.OrderServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AdminOrderController {

    @Autowired
    private OrderServices orderService;

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private ChefRepo chefRepo;

    // ✅ Get all orders
    @GetMapping("/orders")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    // ✅ Get order by ID
    @GetMapping("/orders/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        return order != null
                ? ResponseEntity.ok(order)
                : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
    }

    // ✅ Assign chef to order
    @PutMapping("/orders/{id}/assign-chef")
    public ResponseEntity<?> assignChefToOrder(@PathVariable Long id,
                                               @RequestParam String chefEmail) {
        Order order = orderRepo.findById(id).orElse(null);
        if (order == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");

        Chef chef = chefRepo.findByEmail(chefEmail)
                .orElseThrow(() -> new RuntimeException("Chef not found"));

        order.setChef(chef);
        orderRepo.save(order);
        return ResponseEntity.ok("Chef assigned to order successfully");
    }

    // ✅ Update order status (public access)
    @PutMapping("/orders/{id}/status")
    public ResponseEntity<?> updateOrderStatusPublic(@PathVariable Long id,
                                                     @RequestParam String status) {
        Order order = orderRepo.findById(id).orElse(null);
        if (order == null) return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");

        try {
            OrderStatus newStatus = OrderStatus.valueOf(status.toUpperCase());
            order.setStatus(newStatus);
            orderRepo.save(order);
            return ResponseEntity.ok("Order status updated to " + newStatus);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid status value: " + status);
        }
    }

    // ✅ Update order status (restricted to waiter role)
    @PutMapping("/orders/{id}/status/waiter")
    @PreAuthorize("hasRole('WAITER')")
    public ResponseEntity<?> updateOrderStatusByWaiter(@PathVariable Long id,
                                                       @RequestParam OrderStatus status) {
        try {
            Order updated = orderService.updateOrderStatus(id, status);
            return ResponseEntity.ok(Map.of("message", "Order updated", "status", updated.getStatus()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
