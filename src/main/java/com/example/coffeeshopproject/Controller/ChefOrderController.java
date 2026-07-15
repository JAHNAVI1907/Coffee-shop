package com.example.coffeeshopproject.Controller;

import com.example.coffeeshopproject.Entity.Order;
import com.example.coffeeshopproject.Enum.OrderStatus;
import com.example.coffeeshopproject.Service.OrderServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chef/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class ChefOrderController {

    @Autowired
    private OrderServices orderServices;

    // ✅ Get all orders assigned to a specific chef
    @GetMapping("/{chefId}")
    public List<Order> getOrdersByChef(@PathVariable Long chefId) {
        return orderServices.getOrdersByChef(chefId);
    }

    // ✅ Get all active orders (PENDING + IN_PROGRESS) for chefs
    @GetMapping("/all")
    public List<Order> getChefOrders() {
        return orderServices.getChefOrders();
    }

    // ✅ Update order status controlled by chef
    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id,
                                                   @RequestBody Map<String, String> body) {
        OrderStatus newStatus = OrderStatus.valueOf(body.get("status").toUpperCase());
        Order updated = orderServices.updateChefOrderStatus(id, newStatus);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{chefId}/count")
    public long getChefOrderCount(@PathVariable Long chefId) {
        return orderServices.countOrdersByChef(chefId);
    }


    // ✅ Simple test endpoint
    @GetMapping("/test")
    public String testPublic() {
        return "Public access works!";
    }

    @GetMapping("/{chefId}/stats")
    public Map<String, Object> getChefStats(@PathVariable Long chefId) {
        Map<String, Object> stats = new HashMap<>();
        stats.put("ordersAssigned", orderServices.getOrdersByChef(chefId).size());
        stats.put("ordersCompleted", orderServices.countOrdersByChef(chefId));
        stats.put("avgPrepTime", 12); // placeholder until you calculate
        stats.put("dishesToday", 15); // placeholder
        return stats;
    }

}
