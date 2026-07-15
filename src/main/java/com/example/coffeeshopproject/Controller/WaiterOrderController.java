package com.example.coffeeshopproject.Controller;

import com.example.coffeeshopproject.Entity.Order;
import com.example.coffeeshopproject.Enum.OrderStatus;
import com.example.coffeeshopproject.Service.OrderServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/waiter/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class WaiterOrderController {

    @Autowired
    private OrderServices orderServices;

    // ✅ Get all finished orders (ready to serve)
    @GetMapping("/ready-to-serve")
    public List<Order> getFinishedOrders() {
        return orderServices.getWaiterOrders();
    }

    // ✅ Update order status with error handling
    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        try {
            String status = body.get("status");
            System.out.println("🔄 Received status: " + status + " for order ID: " + id);

            OrderStatus newStatus = OrderStatus.valueOf(status.toUpperCase());
            orderServices.updateOrderStatus(id, newStatus);

            return ResponseEntity.ok("✅ Order marked as " + newStatus);
        } catch (Exception e) {
            System.out.println("❌ Failed to update status for order ID " + id + ": " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Failed to update status: " + e.getMessage());
        }
    }

    // ✅ Simple test endpoint
    @GetMapping("/test")
    public String testPublic() {
        return "Waiter endpoint is public!";
    }

    @GetMapping("/{waiterId}")
    public List<Order> getOrdersByWaiter(@PathVariable Long waiterId) {
        return orderServices.getOrdersByWaiter(waiterId);
    }

    @GetMapping("/{waiterId}/count")
    public long getWaiterOrderCount(@PathVariable Long waiterId) {
        return orderServices.countOrdersByWaiter(waiterId);
    }

    @GetMapping("/{waiterId}/stats")
    public Map<String, Object> getWaiterStats(@PathVariable Long waiterId) {
        Map<String, Object> stats = new HashMap<>();
        stats.put("tablesAssigned", 5); // placeholder until you calculate from Booking
        stats.put("ordersServed", orderServices.countOrdersByWaiter(waiterId));
        stats.put("feedbackScore", 4.8); // placeholder until you calculate from reviews
        stats.put("avgServeTime", 7); // placeholder until you calculate from order timestamps
        return stats;
    }


}
