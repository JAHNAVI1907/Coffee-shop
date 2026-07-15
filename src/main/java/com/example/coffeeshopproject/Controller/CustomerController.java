package com.example.coffeeshopproject.Controller;

import com.example.coffeeshopproject.Dto.CustomerProfileDto;
import com.example.coffeeshopproject.Entity.*;
import com.example.coffeeshopproject.Enum.OrderStatus;
import com.example.coffeeshopproject.Repository.BookingRepo;
import com.example.coffeeshopproject.Repository.CustomerRepo;
import com.example.coffeeshopproject.Repository.MenuItemRepo;
import com.example.coffeeshopproject.Repository.OrderRepo;
import com.example.coffeeshopproject.Service.*;
import com.example.coffeeshopproject.Dto.CartItemRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    @Autowired
    private CustomerServices customerServices;

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private MenuItemRepo menuItemRepo;

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private BookingRepo bookingRepo;

    @Autowired
    private EmailServices emailService;

    @Autowired
    private OrderServices orderService;

    @Autowired
    private BookingServices bookingService;

    @Autowired
    private RazorpayPaymentService paymentService;



    // ✅ Register a new customer
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Customer customer) {
        System.out.println("Register endpoint hit");
        String message = customerServices.registerCustomer(customer);

        // ✅ Send welcome email after successful registration
        emailService.sendEmail(
                customer.getEmail(),
                "Welcome to Coffee Coop",
                "Hello " + customer.getName() + ", thanks for registering with Coffee Coop!"
        );

        return ResponseEntity.ok(message);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Customer customer) {
        boolean success = customerServices.loginCustomer(customer.getEmail(), customer.getPassword());
        if (success) {
            Customer fullCustomer = customerServices.getCustomerByEmail(customer.getEmail());
            return ResponseEntity.ok(fullCustomer); // ✅ Send full object
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    // ✅ View profile by ID
    @GetMapping("/profile/{id}")
    public ResponseEntity<?> getProfile(@PathVariable Long id) {
        Customer customer = customerServices.getCustomerById(id);
        if (customer != null) {
            return ResponseEntity.ok(customer);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found");
        }
    }

    @PutMapping("/profile/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable Long id, @RequestBody CustomerProfileDto dto) {
        String result = customerServices.updateCustomerProfile(id, dto);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {
        customerServices.deleteCustomer(id);
        return ResponseEntity.ok("Customer deleted");
    }

    // ✅ Add to Cart (with duplicate merge + parent linking)
    @PostMapping("/cart/add")
    public ResponseEntity<?> addToCart(@RequestBody CartItemRequest request) {
        Optional<Customer> customerOpt = customerRepo.findById(request.getCustomerId());
        Optional<MenuItem> menuItemOpt = menuItemRepo.findById(request.getMenuItemId());

        if (customerOpt.isEmpty() || menuItemOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer or Menu Item not found");
        }

        Customer customer = customerOpt.get();
        MenuItem menuItem = menuItemOpt.get();

        Order order = orderRepo.findByCustomerAndStatus(customer, OrderStatus.CART)
                .orElseGet(() -> {
                    Order newOrder = new Order();
                    newOrder.setCustomer(customer);
                    newOrder.setOrderTime(LocalDateTime.now());
                    newOrder.setStatus(OrderStatus.CART);
                    return orderRepo.save(newOrder);
                });

        // ✅ Check if item already exists in cart
        Optional<OrderItem> existingItem = order.getItems().stream()
                .filter(i -> i.getMenuItem().getId().equals(menuItem.getId()))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + request.getQuantity());
        } else {
            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setMenuItem(menuItem);
            item.setQuantity(request.getQuantity());
            order.getItems().add(item);
        }

        // ✅ Remove duplicate items for same menuItem
        Map<Long, OrderItem> mergedItems = new HashMap<>();
        for (OrderItem i : order.getItems()) {
            Long menuId = i.getMenuItem().getId();
            if (mergedItems.containsKey(menuId)) {
                mergedItems.get(menuId).setQuantity(
                        mergedItems.get(menuId).getQuantity() + i.getQuantity()
                );
            } else {
                mergedItems.put(menuId, i);
            }
        }

        // ✅ FIX: clear + repopulate instead of replacing list
        order.getItems().clear();
        order.getItems().addAll(mergedItems.values());

        // ✅ Ensure each item is linked to parent order
        for (OrderItem item : order.getItems()) {
            item.setOrder(order);
        }

        orderRepo.save(order);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/cart/test")
    public String testCart() {
        System.out.println("Cart test endpoint hit");
        return "Cart endpoint works!";
    }

    @GetMapping("/cart/{customerId}")
    public ResponseEntity<?> viewCart(@PathVariable Long customerId) {
        Optional<Customer> customerOpt = customerRepo.findById(customerId);
        if (customerOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found");
        }

        Customer customer = customerOpt.get();
        Optional<Order> cartOpt = orderRepo.findByCustomerAndStatus(customer, OrderStatus.CART);

        if (cartOpt.isEmpty()) {
            return ResponseEntity.ok("Cart is empty");
        }

        return ResponseEntity.ok(cartOpt.get());
    }

    @PutMapping("/cart/{orderId}/place")
    public ResponseEntity<?> placeOrder(@PathVariable Long orderId) {
        Optional<Order> orderOpt = orderRepo.findById(orderId);
        if (orderOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Order not found");
        }

        Order order = orderOpt.get();
        if (order.getStatus() != OrderStatus.CART) {
            return ResponseEntity.badRequest().body("Order is not in CART status");
        }

        order.setStatus(OrderStatus.PENDING);
        order.setOrderTime(LocalDateTime.now());

        // ✅ Ensure each item is linked to parent order
        for (OrderItem item : order.getItems()) {
            item.setOrder(order);
        }

        orderRepo.save(order);
        return ResponseEntity.ok("Order placed successfully!");
    }

    @PutMapping("/cart/{orderId}/place/{bookingId}")
    public ResponseEntity<?> placeOrderWithBooking(@PathVariable Long orderId, @PathVariable Long bookingId) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Booking booking = bookingRepo.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (order.getStatus() != OrderStatus.CART) {
            return ResponseEntity.badRequest().body("Order is not in CART status");
        }

        order.setStatus(OrderStatus.PENDING);
        order.setOrderTime(LocalDateTime.now());
        order.setBooking(booking);   // ✅ link booking to order

        for (OrderItem item : order.getItems()) {
            item.setOrder(order);
        }

        orderRepo.save(order);
        return ResponseEntity.ok("Order placed successfully with booking!");
    }

    @GetMapping("/{customerId}/stats")
    public Map<String, Object> getCustomerStats(@PathVariable Long customerId) {
        Map<String, Object> stats = new HashMap<>();
        stats.put("orders", orderService.countOrdersByCustomer(customerId));
        stats.put("bookings", bookingService.countBookingsByCustomer(customerId));
        stats.put("amountSpent", paymentService.totalAmountSpent(customerId));
        return stats;
    }



}
