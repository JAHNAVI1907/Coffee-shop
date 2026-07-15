package com.example.coffeeshopproject.Controller;

import com.example.coffeeshopproject.Dto.OrderRequest;
import com.example.coffeeshopproject.Entity.Order;
import com.example.coffeeshopproject.Enum.OrderStatus;
import com.example.coffeeshopproject.Service.EmailServices;
import com.example.coffeeshopproject.Service.OrderServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.jaxb.SpringDataJaxb;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderServices service;

    @Autowired
    private EmailServices emailService;


    @GetMapping
    public List<Order> getAllOrders() {
        return service.getAllOrders();
    }

    @PutMapping("/admin/orders/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestParam OrderStatus status) {
        Order updated = service.updateOrderStatus(id, status);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestBody OrderRequest request) {
        Order order = service.placeOrder(
                request.getCustomerId(),
                request.getBookingId(),   // ✅ include bookingId
                request.getItems()
        );

        // ✅ Send email notifications after order placement
        if (order.getCustomer() != null) {
            emailService.sendEmail(
                    order.getCustomer().getEmail(),
                    "Order Confirmation - Coffee Coop",
                    "Hello " + order.getCustomer().getName() +
                            ", your order #" + order.getId() +
                            " has been placed successfully and linked to booking #" + order.getBooking().getId() + "."
            );
        }

        // ✅ Notify Admin/Chef/Waiter (example emails)
        emailService.sendEmail(
                "admin@coffeecoop.com",
                "New Order Alert",
                "Order #" + order.getId() + " has been placed by " + order.getCustomer().getName()
        );

        emailService.sendEmail(
                "chef@coffeecoop.com",
                "New Order Assigned",
                "Order #" + order.getId() + " is ready for preparation."
        );

        emailService.sendEmail(
                "waiter@coffeecoop.com",
                "Order Ready to Serve",
                "Order #" + order.getId() + " is linked to booking #" + order.getBooking().getId()
        );

        return ResponseEntity.ok(order); // return full order with booking details
    }




}
